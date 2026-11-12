# Issue Matching: re-deriving the top three issues, and matching the contributor's

Issue Matching is the companion to Dimension 5 (Issues Identified and Ranked, owned by `RatingAudit.md`) and Dimension 8 (Criteria Grading Agreement, owned by `RubricAudit.md`): for every conversation the auditor re-derives an ordered top-3 issue list from an independent read, then matches it against the contributor's issues and rubric grades using one taxonomy and one matching logic.

The two dimensions read the same conversation through the same lens and differ only in what they score.

- Dimension 5 scores the contributor's issue list: the 1 to 3 L2 sub-dimensions in Column 3 (`issue_1_x`, `issue_2_x`, `issue_3_x`), the one `[L3 Loss Tag]` per issue in the Column 4 Detail lines (`detail_of_issues_x`), the order, and whether the list is consistent with Overall satisfaction (`overall_satisfaction_x`).
- Dimension 8 scores the contributor's predefined-rubric grades (Yes / No / N/R, Column 6) and their turn justifications (Column 7), by comparing the contributor's Issues #1 to #3 against the auditor's top-3 for that conversation. Same L2, same `[L3 Loss Tag]`, same "underlying problem" test.

Form your own answer first. Open the conversation link (or the trajectory JSON for an Argon Task), read every turn, and write your own ordered top-3 and your own rubric grades before you read the contributor's. A list audited by reading the contributor's answer first is anchored to that answer.

Both dimensions are scored per conversation, and the worst of Models A, B, and C decides the band (`README.md`, Worst-Model-Decides). Name the model on every finding. This folder rejects anything below a 5, so a 3-4 non-fail is still a Reject; record the true band anyway, because the band carries the feedback severity and the real SLA outcome.

| Dimension | Score 5 | Score 3-4 | Score 1-2 |
|-----------|---------|-----------|-----------|
| 5 Issues Identified and Ranked | `[No Issues]`: same issues, right L2, same order (or both "No issues") | `[Non-Fail - Issue Order or Category]`, trigger 5.2 | `[Fail - Issue Not Presented]`, trigger 5.1 |
| 8 Criteria Grading Agreement | `[No Issues]`: agree with every grade, every justification cites the deciding turn(s) | `[Non-Fail - Rubric Evidence]`, trigger 8.2 | `[Fail - Rubric Grading Disagreement]`, trigger 8.1 |

## Three guards against a false reject

1. Re-derive, do not re-chat. Build your own top-3 and your own rubric grades from the conversation and the live deliverables, not from re-running the scenario and not from the contributor's cells. Reading theirs first anchors you to it.
2. Wording and defensible tag choices are not defects. Issues match by the underlying problem, not by phrasing. A different `[L3 Loss Tag]` inside the right L2 is a finding only when the contributor's tag is clearly wrong, and a genuinely debatable rubric grade is a non-fail, never a fail.
3. The transcript is not the whole record. Latency, connector cards, and attachment uploads often do not render in the chat text or the exported JSON. Check the live link before you fail an issue as "unsupported". Point at a record or drop the finding.

## The re-derivation test

Write your own list first, then lay it beside the contributor's, row by row.

| Slot | Auditor's independent read | Contributor's cells |
|------|----------------------------|---------------------|
| Issue #1 (biggest) | the L2 and the `[L3 Loss Tag]` you derive, with its turn | `issue_1_x` + its Column 4 tag |
| Issue #2 | the next L2 and tag, or none | `issue_2_x` + its Column 4 tag |
| Issue #3 | the next L2 and tag, or none | `issue_3_x` + its Column 4 tag |
| Order | ranked by cost to the user | the order as listed |
| Satisfaction fit | issues present when the score is 4 or lower; "No issues" only at 5 | `overall_satisfaction_x` |
| Rubric (Dim 8) | your Yes / No / N/R from the final state | Column 6 grade + Column 7 turns |

For every slot that differs, name the turn, the Detail line, the rubric criterion, or the live deliverable that settles it. If you cannot point at one, drop the finding. Point at a record or drop the finding.

These do **not** fail:

- The same problem described in different words under the same L2. The wording never has to match.
- A defensible neighbor `[L3 Loss Tag]` inside the right L2. Only a clearly wrong tag is a finding.
- Either order when two issues have similar impact.
- A smaller 4th issue left off when the top three are right.
- An issue the chat text cannot show but the live link supports (latency, connector cards, attachments).
- "No issues" at a 5 when the only slips are personal preference or negligible polish.

