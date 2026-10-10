export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || '';
export const sanityDataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';
export const sanityApiVersion =
  import.meta.env.VITE_SANITY_API_VERSION?.trim() || '2024-01-01';

export const isSanityConfigured = Boolean(sanityProjectId);
