# 📋 Planejamento: Sistema de Captura de E-mails & Lembrete do Workshop SENAI 2026

**Branch:** `feature/captura-email`  
**Objetivo:** Permitir que visitantes e empresas cadastrem seus e-mails para receber lembretes antes do Workshop (02 e 03 de Dezembro) e informações sobre os projetos, salvando em aba dedicada do Google Sheets e oferecendo disparo de e-mails via Google Apps Script (conta `@docente.senai.br`).

---

## 🎯 Status das Tarefas

- [x] **1. Estrutura e Planejamento**
  - [x] Criar nova branch isolada `feature/captura-email`
  - [x] Criar documento de acompanhamento de tarefas (`TAREFAS-EMAIL.md`)
  - [x] Criar artefato de documentação da arquitetura e fluxo de dados

- [x] **2. Backend Google Apps Script (`google-apps-script.js`)**
  - [x] Implementar detecção/criação automática da aba dedicada `"Inscritos Lembrete"`
  - [x] Tratamento de dados no `doPost` para tipo `"Newsletter Lembrete"` (evitando duplicatas)
  - [x] Template de e-mail HTML responsivo com identidade visual oficial do SENAI São Carlos
  - [x] Envio de e-mail de confirmação imediata (boas-vindas/inscrição confirmada)
  - [x] Função `testarEnvioEmail()` para envio de teste ao docente/administrador autenticado
  - [x] Função `enviarLembretesWorkshop()` para mala direta dos lembretes pré-evento (evita reenvios)
  - [x] Menu customizado no Google Sheets (`onOpen`): "🔔 Workshop 2026" > Disparar Lembretes / Testar Envio

- [x] **3. Frontend: Módulo de Envio de Leads (`js/leads.js`)**
  - [x] Criar função `submitNewsletterLead(formData)` com validação de formato de e-mail
  - [x] Tratamento de retorno e persistência local (`senai_newsletter_email`, `senai_newsletter_subscribed`)
  - [x] Função `getNewsletterSubscription()` para recuperação de status
  - [x] Validador de formato de e-mail `isValidEmail(email)`

- [x] **4. Frontend: Internacionalização (`js/main.js`)**
  - [x] Adicionar dicionário bilíngue (PT / EN) para:
    - Badge, título, subtítulo e placeholders
    - Opções do perfil (Visitante, Empresa, Aluno, Professor)
    - Mensagens de validação e feedback de sucesso/erro
    - Card de estado "Já inscrito" com botão para trocar e-mail

- [x] **5. Frontend: Interface de Usuário (HTML e Componentes)**
  - [x] Criar botão de atalho `[ 🔔 Receber Lembrete ]` na hero section da Home
  - [x] Criar componente visual "🔔 Lembrete do Workshop" no `index.html` (renderHome)
  - [x] Adicionar seção de lembrete nas páginas de curso (`ds.html` e `mecatronica.html`)
  - [x] Feedback visual de envio (carregamento animado, sucesso, erro e alteração de e-mail)

- [x] **6. Estilização CSS (`css/style.css`)**
  - [x] Estilizar card da newsletter com gradiente, bordas suaves e efeito de luz (glow)
  - [x] Badge pulsante com sino (`pulse-bell`)
  - [x] Pílula de resumo do evento (data, hora e local)
  - [x] Estilização dos inputs, select estilizado e botão vermelho SENAI
  - [x] Suporte completo a Dark Mode e Light Mode
  - [x] Responsividade mobile para telas menores que 860px e 580px
  - [x] Atualizar links de versão dos assets (`?v=2.4`) em `index.html`, `html/ds.html` e `html/mecatronica.html`

- [x] **7. Testes e Validação Local**
  - [x] Validação sintática de todos os arquivos JS (`node -c`)
  - [x] Validação de balanceamento de chaves do CSS
  - [x] Testes unitários do validador de e-mail e funções de persistência
  - [x] Teste de renderização e integridade dos templates de e-mail

---

## 🚀 Como Testar Localmente

1. **Abrir a aplicação localmente:**
   - Execute um servidor local ou abra `index.html` no navegador.
   - Veja o botão novo `🔔 Receber Lembrete` no topo (Hero).
   - Role até a seção **"🔔 Lembrete do Workshop"** antes do rodapé.

2. **Testar formulário no frontend:**
   - Preencha Nome, E-mail e selecione seu perfil (Visitante, Empresa, Aluno, Professor).
   - Clique em **"Quero Receber Lembrete"**.
   - O sistema valida o e-mail, envia para a API, salva no `localStorage` e exibe o card de confirmação com seu e-mail cadastrado.
   - Ao recarregar a página, o card permanece no estado "Já cadastrado", permitindo clicar em **"Trocar e-mail cadastrado"** para cadastrar outro.

3. **Testar no Google Sheets / Google Apps Script:**
   - Copie o código atualizado de `google-apps-script.js` para o editor do Apps Script da planilha.
   - Recarregue a planilha do Google Sheets: surgirá o menu **"🔔 Workshop 2026"**.
   - Clique em **"🔔 Workshop 2026" > "✉️ Enviar E-mail de Teste para Mim"**.
   - A sua conta `@docente.senai.br` enviará um e-mail de teste com a formatação oficial para a sua própria caixa de entrada.
   - Os novos inscritos são salvos automaticamente na aba **"Inscritos Lembrete"**.
   - Antes do evento (ou para testar), clique em **"🔔 Workshop 2026" > "🚀 Disparar Lembretes para Todos os Inscritos"**.
