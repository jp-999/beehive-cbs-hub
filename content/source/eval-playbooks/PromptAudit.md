# Prompt Audit

> Reference: `README.md` for the dimension map, the Beehive task model, and the source readings, `EvalChecklist.md` for the trigger index and the exact bracketed category strings, `LinterSweep.md` for the mechanical pre-pass, `TrajectoryAudit.md` for the conversation audit that runs before this one, and `RatingAudit.md` for the issue and country-fit findings this file hands off to. QC Spec v9.25.26.

The artifact this file audits is the opening prompt of each of the three conversations, read against the pre-seeded `initial_prompt_native`, and the language and locale of every user turn in each of those conversations. It owns Dimensions 3 and 13: Pre-seeded and Opening Prompts Consistency (the `QCSpec` Prompt group), and Language and Localization (the `QCSpec` Prompts group). Both are scored per model across Models A, B, and C, and the worst model decides the task band. The user whose turns are graded is the contributor role-playing the persona, so "the user's turns" are the contributor's side of the conversation, never the English justification fields.

This runs after `LinterSweep.md` and `TrajectoryAudit.md`, Step 3 in `README.md`, and before the rating work. The trajectory audit settles which conversations are even valid first, because the language of a run on the wrong model or a run with no readable record is moot. This file then reads the opener and every turn before `RatingAudit.md`, because a Language and locale fit finding here predicts a Dimension 5 issue and the Country fit cross-check downstream, and the rating audit should inherit the anchor rather than rediscover it. Grade the opening prompt and the user's turns, never the quality of the model's replies: a brilliant or a broken model answer is a rating or a rubric finding, not a prompt or a language one.

Both dimensions carry a Fail band and a non-fail band, and the summary records the true band even though every miss is a Reject here. Dimension 3 is a Fail at 3.1 (score 2) or a non-fail at 3.2 (score 3). Dimension 13 is a Fail at 13.1 (score 2) or a non-fail at 13.2 (score 3). Record the band on every finding, because it carries the real SLA outcome and the feedback severity: a 2 fails the SLA, a 3 does not, and both are a Reject here, and every score-2 and score-3 finding needs a written justification. Audit by reading every user turn of each conversation yourself, form the count independently, name the model (A, B, or C) on every per-model finding, count before you conclude, grade to the worst model, and point at a record or drop the finding.

## Calibration Before You Read

Read these four guards before the first pass. They prevent the false rejections this group produces most often.

1. An exact-match opener is the expected state, not a thing to second-guess. The `Guide` section 2 instructs the contributor to copy and send `initial_prompt_native` verbatim as Turn 1, so a character-for-character match is a clean 5 on Dimension 3 and is what a correct submission looks like. Do not read a correct verbatim opener as suspicious or hunt for a defect that is not there. The Dimension 3 finding exists only when Turn 1 diverges from the stored native prompt.
2. The contributor's justifications are in English by design. Only the written justifications are in English: the Detail of issues, the rubric justifications, and the country-fit notes. The conversation turns themselves are in the assigned language. Do not read English in a justification field as a language defect; Dimension 13, L18, and L31 grade the conversation turns, never the justification fields. This is the `QCSpec` note made explicit, "Only justifications should be written in English. CBs must use the language assigned but may switch languages naturally."
3. Natural language switching under 25 percent is fine. The user may switch between the assigned language and another language, most often English, when it is natural and common in the locale, and the `Guide` section 2 permits it outright. A switch that leaves under 25 percent of the user turns off-locale is a non-fail at 13.2, not a Fail, and a single natural English aside is not a re-run. Count the turns before you conclude; do not fail on the sight of one off-language word.
4. Locale is broader than language. Locale covers dates, units, currency, number formats, honorifics, formality (tu vs vous), script, and dialect, not only which language the words are in. A turn can be in the correct language and still off-locale (a French turn that quotes dollars or formats a date MM/DD/YYYY), and a turn can be off-language entirely. Distinguish a wrong-language turn from a wrong-locale turn, because the 13.1 against 13.2 split and the 25 percent count both depend on which kind each defect turn is.

These four guards share one spine: grade the conversation the contributor actually ran against the assignment, not against your own default expectations. A false reject here costs the author a full re-run of three conversations, so when a guard and a trigger seem to disagree, count the turns and return to the assignment. Point at a record or drop the finding.

## Section 1: Pre-seeded and Opening Prompts Consistency, Dimension 3

Source: `QCSpec` Prompt / Pre-seeded and Opening Prompts Consistency. `Guide` section 2. `EvalChecklist.md` Dimension 3. `LinterSweep.md` L7. Per model, worst decides.

### Excellence Standard
The opening prompt of every conversation is exactly the same as the pre-seeded `initial_prompt_native`.

