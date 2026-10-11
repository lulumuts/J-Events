export async function submitBooking(form) {
  const message = [
    form.phone ? `Phone: ${form.phone}` : '',
    form.helpWith?.length ? `How can I help: ${form.helpWith.join(', ')}` : '',
    form.eventDetails?.length ? `Event details: ${form.eventDetails.join(', ')}` : '',
  ].filter(Boolean).join('\n');

  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Unable to send your message.');
  }
}
