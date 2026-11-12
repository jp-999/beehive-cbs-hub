# Rating Audit

> Reference: `README.md` for the 13-dimension map, the worst-model-decides split, the Beehive task model, and the source readings; `EvalChecklist.md` for the trigger index and the verbatim bracketed categories; `LinterSweep.md` for the mechanical pre-pass carried here as L6, L8, L9, L10, and L11; `IssueMatching_Guide.md` for the full L1 / L2 / L3 taxonomy and the top-3 issue re-derivation procedure this file does not reproduce; `TrajectoryAudit.md` for the three conversations this file grades against; `RubricAudit.md` for the rubric grades this file does not touch; `RankingAudit.md` for the ranking a satisfaction change may move. QC Spec v9.25.26.

The artifact this file audits is the per-model rating, for each of Model A, Model B, and Model C: the contributor's Overall satisfaction (Column 2, `overall_satisfaction_x`, an integer 1 to 5), the 1 to 3 ranked L2 issues (Column 3, `issue_1_x` to `issue_3_x`), the Detail of issues lines (Column 4, `detail_of_issues_x`), and the Turns lines (Column 5, `turns_where_issues_occurred_x`). This file owns three dimensions: Issues Identified and Ranked (5), Detail of Issues (6), and Correctness/Accuracy - Major Rating (7). It does not grade the rubric (8, owned by `RubricAudit.md`) or the ranking (9 to 11, owned by `RankingAudit.md`), and it does not re-grade the conversation itself (1, 2, 4, 12 in `TrajectoryAudit.md`; 3, 13 in `PromptAudit.md`).

This file is Step 4 in the `README.md` process: it runs after `TrajectoryAudit.md` and before `RubricAudit.md`, and the order is load-bearing. A rating is only as valid as the conversation it grades. `TrajectoryAudit.md` confirms each conversation has a valid link (or Argon trajectory JSON), covered every next step with natural first-person prompts, uploaded the right attachments, and used the assigned model, all before a single satisfaction score or issue is re-derived here. This file runs before `RubricAudit.md` because the contributor forms the satisfaction score and the issues first, then scores the rubric, exactly as the Guide instructs the contributor to work (Guide section 9). Grade the part you were told to grade: a satisfaction disagreement is Dimension 7, a rubric disagreement is Dimension 8, a ranking disagreement is Dimension 9. Do not double-count one miss across rows that do not own it.

Two scopes live in this file. Dimensions 5 and 6 are read per conversation, and the worst of the three models decides the band; grade to the worst model, and name the model on every finding. Dimension 7 is the one exception to grade to the worst model: it is a single tally across all three models at once, counting major and minor Overall satisfaction disagreements. Count before you conclude. Point at a record or drop the finding: every rejection names the model, the satisfaction score with the auditor's re-score, or the issue line with its exact [L3 Loss Tag] and the Turns it cites.

## The Re-Rate-First Rule

| **RE-RATE-FIRST RULE**<br>Before you read a single one of the contributor's satisfaction scores or issue lines, open each conversation on its Share link (or the Argon Task trajectory JSON), read it end to end, and form your own answer for every model: your own Overall satisfaction (1 to 5), and your own top-3 issue list, ranked by impact and filed to the L2 sub-dimension and the exact [L3 Loss Tag]. Write your own answer down first, for all three models. Only then read the contributor's and compare. A rating audited by reading the contributor's answer first is anchored to that answer, and an anchored auditor cannot catch a satisfaction score propped on an issue the conversation never shows, a top-3 issue the contributor missed, or a critical failure ranked below a polish slip. Form your answer, then grade theirs against it. |
| --- |

Run the rule mechanically first. Confirm the conversation you are grading against is the valid run that `TrajectoryAudit.md` settled: a rating made against a conversation that stopped after Turn 1, skipped next steps, used the wrong model, or is missing its link is suspect no matter how well justified, and once that conversation is fixed and re-run the whole rating is re-derived from the corrected conversation. Confirm every per-model rating field is present (L1) and every Overall satisfaction is an integer 1 to 5 (L6); a missing or out-of-range satisfaction cannot be compared and blocks the dimension until it is resolved. Re-derive the top-3 issues with the procedure and the disambiguation guide in `IssueMatching_Guide.md`, not from memory, so the L2 and [L3 Loss Tag] you compare against are the taxonomy's and not your paraphrase.

## What the Satisfaction Bands Mean

The five Overall satisfaction options (Column 2), from Guide section 4. Rate the end-to-end experience, both the final outcome and the journey to reach it, before scoring the rubric.

| Score | Band (Column 2 dropdown) | What it means | Required action in the issues columns |
| --- | --- | --- | --- |
| 5 | Very satisfied | The main goal was completed successfully, with no issues in the content or only very minor ones (small typos, style). Not possible if any rubric criterion is an unflagged No, or if a critical failure occurred. | No issues in Column 3; N/A in Detail (Column 4) and Turns (Column 5). |
| 4 | Somewhat satisfied | The main goal was completed with some pain points; quality was overall good but with non-dealbreaking issues. | 1 to 3 ranked L2 sub-dimensions, structured Detail, matching Turns. |
| 3 | Neither satisfied nor dissatisfied | Part of the goal was achieved but not completely; quality is far from perfect. | 1 to 3 ranked L2 sub-dimensions, structured Detail, matching Turns. |
| 2 | Somewhat dissatisfied | Major issues prevented reaching the goal successfully. | 1 to 3 ranked L2 sub-dimensions, structured Detail, matching Turns. |
| 1 | Very dissatisfied | The model did not get even the basics right; a terrible experience, totally unable to reach the goal. | 1 to 3 ranked L2 sub-dimensions, structured Detail, matching Turns. |

A critical or unrecoverable failure caps satisfaction at 3 and must be Issue #1: [Action dishonesty], [Placeholder passed as real], [Source faithfulness & hallucination] in anything the user acts on, [Data privacy breach / data protection], or an unauthorized irreversible action (a sent message, a file shared beyond the intended audience, a deletion, or a purchase without the user's go-ahead). When one of these occurs, Overall satisfaction is 3, 2, or 1, never 4 or 5 (Guide section 5).

## What a Well-Formed Detail Line Looks Like

Dimension 6 grades the shape of the Detail and Turns fields, not whether the issue is right. One numbered line per issue, `#N: [L3 Loss Tag] - explanation`, in the exact order of the L2 sub-dimensions in Column 3, with a one-to-one `#N:` line of turn numbers in Column 5. When satisfaction is 5, Detail and Turns are both N/A.

| Well-formed (Dimension 6 clean) | Malformed (Dimension 6 Reject) |
| --- | --- |
| `#1: [Source faithfulness & hallucination] - In Turn 15 the model invented a survey the user would act on.` with Column 5 `#1: 15` | `The model made up a survey and also skipped the deadline.` One line, no `#N:`, no bracketed tag, two problems fused. |
| Column 3 = Action completion, Tool and connector reliability; Detail reads `#1: [Explanation instead of creation] - ...` then `#2: [Tool execution failure] - ...`, matching the Column 3 order | Column 3 lists Action completion first, but Detail leads with `#1: [Tool execution failure]`; the numbering does not match the Column 3 order |
| Two issues, two Detail lines, two Turns lines, numbered `#1`, `#2` on both sides | Two issues and two Detail lines, but Column 5 carries a single unnumbered line of turns, so the Turns do not correspond to the issue lines |
| Satisfaction 5, Column 3 `No issues`, Column 4 `N/A`, Column 5 `N/A` | Satisfaction 5 but Column 4 carries a `#1:` Detail line; Detail is not N/A |

---

## Section 1: Issues Identified and Ranked (Dimension 5)

Source: `QCSpec` Rating / Issues Identified and Ranked. `EvalChecklist.md` Dimension 5. `IssueMatching_Guide.md` for the matching rules. `LinterSweep.md` L9, L11. Per model, the worst model decides the band.

### Excellence Standard

For every model, the auditor and the contributor list the same issues under the right L2 categories and in the same order (or "No issues" / "none").

### How to Audit

1. Re-derive first. From your Re-Rate-First notes, for each model write your own top-3 issues before reading Column 3: each as an L2 sub-dimension with its exact [L3 Loss Tag] and a one-line reason anchored to the turn that shows it, ranked by impact. Use the re-derivation procedure and the disambiguation guide in `IssueMatching_Guide.md`.
2. Settle count against satisfaction (L11). Satisfaction 5 must carry "No issues" with N/A Detail and Turns; satisfaction 4 or lower must carry 1 to 3 L2 issues. A satisfaction 5 with issues listed, or a 4 or lower with "No issues", is the mechanical half of 5.1.
3. Confirm each listed issue is real. Open the turn each Column 3 issue names and confirm the conversation shows it. An issue the conversation does not show is 5.1. An issue the transcript cannot show on its own (connector screens, latency, an attachment) is not thereby unsupported: check the live link or the trajectory JSON before failing it.
4. Confirm nothing real is missing. Compare your top-3 to the contributor's. If the contributor selected 3 issues and a top-3 issue by impact is missing, that is 5.2. If the contributor said "No issues" when the conversation has a clear issue, that is 5.1; when the only issues are minor or debatable, "No issues" is 5.2.
5. Confirm the L2 and the [L3 Loss Tag] (L9). Each Column 3 value is one of the 15 L2 sub-dimension names, and each bracketed tag in Detail is a verbatim [L3 Loss Tag] from that same L2. A real problem filed under the wrong L2 sub-dimension, or under the wrong [L3 Loss Tag] inside the right L2, is a category error (5.2). Use `IssueMatching_Guide.md` to separate a genuine miscategorization from an accepted alternative tag.
6. Confirm the order. Issue #1 is the single biggest driver of dissatisfaction, #2 the next, #3 the smallest. An order the impact does not support is 5.2.
7. Apply the critical-failure rule. [Action dishonesty], [Placeholder passed as real], [Source faithfulness & hallucination] in anything the user acts on, [Data privacy breach / data protection], or an unauthorized irreversible action must be Issue #1 with satisfaction 3 or lower. A critical failure ranked below a lesser issue, or absent while present in the conversation, is a Dimension 5 finding.
8. Band each of A, B, C, and take the worst model as the task band. Name the model.

### Reject Triggers

5.1 For at least one model, the contributor says "No issues" or "None" although the conversation has a clear issue, or the contributor lists an issue the conversation does not show, or the issues do not match the satisfaction score (Very satisfied with issues listed, or 4 or lower with "No issues").
Fix: List the real issues the conversation shows, and align the issue count with the satisfaction score. Name the model. `[Fail - Issue Not Presented]`. Score 2.

5.2 Every listed issue is real, but a top-3 issue is missing despite the contributor selecting 3 issues, the issues are ranked in an order their impact does not support, or a real problem is filed under the wrong L2 sub-dimension or [L3 Loss Tag] (also: "No issues" when the only issues are minor or debatable).
Fix: Add the missing top-3 issue, reorder by impact, or re-file under the correct L2 / [L3 Loss Tag]. Name the model. `[Non-Fail - Issue Order or Category]`. Score 3. Non-fail is still a Reject.

### Drill: The Re-Derive Pass

Walk each model's conversation and write your own top-3 before you read Column 3, so the contributor's list does not anchor yours. The decided case is concrete. Suppose Model B's conversation, asked for CAF housing-aid eligibility, has the model invent a regulation the user would act on in Turn 4, and bury the actual answer under tangents in Turn 2. Your re-derivation: Issue #1 is Factuality and Grounding, [Source faithfulness & hallucination], because the user would act on a false rule (a critical failure, so satisfaction 3 or lower); Issue #2 is Digestibility, [Buried answer]. The contributor logged Issue #1 Digestibility [Buried answer] and Issue #2 Factuality and Grounding [Source faithfulness & hallucination]. Both issues are real, so this is not 5.1, but the critical hallucination is ranked #2 under a polish issue when it must be #1, an order the impact does not support: 5.2 `[Non-Fail - Issue Order or Category]` for Model B. The satisfaction number itself (whether the contributor's score respects the 3-or-lower cap) is counted in Dimension 7, not here. Grade the part you were told to grade.

### Notes

- Evaluate every conversation against the task's next steps. A next step may take several turns and may be adapted to what the model actually said.
- Not following up on an answer that looks right but is wrong is Dimension 7 / 8, not here.
- Language and locale is Dimension 13, not here. When Language and locale fit is a top-3 driver of dissatisfaction it must still be logged in Column 3 as an L2 issue; the off-locale turn share and the Country fit cross-check are owned by `PromptAudit.md` Dimension 13.
- Two issues may share an L1 but never the same L2. Do not log the same underlying mistake twice; an initial error that also forced extra correction turns may be logged once under its own L2 and once under Clarifications and check-ins for the recovery friction.
- Grade to the worst model, and name the model on every finding.

---

## Section 2: Detail of Issues (Dimension 6)

Source: `QCSpec` Formatting / Detail of Issues. `EvalChecklist.md` Dimension 6. `LinterSweep.md` L8, L10. Per model, the worst model decides the band. No non-fail band: a model is a 5 or a Fail.

### Excellence Standard

None of the Detail of issues fields has a major formatting error. Each selected issue is one numbered line, `#N: [L3 Loss Tag] - explanation`, matching the order of the L2 sub-dimensions in Column 3, with a matching `#N:` line of turn numbers in Column 5.

### How to Audit

1. Settle the line grammar (L8). Every Detail line starts with the issue number, then an exact bracketed [L3 Loss Tag], then a hyphen separator, then the explanation: `#N: [L3 Loss Tag] - what went wrong`. A line that does not start with `#N:` and an exact bracketed tag is 6.1.
2. Count Detail lines against Column 3 (L8). The number of Detail lines equals the number of L2 issues listed in Column 3. One short or one long is 6.1.
3. Check the numbering order. The `#1`, `#2`, `#3` order in Detail matches the order of the L2 sub-dimensions in Column 3. Numbering that does not match the Column 3 order is 6.1.
4. Check Turns correspondence (L10). Column 5 carries one `#N:` line per Detail line, with the same numbering, one-to-one. Turns lines that do not correspond to the issue lines are 6.1.
5. Check the N/A rule. When satisfaction is 5, Detail (Column 4) and Turns (Column 5) are both N/A. A satisfaction 5 whose Detail is not N/A is a formatting break here, and it pairs with the Dimension 5 count-versus-score slip; name it once (see Notes).
6. Band each of A, B, C, and take the worst model as the task band. Name the model.

### Reject Triggers

6.1 For at least one model, the Detail of issues field has a major formatting issue: a line that does not start with the issue number and an exact bracketed [L3 Loss Tag], numbering that does not match the order of the L2 sub-dimensions in Column 3, or Turns lines that do not correspond to the issue lines.
Fix: Rewrite each line as `#N: [L3 Loss Tag] - what went wrong`, in Column 3 order, with matching `#N:` Turns lines. Name the model. `[Fail - Formatting]`. Score 2.

No non-fail band. This dimension grades the structure and formatting of the field only.

### Drill: The Grammar Pass

Read each Detail field as pure structure, ignoring whether the issue is the right one. The decided case is concrete. Model C, satisfaction 3, Column 3 = Instruction following, Language and locale fit. The Detail field reads, as a single line: `#1: [Misunderstood intent] - the model did the wrong task, and it also replied in English in Turn 4.` Column 5 reads `#1: 2`. Three formatting breaks: the second L2 in Column 3 (Language and locale fit) has no Detail line of its own, so the Detail line count (1) does not equal the Column 3 issue count (2); two distinct problems are fused into the `#1` line; and there is no `#2:` Turns line to correspond to a second issue. That is 6.1 `[Fail - Formatting]` for Model C. Whether `[Misunderstood intent]` is even the correct tag is Dimension 5, not here; grade each once.

### Notes

- This dimension grades structure and formatting only. Whether the issue itself is correct is Dimension 5, and the attachment-sameness check is Dimension 4. The `QCSpec` Detail of Issues notes repeat Dimension 4's attachment comparison at length (see `README.md` Known Source Discrepancies); do not re-grade attachments here.
- When satisfaction is 5, Detail and Turns must be N/A.
- L8 with L11 together, a satisfaction 5 that still carries issues and a Detail field that is not N/A, is one contributor slip about the No-issues rule, not two: route the count-versus-score half to Dimension 5 and the N/A-formatting half here, but name the single cause once.
- No non-fail band: a model's Detail is a 5 or a `[Fail - Formatting]`. A formatting Reject fails the task exactly as any other Fail does.
- Grade to the worst model, and name the model on every finding.

---

## Section 3: Correctness/Accuracy - Major Rating (Dimension 7)

Source: `QCSpec` Rating / Correctness/Accuracy - Major Rating. `EvalChecklist.md` Dimension 7. `LinterSweep.md` L6. One tally across all three models at once; this is the exception to grade to the worst model.

### Excellence Standard

The auditor's dimension ratings match the contributor's, up to one minor disagreement. A major disagreement is a difference of 2 or more points on Overall satisfaction; a minor disagreement is a difference of 1 point. Count across all three models.

### How to Audit

1. Use your Re-Rate-First scores. You already formed an Overall satisfaction for each model before reading the contributor's; use those. Do not revise your own score now to narrow or widen a disagreement.
2. Confirm L6. Each `overall_satisfaction_x` is an integer 1 to 5. A non-integer or out-of-range value cannot be compared; resolve it before tallying.
3. Compute the per-model gap. For each of Model A, Model B, Model C, take the absolute difference between the auditor's satisfaction and the contributor's: a gap of 0 is agreement, a gap of 1 is a minor disagreement, a gap of 2 or more is a major disagreement.
4. Tally across all three models. Write the major-disagreement count and the minor-disagreement count. This is one tally for the task, not a per-model band; the worst-model rule does not apply here.
5. Apply the thresholds: 1 or more major disagreements is 7.1; 2 or more minor disagreements is 7.2; 0 major and 0 or 1 minor is No Issues.
6. Anchor every disagreement. Name the model, the contributor's satisfaction, your re-score, and the one-line reason from your re-derivation.

### Reject Triggers

7.1 The auditor has 1 or more major disagreements with the contributor (a difference of 2 or more points on any model).
Fix: Re-score the conversation and reconcile; the contributor's satisfaction is off by 2 or more. Name the model and write the gap. `[Fail - Dimension Rating Disagreement]`. Score 2.

7.2 The auditor has 2 or more minor disagreements (a difference of 1 point on two or more models).
Fix: Reconcile the minor disagreements. Name the models and write the gaps. `[Non-Fail - Dimension Rating Disagreement]`. Score 3. Non-fail is still a Reject.

### Drill: The Gap Count

Lay the three auditor scores beside the three contributor scores, compute the three gaps, and tally. The decided case is arithmetic. Auditor: A 4, B 2, C 5. Contributor: A 5, B 3, C 5. Gaps: A is 1 (minor), B is 1 (minor), C is 0. Zero major, two minor: 7.2 `[Non-Fail - Dimension Rating Disagreement]`, tally major 0, minor 2. Now change one cell: the contributor rated B 4 while you scored B 2. That gap is 2, a major disagreement, so the task is 7.1 `[Fail - Dimension Rating Disagreement]` regardless of the other two models, tally major 1, minor 1. Count before you conclude, and never round up: one minor disagreement alone is a clean No Issues, a second minor is a Non-Fail 3.

### Notes

- One minor disagreement is No Issues. A second minor is a Non-Fail 3. A single major is a Fail on its own.
- Count math is required: write the major-disagreement count and the minor-disagreement count across all three models.
- Reserve a disagreement for a real difference. A satisfaction you would also have given is agreement; do not manufacture a disagreement to look strict, or suppress one to look lenient.
- Dimension 7 counts the number only (the Overall satisfaction score). The issues themselves are Dimension 5 and the rubric grades are Dimension 8; a satisfaction gap often travels with an issue or rubric error, but each is counted in its own row.
- A satisfaction disagreement that also flips the model order routes to `RankingAudit.md` (see the handoff below).
- This is the one dimension that is not graded to the worst model: it is a single tally across Models A, B, and C.

---

## The Rating-to-Downstream Handoff

Every finding this file confirms either corrects a rating in place or exposes a defect its true owner must fix. Route it before the report is written. Point at a record or drop the finding.

| Signal in the rating | Route | What happens downstream |
|----------------------|-------|-------------------------|
| A real problem filed under the wrong L2 sub-dimension or [L3 Loss Tag] | `IssueMatching_Guide.md` re-derivation | Re-derive the issue against the taxonomy and disambiguation guide; correct the L2 / [L3 Loss Tag]; count it in the Dimension 5 band (5.2) |
| A satisfaction disagreement that also changes the model order | `RankingAudit.md` 9 and 10 | The gap is counted in Dimension 7 here; the ranking impact is settled against the auditor's ranking (9) and the contributor's own scores (10) |
| A rubric grade that is wrong or unsupported | `RubricAudit.md` 8 | The grade is corrected under Dimension 8; this file does not touch the rubric |
| An issue the transcript cannot show on its own (connector screens, latency, an attachment) | Re-read the live link or the trajectory JSON | Confirm against the conversation record before failing it; it is not unsupported just because the text does not carry it |
| Not following up on an answer that looks right but is wrong | Dimension 7 / `RubricAudit.md` 8 | The missed follow-up weighs on the satisfaction score and the rubric final state, not on the Dimension 5 issue selection |
| A Detail formatting break that is also a wrong issue | Dimension 6 (structure) and Dimension 5 (correctness) | Grade each once: the shape here, the correctness in Section 1; do not double-count |
| Language and locale logged as an issue | Dimension 5 (selection) and `PromptAudit.md` 13 | The L2 selection is graded here; the off-locale turn share and the Country fit cross-check are Dimension 13 |

## Verdict

Excellence when, for every model, your issues and the contributor's match under the right L2 categories in the same order (Dimension 5); every Detail of issues field is well-formed with matching Turns lines (Dimension 6); and across all three models you have at most one minor satisfaction disagreement and no major one (Dimension 7). Any shortfall is a Reject. Dimensions 5 and 6 grade to the worst model; Dimension 7 is one tally across all three. Non-fail is still a Reject: a `[Non-Fail - Issue Order or Category]` on Dimension 5, or a `[Non-Fail - Dimension Rating Disagreement]` on Dimension 7, drops the clean score exactly as a Fail does. Dimension 6 has no non-fail band: it is a 5 or a `[Fail - Formatting]`. Every finding carries a written justification and an anchor. Point at a record or drop the finding.

## Audit Summary Template

```
Rating Audit - Task [id]                              Verdict: [Excellence / Reject]

Re-rate-first: own satisfaction + top-3 issues formed before reading the contributor's: [yes/no]
Conversations graded = the valid runs TrajectoryAudit.md settled:                      [yes/no]
Satisfaction  auditor vs contributor   A [n vs n]   B [n vs n]   C [n vs n]   (all integer 1-5: [yes / L6])

Dimension 5  Issues Identified and Ranked   (per model, worst decides)
  Model A  [No Issues / Non-Fail - Issue Order or Category / Fail - Issue Not Presented] - [the wrong / missing / mis-filed issue, turn]
  Model B  [No Issues / Non-Fail - Issue Order or Category / Fail - Issue Not Presented] - [...]
  Model C  [No Issues / Non-Fail - Issue Order or Category / Fail - Issue Not Presented] - [...]
  Band (worst model): [No Issues / Non-Fail - Issue Order or Category / Fail - Issue Not Presented]

Dimension 6  Detail of Issues   (per model, worst decides; no non-fail band)
  Model A  [No Issues / Fail - Formatting] - [grammar / Column 3 order / Turns correspondence / N/A rule]
  Model B  [No Issues / Fail - Formatting] - [...]
  Model C  [No Issues / Fail - Formatting] - [...]
  Band (worst model): [No Issues / Fail - Formatting]

Dimension 7  Correctness/Accuracy - Major Rating   (one tally across A, B, C)
  Gaps  A [|auditor-contributor|]   B [|auditor-contributor|]   C [|auditor-contributor|]
  Major disagreements (gap >= 2): [n]        Minor disagreements (gap = 1): [n]
  Band: [No Issues (0 major, <=1 minor) / Non-Fail - Dimension Rating Disagreement (>=2 minor) / Fail - Dimension Rating Disagreement (>=1 major)]

Flagged (model - dimension - contributor vs auditor - deciding turn / issue line):
  ...

Open linter IDs carried in: [L6, L8, L9, L10, L11 / none]
Downstream routes: [IssueMatching_Guide re-derive | RankingAudit 9/10 | RubricAudit 8 | re-read conversation | none]
```