### Reject Triggers

3.1 The opening prompt of the conversations has a different core intent than the pre-seeded prompt.
Fix: Start each conversation with the exact pre-seeded `initial_prompt_native`. `[Fail - Opening Prompts Inconsistency]`. Score 2. Justify with the model letter, the opener quoted, and the stored prompt it diverges from. Worked example: the stored `initial_prompt_native` asks the model to plan a three-day Lyon itinerary on a 200 euro budget, but Model B's Turn 1 asks it to compare TGV fares between Paris and Marseille. The ask and the goal are different, so the opener carries a different core intent and Model B fails 3.1.

3.2 The opening question of the conversations is not the same as the pre-seeded prompt but has the same core intent.
Fix: Replace the opener with the verbatim pre-seeded `initial_prompt_native`. `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]`. Score 3. Justify with the model letter and the reworded opener set beside the stored prompt. Worked example: the stored prompt reads "Peux-tu m'aider à préparer un budget mensuel pour mon loyer à Paris ?" but Model A's Turn 1 reads "J'ai besoin d'aide pour construire un budget mensuel pour mon loyer parisien." The wording changed but the ask, a monthly rent budget for Paris, is identical, so Model A caps at 3.2, still a Reject here.

The contributor is instructed to copy and send `initial_prompt_native` verbatim as Turn 1, so an exact match is the expected state and any divergence is a contributor slip, at least a 3.2. There is no Fail-only or non-fail-only structure here; both bands exist, so grade the intent, not just the string.

### How to Audit
1. Carry L7 in from `LinterSweep.md`. For each of Models A, B, and C, open the conversation (`conversation_link_x`, or the trajectory JSON `trajectory_x` for an Argon Task run that cannot share a link, per `README.md`) and read Turn 1, the contributor's first user message (anchor: the conversation plus `initial_prompt_native`).
2. String-match Turn 1 against the stored `initial_prompt_native` character for character. Compare against the native field, not the English `initial_prompt`. An exact verbatim match is No Issues (5) for that model, the expected state per Calibration guard 1.
3. If Turn 1 is not a verbatim match, decide core intent. A paraphrase, a reorder, a fixed typo, or an added or dropped pleasantry that keeps the same ask is 3.2; a different ask, a different deliverable, or a different goal is 3.1 (anchor: the opener clause that carries the changed intent).
4. When the export is ambiguous, confirm the stored `initial_prompt_native` against Redash before recording a divergence (`README.md`, Redash Grounding, data source 30, project `6ae1115bd103bdba12c06461`).
5. Grade all three models and take the worst as the task band. Name the model on every finding. Grade to the worst model.
6. Run the Opener String-Match Drill below. There are two bands, so a same-intent paraphrase is still a Reject at 3.2, not a pass. Point at a record or drop the finding.

### Drill: Opener String-Match Drill
Put the stored `initial_prompt_native` and each conversation's Turn 1 side by side, model by model. Read them as strings first, then as meanings: an exact verbatim match is a 5; a paraphrase or an edit that keeps the same core intent is 3.2; a different ask or a different goal is 3.1. Because the contributor was told to copy and send `initial_prompt_native` verbatim, treat any divergence as a slip rather than an acceptable variant, and name the model (A, B, or C) that diverged. Quote the stored prompt and the actual Turn 1 as the two anchors. Point at a record or drop the finding.

### Note: Verbatim Is the Expected State
The clean result on this dimension is a character-for-character match, because `initial_prompt_native` is copy-sent as Turn 1. A correct verbatim opener is the pass, not a coincidence to interrogate, so do not manufacture a 3.2 out of an accent, a spacing quirk the platform introduced, or a trailing space. The finding exists only when Turn 1 carries a different wording or a different intent from the stored native prompt.

### Note: Wording Change vs Intent Change
Only the ask and the goal decide the band. A long native opener can lose a clause and still ask for the same thing, which is 3.2, or lose a clause that changes what is asked, which is 3.1. Read for the core intent, the thing the user wants the model to do and the outcome it wants, not for surface length or phrasing. A reworded opener that reaches the same deliverable caps at 3.2; a reworded opener that now asks for a different deliverable is 3.1. Name the clause that carries the change.

### Note: Nothing Downstream, Still a Reject
A Dimension 3 divergence predicts no later finding; it does not change the issues, the rubric, the country fit, or the ranking, and the Section 3 handoff records it as self-contained. That does not soften it. The worst model's band is the task band, and any divergence, 3.1 or 3.2, is a Reject here.

## Section 2: Language and Localization, Dimension 13

