import { cpSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const src = resolve(root, 'content', 'media');
const dest = resolve(root, 'public', 'media');

if (existsSync(src)) {
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log('✓ Copied content/media → public/media');
} else {
  console.log('ℹ  content/media not found; skipping copy.');
}
