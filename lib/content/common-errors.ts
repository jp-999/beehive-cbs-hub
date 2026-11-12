import 'server-only';
import { cache } from 'react';
import { readContent } from './files';
import { parseMdast, renderFragment } from './markdown';
import type { Locale, Localized, CommonErrorsDoc, DeckSlide, ErrorSlide } from './types';
import type { Root, BlockContent } from 'mdast';

function nodeToMdFull(node: any): string {
  // Simple mdast → markdown reconstruction for blockquote / misc
  function walk(n: any): string {
    switch (n.type) {
      case 'text': return n.value as string;
      case 'strong': return `**${(n.children as any[]).map(walk).join('')}**`;
      case 'emphasis': return `*${(n.children as any[]).map(walk).join('')}*`;
      case 'inlineCode': return `\`${n.value}\``;
      case 'html': return n.value as string;
      case 'break': return '\n';
      case 'link': return `[${(n.children as any[]).map(walk).join('')}](${n.url})`;
      case 'paragraph': return (n.children as any[]).map(walk).join('') + '\n';
      case 'heading': return `${'#'.repeat(n.depth)} ${(n.children as any[]).map(walk).join('')}\n`;
      case 'list': return (n.children as any[]).map((li: any) => {
        const prefix = n.ordered ? `${li.position?.start?.line ?? 1}. ` : '- ';
        return prefix + (li.children as any[]).map(walk).join('').replace(/^\n+|\n+$/g, '') + '\n';
      }).join('');
      case 'listItem': return (n.children as any[]).map(walk).join('');
      case 'blockquote': return (n.children as any[]).map((c: any) => '> ' + walk(c)).join('');
      case 'code': return `\`\`\`${n.lang ?? ''}\n${n.value}\n\`\`\`\n`;
      case 'thematicBreak': return '---\n';
      default:
        if (n.children) return (n.children as any[]).map(walk).join('');
        return n.value ?? '';
    }
  }
  return walk(node);
}

function renderNodes(nodes: any[]): string {
  if (nodes.length === 0) return '';
  return renderFragment(nodes.map(nodeToMdFull).join('\n'));
}

interface RawSlide {
  slide: number;
  heading: string;
  nodes: any[];
}

