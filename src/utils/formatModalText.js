export function formatModalText(text) {
  if (!text) return text;
  return text.replace(/\s*[—–]\s*/g, ': ');
}
