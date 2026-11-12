import 'server-only';
import { cache } from 'react';
import { readContent } from './files';
import { parseMdast, cellText, cellHtml, renderFragment } from './markdown';
import type { Locale, Localized, ExamplesDoc, RatedExample, TemplateRow, FieldKey } from './types';
import type { Table, TableRow, Heading } from 'mdast';

// Maps source table label → typed field key
const FIELD_LABEL_MAP: Record<string, FieldKey> = {
  'conversation link': 'conversationLink',
  'overall satisfaction': 'overallSatisfaction',
  'issues': 'issues',
  'detail of issues': 'detailOfIssues',
  'turns (issues)': 'turns',
  'rubric': 'rubric',
  'justification (rubric)': 'rubricJustification',
  'country fit': 'countryFit',
  'especially good': 'especiallyGood',
  'especially bad': 'especiallyBad',
};

const SATISFACTION_SCORE: Record<string, 1 | 2 | 3 | 4 | 5> = {
  'very satisfied': 5,
  'somewhat satisfied': 4,
  'neither satisfied nor dissatisfied': 3,
  'somewhat dissatisfied': 2,
  'very dissatisfied': 1,
};

function nodeToMdSimple(node: any): string {
  function walk(n: any): string {
    switch (n.type) {
      case 'text': return n.value as string;
      case 'strong': return `**${(n.children as any[]).map(walk).join('')}**`;
      case 'emphasis': return `*${(n.children as any[]).map(walk).join('')}*`;
      case 'inlineCode': return `\`${n.value}\``;
      case 'html': return n.value as string;
      case 'link': return `[${(n.children as any[]).map(walk).join('')}](${n.url})`;
      case 'paragraph': return (n.children as any[]).map(walk).join('');
      case 'listItem': return (n.children as any[]).map(walk).join('');
      case 'list': {
        const ordered = n.ordered as boolean;
        return (n.children as any[]).map((li: any, i: number) =>
          `${ordered ? `${i + 1}.` : '-'} ${(li.children as any[]).map(walk).join('').trim()}`
        ).join('\n');
      }
      default:
        if (n.children) return (n.children as any[]).map(walk).join('');
        return n.value ?? '';
    }
  }
  return walk(node);
}

