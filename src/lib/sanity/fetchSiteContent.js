import { getSanityClient } from './client';
import { normalizeSiteContent } from './normalizeContent';
import { siteContentQuery } from './queries';

export async function fetchSiteContent() {
  const sanityClient = getSanityClient();
  if (!sanityClient) {
    return normalizeSiteContent(null);
  }

  try {
    const raw = await sanityClient.fetch(siteContentQuery);
    return normalizeSiteContent(raw);
  } catch (err) {
    console.error('Sanity fetch failed:', err);
    return normalizeSiteContent(null);
  }
}
