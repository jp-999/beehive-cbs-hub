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
  stage: string; // which of the six stages this maps to
  detail?: boolean; // true when a rich walkthrough exists at content/examples/<slug>.md

  // Detailed, self-contained walkthrough (rendered on the example page):
  scenario?: string; // what happened
  finding: string; // what QC found / why it's an example
  why?: string; // why it matters (fails) / why it works (passes)
  fix?: string; // how to get it right (fails) / how to replicate (passes)
  rule?: string; // the governing rule, short
}

export const EXAMPLES: ExampleItem[] = [
  // ── Reference: full task anatomy ────────────────────────────────
  {
    slug: 'atelier-grataloup',
    group: 'reference',
    title: 'Anatomy of a perfect task (5/5)',
    locale: 'fr-FR · reference',
    result: 'PASS 5',
    stage: 'Reference',
    detail: true,
    finding:
      'A finished, correct item laid out section by section — universe, opening prompt, input artifacts, target outcome, the simplified run, the 28-criterion weighted rubric, the golden answer, and known-vs-not-known — with notes on what makes each part strong. The bar for what good looks like.',
  },

  // ── Clean passes ────────────────────────────────────────────────
  {
    slug: 'fixed-resubmission',
    group: 'pass',
    title: 'A resubmission that fixed every Fail',
    locale: 'en-GB · V6',
    result: 'PASS 5',
    stage: 'Stage 4 · Ratings',
    scenario:
      'An earlier attempt was sent back for several problems on the rating form. On resubmission the contributor corrected every one, and QC agreed on every field — so this task shows exactly what a clean "after" looks like.',
    finding:
      'Every value matches QC: satisfaction 3/4/4, Country fit 3/1/3, 9/9 rubric. Gemini\u2019s critical failure (wrong product links) is logged at Issue #1 and caps the model at 3. The tie-breaker used is Trust, and the ranking shows no inversion.',
    why:
      'The critical failure is placed first and actually caps the score instead of being buried in the list; every rubric line cites the turn that shows the final state; and the ranking follows the scores exactly, with the right tie-breaker named.',
    fix:
      'When you redo a task, fix every flagged field — not just some. Put any critical failure at Issue #1 and cap the model at 3. Re-read the ranking against your own scores and name the first tie-breaker that decides it before you submit.',
    rule:
      'A critical failure goes at Issue #1 and caps the model at 3. Ranking must follow your own scores.',
  },
  {
    slug: 'broken-criterion-flagged',
    group: 'pass',
    title: 'A broken criterion kept at No, with a flag',
    locale: 'V6',
    result: 'PASS 5 (first attempt)',
    stage: 'Stage 5 · Rubric & Country fit',
    scenario:
      'One rubric criterion contradicted the prompt, so no model could satisfy it. Rather than bending the grade to seem fair, the contributor kept it at No and recorded why with a flag.',
    finding:
      'Full agreement with QC (4/5/4, Country fit 3/1/3). The impossible criterion is correctly kept at No with [FLAG: Contradicts prompt].',
    why:
      'A [FLAG] records the problem for reviewers but never changes a grade — the criterion stays No for every model. That keeps grading consistent and lets QC see you spotted the broken criterion on purpose.',
    fix:
      'If a criterion can\u2019t be met by any model, or it contradicts the prompt, grade it No and add [FLAG: reason]. Never flip it to Yes "to be fair", and never delete it.',
    rule:
      '[FLAG] never changes a grade. A criterion no model can meet stays No + [FLAG].',
  },
  {
    slug: 'clean-first-pass',
    group: 'pass',
    title: 'A clean first-attempt pass',
    locale: 'V6',
    result: 'PASS 5 (first attempt)',
    stage: 'Stage 6 · Ranking',
    scenario:
      'A straightforward task done right the first time: nothing exotic, just every field consistent and every claim backed by the conversation.',
    finding:
      'Ranking and ratings match QC, the Detail lines are clean, and every rubric justification cites the turn that shows the final state.',
    why:
      'Citing the exact turn for every rubric Yes/No and every issue is what makes a task auditable. A stranger with only the share link can verify each claim, so there is nothing for QC to send back.',
    fix:
      'Cite the turn for every rubric line and every issue; keep Detail lines in the exact "#N: [tag] - text" format; and sanity-check the ranking against your scores before submitting.',
    rule:
      'Grade the final state and cite the turn (#13). Ranking follows your scores (#4).',
  },

  // ── One of each common failure ──────────────────────────────────
  {
    slug: 'issue-left-out',
    group: 'fail',
    title: 'A real issue left out',
    locale: 'ko-KR',
    errorCode: '#11',
    stage: 'Stage 4 · Ratings',
    scenario:
      'In a Korean task, Claude stated that "Korea is not an MDSAP participant" — a claim that has been outdated since 2022 — and gave a wrong product launch date. Both are facts the user would act on, but neither was listed in the Issues.',
    finding:
      'The outdated MDSAP claim and the wrong launch date were both left out of the Issues, so the model looked more correct than it was.',
    why:
      'A wrong figure, date, rule or citation is always an issue — it is never "minor". Leaving it out means the rating overstates the model, and a user could act on a false fact. This single mistake — a missed issue — is the most common reason tasks are sent back.',
    fix:
      'List every wrong fact as an issue, at the turn it appears, with the correct L2 sub-dimension and L3 tag. If the user had to correct the model, or the model stated something false, it is an issue — write it down.',
    rule:
      '#11 — a wrong fact the user would act on is always an issue.',
  },
  {
    slug: 'five-with-no-issues',
    group: 'fail',
    title: 'A 5 rated with \u201CNo issues\u201D',
    locale: 'ko-KR',
    errorCode: '#11',
    stage: 'Stage 4 · Ratings',
    scenario:
      'A model was given a satisfaction of 5 with "No issues" selected. But the Korean conversation contained English progress lines, and the plan it produced contradicted its own totals.',
    finding:
      'Rated 5 with "No issues" despite a language break and a self-contradiction that are both visible in the chat.',
    why:
      'This is the single biggest rejection on the whole task. A 5 with "No issues" means there was genuinely nothing to flag. If you had to notice a slip — a language break, a contradiction, a wrong number — then it is not a 5, and "No issues" is false.',
    fix:
      'Before you give any 5, re-read the conversation as a stranger. A language break, a contradiction, or a wrong value is an issue. Reserve 5 + "No issues" for conversations where there is truly nothing to list.',
    rule:
      '#11 — a 5 with "No issues" despite a visible error is the biggest send-back.',
  },
  {
    slug: 'v6-critical-failure',
    group: 'fail',
    title: 'A V6 critical failure not capped',
    locale: 'V6',
    errorCode: '#11',
    stage: 'Stage 4 · Ratings',
    scenario:
      'Gemini cited a Supreme Court case with the wrong date and the wrong scope, and told the user to quote it in their filings — a false fact in something the user will act on directly.',
    finding:
      'The false citation was not treated as a critical failure. It belongs at Issue #1 and should cap the model at 3 (so a 5 becomes a 3).',
    why:
      'A critical failure is a false fact stated as true, with no hedge, in something the user acts on — a figure, fee, date, legal rule, citation, contact, or copy they will send. Because the user will rely on it, it outweighs everything else: it goes first and caps the score.',
    fix:
      'Scan for critical failures first. When you find one, put it at Issue #1 and cap the model at 3 no matter how strong the rest of the answer was. Say in the issue why it is critical (the user will act on it).',
    rule:
      'V6 critical failure \u2192 Issue #1, caps the model at 3.',
  },
  {
    slug: 'ranking-vs-scores',
    group: 'fail',
    title: 'Ranking that contradicts the scores',
    locale: 'V6',
    errorCode: '#4',
    stage: 'Stage 6 · Ranking',
    scenario:
      'The contributor rated Claude 4, then ranked it above two models they had rated 5. The written justification still described the earlier scores, so the ranking, the scores and the justification all disagreed.',
    finding:
      'The ranking contradicts the contributor\u2019s own scores and justification — a 4 placed above two 5s.',
    why:
      'Your ranking has to follow your own scores and rubric. A lower-scored model can only sit above a higher-scored one if a listed exception applies and the justification explains it. Otherwise the three fields tell three different stories and QC can\u2019t trust any of them.',
    fix:
      'After scoring, order the models by score. If you deviate, name the specific listed exception in the justification. Make the justification name the same best, middle and worst as the rank fields.',
    rule:
      '#4 — ranking must be consistent with your scores and rubric.',
  },
  {
    slug: 'wrong-model-mode',
    group: 'fail',
    title: 'Wrong model or mode',
    locale: 'V6',
    errorCode: '#7',
    stage: 'Stage 1 · Setup',
    scenario:
      'ChatGPT was run on gpt-6-thinking in Chat mode instead of cGPT 6 Astra in Work mode. Because the model and mode were wrong from Turn 1, the whole conversation had to be redone.',
    finding:
      'Wrong model and mode. The Model Check screenshot is the only proof of what actually ran, and it showed the wrong setup.',
    why:
      'Each model must run on the exact required model and mode — Gemini on Task, ChatGPT on Astra in Work mode, Claude on Fable 5.1. A wrong mode changes the model\u2019s behaviour, so the comparison is invalid and the conversation cannot be salvaged.',
    fix:
      'Before Turn 1, set the correct model and mode for each, and capture the Model Check screenshot showing both. If any is wrong, start the conversation over — do not try to patch it.',
    rule:
      '#7 — correct model and mode, proven by the Model Check screenshot.',
  },
  {
    slug: 'next-steps-skipped',
    group: 'fail',
    title: 'Next steps never asked',
    locale: 'V6',
    errorCode: '#9',
    stage: 'Stage 2 · Conversation',
    scenario:
      'ChatGPT hit a usage limit at Turn 2, so the contributor stopped there. Next steps 2 and 3 were never asked of any model.',
    finding:
      'Two of the required next steps were never asked, so the conversation is incomplete.',
    why:
      'Every next step has to be covered, in first person. A usage limit, or a model that can\u2019t continue, is a reason to redo the task — not a reason to leave steps out. An incomplete conversation can\u2019t be rated fairly against the others.',
    fix:
      'Ask every next step, in order, in first person. If a model can\u2019t continue, redo rather than submit a short conversation. Answer any clarifying question the model asks before moving on.',
    rule:
      '#9 — every next step asked; the model\u2019s questions answered.',
  },
  {
    slug: 'attachments-mismatch',
    group: 'fail',
    title: 'Attachments not matched across models',
    locale: 'V6',
    errorCode: '#10',
    stage: 'Stage 2 · Conversation',
    scenario:
      'The other two models received all 18 images, but Gemini was given only 10 of them. The three models were therefore answering with different inputs.',
    finding:
      'One model received fewer files than the others, so the side-by-side comparison is not fair.',
    why:
      'All three models must receive the same files, before or with the turn that needs them. If one model is missing inputs, any difference in its answer might just be the missing files — so the ratings and ranking aren\u2019t comparable.',
    fix:
      'Give every model the identical set of attachments at the same point in the conversation. Before rating, count the files each model received and confirm they match.',
    rule:
      '#10 — the same files go to all three models.',
  },
  {
    slug: 'rubric-grade-contradicted',
    group: 'fail',
    title: 'A rubric grade contradicted by the chat',
    locale: 'V6',
    errorCode: '#13',
    stage: 'Stage 5 · Rubric & Country fit',
    scenario:
      'A rubric step asked whether the model sent the email. The user approved the draft and told ChatGPT to send it, and it did — but the step was graded No.',
    finding:
      'A rubric grade contradicts the final state of the conversation: graded No for an action the model actually completed.',
    why:
      'You grade the final state of the conversation, not an intermediate step. If the chat ends with the email sent, the grade is Yes — and you must cite the turn that shows it. A grade that disagrees with the visible chat is an automatic send-back.',
    fix:
      'For each rubric line, find the turn that shows the end state and grade to that. Cite the turn in the justification so a reviewer can confirm it.',
    rule:
      '#13 — grades match the final state, with turns cited.',
  },
  {
    slug: 'country-fit-generic',
    group: 'fail',
    title: 'A generic Country-fit comment',
    locale: 'V6',
    errorCode: '#14',
    stage: 'Stage 5 · Rubric & Country fit',
    scenario:
      'The same generic "Good" Country-fit comment was pasted for all three models. It named no local rule, term or resource — just that the language was used.',
    finding:
      'The Country-fit comments name no specific local detail and are identical across models.',
    why:
      'A Country-fit comment has to name a concrete local element — a specific law, local body, currency or date format, idiom or convention. "Used Portuguese" or a copy-pasted line is not evidence of local fit, and identical comments can\u2019t describe three different answers.',
    fix:
      'For each model, cite one specific local detail it got right or wrong (a named regulation, a local institution, a formatting convention). Write a different, concrete comment per model.',
    rule:
      '#14 — Country-fit comments must name a specific local detail.',
  },
  {
    slug: 'hidden-deliverable',
    group: 'fail',
    title: 'A hidden deliverable',
    locale: 'V6',
    errorCode: 'Uploads',
    stage: 'Stage 3 · Uploads',
    scenario:
      'Claude produced a tracker during the task, but it was hidden on the share link and not included in the zip. The reviewer could not see it, so the model could not be rated and the task needed a re-upload.',
    finding:
      'A deliverable that was rated is not visible to the auditor — missing from both the share link and the zip.',
    why:
      'Everything you rate must be visible on the share link, in the JSON, or in the zip. If the auditor can\u2019t open it, they can\u2019t verify your rating, so the task bounces regardless of whether your rating was right.',
    fix:
      'Before submitting, open the share link as a stranger and confirm every deliverable is visible. Put anything that isn\u2019t visible on the link into the zip.',
    rule:
      'Everything you rate must be visible to the auditor — link, JSON or zip.',
  },
  {
    slug: 'opening-prompt-wrong',
    group: 'fail',
    title: 'Wrong opening prompt',
    locale: 'V6',
    errorCode: '#1',
    stage: 'Stage 1 · Setup',
    scenario:
      'ChatGPT\u2019s first message was the task\u2019s third-person goal text ("The user wants to\u2026") instead of the pre-seeded opening prompt that should have been pasted in.',
    finding:
      'Turn 1 was the goal description, not the pre-seeded opening prompt.',
    why:
      'Turn 1 must be the pre-seeded opening prompt, pasted verbatim. The third-person goal is instructions to you, not something to send the model; and rewording or letting the browser translate it changes what every model is responding to.',
    fix:
      'Copy the pre-seeded prompt exactly into Turn 1 for every model. Check the browser didn\u2019t auto-translate it, and don\u2019t paste the goal text.',
    rule:
      '#1 — the opening prompt is pasted verbatim as Turn 1.',
  },
];

export function getExampleSlugs(): string[] {
  return EXAMPLES.map((e) => e.slug);
}

export function getExample(slug: string): ExampleItem | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
