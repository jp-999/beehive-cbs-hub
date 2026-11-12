# Trajectory Audit

> Reference: `README.md` for the 13-dimension map, the Beehive task model, the models, Redash grounding, and the source readings; `EvalChecklist.md` for the trigger index and the verbatim bracketed categories; `LinterSweep.md` for the mechanical pre-pass carried here as L2, L3, L4, L5, L17, L30, L31, L32, and L33; `PromptAudit.md` for the opener and the graded locale this file does not grade; `RatingAudit.md`, `RubricAudit.md`, and `RankingAudit.md` for the issues, rubric, and ranking this file does not read.

The artifact this file audits is the three conversations and their evidence. The same real-world scenario is carried through a natural multi-turn conversation against the three assigned models (Model A, Model B, Model C) in the assigned language and country, and each slot ships a Model Check screenshot (`model_check_x`), a conversation link (`conversation_link_x`, or an Argon Task acknowledgement), a trajectory JSON (`trajectory_x`), and an artifacts zip (`artifacts_x`, named `model_x_turn#_file#` or a zip with `no_artifacts.txt`). This file owns four dimensions: Valid Links (1), Next Steps and Natural Flow (2), Attachments Uploaded Before Use (4), and Models (12).

This file runs first of the deep audits (`README.md`, Step 2), ahead of `PromptAudit.md`, `RatingAudit.md`, `RubricAudit.md`, and `RankingAudit.md`. The order is load-bearing: every rating downstream is only as valid as the conversation it grades, so a conversation that is missing its link, stopped after Turn 1, skipped a required attachment, or ran on the wrong model makes every satisfaction score, rubric grade, and ranking suspect. Settle the three conversations here before a single rating is read.

Two scope rules frame the whole file. First, this file judges the conversation for setup and validity, never for rating quality: whether the model's replies were good, whether the satisfaction score is right, and whether the rubric grade holds are `RatingAudit.md` and `RubricAudit.md` territory, not here. Second, every dimension here is read per conversation, so grade to the worst model: if Model B skipped two next steps while A and C are clean, Dimension 2 is a Fail for the whole task. Name the model on every finding, carry the open linter IDs from `LinterSweep.md` into this read and into the summary, count before you conclude, and write a justification on every sub-5 finding because a bare score is incomplete. Point at a record or drop the finding.

## Calibration Before You Read the Conversations

Four guards prevent a false verdict.

1. Form your own read first. Open every conversation link, or the trajectory JSON where there is no link, and read every turn before you judge. Do not read the contributor's ratings first. This file grades the conversation for setup and validity, never for how it was rated: a conversation is not penalized here for its satisfaction score or its rubric grade.
2. A loose first-person prompt is fine. A prompt that reuses a next step's wording in the first person is exactly what the Guide's own examples do (`Guide` sections 2 and 12). Only pasting the third-person "The user might..." text verbatim as a prompt is the Dimension 2 fail. A single next step may take several turns and may be adapted to what the model actually said.
3. Argon has no link by design. A Gemini 4 Prod (Argon Task) chat runs in Task mode and cannot produce a shareable link; its trajectory JSON is the conversation record. An Argon slot with no link is `[No Issues]` on Dimension 1, never a link defect (`README.md` Known Source Discrepancies, Argon Task links).
4. The non-fail band is still a Reject. A Score 3 to 4 does not fail the SLA, but it still drops the task off a clean score, so it is a Reject here. Record the true band anyway, `[Fail - ...]` at Score 2 or `[Non-Fail - ...]` at Score 3, because the band carries the feedback severity and the real SLA outcome.

## Validity Gates and Reading in Order

The four owned dimensions are only as valid as the conversation that produced them, so three validity gates settle first, plus the Redo gate. None of them maps to a scored dimension: a failed gate voids that conversation and routes it to re-run, and the dimensions below are not read on a void conversation. Carry each open gate into the report as a validity finding.

The three assigned model families and what each is expected to ship:

