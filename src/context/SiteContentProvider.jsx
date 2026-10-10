import { useEffect, useMemo, useState } from 'react';
import { buildFallbackContent } from '../lib/sanity/fallbackContent';
import { fetchSiteContent } from '../lib/sanity/fetchSiteContent';
import { isSanityConfigured } from '../lib/sanity/env';
import { SiteContentContext } from './siteContentContext';

export function SiteContentProvider({ children }) {
  const fallback = useMemo(() => buildFallbackContent(), []);
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(isSanityConfigured);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return undefined;

    let cancelled = false;

    fetchSiteContent().then((result) => {
      if (cancelled) return;
      setContent(result.content);
      setFromCms(result.fromCms);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const title = content.siteSettings?.siteTitle;
    if (title) document.title = title;

    const description = content.siteSettings?.metaDescription;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [content.siteSettings?.metaDescription, content.siteSettings?.siteTitle]);

  const value = useMemo(
    () => ({ content, loading, fromCms }),
    [content, loading, fromCms],
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}
