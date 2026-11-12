# Linter Sweep

> Reference: `README.md` for the dimension map and source readings, `EvalChecklist.md` for the trigger index and the bracketed categories this file quotes. The deep audits carry the open IDs this sweep produces. QC Spec v9.25.26.

The mechanical pass that runs before any judgment dimension, Step 1a in `README.md`. It settles by a command or a single look what would otherwise cost reading time, and it closes the count-settled and presence-settled no-middle-band rows on its own: every per-model rating field is present, every satisfaction is in 1 to 5, the ranking is a permutation of A, B, C, and the auditor text is plain ASCII, all decided before a single conversation is opened.

Each linter ID is stable. A report cites the open IDs as a list, and each deep audit picks up the IDs that touch its dimensions. An ID a command cannot settle is marked OPEN and carried into the reading, not closed on a guess.

Two project facts drive half this sweep. The task is three conversations rated in one submission, so every presence and format check runs three times, once per model, and the worst model decides the band. And the issue fields are fixed grammar: Column 3 is 1 to 3 L2 sub-dimensions, Column 4 is one `#N: [L3 Loss Tag] - explanation` line per issue, and Column 5 is one matching `#N:` turn line, so a line that does not match that shape, or a tag that does not string-match the taxonomy, is a mechanical flag caught here before the reading.

## Register

| ID | Linter | Dimension | Band |
|----|--------|-----------|------|
| L1 | A required rating field is missing for a model: conversation link, overall satisfaction, issues, Detail of issues, Turns, a rubric grade, or Country fit; or a ranking field is missing | submission | requirement |
| L2 | The assignment is blank: `surface`, `languageCode`, or any of `model_a_name` / `model_b_name` / `model_c_name` not set | 12 | requirement |
| L3 | A model's conversation link is empty, or is not a shareable URL (an address-bar or private link) | 1 | verify to close |
| L4 | A model's link is missing and no trajectory JSON was uploaded, and it is not an Argon Task acknowledgement | 1 | 2, verify to close |
| L5 | `required_artifacts` or a has_image / has_file / has_attachment flag is True but the `attachments` field is empty, or the three conversations do not carry the same uploaded files | 4 | 2, verify to close |
| L6 | An `overall_satisfaction_x` is not an integer 1 to 5 | 7 | 2 |
| L7 | A conversation's opening turn does not string-match `initial_prompt_native` | 3 | verify to close |
| L8 | A `detail_of_issues_x` line does not start with `#N: [L3 Loss Tag] -`, or the number of Detail lines does not equal the number of L2 issues in Column 3 | 6 | 2, verify to close |
| L9 | An `issue_x` value is not one of the 15 L2 sub-dimension names, or a bracketed tag in Detail is not a verbatim [L3 Loss Tag] from the taxonomy | 5 | verify to close |
| L10 | The `turns_where_issues_occurred_x` lines do not match the Detail issue lines one-to-one, or are not N/A when satisfaction is 5 | 6 | 2 |
| L11 | Issue count contradicts satisfaction: satisfaction 5 with issues listed (not "No issues"), or satisfaction 4 or lower with "No issues" | 5 | 2 |
| L12 | A rubric criterion has no Yes / No / N/R grade, or a graded criterion has no turn number in its justification | 8 | 2, verify to close |
| L13 | A ranking field is missing: `rank_1_best`, `rank_2_middle`, `rank_3_worst`, `tie_breaker_used`, or `ranking_justification` | 9 to 11 | requirement |
| L14 | The three ranks are not a permutation of A, B, C (a model duplicated or missing) | 9, 10 | 2 |
| L15 | The ranking contradicts the contributor's own satisfaction scores: a lower-satisfaction model is ranked above a higher-satisfaction one | 10 | 2, verify to close |
| L16 | `ranking_justification` contains no preference or tie word (prefer, best, better, stronger, over, tie, tied, equal) | 11 | 3, verify to close |
| L17 | A Model Check screenshot is missing for a model, or the model it shows does not match the assigned `model_x_name` | 12 | 2, verify to close |
| L18 | Conversation turns are not in the language of the assigned `languageCode` | 13 | 2, verify to close |
| L19 | Language and locale fit is logged as an issue but `country_fit_x` is 1, or `country_fit_bad_x` is N/A | 13 (cross-check) | verify to close |
| L20 | A model run is missing its trajectory JSON (`trajectory_x`), or its artifacts upload (`artifacts_x`: a zip, or a zip with `no_artifacts.txt`) | requirement | requirement |
| L21 | Auditor text carries an em-dash, en-dash, or emoji | auditor text | note |
| L30 | Model proof is weak: the Model Check screenshot is illegible, taken after the run, or does not clearly show the assigned model with the setting visible | validity (no scored dimension) | requirement |
| L31 | Locale mismatch: the conversation is not in the assigned language at all (a fully off-language run) | validity (re-run) | requirement |
| L32 | Thinking mode is not the default where visible: ChatGPT not on Light, or Fable not on Medium | validity (re-run) | requirement |
| L33 | A Redo resubmission where a previously flagged field was not changed | validity (reject) | requirement |

