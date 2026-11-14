// Anonymised example set, derived from QC reviews of real SxSxS tasks.
// Per the source's own rule, NO task IDs, attempt IDs, share links, emails or
// personal data are stored here — only the lesson, the QC finding and the stage.

export type ExampleGroup = 'reference' | 'pass' | 'fail';

export interface ExampleItem {
  slug: string;
  group: ExampleGroup;
  title: string;
  locale: string; // e.g. "en-GB · V6"
  result?: string; // passes: "PASS 5"
  errorCode?: string; // fails: "#11" etc.
  finding: string; // what QC found / why it's an example
  stage: string; // maps to a stage in the Common Errors quick reference
  detail?: boolean; // true when a rich walkthrough exists at content/examples/<slug>.md
}

export const EXAMPLES: ExampleItem[] = [
  // ── Reference: full task anatomy ────────────────────────────────
  {
    slug: 'atelier-grataloup',
    group: 'reference',
    title: 'Anatomy of a perfect task (5/5)',
    locale: 'fr-FR · reference',
    result: 'PASS 5',
    finding:
      'A finished, correct item laid out section by section — universe, opening prompt, input artifacts, target outcome, the simplified run, the 28-criterion weighted rubric, the golden answer, and known-vs-not-known — with notes on what makes each part strong. The bar for what good looks like.',
    stage: 'Reference',
    detail: true,
  },

  // ── Clean passes ────────────────────────────────────────────────
  {
    slug: 'fixed-resubmission',
    group: 'pass',
    title: 'A resubmission that fixed every Fail',
    locale: 'en-GB · V6',
    result: 'PASS 5',
    finding:
      "Every value matches QC (satisfaction 3/4/4, Country fit 3/1/3, 9/9 rubric). Gemini's critical failure (wrong product links) is correctly logged at Issue #1 and caps the model at 3. Tie-breaker: Trust, no inversion. The best model of what a corrected task looks like.",
    stage: 'Stage 4 · Ratings',
  },
  {
    slug: 'broken-criterion-flagged',
    group: 'pass',
    title: 'A broken criterion kept at No, with a flag',
    locale: 'V6',
    result: 'PASS 5 (first attempt)',
    finding:
      'Full agreement with QC (4/5/4, Country fit 3/1/3). A criterion no model could satisfy is correctly kept at No with [FLAG: Contradicts prompt] — the flag never changes the grade.',
    stage: 'Stage 5 · Rubric & Country fit',
  },
  {
    slug: 'clean-first-pass',
    group: 'pass',
    title: 'A clean first-attempt pass',
    locale: 'V6',
    result: 'PASS 5 (first attempt)',
    finding:
      'Ranking and ratings match QC, Detail lines are clean, and every rubric justification cites the turn that shows the final state.',
    stage: 'Stage 6 · Ranking',
  },

  // ── One of each common failure ──────────────────────────────────
  {
    slug: 'issue-left-out',
    group: 'fail',
    title: 'A real issue left out',
    locale: 'ko-KR',
    errorCode: '#11',
    finding:
      "Claude's \u201CKorea is not an MDSAP participant\u201D (outdated since 2022) and a wrong launch date were left out of the Issues. A wrong fact the user would act on is always an issue.",
    stage: 'Stage 4 · Ratings',
  },
  {
    slug: 'five-with-no-issues',
    group: 'fail',
    title: "A 5 rated with \u201CNo issues\u201D",
    locale: 'ko-KR',
    errorCode: '#11',
    finding:
      'Claude was rated 5 despite English progress lines in a Korean chat and a plan that contradicts its own totals. If you had to notice a slip, it is not a 5.',
    stage: 'Stage 4 · Ratings',
  },
  {
    slug: 'v6-critical-failure',
    group: 'fail',
    title: 'A V6 critical failure not capped',
    locale: 'V6',
    errorCode: '#11',
    finding:
      'Gemini cited a Supreme Court case with the wrong date and scope and told the user to quote it in filings. That is a critical failure: it belongs at Issue #1 and caps the model at 3 (5 \u2192 3).',
    stage: 'Stage 4 · Ratings',
  },
  {
    slug: 'ranking-vs-scores',
    group: 'fail',
    title: 'Ranking that contradicts the scores',
    locale: 'V6',
    errorCode: '#4',
    finding:
      'Claude was rated 4 but ranked above two models rated 5, and the justification still described the old scores. Your ranking must follow your own scores and rubric.',
    stage: 'Stage 6 · Ranking',
  },
  {
    slug: 'wrong-model-mode',
    group: 'fail',
    title: 'Wrong model or mode',
    locale: 'V6',
    errorCode: '#7',
    finding:
      'ChatGPT ran on gpt-6-thinking in Chat mode instead of cGPT 6 Astra in Work mode, so the whole conversation had to be redone. The Model Check screenshot is the only proof.',
    stage: 'Stage 1 · Setup',
  },
  {
    slug: 'next-steps-skipped',
    group: 'fail',
    title: 'Next steps never asked',
    locale: 'V6',
    errorCode: '#9',
    finding:
      'ChatGPT stopped at Turn 2 on a usage limit; next steps 2 and 3 were never asked. Every next step has to be covered, in first person.',
    stage: 'Stage 2 · Conversation',
  },
  {
    slug: 'attachments-mismatch',
    group: 'fail',
    title: 'Attachments not matched across models',
    locale: 'V6',
    errorCode: '#10',
    finding:
      'Gemini received 10 of the 18 images the other models got. All three models must receive the same files, before or with the turn that needs them.',
    stage: 'Stage 2 · Conversation',
  },
  {
    slug: 'rubric-grade-contradicted',
    group: 'fail',
    title: 'A rubric grade contradicted by the chat',
    locale: 'V6',
    errorCode: '#13',
    finding:
      'ChatGPT was graded No for sending an email, though the user approved the draft and asked it to send. Grade the final state of the conversation, and cite the turn.',
    stage: 'Stage 5 · Rubric & Country fit',
  },
  {
    slug: 'country-fit-generic',
    group: 'fail',
    title: 'A generic Country-fit comment',
    locale: 'V6',
    errorCode: '#14',
    finding:
      'The same generic Good comment was used for all three models, naming no local detail. Country-fit comments must name a specific local rule, term or resource.',
    stage: 'Stage 5 · Rubric & Country fit',
  },
  {
    slug: 'hidden-deliverable',
    group: 'fail',
    title: 'A hidden deliverable',
    locale: 'V6',
    errorCode: 'Uploads',
    finding:
      "Claude's tracker was hidden on the share link and missing from the zip, so the model could not be rated and the task needed a re-upload. Everything you rate must be visible to the auditor.",
    stage: 'Stage 3 · Uploads',
  },
  {
    slug: 'opening-prompt-wrong',
    group: 'fail',
    title: 'Wrong opening prompt',
    locale: 'V6',
    errorCode: '#1',
    finding:
      "ChatGPT's first message was the task's third-person goal text, not the pre-seeded prompt. Turn 1 must be the pre-seeded prompt, pasted verbatim.",
    stage: 'Stage 1 · Setup',
  },
];

export function getExampleSlugs(): string[] {
  return EXAMPLES.map((e) => e.slug);
}

export function getExample(slug: string): ExampleItem | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
