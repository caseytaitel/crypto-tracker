interface Props {
    sortBy: "marketCap" | "price" | "changePct24h";
    sortDir: "asc" | "desc";
    filterByChange: "all" | "gainers" | "losers";
    searchQuery: string;
    limit: 10 | 25;
  
    onSortByChange: (value: "marketCap" | "price" | "changePct24h") => void;
    onSortDirChange: (value: "asc" | "desc") => void;
    onFilterChange: (value: "all" | "gainers" | "losers") => void;
    onSearchChange: (value: string) => void;
    onRefresh: () => void;
    onLimitChange: (value: 10 | 25) => void;
  }
  
  export default function CryptoToolbar({
    sortBy,
    sortDir,
    filterByChange,
    searchQuery,
    limit,
    onSortByChange,
    onSortDirChange,
    onFilterChange,
    onSearchChange,
    onRefresh,
    onLimitChange
  }: Props) {
    return (
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        
        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) =>
            onSortByChange(e.target.value as "marketCap" | "price" | "changePct24h")
          }
        >
          <option value="marketCap">Market Cap</option>
          <option value="price">Price</option>
          <option value="changePct24h">% Change (24h)</option>
        </select>
  
        {/* Direction */}
        <button
          onClick={() =>
            onSortDirChange(sortDir === "asc" ? "desc" : "asc")
          }
          style={{
            padding: "4px 8px",
            cursor: "pointer"
          }}
        >
          {sortDir === "asc" ? "↑" : "↓"}
        </button>

        {/* Filter */}
        <select
          value={filterByChange}
          onChange={(e) =>
            onFilterChange(e.target.value as "all" | "gainers" | "losers")
          }
        >
          <option value="all">All</option>
          <option value="gainers">Gainers</option>
          <option value="losers">Losers</option>
        </select>
  
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Top 10 Limit */}
        <select
          value={limit}
          onChange={(e) => onLimitChange(parseInt(e.target.value) as 10 | 25)}
        >
          <option value={25}>Top 25</option>
          <option value={10}>Top 10</option>
        </select>

  
        {/* Refresh */}
        <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }  