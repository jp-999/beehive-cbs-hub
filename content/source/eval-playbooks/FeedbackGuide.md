# Feedback Guide

> Reference: `README.md` for the dimension map and the Known Source Discrepancies, `EvalChecklist.md` for the triggers and the bracketed categories, `EvalReport.md` for where these entries are recorded.

Rejection feedback the author can act on immediately. Every finding is factual, precise, neutral, and anchored, and every finding carries a fix and a route, so the author knows what is wrong, what to do about it, and what has to re-run once they do. This project re-runs a whole conversation when the setup is wrong, so the route is not cosmetic: it carries the re-run cost, and a single wrong-model or skipped-next-steps finding throws away every rating made against that conversation. The report orders findings so the author fixes the upstream surface, the conversation, first and never re-rates a chat that is about to be re-run. Point at a record or drop the finding. Count before you conclude.

## The Parts of Every Feedback Entry

Every entry has six parts. A finding recorded as a bare score is incomplete even when the score is right, because the SLA marks every Fail and non-fail option as requiring justification, so every non-5 carries a written justification across these fields.

1. Anchor. The exact location: the model letter (A, B, or C) and one of a conversation link, a turn number, an issue line with its [L3 Loss Tag], a Detail line, a rubric criterion with its grade, an Overall satisfaction score with the auditor's re-score, a ranking slot, the Model Check screenshot, or the assignment field. Point at a record or drop the finding.
2. Error. The precise statement, naming the error category from `EvalChecklist.md` in brackets with the separator written as a hyphen, and the SLA band (Fail 1 to 2, non-fail 3 to 4).
3. Evidence. The quote, the record, or the turn that proves it. For a behavioral claim, the user prompt and the model's actual reply.
4. Fix. The concrete instruction. Not "the issue is wrong" but "re-file the Turn 4 hallucination under Factuality and Grounding, [Source faithfulness & hallucination], and rank it #1".
5. Route. One of the routes below: Re-run conversation, Re-upload evidence, Re-score, Re-grade rubric, Re-rank, or Field edit.
6. Severity. Band 2 blocker (a Fail), Band 3 note (a non-fail), Requirement failure (a missing field or evidence, settled in `LinterSweep.md`), or Validity gate (a model-proof, locale, thinking-mode, or resubmission gate, `LinterSweep.md` L30 to L33, outside the 13 scored dimensions, routed to void-and-re-run or reject).

## Format

```
[Dimension N, Dimension name] Error [number] - Model [A/B/C or "ranking"]
Anchor: [model letter + conversation link / turn number / issue line / Detail line / criterion # / satisfaction score / ranking slot / screenshot / assignment field]
Error: [precise statement, naming the bracketed category and the SLA band]
Evidence: [quote, record, or the user prompt and the actual model reply]
Fix: [concrete instruction]
Route: [Re-run conversation / Re-upload evidence / Re-score / Re-grade rubric / Re-rank / Field edit]
Severity: [Band 2 blocker / Band 3 note / Requirement failure / Validity gate]
```

## Routing Rules

The route names the surface the fix touches and, with it, what has to be re-done afterward. The routes are ordered highest cost first, because that is the order the report fixes them in.

| Route | Surface | What it invalidates and requires |
|-------|---------|----------------------------------|
| Re-run conversation | A whole conversation for one model | Invalidates every rating made against that conversation: the satisfaction, the issues, the rubric grades, the country fit, and the model's place in the ranking. Triggered by a wrong model (12), skipped next steps or an unnatural flow (2), a wrong opening prompt (3), a wrong language or locale (13), a missing attachment (4), or a model-proof / thinking-mode validity gate (L30, L32). Highest cost |
| Re-upload evidence | A link, trajectory JSON, Model Check screenshot, or attachment | Adds the missing record so the conversation can be graded. The rating may then follow. Triggered by Valid Links (1), the trajectory / artifacts requirement (L20), or a missing screenshot (L17) |
| Re-score | The Overall satisfaction, the issue list, or the Detail and Turns lines | Re-does the per-model rating and may move the ranking. Triggered by Issues (5), Detail of Issues (6), or the Major Rating disagreement (7) |
| Re-grade rubric | The Yes / No / N/R grades and their turn justifications | Re-does the rubric grading and may move the ranking. Triggered by Criteria Grading Agreement (8) |
| Re-rank | The ranking block and its justification | Re-orders the three models or adds the verdict. Triggered by Ranking Disagreement (9), Inconsistent Ranking (10), or Verdict (11) |
| Field edit | A single field: a turn justification, a Detail line format, a country-fit note | Nothing downstream re-runs |

