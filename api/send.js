import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeFromName(name) {
  const cleaned = name
    .replace(/["'<>,]/g, '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, 60)
    .trim();

  return cleaned || 'Website visitor';
}

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body.', 400);
  }

  if (!body || typeof body !== 'object') {
    return jsonError('Name, email, and message are required.', 400);
  }

  const { name, email, message } = body;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return jsonError('Name, email, and message are required.', 400);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return jsonError('Name, email, and message are required.', 400);
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return jsonError('Enter a valid email address.', 400);
  }

  if (message.length >= 5000) {
    return jsonError('Message must be under 5000 characters.', 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
    return jsonError('Unable to send your message right now.', 500);
  }

  const fromName = safeFromName(trimmedName);
  const safeMessage = escapeHtml(trimmedMessage).replace(/\r\n|\r|\n/g, '<br>');
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
    <p><strong>Message:</strong><br>${safeMessage}</p>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `${fromName} <forms@mail.jgim.nl>`,
    to: [to],
    replyTo: trimmedEmail,
    subject: `New inquiry from ${fromName}`,
    html,
  });

  if (error) {
    console.error(error);
    return jsonError('Unable to send your message right now.', 500);
  }

  return Response.json({ ok: true });
}