| Model family | Default thinking mode | Link expectation |
|--------------|-----------------------|------------------|
| ChatGPT | Light | Shareable conversation link expected |
| Fable | Medium | Shareable conversation link expected |
| Gemini 4 Prod (Argon Task) | Task mode | Cannot share a link by design; the trajectory JSON stands in for the link (Dimension 1 Argon exception) |

The slot letter (A, B, C) is independent of the family: any of `model_a_name`, `model_b_name`, `model_c_name` may be the Argon model, so read each slot's family from its assigned name before applying the Argon exception.

| Validity gate | What it requires | Void signal | Linter |
|---------------|------------------|-------------|--------|
| Model proof | A legible Model Check screenshot taken before the run that clearly shows the assigned model with the setting visible | A missing, illegible, or post-run screenshot, or one that does not show the model with its setting | L30 |
| Locale not fully off-language | The conversation is held in the assigned `languageCode` | A conversation run fully in another language | L31 |
| Thinking mode default | The default mode where visible: ChatGPT Light, Fable Medium | A visible non-default thinking mode | L32 |
| Resubmission changed (Redo lane only) | Every previously flagged field actually changed against the prior attempt | A Redo where a previously flagged field is unchanged | L33 |

Read in this fixed order so a corrupt input cannot leak into a dimension.

1. Settle the gates for each of A, B, and C first. Model proof (L30) is by the project's own instructions the most common re-run trigger, so settle it first; a missing or illegible screenshot voids the conversation and routes to re-run. A fully off-language run (L31) or a visible non-default thinking mode (L32) also voids the conversation, because a model run in any other mode is not valid for the task (`Guide` section 2). A Redo with an unchanged flagged field (L33) is a reject. The graded locale read, the under or over 25 percent off-locale turns, is `PromptAudit.md` Dimension 13 (L18), not a gate here; only the fully off-language case voids here.
2. Dimension 1 next. Open each conversation link in a clean, logged-out session, or confirm the Argon slot's trajectory JSON stands in, and confirm the record is a valid shareable conversation.
3. Dimension 2 next. Map `next_steps_native` onto the turns of each conversation and count steps covered against steps skipped.
4. Dimension 4 next. Confirm the three conversations carry the same required attachments and that each arrives before or with the prompt that needs it.
5. Dimension 12 last. Confirm each slot's Model Check screenshot shows the assigned model with the default thinking mode.

Grade to the worst model across A, B, and C on every dimension, and record which model drove each finding, because the author fixes a specific conversation, not an abstraction. Count before you conclude. Point at a record or drop the finding.

## Section 1: Valid Links, Dimension 1

Source: `QCSpec` User Input / Valid Links. `EvalChecklist.md` Dimension 1. `LinterSweep.md` L3, L4.

### Excellence Standard

The task contains valid conversation links for all three models. An Argon Task chat that cannot be shared is covered by its uploaded trajectory JSON.

### How to Audit

1. For each slot A, B, and C, read the assigned family from `model_x_name`. A ChatGPT or Fable slot is expected to carry a shareable conversation link; a Gemini 4 Prod (Argon Task) slot cannot share a link and is covered by `trajectory_x`.
2. Open each non-Argon slot's `conversation_link_x` in a clean, logged-out session. Confirm it loads the whole multi-turn conversation, not Turn 1 alone and not an error page, and that it is a shareable URL, not a private address-bar URL copied from the running session (L3).
3. Where a slot's link is missing or does not open, check whether `trajectory_x` was uploaded (L4, L20). A broken or missing link with a trajectory JSON is 1.2; a broken or missing link with no trajectory JSON, and not an Argon acknowledgement, is 1.1.
4. For the Argon slot, confirm `trajectory_x` is present and stands in for the link. No link is expected, so this is `[No Issues]`, never a link defect.
5. Read the conversation you just opened, or the Argon trajectory JSON, end to end now. Dimensions 2, 4, and 12 are all read off this same record, so form your own read of every turn before judging any of them.

### Reject Triggers

