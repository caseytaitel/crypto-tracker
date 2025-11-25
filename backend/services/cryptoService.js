const axios = require('axios');
const cache = require('../utils/cache');
const { normalizeCoin, normalizeHistory } = require('../utils/normalize');
const AppError = require('../errors/AppError');

// Base CoinGecko URL
const BASE_URL = 'https://api.coingecko.com/api/v3';


// Helper: Bounded concurrency
async function fetchInBatches(ids, batchSize, fetchFn) {
  const results = [];

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);

    // Run fetch operations for this batch in parallel
    const batchResults = await Promise.all(
      batch.map(id => fetchFn(id).catch(err => {
        console.error(`History fetch failed for ${id}:`, err);
        return [];
      }))
    );

    results.push(...batchResults);
  }

  return results;
}


// Service: Fetch market data (list view)
async function fetchMarketData(limit = 25) {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1
      }
    });

    return response.data.map(normalizeCoin);
  } catch (err) {
    throw new AppError('Failed to fetch market data from external API.', 502);
  }
}


// Service: Fetch 24h price history for one coin
async function fetchPriceHistory(id) {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 1
      }
    });

    return normalizeHistory(response.data);
  } catch (err) {
    console.error(`Failed history fetch for ${id}:`, err);
    return [];
  }
}


// Main: Get full list + price history
async function getCryptoList(limit = 25) {
  const now = Date.now();

  // Use cached list if fresh (< 60 seconds)
  if (cache.list.data && now - cache.list.timestamp < 60_000) {
    return cache.list.data;
  }

  // 1. Fetch normalized market data
  const coins = await fetchMarketData(limit);

  // 2. Extract coin IDs
  const ids = coins.map(c => c.id);

  // 3. Fetch histories in batches of 5
  const histories = await fetchInBatches(ids, 5, fetchPriceHistory);

  // 4. Attach histories to coins
  coins.forEach((coin, i) => {
    coin.priceHistory24h = histories[i] || [];
  });

  // 5. Save to cache
  cache.list.data = coins;
  cache.list.timestamp = now;

  return coins;
}


// Return history for one coin (with 5–10 min TTL)
async function getCryptoHistory(id) {
  const now = Date.now();

  // If cached and fresh (<= 10 minutes)
  if (cache.history[id] && now - cache.history[id].timestamp < 600_000) {
    return {
      id,
      priceHistory24h: cache.history[id].data
    };
  }

  // Fetch new
  const history = await fetchPriceHistory(id);

  // Update cache
  cache.history[id] = {
    data: history,
    timestamp: now
  };

  return {
    id,
    priceHistory24h: history
  };
}


// Optional: Return normalized single coin
async function getCryptoById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: id
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new AppError('Coin not found.', 404);
    }

    return normalizeCoin(response.data[0]);
  } catch (err) {
    throw new AppError('Failed to fetch coin data.', 502);
  }
}


// Export service functions
module.exports = {
  getCryptoList,
  getCryptoHistory,
  getCryptoById
};
