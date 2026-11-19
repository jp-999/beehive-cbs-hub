# Beehive SxSxS — Common Errors and How to Avoid Them

## Slide 1 — Beehive SxSxS
**Common errors and how to avoid them.** What sent tasks back in real audits, and the rule that prevents each one.

## Slide 2 — Audit of 39 tasks · V5 rubric
Most failures come from a few repeated errors.
- 39 tasks audited against the V5 rubric
- 34 invalid trajectories: a conversation has to be redone or continued
- 5 tasks that can be backfilled

**REDO** — the task is sent back and a conversation is redone: #7 Model or mode · #1 Opening prompt · #9 Next steps · #8 Language · #6 Exports and links · #10 Attachments
**FORM ERROR** — QC can correct it, but each one counts against the task: #11 Issues · #2 Satisfaction · #12 Detail format · #13 Rubric · #3/#4 Ranking · #14 Country fit

## Slide 3 — Redo #7 · Wrong model or mode (failed on 30 of 39 audited tasks)
- **Gemini** — required: Carbon, with the Chat/Task toggle on **Task**. Seen in audits: toggle not visible in 18 tasks (screenshot taken after sending, hidden by the screen-share bar, or from another chat).
- **ChatGPT** — required: cGPT 6 Astra, on a paid plan. Seen in audits: Instant, Thinking, mini or a Free account in 11 tasks. Also wrong: GPT-6.1, Sol, plain "GPT-6".
- **Claude** — required: Fable 5.1, in the Claude app. Seen in audits: Sonnet or Opus 5.5 in 7 tasks, usually because Fable needed paid credits. Also wrong: 5.2, Claude Code.
- Can't use the assigned model? **Stop and contact the team. Don't switch models.**

## Slide 4 — Redo #7 · Model check (what a valid screenshot shows)
**Valid — all of these:**
- The model name and, on Gemini, the Chat/Task toggle set to Task
- Your prompt typed in the box, not yet sent
- Taken in this conversation, on this account
- Nothing cut off: the picker and the toggle are fully visible

**Invalid — any of these:**
- Taken after sending: the reply is on screen, the toggle is gone, only "Complete" shows
- Cropped, so it doesn't prove the model
- Toggle covered by the screen-share bar
- Taken in another chat or session
- Wrong model on screen: ChatGPT Instant or Free, Claude Opus 5.5 or Fable 5.2

Order: open a new chat, set the toggle to Task, paste the prompt, take the screenshot, then press send.