L3, L4, L5, L7, L8, L9, L12, L15, L16, L17, L18, and L19 do not fully close by command. Open them and carry them into the owning audit. L30 to L33 are validity gates: none maps to a scored dimension, so carry each into the report as a requirement or integrity finding, routed to void-and-re-run or reject as the Register says. L30, model proof, is by the project's own instructions the most common re-run trigger.

## Before You Start

Export the task to one folder and set the paths. The assignment is the task METADATA; the ratings are the attempt RESPONSE, read from Redash (`README.md`, Redash Grounding) or the task UI. The conversations, links, and screenshots are read off the platform.

```bash
ASSIGN=assignment.json        # TASKS.METADATA: surface, languageCode, initial_prompt_native,
                              #   next_steps_native, required_artifacts, rubric, model_a/b/c_name
RATINGS=ratings.json          # TASKATTEMPTS.RESPONSE:turns: the per-model fields + the ranking block
TAX=taxonomy.txt              # the 15 L2 names and every [L3 Loss Tag], from Guide section 6
```

Four checks read off the platform, not a file: each conversation link opening (L3, L4), each Model Check screenshot showing the assigned model (L17, L30), the language of the turns (L18, L31), and the attachment sameness across the three conversations (L5). Record them as you go. Model letters are `a`, `b`, `c` throughout.

## Sweep 1. Presence and assignment

```bash
jq -e '.surface and .languageCode and .model_a_name and .model_b_name and .model_c_name' "$ASSIGN" \
  >/dev/null || echo "L2 OPEN: assignment field blank"                                    # L2 assignment set
for x in a b c; do for f in overall_satisfaction_$x detail_of_issues_$x turns_where_issues_occurred_$x country_fit_$x; do \
  jq -e --arg f "$f" 'has($f)' "$RATINGS" >/dev/null || echo "L1: $f missing"; done; done # L1 per-model fields
for f in rank_1_best rank_2_middle rank_3_worst tie_breaker_used ranking_justification; do \
  jq -e --arg f "$f" 'has($f)' "$RATINGS" >/dev/null || echo "L13: $f missing"; done       # L13 ranking block
for x in a b c; do jq -e --arg f "trajectory_$x" 'has($f)' "$RATINGS" >/dev/null \
  || echo "L20: trajectory_$x missing"; done                                               # L20 trajectory JSON per model
```

L1 and L13 are submission requirements: a missing per-model field or ranking field blocks the task before any dimension is read. L2 confirms the assignment is set, since a blank surface, languageCode, or model name makes Dimensions 12 and 13 un-gradeable. L20 is the new trajectory-JSON and artifacts requirement; a model run with no exported trajectory is incomplete. L1, L2, L13, and L20 close here as presence checks.

## Sweep 2. Satisfaction, issues, and the Detail grammar

```bash
for x in a b c; do \
  s=$(jq -r ".overall_satisfaction_$x // empty" "$RATINGS"); \
  case "$s" in 1|2|3|4|5) : ;; *) echo "L6: satisfaction_$x = '$s' not 1-5" ;; esac; \
  n_iss=$(jq -r "[.issue_1_$x,.issue_2_$x,.issue_3_$x]|map(select(.!=null and .!=\"\"))|length" "$RATINGS"); \
  det=$(jq -r ".detail_of_issues_$x // \"\"" "$RATINGS"); \
  n_det=$(printf '%s' "$det" | rg -c '^\s*#[0-9]+:' || true); \
  [ "$s" = "5" ] && [ "$n_iss" -gt 0 ] && echo "L11: $x satisfaction 5 but $n_iss issues listed"; \
  [ "$s" != "5" ] && [ "$n_iss" -eq 0 ] && echo "L11: $x satisfaction $s but No issues"; \
  [ "$n_det" != "$n_iss" ] && [ "$s" != "5" ] && echo "L8: $x Detail lines $n_det != issues $n_iss"; \
  printf '%s\n' "$det" | rg -vq '^\s*(#[0-9]+:\s*\[[^]]+\]\s*-|N/A|\s*$)' \
    && echo "L8 OPEN: $x a Detail line is not '#N: [tag] - ...'"; \
done
```

