export function coalesceString(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed : fallback;
}

export function coalesceArray(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return value;
}

export function coalesceBlocks(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return value;
}
