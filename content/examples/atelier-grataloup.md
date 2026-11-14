# Anatomy of a perfect task (5/5 reference)

A finished, correct Prompt + Rubric Writing item, laid out section by section with notes on what makes each part strong. Use it as the bar for what "good" looks like.

| | |
|---|---|
| **Task type** | Aspirational |
| **Journey** | Solo operator & owner |
| **Category** | Business & Professional |
| **Model under test** | Gemini 3.8 Flash — thinking off |
| **Simplified run** | 30% — under the 40% gate |

> ✦ **Why this works** — A strong item proves its own difficulty. The simplified single-turn run scored 30%, comfortably under the 40% gate — evidence the task needs real multi-turn work, not a one-shot answer.

## 1. The universe
*Small Business Owner — the grounding for everything below.*

**Loïc Pellissier** — freelance web developer, Lyon. Builds simple websites for local shops in the Croix-Rousse and Pentes neighbourhoods. The workspace covers 2 April to 2 October 2026, all in French.

- 250 calendar events (all work), 250 emails (132 received, 118 sent) and 250 files, all in French.
- New clients arrive through Malt. The process is a call or shop visit, then a quote valid 30 days, and no work until the client signs it.
- Main client — Atelier Grataloup (Hélène Grataloup): a five-page site plus contact form, quote DEV-2026-009, invoice 2026-016 for €2,400.
- Main client — La Sauce Claire (Samir Bencheikh): a restaurant site with menu, hours and access map, invoice 2026-017 for €1,800.
- Other clients: Papier Volant, Savonnerie Leynaud, Boulangerie Faure, Fleurs du Pentes and Librairie du Gros Caillou.
- Busiest point is late September: both main sites go live (Monday 28th and Tuesday 29th) and are checked afterward.
- Two items stay open: Hélène's extra features, priced separately as DEV-2026-011 (€680), and Inès Khelifi's unpaid invoice 2026-014 (€150).
- Admin runs through OVH hosting (domains, DNS, SSL, backups), URSSAF contributions, and bills from Malt, OVH and Plume.

> ✦ **Why this works** — Every name, quote, invoice and date below is drawn from the assigned universe. Nothing is invented. Ungrounded entities can't be scored and get the item rejected.

## 2. The journey
*The behaviour this item is built to test: **Solo operator and owner** (Business & Professional).*

Assistance with business strategy, marketing, sales, project management documents, and job-seeking journeys.

**Why it's prioritised:** P0 loss area. 61.6% favourable, 7.1% NFR. Targets: formatting and tone, multi-step drafting, factual precision, artifact delivery.

> ✦ **Why this works** — The prompt is built to exercise this journey's weak spots — multi-step drafting, factual precision and artifact delivery — rather than a generic request.

## 3. Opening prompt
*The loose opener the contributor starts from.*

> Je veux faire le point sur le projet Atelier Grataloup après la mise en ligne et je voudrais préparer les éléments nécessaires pour clôturer le projet et organiser la suite avec Hélène stp

> ✦ **Why this works** — Two or three loose asks, not the full task. It states the goal — close out the project, plan the next steps — while withholding the structure, the figures and the artifacts. Those surface across the conversation.

## 4. Input artifacts
*Real source files pulled from the workspace.*

- `devis/2026-07-09-helene-grataloup.pdf`
- `devis/2026-07-02-dev-2026-009.pdf`
- `devis/dev-2026-011.csv`
- `factures/2026-016-helene-grataloup.pdf`

> ✦ **Why this works** — The item points at real files in the workspace instead of pasting mocked data. The model has to open and reconcile them.

## 5. Target outcome
*This task's reference final state, fixed before any rubric criterion.*

1. **Project tracking document** — the main steps of the Atelier Grataloup project: what was planned, delivered, checked and still pending.
2. **Client completion report** — a professional report for Hélène: what was delivered, the checks completed, her feedback and the invoice details.
3. **Quote comparison** — a separate document comparing the original quote with the two new features Hélène requested.
4. **Additional quote** — checks the amount, status and expiration date of quote DEV-2026-011 and makes clear work cannot start without Hélène's approval.
5. **Email draft** — to Hélène explaining the project status and next steps.
6. **Action plan** — next steps, organised by priority and deadline.
7. **Google Drive** — a folder for Atelier Grataloup with all documents saved inside it, plus the folder link.
8. **Google Calendar** — an event "Suivi devis complémentaire - Atelier Grataloup" on 30 October 2026 from 10:00 to 10:30, with the quote number, amount, expiration date and reason.

