# Evaluation Checklist

QC Spec v9.25.26. The dimension by dimension reference. Each dimension carries an excellence standard, its numbered reject triggers, and the fix for each. Run every dimension. Log the first rejection per dimension and keep going, because the author needs the full list. A dimension is graded Excellence or Reject. Any single Reject rejects the task.

Reject triggers are numbered `N.M`, dimension then trigger. The deep audit that owns a dimension numbers its own triggers the same way, so a report cites the file: `RatingAudit.md` trigger 5.2, never a bare 5.2. Quote the bracketed category from the lookup below exactly, and write the separator as a hyphen. Every Fail and non-fail finding requires a written justification: a bare score is incomplete.

There are 13 dimensions: 1 User Input, 2 and 4 Conversation, 3 Prompt and 13 Prompts, 5 and 7 Rating, 6 Formatting, 8 Rubric, 9 and 10 SxSxS Rating, 11 SxSxS Justification, 12 Models. Dimensions 1, 2, 4, and 12 are audited in `TrajectoryAudit.md`, 3 and 13 in `PromptAudit.md`, 5, 6, and 7 in `RatingAudit.md`, 8 in `RubricAudit.md`, and 9, 10, and 11 in `RankingAudit.md`.

Most dimensions are scored per conversation across Models A, B, and C, and the worst model decides the band. Dimension 7 is one tally across all models at once. Dimensions 9, 10, and 11 are scored once on the single ranking. Name the model on every per-model finding.

## Error Category Lookup

| # | Dimension | Score 1-2 | Score 3-4 |
|---|-----------|-----------|-----------|
| 1 | Valid Links | `[Fail - Missing/Invalid Links]` | `[Non-Fail - Missing/Invalid Link]` |
| 2 | Next Steps and Natural Flow | `[Fail - Next Steps Not Followed]` | `[Non-Fail - Unnatural Flow]` |
| 3 | Pre-seeded and Opening Prompts Consistency | `[Fail - Opening Prompts Inconsistency]` | `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]` |
| 4 | Attachments Uploaded Before Use | `[Fail - Missing Attachment]` | `[Non-Fail - Late Attachment]` |
| 5 | Issues Identified and Ranked | `[Fail - Issue Not Presented]` | `[Non-Fail - Issue Order or Category]` |
| 6 | Detail of Issues | `[Fail - Formatting]` | none |
| 7 | Correctness/Accuracy - Major Rating | `[Fail - Dimension Rating Disagreement]` | `[Non-Fail - Dimension Rating Disagreement]` |
| 8 | Criteria Grading Agreement | `[Fail - Rubric Grading Disagreement]` | `[Non-Fail - Rubric Evidence]` |
| 9 | Ranking Disagreement | `[Fail - Major Ranking Disagreement]` | `[Non-Fail - Loose Ranking Disagreement]` |
| 10 | Inconsistent Ranking | `[Fail - Inconsistent Ranking]` | `[Non-Fail - Inconsistent Ranking]` |
| 11 | Verdict | none | `[Non-Fail - Lacks Verdict]` |
| 12 | Models | `[Fail - Models]` | none |
| 13 | Language and Localization | `[Fail - Language]` | `[Non-Fail - Localization]` |

Score 5 is `[No Issues]` on every dimension. `none` means the dimension has no option at that band: it is a 5 or the other band only.

---

## Dimension 1: Valid Links

Source: `QCSpec` User Input / Valid Links. `TrajectoryAudit.md` Section 1. `LinterSweep.md` L3, L4.

### Excellence Standard
The task contains valid conversation links for all three models. An Argon Task chat that cannot be shared is covered by its uploaded trajectory JSON.

### Reject Triggers

1.1 Any of the conversation links are invalid or missing and the contributor did not upload the conversation as a trajectory JSON.
Fix: Add a valid shareable link for every model, or upload the conversation as a trajectory JSON. `[Fail - Missing/Invalid Links]`. Score 2.

1.2 Any of the conversation links are invalid or missing but the contributor uploaded the conversation as a trajectory JSON. This does not include Argon Task chats where there is no conversation link to share, which are No Issues.
Fix: Replace the broken link with a valid shareable one so the link and the JSON agree. `[Non-Fail - Missing/Invalid Link]`. Score 3.

## Dimension 2: Next Steps and Natural Flow

Source: `QCSpec` Conversation / Next Steps and Natural Flow. `TrajectoryAudit.md` Section 2.

### Excellence Standard
Every conversation covers every next step with natural, first-person prompts that react to the model's replies.

### Reject Triggers

2.1 In any conversation, the user stops after Turn 1, skips 2 or more next steps, or sends the third-person next-steps text as a prompt.
Fix: Re-run the conversation covering every next step with natural first-person prompts. `[Fail - Next Steps Not Followed]`. Score 2.

