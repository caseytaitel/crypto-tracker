import type { Crypto } from "../types/crypto";

export function sortData(
  list: Crypto[],
  sortBy: "marketCap" | "price" | "changePct24h",
  sortDir: "asc" | "desc"
): Crypto[] {
  const sorted = [...list].sort((a, b) => {
    const fieldA = sortBy === "marketCap" ? a.marketCap :
                   sortBy === "price" ? a.price :
                   a.changePct24h;

    const fieldB = sortBy === "marketCap" ? b.marketCap :
                   sortBy === "price" ? b.price :
                   b.changePct24h;

    return sortDir === "asc"
      ? fieldA > fieldB ? 1 : -1
      : fieldA < fieldB ? 1 : -1;
  });

  return sorted;
}

export function filterByChange(
  list: Crypto[],
  mode: "all" | "gainers" | "losers"
): Crypto[] {
  if (mode === "gainers") return list.filter(c => c.changePct24h > 0);
  if (mode === "losers")  return list.filter(c => c.changePct24h < 0);
  return list;
}

export function searchData(
  list: Crypto[],
  query: string
): Crypto[] {
  if (!query) return list;
  const q = query.toLowerCase();
  return list.filter(coin =>
    coin.name.toLowerCase().includes(q) ||
    coin.symbol.toLowerCase().includes(q)
  );
}
