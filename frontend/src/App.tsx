import { useEffect, useState } from "react";
import { getCryptoList } from "./api/cryptoApi";
import type { CryptoItem } from "./types/crypto";
import CryptoList from "./components/CryptoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import CryptoToolbar from "./components/CryptoToolbar";

export default function App() {
  const [data, setData] = useState<CryptoItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"marketCap" | "price" | "changePct24h">("marketCap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterByChange, setFilterByChange] = useState<"all" | "gainers" | "losers">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
  
        const result = await getCryptoList();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  
    loadData();
  }, [refreshKey]);  

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setRefreshKey((k) => k + 1)}
      />
    );  
  if (!data) return null;

  // --- Sorting ---
  const sortedData = data
  ? [...data].sort((a, b) => {
      let fieldA = a[sortBy];
      let fieldB = b[sortBy];

      if (sortDir === "asc") return fieldA > fieldB ? 1 : -1;
      return fieldA < fieldB ? 1 : -1;
    })
  : [];

  // --- Filtering ---
  const filteredData = sortedData.filter((coin) => {
  if (filterByChange === "gainers") return coin.changePct24h > 0;
  if (filterByChange === "losers") return coin.changePct24h < 0;
  return true; // "all"
  });

  // --- Search ---
  const finalData = filteredData.filter((coin) => {
  const q = searchQuery.toLowerCase();
  return (
    coin.name.toLowerCase().includes(q) ||
    coin.symbol.toLowerCase().includes(q)
  );
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crypto Tracker</h1>
  
      <CryptoToolbar
        sortBy={sortBy}
        sortDir={sortDir}
        filterByChange={filterByChange}
        searchQuery={searchQuery}
        onSortByChange={setSortBy}
        onSortDirChange={setSortDir}
        onFilterChange={setFilterByChange}
        onSearchChange={setSearchQuery}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />
  
      <CryptoList items={finalData} />
    </div>
  );  
}