2.2 A conversation skips one next step, or a user turn ignores the model's reply (a question it asked, information it needed, or a refusal or misunderstanding) and moves on regardless.
Fix: Cover the skipped step, or react to the model's reply before moving on. `[Non-Fail - Unnatural Flow]`. Score 3.

A first-person prompt that reuses a step's wording is fine; only pasting the third-person "The user might..." text is the 2.1 fail. A step may take several turns.

## Dimension 3: Pre-seeded and Opening Prompts Consistency

Source: `QCSpec` Prompt / Pre-seeded and Opening Prompts Consistency. `PromptAudit.md` Section 1. `LinterSweep.md` L7.

### Excellence Standard
The opening prompt of every conversation is exactly the same as the pre-seeded initial_prompt_native.

### Reject Triggers

3.1 The opening prompt of the conversations has a different core intent than the pre-seeded prompt.
Fix: Start each conversation with the exact pre-seeded initial_prompt_native. `[Fail - Opening Prompts Inconsistency]`. Score 2.

3.2 The opening question of the conversations is not the same as the pre-seeded prompt but has the same core intent.
Fix: Replace the opener with the verbatim pre-seeded prompt. `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]`. Score 3.

## Dimension 4: Attachments Uploaded Before Use

Source: `QCSpec` Conversation / Attachments Uploaded Before Use. `TrajectoryAudit.md` Section 3. `LinterSweep.md` L5.

### Excellence Standard
Where the task requires an attachment (has_image, has_file, or has_attachment is True, or any conversation contains an upload), all three conversations contain the same attachments, every required attachment is uploaded or the workspace account connected, and each arrives before or with the prompt that needs it. Where no attachment is required and none appears, the dimension is No Issues.

### Reject Triggers

4.1 The task requires an attachment and at least one conversation never uploads it (or never connects the required workspace account), or at least 2 of 3 conversations do not contain the same attachments (a file uploaded in one conversation is missing from another).
Fix: Upload the same required attachments in all three conversations, or connect the required workspace account. `[Fail - Missing Attachment]`. Score 2.

4.2 All three conversations contain the same required attachments, but in at least one the attachment arrives after the prompt that needed it.
Fix: Upload the attachment before or with the prompt that needs it. `[Non-Fail - Late Attachment]`. Score 3.

Compare attachments by file name; where a site shows no name, compare by kind and count and confirm on the live links. Whether the model used the attachment correctly is Dimension 8 and the issues, not here.

## Dimension 5: Issues Identified and Ranked

Source: `QCSpec` Rating / Issues Identified and Ranked. `RatingAudit.md` Section 1. `IssueMatching_Guide.md`. `LinterSweep.md` L9, L11.

### Excellence Standard
For every model, the auditor and the contributor list the same issues under the right L2 categories and in the same order (or "No issues" / "none").

### Reject Triggers

5.1 For at least one model, the contributor says "No issues" or "None" although the conversation has a clear issue, or the contributor lists an issue that the conversation does not show, or the issues do not match the satisfaction score (Very satisfied with issues listed, or 4 or lower with "No issues").
Fix: List the real issues the conversation shows, and align the issue count with the satisfaction score. `[Fail - Issue Not Presented]`. Score 2.

5.2 Every listed issue is real, but a top-3 issue is missing despite the contributor selecting 3 issues, the issues are ranked in an order their impact does not support, or a real problem is filed under the wrong L2 sub-dimension or [L3 Loss Tag] (also: "No issues" when the only issues are minor or debatable).
Fix: Add the missing top-3 issue, reorder by impact, or re-file under the correct L2 / [L3 Loss Tag]. `[Non-Fail - Issue Order or Category]`. Score 3.

Evaluate every conversation against the task's next steps. A next step may take several turns and may be adapted to what the model said. Not following up on an answer that looks right but is wrong is Dimension 7 / 8, not here. Language and locale is Dimension 13, not here.

## Dimension 6: Detail of Issues

Source: `QCSpec` Formatting / Detail of Issues. `RatingAudit.md` Section 2. `LinterSweep.md` L8, L10.

### Excellence Standard
None of the Detail of issues fields has a major formatting error. Each selected issue is one numbered line, `#N: [L3 Loss Tag] - explanation`, matching the order of the L2 sub-dimensions in Column 3, with a matching `#N:` line of turn numbers in Column 5.

### Reject Triggers

