import { createClient } from '@sanity/client';
import { isSanityConfigured, sanityApiVersion, sanityDataset, sanityProjectId } from './env';

export function createSanityClient() {
  if (!isSanityConfigured) return null;

  const base = {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: true,
  };

  // Dev: proxy via Vite so any localhost port works without extra Sanity CORS entries.
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return createClient({
      ...base,
      useProjectHostname: false,
      apiHost: `${window.location.origin}/sanity-cdn`,
    });
  }

  return createClient(base);
}

let cachedClient;

/** Lazy init so dev always sees `window` and uses the /sanity-cdn proxy. */
export function getSanityClient() {
  if (!isSanityConfigured) return null;
  if (!cachedClient) cachedClient = createSanityClient();
  return cachedClient;
}
