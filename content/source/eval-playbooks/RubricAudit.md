# Rubric Audit

> Reference: `README.md` for the excellence standard, the 13-dimension map, the Beehive task model, and the Known Source Discrepancies, `EvalChecklist.md` for the verbatim reject triggers and the bracketed categories this file quotes, `LinterSweep.md` for the mechanical ID this reading picks up (L12 feeds Dimension 8), `IssueMatching_Guide.md` for the issue-to-issue matching this file does NOT perform (that comparison is owned by Dimension 5 in `RatingAudit.md`), `RatingAudit.md` for the satisfaction and issue reads formed before this one, `TrajectoryAudit.md` for the conversation reads every grade depends on, `RankingAudit.md` for where a corrected grade is consumed, `QCSpec` (`../Ext instructions new/QC Spec.md`) Rubric / Criteria Grading Agreement for the three bands, and `Guide` (`../Ext instructions new/Beehive Instructions UPDATED.md`) section 9 for the rubric scoring rules. QC Spec v9.25.26.

The artifact this file audits is the contributor's grading of the task's predefined Outcome Rubric: the roughly three binary criteria stored in `METADATA.rubric`, scored per model in Column 6 as Yes, No, or N/R, each carrying a Column 7 justification that names the deciding turn(s) (for example `Turns: 1, 3`). Nothing else. This file owns one dimension only, Dimension 8, Criteria Grading Agreement, scored per model with the worst model deciding the band.

It runs as Step 5 of the evaluation, after `RatingAudit.md` and before `RankingAudit.md`, and the order is load-bearing. The contributor forms Overall satisfaction and the top issues (Columns 2 to 5) before scoring the rubric, exactly as `Guide` section 9 instructs, so `RatingAudit.md` settles those first. The ranking then reads the Outcome count straight off these grades, so `RankingAudit.md` runs last. A grade that is corrected here, or a criterion that is flagged defective here, changes what the ranking is allowed to do; settle the grades here or the ranking is reading numbers that have not been checked. Carry the open linter ID L12 into this reading: a criterion with no Yes / No / N/R grade, or a graded criterion with no turn number in its justification, is recorded as its linter ID and confirmed here, not re-derived.

### What this file does not grade

Three neighbors look close enough to pull findings into the wrong file. Grade the part you were told to grade.

- The contributor's own issue list (Column 3 L2 sub-dimensions and Column 4 `[L3 Loss Tag]` lines) is Dimension 5, read in `RatingAudit.md` against the auditor's independent top-3. The matching procedure, same L2 and a Detail line describing the same underlying problem, lives in `IssueMatching_Guide.md`. Do not re-run it here. The `QCSpec` Rubric row carries an auditor note that describes exactly that issue-to-issue matching; it is a copy-paste artifact from the adjacent Rating row. The Rubric row's own three bands, and the `README.md` data model that assigns Columns 6 and 7 to Dimension 8, are unambiguous: this dimension grades the predefined Yes / No / N/R rubric against the final state, and the issue-matching note is handled where it belongs, in Dimension 5.
- The satisfaction score itself is Dimension 7. A wrong number is counted there; a wrong grade is counted here. They are counted together when both are wrong (see Notes).
- The structure of the Detail of issues field, `#N: [L3 Loss Tag] - explanation`, is Dimension 6, also in `RatingAudit.md`. This file never grades formatting.

---

| **THE RE-GRADE-FIRST RULE**<br>Open the conversation for the model being graded (the shareable link, or, for an Argon Task run with no link, the uploaded trajectory JSON per the `README.md` Dimension 1 exception). Read it to the final state. Inspect the actual deliverable where the criterion says it should live: the connected workspace, the Drafts folder, the Drive file, the artifact. Then form your own Yes, No, or N/R for every criterion in `METADATA.rubric`, and write down the turn that decides each one, BEFORE you read the contributor's grades. A grade audited by reading the contributor's answer first is anchored to that answer, and the failure this dimension exists to catch, a Yes propped on a claim the deliverable never backs, is invisible once you have accepted the contributor's reading of it. |
| --- |

## Calibrate Before You Grade

Six guards prevent the most common false rejections on this dimension. Read them before flagging a single grade.

