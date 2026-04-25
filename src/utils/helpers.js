export const clamp = (value = 0, min = 0, max = Number.MAX_SAFE_INTEGER) =>
  Math.min(Math.max(value, min), max);

export const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

export const getObjectValues = (obj) => Object.values(obj || {});
