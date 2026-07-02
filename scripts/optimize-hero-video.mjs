/**
 * Encodes the hero background video for the web (MP4 + WebM).
 * Run: npm run optimize:video
 *
 * Requires the source file at src/assets/CC_FINAL TRAIELR V2.mov
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const input = path.join(root, 'src/assets/CC_FINAL TRAIELR V2.mov');
const outDir = path.join(root, 'public/hero');

const MAX_WIDTH = 1920;
const MP4_CRF = '28';
const WEBM_CRF = '35';

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.slice(-2000) || `ffmpeg exited ${code}`));
    });
    proc.on('error', reject);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function encode(outFile, extraArgs) {
  const scale = `scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos`;
  const args = [
    '-y',
    '-i',
    input,
    '-an',
    '-vf',
    scale,
    ...extraArgs,
    outFile,
  ];
  console.log(`→ ${path.basename(outFile)}`);
  await runFfmpeg(args);
  const { size } = fs.statSync(outFile);
  console.log(`  ${formatBytes(size)}`);
}

async function main() {
  if (!ffmpegPath) {
    console.error('ffmpeg binary not found (ffmpeg-static).');
    process.exit(1);
  }
  if (!fs.existsSync(input)) {
    console.error(`Source not found:\n  ${input}`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const mp4 = path.join(outDir, 'hero.mp4');
  const webm = path.join(outDir, 'hero.webm');

  console.log('Encoding hero video for web…\n');

  await encode(mp4, [
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    MP4_CRF,
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-tag:v',
    'avc1',
  ]);

  await encode(webm, [
    '-c:v',
    'libvpx-vp9',
    '-crf',
    WEBM_CRF,
    '-b:v',
    '0',
    '-row-mt',
    '1',
  ]);

  const sourceSize = fs.statSync(input).size;
  const mp4Size = fs.statSync(mp4).size;
  const webmSize = fs.statSync(webm).size;

  console.log('\nDone.');
  console.log(`  Source:  ${formatBytes(sourceSize)}`);
  console.log(`  MP4:     ${formatBytes(mp4Size)} (${Math.round((1 - mp4Size / sourceSize) * 100)}% smaller)`);
  console.log(`  WebM:    ${formatBytes(webmSize)} (${Math.round((1 - webmSize / sourceSize) * 100)}% smaller)`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