## Slide 5 — Redo #1 and #8 · Opening prompt and language
**Opening prompt (#1: 12 of 39 tasks)** — Paste the pre-seeded prompt exactly, as the first message. One changed character sends all three conversations back. Invalid:
- A dropped final "." or "。"
- An added "?" or an added space
- A typo ("Stsy" for "Etsy")
- A rewrite or a cut-down version
- A greeting or a test message first, like "What model are you using?"
- The prompt pasted twice

**Language (#8)** — Every turn you type is in the task's language, as a local would write it.
- English is fine only as a UI button label ("Send")
- Don't click the model's suggested replies, especially English ones

## Slide 6 — Redo #9 · Next steps: cover all of them (16 of 39 tasks)
**Do:**
- Cover every next step, in first person, in your own words
- React to the model's last reply and answer its questions first
- If it refuses or errors, react ("Then use fictional names…") and continue
- Skip only a step already delivered, or a conditional one that never arose

**Don't:**
- Paste the step text ("The user may ask…")
- Repeat the opening prompt every turn
- Stop after 2–3 turns, or at a usage limit with steps never asked
- Refer to things never said, like "correcting" a date nobody gave

Two or more skipped steps in any conversation: Fail. One skipped step or an unnatural turn: Non-Fail. Both mean a redo.

## Slide 7 — Redo #6 and #10 · Exports, links and attachments (15 of 39 tasks)
**Exports and links (#6)**
- JSON: the real AI Exporter file for each model, in its own slot. Not screenshots, PDFs, RAR files, hand-made stubs, summaries or another task's chat
- Links: ChatGPT and Claude need public share links (Share, Copy link): chatgpt.com/share/… and claude.ai/share/…, not /c/ or /chat/, a stub, a snippet or an artifact link
- Files the model made: one zip per model, named like model_a_turn1_file1; none: a zip with no_artifacts.txt
- Mobile: if the chat can't be shared, finish it on mobile, then export it from the web, same account, no new messages

**Attachments (#10)**
- Same files to all three models, in or before the turn that needs them
- attachments.zip holds exactly the files the models received
- No personal documents (seen: an earnings CSV, a private SMS screenshot)
- One Google account per model: later models find earlier drafts and events

## Slide 8 — Form #2 (14 of 39) and #11 (30 of 39) · Satisfaction: when a 5 is a 5
**A 5 means no real issues (#2)**
- Not a 5 if you had to correct the model
- Not a 5 with a false fact, an empty reply or an error turn
- Not a 5 with English lines in a non-English chat, or the wrong register
- But don't rate a 2 when the model delivered the work with moderate slips

**Often missed in Issues (#11)**
- Unchecked figures: deadlines, rates, amounts and dates, hedged ones included
- Register that doesn't match yours: tu/vous, du/Sie, 해요/합니다, 나/저
- English lines inside non-English replies (progress lines, permission cards)
- Claims of sending or saving something that wasn't
- Every turn you spent correcting the model

Fact-check what the models claim, especially when the three disagree.

## Slide 9 — Form #11 · Issues: the most failed dimension — mistakes to avoid
**The five mistakes:**
- Unsupported: the issue isn't in the conversation
- Swapped: one model's issue quotes another model's figures
- Incomplete: fewer than three listed while a bigger issue is left out
- Missing on a 5: a model rated 5 with a clear problem
- Category: the wrong tag, such as a false fact tagged [Wrong answer]

**Always log, rank high (Instructions §5):** [Action dishonesty] · [Placeholder passed as real] · [Source faithfulness & hallucination] in anything the user would act on · [Data privacy breach / data protection] · an unauthorized irreversible action

Fix cost: same turn, none · later by the model, lower · you corrected once, moderate · still wrong, high

## Slide 10 — Form #12 · Detail of issues format (13 of 39 tasks)
`#1: [L3 Loss Tag] - what went wrong`

Example from the Instructions: `#2: [Language adherence error] - The model switched to English mathematical explanations in Turn 4 while the user wrote only in French.`

**Rules:**
- One line per issue, at most three, in the same order as the Issues fields
- Copy the tag exactly, brackets included, from inside the L2 you chose
- Turns go in their own column, for example `#2: 4`

**Common slips:** an L2 name used as the tag, or [Other] when a listed tag fits · "#1 :" instead of "#1:", or free text with no [tag] · "N/A" written while issues are selected

## Slide 11 — Form #13 · Rubric: grade what exists (29 of 39 tasks)
**Do:**
- Grade the final state of the conversation
- Check where the outcome lives (the draft, the event, the file), not what the model claimed
- Cite that model's own turn and what it shows
- Use N/R only for a follow-up branch that never arose. If you asked and it failed, it's No

**Don't:**
- Copy one justification across models
- Answer Yes for a deliverable that was only claimed
- Cite another model's turn numbers, or a turn that doesn't exist

Criterion looks broken? Keep your Yes or No and add [FLAG: Impossible to satisfy], [FLAG: Contradicts prompt] or [FLAG: Unprompted requirement].

## Slide 12 — Form #14 · Country fit: scale and comments (18 of 39 tasks)
- **1 — Fully tailored** — Nothing foreign. Bad comment: N/A
- **2 — Generic, or it asked which country** — Local detail was missing. Say what in the Bad comment
- **3 — Not tailored** — A foreign spelling, unit, currency, law or institution. Good comment: N/A

**Comments:**
- Format: `[Category]: comment` naming the local detail
- Copy the category exactly from the eight in Instructions §10
- Not a miss: a provider's own price in its own currency (a platform's $ fees)
- Register alone doesn't lower Country fit

## Slide 13 — Form #3 and #4 · Ranking: follow your scores
- **RANK BY:** Overall satisfaction
- **TIE-BREAKER 1:** Country fit
- **TIE-BREAKER 2:** Outcome
- **TIE-BREAKER 3:** User experience

Tie-breaker used: name the last rule you needed; "No tie" when there is none. **Never rank a lower score above a higher one.**

Justification: name the best, the middle and the worst model, in the order of the rank fields; say what decided each step, with turns (T1, T3); rewrite it whenever a score, a Country fit or the order changes.

## Slide 14 — Evidence, privacy and integrity: keep it visible, clean and yours
**Evidence**
- Quote only the visible reply text, not ChatGPT's hidden "working on it" line
- An issue the auditor can't find is dropped
- Upload every file a model produced, in its own zip

**Clean uploads**
- Nothing personal: no texts to a landlord, no SMS screenshots, no documents with real people's names
- Use an account with no nickname or custom instructions that would show up in replies

**Leads to removal from the project — do the task yourself.** These were found in the audit:
- Rating conversations you didn't run
- Uploading made-up files or fake links
- Asking a chatbot to fill in the rating form

## Slide 15 — Pre-submit self-check (a miss means a redo)
**Conversations**
- Gemini: Carbon, toggle on Task, not sent
- ChatGPT cGPT 6 Astra (paid), Claude Fable 5.1
- Turn 1: the exact pre-seeded prompt, all three
- Every next step asked, in first person
- Your turns all in the task's language
- Same files to all three, zip matches
- Share links and one JSON per model
- Default thinking mode unchanged

**Form (each mistake counts)**
- No 5 if you corrected the model or had an empty, error or English turn
- Up to three real issues, biggest first
- Detail lines: `#N: [exact tag] - text`
- Rubric on the final state, citing turns
- Country fit 3 for any foreign unit or spelling
- Ranking and justification match your scores
- Every deliverable zipped; nothing personal
