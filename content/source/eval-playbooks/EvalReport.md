# Evaluation Report

QC Spec v9.25.26. The per-task record. One block per dimension, graded Excellence or Reject, plus the metrics and the routed error list. Any single Reject rejects the task. Fill every `[bracketed placeholder]`, quote each bracketed error category from `EvalChecklist.md` exactly, and write every separator as a hyphen. No em-dashes, no en-dashes, no emoji.

Task: [id, for example 6aee92b206385568d7b4ab36]
Evaluator: [Name]
Date: [YYYY-MM-DD]
Lane: [Authored / Redo / Review only]

A Review only lane re-reads an existing audit without re-opening every conversation; mark any dimension you did not re-audit [Not re-audited].

## Assignment

Surface: [Web / Mobile]
Locale (languageCode): [e.g. fr-FR, the request_language / request_country persona]
Turn target (conversation_turn_number): [n]
Attachment required: [has_image / has_file / has_attachment True, which / none]
Assigned models: A [model_a_name]   B [model_b_name]   C [model_c_name]

## Artifacts

Per model (A, B, C):
Model A: link [opens / Argon acknowledgement + trajectory JSON / invalid / missing], Model Check [shows model_a_name / wrong / missing -> L17/L30], trajectory JSON [present / missing -> L20], artifacts zip [present / no_artifacts.txt / missing -> L20]
Model B: link [...], Model Check [...], trajectory JSON [...], artifacts zip [...]
Model C: link [...], Model Check [...], trajectory JSON [...], artifacts zip [...]
Ranking block: rank_1_best [x], rank_2_middle [x], rank_3_worst [x], tie_breaker_used [x], ranking_justification [present / missing -> L13]

## Metrics

Overall satisfaction, contributor vs auditor re-score:
  Model A: contributor [n] / auditor [n] - diff [n]
  Model B: contributor [n] / auditor [n] - diff [n]
  Model C: contributor [n] / auditor [n] - diff [n]
Major disagreements (diff 2 or more): [n]   Minor disagreements (diff 1): [n]   - Dimension 7 fails at 1+ major or 2+ minor
Ranking: contributor #1 [x] #2 [x] #3 [x]   auditor #1 [x] #2 [x] #3 [x]   spots moved max [n] - Dimension 9 fails at a 2-spot move
Ranking vs contributor scores: [consistent / inverted, justified? yes/no] - Dimension 10
Rubric grades disputed: A [n] B [n] C [n] - Dimension 8

---

## Verdict

Overall: [Excellence / Reject]

If Reject, summary: [one or two sentences naming the main issues, the models they hit, and their anchors]

Band 2 blockers: [N]
Band 3 notes: [N]
Validity or requirement findings (L30 to L33, L1, L13, L20): [N]
Findings by route: Re-run conversation [N], Re-upload evidence [N], Re-score [N], Re-grade rubric [N], Re-rank [N], Field edit [N]
Grading note: the overall grade is the lowest dimension, and per-model dimensions grade to the worst model, so a single Reject rejects the task.

---

## Linter Sweep Result

From `LinterSweep.md`. Open IDs are carried into the dimension results below with their evidence.

```
Linter sweep, Task [id]
Assignment:    surface [x], languageCode [x], models A/B/C [set / L2: which blank]
Rating fields: [all present / L1: which missing], ranking block [present / L13]
Trajectory:    JSON + artifacts per model [present / L20: which missing]
Satisfaction:  A [n] B [n] C [n] (all 1-5 [yes / L6]), count vs score [ok / L11: which]
Detail/Turns:  grammar [ok / L8, L10: which], tags in taxonomy [ok / L9: which]
Prompt:        openers == initial_prompt_native [ok / L7: which]
Rubric:        every criterion graded + turn-justified [ok / L12: which]
Ranking:       permutation [ok / L14], vs satisfaction [ok / L15], verdict word [ok / L16]
Models/Lang:   screenshots [ok / L17], language [ok / L18], country-fit rule [ok / L19]
Validity:      model proof [ok / L30], locale [ok / L31], thinking mode [ok / L32], resubmission [n-a / L33]
House style:   [clean / L21: where]
Open IDs:      [L.., .. / none]
Cleared:       all others
```

---

## Dimension Results

Each dimension is graded Excellence or Reject. Any single Reject rejects the task. Numbering and categories match `EvalChecklist.md`. Dimensions 1, 2, 4, and 12 are audited in `TrajectoryAudit.md`, 3 and 13 in `PromptAudit.md`, 5, 6, and 7 in `RatingAudit.md`, 8 in `RubricAudit.md`, and 9, 10, and 11 in `RankingAudit.md`. Per-model dimensions grade to the worst model; name the model. Every score below a 5 carries a written justification in the Notes line.

### User Input, Conversation, Models, Dimensions 1, 2, 4, 12, TrajectoryAudit.md

