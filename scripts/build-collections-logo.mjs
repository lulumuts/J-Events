import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logosDir = join(__dirname, '../src/assets/logos');

const sourceCandidates = [
  join(logosDir, 'COLLECTIONS_LOGO.png'),
  '/Users/lulumutuli/Dropbox/My Mac (lulu’s MacBook Pro)/Downloads/COLLECTIONS_LOGO.png',
];

async function processCollectionsLogo(sourcePath) {
  const outputPath = join(logosDir, 'collections-logo.png');
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha <= 20) {
      data[i + 3] = 0;
      continue;
    }

    data[i] = 17;
    data[i + 1] = 17;
    data[i + 2] = 17;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(1024, 405, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath);

  console.log(`Processed ${sourcePath} -> ${outputPath}`);
}

for (const sourcePath of sourceCandidates) {
  try {
    await processCollectionsLogo(sourcePath);
    break;
  } catch {
    // try next source
  }
}