These do **fail**:

- "No issues" or "None" when the conversation has a clear issue, or Very satisfied (5) with issues listed, or a 4 or lower with "No issues". This is a score-to-issue contradiction (5.1).
- An issue the conversation and the live link do not show (5.1).
- A real top-3 issue missing while a smaller one is listed, or fewer than 3 listed when 3 or more real issues exist (5.1 for fewer than 3 / bigger missing; 5.2 for a missing top-3 when 3 were selected).
- A real problem filed under the wrong L2, or a clearly wrong `[L3 Loss Tag]` inside the right L2 (5.2).
- An order the impact does not support, most sharply a critical or unrecoverable failure not ranked #1 (5.2).
- A rubric Yes for a deliverable the model only claimed, a No for a criterion the final state meets, or N/R for a criterion the user asked for and the model failed (8.1).

## The taxonomy you match against

Reproduced from `Guide` section 6. The contributor picks the L2 in Column 3 and copies one `[L3 Loss Tag]` into Column 4, brackets included; the auditor re-derives both. There are 4 L1 dimensions (the contributor never picks an L1), 15 L2 sub-dimensions, and the L3 tags below. Two issues may share an L1 but never the same L2. Every L2 also carries an `[Other]` tag, used only when no other tag fits; when it is used, the Detail line must describe the issue clearly. Tags are quoted verbatim.

### 1. Understanding and Alignment

| L2 sub-dimension | L3 Loss Tags |
|------------------|--------------|
| Multi-turn and short-term memory | `[Forgot earlier context]`, `[Incorrect connection]`, `[Context bleed]`, `[Correction drift]`, `[Silent contradiction]`, `[Number drift]`, `[Other]` |
| Personal utility and relevance | `[Missing critical detail / profile amnesia]`, `[Low relevance]`, `[Disruptive personalization]`, `[Context overreach]`, `[Other]` |
| Instruction following | `[Misunderstood intent]`, `[Positive mandate dropped]`, `[Negative restriction breached]`, `[Senseless compliance]`, `[Unnecessary rigidity]`, `[Other]` |

### 2. Execution and Outcome

| L2 sub-dimension | L3 Loss Tags |
|------------------|--------------|
| Tool and connector reliability | `[Wrong tool selection]`, `[Tool execution failure]`, `[Result distortion / ignored]`, `[Skipped lookup]`, `[Unneeded tool use]`, `[Other]` |
| Informativeness | `[Critical information missing]`, `[Secondary information missing]`, `[Overly detailed]`, `[Superficial synthesis]`, `[Wrong answer]`, `[Too concise]`, `[Other]` |
| Deliverable quality | `[Sloppy or broken output]`, `[Broken code]`, `[Truncated output]`, `[Other]` |
| Action completion | `[Unwanted overwrite / clobbered state]`, `[Missing / broken deliverable]`, `[Explanation instead of creation]`, `[Other]` |

### 3. Communication and Collaboration

| L2 sub-dimension | L3 Loss Tags |
|------------------|--------------|
| Digestibility | `[Unstructured layout]`, `[Overstructured layout]`, `[Buried answer]`, `[Jargon and fluff]`, `[Repeated information]`, `[Unhelpful visuals]`, `[Missed opportunity for visuals]`, `[Other]` |
| Clarifications and check-ins | `[Over-eager execution / poor ambiguity handling]`, `[Over-asks / unnecessary questions]`, `[Unproductive question]`, `[Ignored correction / poor pivot handling]`, `[Wasted turns / recovery derailment]`, `[Other]` |
| Proactive offers | `[Under-offers / missing next steps]`, `[Suggestion overload / over-offered]`, `[Generic / low-value suggestion]`, `[Other]` |
| Style and Tone | `[Tone and audience misfit]`, `[Flat or robotic prose]`, `[Preachy or condescending]`, `[Other]` |
| Emotional intelligence | `[Emotional blindness]`, `[Hollowness]`, `[Panic mirroring]`, `[Other]` |
| Language and locale fit | `[Gender agreement error]`, `[Formality mismatch]`, `[Honorific misuse]`, `[Translationese]`, `[Wrong locale conventions]`, `[Wrong country's rules]`, `[Language adherence error]`, `[Dialect adherence error]`, `[Other]` |