#### 1. Valid Links
Verdict: [Excellence / Reject]
Each model's link opens, or an Argon Task chat is covered by its trajectory JSON: A [yes/no] B [yes/no] C [yes/no]
Worst model: [A/B/C / none]
Notes: [if Reject, `[Fail - Missing/Invalid Links]` or non-fail `[Non-Fail - Missing/Invalid Link]`]

#### 2. Next Steps and Natural Flow
Verdict: [Excellence / Reject]
Every next step covered with natural first-person prompts reacting to replies: A [yes/no] B [yes/no] C [yes/no]
Steps skipped / third-person text pasted / stopped after Turn 1: [none / name the model and the step]
Notes: [if Reject, `[Fail - Next Steps Not Followed]` or non-fail `[Non-Fail - Unnatural Flow]`]

#### 4. Attachments Uploaded Before Use
Verdict: [Excellence / Reject]
Attachment required: [yes / no]   Same attachments across all three: [yes/no]   Each uploaded before or with the prompt: [yes/no]
Notes: [if Reject, `[Fail - Missing Attachment]` or non-fail `[Non-Fail - Late Attachment]`]

#### 12. Models
Verdict: [Excellence / Reject]
Model Check screenshot shows the assigned model: A [yes/no] B [yes/no] C [yes/no]
Thinking mode default where visible (ChatGPT Light, Fable Medium): [yes/no/n-a]
Notes: [if Reject, `[Fail - Models]`; model proof gate L30: ok / open]

### Prompt, Prompts, Dimensions 3, 13, PromptAudit.md

#### 3. Pre-seeded and Opening Prompts Consistency
Verdict: [Excellence / Reject]
Opening prompt exactly equals initial_prompt_native: A [yes/no] B [yes/no] C [yes/no]
Notes: [if Reject, `[Fail - Opening Prompts Inconsistency]` or non-fail `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]`]

#### 13. Language and Localization
Verdict: [Excellence / Reject]
User speaks the assigned language; off-locale turn share: A [x]% B [x]% C [x]% - fail at 25% or more, or wrong language throughout
Country fit cross-rule (Language and locale fit logged -> country_fit 2 or 3, bad-note not N/A): [ok / L19: which model]
Notes: [if Reject, `[Fail - Language]` or non-fail `[Non-Fail - Localization]`]

### Rating, Formatting, Dimensions 5, 6, 7, RatingAudit.md

#### 5. Issues Identified and Ranked
Verdict: [Excellence / Reject]
Auditor and contributor list the same issues, right L2 category, same order: A [yes/no] B [yes/no] C [yes/no]
The wrong, missing, or misfiled issue: [none / model + the issue line with its [L3 Loss Tag]]
Notes: [if Reject, `[Fail - Issue Not Presented]` or non-fail `[Non-Fail - Issue Order or Category]`]

#### 6. Detail of Issues
Verdict: [Excellence / Reject]
Each Detail line is `#N: [L3 Loss Tag] - explanation` in Column 3 order with matching Turns lines: A [yes/no] B [yes/no] C [yes/no]
Notes: [if Reject, `[Fail - Formatting]`]

#### 7. Correctness/Accuracy - Major Rating
Verdict: [Excellence / Reject]
Auditor vs contributor satisfaction, across all models: major disagreements [n], minor disagreements [n]
Up to 1 minor is No Issues; 2+ minor is Non-Fail; 1+ major is Fail
Notes: [if Reject, `[Fail - Dimension Rating Disagreement]` or non-fail `[Non-Fail - Dimension Rating Disagreement]`]

### Rubric, Dimension 8, RubricAudit.md

