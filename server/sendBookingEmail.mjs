const REQUIRED = ['name', 'email', 'phone'];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function validate(body) {
  if (!body || typeof body !== 'object') {
    throw new Error('VALIDATION');
  }

  for (const key of REQUIRED) {
    if (!String(body[key] ?? '').trim()) {
      throw new Error('VALIDATION');
    }
  }

  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('VALIDATION');
  }

  const helpWith = Array.isArray(body.helpWith) ? body.helpWith.filter(Boolean) : [];
  const eventDetails = Array.isArray(body.eventDetails) ? body.eventDetails.filter(Boolean) : [];

  if (!helpWith.length || !eventDetails.length) {
    throw new Error('VALIDATION');
  }
}

function row(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;
}

export async function sendBookingEmail(body) {
  validate(body);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error('Missing email configuration (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)');
  }

  const helpWith = Array.isArray(body.helpWith) ? body.helpWith.filter(Boolean) : [];
  const eventDetails = Array.isArray(body.eventDetails) ? body.eventDetails.filter(Boolean) : [];

  const html = `
    <h2>New booking request</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.5">
      ${row('Name', body.name)}
      ${row('Email', body.email)}
      ${row('Phone', body.phone)}
      ${row('How can I help', helpWith.join(', '))}
      ${row('Event details', eventDetails.join(', '))}
    </table>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `New booking request — ${body.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Resend error:', errText);
    throw new Error('RESEND_FAILED');
  }
}
