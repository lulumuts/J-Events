import { sendBookingEmail } from '../server/sendBookingEmail.mjs';

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    await sendBookingEmail(req.body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    const message = err?.message === 'VALIDATION'
      ? 'Please check the form and try again.'
      : 'Unable to send your request right now. Please try again later.';
    const status = err?.message === 'VALIDATION' ? 400 : 500;
    return res.status(status).json({ ok: false, message });
  }
}