#### 8. Criteria Grading Agreement
Verdict: [Excellence / Reject]
Every criterion graded, grades match the final state, justifications cite the deciding turn(s): A [yes/no] B [yes/no] C [yes/no]
The ungraded or contradicted criterion: [none / model + criterion # + grade + what the final state shows]
Notes: [if Reject, `[Fail - Rubric Grading Disagreement]` or non-fail `[Non-Fail - Rubric Evidence]`]

### SxSxS, Dimensions 9, 10, 11, RankingAudit.md

#### 9. Ranking Disagreement
Verdict: [Excellence / Reject]
Auditor ranking vs contributor ranking; max spots a model moved: [n] (2 is Fail, 1 is Non-Fail)
Notes: [if Reject, `[Fail - Major Ranking Disagreement]` or non-fail `[Non-Fail - Loose Ranking Disagreement]`]

#### 10. Inconsistent Ranking
Verdict: [Excellence / Reject]
Contributor's ranking consistent with the contributor's own satisfaction scores: [yes / inverted]
If inverted, adequately justified: [yes / no]
Notes: [if Reject, `[Fail - Inconsistent Ranking]` or non-fail `[Non-Fail - Inconsistent Ranking]`]

#### 11. Verdict
Verdict: [Excellence / Reject]
Ranking Justification states a preference or a tie, supported by the issues: [yes / no]
Notes: [if Reject, `[Non-Fail - Lacks Verdict]`]

Open linter IDs carried into these results: [L.., .. / none]

---

## Source Discrepancy Notes

Record every dimension where you followed the reading in `README.md` under Known Source Discrepancies.

| Area | Discrepancy | Reading applied |
|------|------------|-----------------|
| request_language / request_country | The Guide names request_language and request_country; the stored field is `languageCode` | Read `languageCode` as the language and country persona |
| Models dimension notes | `QCSpec` Dimension 12 Notes reads `#REF!` | Grade whether all models match the assigned models; default No Issues with no screenshot |
| Language dimension notes | `QCSpec` Dimension 13 Notes reads `#REF!` | Grade against the bands; 25 percent or more off-locale is a Fail |
| Argon Task links | Argon Task mode cannot share a link | A trajectory JSON stands in for the link; not a Dimension 1 defect |
| [area] | [text] | [text] |

---

## Error List

Every error, per `FeedbackGuide.md`: requirement failures and validity gates first, then Band 2 blockers grouped by route with the conversation re-runs first, then Band 3 notes. One block per finding. Point at a record or drop the finding.

```
[Dimension N, Dimension name] Error [number] - Model [A/B/C or "ranking"]
Anchor: [model letter + conversation link / turn / issue line / Detail line / criterion # / satisfaction score / ranking slot / screenshot / assignment field]
Error: [precise statement, naming the bracketed category and the SLA band]
Evidence: [quote, record, or the user prompt and the actual model reply]
Fix: [concrete instruction]
Route: [Re-run conversation / Re-upload evidence / Re-score / Re-grade rubric / Re-rank / Field edit]
Severity: [Band 2 blocker / Band 3 note / Requirement failure / Validity gate]

[Continue for all errors found]
```

---

## Root Cause Grouping

Findings that are one defect scored on more than one row. The author fixes each group once.

| Group | Findings | Shared root cause | Fixing it clears |
|-------|----------|-------------------|------------------|
| 1 | [Error N, Error N] | [text] | [dimensions] |

The standing groups on Beehive: a wrong model (12) voids its conversation's Next Steps (2), rating (5 to 8), and ranking place; one re-run clears them. A skipped-next-steps conversation (2) makes its issues (5) and rubric (8) grade an incomplete journey; the re-run clears them. A satisfaction re-score (7) that flips the best model also moves Ranking Disagreement (9) and Inconsistent Ranking (10). A rubric Yes on a claimed-but-absent deliverable (8) is the same miss as a too-high satisfaction (7) and an unlogged issue (5). A Language and locale fit issue (5) with country_fit 1 is the Dimension 13 cross-rule (L19). Group these rather than writing them as unrelated findings.

---

## Route Summary

| Route | Count | Items |
|-------|-------|-------|
| Re-run conversation | [N] | [model + reason] |
| Re-upload evidence | [N] | [list] |
| Re-score | [N] | [list] |
| Re-grade rubric | [N] | [list] |
| Re-rank | [N] | [list] |
| Field edit | [N] | [list] |

A Re-run conversation invalidates every rating made against that conversation, so every Re-score, Re-grade, and Re-rank finding on that model then applies to a conversation that no longer exists. A Re-score or Re-grade may re-derive the ranking. Order the list so the conversation is fixed first and no fix is done twice.

---

## Resubmission Requirements

If rejected, every fix required before resubmission, ordered by surface so nothing is done twice.

**Phase 1, conversations.** Re-run any conversation with a wrong model, skipped next steps, a wrong opening prompt, a wrong language or locale, a missing attachment, or a failed validity gate. A re-run invalidates that conversation's ratings and ranking place, so it forces Phase 3 for that model.

1. [First required fix]
2. [Second required fix]

**Phase 2, evidence.** Add any missing conversation link, trajectory JSON, Model Check screenshot, or attachment.

3. [First required fix]

**Phase 3, ratings and ranking.** Re-score the satisfaction and issues, re-grade the rubric against the final state, and re-rank the three models with a verdict justification. Confirm the ranking follows the satisfaction scores.

4. [First required fix]

Total fixes required: [N]
Estimated effort: [Low: 1 to 3 field or re-score edits / Medium: 4 to 8, or one conversation re-run / High: a re-run on two or more models]
Any conversation re-run required, so its ratings and ranking re-run: [Yes / No, which models]

---

## Sign-Off

All 13 dimensions at excellence: [Yes / No]
Every conversation has a valid link or an Argon trajectory JSON, on the assigned model, in the assigned language: [Yes / No]
Every opening prompt equals initial_prompt_native: [Yes / No]
Issues match the auditor's top-3 in category and order, Detail lines are well-formed, satisfaction agrees within one minor point: [Yes / No]
Every rubric criterion is graded on the final state with a turn-citing justification: [Yes / No]
The ranking follows the satisfaction scores, matches the auditor's ranking, and states a verdict: [Yes / No]
Trajectory JSON and artifacts uploaded for every model run: [Yes / No]
Cleared for submission: [Yes / No, with what remains]