6.1 For at least one model, the Detail of issues field has a major formatting issue: a line that does not start with the issue number and an exact bracketed [L3 Loss Tag], the numbering does not match the order of the L2 sub-dimensions in Column 3, or the Turns lines do not correspond to the issue lines.
Fix: Rewrite each line as `#N: [L3 Loss Tag] - what went wrong`, in Column 3 order, with matching Turns lines. `[Fail - Formatting]`. Score 2.

No non-fail band. This dimension grades the structure and formatting of the field; whether the issue itself is right is Dimension 5, and the attachment-sameness check is Dimension 4.

## Dimension 7: Correctness/Accuracy - Major Rating

Source: `QCSpec` Rating / Correctness/Accuracy - Major Rating. `RatingAudit.md` Section 3. `LinterSweep.md` L6.

### Excellence Standard
The auditor's dimension ratings match the contributor's, up to one minor disagreement. A major disagreement is a difference of 2 or more points on Overall satisfaction; a minor disagreement is a difference of 1 point. Count across all three models.

### Reject Triggers

7.1 The auditor has 1 or more major disagreements with the contributor (a difference of 2 or more points on any model).
Fix: Re-score the conversation and reconcile; the contributor's satisfaction is off by 2 or more. `[Fail - Dimension Rating Disagreement]`. Score 2.

7.2 The auditor has 2 or more minor disagreements (a difference of 1 point on two or more models).
Fix: Reconcile the minor disagreements. `[Non-Fail - Dimension Rating Disagreement]`. Score 3.

One minor disagreement is No Issues. Form the auditor's own satisfaction score for each model before reading the contributor's.

## Dimension 8: Criteria Grading Agreement

Source: `QCSpec` Rubric / Criteria Grading Agreement. `RubricAudit.md`. `Guide` section 9. `LinterSweep.md` L12.

### Excellence Standard
The auditor agrees with every rubric grade for every model, and every justification cites the turn(s) that show it. Grade each model's predefined rubric criteria against the final state of the conversation; the worst model decides the outcome.

### Reject Triggers

8.1 For at least one model, a rubric criterion is left ungraded, or its grade is contradicted by the conversation: Yes for a deliverable the model only claimed, No for a criterion the final state meets, or N/R for a criterion the user asked for and the model failed.
Fix: Grade every criterion against the final state; correct the contradicted grades. `[Fail - Rubric Grading Disagreement]`. Score 2.

8.2 Every grade is supported, but at least one justification is missing, cites no turn or the wrong turn, or does not say what the model did; or a grade differs from the auditor's on a criterion that is genuinely debatable.
Fix: Add the deciding turn(s) to each justification, or reconcile the debatable grade. `[Non-Fail - Rubric Evidence]`. Score 3.

Score the result at the end of the conversation: a mid-conversation error fixed by the final turn passes (Yes), unless the criterion checks a conversation-wide prohibition. Check the live link, not just what the model claimed. Flag a defective criterion with a [FLAG: ...] note without changing the Yes/No grade. The issue-to-top-3 matching described in the `QCSpec` Dimension 8 Notes cell is scored under Dimension 5 and detailed in `IssueMatching_Guide.md`, not here; this dimension grades the predefined Yes / No / N/R rubric.

## Dimension 9: Ranking Disagreement

Source: `QCSpec` SxSxS Rating / Ranking Disagreement. `RankingAudit.md` Section 1. `Guide` section 11. `LinterSweep.md` L13, L14.

### Excellence Standard
The auditor and the contributor agree on the preference ranking of the three models, based on overall satisfaction.

### Reject Triggers

9.1 The auditor disagrees with the contributor's preference ranking, with at least one model moving 2 spots (that is, from best to worst or worst to best).
Fix: Re-rank from the auditor's own satisfaction scores; a model is 2 spots off. `[Fail - Major Ranking Disagreement]`. Score 2.

9.2 The auditor slightly disagrees with the contributor's preference ranking, but all disagreements are only a difference of one spot (best to middle, or middle to worst).
Fix: Reconcile the one-spot disagreement. `[Non-Fail - Loose Ranking Disagreement]`. Score 3.

Form the auditor's own ranking from the auditor's own satisfaction scores before reading the contributor's ranking.

## Dimension 10: Inconsistent Ranking

Source: `QCSpec` SxSxS Rating / Inconsistent Ranking. `RankingAudit.md` Section 2. `LinterSweep.md` L15.

### Excellence Standard
The contributor's preference ranking is consistent with the contributor's own individual overall satisfaction scores.

### Reject Triggers

10.1 The contributor's individual overall scores do not support the preference ranking (the highest-rated model was not ranked most preferred) and this contradiction is not adequately supported in the justification.
Fix: Rank in the order the satisfaction scores support, or explain the contradiction in the justification. `[Fail - Inconsistent Ranking]`. Score 2.

