import { useContext } from 'react';
import { SiteContentContext } from '../context/siteContentContext';

export function useSiteContent() {
  return useContext(SiteContentContext);
}