(a) The final state decides, not the journey. If the model got a calculation or a draft wrong in Turn 2 and the final turn fixes it, that outcome criterion passes (Yes). The extra turns and the friction belong in Overall satisfaction and the issues (Dimensions 5 and 7), not here.

(b) A conversation-wide prohibition is the exception to (a). When a criterion checks something that must hold across the whole chat, for example refraining from revealing the answer before the user states their own conclusion, a violation anywhere in the conversation is No, even if the model stopped doing it later. A later recovery does not undo a whole-chat prohibition.

(c) Claimed is not landed. A Yes needs the deliverable to exist where the criterion says it lives. Open the live link, the Drive file, or the Drafts folder and look. A model that describes or claims to have saved a draft that does not actually exist earns No, not Yes.

(d) N/R is a narrow door. N/R is only for a conditional follow-up branch that legitimately never arose in the conversation. If the user asked for the thing and the model ignored, contradicted, or failed to deliver it, that is No, never N/R.

(e) A debatable difference is a Non-Fail, not a Fail. Reserve the Fail band for a grade the final state contradicts. Where the final state is honestly ambiguous and a careful reader could land either way, a grade that differs from the auditor's is the Non-Fail band.

(f) A flag never changes a grade. Flag only a criterion that is itself defective. A broken criterion that was not met is still No, with the flag attached. Never flag to excuse a miss.

## What Yes, No, and N/R Mean

Score each criterion on the final state of the conversation or deliverable. The grade answers one question: where does the user stand on this criterion when the conversation finishes?

| Grade | Meaning | What the justification (Column 7) must carry |
|-------|---------|----------------------------------------------|
| **Yes** | Fulfilled. The criterion is clearly and observably satisfied in the final state. | The turn number(s) where the criterion was satisfied, and what the model did to satisfy it (for example `Turns: 2, 3 - the schedule spreadsheet in Drive covers all three periods with the 117-day count`). |
| **No** | Not fulfilled. The conversation called for the criterion and the model missed, contradicted, or failed to deliver it by the end. | The turn number(s) where it was missed or violated, and what the model did or failed to do. |
| **N/R** | Not relevant. The criterion tests a conditional follow-up branch that legitimately never arose. | `N/R` on that criterion's line (for example `#3: N/R`). |

### Grounded vs ungrounded justification

A justification must cite the deciding turn(s) and say what the model did. A grade with a bare verdict and no turn, or a turn with no account of what happened, is the `[Non-Fail - Rubric Evidence]` tell even when the grade itself is right.

| Grounded (supports the grade) | Ungrounded (Non-Fail even if the grade is right) |
|-------------------------------|--------------------------------------------------|
| `#1: No - Turns: 1, 3. The model revealed the final convergence verdict in Turn 1 and again in Turn 3 instead of guiding step by step, violating the no-answer prohibition.` | `#1: No - the model got it wrong.` |
| `#2: Yes - Turns: 12, 13. The availability emails to Mom and Dad in the Gmail Drafts folder are grounded in the calendar and Drive schedule, with no invented events.` | `#2: Yes.` |
| `#3: Yes - Turns: 12, 13. All drafted family emails remain unsent in the Drafts folder; none was sent externally.` | `#3: Yes - it probably saved it.` |

## Dimension 8: Criteria Grading Agreement

Source: `QCSpec` Rubric / Criteria Grading Agreement. `EvalChecklist.md` Dimension 8. `Guide` section 9. `LinterSweep.md` L12. Per model, worst decides.

### Excellence Standard

The auditor agrees with every rubric grade for every model, and every justification cites the turn(s) that show it. Every criterion in `METADATA.rubric` carries a Yes, No, or N/R. Grade each model against the final state of its own conversation; the worst of the three models decides the band. Name the model on every finding.

### Reject Triggers

8.1 For at least one model, a rubric criterion is left ungraded, OR its grade is contradicted by the conversation: Yes for a deliverable the model only claimed, No for a criterion the final state meets, or N/R for a criterion the user asked for and the model failed.
Fix: Grade every criterion against the final state, and correct the contradicted grades. `[Fail - Rubric Grading Disagreement]`. Score 2.

8.2 Every grade is supported, but at least one justification is missing, cites no turn or the wrong turn, or does not say what the model did; OR a grade differs from the auditor's on a criterion that is genuinely debatable.
Fix: Add the deciding turn(s) to each justification, or reconcile the debatable grade. `[Non-Fail - Rubric Evidence]`. Score 3.

