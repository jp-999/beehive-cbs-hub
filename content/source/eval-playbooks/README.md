# Task Evaluation System (Beehive, QC and MLDG, SxSxS Rating Audit)

QC and MLDG Rubric Generator spec, guidelines version v9.25.26. This folder is the QC gate for Beehive rating tasks. It is built on the live QC Spec and the Beehive contributor Guidelines, and it enforces a stricter standard than the SLA: only excellence is accepted. A task that sits at the top band on every dimension passes. A task with any issue on any dimension is rejected with specific, actionable feedback stating the error, the evidence, and the fix.

## Purpose

This evaluation system audits every Beehive rating task before it is accepted. The shipped artifact is one contributor's side-by-side-by-side (SxSxS) human evaluation: the same real-world scenario carried through a natural multi-turn conversation against three assigned models (Model A, Model B, Model C) in a target language and country, then each conversation rated, each rated for country fit, and the three models ranked. It is a bundle, and it is worth naming every part up front, because most rejections come from auditing one part against the wrong standard.

| Part | What it is | Where it comes from |
|------|-----------|---------------------|
| The assignment | surface, request_language and request_country, the has_image / has_file / has_attachment flags, user_goal, initial_prompt, next_steps, conversation_turn_number, the predefined rubric, and the three assigned model names. Pre-filled in the task row | The task METADATA |
| The three conversations | One multi-turn chat per model (A, B, C), the same scenario run three times, with a Model Check screenshot, a conversation link (or Argon Task acknowledgement), the trajectory JSON, and the artifacts zip for each | Guidelines sections 2 to 2 |
| The per-model rating | For each model: Overall satisfaction (1 to 5), 1 to 3 ranked L2 issues, the Detail of issues lines, the Turns, the Rubric grades (Yes / No / N/R) with turn justifications, and Country fit (1 to 3) with the good and bad notes | Guidelines sections 3 to 10, the 10-column template |
| The ranking | Rank #1, Rank #2, Rank #3, the Tie-breaker used, the Rubric guardrail, and the Ranking Justification | Guidelines section 11 |

This folder is the gate that runs on all of it before the task is accepted downstream.

## The Excellence Standard

The live SLA scores each dimension 1 to 5, where 1 to 2 is a Fail, 3 to 4 is a non-failing quality note, and 5 is No Issues. This system rejects anything below 5 on every dimension.

The reasoning is the project's own. Grade to the lowest dimension, not the average, and a single finding in the 1 to 2 band fails the whole task. This gate goes one step further: all dimensions must be a 5 for the task to receive a clean score. A single non-failing 3 to 4 still drops the task off a clean score, and fixing an issue before submission costs minutes while a QC rejection costs the whole task. Record the true SLA band on every finding anyway, because the band carries the feedback severity and the real SLA outcome: a 1 to 2 fails the SLA, a 3 to 4 does not, and both are a Reject here.

A task passes this evaluation only when all of the following are true.

1. Every conversation has a valid link for Model A, Model B, and Model C, or, for an Argon Task chat that cannot be shared, the conversation is uploaded as the trajectory JSON (Dimension 1).
2. Every conversation covers every next step with natural, first-person prompts that react to the model's replies, never stopping after Turn 1 and never pasting the third-person next-steps text as a prompt (Dimension 2).
3. The opening prompt of every conversation is exactly the pre-seeded initial_prompt_native (Dimension 3).
4. Where the task requires an attachment, all three conversations contain the same attachments and each is uploaded before or with the prompt that needs it; where no attachment is required, none is needed (Dimension 4).
5. For every model the contributor's listed issues are real, match the conversation, are ranked by impact, filed under the right L2 sub-dimension and [L3 Loss Tag], and consistent with the satisfaction score (Dimension 5).
6. Every Detail of issues line is correctly structured: `#N: [L3 Loss Tag] - explanation`, with matching Turns lines (Dimension 6).
7. The contributor's dimension ratings (Overall satisfaction across all models) match the auditor's within one minor disagreement (Dimension 7).
8. The contributor's Rubric grades (Yes / No / N/R) are all present, each supported by the final state, and each justification cites the deciding turn(s) (Dimension 8).
9. The contributor's preference ranking matches the auditor's (Dimension 9).
10. The ranking is consistent with the contributor's own overall satisfaction scores, or any contradiction is adequately justified (Dimension 10).
11. The Ranking Justification states a preference or a tie (Dimension 11).
12. Every model used is the assigned model for that slot, shown in the Model Check screenshot (Dimension 12).
13. The user speaks the assigned language and every turn matches the assigned locale (Dimension 13).