> ✦ **Why this works** — The reference final state is fixed before any rubric criterion is written. Each deliverable is concrete enough to mark present or absent without a judgement call.

## 6. Simplified run
*The one-turn stress test that proves the item is hard enough.*

| Turns | Score | Gate | Result |
|---|---|---|---|
| 1 | 30% | ≤ 40% | **PASS** |

Gemini 3.8 Flash — extended thinking off. **Turn 1 — everything dumped at once:**

> Je voudrais faire le point sur le projet Atelier Grataloup après sa mise en ligne et préparer la suite de la relation avec Hélène. À partir des docs disponibles dans mon espace de travail je veux que tu crées un doc de suivi du projet… un rapport de clôture destiné à Hélène… un document comparatif entre le devis initial et les nouvelles fonctionnalités demandées… Vérifie le statut du devis complémentaire et sa période de validité… rédige un brouillon d'email prêt à être envoyé à Hélène… un plan d'action interne priorisé… crée un nouveau dossier dans le drive et importe tous les livrables… crée un évènement "Suivi devis complémentaire - Atelier Grataloup" pour le 30 octobre 2026 de 10 h à 10 h 30…

> ✦ **Why this works** — The stress test dumps every ask into one turn with no steering. If the model clears that easily, the item is too easy. Here it produced chat text and no real artifacts, so it fails most criteria.

## 7. The rubric
*Binary, weighted, observable criteria — graded against the simplified run. 28 criteria, 71 pts; the run scored 21/71 (30%).*

| # | Criterion | Wt | Category | Run |
|---|---|---|---|---|
| 1 | Identifies DEV-2026-009 as the accepted original quotation. | 2 | Artifact / Task Correctness | Pass |
| 2 | Reports the original quotation amount of €2,400. | 2 | Artifact / Task Correctness | Pass |
| 3 | Identifies all five website pages in the original scope. | 2 | Artifact / Task Correctness | Pass |
| 4 | Reports September 28, 2026 as the website launch date. | 2 | Artifact / Task Correctness | Pass |
| 5 | Reports the post-launch verification and Hélène's positive feedback. | 2 | Artifact / Task Correctness | Pass |
| 6 | Reports invoice 2026-016 and its October 28, 2026 deadline. | 2 | Artifact / Task Correctness | Pass |
| 7 | Identifies appointment booking and the filterable gallery as outside scope. | 2 | Artifact / Task Correctness | Pass |
| 8 | Reports DEV-2026-011 as an unsigned €680 quotation. | 2 | Artifact / Task Correctness | Pass |
| 9 | Identifies November 1, 2026 as the supplementary quotation's expiry. | 2 | Artifact / Task Correctness | Pass |
| 10 | Creates a project tracking document with a chronological history. | 3 | Artifact Delivery | Fail |
| 11 | Creates a completion report for Hélène and saves it to the Drive folder. | 3 | Artifact Delivery | Fail |
| 12 | Creates a comparison document with the original scope and additions. | 3 | Artifact Delivery | Fail |
| 13 | Creates an email draft addressed to Hélène Grataloup. | 3 | Artifact Delivery | Fail |
| 14 | Creates an internal action plan (immediate / future / approval-conditional). | 3 | Artifact Delivery | Fail |
| 15 | Creates a new Google Drive folder for the deliverables. | 3 | Task Completion | Fail |
| 16–18 | Uploads the tracking doc / completion report / comparison to the folder. | 3 ea | Task Completion | Fail |
| 19 | Creates the requested Google Calendar event on October 30, 2026. | 3 | Task Completion | Fail |
| 20 | The tracking document uses visually distinct status indicators. | 2 | Visual Appeal | Fail |
| 21 | The completion report has a title, client name/address and five headed sections. | 2 | Visual Quality | Fail |
| 22 | The comparison document presents features as a table, one row per feature. | 2 | Visual Appeal | Fail |
| 23 | Creates the deliverables as separate files, not only chat text. | 3 | Artifact Delivery | Fail |
| 24 | Leaves the email to Hélène **unsent** in the Gmail drafts folder. | 3 | Instruction Following | Fail |
| 25 | Titles the calendar event "Suivi devis complémentaire - Atelier Grataloup". | 2 | Artifact / Task Correctness | Fail |
| 26 | Puts DEV-2026-011, €680, the 1 Nov 2026 expiry and the purpose in the event description. | 3 | Artifact / Task Correctness | Fail |
| 27 | Provides a link to the created Google Drive folder. | 3 | Artifact Delivery | Fail |
| 28 | States work on DEV-2026-011 cannot begin until Hélène returns it signed "Bon pour accord". | 3 | Artifact / Task Correctness | Pass |