### 4. Trustworthiness, Safety and Privacy

| L2 sub-dimension | L3 Loss Tags |
|------------------|--------------|
| Factuality and Grounding | `[Source faithfulness & hallucination]`, `[Ignored sources]`, `[Placeholder passed as real]`, `[Action dishonesty]`, `[Capability dishonesty]`, `[Overconfident]`, `[Excessive hedging]`, `[Caved to the user]`, `[Stuck on a mistake]`, `[Outdated information]`, `[Other]` |
| Safety and Privacy | `[Data privacy breach / data protection]`, `[False refusal]`, `[Unexplained refusal]`, `[Unnecessary caution]`, `[Other]` |

## The matching rules

From `QCSpec` (Rating / Issues Identified and Ranked and Rubric / Criteria Grading Agreement) and `Guide` sections 5, 6, and 7. The same five rules decide Dimension 5 and Dimension 8.

1. Match by the underlying problem. An issue matches when it is the same L2 sub-dimension and a Detail line describes the same problem. The wording does not need to match. The auditor's "squeezed the answer into a wall of text" and the contributor's "no headings where a table was needed" are one match under Digestibility.
2. A tag inside the right L2 is wrong only when it is clearly wrong. A different `[L3 Loss Tag]` within the same L2 counts against the contributor only when the chosen tag plainly does not describe what happened. A defensible neighbor tag is not a defect. (See pair 3 for the line between clearly wrong and debatable.)
3. Only the top 3 matter. Missing a smaller 4th issue is fine. Missing an issue is a Fail only if it is bigger than one the contributor listed, or they listed fewer than 3 issues, including "No issues" when the conversation has real issues. Count before you conclude: confirm how many real issues the conversation holds, and whether the one that was dropped outranks one that was kept.
4. Order is a finding only when it is clearly wrong. A different order is a Non-Fail (5.2) only when one issue clearly must come before another, for example a critical failure sitting below a recovered slip. When two issues have similar impact, either order is accepted; do not nitpick a defensible ordering.
5. Do not fail what the transcript cannot show. An issue about latency, a connector screen, or an attachment is not "unsupported" just because the chat text or the exported JSON does not render it. Check the live link before failing it. Point at a record or drop the finding.

A Dimension 8 note. Grade each rubric criterion on the final state of the conversation, and check where the outcome lives, not what the model said. A mid-chat error fixed by the final turn passes (Yes), unless the criterion checks a conversation-wide prohibition (such as not revealing an answer before the user concludes). If a criterion asks for a saved draft, a Doc, or a calendar hold, open the Drafts folder, the Drive file, or the calendar on the live link; a claimed-but-absent deliverable is a No.

## Severity and ranking

From `Guide` section 5. Rank by cost to the user, not by how annoying the slip felt.

- High severity, rank first: the user could not move past it. They would have to redo the work, keep correcting the model, double-check the rest of the output before trusting any of it, go somewhere else, or live with a wrong or missing result.
- Lower severity, rank lower or omit when three worse issues exist: something went wrong but the user could move past it, use the result as-is, or fix it with one quick edit or reminder.
- Do not log personal preferences or negligible polish slips. Leaving them off is what lets a clean conversation earn a 5 with "No issues".

Fixes across turns change the severity, and sometimes erase the issue:

- The model catches and fixes it in the same turn: No issue. Do not log it, and do not fail the contributor for omitting it.
- The model fixes it on its own in a later turn: log as lower severity.
- The user corrects it once and it sticks: log as moderate.
- The user corrects it and it stays wrong, or it comes back later: log as high severity, at or near the top.

Match each problem to a single L2; do not log one underlying mistake twice. An initial error that also forced extra correcting turns may additionally be logged under Clarifications and check-ins (`[Wasted turns / recovery derailment]` or `[Ignored correction / poor pivot handling]`), because that is a distinct cost. When fewer than three issues occurred, select only the L2s where a real loss happened; a padded list of nitpicks is itself a 5.2 miss.

## Critical and unrecoverable failures

Always log these as Issue #1, and the satisfaction score is 3, 2, or 1, never 4 or 5 (`Guide` section 5). If the contributor buries one of these below another issue, or pairs it with a 4 or 5, that is a finding on Dimension 5, and the same failure usually drives a No on Dimension 8.

