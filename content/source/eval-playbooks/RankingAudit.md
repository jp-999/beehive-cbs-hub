# Ranking Audit

> Reference: `README.md` for the dimension map, the three models, the per-model rating template, and the source readings; `EvalChecklist.md` for the trigger index and the verbatim bracketed categories; `LinterSweep.md` for the mechanical pre-pass carried here as L13, L14, L15, and L16; `RatingAudit.md` for the Overall satisfaction scores this file ranks off and does not re-score; `RubricAudit.md` for the rubric Yes/No grades the tie-breakers read and this file does not re-grade. Source: `QCSpec` SxSxS Rating and SxSxS Justification rows, `Guide` section 11, `EvalChecklist.md` Dimensions 9, 10, and 11.

The artifact this file audits is the single ranking block the contributor fills after all three models are rated: `rank_1_best`, `rank_2_middle`, `rank_3_worst`, `tie_breaker_used`, and `ranking_justification`, stored in `TASKATTEMPTS.RESPONSE:turns`. There is one ranking per task. Unlike the per-model dimensions, where three conversations are graded and the worst model decides the band, the ranking is graded once: once against the auditor's own ranking (Dimension 9), once against the contributor's own satisfaction scores (Dimension 10), and once for whether its justification states a verdict (Dimension 11). This file owns only those three dimensions.

This file runs last, after `RatingAudit.md` and `RubricAudit.md`, and the order is load-bearing. The ranking is a readout, not a fresh judgment: the Guide instructs the contributor to rank from what was already recorded, the Overall satisfaction scores and the logged issues, and to not re-rate any model in the ranking step. So this audit takes the satisfaction scores settled in `RatingAudit.md` Dimension 7 and the rubric grades settled in `RubricAudit.md` Dimension 8 as its inputs. Do not re-score a conversation here. If a satisfaction score is still contested under Dimension 7, settle it there first, because a ranking built on an unsettled score is itself unsettled.

The three dimensions read three different pairs of inputs, and the costly mistake is auditing one against the wrong pair. Dimension 9 compares the auditor's ranking (built from the auditor's own satisfaction scores) against the contributor's ranking. Dimension 10 compares the contributor's own satisfaction scores against the contributor's own ranking. Dimension 11 reads the justification text alone. The pairs are independent: a ranking can agree with the auditor (Dimension 9 clean) yet contradict the contributor's own scores with no explanation (Dimension 10 Fail), and it can state a crisp verdict (Dimension 11 clean) that is still inconsistent with the scores (Dimension 10 Fail). Carry L15 and L16 open from the sweep. L13 (a ranking field missing) and L14 (the three ranks are not a permutation of A, B, C) are the presence and permutation gates the sweep closes first; if either is open the ranking is not yet gradeable and that blocks before any dimension is read. Count before you conclude. Point at a record or drop the finding.

| **RE-RANK-FIRST RULE**<br>Before you read the contributor's `rank_1_best`, `rank_2_middle`, and `rank_3_worst`, take the three per-model Overall satisfaction scores you settled in `RatingAudit.md` Dimension 7, your own scores for Model A, Model B, and Model C, and build your own ranking from them: highest satisfaction first, ties broken with the tie-breaker chain below. Write your own ranking down first. Only then read the contributor's ranking and compare. A ranking audited by reading the contributor's answer first is anchored to that answer and cannot catch a two-spot disagreement honestly. Form your three independent satisfaction scores into one ranking, then grade theirs against it. The auditor ranking you build here is the baseline for Dimension 9 only; Dimension 10 reads the contributor's numbers, not yours. |
| --- |

## How the Three Dimensions Differ

Read each dimension against the pair of inputs it owns. The same ranking block is graded three times, once per row.

| Dimension | Compares | Question it answers | Band cap |
|-----------|----------|---------------------|----------|
| 9 Ranking Disagreement | The auditor's ranking (from the auditor's own satisfaction scores) vs the contributor's ranking | Do the auditor and the contributor agree on the order? | Fail at a 2-spot move |
| 10 Inconsistent Ranking | The contributor's own satisfaction scores vs the contributor's own ranking | Does the contributor's ranking follow the contributor's own numbers? | Fail if an inversion is unexplained |
| 11 Verdict | The `ranking_justification` text against the requirement to choose | Does the justification state a preference or a tie, supported by the issues? | Non-fail only, no Fail band |

