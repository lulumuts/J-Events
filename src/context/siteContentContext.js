import { createContext } from 'react';
import { buildFallbackContent } from '../lib/sanity/fallbackContent';

export const SiteContentContext = createContext({
  content: buildFallbackContent(),
  loading: false,
  fromCms: false,
});