1.1 Any of the conversation links are invalid or missing and the contributor did not upload the conversation as a trajectory JSON.
Fix: Add a valid shareable link for every model, or upload the conversation as a trajectory JSON. `[Fail - Missing/Invalid Links]`. Score 2.

1.2 Any of the conversation links are invalid or missing but the contributor uploaded the conversation as a trajectory JSON. This does not include Argon Task chats where there is no conversation link to share, which are `[No Issues]`.
Fix: Replace the broken link with a valid shareable one so the link and the JSON agree. `[Non-Fail - Missing/Invalid Link]`. Score 3.

### Drill: The Three-Link Open

1. Build one row per slot: `model_x_name`, family, link present, link opens whole chat, trajectory JSON present.
2. Open each non-Argon link logged out. Mark it opens the whole conversation, opens Turn 1 only, is an address-bar URL, or does not open at all.
3. Classify each slot. Valid shareable link opens is `[No Issues]`. Broken or missing link with a JSON is 1.2. Broken or missing link with no JSON, non-Argon, is 1.1. Argon slot with no link but a JSON is `[No Issues]`.
4. Grade to the worst model. One 1.1 slot fails the whole dimension; one 1.2 slot with no 1.1 holds it at the Non-Fail band. Anchor the finding: "Model B link `fable.app/share/...` opens Turn 1 only, trajectory_b uploaded, so 1.2 Non-Fail; Model C is the Argon slot with no link and trajectory_c present, No Issues."

### Notes

L3 catches a link that is empty or an address-bar URL; L4 catches a missing link with no JSON that is not an Argon acknowledgement. The trajectory JSON is a separate submission requirement for every run (L20), so a present JSON does not by itself make a link valid: a broken ChatGPT or Fable link with a JSON is still 1.2, a Reject, because the shareable link should open. Note the verbatim category split, Links plural in the Fail band and Link singular in the Non-Fail band. Point at a record or drop the finding: name the slot and paste the link that failed to open.

## Section 2: Next Steps and Natural Flow, Dimension 2

Source: `QCSpec` Conversation / Next Steps and Natural Flow. `EvalChecklist.md` Dimension 2.

### Excellence Standard

Every conversation covers every next step with natural, first-person prompts that react to the model's replies.

### How to Audit

1. Read `next_steps_native` and count the N numbered steps. This is the conversation roadmap, written third person ("The user might...").
2. For each conversation A, B, and C, read every user turn and map it to the step it advances. Turn 1 is the opener (graded in `PromptAudit.md` Dimension 3); every later user turn advances one of the N steps. A step may span several turns, and one turn may finish a step and open the next.
3. Count steps covered against steps skipped per conversation. The user stopping after Turn 1, or two or more skipped steps, is 2.1. Exactly one skipped step is 2.2.
4. Check for a third-person paste: a user turn that sends the "The user might..." text verbatim as a prompt is 2.1, even when the wording started from a real step.
5. Check reactivity: a user turn that ignores the model's reply, a question the model asked, information it needed to continue, or a refusal or misunderstanding, and moves on regardless, is 2.2.

### Reject Triggers

2.1 In any conversation, the user stops after Turn 1, skips 2 or more next steps, or sends the third-person next-steps text as a prompt.
Fix: Re-run the conversation covering every next step with natural first-person prompts. `[Fail - Next Steps Not Followed]`. Score 2.

2.2 A conversation skips one next step, or a user turn ignores the model's reply (a question it asked, information it needed, or a refusal or misunderstanding) and moves on regardless.
Fix: Cover the skipped step, or react to the model's reply before moving on. `[Non-Fail - Unnatural Flow]`. Score 3.

### Drill: The Steps-to-Turns Map

Run this once per conversation, naming the model.