Two independence facts matter. Dimension 9 uses the auditor's scores, never the contributor's, to build the auditor baseline. Dimension 10 uses the contributor's scores, never the auditor's, to check internal consistency. So a ranking the auditor agrees with (Dimension 9 clean) still fails Dimension 10 if it contradicts the contributor's own scores without explanation, exactly as `README.md` states under Scope.

## Ranking Method and Tie-Breakers

The contributor ranks by the rule in `Guide` section 11, and the auditor rebuilds the ranking by the same rule. Reproduced here so both rankings are formed the same way.

Rank first by Overall Satisfaction. A model with a lower Overall satisfaction score must never be ranked ahead of a model with a higher score. When two or more models tie on Overall satisfaction, break the tie in this order, and stop at the first rule that separates them:

| Step | Tie-breaker | Wins the tie when |
|------|-------------|-------------------|
| 1 | Outcome (Core Rubric Criteria) | fewer unflagged rubric No answers; used only when the rubric results differ |
| 2 | Trust (Factuality, Grounding and Safety) | fewer or less severe factual, grounding, or safety errors |
| 3 | Effort and Trajectory | fewer corrections, pushbacks, and wasted turns |
| 4 | Communication, Country Fit and Polish | clearer, better tone, better country fit, more polish |

In `tie_breaker_used`, the contributor selects the last rule they needed. If no models were tied on satisfaction, the selection is No tie. If models are still tied after Communication, Country Fit and Polish, the contributor ranks the one they would rather keep using higher, selects Communication, Country Fit and Polish, and explains it in the justification.

Rubric guardrail. Never rank a model with fewer rubric Yes answers (for example 2/3) above one with more (3/3) unless (a) a severe Trust or Factuality error outside the rubric, (b) heavy multi-turn pushback vs a minor polish miss, or (c) the missed criterion is flagged as broken. When one of these holds, the contributor selects the exception in the Rubric guardrail field and explains it in the justification; otherwise the selection is No inversion. The guardrail is a check on the rubric Yes counts, separate from the strict satisfaction rule above: a lower-satisfaction model ranked ahead of a higher-satisfaction one is an inconsistency the guardrail does not license, and is graded under Dimension 10.

## Dimension 9: Ranking Disagreement

Source: `QCSpec` SxSxS Rating / Ranking Disagreement. `EvalChecklist.md` Dimension 9. `Guide` section 11. `LinterSweep.md` L13, L14. Graded once on the single ranking block.

### Excellence Standard

The auditor and the contributor agree on the preference ranking of the three models, based on Overall satisfaction.

### Reject Triggers

9.1 The auditor disagrees with the contributor's preference ranking, with at least one model moving 2 spots (that is, from best to worst or worst to best).
Fix: Re-rank from the auditor's own satisfaction scores; a model is 2 spots off. `[Fail - Major Ranking Disagreement]`. Score 2.

9.2 The auditor slightly disagrees with the contributor's preference ranking, but all disagreements are only a difference of one spot (best to middle, or middle to worst).
Fix: Reconcile the one-spot disagreement. `[Non-Fail - Loose Ranking Disagreement]`. Score 3.

Score 5 is `[No Issues]`: the two rankings are identical. A Score 3 is still a Reject here.

### How to Audit

1. Build the auditor ranking first, from the Re-Rank-First rule: order Model A, Model B, and Model C by the auditor's own satisfaction scores (from `RatingAudit.md` Dimension 7), highest first, breaking any satisfaction tie with the tie-breaker chain.
2. Read the contributor ranking from `rank_1_best`, `rank_2_middle`, and `rank_3_worst`. Confirm L14 is clean first: the three ranks must name each of A, B, and C exactly once, or the ranking is not gradeable.
3. Give each slot a position: best is 1, middle is 2, worst is 3. Write each model's position in both rankings.
4. For each model, subtract its contributor position from its auditor position and take the absolute value. That is the number of spots it moved.
5. Read the largest shift. Zero on all three is Excellence. A largest shift of one spot (every moved model moved exactly one) is 9.2. Any model shifted two spots is 9.1.
6. Name the model and the spots moved on the finding. Before logging it, run the downstream check: if the disagreement is driven by a satisfaction score the auditor already re-scored under Dimension 7, the root cause is that score, not the ranking.

