import { useEffect, useState } from "react";
import type { Crypto } from "../types/crypto";
import { getCryptoList } from "../api/cryptoApi";
import { 
  sortData, 
  filterByChange, 
  searchData 
} from "../utils/cryptoTransforms";
import { useDebounce } from "./useDebounce";

export function useCryptoData() {
  const [data, setData] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Controls
  const [sortBy, setSortBy] = useState<"marketCap" | "price" | "changePct24h">("marketCap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterBy, setFilterBy] = useState<"all" | "gainers" | "losers">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<10 | 25>(25);
  const [refreshKey, setRefreshKey] = useState(0);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const list = await getCryptoList();
        setData(list);
      } catch {
        setError("Something went wrong loading crypto data.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  // Derived pipeline
  const sorted = sortData(data, sortBy, sortDir);
  const filtered = filterByChange(sorted, filterBy);
  const searched = searchData(filtered, debouncedSearch);
  const limited = searched.slice(0, limit);

  return {
    // UI-ready data
    data: limited,
    isLoading,
    error,

    // Controls + state setters
    sortBy, setSortBy,
    sortDir, setSortDir,
    filterBy, setFilterBy,
    searchQuery, setSearchQuery,
    limit, setLimit,

    refresh: () => setRefreshKey(k => k + 1),
  };
}
