import type { Crypto } from "../types/crypto";
import { getBadgeColor } from "../utils/getBadgeColor";
import { Badge } from "./ui/Badge";

interface Props {
  coin: Crypto;
}

export default function CryptoItem({ coin }: Props) {
  
  const change = coin.changePct24h;
  const badgeColor = getBadgeColor(change);

  return (
    <div className="crypto-item">
      <div className="crypto-left">
        <strong>{coin.name}</strong> ({coin.symbol.toUpperCase()})
      </div>

      <div className="crypto-right">
        <span>${coin.price.toLocaleString()}</span>
        <Badge color={badgeColor}>
          {coin.changePct24h > 0 ? "+" : ""}
          {coin.changePct24h.toFixed(2)}%
        </Badge>
      </div>
    </div>
  );
}