1. List the N numbered steps from `next_steps_native` as S1 to SN.
2. Walk the user turns T1 to Tm. T1 is the opener. Assign every later user turn to the step it advances; one step may span several turns, and one turn may close one step and open the next.
3. Mark each step Covered (with its turns) or Skipped.
4. Count. Covered k of N. If k equals N and every user turn reacted to the model, the conversation is Excellence on this dimension. One Skipped step is 2.2. Two or more Skipped, or the user stopped after T1, is 2.1.
5. Anchor the finding and count before you conclude: "Model A covered S1 (T1), S2 (T2 to T4), S4 (T5), and skipped S3, the ask for the unsent draft. Covered 3 of 4, one skip, 2.2 Non-Fail." Grade to the worst model: if Model B stopped after T1 while A and C covered every step, Dimension 2 is a Fail for the task.

### Notes

A first-person prompt that reuses a step's wording is fine; the Guide's own worked examples do exactly that (`Guide` sections 2 and 12). Only pasting the third-person text is the 2.1 fail. A step may take several turns and may be adapted to what the model said, so count steps, not turns. Not following up on an answer that looks right but is wrong is `RatingAudit.md` Dimension 7 or `RubricAudit.md` Dimension 8, not here. Whether the turns were in the assigned language is `PromptAudit.md` Dimension 13, not here. Name the model on every finding. Point at a record or drop the finding.

## Section 3: Attachments Uploaded Before Use, Dimension 4

Source: `QCSpec` Conversation / Attachments Uploaded Before Use. `EvalChecklist.md` Dimension 4. `LinterSweep.md` L5.

### Excellence Standard

Where the task requires an attachment (`has_image`, `has_file`, or `has_attachment` is True, or any conversation contains an upload), all three conversations contain the same attachments, every required attachment is uploaded or the workspace account connected, and each arrives before or with the prompt that needs it. Where no attachment is required and none appears, the dimension is `[No Issues]`.

### How to Audit

1. Decide whether the task requires an attachment: read `required_artifacts` for `has_image`, `has_file`, or `has_attachment` True, and scan the three conversations for any upload (L5). If none is required and none appears, the dimension is `[No Issues]`; stop here.
2. Fix the required set from `attachment_link` and the `attachments` field: the file or files that must appear, or the workspace account (Drive, Gmail, Calendar) that must be connected.
3. For each conversation A, B, and C, list what was uploaded, comparing by file name. Where a site shows no name (only "image"), compare by kind and count and confirm on the live links.
4. Confirm all three conversations carry the same attachments. A file uploaded in one conversation but missing from another, so that at least 2 of 3 do not match, is 4.1.
5. Confirm each attachment arrives before or with the prompt that needs it. If all three carry the same set but at least one uploads it after the prompt that needed it, that is 4.2.
6. For `has_attachment`, a connected workspace account shown as connector use counts in place of an upload; confirm the connector was in place before the prompt that needed it. A conversation that never uploads the required file and never connects the required account is 4.1.

### Reject Triggers

4.1 The task requires an attachment and at least one conversation never uploads it (or never connects the required workspace account), or at least 2 of 3 conversations do not contain the same attachments (a file uploaded in one conversation is missing from another).
Fix: Upload the same required attachments in all three conversations, or connect the required workspace account. `[Fail - Missing Attachment]`. Score 2.

4.2 All three conversations contain the same required attachments, but in at least one the attachment arrives after the prompt that needed it.
Fix: Upload the attachment before or with the prompt that needs it. `[Non-Fail - Late Attachment]`. Score 3.

### Drill: The Sameness Grid

1. Build a grid: one row per required or observed attachment (by file name, or by kind and count where there is no name), and columns A, B, C.
2. In each cell, mark the attachment present (with the turn it arrived) or missing.
3. Read the rows for sameness: every row should be present in all three columns. A row present in one column and missing in two, or any row that leaves 2 of 3 conversations without the same set, is 4.1.
4. Add an order check per present cell: did the attachment arrive before or with the prompt that needed it? Any late arrival, with sameness otherwise intact, is 4.2.
5. Count and anchor: "image_floorplan.png present in A (T1), B (T1), C (T2), same set across all three; in C it arrived at T2 after the T1 prompt that needed it, so 4.2 Non-Fail." Count before you conclude.

### Notes

