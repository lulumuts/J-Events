/**
 * Sanity publish webhook → Vercel deploy hook.
 * Set SANITY_WEBHOOK_SECRET and VERCEL_DEPLOY_HOOK_URL in Vercel env (not VITE_).
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const expected = process.env.SANITY_WEBHOOK_SECRET;
  if (!expected) {
    return res.status(500).json({ ok: false, message: 'Webhook secret not configured' });
  }

  const provided =
    req.headers['x-sanity-webhook-secret']
    || req.headers['authorization']?.replace(/^Bearer\s+/i, '')
    || req.query?.secret;

  if (provided !== expected) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    return res.status(500).json({ ok: false, message: 'Deploy hook URL not configured' });
  }

  try {
    const deployRes = await fetch(deployHookUrl, { method: 'POST' });
    if (!deployRes.ok) {
      const text = await deployRes.text().catch(() => '');
      console.error('Deploy hook failed:', deployRes.status, text);
      return res.status(502).json({ ok: false, message: 'Deploy hook failed' });
    }

    return res.status(200).json({ ok: true, redeploy: true });
  } catch (err) {
    console.error('Sanity webhook error:', err);
    return res.status(500).json({ ok: false, message: 'Unable to trigger deploy' });
  }
}
