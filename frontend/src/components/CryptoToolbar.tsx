interface Props {
    sortBy: "marketCap" | "price" | "changePct24h";
    sortDir: "asc" | "desc";
    filterByChange: "all" | "gainers" | "losers";
    searchQuery: string;
  
    onSortByChange: (value: "marketCap" | "price" | "changePct24h") => void;
    onSortDirChange: (value: "asc" | "desc") => void;
    onFilterChange: (value: "all" | "gainers" | "losers") => void;
    onSearchChange: (value: string) => void;
    onRefresh: () => void;
  }
  
  export default function CryptoToolbar({
    sortBy,
    sortDir,
    filterByChange,
    searchQuery,
    onSortByChange,
    onSortDirChange,
    onFilterChange,
    onSearchChange,
    onRefresh
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
        <select
          value={sortDir}
          onChange={(e) =>
            onSortDirChange(e.target.value as "asc" | "desc")
          }
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
  
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
  
        {/* Refresh */}
        <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }  