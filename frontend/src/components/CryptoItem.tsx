import type { CryptoItem } from "../types/crypto";

interface Props {
  coin: CryptoItem;
}

export default function CryptoItem({ coin }: Props) {
  
  const change = coin.changePct24h;
  const badgeColor =
  change > 0 ? "green" :
  change < 0 ? "red" :
  "gray";

  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <strong>
        {coin.name} ({coin.symbol})
      </strong>
      <div>Price: ${coin.price}</div>
      <div
        style={{
          backgroundColor: badgeColor,
          color: "white",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "0.8rem",
        }}
      >
        {change > 0 ? "+" : ""}
        {change}%
      </div>
      <div>Market Cap: {coin.marketCap}</div>
    </div>
  );
}