Three standing rules follow from the table.

A Re-run conversation is the most expensive route. It throws away every rating made against that conversation, so every Re-score, Re-grade, and Re-rank finding on that model applies to a conversation that will no longer exist. Say so in the resubmission list and fix the conversation first.

A Re-score or a Re-grade can cascade into the ranking, because the ranking reads off the satisfaction scores and the rubric grades. Re-check Dimensions 9 and 10 after any Dimension 5, 7, or 8 fix.

A validity gate is not a scored dimension but it still forces a re-run. A Model Check screenshot that does not prove the assigned model (L30), a fully off-language run (L31), or a visible non-default thinking mode (L32) voids the conversation before any dimension is graded.

## One Root Cause, Multiple Findings

A single defect often scores on more than one row. Write each finding, and say they share one root cause so the author fixes it once.

The standing pairs on Beehive:

- A wrong model on a slot scores on Models (12) as `[Fail - Models]`, and the conversation it produced cannot be graded for Next Steps (2), the rating (5 to 8), or the ranking, so those are not separate quality findings but downstream of the one wrong model. Re-running the slot on the assigned model clears the whole column.
- A conversation that skips two next steps scores on Next Steps and Natural Flow (2) as `[Fail - Next Steps Not Followed]`, and the issues and rubric graded against that truncated journey (5, 8) are graded against an incomplete conversation. Re-running the conversation clears them; do not also reject the issue list for an issue the full journey would have surfaced.
- A Language and locale fit issue logged in Column 3 (5) forces Country fit to 2 or 3 and the bad-note to describe the problem; a Country fit of 1 alongside a logged locale issue is the Dimension 13 cross-rule (L19), one contributor slip, not two.
- An Overall satisfaction the auditor scores 2 points higher (7) often flips which model is best, so it scores on Major Rating (7) and, through the changed score, on Ranking Disagreement (9) and Inconsistent Ranking (10). One re-score clears the cluster.
- A rubric criterion graded Yes on a deliverable the model only claimed (8) is the same underlying miss as an Overall satisfaction that is too high (7) and an issue the contributor did not log (5); name the claimed-but-absent deliverable once and route the grade, the score, and the issue together.
- A Detail line with no turn numbers (6) and a rubric justification with no turn (8.2) are the same habit, leaving out the turn anchor; one pass adding turns clears both.

## Examples of Good Feedback

### Example 1, a wrong model that voids the column

```
[Dimension 12, Models] Error 1 - Model B
Anchor: Model B Model Check screenshot (model_check_b)
Error: The screenshot shows ChatGPT, but model_b_name assigns Fable to slot B. The model used is not the assigned model. `[Fail - Models]`. Band 2 blocker.
Evidence: model_b_name = "Fable"; the Model Check screenshot header reads "ChatGPT"; the whole conversation ran on the wrong model.
Fix: Re-run the slot B conversation on Fable with the default Medium thinking mode, re-upload the Model Check screenshot, and re-rate.
Route: Re-run conversation
Severity: Band 2 blocker
```

### Example 2, a missing issue with its paired satisfaction finding

```
[Dimension 5, Issues Identified and Ranked] Error 2 - Model A
Anchor: Model A, issues issue_1_a to issue_3_a, against Turn 4
Error: The model invented a CAF housing-aid rule the user would act on in Turn 4, a critical hallucination, but the contributor logged "No issues". `[Fail - Issue Not Presented]`. Band 2 blocker.
Evidence: Turn 4 states the user qualifies under a regulation that does not exist; the contributor's issue_1_a is "No issues" and overall_satisfaction_a is 4; a critical failure caps satisfaction at 3 and must be Issue #1.
Fix: Log Issue #1 as Factuality and Grounding, [Source faithfulness & hallucination], describe the invented rule, and lower Overall satisfaction to 3 or less. Shared root cause with Error 3.
Route: Re-score
Severity: Band 2 blocker
```