### Drill: Spots Moved

Count before you conclude. The combinatorial fact pins the band: with three models, only an adjacent swap (best with middle, or middle with worst) keeps every shift at one spot. The end swap (best with worst) and every rotation move at least one model two spots, so they are a Fail. There is no three-way disagreement that is a one-spot-only Non-fail except a single adjacent swap.

Worked example, a Non-fail. The auditor scores A=5, B=3, C=4 and ranks A, C, B. The contributor ranks A, B, C.

| Model | Contributor position | Auditor position | Spots moved |
|-------|----------------------|------------------|-------------|
| A | 1 (best) | 1 (best) | 0 |
| B | 2 (middle) | 3 (worst) | 1 |
| C | 3 (worst) | 2 (middle) | 1 |

Largest shift is 1, an adjacent middle-worst swap of B and C. Band `[Non-Fail - Loose Ranking Disagreement]`, Score 3. Finding: "B and C each move one spot; the auditor ranks C over B on Effort and Trajectory, the contributor ranks B over C."

Worked example, a Fail. The contributor ranks A, B, C; the auditor ranks C, B, A. A moves from best to worst, two spots; C moves two spots; B holds. Largest shift is 2. Band `[Fail - Major Ranking Disagreement]`, Score 2. Finding: "A moves 2 spots from best to worst against the auditor ranking."

### Notes

The comparison is auditor ranking vs contributor ranking, both ordered by satisfaction. It is not the contributor's scores vs the contributor's ranking; that is Dimension 10. When the auditor and the contributor simply scored a model differently, the ranking disagreement is a symptom of a Dimension 7 satisfaction disagreement, and the fix belongs upstream. Still record the ranking band, because the ranking is the shipped artifact.

## Dimension 10: Inconsistent Ranking

Source: `QCSpec` SxSxS Rating / Inconsistent Ranking. `EvalChecklist.md` Dimension 10. `Guide` section 11. `LinterSweep.md` L15. Graded once on the single ranking block.

### Excellence Standard

The contributor's preference ranking is consistent with the contributor's own individual Overall satisfaction scores.

### Reject Triggers

10.1 The contributor's individual overall scores do not support the preference ranking (the highest-rated model was not ranked most preferred) and this contradiction is not adequately supported in the justification.
Fix: Rank in the order the satisfaction scores support, or explain the contradiction in the justification. `[Fail - Inconsistent Ranking]`. Score 2.

10.2 The contributor's individual overall scores support a ranking different from the contributor's, but this contradiction is adequately supported in the justification.
Fix: Strengthen or confirm the justification for the inversion. `[Non-Fail - Inconsistent Ranking]`. Score 3.

Score 5 is `[No Issues]`: the ranking follows the contributor's own scores, with no inversion. A Score 3 is still a Reject here.

### How to Audit

1. Read the contributor's three satisfaction scores, `overall_satisfaction_a`, `overall_satisfaction_b`, and `overall_satisfaction_c`. Do not re-score; this dimension reads the contributor's numbers, whether or not the auditor agrees with them.
2. Sort the models by the contributor's score, highest first. That is the score-implied ranking. Equal scores tie and may sit in either order.
3. Lay the contributor's stated ranking beside the score-implied ranking. An inversion is any pair where a lower-score model sits above a higher-score model.
4. No inversion means Excellence; the ranking is consistent with the scores.
5. On an inversion, read `tie_breaker_used`, the Rubric guardrail selection, and `ranking_justification`. If the justification adequately explains the inversion, name the model pair and the explanation and log 10.2. If it is silent, or only gestures ("A felt more helpful") without addressing the score gap, log 10.1.
6. Name the two models and their scores on the finding. A score tie is not an inversion; record it as consistent.

### Drill: Scores to Ranking

Map the scores to the expected order, then check the justification only where they diverge.

Worked example. The contributor's scores are A=4, B=5, C=3. Score-implied ranking: B (5), A (4), C (3). The contributor's stated ranking is A, B, C. Model A at satisfaction 4 sits above Model B at satisfaction 5: an inversion.

