import CryptoToolbar from "./components/CryptoToolbar";
import CryptoList from "./components/CryptoList";
import { useCryptoData } from "./hooks/useCryptoData";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./index.css";
import "./App.css";

export default function App() {
  const {
    data,
    isLoading,
    error,

    sortBy, setSortBy,
    sortDir, setSortDir,
    filterBy, setFilterBy,
    searchQuery, setSearchQuery,
    limit, setLimit,

    refresh,
  } = useCryptoData();

  // ---- Handlers (clean, explicit, self-documenting) ----
  const handleSortBy = (v: "marketCap" | "price" | "changePct24h") => setSortBy(v);

  const handleSortDir = () =>
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const handleFilter = (v: "all" | "gainers" | "losers") => setFilterBy(v);

  const handleSearch = (v: string) => setSearchQuery(v);

  const handleLimit = (v: 10 | 25) => setLimit(v);

  const handleRefresh = () => refresh();

  // ---- Loading + Error ----
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="app-container">
      <CryptoToolbar
        sortBy={sortBy}
        sortDir={sortDir}
        filterByChange={filterBy}
        searchQuery={searchQuery}
        limit={limit}
        onSortByChange={handleSortBy}
        onSortDirChange={handleSortDir}
        onFilterChange={handleFilter}
        onSearchChange={handleSearch}
        onLimitChange={handleLimit}
        onRefresh={handleRefresh}
      />

      <CryptoList items={data} />
    </div>
  );
}
