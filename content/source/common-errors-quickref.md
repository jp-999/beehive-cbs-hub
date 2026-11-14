Most tasks fail on the **rating form**, not the conversation. Scan this before you submit.

### Audit snapshot — 366 QC-reviewed tasks

| Rank | Where tasks fail | Share of fails |
|---|---|---|
| 1 | **#11 Issues** — a real issue left out, or a 5 with "No issues" despite an error | 75% |
| 2 | #13 Rubric grades contradicted by the conversation | 33% |
| 3 | #12 Detail of issues — tag not copied exactly, wrong format | 25% |
| 4 | #7 Wrong model or mode | 16% |
| 5 | #2 Satisfaction off by 2+ points | 15% |
| 6 | #4 Ranking contradicts your own scores | 13% |
| 7 | #3 Ranking disagrees with QC | 12% |
| 8 | #9 Next steps never asked / model's question ignored | 29% |

> ⚠️ **The single biggest rejection:** rating a model **5 with "No issues"**, or listing fewer issues than the conversation shows. If the user had to correct the model, or the model stated a wrong figure, date, rule or citation — that is an issue. It is never "minor".

### Where tasks get sent back — six stages

| Stage | What QC checks | Typical send-back |
|---|---|---|
| **1 · Setup** | #1 opening prompt verbatim; #7 model and mode on the Model Check screenshot | Gemini screenshot without the toggle on **Task**; ChatGPT on Instant or "gpt-6-thinking"; the prompt reworded or translated |
| **2 · Conversation** | #9 every next step asked, model questions answered; #10 same files to all three models | A step never asked; the model's clarifying question ignored; one model got fewer files |
| **3 · Uploads** | #6 public share links + JSON; #15 everything auditable | A private `chatgpt.com/c/…` link; a deliverable hidden on the share link and missing from the zip |
| **4 · Ratings** | #2 satisfaction; #11 issues (L2 + L3 tag + turns); #12 Detail line format | A 5 with an unflagged error; an issue left out; `[Other]` where a §6 tag fits; a tag misspelt |
| **5 · Rubric & Country fit** | #13 grades match the final state with turns cited; #14 `[Category]: Comment` with a local detail | Yes for a step the model never did; a generic Good comment with no local detail |
| **6 · Ranking** | #3 agreement with QC; #4 consistent with your own scores and rubric | A 4 ranked above a 5; a justification that names a different best model than the rank fields |

### V6 rules people miss

- **Critical failure** — a false fact stated as true, with no hedge, in something the user acts on (a figure, fee, date, legal rule, citation, contact, or copy they will send). It goes at **Issue #1** and **caps the model at 3**.
- **Language & locale fit** belongs in the Issues — Country fit is 2 or 3, with the problem written in the Bad comment.
- **Rubric guardrail** — never rank a model with fewer rubric Yes above one with more, unless a listed exception applies and the justification explains it.
- **`[FLAG]` never changes a grade.** A criterion no model could meet (for example "uses KakaoTalk" with no connector) stays **No + `[FLAG: Impossible to satisfy]`**.

### The "stranger re-read" check

Before you submit, reread each field as someone who has only the share link:

1. Can every issue be seen on the share page, at the turn you cite?
2. Does every Detail line quote what the model actually said, in its own words?
3. Does every rubric justification name the turn that shows the final state?
4. Does the ranking justification name the same best, middle and worst as the rank fields?
5. Is every file the models made either visible on the link or in the zip?

### Integrity hard-fails

These flag the task **and** the contributor:

- A JSON or screenshot from a different conversation, account or task.
- Resubmitting the same conversations unchanged after a redo was requested.
- Pasting an earlier chat into a new one to skip the steps.
- Uploading files the models didn't produce.
- Personal documents in the uploads.

### Remember three things

1. **A user correction is always an issue.** List it, at the turn it happened.
2. **Your ranking must follow your own scores and rubric.** Explain any exception in writing.
3. **Everything you rate must be visible to the auditor** — the share link, the JSON, or the zip.
