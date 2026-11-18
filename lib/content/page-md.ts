import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { renderFull } from './markdown';

/**
 * Render a content markdown file to HTML for a given locale.
 * Prefers `content/translations/<locale>/<file>`, falls back to
 * `content/source/<file>`. Returns '' if neither exists.
 */
export function getPageMd(locale: string, file: string): string {
  const candidates =
    locale !== 'en'
      ? [
          path.join(process.cwd(), 'content', 'translations', locale, file),
          path.join(process.cwd(), 'content', 'source', file),
        ]
      : [path.join(process.cwd(), 'content', 'source', file)];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return renderFull(fs.readFileSync(p, 'utf8'));
    } catch {
      /* try next candidate */
    }
  }
  return '';
}