```
[Dimension 7, Correctness/Accuracy - Major Rating] Error 3 - Model A
Anchor: Model A, overall_satisfaction_a = 4, auditor re-score = 2
Error: The auditor scores Model A at 2 against the contributor's 4, a difference of 2, a major disagreement. `[Fail - Dimension Rating Disagreement]`. Band 2 blocker.
Evidence: the Turn 4 hallucination the user would act on makes this a 2 at most; the contributor's 4 is 2 points high. Shared root cause with Error 2; logging the critical issue and lowering the score clears both.
Fix: Re-score Model A to 2 or lower.
Route: Re-score
Severity: Band 2 blocker
```

### Example 3, a loose ranking disagreement

```
[Dimension 9, Ranking Disagreement] Error 4 - ranking
Anchor: ranking slots, contributor #1 A / #2 C / #3 B, auditor #1 A / #2 B / #3 C
Error: The auditor and contributor agree on the best model but disagree on second and third, with B and C each one spot off. `[Non-Fail - Loose Ranking Disagreement]`. Band 3 note.
Evidence: B satisfied all three rubric criteria and C missed one; by the Outcome tie-breaker B should rank above C, but the contributor placed C second.
Fix: Re-rank B above C, or explain in the Ranking Justification why C ranks higher despite the rubric miss.
Route: Re-rank
Severity: Band 3 note
```

### Example 4, a missing turn justification

```
[Dimension 8, Criteria Grading Agreement] Error 5 - Model C
Anchor: Model C, rubric criterion #2, grade Yes
Error: Criterion #2 is graded Yes but the justification cites no turn. `[Non-Fail - Rubric Evidence]`. Band 3 note.
Evidence: the justification reads "the model did this"; it names no turn and does not say what the model produced.
Fix: Add the deciding turn(s) to the justification, for example "Turns: 6, 7", and state what the model delivered.
Route: Field edit
Severity: Band 3 note
```

## Examples of Bad Feedback

| Bad | Problem |
|-----|---------|
| The ratings are off. | No model, no score, no auditor re-score. Name the model, the contributor's satisfaction, the auditor's, and the difference |
| The conversation is unnatural. | No turn and no next step. Name the skipped step or the ignored reply, and say whether it is one step (3) or two (Fail) |
| The issue is miscategorized. | No tag and no fix. Quote the contributor's L2 and [L3 Loss Tag], the correct one, and the turn that decides it |
| The ranking is wrong. | No spots and no scores. Give the contributor ranking, the auditor ranking, and how many spots each model moved |
| Fix the rubric grade. | No criterion and no evidence. Name the criterion, its grade, and the final-state record that contradicts it |
| The model is wrong. | No slot and no proof. Name the slot, the assigned model_x_name, and what the Model Check screenshot shows |

## Report Structure

Order the error list so the author fixes the upstream surface first and never does a fix twice. A Requirement failure or a validity gate settled in `LinterSweep.md` leads the list, because it blocks the audit before a dimension can be read.

1. Requirement failures and validity gates: a missing link, screenshot, trajectory JSON, or ranking field; a model-proof, locale, or thinking-mode gate (L30 to L33).
2. Band 2 blockers, grouped by route, upstream surfaces first: Re-run conversation before Re-upload evidence before Re-score before Re-grade rubric before Re-rank before Field edit.
3. Band 3 notes.
4. Root cause groups, so a shared defect is fixed once and the author sees the one change that clears several rows.

A Re-run conversation comes before every Re-score, Re-grade, and Re-rank on that model, because a conversation re-run throws those ratings away. Within one model, the conversation is fixed first; the ranking is fixed last because it reads off the per-model ratings.

## Tone

Factual, precise, and neutral. No praise, no softening, no editorializing. Quote the bracketed category exactly, with the separator written as a hyphen, and name the SLA band. State behavioral claims as the user prompt and the actual model reply, never as an impression. Anchor every claim to a record: a model letter, a conversation link, a turn, an issue line with its tag, a criterion with its grade, a satisfaction score, a ranking slot, or the Model Check screenshot. And follow the house style the rest of the folder follows: no em-dashes, no en-dashes, and no emoji, in the feedback and in every field the author will read.