Excellence is a clean `[No Issues]`, Score 5: every criterion graded, every grade agreed, every justification turn-cited for every model. A Non-Fail 3 is still a Reject here; record the true band because it carries the real SLA outcome and the feedback severity.

## How to Audit

### 1. Establish the criteria set

Read `METADATA.rubric` and list every criterion with its number (#1, #2, #3...). This is the set every model is graded against, and it is fixed: the same criteria apply to Model A, Model B, and Model C. Confirm the contributor graded all of them for every model. A criterion with no Yes / No / N/R grade is the ungraded half of 8.1 and is the open L12 carried from the sweep. Count before you conclude: write how many criteria the set holds, because the per-model tally and the ranking's Outcome count both divide by it.

### 2. Apply the final-state rule

Grade where the user stands at the last turn, not how bumpy the path was.

| Final state at the last turn | Grade | Why |
|------------------------------|-------|-----|
| The outcome exists and meets the criterion, even after a mid-chat error the model fixed | Yes | Score the end state; the friction is Dimensions 5 and 7, not here |
| The outcome is missing, wrong, or contradicted at the end | No | The conversation called for it and the end state does not meet it |
| The criterion is a conversation-wide prohibition and it was violated anywhere in the chat | No | A later recovery does not undo a whole-chat prohibition, for example revealing the answer before the user concludes |

### 3. Check where the outcome lives, not what the model claimed

Inspect the actual deliverable before accepting a Yes. If a criterion asks for an unsent email draft, open the Drafts folder. If it asks for a Google Doc or a spreadsheet, open the Drive file through the live link. If it asks for a connector action, read the connected workspace. A described-but-nonexistent draft is No. The inverse guard matters too: an outcome the transcript alone cannot show, a connector screen, an uploaded artifact, a file that only the live link renders, is not thereby unsupported. Open the live link or the trajectory JSON before failing it. Point at a record or drop the finding.

### 4. Decide N/R or No

| The situation | Grade |
|---------------|-------|
| The criterion tests a conditional follow-up branch that legitimately never arose in the conversation | N/R |
| The user asked for it and the model ignored, contradicted, or failed to deliver it by the end | No |
| The user asked for it and the final state delivers it | Yes |

A legitimate N/R: a criterion reading "Diagnoses and patches the user's local terminal error traceback if the user shares a local test log in a follow-up turn" is N/R when the user never shared a log. The same criterion is No, not N/R, if the user did share a log and the model botched the diagnosis.

### 5. Handle a defective criterion with a flag

If the criterion itself is broken, add a flag note at the end of its line. Flagging never changes the Yes / No score. A broken criterion that was not met is still No, with the flag. Flag only defective criteria, never to excuse a miss.

| Flag string (verbatim) | Use when the criterion | Example line |
|------------------------|------------------------|--------------|
| `[FLAG: Impossible to satisfy]` | cannot be satisfied by any reasonable model output | `#1: No [FLAG: Impossible to satisfy]` |
| `[FLAG: Contradicts prompt]` | can be satisfied only by violating an explicit instruction in the prompt | `#2: No [FLAG: Contradicts prompt]` |
| `[FLAG: Unprompted requirement]` | requires a detail neither the opening prompt nor the next-steps roadmap ever asked for | `#3: No [FLAG: Unprompted requirement]` |

A worked case for `[FLAG: Contradicts prompt]`: the prompt says "Ne me donne pas la reponse" (do not give me the answer), but a rubric criterion rewards stating the final numeric answer. A model that correctly withheld the answer fails that criterion, so the grade is No, and the flag records that the criterion itself is at fault. The No stays; the flag routes a guardrail note to `RankingAudit.md`.

### 6. Triage: which is wrong, the grade, the justification, or the criterion?

Before logging a disagreement, decide what is actually wrong, because the trigger and the route differ.

| What you observe | What is wrong | Trigger / route |
|------------------|---------------|-----------------|
| Grade is Yes but the deliverable exists only as a claim in chat; the live link, Drive, or Drafts folder has nothing | The grade | 8.1 Fail, re-grade to No |
| Grade is No but the final state plainly meets the criterion (a mid-chat error the final turn fixed) | The grade | 8.1 Fail, re-grade to Yes |
| Grade is N/R but the user asked for it and the model failed or ignored it | The grade | 8.1 Fail, re-grade to No |
| A criterion is left ungraded | The submission | 8.1 Fail (L12), grade it |
| Grade agrees with the final state, but the justification cites no turn, the wrong turn, or does not say what the model did | The justification | 8.2 Non-Fail |
| Grade differs from the auditor's on a genuinely debatable criterion (the final state is honestly ambiguous) | Neither; it is debatable | 8.2 Non-Fail |
| The grade is right (No) and the criterion itself is defective | The criterion, not the grade | Grade stays, add `[FLAG: ...]`; route the guardrail note to `RankingAudit.md` |
| The grade is right and the model genuinely met or missed the criterion | Nobody; the task is working | No finding |

### 7. Tally per model, worst decides

Grade each of A, B, and C against the final state of its own conversation. A criterion Model A passed can be a genuine No on Model B or Model C, and the reverse; do not let one model's run frame how you read another's. The worst of the three models sets the task band: one model's 8.1 is a Fail for the whole task even when the other two are clean. Grade to the worst model, and name the model that drove the finding, because the author fixes a specific conversation, not an abstraction.

## The Grades to Hunt First

Each shape catches a large share of findings with one mechanical test. Run them in this order.

| Grade shape | The test that catches it | Trigger |
|-------------|--------------------------|---------|
| Yes on a claimed deliverable | Open the live link, Drive, or Drafts; is the artifact actually there and usable? | 8.1 |
| No on a recovered outcome | Did the final turn fix the mid-chat error, with no conversation-wide prohibition in play? Then it is Yes | 8.1 |
| N/R on an asked-for criterion | Did the user ask and the model fail? Then it is No | 8.1 |
| Ungraded criterion | Every criterion in `METADATA.rubric` needs a Yes / No / N/R | 8.1 (L12) |
| Justification with no turn | Column 7 must name the deciding turn(s) | 8.2 (L12) |
| Justification that does not say what the model did | "The model got it wrong" is a verdict, not evidence | 8.2 |
| A grade difference on an honestly ambiguous criterion | Could a careful reader land either way on the final state? | 8.2 |

## Drills

### Drill 1: The Final-State Re-Grade Pass

Re-grade every criterion yourself, from the final state, before you read what the contributor wrote, so their call does not anchor yours. Walk the set for each model with four habits, the ones whose absence produces the failure mode this dimension exists to catch.

- Read the criterion, then read to the end of the conversation, then grade. The failure mode is grading the middle of the chat, where the model stumbled, instead of the end, where it may have recovered. A draft wrong in Turn 2 and right in the final turn is Yes.
- Hold the one exception in view. If the criterion is a conversation-wide prohibition, the recovery does not save it. Example 2's math-tutoring criterion "Refrains from revealing the final convergence verdict before the user states their own conclusion" is No the moment the model reveals it in Turn 1, whatever it does afterward.
- Ground every grade in a turn. If you cannot name the turn that decides a grade, you have not finished grading it, and neither has the contributor; that is the 8.2 signal.
- Grade the three models independently. Do not carry Model A's Yes onto Model B's identical-looking criterion without opening Model B's final state.

The decided cases are concrete. A criterion "Delivers a schedule spreadsheet covering all three periods with accurate day counts" is Yes only if that spreadsheet exists in the final state and the counts are right; a spreadsheet that stops at two periods is No on Model B even if Model A's is complete. A criterion "Evaluates the two follow-up series accurately" is graded on the final answer the model landed, not on a wrong intermediate it corrected.

### Drill 2: Claimed vs Landed

This drill is the single most productive one on this dimension, because the costliest wrong grade is a Yes that rests on nothing. For every Yes the contributor recorded, find the deliverable, do not take the model's word that it exists.

- If the criterion names a Drive file, a Doc, or a Sheet, open it through the live link. A model that pasted a table into chat but never created the file has not satisfied a "creates the document in Drive" criterion; that is `[Explanation instead of creation]` in the issues and No in the rubric.
- If the criterion names an unsent draft, open the Drafts folder. A model that narrates "I have saved the draft to your Gmail" with an empty Drafts folder is `[Action dishonesty]` in the issues and No in the rubric.
- If the criterion names a connector action (a calendar hold, a form, a cart), confirm the action landed in the connected workspace, not just that the model said it did.
- For an Argon Task run with no shareable link, the trajectory JSON is the record. Read the deliverable state out of it the same way.

The inverse guard keeps this drill honest: when the deliverable genuinely lives somewhere the transcript text cannot show it, open the live link or the trajectory JSON before failing a Yes. A Yes you cannot disprove by looking is a Yes that stands. Point at a record or drop the finding.

## A Worked Example

A task whose `METADATA.rubric` holds three criteria, run across the three assigned models. The rubric:

- #1 Inspects project.godot and the codebase to identify that keyboard events are missing from the six ui input actions and that neither the Journal reader UI nor the lamp-room scene is wired into the shipped build.
- #2 Generates a deduplicated bug-triage spreadsheet in Google Drive grounded in the provided Steam and Discord feedback logs.
- #3 Creates the standalone Monday triage punch-list document in Drive, saves an unsent team update draft in Gmail, and books the prep hold on Google Calendar.

Re-grading each model from its own final state produces this tally.

- **Model A (ChatGPT, Light).** Final state delivers all three: the codebase inspection in Turn 6, the dedup spreadsheet in Drive at Turn 12, the punch-list doc, the unsent Gmail draft, and the calendar hold by Turn 18. Contributor graded `#1: Yes / #2: Yes / #3: Yes` with turns cited and an account of each. Auditor agrees. Clean.
- **Model B (Fable, Medium).** Contributor graded `#3: Yes`, justification "the model saved the punch-list doc and the Gmail draft and booked the hold." Opening the live links, the Drive punch-list doc does not exist and the Gmail Drafts folder is empty; the model pasted the punch-list as prose in chat and only described the draft and the hold. The final state does not meet #3. Auditor re-grades Model B `#3: No`. This is trigger 8.1, a Yes for a deliverable the model only claimed. Name Model B.
- **Model C (Gemini 4 Prod, Argon Task).** No shareable link, so the grades are checked against the uploaded trajectory JSON. Contributor graded `#1: No / #2: Yes / #3: No`, and every grade matches the final state. But the #1 justification reads only "the model got it wrong," with no turn number and no account of what it did. That is trigger 8.2, a justification that cites no turn and does not say what the model did. Name Model C.

The band: grade to the worst model. Model B's 8.1 `[Fail - Rubric Grading Disagreement]` is the task band, Score 2, a Reject. Model C's 8.2 `[Non-Fail - Rubric Evidence]` is recorded too, because the author needs the full list and because it is a Reject in its own right. Model A is clean. The corrected Model B `#3: No` drops Model B from 3/3 to 2/3 rubric Yes, which is routed to `RankingAudit.md` because it can move the ranking.

## Notes: Dimension 8 and Its Neighbors

- **Dimension 8 and Dimension 7.** Dimension 7 judges the satisfaction number; Dimension 8 judges the rubric grades. They are separate counts and are counted together when both are wrong: a conversation where the contributor both over-scored satisfaction and recorded a Yes the final state contradicts is a Dimension 7 finding and a Dimension 8 finding, not one finding shared. `Guide` section 9 adds the one bridge between them, which belongs to Dimension 7 and is only noted here: an unflagged No rules out an Overall satisfaction of 5. If this audit corrects a grade to an unflagged No, flag that the satisfaction can no longer be a 5 and hand the re-score to `RatingAudit.md`; do not re-score satisfaction in this file.
- **Dimension 8 and Dimension 6.** The format of the Detail of issues field, `#N: [L3 Loss Tag] - explanation` with matching Turns lines, is Dimension 6 in `RatingAudit.md`. This file never grades formatting, only whether the rubric grades and their turn justifications are right.
- **Dimension 8 and Dimension 5.** The contributor's issue list is Dimension 5. The matching of a contributor issue to the auditor's independent top-3, by the underlying problem (same L2, a Detail line describing the same problem), lives in `IssueMatching_Guide.md` and is performed in `RatingAudit.md`. This file does not re-run it; the `QCSpec` Rubric-row auditor note that describes that matching is a cross-row artifact (see "What this file does not grade").

## The Rubric-to-Downstream Handoff

Every grade this file corrects, and every criterion it flags, changes what `RankingAudit.md` is allowed to compute. Route it before the ranking is read. Recompute, do not estimate.

| Signal in the rubric grades | Route | What happens downstream |
|-----------------------------|-------|-------------------------|
| A grade corrected from Yes to No (a claim the deliverable never backed) | `RankingAudit.md` Dimensions 9, 10 | The model's rubric Yes count drops; the Outcome tie-breaker (Core Rubric Criteria) and the rubric guardrail are re-read, and the model may move a spot |
| A grade corrected from No to Yes (the final state met it) | `RankingAudit.md` Dimensions 9, 10 | The model's Yes count rises; the same Outcome tie-breaker is re-read |
| An ungraded criterion now graded | `RankingAudit.md` Dimensions 9, 10 | The Outcome count is only complete once every criterion carries a grade; re-read the ranking against the completed count |
| A criterion flagged `[FLAG: ...]`, grade unchanged | stays in this file | The Yes / No grade does not change; `RankingAudit.md` may apply the rubric guardrail exception for a flagged broken criterion, so pass the flag note forward |
| A grade corrected to an unflagged No | `RatingAudit.md` Dimension 7 | An unflagged No rules out an Overall satisfaction of 5; the satisfaction re-score is owned by Dimension 7, not re-scored here |

## Procedure: Count Before You Conclude

1. Establish the criteria set from `METADATA.rubric`: list every criterion with its number, and confirm all are graded for all three models (an ungraded criterion is 8.1, carried as L12).
2. For each model in turn, open the conversation (link or Argon trajectory JSON), read to the final state, and inspect the actual deliverable where each criterion says it lives.
3. Re-grade every criterion yourself, Yes / No / N/R, with the deciding turn written down, before reading the contributor's grades.
4. Compare your grade to the contributor's for each criterion, and triage each disagreement: the grade (8.1), the justification (8.2), the debatable difference (8.2), or a defective criterion (flag, grade unchanged).
5. Apply the flag rules to any defective criterion; the flag never changes the Yes / No score.
6. Tally per model and take the worst: any 8.1 on any model is a Fail (Score 2) for the task; otherwise any 8.2 on any model is a Non-Fail (Score 3); otherwise `[No Issues]` (Score 5).
7. Route every corrected grade and every flag to `RankingAudit.md`, and any unflagged-No correction to `RatingAudit.md` Dimension 7. Record the true band; never round up. A Non-Fail is still a Reject.

## Audit Summary Template

```
Rubric Audit - Task [id]                               Verdict: [Excellence / Reject]

Criteria set (METADATA.rubric): [n] criteria -> #1 [...] #2 [...] #3 [...]
Final-state read: links opened [A / B / C], Argon trajectory JSON used for [which model / none]

Per model (worst decides)                         grades                 auditor re-grade        agree?                        justifications
  Model A [model_a_name]                          [#1 x /#2 x /#3 x]      [#1 x /#2 x /#3 x]       [yes / criterion # off]       [turn-cited / which missing]
  Model B [model_b_name]                          [#1 x /#2 x /#3 x]      [#1 x /#2 x /#3 x]       [yes / criterion # off]       [turn-cited / which missing]
  Model C [model_c_name]                          [#1 x /#2 x /#3 x]      [#1 x /#2 x /#3 x]       [yes / criterion # off]       [turn-cited / which missing]

Disagreements
  Contradicted grade(s) -> 8.1: [model, criterion #, contributor grade vs auditor grade, the deciding final-state evidence], ...
  Evidence-only gap(s)  -> 8.2: [model, criterion #, missing/wrong turn, no account of what the model did, or debatable grade], ...

Flagged criteria: [criterion # - [FLAG: Impossible to satisfy / Contradicts prompt / Unprompted requirement] - why defective; grade unchanged], ... / none
Worst model: [A / B / C] drives the band

Dimension 8  Criteria Grading Agreement           [Excellence / Reject]
  [No Issues] (5) / [Non-Fail - Rubric Evidence] (3) / [Fail - Rubric Grading Disagreement] (2)

Open linter IDs carried in: [L12, ... / none]
Downstream routes: [RankingAudit 9/10 | RatingAudit 7 | none]
```
