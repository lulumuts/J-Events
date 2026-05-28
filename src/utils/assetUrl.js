/** Public folder paths with correct Vite base (e.g. /J-Events/ on GitHub Pages). */
export function assetUrl(path) {
  if (!path) return path;
  const file = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${file}`;
}