- If `ranking_justification` reads "A is ranked first despite B's higher satisfaction because B invented a citation in T3, a Trust and Factuality error outside the rubric," that is guardrail exception (a), documented and tied to a turn. Band `[Non-Fail - Inconsistent Ranking]`, Score 3.
- If `ranking_justification` only says "A was the most helpful overall," with nothing on why the lower-scored model leads the higher-scored one, the contradiction is unexplained. Band `[Fail - Inconsistent Ranking]`, Score 2.

Counter-example, consistent. Scores A=4, B=4, C=3, ranked A, B, C. A and B tie on satisfaction, so A over B is a tie-breaker call, not an inversion; C is correctly last. No Dimension 10 finding. Whether the auditor agrees with putting A over B is Dimension 9.

### Notes

Dimension 10 is internal consistency and nothing else. It can fail even when Dimension 9 passes: if the auditor's own scores happen to produce the same order the contributor stated, the auditor agrees on the ranking (Dimension 9 clean), yet the contributor's own scores do not support that order and nothing explains the gap, so Dimension 10 still fails. The two dimensions read different numbers. Note also that the strict satisfaction rule is not softened by the rubric guardrail: a lower-satisfaction model ranked ahead of a higher-satisfaction one is an inversion under this dimension, whatever the rubric Yes counts, and only an adequate justification moves it from 10.1 to 10.2.

## Dimension 11: Verdict

Source: `QCSpec` SxSxS Justification / Verdict. `EvalChecklist.md` Dimension 11. `Guide` section 11. `LinterSweep.md` L16. Graded once on the single ranking block. No Fail band.

### Excellence Standard

The Ranking Justification mentions a preference or states which response is best, noting a tie if applicable, and supports the call with the issues identified for each model.

### Reject Triggers

11.1 The justification does not mention a preference, state which response was the best, or note a tie if applicable; it only states pros and cons.
Fix: State the preference or the tie, supported by the issues identified for each model. `[Non-Fail - Lacks Verdict]`. Score 3.

Score 5 is `[No Issues]`: the justification names a winner or a tie and supports it. There is no Fail band; the worst outcome is a Score 3, and a Score 3 is still a Reject here.

### How to Audit

1. Read `ranking_justification` in full.
2. Confirm it names a winner or a tie, not only a list of each model's strengths and weaknesses. The L16 preference and tie words are the tell: prefer, best, better, stronger, over, tie, tied, equal, rank.
3. Confirm the verdict is supported by the per-model issues, the L2 sub-dimensions and their [L3 Loss Tags] from the ratings, and that it explains both boundaries, why rank 1 beat rank 2 and why rank 2 beat rank 3, not just a catalog of pros and cons.
4. A verdict word with no issues behind it is thin, and a justification rich in pros and cons but with no chosen winner is 11.1. Point at the sentence that chooses, or log the finding.

### Drill: Verdict or Pros and Cons

A justification that chooses and grounds the choice, verbatim style from `Guide` section 11:

- Verdict stated, supported: "Model A is best, Model C is middle, and Model B is worst. A and C both satisfied all three rubric criteria, but A got the figures right on the first pass (T1), while C only added C-107 after pushback in T2. B is last because it kept a wrong risk flag after correction across Turns 2 and 3 and failed Criterion 3." This names the order, the decisive issues, and the turns. Score 5.
- Pros and cons only, no verdict: "Model A produced a clean draft but over-explained. Model B was concise but missed the deadline. Model C asked a useful question but used US date formats." This lists each model's good and bad points and never says which is best or that they tie. Band `[Non-Fail - Lacks Verdict]`, Score 3.

### Notes

Do not confuse Dimension 11 with the other two. Dimension 11 asks only whether a verdict is stated and supported. Whether that verdict matches the contributor's scores is Dimension 10; whether it matches the auditor's ranking is Dimension 9. A justification can state a crisp, well-supported verdict (clean on 11) that is inconsistent with the contributor's own scores (Fail on 10). A missing `ranking_justification` field is L13, a submission requirement, not a Dimension 11 texture finding; a present-but-verdict-less justification is 11.1.

## The Ranking-to-Downstream Handoff

Every ranking finding either corrects the ranking or exposes an upstream score or grade that a prior audit owns. Route it before the report is written. Point at a record or drop the finding.