10.2 The contributor's individual overall scores support a ranking different from the contributor's, but this contradiction is adequately supported in the justification.
Fix: Strengthen or confirm the justification for the inversion. `[Non-Fail - Inconsistent Ranking]`. Score 3.

This dimension reads the contributor's own scores against the contributor's own ranking, independent of whether the auditor agrees with the ranking (Dimension 9).

## Dimension 11: Verdict

Source: `QCSpec` SxSxS Justification / Verdict. `RankingAudit.md` Section 3. `LinterSweep.md` L16.

### Excellence Standard
The Ranking Justification mentions a preference or states which response is best, noting a tie if applicable.

### Reject Triggers

11.1 The justification does not mention a preference, state which response was the best, or note a tie if applicable; it only states pros and cons.
Fix: State the preference or the tie, supported by the issues identified for each model. `[Non-Fail - Lacks Verdict]`. Score 3.

No Fail band. The justification should not just state pros and cons; it must specifically choose a preference or state a tie and support it with the issues identified (L2 sub-dimensions / [L3 Loss Tags]).

## Dimension 12: Models

Source: `QCSpec` Models / Models. `TrajectoryAudit.md` Section 4. `LinterSweep.md` L2, L17. `QCSpec` Notes reads `#REF!`; see `README.md` Known Source Discrepancies.

### Excellence Standard
All models used were the assigned models (`model_a_name`, `model_b_name`, `model_c_name`). Where there is no screenshot of the model settings, the dimension defaults to No Issues.

### Reject Triggers

12.1 One or more models used were not the assigned models.
Fix: Re-run the conversation on the assigned model for that slot. `[Fail - Models]`. Score 2.

No non-fail band. Confirm the model in the Model Check screenshot against the assigned model name for each slot.

## Dimension 13: Language and Localization

Source: `QCSpec` Prompts / Language and Localization. `PromptAudit.md` Section 2. `LinterSweep.md` L18. `QCSpec` Notes reads `#REF!`; see `README.md` Known Source Discrepancies.

### Excellence Standard
The user speaks in the assigned language and all of the turns match the assigned locale of the persona.

### Reject Triggers

13.1 The user's language does not match the language assigned at all; or the user's language is correct for part of the conversation but 25 percent or more of the turns do not match the locale of the persona.
Fix: Re-run the conversation in the assigned language and locale. `[Fail - Language]`. Score 2.

13.2 The user's language is correct for part of the conversation but under 25 percent of the turns do not match the locale of the persona; or the user switches between the assigned language and another language naturally and under 25 percent of the turns do not match the locale.
Fix: Keep every turn in the assigned language and locale. `[Non-Fail - Localization]`. Score 3.

Only justifications are written in English; the conversation uses the assigned language but may switch languages naturally. When Language and locale fit is logged as an issue (Dimension 5), Country fit must be 2 or 3 and the bad-note must describe the problem.

## Checklist Summary Template

```
Task: [id]                                   Verdict: [Excellence / Reject]
Locale: [languageCode, e.g. fr-FR]   Surface: [Web / Mobile]   Turn target: [n]
Assigned models: A [model_a_name]  B [model_b_name]  C [model_c_name]
Ranking (contributor): #1 [x] #2 [x] #3 [x]   Auditor ranking: #1 [x] #2 [x] #3 [x]

User Input / Conversation / Models (per model, worst decides)
   1  Valid Links                  [Pass / Reject] - [which model, link opens? / Argon JSON]
   2  Next Steps and Natural Flow  [Pass / Reject] - [which model, steps skipped]
   4  Attachments Uploaded         [Pass / Reject] - [required? same across 3? before use?]
  12  Models                       [Pass / Reject] - [screenshot shows assigned model?]

Prompt / Prompts (per model, worst decides)
   3  Opening Prompts Consistency  [Pass / Reject] - [opener == initial_prompt_native?]
  13  Language and Localization    [Pass / Reject] - [off-locale turn share %]

Rating / Formatting
   5  Issues Identified and Ranked [Pass / Reject] - [which model, the wrong/missing issue]
   6  Detail of Issues             [Pass / Reject] - [which model, the format break]
   7  Correctness - Major Rating   [Pass / Reject] - [major n, minor n across all models]

Rubric
   8  Criteria Grading Agreement   [Pass / Reject] - [which model, criterion # contradicted]

SxSxS (one ranking)
   9  Ranking Disagreement         [Pass / Reject] - [spots moved vs auditor ranking]
  10  Inconsistent Ranking         [Pass / Reject] - [scores support ranking? justified?]
  11  Verdict                      [Pass / Reject] - [justification states a preference/tie?]

Open linter IDs: [Lxx, ... / none]
```

Any single Reject rejects the task. Point at a record or drop the finding.
