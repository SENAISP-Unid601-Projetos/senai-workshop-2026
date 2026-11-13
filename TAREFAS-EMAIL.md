# 📋 Planejamento: Sistema de Captura de E-mails & Régua de Lembretes do Workshop SENAI 2026

**Branch:** `feature/captura-email`  
**Backend Dedicado:** Planilha exclusiva na conta `@docente.senai.br` ([`google-apps-script-email.js`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/google-apps-script-email.js))

---

## 📬 Régua de 4 E-mails do Workshop

| # | Quando | Assunto | Objetivo & Conteúdo |
| :---: | :--- | :--- | :--- |
| **1** | **No momento do cadastro** | `🔔 Confirmação: Lembrete do Workshop SENAI 2026` | Confirmação imediata, agradecimento, data (02 e 03/12), horário (08h às 17h) e botão para ver projetos no portal. |
| **2** | **Véspera (01/12)** | `⏳ É Amanhã! Workshop SENAI 2026 — Prepare-se para ver as inovações` | Portões abrem amanhã às 08h, chamada para protótipos de DS e Mecatrônica, endereço e botão do Google Maps. |
| **3** | **1º Dia (02/12 às 07h)** | `🚀 É Hoje! O Workshop SENAI 2026 Começa às 08h — Estamos te esperando!` | O evento começou! Convite para visitar bancadas interativas e votar nos projetos pelo portal. |
| **4** | **2º Dia (03/12 às 07h)** | `⭐ Último Dia! Workshop SENAI 2026 — Encerramento das apresentações` | Última oportunidade para prestigiar os formandos e conferir os projetos inovadores até as 17h. |

---

## 🎯 Status das Tarefas

- [x] **1. Estrutura e Planejamento**
  - [x] Criar nova branch isolada `feature/captura-email`
  - [x] Definir régua com os 4 e-mails específicos
  - [x] Criar documento de acompanhamento de tarefas (`TAREFAS-EMAIL.md`)

- [x] **2. Backend Google Apps Script Dedicado (`google-apps-script-email.js`)**
  - [x] Estrutura da planilha com colunas individuais para cada um dos 4 e-mails
  - [x] `doPost(e)` com envio automático do **E-mail 1 (Confirmação Imediata)**
  - [x] Templates HTML customizados para cada uma das 4 mensagens
  - [x] Função de agendamento automático via triggers do Apps Script (`agendarDisparosAutomaticos()`)
  - [x] Disparos manuais de contingência para E-mails 2, 3 e 4
  - [x] Função `testarEnvioTodosModelos()` para enviar os 4 e-mails de teste para a caixa do docente
  - [x] Menu interativo no Google Sheets com 1 clique (`onOpen`)

- [x] **3. Frontend (`js/data.js` & `js/leads.js`)**
  - [x] Campo dedicado `newsletterSheetsUrl` em `window.SITE`
  - [x] Roteamento de leads de e-mail direto para o novo backend sem interferir no backend de votação
  - [x] Validação de e-mail e persistência local (`localStorage`)

- [x] **4. Interface & Estilização**
  - [x] Card responsivo com Dark/Light Mode e visual SENAI
  - [x] Botão de atalho na Hero section

---

## 🚀 Como Ativar os Envios Automáticos

1. Na planilha nova da conta `@docente.senai.br`, clique no menu:  
   **`🔔 Workshop 2026` > `⏰ Ativar Agendamento Automático (01/12, 02/12 e 03/12)`**
2. O Google Apps Script criará os gatilhos no servidor do Google:
   - 01/12/2026 às 09:00 -> Dispara E-mail 2
   - 02/12/2026 às 07:00 -> Dispara E-mail 3
   - 03/12/2026 às 07:00 -> Dispara E-mail 4
3. A qualquer momento você também pode disparar manualmente pelo menu se preferir!
