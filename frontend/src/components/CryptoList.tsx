import CryptoItem from "./CryptoItem";
import type { Crypto } from "../types/crypto";

interface Props {
  items: Crypto[];
}

export default function CryptoList({ items }: Props) {
  return (
    <div>
      {items.map((coin) => (
        <CryptoItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