L6 is the satisfaction-format gate: every `overall_satisfaction_x` is an integer 1 to 5. L11 is the count-versus-score rule, the `[Fail - Issue Not Presented]` mechanical half: satisfaction 5 must carry "No issues", and 4 or lower must carry 1 to 3 issues. L8 is the Detail grammar: every line is `#N: [L3 Loss Tag] - explanation` and the Detail line count equals the Column 3 issue count. L6 and L11 close here; L8 stays OPEN for the tag-validity read.

## Sweep 3. Issue tags and the Turns lines

```bash
for x in a b c; do \
  for f in issue_1_$x issue_2_$x issue_3_$x; do \
    v=$(jq -r ".$f // empty" "$RATINGS"); \
    [ -n "$v" ] && { rg -qxF "$v" "$TAX" || echo "L9 OPEN: $f='$v' not an L2 name"; }; done; \
  jq -r ".detail_of_issues_$x // \"\"" "$RATINGS" | rg -o '\[[^]]+\]' | sort -u | \
    while read -r tag; do rg -qF -- "$tag" "$TAX" || echo "L9 OPEN: $x tag $tag not in taxonomy"; done; \
  s=$(jq -r ".overall_satisfaction_$x // empty" "$RATINGS"); \
  turns=$(jq -r ".turns_where_issues_occurred_$x // \"\"" "$RATINGS"); \
  n_turn=$(printf '%s' "$turns" | rg -c '^\s*#[0-9]+:' || true); \
  n_iss=$(jq -r "[.issue_1_$x,.issue_2_$x,.issue_3_$x]|map(select(.!=null and .!=\"\"))|length" "$RATINGS"); \
  [ "$s" = "5" ] && ! printf '%s' "$turns" | rg -qi 'N/A' && echo "L10: $x satisfaction 5 but Turns not N/A"; \
  [ "$s" != "5" ] && [ "$n_turn" != "$n_iss" ] && echo "L10: $x Turns lines $n_turn != issues $n_iss"; \
done
```

L9 confirms every Column 3 value is one of the 15 L2 sub-dimension names and every bracketed tag in Detail is a verbatim [L3 Loss Tag] from the taxonomy; a tag that does not string-match is carried to `RatingAudit.md`, because a wrong tag is a Dimension 5 category error. L10 is the Turns correspondence: one `#N:` turn line per issue, or N/A when satisfaction is 5. L9 stays OPEN for the matching read; L10 closes here.

## Sweep 4. The prompt match and the rubric grades

```bash
for x in a b c; do \
  op=$(jq -r ".initial_prompt_native // empty" "$ASSIGN"); \
  echo "L7 OPEN: confirm $x opening turn string-matches initial_prompt_native (read the conversation)"; \
done
echo "L12 OPEN: confirm every rubric criterion has a Yes/No/N/R grade and a turn in its justification (Guide section 9)"  # L12 rubric grades
```

L7 confirms each conversation's Turn 1 is the verbatim `initial_prompt_native`, the `[Fail - Opening Prompts Inconsistency]` versus `[Non-Fail - Pre-seeded/Opening Prompt Inconsistency]` split, settled by reading the conversation opener against the stored prompt. L12 confirms every criterion in `METADATA.rubric` carries a grade and a turn justification; an ungraded criterion is the `[Fail - Rubric Grading Disagreement]` half. Both stay OPEN for the owning audit.

## Sweep 5. The ranking block

```bash
r1=$(jq -r '.rank_1_best // empty' "$RATINGS"); r2=$(jq -r '.rank_2_middle // empty' "$RATINGS"); r3=$(jq -r '.rank_3_worst // empty' "$RATINGS")
printf '%s\n%s\n%s\n' "$r1" "$r2" "$r3" | sort | uniq -d | rg -q . && echo "L14: ranks not a permutation of A/B/C"   # L14 permutation
sa=$(jq -r '.overall_satisfaction_a // 0' "$RATINGS"); sb=$(jq -r '.overall_satisfaction_b // 0' "$RATINGS"); sc=$(jq -r '.overall_satisfaction_c // 0' "$RATINGS")
echo "L15 OPEN: ranks $r1 > $r2 > $r3 vs satisfaction A=$sa B=$sb C=$sc (a lower score ranked higher is L15)"          # L15 consistency
jq -r '.ranking_justification // ""' "$RATINGS" | rg -qi 'prefer|best|better|strong|over |tie|tied|equal|rank' \
  || echo "L16 OPEN: ranking_justification states no preference or tie"                                               # L16 verdict word
```

L14 confirms the three ranks name each of A, B, and C exactly once. L15 stages the consistency check that `RankingAudit.md` Dimension 10 settles: a model with a lower overall satisfaction ranked above one with a higher score is an inconsistency unless the justification explains it. L16 is the verdict-word presence check for Dimension 11, the `[Non-Fail - Lacks Verdict]` tell. L14 closes here; L15 and L16 stay OPEN.