Source: `QCSpec` Prompts / Language and Localization. `Guide` sections 2, 7, and 10. `EvalChecklist.md` Dimension 13. `LinterSweep.md` L18, L31; cross-rule L19. `QCSpec` Notes reads `#REF!`; see `README.md` Known Source Discrepancies. Per model, worst decides.

### Excellence Standard
The user speaks in the assigned language and all of the turns match the assigned locale of the persona.

### Reject Triggers

13.1 The user's language does not match the assigned language at all; or the user's language is correct for part of the conversation but 25 percent or more of the turns do not match the locale of the persona.
Fix: Re-run the conversation in the assigned language and locale. `[Fail - Language]`. Score 2. Justify with the model letter, the defect-turn count over total user turns, and the resulting share. Worked example, off-language: the assignment is fr-FR but every user turn in Model C's conversation is written in English; the user's language does not match at all, so Model C fails 13.1 and also trips L31, the re-run gate. Worked example, off-locale at the line: a fr-FR run of 12 user turns where 3 turns quote prices in dollars and format dates MM/DD/YYYY is 3 off-locale of 12, exactly 25 percent, which is at the line and fails 13.1.

13.2 The user's language is correct for part of the conversation but under 25 percent of the turns do not match the locale of the persona; or the user switches between the assigned language and another language naturally and under 25 percent of the turns do not match the locale.
Fix: Keep every turn in the assigned language and locale. `[Non-Fail - Localization]`. Score 3. Justify with the model letter, the defect turn numbers, and the share. Worked example: a fr-FR run of 12 user turns where the user drops into English for one quick aside in Turn 7, 1 of 12 or about 8 percent, is a natural switch under 25 percent and caps at 13.2, still a Reject here.

The boundary is exact: a share at or above 25 percent (or a fully off-language run) is 13.1; a share strictly under 25 percent is 13.2; zero defect turns is the only clean 5.

