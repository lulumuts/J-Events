const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

function bookingPayload(form) {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    _replyto: form.email,
    _subject: `New booking request — ${form.name}`,
    _template: 'table',
    _captcha: 'false',
    'How can I help': form.helpWith.join(', '),
    'Event details': form.eventDetails.join(', '),
  };
}

async function submitViaApi(form) {
  const res = await fetch(contactApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }
}

/** GitHub Pages is static, so bookings go through FormSubmit to the local inbox. */
async function submitViaFormSubmit(form) {
  const inbox = String(import.meta.env.VITE_BOOKING_INBOX || '').trim();
  if (!inbox) {
    throw new Error('Unable to send. Please try again.');
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bookingPayload(form)),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== 'true') {
    const message = String(data.message || '');
    if (/activation/i.test(message)) {
      throw new Error(`Check ${inbox} for a FormSubmit activation email, then submit again.`);
    }
    throw new Error(message || 'Unable to send. Please try again.');
  }
}

export async function submitBooking(form) {
  const pagesBuild = import.meta.env.VITE_GH_PAGES === 'true';
  const hasHostedApi = Boolean(import.meta.env.VITE_CONTACT_API_URL);

  if (pagesBuild && !hasHostedApi) {
    await submitViaFormSubmit(form);
    return;
  }

  await submitViaApi(form);
}
