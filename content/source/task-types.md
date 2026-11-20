## 🔀 Two task types: check before you start

Tasks now come in two types. Check the **Scenario Details** step of your task to see which one you have.

**Comparison tasks (the original ones).** You chat with **3 models** (A, B and C), rate each one, and rank them. Run Gemini (Carbon) at **gemini.google.com** on web, or in the **Gemini app** on mobile (turn auto model selection off first). Trajectory JSON and artifacts zip as before.

**Single-model tasks (Google AI Mode, Gemini 4 Hydrogen).** The Scenario Details step shows **🤖 MODEL — GOOGLE AI MODE, GEMINI 4 HYDROGEN**. You chat with **one model only**, so you rate one model and there is **no ranking step**.

> ⚠️ AI Mode is **NOT** done on the Gemini app. Do not use the Gemini app or gemini.google.com for this task type.

**What to do for a single-model task:**

1. Go to **Google Search** and open **AI Mode** (on mobile, use the **Google app**). Sign in with your **demo account** and select **Gemini 4 Hydrogen** before Turn 1. There is no Task mode, just pick the model.
2. **Turn on search history** for the demo account before you chat (otherwise only the last message shows up).
3. Take the **Model Check screenshot** before Turn 1, with **Gemini 4 Hydrogen** and **AI Mode** visible (see below).
4. Run the whole conversation.
5. Click **Share** in AI Mode and copy the public link (it looks like `share.google/…`). Do not paste the address-bar URL.
6. **No trajectory JSON, and no extension for the PDF.** Right-click the page, click **Print**, then choose **Save as PDF**. Name it **trajectory_a.pdf** and upload it.
7. Upload the artifacts zip (and the attachments.zip if the task has an ATTACHMENTS block), then rate and score the one model.

![AI Mode Model Check: Gemini 4 Hydrogen, with AI Mode visible](media/image4.png)

### Connect Google Workspace to Google AI

Google Workspace is **off by default** in AI Mode, so the model can't send emails by the end of the run. **Turn it on before you start the run.** This short walkthrough shows how:

<video class="hub-video" controls preload="metadata" playsinline>
  <source src="media/videos/connect-workspace.mov" />
</video>

[Open the video](media/videos/connect-workspace.mov)

> 💡 **TL;DR for AI Mode.** Share link not working? Turn off **SafeSearch** (top of the chat → profile → SafeSearch → off), then try again; still stuck, send the taskID to a QM. Only the last message showing? **Turn on search history.** PDF: right-click → **Print** → **Save as PDF** (`trajectory_a.pdf`).

Full step-by-step is in the Instructions (Materials page), section 2, "Reading your task row".
