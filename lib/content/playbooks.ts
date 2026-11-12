import 'server-only';
import { cache } from 'react';
import { readdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';
import { readContent } from './files';
import { renderSections } from './markdown';
import type { Locale, Localized, PlaybookMeta, PlaybookDoc } from './types';

const PLAYBOOKS_DIR = join(process.cwd(), 'content', 'source', 'eval-playbooks');

/** Convert a filename stem to a URL slug. README → 'overview'. */
function stemToSlug(stem: string): string {
  if (stem === 'README') return 'overview';
  // CamelCase / PascalCase → kebab
  return stem
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function extractH1(text: string): string {
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '(Untitled)';
}

export const listPlaybooks = cache((): PlaybookMeta[] => {
  const files = readdirSync(PLAYBOOKS_DIR).filter((f) => f.endsWith('.md'));
  const metas: PlaybookMeta[] = files.map((f) => {
    const stem = basename(f, '.md');
    const slug = stemToSlug(stem);
    const text = readFileSync(join(PLAYBOOKS_DIR, f), 'utf8');
    const title = extractH1(text);
    return { slug, title, file: f };
  });

  // 'overview' (README) first, then alphabetical by title
  metas.sort((a, b) => {
    if (a.slug === 'overview') return -1;
    if (b.slug === 'overview') return 1;
    return a.title.localeCompare(b.title);
  });

  return metas;
});

export const getPlaybook = cache(
  async (locale: Locale, slug: string): Promise<Localized<PlaybookDoc>> => {
    const metas = listPlaybooks();
    const meta = metas.find((m) => m.slug === slug);
    if (!meta) throw new Error(`[playbooks] Unknown slug: ${slug}`);

    const relPath = `eval-playbooks/${meta.file}`;
    const file = readContent(locale, relPath);
    if (locale !== 'en' && file.isFallback) {
      console.warn(`[playbooks] Falling back to English for locale: ${locale}, slug: ${slug}`);
    }

    try {
      const { preamble, sections } = renderSections(file.text, 2);
      const title = extractH1(file.text);
      // lead = preamble with H1 stripped
      const lead = preamble
        .replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '')
        .trim();

      return {
        slug,
        title,
        file: meta.file,
        sections,
        lead,
        contentLocale: file.contentLocale,
        isFallback: file.isFallback,
      };
    } catch (err) {
      if (file.isFallback) {
        console.warn('[playbooks] Translation parse failed, using English:', err);
        const enFile = readContent('en', relPath);
        const { preamble, sections } = renderSections(enFile.text, 2);
        const title = extractH1(enFile.text);
        const lead = preamble.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '').trim();
        return {
          slug,
          title,
          file: meta.file,
          sections,
          lead,
          contentLocale: 'en',
          isFallback: true,
        };
      }
      throw err;
    }
  },
);