If any one of these conditions is not met, the task is rejected.

## The Dimensions

The QC Spec grades 13 dimensions, numbered here in the row order of the `4. FINAL QC Output Rubric` sheet and grouped by the Dimension column the sheet uses. Band and score name the same cell throughout this folder: Score 1 to 2 is the Fail band, Score 3 to 4 is the non-failing note band, Score 5 is No Issues. Where a dimension has no Fail band or no non-fail band, the cell reads `none`. The bracketed categories are quoted verbatim from the QC Spec; only punctuation is normalized, so every category is written with a hyphen separator.

| # | Group | Dimension | Score 1-2 category | Score 3-4 category | Owner |
|---|-------|-----------|--------------------|--------------------|-------|
| 1 | User Input | Valid Links | `[Fail - Missing/Invalid Links]` | `[Non-Fail - Missing/Invalid Link]` | `TrajectoryAudit.md` |
| 2 | Conversation | Next Steps and Natural Flow | `[Fail - Next Steps Not Followed]` | `[Non-Fail - Unnatural Flow]` | `TrajectoryAudit.md` |
| 3 | Prompt | Pre-seeded and Opening Prompts Consistency | `[Fail - Opening Prompts Inconsistency]` | `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]` | `PromptAudit.md` |
| 4 | Conversation | Attachments Uploaded Before Use | `[Fail - Missing Attachment]` | `[Non-Fail - Late Attachment]` | `TrajectoryAudit.md` |
| 5 | Rating | Issues Identified and Ranked | `[Fail - Issue Not Presented]` | `[Non-Fail - Issue Order or Category]` | `RatingAudit.md` |
| 6 | Formatting | Detail of Issues | `[Fail - Formatting]` | none | `RatingAudit.md` |
| 7 | Rating | Correctness/Accuracy - Major Rating | `[Fail - Dimension Rating Disagreement]` | `[Non-Fail - Dimension Rating Disagreement]` | `RatingAudit.md` |
| 8 | Rubric | Criteria Grading Agreement | `[Fail - Rubric Grading Disagreement]` | `[Non-Fail - Rubric Evidence]` | `RubricAudit.md` |
| 9 | SxSxS Rating | Ranking Disagreement | `[Fail - Major Ranking Disagreement]` | `[Non-Fail - Loose Ranking Disagreement]` | `RankingAudit.md` |
| 10 | SxSxS Rating | Inconsistent Ranking | `[Fail - Inconsistent Ranking]` | `[Non-Fail - Inconsistent Ranking]` | `RankingAudit.md` |
| 11 | SxSxS Justification | Verdict | none | `[Non-Fail - Lacks Verdict]` | `RankingAudit.md` |
| 12 | Models | Models | `[Fail - Models]` | none | `TrajectoryAudit.md` |
| 13 | Prompts | Language and Localization | `[Fail - Language]` | `[Non-Fail - Localization]` | `PromptAudit.md` |

Rows with no non-fail band. Detail of Issues (6) and Models (12) are a 5 or a Fail with no middle band. Several are settled by a command or a single look, which is why `LinterSweep.md` runs first and closes or opens them before the reading starts.

Rows with no Fail band. Verdict (11) caps at a non-fail 3 to 4. That does not license sloppy work: a single 3 costs a clean score, so it is a Reject here.

One rule applies to every score below a 5. The SLA marks every Fail and non-fail option as requiring justification, so a finding recorded as a bare score is incomplete even when the score is right.

## Worst-Model-Decides and Per-Model Scope

Three conversations are rated in one task, and most dimensions are scored across all three. The worst model decides the outcome. If Model B's conversation skips two next steps while A and C are clean, Dimension 2 is a Fail for the whole task. Record which model drove each finding, because the author fixes a specific conversation, not an abstraction.

| Scope | Dimensions | How the three models combine |
|-------|------------|------------------------------|
| Per model, worst decides | 1, 2, 3, 4, 5, 6, 8, 12, 13 | Grade each of A, B, C; the lowest band is the task band. Name the model on every finding |
| Across all models at once | 7 | Count major and minor Overall satisfaction disagreements across all three models in one tally. Satisfaction is the only rated dimension the QC Spec names here |
| The comparison itself | 9, 10, 11 | One ranking per task; graded once against the auditor's own ranking and the contributor's own scores |

