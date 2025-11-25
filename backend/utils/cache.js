// Simple in-memory cache used for list + per-coin history

const cache = {
    list: {
      data: null,
      timestamp: 0
    },
    history: {
      // coinId: { data: [...], timestamp: <ms> }
    }
  };
  
  module.exports = cache;
  