Compare attachments by file name; where a site shows no name, compare by kind and count and confirm on the live links. `has_image` needs an image upload, `has_file` needs a file upload, and `has_attachment` needs an upload or a connected workspace account shown as connector use. Whether the model used the attachment correctly is `RubricAudit.md` Dimension 8 and the issues in `RatingAudit.md`, not here. Grade the attachment set once here: the `QCSpec` Detail of Issues notes repeat the attachment comparison, but Dimension 6 grades the formatting of the Detail field while this dimension grades the attachments (`README.md` Known Source Discrepancies, Detail of Issues scope). Grade to the worst model and name it. Point at a record or drop the finding.

## Section 4: Models, Dimension 12

Source: `QCSpec` Models / Models. `EvalChecklist.md` Dimension 12. `LinterSweep.md` L2, L17, L30, L32. `QCSpec` Notes reads `#REF!`; see `README.md` Known Source Discrepancies.

### Excellence Standard

All models used were the assigned models (`model_a_name`, `model_b_name`, `model_c_name`). Where there is no screenshot of the model settings, the dimension defaults to `[No Issues]`.

### How to Audit

1. For each slot A, B, and C, read the assigned model from `model_a_name`, `model_b_name`, and `model_c_name` (L2 confirms the assignment is set; a blank name makes the slot un-gradeable).
2. Open the Model Check screenshot `model_check_x`. Confirm it shows the model used with the initial prompt and the model setting visible.
3. Compare the model shown against the assigned `model_x_name` for that slot. A model that is not the assigned one is 12.1 (L17).
4. Confirm the default thinking mode where visible: ChatGPT Light, Fable Medium (L32). A visible non-default mode voids the conversation as a validity gate and routes to re-run, because a model run in any other mode is not valid for the task (`Guide` section 2).
5. Where there is no screenshot of the model settings, the scored dimension defaults to `[No Issues]` per `QCSpec`. The absence of proof is still a validity finding: a missing or illegible screenshot opens L30 and routes the conversation to re-run, so the task does not ship on a defaulted No Issues.

### Reject Triggers

12.1 One or more models used were not the assigned models.
Fix: Re-run the conversation on the assigned model for that slot. `[Fail - Models]`. Score 2.

### Drill: The Slot-to-Screenshot Match

1. Build one row per slot: assigned `model_x_name`, model shown in `model_check_x`, thinking mode visible, match (yes or no).
2. Settle model proof first (L30): if the screenshot is missing, illegible, or post-run, the slot's proof is weak; route the conversation to re-run and note the scored dimension defaults to No Issues only on the absence of evidence.
3. For each legible screenshot, mark whether the model matches the assigned name and whether the thinking mode is the default (ChatGPT Light, Fable Medium).
4. Count the slots that match. Any slot on a non-assigned model is 12.1, a Fail; grade to the worst model, so one wrong slot fails the dimension for the task.
5. Anchor the finding: "Model A assigned ChatGPT, screenshot shows ChatGPT on Light, match; Model B assigned Fable, screenshot shows Fable on Medium, match; Model C assigned Gemini 4 Prod (Argon Task), screenshot shows Gemini 4 Prod in Task mode, match. No 12.1."

### Notes

No non-fail band: Dimension 12 is a 5 or a Fail. Confirm the model in the Model Check screenshot against the assigned `model_x_name` for each slot. Default thinking mode must be used where visible (ChatGPT Light, Fable Medium; L32), and a visible non-default mode voids the conversation to re-run. The `QCSpec` Notes cell for this dimension reads `#REF!`, a broken spreadsheet cell; the reading applied is in `README.md` Known Source Discrepancies, grade whether all models used match the assigned models and default to No Issues when there is no screenshot of the model settings. L17 and L30 together, a missing or illegible Model Check screenshot, are one model-proof signature, not two findings (`LinterSweep.md`). Point at a record or drop the finding: name the slot and the model the screenshot actually shows.

## The Trajectory-to-Downstream Handoff

