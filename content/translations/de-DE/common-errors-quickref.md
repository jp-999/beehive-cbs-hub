Die meisten Aufgaben scheitern am **Bewertungsformular**, nicht an der Konversation. Überflieg das hier, bevor du einreichst.

### Audit-Momentaufnahme — 366 von der QC geprüfte Aufgaben

| Rang | Wo Aufgaben scheitern | Anteil der Fehler |
|---|---|---|
| 1 | **#11 Issues** — ein echtes Problem ausgelassen oder eine 5 mit „No issues" trotz eines Fehlers | 75 % |
| 2 | #13 Rubric-Noten, die der Konversation widersprechen | 33 % |
| 3 | #12 Detail of issues — Tag nicht exakt kopiert, falsches Format | 25 % |
| 4 | #7 Falsches Modell oder falscher Modus | 16 % |
| 5 | #2 Satisfaction um 2+ Punkte daneben | 15 % |
| 6 | #4 Ranking widerspricht deinen eigenen Scores | 13 % |
| 7 | #3 Ranking weicht von der QC ab | 12 % |
| 8 | #9 Next steps nie gefragt / Frage des Modells ignoriert | 29 % |

> ⚠️ **Die häufigste Ablehnung:** ein Modell mit **5 und „No issues"** zu bewerten oder weniger Issues aufzulisten, als die Konversation zeigt. Wenn der Nutzer das Modell korrigieren musste oder das Modell eine falsche Zahl, ein falsches Datum, eine falsche Regel oder ein falsches Zitat angegeben hat — ist das ein Issue. Es ist nie „geringfügig".

### Wo Aufgaben zurückgewiesen werden — sechs Phasen

| Phase | Was die QC prüft | Typische Rückweisung |
|---|---|---|
| **1 · Setup** | #1 opening prompt wortgetreu; #7 Modell und Modus auf dem Model-Check-Screenshot | Gemini-Screenshot ohne den Schalter auf **Task**; ChatGPT auf Instant oder „gpt-6-thinking"; der Prompt umformuliert oder übersetzt |
| **2 · Conversation** | #9 jeder next step gefragt, Fragen des Modells beantwortet; #10 dieselben Dateien an alle drei Modelle | Ein Schritt nie gefragt; die Rückfrage des Modells ignoriert; ein Modell bekam weniger Dateien |
| **3 · Uploads** | #6 öffentliche Share-Links + JSON; #15 alles prüfbar | Ein privater `chatgpt.com/c/…`-Link; ein Deliverable auf dem Share-Link verborgen und im Zip fehlend |
| **4 · Ratings** | #2 satisfaction; #11 issues (L2- + L3-Tag + turns); #12 Format der Detail-Zeile | Eine 5 mit einem nicht markierten Fehler; ein ausgelassenes Issue; `[Other]`, wo ein §6-Tag passt; ein Tag falsch geschrieben |
| **5 · Rubric & Country fit** | #13 Noten passen zum Endzustand mit zitierten turns; #14 `[Category]: Comment` mit lokalem Detail | Yes für einen Schritt, den das Modell nie gemacht hat; ein generischer Good-Kommentar ohne lokales Detail |
| **6 · Ranking** | #3 Übereinstimmung mit der QC; #4 im Einklang mit deinen eigenen Scores und der Rubric | Eine 4 über einer 5 platziert; eine Begründung, die ein anderes bestes Modell nennt als die Rang-Felder |

### V6-Regeln, die oft übersehen werden

- **Critical failure** — eine falsche Tatsache, als wahr und ohne Einschränkung dargestellt, in etwas, worauf der Nutzer reagiert (eine Zahl, eine Gebühr, ein Datum, eine Rechtsregel, ein Zitat, ein Kontakt oder ein Text, den er senden wird). Sie kommt auf **Issue #1** und **deckelt das Modell bei 3**.
- **Language & locale fit** gehört zu den Issues — Country fit ist 2 oder 3, das Problem im Bad comment beschrieben.
- **Rubric-Leitplanke** — platziere nie ein Modell mit weniger Rubric-Yes über einem mit mehr, es sei denn, eine aufgeführte Ausnahme gilt und die Begründung erklärt sie.
- **`[FLAG]` ändert nie eine Note.** Ein Kriterium, das kein Modell erfüllen kann (zum Beispiel „uses KakaoTalk" ohne Connector), bleibt **No + `[FLAG: Impossible to satisfy]`**.

### Der „Fremder liest noch einmal"-Check

Lies vor dem Einreichen jedes Feld wie jemand, der nur den Share-Link hat:

1. Ist jedes Issue auf der Share-Seite sichtbar, an dem turn, den du zitierst?
2. Zitiert jede Detail-Zeile, was das Modell tatsächlich gesagt hat, in seinen eigenen Worten?
3. Nennt jede Rubric-Begründung den turn, der den Endzustand zeigt?
4. Nennt die Ranking-Begründung dasselbe beste, mittlere und schlechteste wie die Rang-Felder?
5. Ist jede von den Modellen erstellte Datei entweder über den Link oder im Zip sichtbar?

### Integritäts-Hard-Fails

Diese markieren die Aufgabe **und** den Contributor:

- Ein JSON oder Screenshot aus einer anderen Konversation, einem anderen Konto oder einer anderen Aufgabe.
- Dieselben Konversationen nach einer Redo-Anforderung unverändert erneut einreichen.
- Einen früheren Chat in einen neuen einfügen, um die Schritte zu überspringen.
- Dateien hochladen, die die Modelle nicht erstellt haben.
- Persönliche Dokumente in den Uploads.

### Drei Dinge zum Merken

1. **Eine Korrektur durch den Nutzer ist immer ein Issue.** Liste es auf, an dem turn, an dem es passierte.
2. **Dein Ranking muss deinen eigenen Scores und der Rubric folgen.** Erkläre jede Ausnahme schriftlich.
3. **Alles, was du bewertest, muss für den Auditor sichtbar sein** — der Share-Link, das JSON oder das Zip.
