import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logosDir = join(__dirname, '../src/assets/logos');

async function removeBlackBackground(fileName, threshold = 22) {
  const inputPath = join(logosDir, fileName);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(inputPath);

  console.log(`Processed ${fileName}`);
}

async function removeEdgeBlackBackground(fileName, threshold = 22) {
  const inputPath = join(logosDir, fileName);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const total = w * h;

  const isBg = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r <= threshold && g <= threshold && b <= threshold;
  };

  const bg = new Uint8Array(total);
  const queue = [];

  const tryAdd = (x, y) => {
    const i = y * w + x;
    if (bg[i]) return;
    const idx = i * 4;
    if (!isBg(idx)) return;
    bg[i] = 1;
    queue.push(i);
  };

  for (let x = 0; x < w; x += 1) {
    tryAdd(x, 0);
    tryAdd(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    tryAdd(0, y);
    tryAdd(w - 1, y);
  }

  while (queue.length) {
    const i = queue.pop();
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) tryAdd(x - 1, y);
    if (x < w - 1) tryAdd(x + 1, y);
    if (y > 0) tryAdd(x, y - 1);
    if (y < h - 1) tryAdd(x, y + 1);
  }

  for (let i = 0; i < total; i += 1) {
    if (bg[i]) data[i * 4 + 3] = 0;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(inputPath);

  console.log(`Processed ${fileName} (edge flood fill)`);
}

await removeBlackBackground('e3g-logo.png');
await removeBlackBackground('discom-logo.png');
await removeEdgeBlackBackground('julies-top-5-logo.png');
