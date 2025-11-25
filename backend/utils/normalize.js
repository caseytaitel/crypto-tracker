// Normalization helpers for CoinGecko response data

function roundValue(num) {
    if (num === null || num === undefined) return 0;
  
    // Large values (BTC, ETH) → 2 decimals
    if (num > 1) return Number(num.toFixed(2));
  
    // Smaller values → more precision (up to 6 decimals)
    return Number(num.toFixed(6));
  }
  
  function normalizeCoin(data) {
    return {
      id: data.id ?? "unknown",
      name: data.name ?? "Unknown",
      symbol: data.symbol ? data.symbol.toUpperCase() : "",
      price: roundValue(data.current_price),
      changePct24h: roundValue(data.price_change_percentage_24h),
      marketCap: data.market_cap ?? 0,
      ath: roundValue(data.ath),
      atl: roundValue(data.atl),
      priceHistory24h: [] // to be filled later
    };
  }
  
  function normalizeHistory(historyResponse) {
    if (!historyResponse || !historyResponse.prices) return [];
  
    return historyResponse.prices.map(([timestamp, price]) => ({
      timestamp,
      price: roundValue(price)
    }));
  }
  
  module.exports = {
    normalizeCoin,
    normalizeHistory
  };
  