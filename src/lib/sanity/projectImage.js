import { assetUrl } from '../../utils/assetUrl';

export function projectImageSrc(project) {
  if (!project) return '';
  if (project.imageSrc) return project.imageSrc;
  if (project.image) return assetUrl(project.image);
  return '';
}
