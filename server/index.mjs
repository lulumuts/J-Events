import 'dotenv/config';
import express from 'express';
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
