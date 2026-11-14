// Common Errors self-check. One short set per stage, built from the real
// send-backs in the examples set. Each question maps to an example page.

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  stage: string;
  prompt: string;
  options: QuizOption[];
  explanation: string;
  exampleSlug?: string;
}

export const QUIZ: QuizQuestion[] = [
  // ── Stage 1 · Setup ─────────────────────────────────────────────
  {
    id: 's1-opening',
    stage: 'Stage 1 · Setup',
    prompt:
      "A contributor's first message to ChatGPT is the task's third-person goal text (\u201CThe user wants to\u2026\u201D). What should Turn 1 actually be?",
    options: [
      { text: 'The pre-seeded opening prompt, pasted verbatim.', correct: true },
      { text: 'A reworded, friendlier version of the goal.', correct: false },
      { text: 'The goal text, translated into the task locale.', correct: false },
    ],
    explanation:
      'Turn 1 must be the pre-seeded prompt, pasted exactly — not the third-person goal, and never reworded or translated.',
    exampleSlug: 'opening-prompt-wrong',
  },
  {
    id: 's1-model-check',
    stage: 'Stage 1 · Setup',
    prompt:
      'The Gemini Model Check screenshot shows the model name but not the Chat/Task toggle. Do you accept it?',
    options: [
      { text: 'No — the screenshot must show the model and the mode on Task.', correct: true },
      { text: 'Yes — the model name is enough proof.', correct: false },
    ],
    explanation:
      '#7. The Model Check screenshot is the only proof of model and mode. Gemini must be on Task, ChatGPT on Astra/Work, Claude on Fable 5.1 — a wrong mode means the whole conversation is redone.',
    exampleSlug: 'wrong-model-mode',
  },

  // ── Stage 2 · Conversation ──────────────────────────────────────
  {
    id: 's2-next-steps',
    stage: 'Stage 2 · Conversation',
    prompt:
      'ChatGPT hits a usage limit at Turn 2, so next steps 2 and 3 are never asked. Is the task OK to submit?',
    options: [
      { text: 'No — every next step must be asked, in first person.', correct: true },
      { text: 'Yes — a usage limit is outside your control.', correct: false },
    ],
    explanation:
      "#9. Every next step has to be covered. If a model can't continue, that's a redo — not a skip.",
    exampleSlug: 'next-steps-skipped',
  },
  {
    id: 's2-attachments',
    stage: 'Stage 2 · Conversation',
    prompt:
      'Gemini received 10 of the 18 images that the other two models got. Acceptable?',
    options: [
      { text: 'No — all three models must receive the same files.', correct: true },
      { text: 'Yes — as long as Gemini got the important ones.', correct: false },
    ],
    explanation:
      '#10. Every model gets the same attachments, before or with the turn that needs them.',
    exampleSlug: 'attachments-mismatch',
  },

  // ── Stage 3 · Uploads ───────────────────────────────────────────
  {
    id: 's3-share-link',
    stage: 'Stage 3 · Uploads',
    prompt:
      'You are about to submit a private `chatgpt.com/c/\u2026` link. Is that auditable?',
    options: [
      { text: 'No — it must be a public share link, plus the JSON.', correct: true },
      { text: 'Yes — the auditor can request access if needed.', correct: false },
    ],
    explanation:
      "#6. Uploads must be public share links plus the JSON. A private link can't be audited.",
  },
  {
    id: 's3-hidden',
    stage: 'Stage 3 · Uploads',
    prompt:
      "Claude made a tracker, but it's hidden on the share link and not in the zip. Can you rate Claude?",
    options: [
      { text: 'No — everything you rate must be visible to the auditor.', correct: true },
      { text: 'Yes — you saw it while running the task.', correct: false },
    ],
    explanation:
      "Hidden deliverable. If the auditor can't see it on the link or in the zip, it can't be rated — re-upload.",
    exampleSlug: 'hidden-deliverable',
  },

  // ── Stage 4 · Ratings ───────────────────────────────────────────
  {
    id: 's4-issue-left-out',
    stage: 'Stage 4 · Ratings',
    prompt:
      "Claude states \u201CKorea is not an MDSAP participant\u201D — outdated and wrong — and you leave it out of the Issues. Right call?",
    options: [
      { text: 'No — a wrong fact the user would act on is always an issue.', correct: true },
      { text: "Yes — it's a minor factual slip.", correct: false },
    ],
    explanation:
      "#11. A wrong figure, date, rule or citation is always an issue. It is never \u201Cminor\u201D.",
    exampleSlug: 'issue-left-out',
  },
  {
    id: 's4-five-no-issues',
    stage: 'Stage 4 · Ratings',
    prompt:
      "A model is rated 5 with \u201CNo issues\u201D, but the chat has English progress lines in a Korean conversation. Is 5 correct?",
    options: [
      { text: "No — if you had to notice a slip, it isn't a 5.", correct: true },
      { text: 'Yes — the content was still correct overall.', correct: false },
    ],
    explanation:
      "#11. The single biggest rejection: a 5 with \u201CNo issues\u201D despite a visible error.",
    exampleSlug: 'five-with-no-issues',
  },
  {
    id: 's4-critical',
    stage: 'Stage 4 · Ratings',
    prompt:
      'Gemini cites a court case with the wrong date and scope and tells the user to quote it in filings. Where does this go, and what is the cap?',
    options: [
      { text: 'Issue #1, and it caps the model at 3.', correct: true },
      { text: 'Anywhere in the Issues, no cap — it is one mistake.', correct: false },
      { text: "It's a Country-fit problem, not an Issue.", correct: false },
    ],
    explanation:
      'V6 critical failure: a false fact stated as true in something the user acts on → Issue #1, caps the model at 3 (5 → 3).',
    exampleSlug: 'v6-critical-failure',
  },

  // ── Stage 5 · Rubric & Country fit ──────────────────────────────
  {
    id: 's5-rubric-final-state',
    stage: 'Stage 5 · Rubric & Country fit',
    prompt:
      'A rubric step asks whether the model sent the email. The user approved the draft and told it to send, and it did. You grade it No. Correct?',
    options: [
      { text: 'No — grade the final state of the conversation, and cite the turn.', correct: true },
      { text: "Yes — the first draft wasn't the final email.", correct: false },
    ],
    explanation:
      '#13. Grade what the conversation ends at, and cite the turn that shows that final state.',
    exampleSlug: 'rubric-grade-contradicted',
  },
  {
    id: 's5-flag',
    stage: 'Stage 5 · Rubric & Country fit',
    prompt:
      'A criterion no model could satisfy — it contradicts the prompt. What do you do?',
    options: [
      { text: 'Keep it at No with `[FLAG: …]` — the flag never changes the grade.', correct: true },
      { text: 'Change it to Yes for every model, since it is unfair.', correct: false },
      { text: 'Delete the criterion.', correct: false },
    ],
    explanation:
      '`[FLAG]` records the problem but never changes a grade. The criterion stays No + flag.',
    exampleSlug: 'broken-criterion-flagged',
  },
  {
    id: 's5-country-fit',
    stage: 'Stage 5 · Rubric & Country fit',
    prompt:
      "Your Country-fit Good comment is \u201CUsed Portuguese\u201D — the same for all three models. Does it pass?",
    options: [
      { text: 'No — it must name a specific local rule, term or resource.', correct: true },
      { text: 'Yes — the language is the local detail.', correct: false },
    ],
    explanation:
      '#14. Country-fit comments must name a concrete local detail — not just the language.',
    exampleSlug: 'country-fit-generic',
  },

  // ── Stage 6 · Ranking ───────────────────────────────────────────
  {
    id: 's6-ranking-scores',
    stage: 'Stage 6 · Ranking',
    prompt:
      'You rated Claude 4, but ranked it above two models you rated 5. Allowed?',
    options: [
      { text: 'No — your ranking must follow your own scores and rubric.', correct: true },
      { text: 'Yes — ranking is a separate judgment from scores.', correct: false },
    ],
    explanation:
      '#4. Ranking must be consistent with your scores and rubric. Explain any listed exception in writing.',
    exampleSlug: 'ranking-vs-scores',
  },
  {
    id: 's6-justification',
    stage: 'Stage 6 · Ranking',
    prompt:
      'Your ranking justification describes a different best model than your rank fields show. OK to submit?',
    options: [
      { text: 'No — the justification must name the same best, middle and worst as the rank fields.', correct: true },
      { text: 'Yes — the rank fields are what actually counts.', correct: false },
    ],
    explanation:
      'Stranger re-read #4: the ranking justification and the rank fields must agree.',
    exampleSlug: 'ranking-vs-scores',
  },
];
