// ── Markdown pipeline shared types ──────────────────────────────────
export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface HtmlSection {
  id: string;
  title: string;
  html: string;
  toc: TocItem[]; // depth-3 headings inside
}

// ── File resolution ──────────────────────────────────────────────────
export type Locale = 'en' | 'fr';

export interface ContentFile {
  text: string;
  contentLocale: Locale;
  isFallback: boolean;
}

export type Localized<T> = T & {
  contentLocale: Locale;
  isFallback: boolean;
};

// ── (a) Instructions ─────────────────────────────────────────────────
export interface InstructionsDoc {
  title: string;
  lead: string;
  sections: HtmlSection[];
}

// ── (b) QC Spec Rubric ───────────────────────────────────────────────
export interface RubricBand {
  label: string | null;
  text: string;
}

export interface RubricRow {
  id: string;
  dimension: string;
  dimensionSlug: string;
  subDimension: string;
  notes: string | null;
  band1_2: RubricBand | null;
  band3_4: RubricBand | null;
  band5: RubricBand | null;
  searchText: string;
}

export interface RubricDoc {
  title: string;
  intro: string;
  rows: RubricRow[];
  dimensions: { name: string; slug: string }[];
}

// ── (c) Common Errors ────────────────────────────────────────────────
export interface DeckSlide {
  slide: number;
  id: string; // `slide-${n}`
  heading: string;
  html: string;
}

export interface ErrorSlide extends DeckSlide {
  kind: 'redo' | 'form';
  errorNumbers: number[];
  title: string;
  counts: string[];
}

export interface CommonErrorsDoc {
  title: string;
  sourceNote: string;
  before: DeckSlide[];
  redo: ErrorSlide[];
  form: ErrorSlide[];
  after: DeckSlide[];
}

// ── (d) Examples ─────────────────────────────────────────────────────
export type FieldKey =
  | 'conversationLink'
  | 'overallSatisfaction'
  | 'issues'
  | 'detailOfIssues'
  | 'turns'
  | 'rubric'
  | 'rubricJustification'
  | 'countryFit'
  | 'especiallyGood'
  | 'especiallyBad';

export interface RatedExample {
  id: string;
  number: number;
  satisfaction: { label: string; score: 1 | 2 | 3 | 4 | 5 };
  title: string;
  predefinedRubric: string[];
  fields: Record<FieldKey, string>;
}

export interface TemplateRow {
  col: string;
  template: string;
  example: string;
}

export interface ExamplesDoc {
  intro: string;
  template: TemplateRow[];
  note: string;
  examples: RatedExample[];
}

// ── (e) Eval Playbooks ───────────────────────────────────────────────
export interface PlaybookMeta {
  slug: string;
  title: string;
  file: string;
}

export interface PlaybookDoc extends PlaybookMeta {
  sections: HtmlSection[];
  lead: string;
}
