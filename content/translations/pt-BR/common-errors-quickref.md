A maioria das tarefas falha no **formulário de avaliação**, não na conversa. Confira isto antes de enviar.

### Panorama da auditoria — 366 tarefas revisadas pela QC

| Posição | Onde as tarefas falham | Parcela das falhas |
|---|---|---|
| 1 | **#11 Issues** — um problema real omitido, ou um 5 com "No issues" apesar de um erro | 75% |
| 2 | #13 Notas da rubric contrariadas pela conversa | 33% |
| 3 | #12 Detail of issues — tag não copiado exatamente, formato errado | 25% |
| 4 | #7 Modelo ou modo errado | 16% |
| 5 | #2 Satisfaction errada por 2 pontos ou mais | 15% |
| 6 | #4 Ranking contraria seus próprios scores | 13% |
| 7 | #3 Ranking discorda da QC | 12% |
| 8 | #9 Next steps nunca pedidos / pergunta do modelo ignorada | 29% |

> ⚠️ **A maior causa de rejeição:** avaliar um modelo com **5 e "No issues"**, ou listar menos problemas do que a conversa mostra. Se o usuário teve que corrigir o modelo, ou o modelo afirmou um número, data, regra ou citação errados — isso é um issue. Nunca é "menor".

### Onde as tarefas são devolvidas — seis etapas

| Etapa | O que a QC verifica | Devolução típica |
|---|---|---|
| **1 · Setup** | #1 opening prompt literal; #7 modelo e modo na captura Model Check | Captura do Gemini sem o seletor em **Task**; ChatGPT em Instant ou "gpt-6-thinking"; o prompt reescrito ou traduzido |
| **2 · Conversation** | #9 cada next step pedido, perguntas do modelo respondidas; #10 os mesmos arquivos para os três modelos | Uma etapa nunca pedida; a pergunta de esclarecimento do modelo ignorada; um modelo recebeu menos arquivos |
| **3 · Uploads** | #6 links de compartilhamento públicos + JSON; #15 tudo auditável | Um link privado `chatgpt.com/c/…`; um entregável oculto no link de compartilhamento e ausente do zip |
| **4 · Ratings** | #2 satisfaction; #11 issues (tag L2 + L3 + turns); #12 formato da linha Detail | Um 5 com um erro não sinalizado; um issue omitido; `[Other]` onde cabe um tag do §6; um tag com erro de grafia |
| **5 · Rubric & Country fit** | #13 notas condizem com o estado final, com turns citados; #14 `[Category]: Comment` com um detalhe local | Yes para uma etapa que o modelo nunca fez; um comentário Good genérico sem detalhe local |
| **6 · Ranking** | #3 concordância com a QC; #4 coerente com seus próprios scores e a rubric | Um 4 classificado acima de um 5; uma justificativa que indica um melhor modelo diferente dos campos de classificação |

### Regras V6 que costumam passar batido

- **Critical failure** — um fato falso apresentado como verdadeiro, sem ressalva, em algo sobre o qual o usuário vai agir (um número, uma taxa, uma data, uma regra jurídica, uma citação, um contato ou um texto que ele vai enviar). Vai para **Issue #1** e **limita o modelo a 3**.
- **Language & locale fit** pertence aos Issues — Country fit é 2 ou 3, com o problema escrito no Bad comment.
- **Proteção da rubric** — nunca classifique um modelo com menos Yes de rubric acima de outro com mais, a menos que uma exceção prevista se aplique e a justificativa a explique.
- **`[FLAG]` nunca muda uma nota.** Um critério que nenhum modelo poderia cumprir (por exemplo "uses KakaoTalk" sem conector) permanece **No + `[FLAG: Impossible to satisfy]`**.

### A verificação do "leitor desconhecido"

Antes de enviar, releia cada campo como alguém que tem apenas o link de compartilhamento:

1. Todo issue pode ser visto na página de compartilhamento, no turn que você cita?
2. Cada linha Detail cita o que o modelo realmente disse, com as próprias palavras dele?
3. Cada justificativa da rubric indica o turn que mostra o estado final?
4. A justificativa do ranking indica o mesmo melhor, intermediário e pior que os campos de classificação?
5. Cada arquivo que os modelos criaram está visível no link ou no zip?

### Falhas graves de integridade

Estas sinalizam a tarefa **e** o contribuidor:

- Um JSON ou captura de outra conversa, conta ou tarefa.
- Reenviar as mesmas conversas sem alterações após um pedido de redo.
- Colar uma conversa anterior em uma nova para pular as etapas.
- Enviar arquivos que os modelos não produziram.
- Documentos pessoais nos uploads.

### Lembre-se de três coisas

1. **Uma correção do usuário é sempre um issue.** Liste-a, no turn em que aconteceu.
2. **Seu ranking deve seguir seus próprios scores e a rubric.** Explique qualquer exceção por escrito.
3. **Tudo o que você avalia deve estar visível para o auditor** — o link de compartilhamento, o JSON ou o zip.