| Signal in the ranking | Route | What happens downstream |
|-----------------------|-------|-------------------------|
| A Dimension 9 disagreement driven by a satisfaction score the auditor already re-scored | `RatingAudit.md` Dimension 7 | The real disagreement is the satisfaction number; reconcile it there, and the ranking may then agree |
| A Dimension 9 disagreement that turns on a tie-breaker rubric count | `RubricAudit.md` Dimension 8 | The tie-break at step 1 reads the rubric Yes/No counts; confirm those grades before the ranking is final |
| A Dimension 10 inversion that is correct on the merits | Re-rank, or add justification | Reorder the ranks to match the scores, or document the guardrail exception in the justification so the inversion is supported |
| A Dimension 10 inversion the scores do not support and nothing justifies | Re-rank | Put the higher-satisfaction model ahead; note that a 2-spot inversion is also a Dimension 9 Fail against the auditor |
| A Dimension 11 justification that only lists pros and cons | Add the verdict | State which model is best, or that they tie, supported by the per-model issues (L2 / [L3 Loss Tag]) |

A Dimension 10 inconsistency has two valid fixes, and the contributor chooses one: re-rank to follow the satisfaction scores, or keep the ranking and add the justification that supports the inversion. The auditor's job is to say which the record needs, not to assume the first.

## Verdict

Excellence when the contributor's ranking matches the auditor's ranking built from the auditor's own satisfaction scores (Dimension 9), the ranking is consistent with the contributor's own satisfaction scores or any inversion is adequately justified (Dimension 10), and the justification states a preference or a tie supported by the per-model issues (Dimension 11). Any single finding is a Reject. On Dimension 9, a one-spot disagreement is `[Non-Fail - Loose Ranking Disagreement]` and a two-spot move is `[Fail - Major Ranking Disagreement]`. On Dimension 10, a justified inversion is `[Non-Fail - Inconsistent Ranking]` and an unexplained one is `[Fail - Inconsistent Ranking]`. On Dimension 11, a verdict-less justification is `[Non-Fail - Lacks Verdict]`, the only band below No Issues. Non-fail is still a Reject. Name the models and the spots moved on every finding.

## Audit Summary Template

```
Ranking Audit - Task [id]                         Verdict: [Excellence / Reject]

Re-rank-first: own ranking formed from own satisfaction scores before reading contributor's: [yes/no]
Graded once on the single ranking block (not per-model-worst).

Satisfaction scores (auditor's own, from RatingAudit.md Dimension 7)
  A [n]   B [n]   C [n]       Auditor ranking (score order): #1 [x] #2 [x] #3 [x]
Satisfaction scores (contributor's own, read for Dimension 10)
  A [n]   B [n]   C [n]       Score-implied ranking:         #1 [x] #2 [x] #3 [x]
Contributor ranking: #1 [rank_1_best] #2 [rank_2_middle] #3 [rank_3_worst]
Tie-breaker used (contributor): [No tie / Outcome / Trust / Effort and Trajectory / Communication, Country Fit and Polish]
Rubric guardrail (contributor): [No inversion / exception (a) / (b) / (c)]

Dim 9  Ranking Disagreement   (auditor ranking vs contributor ranking)
  Spots moved   A [n]   B [n]   C [n]    max [n]    (2 = Fail, 1 = Non-fail, 0 = clean)
  Band          [No Issues / Non-Fail - Loose Ranking Disagreement / Fail - Major Ranking Disagreement]

Dim 10 Inconsistent Ranking   (contributor scores vs contributor ranking)
  Matches score-implied ranking? [yes/no]
  Inversion?    [none / model [x] ([n]) ranked above model [y] ([n])]
  Justified?    [n-a / yes / no]
  Band          [No Issues / Non-Fail - Inconsistent Ranking / Fail - Inconsistent Ranking]

Dim 11 Verdict                (ranking_justification text)
  States a preference or a tie? [yes/no]    verdict word: [prefer/best/better/.../tie]
  Supported by per-model issues (L2 / [L3 Loss Tag])? [yes/no]
  Band          [No Issues / Non-Fail - Lacks Verdict]

Flagged: [model(s) and spots moved / the inversion and scores / the missing verdict - the deciding score or passage], ...
Open linter IDs carried in: [L15, L16, ... / none]
Downstream routes: [RatingAudit 7 | RubricAudit 8 | re-rank | add justification | none]
```
