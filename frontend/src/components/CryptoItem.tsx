import type { CryptoItem } from "../types/crypto";

interface Props {
  coin: CryptoItem;
}

export default function CryptoItem({ coin }: Props) {
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <strong>
        {coin.name} ({coin.symbol})
      </strong>
      <div>Price: ${coin.price}</div>
      <div>24h Change: {coin.changePct24h}%</div>
      <div>Market Cap: {coin.marketCap}</div>
    </div>
  );
}