### How to Audit
1. Carry L18 and L31 in from `LinterSweep.md`, and the L19 country-fit cross-rule. Record the assigned `languageCode` (for example fr-FR) and name both the language (French) and the country locale (France).
2. Open each conversation (A, B, C) and read every user turn yourself. Audit by reading every user turn of each conversation yourself; do not skim and do not read the contributor's answer first. The user here is the contributor role-playing the persona, so grade the conversation messages, not the English justification fields (Calibration guard 2).
3. For each model, count the total user turns, then count two kinds of defect turn: a wrong-language turn (the turn is not in the assigned language at all) and a wrong-locale turn (the turn is in the assigned language but carries another country's conventions). Count before you conclude.
4. Compute the defect share as defect turns over total user turns and compare it to the 25 percent line. A fully off-language run is 13.1 (and L31). Correct language but 25 percent or more off-locale turns is 13.1. Under 25 percent off-locale, or a natural switch under 25 percent, is 13.2. Zero defect turns is the clean 5.
5. Run the Off-Locale Turn Count Drill below, then run the Country Fit Cross-Rule check (Note below, L19).
6. Grade all three models and take the worst as the task band. Name the model. Grade to the worst model. Two bands, so even one off-locale turn under 25 percent is a Reject at 13.2, not a pass. Point at a record or drop the finding.

### Drill: Off-Locale Turn Count Drill
Walk every user turn in each conversation, model by model, and keep two tallies: wrong-language turns (not in the assigned language) and wrong-locale turns (right language, wrong country conventions, such as dates, units, currency, number formats, honorifics, formality, script, or dialect). Add the two to get the defect count, divide by the total user turns, and read the share against 25 percent: a fully off-language run or a share at or above 25 percent is 13.1; a share strictly under 25 percent is 13.2; zero is the clean 5. Count before you conclude and do not eyeball the share; write the fraction out. Point at a record or drop the finding: name the model, the defect turn numbers, and the share.

### Note: Country Fit Cross-Rule (L19)
`Guide` section 10 ties Dimension 13 to the contributor's own Country fit rating. When "Language and locale fit" is logged as an issue in Column 3 (an `issue_x` value) for a model, that model's Country fit (`country_fit_x`) must be 2 or 3, never 1, and the bad-note (`country_fit_bad_x`, Column 10) must describe the problem, not N/A. A model that logs Language and locale fit yet rates Country fit 1, or leaves `country_fit_bad_x` at N/A, trips L19. Check it here and name the model. This is a consistency rule on the contributor's own entries, not a second judgment of the locale: the Language and locale fit issue itself is graded in Dimension 5, so carry the tripped cross-rule to `RatingAudit.md` through the Section 3 handoff.

### Note: Wrong Language vs Wrong Locale
Keep the two apart, because they count the same toward the 25 percent share but route to different `[L3 Loss Tag]`s downstream and carry different severity. A wrong-language turn is the harsher signal: English where French was assigned, the wrong script, or an ignored language request, and a fully off-language run is a straight 13.1 plus the L31 re-run. A wrong-locale turn stays in the assigned language but imports another country's conventions: dates (MM/DD/YYYY against DD/MM/YYYY), units (pounds and feet against kilograms and centimeters), currency (dollars against euros), number formats, honorifics, formality (tu vs vous), script, or dialect. Name which kind each defect turn is, because under Dimension 5 a wrong-language turn maps to `[Language adherence error]` or `[Dialect adherence error]`, and a wrong-locale turn maps to `[Wrong locale conventions]`, `[Formality mismatch]`, `[Honorific misuse]`, or `[Wrong country's rules]`.

### Note: Justifications Are English by Design
Only the contributor's written justifications are in English: the Detail of issues (Column 4), the rubric justifications (Column 7), and the country-fit notes (Columns 9 and 10). The conversation turns are in the assigned language and may switch naturally. Grade Dimension 13 on the conversation turns only. English text in a justification field is never an off-language turn and never counts toward the 25 percent share; counting it there is the most common false reject on this dimension.

### Validity Gate: Locale (L31, re-run lane)
Before trusting the share, confirm no conversation is fully off the assigned language. A conversation written entirely in another language (a fully English fr-FR run, or one that reads as machine-translated throughout) is both a Dimension 13.1 Fail and `LinterSweep.md` L31, the locale validity gate that routes to a void-and-re-run rather than only a scored Reject. Record both: the 13.1 band carries the SLA outcome and the feedback, and L31 carries the re-run. Loanwords and a natural in-locale switch under 25 percent are not an off-language run; a whole conversation in the wrong language is. This is the one place a Dimension 13 finding also opens a validity gate, so say so in the report and carry L31 ahead of the band.

## Section 3: The Prompt-to-Downstream Handoff

Every finding here either predicts a finding in a later file or is self-contained. Record the handoff so the downstream audit inherits the anchor rather than rediscovering it.

| Finding here | Predicted downstream finding | Target file |
|--------------|------------------------------|-------------|
| A Language and locale fit defect in the turns, wrong-language or wrong-locale (triggers 13.1, 13.2) | If it is a top-3 driver of dissatisfaction it must be logged as the "Language and locale fit" L2 issue in Columns 3 to 5 with the matching `[L3 Loss Tag]`; a missing or miscategorized issue is a Dimension 5 finding | `RatingAudit.md` |
| A specific wrong-locale turn, a named convention miss (date, unit, currency, honorific, formality, dialect) | Predicts a Country fit (`country_fit_x`) of 2 or 3 and a `country_fit_bad_x` entry naming the same miss; a Country fit of 1 or an N/A bad-note contradicts it | `RatingAudit.md` |
| L19 tripped: Language and locale fit logged but `country_fit_x` is 1 or `country_fit_bad_x` is N/A | A contributor consistency defect between the logged issue and the country-fit rating, confirmed in the rating read | `RatingAudit.md` |
| A fully off-language run (trigger 13.1 plus L31) | A validity failure that voids the conversation and routes to a re-run, carried as an integrity finding ahead of the scored bands | the report, re-run lane |
| A prompt opener divergence (triggers 3.1, 3.2) | Nothing downstream: Dimension 3 is self-contained. It stays a per-model Reject, and the worst model sets the band | none |

## Audit Summary Template

```
Prompt Audit, Dimensions 3 and 13            Verdict: [Excellence / Reject]
Locale: [languageCode, e.g. fr-FR]   Surface: [Web / Mobile]
Assigned models: A [model_a_name]  B [model_b_name]  C [model_c_name]
Open linter IDs carried in: [L7, L18, L19, L31, ... / none]

Per model, worst decides. Name the model on every finding. The non-fail band is still a Reject.

 3  Pre-seeded and Opening Prompts Consistency
      A  [Excellence / Reject] - [category] - [Turn 1 vs initial_prompt_native: verbatim / same-intent paraphrase / different intent]
      B  [Excellence / Reject] - [category] - [...]
      C  [Excellence / Reject] - [category] - [...]
      Worst model sets the band: [model] [Excellence / Reject]

13  Language and Localization
      A  [Excellence / Reject] - [category] - [defect turns / total user turns = share %; wrong-language or wrong-locale]
      B  [Excellence / Reject] - [category] - [...]
      C  [Excellence / Reject] - [category] - [...]
      Country fit cross-rule (L19): [ok / tripped on model X]
      Fully off-language run (L31): [none / model X, re-run]
      Worst model sets the band: [model] [Excellence / Reject]

Any single Reject rejects the task. Point at a record or drop the finding.
```