function parseCommonErrors(text: string): Omit<CommonErrorsDoc, never> {
  const mdast = parseMdast(text);
  const children = mdast.children as any[];

  // H1 → title
  const h1 = children.find((n) => n.type === 'heading' && n.depth === 1);
  if (!h1) throw new Error('[common-errors] No H1 found');
  const title = (h1.children as any[]).map((c: any) => c.value ?? '').join('').trim();

  // Leading blockquote → sourceNote
  const bq = children.find((n) => n.type === 'blockquote');
  const sourceNote = bq ? renderFragment(nodeToMdFull(bq)) : '';

  // Split at H2 `## Slide N — heading`
  const slideRegex = /^Slide\s+(\d+)\s+[—–-]\s+([\s\S]+)$/;
  const rawSlides: RawSlide[] = [];
  let currentSlide: RawSlide | null = null;

  for (const node of children) {
    if (node.type === 'heading' && node.depth === 2) {
      const headingText = (node.children as any[]).map((c: any) => c.value ?? '').join('').trim();
      const m = headingText.match(slideRegex);
      if (m) {
        if (currentSlide) rawSlides.push(currentSlide);
        const slideNum = parseInt(m[1], 10);
        const heading = m[2].trim();
        currentSlide = { slide: slideNum, heading, nodes: [] };
        continue;
      }
    }
    if (currentSlide) {
      currentSlide.nodes.push(node);
    }
  }
  if (currentSlide) rawSlides.push(currentSlide);

  if (rawSlides.length === 0) throw new Error('[common-errors] No slides found with "Slide N —" pattern');

  // Parse overview slide (#2) to get expected error number sets
  const overviewSlide = rawSlides.find((s) => s.slide === 2);
  const expectedRedoNums = new Set<number>();
  const expectedFormNums = new Set<number>();
  if (overviewSlide) {
    const overviewHtml = renderNodes(overviewSlide.nodes);
    const redoMatch = overviewHtml.match(/REDO[^<]*?((?:#\d+[^<]*?)+)/i);
    const formMatch = overviewHtml.match(/FORM\s+ERROR[^<]*?((?:#\d+[^<]*?)+)/i);
    const extractNums = (s?: string) =>
      s ? [...s.matchAll(/#(\d+)/g)].map((m) => parseInt(m[1], 10)) : [];
    extractNums(redoMatch?.[1]).forEach((n) => expectedRedoNums.add(n));
    extractNums(formMatch?.[1]).forEach((n) => expectedFormNums.add(n));
  }

  // Classify slides
  const before: DeckSlide[] = [];
  const redo: ErrorSlide[] = [];
  const form: ErrorSlide[] = [];
  const after: DeckSlide[] = [];
  let lastErrorSlideIndex = -1;

  // First pass: classify into general vs error slides
  const classified: { kind: 'before' | 'redo' | 'form' | 'after'; slide: RawSlide }[] = [];

  for (const s of rawSlides) {
    const hd = s.heading;
    const isRedo = hd.startsWith('Redo ');
    const isForm = hd.startsWith('Form ');
    if (isRedo || isForm) {
      classified.push({ kind: isRedo ? 'redo' : 'form', slide: s });
      lastErrorSlideIndex = classified.length - 1;
    } else {
      classified.push({ kind: 'before', slide: s });
    }
  }

  // Second pass: re-classify 'before' after the last error slide → 'after'
  const actualLastError = classified.reduce((max, item, i) =>
    item.kind !== 'before' ? i : max, -1);

  for (let i = 0; i < classified.length; i++) {
    if (classified[i].kind === 'before' && i > actualLastError) {
      classified[i].kind = 'after';
    }
  }

  // Build final lists
  const actualRedoNums = new Set<number>();
  const actualFormNums = new Set<number>();

  for (const { kind, slide } of classified) {
    const html = renderNodes(slide.nodes);
    const base: DeckSlide = { slide: slide.slide, id: `slide-${slide.slide}`, heading: slide.heading, html };

    if (kind === 'redo' || kind === 'form') {
      // Parse errorNumbers: every #(\d+) in the part before the first " · "
      const dotIdx = slide.heading.indexOf(' · ');
      const prefix = dotIdx >= 0 ? slide.heading.slice(0, dotIdx) : slide.heading;
      const errorNumbers = [...prefix.matchAll(/#(\d+)/g)].map((m) => parseInt(m[1], 10));
      const title = dotIdx >= 0 ? slide.heading.slice(dotIdx + 3).trim() : slide.heading;
      // counts: every parenthetical (N of M) or (N of M tasks) in the full heading
      const counts = [...slide.heading.matchAll(/\(([^)]+)\)/g)].map((m) => m[1]);

      const errorSlide: ErrorSlide = { ...base, kind, errorNumbers, title, counts };
      if (kind === 'redo') {
        redo.push(errorSlide);
        errorNumbers.forEach((n) => actualRedoNums.add(n));
      } else {
        form.push(errorSlide);
        errorNumbers.forEach((n) => actualFormNums.add(n));
      }
    } else if (kind === 'before') {
      before.push(base);
    } else {
      after.push(base);
    }
  }

  // Build assertion: compare actual error numbers vs expected from overview
  if (expectedRedoNums.size > 0 || expectedFormNums.size > 0) {
    const expectedAll = new Set([...expectedRedoNums, ...expectedFormNums]);
    const actualAll = new Set([...actualRedoNums, ...actualFormNums]);
    const missingFromActual = [...expectedAll].filter((n) => !actualAll.has(n));
    // Note: duplicates (same number on multiple slides like #7 on slides 3+4 and #11 on slides 8+9) are expected
    if (missingFromActual.length > 0) {
      throw new Error(
        `[common-errors] Build assertion failed: overview lists error number(s) ${missingFromActual.join(', ')} but no redo/form slide covers them`,
      );
    }
  }

  return { title, sourceNote, before, redo, form, after };
}

export const getCommonErrors = cache(
  async (locale: Locale): Promise<Localized<CommonErrorsDoc>> => {
    const file = readContent(locale, 'common-errors.md');
    if (locale !== 'en' && file.isFallback) {
      console.warn(`[common-errors] Falling back to English for locale: ${locale}`);
    }
    try {
      const doc = parseCommonErrors(file.text);
      return { ...doc, contentLocale: file.contentLocale, isFallback: file.isFallback };
    } catch (err) {
      if (file.isFallback) {
        console.warn('[common-errors] Translation parse failed, using English:', err);
        const enFile = readContent('en', 'common-errors.md');
        const doc = parseCommonErrors(enFile.text);
        return { ...doc, contentLocale: 'en', isFallback: true };
      }
      throw err;
    }
  },
);