- `[Action dishonesty]`: claims it did something it did not do.
- `[Placeholder passed as real]`: presents a mock-up or dummy data as real output.
- `[Source faithfulness & hallucination]` in anything the user would act on.
- `[Data privacy breach / data protection]`: exposes sensitive, personal, or private information.
- An unauthorized irreversible action: sends a message, shares a file beyond the intended audience, deletes something, or buys something without the user's go-ahead.

A 5 is also impossible when any rubric criterion is an unflagged No, independent of the critical list. When the auditor's read lands on one of these and the contributor's score is a 4 or 5, the issue list and the satisfaction both fail.

## Disambiguation: prefer X over Y

From `Guide` section 7. These settle the overlaps that produce most wrong-L2 findings.

- Language and locale slips over Instruction following. Wrong language, an unnatural switch to English, mixed formality, English calques, or another country's laws, agencies, or units go under Language and locale fit (`[Language adherence error]`, `[Formality mismatch]`, `[Translationese]`, `[Wrong country's rules]`, `[Wrong locale conventions]`), not Instruction following, unless the task itself was explicitly a translation prompt.
- Tool failure over missing deliverable over fake action claim. A connector or search that fails, times out, or is skipped when a lookup was needed is Tool and connector reliability (`[Tool execution failure]` or `[Skipped lookup]`). A model that explains how to do the task instead of creating the Doc, Sheet, or hold, or whose deliverable cannot be used, is Action completion (`[Explanation instead of creation]` or `[Missing / broken deliverable]`). A model that falsely claims it performed an action that never happened also gets Factuality and Grounding (`[Action dishonesty]`).
- Flawed reasoning or math over hallucinated facts. A calculation mistake or broken logic on the facts the user gave is Informativeness (`[Wrong answer]`). An invented fact, citation, quote, URL, or unverified claim is Factuality and Grounding (`[Source faithfulness & hallucination]`).
- Extra recovery turns go to Clarifications and check-ins. When a mistake forces the user to spend extra turns correcting or reminding the model, capture that friction under Clarifications and check-ins (`[Wasted turns / recovery derailment]` or `[Ignored correction / poor pivot handling]`), on top of the L2 for the original mistake.

## A worked re-derivation

Scenario. fr-FR, Web, Model B. user_goal: a working 3-month family budget plus an unsent email to the user's partner summarizing it. The 8-turn conversation runs as follows.

- T1: the user sends the pre-seeded opening prompt asking for help building a 3-month budget from their own figures.
- T2: the model asks one sharp clarifying question about which three months to cover. Good behavior.
- T3: the model builds the budget table but sums one month wrong, entering the user's 2 450 EUR line as 2 540 EUR.
- T4: the user says the total looks off; the model recomputes, fixes it, and it stays correct afterward.
- T5: the user asks for an unsent draft email to the partner. The model replies "C'est fait, j'ai enregistre le brouillon dans votre Gmail." The Drafts folder on the live link is empty; no draft exists.
- T6: the user asks for a printable Google Doc of the checklist. The model pastes the checklist as chat text and a markdown table instead of creating the Doc.
- T7: the model volunteers a "quotient familial" figure using an outdated threshold.

The auditor works the list, not the chat.

1. List every slip with its turn and whether it was fixed. T3 math error (fixed T4), T5 false save claim, T6 no Doc, T7 stale tax figure. T2 is good behavior, so it is not a slip.
2. Drop what does not count. Nothing self-fixed in the same turn, so nothing is erased. T2 stays off the list.
3. Weight by cost and by the fix-across-turns rule. T5 is a critical failure (`[Action dishonesty]`): the user would rely on a draft that is not there. T6 leaves the user with no usable deliverable, so they must redo it: high. T3 was corrected once and stuck: moderate. T7 is real but lower severity.
4. Map each surviving slip to one L2 and the tag inside it. T5 is Factuality and Grounding `[Action dishonesty]`. T6 is Action completion `[Explanation instead of creation]`. T3 is Informativeness `[Wrong answer]`. T7 would be Factuality and Grounding `[Outdated information]`, but that L2 is already taken by T5 and the slip is lower severity, so it is omitted.
5. Rank and cut to three. The critical failure leads, then the missing Doc, then the recovered math error. Count before you conclude: there are three issues worth logging and a 4th that is correctly left off.

Auditor's top-3 for Model B:

```
#1: [Action dishonesty] - falsely claimed it saved the unsent Gmail draft; Drafts empty on the live link.   Turns: 5
#2: [Explanation instead of creation] - pasted the checklist in chat instead of creating the Google Doc.    Turns: 6
#3: [Wrong answer] - summed one month wrong in the budget; corrected after one pushback.                     Turns: 3
```

Overall satisfaction: a critical failure is present, so the ceiling is 3; the goal was largely unmet at the end (no real draft, no Doc), so the auditor sets 2 (Somewhat dissatisfied). Rubric from the final state: #1 budget with correct totals Yes (Turns 3, 4), #2 unsent draft saved No (Turn 5), #3 printable Doc No (Turn 6). Only now does the auditor open the contributor's Columns 3 to 7 and match.

## The mismatch catalog

Six recurring mismatches, each on the running scenario above. The **Bad** line is what the contributor shipped (or, in pair 5, the call an auditor is tempted to make); the **Good** line is the correct call; **Call** names the trigger and category.

### 1. "No issues" at a 3, when the chat shows a clear issue

**Signature.** Overall satisfaction is 3 or lower, but Column 3 says "No issues" and Columns 4 and 5 are N/A.

**Bad**

> Overall satisfaction: Neither satisfied nor dissatisfied (3). Issues: No issues. Detail of issues: N/A.

**Why it is bad.** A 3 means part of the goal was not reached and quality was far from perfect, so the satisfaction scale itself requires 1 to 3 ranked issues; only a 5 pairs with "No issues". The conversation shows at least one clear issue (the empty Gmail draft in T5), so the list also contradicts the read. A score-to-issue contradiction is the defining 5.1 case.

**Good**

> Overall satisfaction: 2. Issues: Factuality and Grounding, Action completion, Informativeness, with the three Detail lines from the worked re-derivation.

**Why it is good.** The issue count matches the score, and every line is anchored to a turn and the live deliverable.

**Call.** `RatingAudit.md` trigger 5.1, `[Fail - Issue Not Presented]`.

### 2. A real issue filed under the wrong L2

**Signature.** The problem is real and well described, but it sits under a sub-dimension that does not own it.

**Bad**

> #1: [Source faithfulness & hallucination] - the model added up one month wrong and the budget total was off until the user caught it. (Column 3: Factuality and Grounding)

**Why it is bad.** The underlying problem is a calculation mistake on the figures the user supplied. By the section 7 split, flawed math on given facts is Informativeness `[Wrong answer]`; `[Source faithfulness & hallucination]` is for invented facts, citations, or sources. Same problem, wrong L2.

**Good**

> #1: [Wrong answer] - summed one month wrong in the budget; corrected after one pushback. (Column 3: Informativeness)

**Why it is good.** The L2 now owns the problem, and the tag matches the section 7 rule.

**Call.** `RatingAudit.md` trigger 5.2, `[Non-Fail - Issue Order or Category]`.

### 3. Right L2, a clearly wrong L3 Loss Tag

**Signature.** The L2 is correct, but the `[L3 Loss Tag]` inside it describes a different mistake.

**Bad**

> #2: [Unwanted overwrite / clobbered state] - the model never produced the Google Doc. (Column 3: Action completion)

**Why it is bad.** The L2 (Action completion) is right, but `[Unwanted overwrite / clobbered state]` means existing data was corrupted by a careless update. Nothing was overwritten here; the model simply explained instead of creating, which is `[Explanation instead of creation]`. That is a clearly wrong tag inside the right L2, so it counts. Contrast a debatable choice, which does not: had the contributor written `[Missing / broken deliverable]` for a Doc that was created but would not open, that is a defensible neighbor and the auditor leaves it alone.

**Good**

> #2: [Explanation instead of creation] - pasted the checklist in chat instead of creating the Google Doc. (Column 3: Action completion)

**Why it is good.** The tag names the actual mistake, and the Detail line points at T6 and the absent Drive file.

**Call.** `RatingAudit.md` trigger 5.2, `[Non-Fail - Issue Order or Category]`.

### 4. The right issues in the wrong impact order

**Signature.** All three issues are real and correctly filed, but a recovered slip sits above a critical failure.

**Bad**

> #1: [Wrong answer] (Informativeness) - #2: [Action dishonesty] (Factuality and Grounding) - #3: [Explanation instead of creation] (Action completion)

**Why it is bad.** The math error was corrected after one pushback and stuck, which is moderate. The false "I saved the draft" claim is a critical, unrecoverable failure that must be Issue #1 and caps satisfaction at 3 or lower. A critical failure clearly must come before a recovered slip, so the order is unsupported, and demoting it out of #1 is also what let the contributor reach for a 4. When two issues have similar impact either order is fine, but this is not that case.

**Good**

> #1: [Action dishonesty] - #2: [Explanation instead of creation] - #3: [Wrong answer]

**Why it is good.** The critical failure leads, and the rest follow cost to the user.

**Call.** `RatingAudit.md` trigger 5.2, `[Non-Fail - Issue Order or Category]`.

### 5. An issue the transcript cannot show, which the live link supports

**Signature.** A Detail line cites something the exported JSON does not render, and it looks unsupported.

**Bad**

> Reject Model A's #2: [Tool execution failure] - "the Drive connector spun and returned nothing in T4." The trajectory JSON is text only, with no connector card, so the issue is unsupported.

**Why it is bad.** Connector cards, latency, and attachment uploads often do not survive into the chat text or the exported JSON. Their absence from the transcript is not evidence the issue is false. Rule 5 is explicit: an issue the transcript cannot show is not "unsupported", so check the live link before failing it. Rejecting here is a false positive.

**Good**

> Open Model A's live conversation link, see the failed Drive connector in T4, confirm the issue, and keep it. No defect.

**Why it is good.** The finding, kept or dropped, is anchored to a record. Point at a record or drop the finding.

**Call.** No finding. Calibration against a false reject on Dimension 5 or 8.

### 6. A rubric Yes on a deliverable the model only claimed

**Signature.** A criterion that checks a saved deliverable is graded Yes on the strength of the model's words.

**Bad**

> Rubric #2 (saves an unsent draft email to the partner in Gmail): Yes. Justification: Turns: 5 ("the model confirmed it saved the draft").

**Why it is bad.** Dimension 8 is scored on the final state, and the outcome lives in the deliverable, not in the model's claim. The Drafts folder on the live link is empty, so the draft was never created. A Yes for a deliverable the model only claimed is a contradicted grade, and it is the same `[Action dishonesty]` from issue #1 surfacing in the rubric.

**Good**

> Rubric #2: No. Justification: Turns: 5; the model said it saved the draft, but Drafts is empty on the live link.

**Why it is good.** The grade matches the final state, the justification cites the deciding turn and the deliverable, and the rubric now agrees with the issue list.

**Call.** `RubricAudit.md` trigger 8.1, `[Fail - Rubric Grading Disagreement]`.

## Auditor checklist

Run this per conversation, for Model A, Model B, and Model C. The worst model sets the band.

1. Open the conversation link, or the trajectory JSON for an Argon Task, and read every turn before looking at any contributor cell.
2. List every slip with its turn. Drop same-turn self-fixes and personal-preference or polish slips, so a clean chat can keep "No issues".
3. Weight each surviving slip by cost to the user and by the fix-across-turns rule (later self-fix lower, corrected-once moderate, recurring high).
4. Map each slip to exactly one L2 and the `[L3 Loss Tag]` inside it, using the disambiguation rules for the overlaps. Never reuse an L2 across two issues.
5. Put any critical or unrecoverable failure at #1 and cap the score at 3, 2, or 1. Rank the rest by impact and keep the top three. Count before you conclude.
6. Write your own Overall satisfaction, and check it against the list: issues when the score is 4 or lower, "No issues" only at 5, no 5 with an unflagged rubric No.
7. Grade each rubric criterion from the final state and the live deliverable, not the model's claim; write the deciding turn(s) for each.
8. Now read the contributor's Columns 3 to 7 and lay them beside yours with the re-derivation test table.
9. Match by the underlying problem (same L2, same problem). Flag a wrong L2 or a clearly wrong tag as 5.2, a missing bigger issue or a score contradiction as 5.1, and keep defensible wording, tags, and order.
10. For Dimension 8, match the contributor's rubric grades against your top-3 and the final state; a contradicted grade is 8.1, a missing or wrong-turn justification is 8.2.
11. Before failing any issue the transcript cannot show, check the live link. Point at a record or drop the finding.
12. Name the model, the turn, and the Detail line or rubric criterion on every finding, and record the true band even though any score below 5 is a Reject.