## Source Documents

Every dimension cites its source. The two authoritative guideline docs live under `../Ext instructions new/`. The short names used throughout this folder are:

| Short name | File |
|------------|------|
| `QCSpec` | `../Ext instructions new/QC Spec.md`, the 13 graded dimensions with every failing and non-failing band, quoted from the `4. FINAL QC Output Rubric` sheet |
| `Guide` | `../Ext instructions new/Beehive Instructions UPDATED.md`, the standalone contributor workflow: reading the task row, the 10-column rating template, overall satisfaction, the L1 / L2 / L3 issue taxonomy, the Detail of issues format, rubric scoring, country fit, ranking and tie-breakers, the 4 rated examples, and the pre-submission checklist |
| `Media` | `../Ext instructions new/media/`, the three flowchart GIFs the Guide references (the 5-step overview, the taxonomy nesting, and the ranking tie-breaker flowchart) |

Where this folder quotes a bracketed category, it is quoted from `QCSpec`. Where it quotes a taxonomy tag or a workflow rule, it is quoted from `Guide`.

## The Beehive Task Model

Each task row gives the scenario setup. The contributor must read these before starting, and the auditor grades the contributor's conversations and ratings against them. The stored METADATA field names are on the left; the Guide's names are in the description.

| METADATA field | What it is |
|----------------|------------|
| `surface` | Web or Mobile. The conversation must be run on this surface |
| `languageCode` | The language and country persona, the Guide's request_language / request_country (e.g., fr / FR). The conversation is held in this language and judged from this country's perspective |
| `initial_prompt`, `initial_prompt_native` | The exact opening message. The contributor sends `initial_prompt_native` verbatim as Turn 1 (Dimension 3) |
| `next_steps`, `next_steps_native` | A numbered list of 3 to 5 follow-up directions, third person. The contributor turns each into a natural first-person prompt (Dimension 2) |
| `user_goal`, `user_goal_native` | What the user is ultimately trying to accomplish. Satisfaction is anchored on reaching it |
| `conversation_turn_number` | The approximate turn depth of the original conversation |
| `required_artifacts`, `attachment_link` | Whether the task needs an attachment (has_image / has_file / has_attachment) and the file to upload (Dimension 4) |
| `rubric` | The predefined 3-ish binary Yes/No criteria the contributor scores at the end (Dimension 8) |
| `model_a_name`, `model_b_name`, `model_c_name` | The three assigned models. Every conversation must use its assigned model (Dimension 12) |

The 10-column rating template the contributor fills for each model, stored in `TASKATTEMPTS.RESPONSE:turns` with the model letter as a suffix (`_a`, `_b`, `_c`):

| Col | Guide name | RESPONSE field | Audited by |
|-----|-----------|----------------|-----------|
| 1 | Conversation link | `conversation_link_x` (or the Argon `Share link` acknowledgement + `trajectory_x`) | Dimension 1 |
| 2 | Overall satisfaction (1 to 5) | `overall_satisfaction_x` | Dimensions 5, 7 |
| 3 | Issues (1 to 3 L2 sub-dimensions) | `issue_1_x`, `issue_2_x`, `issue_3_x` | Dimension 5 |
| 4 | Detail of issues | `detail_of_issues_x` | Dimensions 5, 6 |
| 5 | Turns where the issues occurred | `turns_where_issues_occurred_x` | Dimension 6 |
| 6 | Rubric (Yes / No / N/R) | the per-criterion grade | Dimension 8 |
| 7 | Rubric justification (turns) | the per-criterion justification | Dimension 8 |
| 8 | Country fit (1 to 3) | `country_fit_x` | Dimensions 5, 13 cross-check |
| 9 | What was especially good about country fit | `country_fit_good_x` | Dimension 13 cross-check |
| 10 | What was especially bad about country fit | `country_fit_bad_x` | Dimension 13 cross-check |

Plus the per-model evidence uploads `model_check_x` (the Model Check screenshot, Dimension 12), `trajectory_x` (the AI Exporter trajectory JSON), and `artifacts_x` (the artifacts zip, named `model_x_turn#_file#` or a zip with `no_artifacts.txt`). Plus the attachment fields `field_2` (Attachments needed?) and `attachments`. And the ranking block: `rank_1_best`, `rank_2_middle`, `rank_3_worst`, `tie_breaker_used`, `ranking_justification` (Dimensions 9 to 11). The `Guide` section 3 names six ranking fields, including a Rubric guardrail; the deployed form stores the five above and captures the Rubric guardrail selection within the Ranking Justification rather than as a separate field.

