import 'server-only';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { ContentFile, Locale } from './types';

const contentRoot = join(process.cwd(), 'content');

/**
 * Resolves a content file for the given locale.
 * - Tries `content/translations/<locale>/<relPath>` first.
 * - Falls back to `content/source/<relPath>` with contentLocale 'en'.
 * - Throws if the English source is missing.
 * - `isFallback` = true when locale !== 'en' and the English source is used.
 */
export function readContent(locale: Locale, relPath: string): ContentFile {
  const sourcePath = join(contentRoot, 'source', relPath);

  if (locale !== 'en') {
    const translationPath = join(contentRoot, 'translations', locale, relPath);
    if (existsSync(translationPath)) {
      try {
        return {
          text: readFileSync(translationPath, 'utf8'),
          contentLocale: locale,
          isFallback: false,
        };
      } catch (err) {
        console.warn(
          `[content] Translation file exists but failed to read: ${translationPath}`,
          err,
        );
        // fall through to English
      }
    }
  }

  if (!existsSync(sourcePath)) {
    throw new Error(`[content] English source not found: ${relPath}`);
  }

  return {
    text: readFileSync(sourcePath, 'utf8'),
    contentLocale: 'en',
    isFallback: locale !== 'en',
  };
}
