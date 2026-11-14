La plupart des tâches échouent sur le **formulaire d'évaluation**, pas sur la conversation. Parcourez ceci avant de soumettre.

### Instantané d'audit — 366 tâches examinées par la QC

| Rang | Où les tâches échouent | Part des échecs |
|---|---|---|
| 1 | **#11 Issues** — un vrai problème omis, ou un 5 avec « No issues » malgré une erreur | 75 % |
| 2 | #13 Notes de rubric contredites par la conversation | 33 % |
| 3 | #12 Detail of issues — tag non copié à l'identique, mauvais format | 25 % |
| 4 | #7 Mauvais modèle ou mode | 16 % |
| 5 | #2 Satisfaction erronée de 2 points ou plus | 15 % |
| 6 | #4 Ranking en contradiction avec vos propres scores | 13 % |
| 7 | #3 Ranking en désaccord avec la QC | 12 % |
| 8 | #9 Next steps jamais demandés / question du modèle ignorée | 29 % |

> ⚠️ **Le rejet le plus fréquent :** noter un modèle **5 avec « No issues »**, ou lister moins de problèmes que n'en montre la conversation. Si l'utilisateur a dû corriger le modèle, ou si le modèle a énoncé un chiffre, une date, une règle ou une citation erronés — c'est un problème. Ce n'est jamais « mineur ».

### Où les tâches sont renvoyées — six étapes

| Étape | Ce que la QC vérifie | Renvoi typique |
|---|---|---|
| **1 · Setup** | #1 opening prompt à l'identique ; #7 modèle et mode sur la capture Model Check | Capture Gemini sans le sélecteur sur **Task** ; ChatGPT sur Instant ou « gpt-6-thinking » ; prompt reformulé ou traduit |
| **2 · Conversation** | #9 chaque next step demandé, questions du modèle traitées ; #10 mêmes fichiers aux trois modèles | Une étape jamais demandée ; la question de clarification du modèle ignorée ; un modèle a reçu moins de fichiers |
| **3 · Uploads** | #6 liens de partage publics + JSON ; #15 tout est auditable | Un lien privé `chatgpt.com/c/…` ; un livrable caché sur le lien de partage et absent du zip |
| **4 · Ratings** | #2 satisfaction ; #11 issues (tag L2 + L3 + turns) ; #12 format de la ligne Detail | Un 5 avec une erreur non signalée ; un problème omis ; `[Other]` là où un tag du §6 convient ; un tag mal orthographié |
| **5 · Rubric & Country fit** | #13 notes conformes à l'état final avec turns cités ; #14 `[Category]: Comment` avec un détail local | Yes pour une étape que le modèle n'a jamais faite ; un commentaire Good générique sans détail local |
| **6 · Ranking** | #3 accord avec la QC ; #4 cohérence avec vos propres scores et la rubric | Un 4 classé au-dessus d'un 5 ; une justification qui nomme un meilleur modèle différent des champs de classement |

### Règles V6 souvent oubliées

- **Critical failure** — un fait faux énoncé comme vrai, sans nuance, dans quelque chose sur lequel l'utilisateur va agir (un chiffre, un tarif, une date, une règle juridique, une citation, un contact ou un texte qu'il va envoyer). Il va à **Issue #1** et **plafonne le modèle à 3**.
- **Language & locale fit** relève des Issues — Country fit vaut 2 ou 3, le problème étant écrit dans le Bad comment.
- **Garde-fou de la rubric** — ne classez jamais un modèle ayant moins de Yes de rubric au-dessus d'un autre en ayant plus, sauf si une exception prévue s'applique et que la justification l'explique.
- **`[FLAG]` ne change jamais une note.** Un critère qu'aucun modèle ne peut satisfaire (par exemple « uses KakaoTalk » sans connecteur) reste **No + `[FLAG: Impossible to satisfy]`**.

### La vérification du « lecteur étranger »

Avant de soumettre, relisez chaque champ comme quelqu'un qui n'a que le lien de partage :

1. Chaque problème est-il visible sur la page de partage, au turn que vous citez ?
2. Chaque ligne Detail cite-t-elle ce que le modèle a réellement dit, avec ses propres mots ?
3. Chaque justification de rubric nomme-t-elle le turn qui montre l'état final ?
4. La justification du classement nomme-t-elle les mêmes meilleur, moyen et pire que les champs de classement ?
5. Chaque fichier produit par les modèles est-il visible sur le lien ou dans le zip ?

### Manquements d'intégrité (échecs graves)

Ceux-ci signalent la tâche **et** le contributeur :

- Un JSON ou une capture provenant d'une autre conversation, d'un autre compte ou d'une autre tâche.
- Resoumettre les mêmes conversations sans changement après une demande de redo.
- Coller une conversation antérieure dans une nouvelle pour sauter les étapes.
- Téléverser des fichiers que les modèles n'ont pas produits.
- Des documents personnels dans les téléversements.

### Trois choses à retenir

1. **Une correction de l'utilisateur est toujours un problème.** Listez-la, au turn où elle a eu lieu.
2. **Votre classement doit suivre vos propres scores et la rubric.** Expliquez toute exception par écrit.
3. **Tout ce que vous évaluez doit être visible pour l'auditeur** — le lien de partage, le JSON ou le zip.
