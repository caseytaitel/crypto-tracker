export interface PricePoint {
    timestamp: number;
    price: number;
  }
  
  export interface CryptoItem {
    id: string;
    name: string;
    symbol: string;
    price: number;
    changePct24h: number;
    marketCap: number;
    ath: number;
    atl: number;
    priceHistory24h: PricePoint[];
  }
  