A trajectory finding is settled in the conversation, by re-run or by a fixed upload, before the ratings are trusted, because this audit runs first and every downstream audit reads the conversation it clears. Route each finding to its owner.

| Trajectory finding | Routes to |
|--------------------|-----------|
| A fully off-language run (L31), weak model proof (L30), or a visible non-default thinking mode (L32) | Void the conversation and re-run on the assigned model, default mode, and assigned locale; the dimensions are not read until the re-run lands |
| A Redo with a previously flagged field unchanged (L33) | Reject the resubmission; the prior finding was not addressed |
| Wrong model in a slot (Dimension 12.1) | Re-run that slot's conversation on the assigned `model_x_name` |
| Missing or invalid link with no trajectory JSON (Dimension 1.1) | Add a valid shareable link, or upload the conversation as a trajectory JSON |
| Missing or invalid link covered by a trajectory JSON (Dimension 1.2) | Replace the broken link with a valid shareable one so the link and the JSON agree |
| Next steps not followed, stopped after Turn 1, or a third-person paste (Dimension 2.1 / 2.2) | Re-run the conversation covering every next step with natural first-person prompts |
| Missing or mismatched or late attachment (Dimension 4.1 / 4.2) | Upload the same required attachments in all three conversations before the prompt that needs them, or connect the workspace account |
| The opener does not match `initial_prompt_native` | `PromptAudit.md` Dimension 3 |
| Off-locale turns under the void threshold | `PromptAudit.md` Dimension 13 |
| Whether the model used the attachment correctly | `RubricAudit.md` Dimension 8 and the issues in `RatingAudit.md` |
| A valid conversation ready to grade | `RatingAudit.md`, `RubricAudit.md`, and `RankingAudit.md` read the issues, rubric, and ranking |

## Audit Summary Template

```
Trajectory Audit - Task [id]                          Verdict: [Excellence / Reject]
Locale: [languageCode, e.g. fr-FR]   Surface: [Web / Mobile]   Turn target: [n]
Assigned models: A [model_a_name]  B [model_b_name]  C [model_c_name]

Validity gates (settle before reading the dimensions; any fail voids that conversation)
  Model proof (L30): legible, pre-run, assigned model + setting visible   A [y/n]  B [y/n]  C [y/n]
  Locale not fully off-language (L31)                                     A [y/n]  B [y/n]  C [y/n]
  Thinking mode default where visible, ChatGPT Light / Fable Medium (L32) A [y/n]  B [y/n]  C [y/n]
  Redo: every previously flagged field changed (L33, Redo lane only)      [n-a / yes / no]
  Conversation valid? (any no voids it -> re-run)                         A [valid/void]  B [valid/void]  C [valid/void]

Dimensions (quote the bracketed category on any sub-5; name the model; grade to the worst model)
   1  Valid Links                  A [Pass/Reject]  B [Pass/Reject]  C [Pass/Reject]
        - link opens whole chat? / Argon JSON stands in?   [Fail - Missing/Invalid Links] / [Non-Fail - Missing/Invalid Link]
   2  Next Steps and Natural Flow  A [Pass/Reject]  B [Pass/Reject]  C [Pass/Reject]
        - steps covered [k]/[N] per model, skips named     [Fail - Next Steps Not Followed] / [Non-Fail - Unnatural Flow]
   4  Attachments Uploaded         [Pass/Reject]
        - required? [y/n]  same across A/B/C? [y/n]  before use? [y/n]   [Fail - Missing Attachment] / [Non-Fail - Late Attachment]
  12  Models                       A [Pass/Reject]  B [Pass/Reject]  C [Pass/Reject]
        - screenshot shows assigned model + default mode?               [Fail - Models]  (no non-fail band)

Open linter IDs carried in: [L2, L3, L4, L5, L17, L30, L31, L32, L33 / none]
Downstream routes opened: [PromptAudit 3 / PromptAudit 13 / RatingAudit / RubricAudit 8 / re-run / none]
```

Any single Reject rejects the task. Grade to the worst model. Count before you conclude. Point at a record or drop the finding.