> ✦ **Why this works** — Binary, observable, positively-framed criteria, each weighted and categorised. The single-turn run passes only the pure-fact criteria (1–9 and 28) and fails every artifact and side-effect criterion — 21 of 71 points, 30%.

## 8. Golden answer
*The ideal final state, written out in full.*

> Un document de suivi du projet retrace chronologiquement les étapes depuis le cadrage du 22 juin 2026 jusqu'à l'envoi du devis complémentaire le 2 octobre 2026… Un rapport de clôture destiné à Hélène Grataloup présente le périmètre initial du devis DEV-2026-009 accepté le 9 juillet 2026… les informations de facturation de la facture 2026-016 (2 400,00 €, échéance au 28 octobre 2026). Un document comparatif oppose le périmètre du devis initial aux deux nouvelles fonctionnalités… Il précise que le devis complémentaire DEV-2026-011 (680,00 €) n'est pas signé et reste valable jusqu'au 1er novembre 2026… Un évènement "Suivi devis complémentaire - Atelier Grataloup" est créé le 30 octobre 2026 de 10 h 00 à 10 h 30… Un brouillon d'email adressé à helene@atelier-grataloup.fr reste **non envoyé** dans la boîte Gmail.

> ✦ **Why this works** — The golden answer names every figure, date and side effect exactly — including the one thing that must NOT happen: the email stays unsent in drafts.

## 9. Known vs Not known
*What the opener states, against what only follow-ups reveal.*

**Known (stated up front)**
- The user is Loïc Pellissier, a freelance web developer.
- The client is Hélène Grataloup from Atelier Grataloup.
- The Atelier Grataloup website has already been launched.
- The user wants to review the completed project and plan the next steps with Hélène.

**Not known (surfaces through the turns)**
1. That he wants this written down (a tracking document), not summarised in chat.
2. That he also wants a separate closure report for Hélène.
3. That the two extra features are outside the original quote, and he wants a third comparison document.
4. If the model misstates a figure he corrects it (DEV-2026-009 €2,400; invoice 2026-016 due 28 Oct; five pages; launch 28 Sep; DEV-2026-011 €680).
5. That DEV-2026-011's validity isn't on it — 30 days from the 2 Oct send date; he confirms 1 November.
6. When the model offers to send the email, that it stays **unsent** in drafts.
7. That he wants an action plan split into immediate / future / conditional, with dates.
8. That everything goes into a new Drive folder, and he wants the link back.
9. A follow-up calendar event: 30 Oct 2026, 10:00–10:30, with the quote reference, amount, expiry and reason.

> ✦ **Why this works** — What the opener states is small. What a contributor reveals only through follow-ups is large. That gap forces a long, multi-turn session of real work.

## 10. Quality scorecard
*How this item scored across every review dimension: **5 / 5 — Excellent**. Every dimension below was rated a perfect 5.*

Prompt — LLM Usage · Reasoning Requirement · Constraints · Domain Relevance · Target Outcome · Deliverable Request · Unique Ground Truth · Environment Context · Rubric Criteria — Weights · Category · Overall Quality · Rating — Rubric Evaluation · Valid Model Failure · Conversation Quality · Output Artifacts Preserved · User Input — Valid Links.

> ✦ **Why this works** — Full marks on every review dimension: a grounded prompt, unique ground truth, a correctly weighted and categorised rubric, preserved artifacts, and a genuine model failure to evaluate against.
