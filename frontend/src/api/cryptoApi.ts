import type { CryptoItem } from "../types/crypto";

const BASE_URL = "http://localhost:5001/api/crypto";

// ----------------------------
// GET: List of top coins
// ----------------------------
export async function getCryptoList(): Promise<CryptoItem[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch crypto list");
  }

  return res.json();
}

// ----------------------------
// GET: 24h history for one coin
// ----------------------------
export async function getCryptoHistory(id: string) {
  const res = await fetch(`${BASE_URL}/${id}/history`);

  if (!res.ok) {
    throw new Error("Failed to fetch crypto history");
  }

  return res.json();
}

// ----------------------------
// GET: Single coin (detail view)
// ----------------------------
export async function getCryptoById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch coin");
  }

  return res.json();
}
