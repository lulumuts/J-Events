/** CORS for cross-origin booking POSTs (e.g. GitHub Pages → Vercel API). */
export function applyContactCors(req, res) {
  const origin = req.headers.origin;

  if (origin) {
    const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (allowed.length === 0 || allowed.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
