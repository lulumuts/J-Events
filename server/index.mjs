import 'dotenv/config';
import express from 'express';
import { POST as sendInquiry } from '../api/send.js';
import { sendBookingEmail } from './sendBookingEmail.mjs';
import { applyContactCors } from './contactCors.mjs';

const app = express();
const PORT = process.env.PORT || 8787;

app.use(express.json({ limit: '32kb' }));

app.use('/api/contact', (req, res, next) => {
  applyContactCors(req, res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
});

app.post('/api/send', async (req, res) => {
  try {
    const request = new Request('http://localhost/api/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    });
    const response = await sendInquiry(request);
    const text = await response.text();
    const contentType = response.headers.get('content-type');
    if (contentType) res.setHeader('content-type', contentType);
    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to send your message right now.' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    await sendBookingEmail(req.body);
    res.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    const message = err?.message === 'VALIDATION'
      ? 'Please check the form and try again.'
      : 'Unable to send your request right now. Please try again later.';
    res.status(err?.message === 'VALIDATION' ? 400 : 500).json({ ok: false, message });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
