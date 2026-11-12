import 'server-only';
import { cache } from 'react';
import { readContent } from './files';
import { renderSections, renderFragment } from './markdown';
import type { Locale, Localized, InstructionsDoc, HtmlSection } from './types';

export const SECTION_IDS = {
  accounts: 'accounts-and-subscriptions-new',
  taskRow: '2-reading-your-task-row',
} as const;

function parseInstructions(text: string): Omit<InstructionsDoc, never> {
  const { preamble, sections } = renderSections(text, 2);

  // Drop the "Contents" section (it's a duplicate of the Toc)
  const contentSections = sections.filter(
    (s) => s.title.toLowerCase().trim() !== 'contents',
  );

  // The preamble includes the H1 + eyebrow paragraph + lead.
  // The eyebrow (bold "GUIDELINES") is rendered as a <p><strong>GUIDELINES</strong></p>.
  // We just return the preamble as-is; `lead` is preamble minus the H1.
  // For simplicity, `lead` = preamble rendered HTML (without the H1).
  // The H1 is extracted as the `title` from the first H1 in the preamble.
  const h1Match = preamble.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = h1Match ? stripTags(h1Match[1]) : 'Beehive';
  // `lead` = preamble HTML with the H1 removed (and the eyebrow p removed)
  const lead = preamble
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '')
    .replace(/<p[^>]*>\s*<strong>\s*GUIDELINES\s*<\/strong>\s*<\/p>/i, '')
    .trim();

  return { title, lead, sections: contentSections };
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

export const getInstructions = cache(
  async (locale: Locale): Promise<Localized<InstructionsDoc>> => {
    const file = readContent(locale, 'instructions.md');
    if (locale !== 'en' && file.isFallback) {
      console.warn(`[instructions] Falling back to English for locale: ${locale}`);
    }
    const doc = parseInstructions(file.text);
    return { ...doc, contentLocale: file.contentLocale, isFallback: file.isFallback };
  },
);

export const getInstructionSection = cache(
  async (locale: Locale, id: string): Promise<Localized<HtmlSection>> => {
    const doc = await getInstructions(locale);
    const section = doc.sections.find((s) => s.id === id);
    if (section) {
      return { ...section, contentLocale: doc.contentLocale, isFallback: doc.isFallback };
    }

    // Not found in this locale — if locale is not 'en', try English fallback
    if (locale !== 'en') {
      const enDoc = await getInstructions('en');
      const enSection = enDoc.sections.find((s) => s.id === id);
      if (enSection) {
        return { ...enSection, contentLocale: 'en', isFallback: true };
      }
    }

    throw new Error(`[instructions] Section not found in English: ${id}`);
  },
);