function parseExamples(text: string, locale: string): Omit<ExamplesDoc, never> {
  const mdast = parseMdast(text);
  const children = mdast.children as any[];

  // Find H2 starting with "12."
  let section12Start = -1;
  let section12End = children.length;
  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    if (n.type === 'heading' && n.depth === 2) {
      const text = (n.children as any[]).map((c: any) => c.value ?? '').join('').trim();
      if (text.startsWith('12.') || text.startsWith('12 ')) {
        section12Start = i;
      } else if (section12Start >= 0) {
        section12End = i;
        break;
      }
    }
  }
  if (section12Start < 0) {
    throw new Error('[examples] Could not find §12 heading (starting with "12.")');
  }

  const sec12Children = children.slice(section12Start + 1, section12End);

  // `intro` = first paragraph(s) before the first table
  const introNodes: any[] = [];
  let templateTable: Table | null = null;
  let noteTable: Table | null = null;
  let templateTableIdx = -1;

  for (let i = 0; i < sec12Children.length; i++) {
    const n = sec12Children[i];
    if (n.type === 'table') {
      if (templateTable === null) {
        templateTable = n as Table;
        templateTableIdx = i;
        // Check if this is the single-cell note table
        const firstRow = (n as Table).children[0] as TableRow;
        const firstCellText = firstRow ? cellText(firstRow.children[0]).trim() : '';
        if (firstCellText.toLowerCase().startsWith('use these for structure')) {
          // This is the note table, not the template table
          noteTable = n as Table;
          templateTable = null;
        }
      } else if (noteTable === null) {
        // Check if second table is the note
        const firstRow = (n as Table).children[0] as TableRow;
        const firstCellText = firstRow ? cellText(firstRow.children[0]).trim() : '';
        if (firstCellText.toLowerCase().startsWith('use these for structure')) {
          noteTable = n as Table;
        }
      }
      break; // stop adding intro nodes at first table
    }
    if (n.type !== 'heading') {
      introNodes.push(n);
    }
  }

  const intro = introNodes.length > 0
    ? renderFragment(introNodes.map(nodeToMdSimple).join('\n\n'))
    : '';

  // Parse template table (Col | Template | Example)
  const templateRows: TemplateRow[] = [];
  if (templateTable) {
    const tRows = (templateTable as Table).children;
    // Skip header row
    for (const row of tRows.slice(1)) {
      const cells = row.children;
      if (cells.length >= 3) {
        templateRows.push({
          col: cellHtml(cells[0]),
          template: cellHtml(cells[1]),
          example: cellHtml(cells[2]),
        });
      }
    }
  }

  // Parse note table (single-cell callout)
  let note = '';
  if (noteTable) {
    const firstRow = (noteTable as Table).children[0] as TableRow;
    if (firstRow) note = cellHtml(firstRow.children[0]);
  }

  // Parse H3 examples
  const examples: RatedExample[] = [];
  const exampleRegex = /^Example\s+(\d+)\s*:\s*(.*?)\s*\((.+?)\)\s*$/i;

  let i = 0;
  while (i < sec12Children.length) {
    const n = sec12Children[i];
    if (n.type === 'heading' && n.depth === 3) {
      const headingText = (n.children as any[]).map((c: any) => c.value ?? '').join('').trim();
      const m = headingText.match(exampleRegex);
      if (m) {
        const number = parseInt(m[1], 10);
        const satisfactionLabel = m[2].trim();
        const satisfactionStr = m[3].trim();
        const scoreStr = satisfactionStr.match(/\d+/)?.[0];
        const score = (scoreStr ? parseInt(scoreStr, 10) : SATISFACTION_SCORE[satisfactionLabel.toLowerCase()]) as 1 | 2 | 3 | 4 | 5;
        if (!score || score < 1 || score > 5) {
          throw new Error(`[examples] Invalid satisfaction score in: "${headingText}"`);
        }

        // Collect nodes until next H3
        i++;
        const exampleNodes: any[] = [];
        while (i < sec12Children.length) {
          const nn = sec12Children[i];
          if (nn.type === 'heading' && nn.depth === 3) break;
          exampleNodes.push(nn);
          i++;
        }

        // First bold paragraph → title
        let title = '';
        let predefinedRubric: string[] = [];
        let fieldsTable: Table | null = null;

        for (let j = 0; j < exampleNodes.length; j++) {
          const en = exampleNodes[j];
          if (!title && en.type === 'paragraph') {
            const firstChild = en.children?.[0];
            if (firstChild?.type === 'strong') {
              title = (firstChild.children as any[]).map((c: any) => c.value ?? '').join('').trim();
              continue;
            }
          }
          if (en.type === 'paragraph') {
            const paraText = (en.children as any[]).map((c: any) => c.value ?? '').join('').trim();
            if (paraText.toLowerCase() === 'predefined rubric:') continue;
          }
          if (en.type === 'list') {
            // predefined rubric list
            predefinedRubric = (en.children as any[]).map((li: any) =>
              renderFragment(nodeToMdSimple(li))
            );
            continue;
          }
          if (en.type === 'table' && !fieldsTable) {
            fieldsTable = en as Table;
          }
        }

        // Parse fields table
        const fields: Partial<Record<FieldKey, string>> = {};
        if (fieldsTable) {
          for (const row of (fieldsTable as Table).children) {
            const cells = row.children;
            if (cells.length >= 2) {
              const labelRaw = cellText(cells[0]).trim().toLowerCase();
              const value = cellHtml(cells[1]);
              const key = FIELD_LABEL_MAP[labelRaw];
              if (key) fields[key] = value;
            }
          }
        }

        // Validate all field keys present (English → throw; translation → warn)
        const allKeys = Object.keys(FIELD_LABEL_MAP) as string[];
        const missingKeys = Object.values(FIELD_LABEL_MAP).filter((k) => !(k in fields));
        if (missingKeys.length > 0) {
          const msg = `[examples] Missing field keys in example ${number}: ${missingKeys.join(', ')}`;
          if (locale === 'en') throw new Error(msg);
          console.warn(msg);
        }

        const fullFields: Record<FieldKey, string> = {
          conversationLink: fields.conversationLink ?? '',
          overallSatisfaction: fields.overallSatisfaction ?? '',
          issues: fields.issues ?? '',
          detailOfIssues: fields.detailOfIssues ?? '',
          turns: fields.turns ?? '',
          rubric: fields.rubric ?? '',
          rubricJustification: fields.rubricJustification ?? '',
          countryFit: fields.countryFit ?? '',
          especiallyGood: fields.especiallyGood ?? '',
          especiallyBad: fields.especiallyBad ?? '',
        };

        examples.push({
          id: `example-${number}`,
          number,
          satisfaction: { label: satisfactionLabel, score },
          title,
          predefinedRubric,
          fields: fullFields,
        });

        continue; // i already advanced
      }
    }
    i++;
  }

  if (examples.length === 0) {
    throw new Error('[examples] No examples found in §12');
  }

  return { intro, template: templateRows, note, examples };
}

export const getExamples = cache(
  async (locale: Locale): Promise<Localized<ExamplesDoc>> => {
    const file = readContent(locale, 'instructions.md');
    if (locale !== 'en' && file.isFallback) {
      console.warn(`[examples] Falling back to English for locale: ${locale}`);
    }
    try {
      const doc = parseExamples(file.text, file.contentLocale);
      return { ...doc, contentLocale: file.contentLocale, isFallback: file.isFallback };
    } catch (err) {
      if (file.isFallback) {
        console.warn('[examples] Translation parse failed, using English:', err);
        const enFile = readContent('en', 'instructions.md');
        const doc = parseExamples(enFile.text, 'en');
        return { ...doc, contentLocale: 'en', isFallback: true };
      }
      throw err;
    }
  },
);
