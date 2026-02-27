const cache = {};

export const getCachedData = (key) => {
  const item = cache[key];

  if (!item) return null;

  const now = Date.now();
  const isExpired = now - item.timestamp > 60000; // 60 sec

  if (isExpired) {
    delete cache[key];
    return null;
  }

  return item.data;
};

export const setCachedData = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
};