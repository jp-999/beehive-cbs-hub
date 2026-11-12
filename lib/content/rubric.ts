import 'server-only';
import { cache } from 'react';
import { readContent } from './files';
import { parseMdast, cellText, cellHtml, renderFragment } from './markdown';
import type { Locale, Localized, RubricDoc, RubricRow, RubricBand } from './types';
import type { Table, TableRow } from 'mdast';

// Expected header columns (trimmed, lower-cased, normalised)
const EXPECTED_HEADERS = ['dimension', 'sub-dimension', 'notes for auditors', '1 - 2', '3 - 4', '5'];

function normalise(s: string): string {
  return s.replace(/\s+/g, ' ').toLowerCase().trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Split `[Label] text` into { label, text }. null label if no bracket prefix. */
function splitLabel(raw: string): RubricBand {
  const m = raw.match(/^\s*(\[.*?\])\s*([\s\S]*)$/);
  if (m) {
    return { label: m[1].trim(), text: m[2].trim() };
  }
  return { label: null, text: raw.trim() };
}

/** Apply rubric-specific text transforms to a band cell string. */
function transformBandText(raw: string): string | null {
  const t = raw.trim();
  if (t === '' || t === 'N/A') return null;
  // Pipe separators (from \| in source) → newlines
  let result = t.replace(/\|/g, '\n');
  // Collapse 3+ newlines → 2
  result = result.replace(/\n{3,}/g, '\n\n');
  return result.trim() || null;
}

/** Apply transforms to notes cell text. */
function transformNotes(raw: string): string | null {
  const t = raw.trim();
  if (t === '' || t === '#REF!') return null;
  return t || null;
}

function parseRubric(text: string): Omit<RubricDoc, never> {
  const mdast = parseMdast(text);

  // Find H1 title
  const h1 = (mdast.children as any[]).find((n) => n.type === 'heading' && n.depth === 1);
  if (!h1) throw new Error('[rubric] No H1 title found');
  const title = (h1.children as any[]).map((c: any) => c.value ?? '').join('').trim();

  // Collect intro (paragraphs before the first table)
  const introNodes: any[] = [];
  let firstTable: Table | null = null;
  for (const node of mdast.children as any[]) {
    if (node.type === 'table') {
      firstTable = node as Table;
      break;
    }
    if (node.type !== 'heading') {
      introNodes.push(node);
    }
  }
  if (!firstTable) throw new Error('[rubric] No table found');
  const intro = renderFragment(introNodes.map((n: any) => nodeToMd(n)).join('\n\n'));

  // Assert header
  const headerRow = firstTable.children[0] as TableRow;
  if (!headerRow) throw new Error('[rubric] Table has no header row');
  const headerCells = headerRow.children.map((cell) => normalise(cellText(cell)));
  if (headerCells.length !== 6) {
    throw new Error(`[rubric] Expected 6 header columns, got ${headerCells.length}`);
  }
  const expectedNorm = EXPECTED_HEADERS.map(normalise);
  for (let i = 0; i < 6; i++) {
    // Flexible match: "sub- dimension" → "sub-dimension"
    const actual = headerCells[i].replace(/\s*-\s*/g, '-');
    const expected = expectedNorm[i].replace(/\s*-\s*/g, '-');
    if (actual !== expected) {
      throw new Error(`[rubric] Header[${i}] expected "${expected}" got "${actual}"`);
    }
  }

  // Parse body rows
  const bodyRows = firstTable.children.slice(1) as TableRow[];
  if (bodyRows.length === 0) throw new Error('[rubric] No rubric rows found');

  const dimensionOrder: Map<string, string> = new Map(); // slug → name
  const rows: RubricRow[] = bodyRows.map((row) => {
    const cells = row.children;
    const dimension = cellText(cells[0]).trim();
    const subDimension = cellText(cells[1]).trim();
    const notesRaw = cellText(cells[2]).trim();
    const band1_2Raw = cellText(cells[3]).trim();
    const band3_4Raw = cellText(cells[4]).trim();
    const band5Raw = cellText(cells[5]).trim();

    const dimensionSlug = slugify(dimension);
    if (!dimensionOrder.has(dimensionSlug)) {
      dimensionOrder.set(dimensionSlug, dimension);
    }

    const notes = transformNotes(notesRaw);

    const b1_2text = transformBandText(band1_2Raw);
    const b3_4text = transformBandText(band3_4Raw);
    const b5text = transformBandText(band5Raw);

    const band1_2 = b1_2text !== null ? splitLabel(b1_2text) : null;
    const band3_4 = b3_4text !== null ? splitLabel(b3_4text) : null;
    const band5 = b5text !== null ? splitLabel(b5text) : null;

    const id = slugify(`${dimension}-${subDimension}`);

    const searchText = [
      dimension,
      subDimension,
      notes ?? '',
      b1_2text ?? '',
      b3_4text ?? '',
      b5text ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return { id, dimension, dimensionSlug, subDimension, notes, band1_2, band3_4, band5, searchText };
  });

  const dimensions = Array.from(dimensionOrder.entries()).map(([slug, name]) => ({
    name,
    slug,
  }));

  return { title, intro, rows, dimensions };
}

/** Minimal mdast node → markdown reconstructor for intro paragraphs. */
function nodeToMd(node: any): string {
  if (node.type === 'paragraph') {
    return (node.children as any[]).map(inlineToMd).join('') + '\n';
  }
  if (node.type === 'blockquote') {
    return (node.children as any[]).map((c: any) => '> ' + nodeToMd(c)).join('');
  }
  return '';
}
function inlineToMd(node: any): string {
  if (node.type === 'text') return node.value as string;
  if (node.type === 'strong') return `**${(node.children as any[]).map(inlineToMd).join('')}**`;
  if (node.type === 'emphasis') return `*${(node.children as any[]).map(inlineToMd).join('')}*`;
  if (node.type === 'inlineCode') return `\`${node.value}\``;
  if (node.type === 'html') return node.value as string;
  if (node.children) return (node.children as any[]).map(inlineToMd).join('');
  return '';
}

export const getRubric = cache(
  async (locale: Locale): Promise<Localized<RubricDoc>> => {
    const file = readContent(locale, 'qc-spec.md');
    if (locale !== 'en' && file.isFallback) {
      console.warn(`[rubric] Falling back to English for locale: ${locale}`);
    }
    try {
      const doc = parseRubric(file.text);
      return { ...doc, contentLocale: file.contentLocale, isFallback: file.isFallback };
    } catch (err) {
      if (file.isFallback) {
        // Translation parse failed — fall back to English
        console.warn('[rubric] Translation parse failed, using English:', err);
        const enFile = readContent('en', 'qc-spec.md');
        const doc = parseRubric(enFile.text);
        return { ...doc, contentLocale: 'en', isFallback: true };
      }
      throw err; // English failure → fail the build
    }
  },
);
