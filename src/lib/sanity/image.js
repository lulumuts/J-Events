import { createImageUrlBuilder } from '@sanity/image-url';
import { isSanityConfigured, sanityDataset, sanityProjectId } from './env';

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset })
  : null;

export function urlForImage(source) {
  if (!source || !builder) return null;
  return builder.image(source);
}

export function imageSrcFromSanity(source, { width, height, quality = 80 } = {}) {
  const url = urlForImage(source);
  if (!url) return null;

  let chain = url.auto('format').quality(quality);
  if (width) chain = chain.width(width);
  if (height) chain = chain.height(height);
  return chain.url();
}

export function fileUrlFromSanity(fileAsset) {
  if (!fileAsset?.asset?._ref || !isSanityConfigured) return null;
  const ref = fileAsset.asset._ref;
  const [, id, ext] = ref.match(/^file-(.+)-(\w+)$/) || [];
  if (!id || !ext) return null;
  return `https://cdn.sanity.io/files/${sanityProjectId}/${sanityDataset}/${id}.${ext}`;
}