## Sweep 6. Models, language, and country-fit cross-rule

```bash
for x in a b c; do \
  echo "L17 OPEN: confirm Model Check $x shows the assigned model_${x}_name ($(jq -r ".model_${x}_name" "$ASSIGN"))"; \
  echo "L18 OPEN: confirm $x turns are in the language of $(jq -r '.languageCode' "$ASSIGN")"; \
  lang_logged=$(jq -r "[.issue_1_$x,.issue_2_$x,.issue_3_$x]|map(select(.==\"Language and locale fit\"))|length" "$RATINGS"); \
  cf=$(jq -r ".country_fit_$x // empty" "$RATINGS"); cfb=$(jq -r ".country_fit_bad_$x // empty" "$RATINGS"); \
  [ "$lang_logged" -gt 0 ] && { [ "$cf" = "1" ] && echo "L19: $x Language&locale logged but country_fit=1"; \
    printf '%s' "$cfb" | rg -qi '^\s*N/A\s*$' && echo "L19: $x Language&locale logged but country_fit_bad=N/A"; }; \
done
```

L17 and L30 confirm the Model Check screenshot shows the assigned model with the setting visible, the `[Fail - Models]` check and the model-proof validity gate. L18 and L31 confirm the turns are in the assigned language, the `[Fail - Language]` check and the locale validity gate. L19 is the cross-rule the Guide imposes: when Language and locale fit is a logged issue, Country fit cannot be 1 and the bad-note cannot be N/A. L17, L18, and L19 stay OPEN for the reads.

## Sweep 7. House style and validity gates

```bash
rg -nP "\x{2014}|\x{2013}|[\x{1F000}-\x{1FAFF}\x{2600}-\x{27BF}]" report.md 2>/dev/null && echo "L21: em-dash/en-dash/emoji in auditor text"  # L21 house style
echo "L30 OPEN: confirm each Model Check screenshot is legible, pre-run, and shows the assigned model + setting"       # L30 model proof
echo "L31 OPEN: confirm no conversation is fully off the assigned language"                                            # L31 locale
echo "L32 OPEN: confirm thinking mode is default where visible (ChatGPT Light, Fable Medium)"                          # L32 thinking mode
echo "L33 OPEN (Redo lane only): confirm every previously flagged field actually changed against the prior attempt"    # L33 resubmission
```

L21 is the house-style scan over the auditor's own report; native accented or CJK script in the conversation is expected and is not a finding. L30 to L33 map to no scored dimension: carry each open ID into the report as a requirement or validity finding, routed to void-and-re-run (L30, L31, L32) or reject (L33). L30, model proof, feeds Dimension 12 and is the most common re-run trigger on the project.

## Recording the Result

```
Linter sweep, Task [id]
Assignment:    surface [x], languageCode [x], models A/B/C [set / L2: which blank]
Rating fields: [all present / L1: which missing], ranking block [present / L13]
Trajectory:    JSON + artifacts per model [present / L20: which missing]
Satisfaction:  A [n] B [n] C [n] (all 1-5 [yes / L6]), count vs score [ok / L11: which]
Detail/Turns:  grammar [ok / L8, L10: which], tags in taxonomy [ok / L9: which]
Prompt:        openers == initial_prompt_native [ok / L7 OPEN]
Rubric:        every criterion graded + turn-justified [ok / L12 OPEN]
Ranking:       permutation [ok / L14], vs satisfaction [ok / L15 OPEN], verdict word [ok / L16 OPEN]
Models/Lang:   screenshots [ok / L17 OPEN], language [ok / L18 OPEN], country-fit rule [ok / L19]
Validity:      model proof [ok / L30], locale [ok / L31], thinking mode [ok / L32], resubmission [n-a / L33]
House style:   [clean / L21: where]
Open IDs:      [L.., .. / none]
Cleared:       all others
```

The open IDs go to the audit that owns the dimension: L3, L4, L5, L17 to `TrajectoryAudit.md`; L7, L18, L19 to `PromptAudit.md`; L8, L9 to `RatingAudit.md`; L12 to `RubricAudit.md`; L15, L16 to `RankingAudit.md`. Not closed on a guess.

Two correlations are one finding, not several. L11 with L8 together, satisfaction 5 carrying issues and a Detail field that is not N/A, is one contributor slip about the No-issues rule, not two. And L17 with L30 together, a missing or illegible Model Check screenshot, is the model-proof signature: one cause, usually a screenshot taken after the run or from the wrong screen. Say so in the report.