Country fit (Columns 8 to 10) is not one of the 13 scored dimensions, but it is read as a cross-check for Dimension 13: when Language and locale fit is logged in the issues, Country fit must be 2 or 3 and the bad-note must describe the problem.

## The Issue Taxonomy

The heart of Dimensions 5, 6, and 8 is the issue taxonomy. The contributor picks 1 to 3 L2 sub-dimensions (Column 3), writes one [L3 Loss Tag] per issue (Column 4), and the auditor independently re-derives the top-3 issues and compares. `IssueMatching_Guide.md` is the companion to this, with the matching procedure and worked bad-and-good pairs.

- L1 (dimension) is the broad area. There are 4: Understanding and Alignment, Execution and Outcome, Communication and Collaboration, Trustworthiness Safety and Privacy. The contributor never picks an L1.
- L2 (sub-dimension) is the part of the experience that went wrong. There are 15. Column 3 carries 1 to 3 of them, ranked by impact. Two issues may share an L1 but never the same L2.
- L3 (loss tag) is the exact mistake inside that L2. Column 4 carries one [L3 Loss Tag] per issue, brackets included, copied exactly from the taxonomy. Every L2 also has an [Other] tag, used only when no other tag fits.

The 15 L2 sub-dimensions, by L1:

| L1 dimension | L2 sub-dimensions |
|--------------|-------------------|
| 1. Understanding and Alignment | Multi-turn and short-term memory; Personal utility and relevance; Instruction following |
| 2. Execution and Outcome | Tool and connector reliability; Informativeness; Deliverable quality; Action completion |
| 3. Communication and Collaboration | Digestibility; Clarifications and check-ins; Proactive offers; Style and Tone; Emotional intelligence; Language and locale fit |
| 4. Trustworthiness, Safety and Privacy | Factuality and Grounding; Safety and Privacy |

The full L3 tag list under each L2 is in `Guide` section 6 and is reproduced in `IssueMatching_Guide.md`. Critical / unrecoverable failures (always Issue #1, satisfaction 3 or lower): [Action dishonesty], [Placeholder passed as real], [Source faithfulness & hallucination] in anything the user acts on, [Data privacy breach / data protection], and an unauthorized irreversible action.

## The Models

Final validation runs on three assigned models per task, read from `model_a_name`, `model_b_name`, and `model_c_name`. Beehive uses the default thinking mode on each: ChatGPT on Light, Fable on Medium. A model run in any other mode is not valid for the task. The three families in the table below are the ones the Guide names; the actual assigned models vary per task and are whatever `model_a_name`, `model_b_name`, and `model_c_name` give (the Guide's account setup also references Claude).

| Model family | Thinking mode | Notes |
|--------------|---------------|-------|
| ChatGPT | Light (default) | Shareable conversation link expected |
| Fable | Medium (default) | Shareable conversation link expected |
| Gemini 4 Prod (Argon Task) | Task mode | Task mode cannot produce a shareable link; the trajectory JSON stands in for the link (Dimension 1 Argon exception) |

The Model Check screenshot (`model_check_x`) shows the initial prompt with the model setting visible, and is how Dimension 12 confirms the model used is the assigned one. Where there is no screenshot of the model settings, Dimension 12 defaults to No Issues per `QCSpec`.

## Redash Grounding

The project data lives in Snowflake, reachable through Redash (GenAI Ops, data source 30). Use it to confirm an item's assignment and the contributor's recorded answers when the task export is ambiguous, and to settle Dimension 12 model assignment and Dimension 3 prompt consistency against the stored values. The client in `../../redash setup/` reads credentials from `~/CXX/env/.env`.

| What | Where |
|------|-------|
| Project | `PUBLIC.PROJECTS`, `_ID = '6ae1115bd103bdba12c06461'` |
| Tasks | `PUBLIC.TASKS`, `PROJECT = '6ae1115bd103bdba12c06461'`; the assignment is in `METADATA` |
| Attempts | `PUBLIC.TASKATTEMPTS`, `TASK = <task id>`; the contributor's answers are inline JSON in `RESPONSE`, under `turns` (the filled values) and `dataSourceResults` (the form definition, field titles, and dropdown choices) |
| The assignment | `TASKS.METADATA`: `surface`, `languageCode`, `initial_prompt_native`, `next_steps_native`, `user_goal_native`, `conversation_turn_number`, `required_artifacts`, `rubric`, `model_a_name` / `model_b_name` / `model_c_name` |
| The ratings | `TASKATTEMPTS.RESPONSE:turns`: `overall_satisfaction_x`, `issue_1_x` to `issue_3_x`, `detail_of_issues_x`, `turns_where_issues_occurred_x`, `country_fit_x`, `rank_1_best`, `rank_2_middle`, `rank_3_worst`, `tie_breaker_used`, `ranking_justification` |

A ready query shape, substituting the task id:

```sql
SELECT t.METADATA::STRING AS assignment,
       a.RESPONSE::STRING AS ratings
FROM PUBLIC.TASKS t
LEFT JOIN PUBLIC.TASKATTEMPTS a ON a.TASK = t._ID
  AND a.ATTEMPTED_AT = (SELECT MAX(x.ATTEMPTED_AT) FROM PUBLIC.TASKATTEMPTS x WHERE x.TASK = t._ID)
WHERE t._ID = '<task id>';
```

## Known Source Discrepancies

Where the sources disagree, follow the reading recorded here and say so in the report.

| Area | Discrepancy | Reading applied |
|------|------------|-----------------|
| request_language / request_country | The `Guide` names the assignment fields request_language and request_country; the stored METADATA field is a single `languageCode` (e.g., fr-FR) | They are the same assignment. Read `languageCode` as the language and country persona, and name it that way in the report |
| Models dimension notes | `QCSpec` Dimension 12 Notes for Auditors reads `#REF!`, a broken spreadsheet cell | The intent is clear from the bands: grade whether all models used match the assigned models, defaulting to No Issues when there is no screenshot of the model settings |
| Language dimension notes | `QCSpec` Dimension 13 Notes for Auditors reads `#REF!` | Grade against the bands: wrong language throughout is a Fail; part-wrong with 25 percent or more off-locale turns is a Fail; under 25 percent is a non-fail |
| Argon Task links | `QCSpec` Valid Links excludes "Argon 4 chats where there is no conversation link to share" from the non-fail; the form confirms Argon Task mode cannot share a link and collects a trajectory JSON instead | An Argon Task conversation with no link is not a link defect when the trajectory JSON is uploaded. Treat the trajectory JSON as the conversation record |
| Detail of Issues scope | `QCSpec` Formatting / Detail of Issues Notes describe attachment comparison at length, repeating Dimension 4 | Dimension 6 grades the structure and formatting of the Detail of issues field; the attachment-sameness check is owned by Dimension 4. Grade each once |
| Rubric grading field | The 10-column template names Columns 6 and 7 (Rubric and Rubric justification); the flat form export does not always surface them as a single field because the criteria are task-dynamic | Grade the rubric block per `Guide` section 9 against the criteria in `METADATA.rubric`; confirm the grades and turn justifications in the task UI or the `RESPONSE` JSON |
| Criteria Grading notes | `QCSpec` Dimension 8 Notes for Auditors describe matching the contributor's Issues #1 to #3 against the auditor's top-3, which is the Dimension 5 comparison, not a rubric-grade check | Dimension 8 grades the predefined Yes / No / N/R rubric against the final state; the issue-to-top-3 matching is scored under Dimension 5 and in `IssueMatching_Guide.md` |
| Misplaced Notes cells | `QCSpec` places a language note in the Dimension 4 (Attachments) Notes cell and a model-screenshot note in the Dimension 2 (Next Steps) Notes cell | Read the language note under Dimension 13 and the screenshot note under Dimension 12, where they belong; grade each nuance once |
| Ranking fields | `Guide` section 3 names six ranking fields including a Rubric guardrail; the deployed form stores five (`rank_1_best`, `rank_2_middle`, `rank_3_worst`, `tie_breaker_used`, `ranking_justification`) | Grade all six requirements; the Rubric guardrail selection and its exception are read from the Ranking Justification, not a separate field |
| Model roster | `Guide` account setup names Claude Max and ChatGPT Plus, its thinking-mode box names ChatGPT (Light) and Fable (Medium), and its worked examples use Gemini / Argon | The assigned models are whatever `model_a_name`, `model_b_name`, and `model_c_name` give; grade the default thinking mode where visible (ChatGPT Light, Fable Medium) |
| Taxonomy punctuation | `Guide` section 6 writes some L1 and L2 names with an ampersand (e.g. Factuality & Grounding, Style & Tone) | L1 and L2 names are normalized to "and" in prose; every bracketed [L3 Loss Tag] is quoted verbatim with its original `&` and `/` so the string-match in Dimensions 5 and 6 holds |

## Calibrate Before You Audit

Read four things in full before running this evaluation for the first time.

1. `Guide` sections 3 to 11, the 10-column template, overall satisfaction, the taxonomy, the Detail of issues format, rubric scoring, country fit, and ranking, end to end. Transfer the shape, never the content.
2. `Guide` section 6, the whole issue taxonomy, and `IssueMatching_Guide.md`, because the costliest rejections on this project are a wrong or missing L2 / L3 issue (Dimension 5) and a rubric grade contradicted by the conversation (Dimension 8).
3. `Guide` section 11 and the ranking tie-breaker flowchart, because the ranking dimensions (9 to 11) turn on the tie order and the rubric guardrail.
4. `Guide` section 12, the 4 rated examples, as the concrete calibration anchor for a clean rating at each satisfaction band.

Four calibration points prevent false rejections.

1. The auditor must re-run the judgment, not re-run the chat. Open every conversation link (or the trajectory JSON), read it end to end, and form an independent satisfaction score, issue list, rubric grade, and ranking before reading the contributor's. A rating audited by reading the contributor's answer first is anchored to that answer.
2. A first-person prompt that reuses a next step's wording is fine; the Guide's own examples do exactly that. Only pasting the third-person "The user might..." text counts as a Dimension 2 fail.
3. The rubric is scored on the final state. A model that got something wrong mid-conversation and fixed it by the end passes that criterion (Yes), unless the criterion checks a conversation-wide prohibition. The friction belongs in satisfaction and the issues, not in the rubric grade.
4. Not every disagreement is a defect. Dimension 7 allows one minor (one-point) disagreement, and Dimension 8 allows a genuinely debatable grade difference as a non-fail, not a fail. Reserve the Fail band for real contradictions.

## Scope

This evaluation runs on every shipped Beehive rating task. Grading scope follows the SLA's own splits.

| Dimension group | Graded against | Not graded against |
|-----------------|----------------|--------------------|
| 1, 2, 4, 12, User Input and Conversation and Models | The three conversations, their links, the next_steps roadmap, the attachments, and the Model Check screenshots | The ratings. A conversation is not penalized for how it was scored |
| 3, 13, Prompt and Prompts | The opening prompt against initial_prompt_native, and the language and locale of every turn | The content quality of the model's replies |
| 5, 6, 7, Rating and Formatting | The contributor's issues, Detail lines, Turns, and satisfaction scores against the auditor's independent read | The rubric grades, owned by 8; the ranking, owned by 9 to 11 |
| 8, Rubric | The contributor's Yes / No / N/R grades and turn justifications against the final state | The satisfaction scores, owned by 5 and 7 |
| 9, 10, 11, SxSxS | The contributor's ranking against the auditor's ranking and the contributor's own satisfaction scores | The per-model ratings, read in 5 to 8 |

Two scope rules invert the usual instinct. The rubric is graded on the final state, so a model that erred and recovered still passes the criterion. And the ranking is graded against the contributor's own satisfaction scores, so a ranking that contradicts them without explanation fails Dimension 10 even when the auditor would have ranked the same way.

## Evaluation Process

Each step uses the corresponding file in this folder.

Step 1. Open the task and record the assignment: surface, languageCode, the has_image / has_file / has_attachment flags, user_goal, initial_prompt_native, next_steps_native, conversation_turn_number, the rubric, and the three assigned model names. Record the artifact set: the three conversation links (or Argon acknowledgements and trajectory JSONs), the Model Check screenshots, the per-model ratings, and the ranking block.

Step 1a. Run `LinterSweep.md`. It settles by command or a single look what would otherwise cost reading time, and it closes the count-settled and presence-settled rows. Carry the open linter IDs into the steps below.

Step 2. Run the trajectory audit using `TrajectoryAudit.md`. Dimensions 1, 2, 4, and 12, against the three conversations and their evidence. This runs first because every rating downstream is only as valid as the conversation it grades.

Step 3. Run the prompt audit using `PromptAudit.md`. Dimensions 3 and 13, against the opening prompts and the language of every turn.

Step 4. Run the rating audit using `RatingAudit.md`. Dimensions 5, 6, and 7, against the contributor's issues, Detail lines, and satisfaction scores, using the auditor's independent read.

Step 5. Run the rubric audit using `RubricAudit.md`. Dimension 8, against the final state of each conversation.

Step 6. Run the ranking audit using `RankingAudit.md`. Dimensions 9, 10, and 11, against the auditor's ranking and the contributor's own satisfaction scores.

Step 7. Write the report using `EvalReport.md`. For every dimension record the verdict. If any dimension is below excellence, the task is rejected with each specific error and its fix, written per `FeedbackGuide.md`.

Step 8. Return the completed report.

The order matters in three places. `TrajectoryAudit.md` runs first of the deep audits because a conversation that skipped next steps, used the wrong model, or is missing its link makes every rating downstream suspect. `RatingAudit.md` runs before `RubricAudit.md` because the satisfaction score and the issues are formed before the rubric is scored, exactly as the Guide instructs the contributor to work. `RankingAudit.md` runs last because the ranking reads off the satisfaction scores and the rubric grades that the earlier audits settle.

## Files in This Folder

| File | Purpose |
|------|---------|
| `README.md` | This file. Overview, the shipped artifact, the excellence standard, the 13-dimension map, the Beehive task model, the issue taxonomy, the models, Redash grounding, source readings, and process |
| `LinterSweep.md` | The mechanical pre-audit sweep, with the standing register of linter IDs |
| `EvalChecklist.md` | The dimension by dimension checklist with excellence standards, reject triggers, and fixes, plus the error category lookup and the summary template |
| `TrajectoryAudit.md` | Deep audit of the three conversations: Valid Links (1), Next Steps and Natural Flow (2), Attachments (4), and Models (12) |
| `PromptAudit.md` | Deep audit of the opening prompts and the language: Pre-seeded and Opening Prompts Consistency (3) and Language and Localization (13) |
| `RatingAudit.md` | Deep audit of the per-model rating: Issues Identified and Ranked (5), Detail of Issues (6), and Correctness/Accuracy - Major Rating (7) |
| `RubricAudit.md` | Deep audit of the rubric grading: Criteria Grading Agreement (8) |
| `RankingAudit.md` | Deep audit of the SxSxS ranking: Ranking Disagreement (9), Inconsistent Ranking (10), and Verdict (11) |
| `IssueMatching_Guide.md` | Companion to Dimensions 5 and 8: the independent re-derivation of the top-3 issues, the L2 / L3 matching rules, the disambiguation guide, and worked bad-and-good pairs |
| `FeedbackGuide.md` | How to write rejection feedback the author can act on immediately |
| `EvalReport.md` | Template for recording the evaluation of a specific task |

## Grading Philosophy

Grade to the lowest dimension. If one dimension is below excellence, the whole task is below excellence.

Grade to the worst model. Dimensions 1 to 6, 8, 12, and 13 are read per conversation, and the worst of the three decides the band. Name the model.

Form your own answer first. Every rating dimension is audited by re-deriving the judgment independently, from the conversation, before reading the contributor's answer. Open every link, read every turn, and write your own satisfaction score, issue list, rubric grade, and ranking down first.

Grade the part you were told to grade. The issues are graded against the conversation, the rubric against the final state, the ranking against the satisfaction scores. A satisfaction disagreement is Dimension 7, a rubric disagreement is Dimension 8, and a ranking disagreement is Dimension 9; do not double-count one miss across rows that do not own it.

Count before you conclude. Dimensions 7, 9, and the disagreement tallies are arithmetic. Write the major-disagreement count, the minor-disagreement count, and how many spots a model moved.

Point at a record or drop the finding. Every rejection names an anchor: a conversation link, a turn number, an issue line with its [L3 Loss Tag], a rubric criterion with its grade, a satisfaction score with the auditor's re-score, a ranking slot, or the Model Check screenshot.

Never round up. A single minor satisfaction disagreement is a clean 5 on Dimension 7, but a second one is a Non-Fail 3; record the true band and reject either way.

Where the sources disagree, follow the reading in Known Source Discrepancies and say so in the report.
