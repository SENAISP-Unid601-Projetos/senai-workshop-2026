# 🚀 Workshop SENAI 2026 — São Carlos

> **Portal oficial de apresentação e vitrine dos projetos dos formandos dos cursos técnicos em Desenvolvimento de Sistemas e Mecatrônica do SENAI São Carlos.**

🔗 **Acesse o site oficial:** [https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html](https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html)

---

## 📌 Sumário
- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [QR Codes e Deep Linking](#-qr-codes-e-deep-linking)
- [Sistema de Leads e Google Sheets](#-sistema-de-leads-e-google-sheets)
- [Como Adicionar ou Editar Projetos](#-como-adicionar-ou-editar-projetos)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy no GitHub Pages](#-deploy-no-github-pages)
- [Créditos e Equipe](#-créditos-e-equipe)

---

## 🌟 Visão Geral

O **Workshop SENAI 2026** reúne os projetos práticos desenvolvidos pelos alunos do SENAI São Carlos, conectando inovação, indústria 4.0, software e automação com o mercado de trabalho.

O portal foi concebido para ser leve, rápido, responsivo e 100% estático (compatível com GitHub Pages), oferecendo uma experiência imersiva tanto em desktops quanto em smartphones de visitantes do evento.

---

## ✨ Funcionalidades Principais

- 📱 **Mobile First & Responsivo**: Interface fluida adaptada para smartphones, tablets e desktops.
- 🌓 **Tema Claro e Escuro (Dark/Light Mode)**: Alternância suave com persistência no `localStorage`.
- 🌐 **Suporte Bilíngue (Português / Inglês)**: Troca instantânea de idioma sem recarregar a página.
- 🗂️ **Catálogo Dinâmico de Turmas e Projetos**:
  - Página inicial com estatísticas e acesso direto às turmas de **Desenvolvimento de Sistemas** e **Mecatrônica**.
  - Páginas dedicadas por turma com carrossel dinâmico, navegação por chips e grade de projetos.
- 🔍 **Modal Interativo de Detalhes**:
  - Abertura de modal com foco no projeto selecionado.
  - Links para **Pitch Técnico** (*Funcionamento*), **Pitch Comercial** (*Comercial*) e **Landing Page** (*Visitar site*).
- 🔲 **QR Code Único por Projeto (Deep Linking)**:
  - Cada projeto gera automaticamente seu próprio link e QR Code exclusivo (`#ds-1`, `#mec-1`, etc.).
  - Ao escanear o QR Code de um totem ou banner, a página é aberta **diretamente com o modal daquele projeto aberto**.
  - Botão discreto para exibir o QR Code, copiar link e **baixar em vetor SVG ou imagem PNG de alta resolução**.
- 🔳 **QR Code da Página Inicial**:
  - Ícone SVG elegante posicionado logo após *"Mecatrônica e Desenvolvimento de Sistemas"* no hero da página inicial.
  - Ao clicar, abre um modal com **QR Code em tamanho grande** para que visitantes acessem o portal geral do evento.
  - Suporte a download (SVG e PNG) e cópia rápida de link.
- 📊 **Telemetria e Captura de Leads**:
  - Rastreamento em tempo real de acessos à página inicial, visitas a turmas, aberturas de modais, cliques em pitches/sites e downloads de QR Code.
  - Integração assíncrona e segura via Webhook com **Google Sheets** (Google Apps Script).
  - Histórico local de auditoria mantido no navegador (`localStorage.senai_lead_history`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estrutura acessível e otimizada para SEO.
- **CSS3 Moderno**:
  - Variáveis CSS nativas (Design tokens).
  - Glassmorphism com `backdrop-filter`.
  - Animações e micro-interações fluidas.
  - Sem dependência de frameworks CSS pesados.
- **JavaScript Moderno (ES6+)**:
  - Arquitetura orientada a componentes modulares leves.
  - Renderização dinâmica orientada a dados via `js/data.js`.
- **Gerador de QR Code Embutido (`qrcode.min.js`)**:
  - Zero dependências externas (sem chamadas a APIs de terceiros).
  - Gera QR Codes vetoriais (SVG) e rasterizados (Canvas / PNG) instantaneamente offline.
- **Google Apps Script**:
  - Backend Serverless para receber leads via requisição POST e alimentar a planilha no Google Sheets.

---

## 📁 Estrutura do Projeto

```text
senai-workshop-2026/
├── index.html                 # Página inicial (Home do portal)
├── dashboard.html             # Dashboard ao vivo de avaliações e visitas
├── html/
│   ├── ds.html                # Página da turma de Desenvolvimento de Sistemas
│   └── mecatronica.html       # Página da turma de Mecatrônica
├── img/                       # Diretório de imagens (JPG / PNG)
│   ├── turmas/                # Capas das turmas (ds.jpg, mecatronica.jpg...)
│   └── projetos/              # Capas dos projetos (ds-1.jpg, mec-1.png...)
├── css/
│   ├── style.css              # Folha de estilos unificada (Dark/Light + Modais + QR)
│   └── dashboard.css          # Estilos do Dashboard e modo Tela Cheia
├── js/
│   ├── data.js                # BANCO DE DADOS: Dados dos cursos, equipe e projetos
│   ├── dashboard.js           # Lógica do dashboard, gráficos e timers
│   ├── leads.js               # Módulo de telemetria, captura e envio de leads
│   ├── main.js                # Lógica principal, rotas, carrossel e modais
│   └── qrcode.min.js          # Biblioteca autônoma de geração de QR Code
├── google-apps-script.js      # Código pronto para o Google Apps Script (Web App)
├── funcionalidades.txt        # Roadmap e controle de funcionalidades
└── README.md                  # Documentação do projeto
```

---

## 📱 QR Codes e Deep Linking

### Como funciona o Deep Linking por Projeto?
Cada projeto cadastrado em `js/data.js` recebe um identificador único através da propriedade `id` (por exemplo: `"ds-1"`, `"mec-2"`).

A URL gerada segue o padrão:
```text
https://seu-usuario.github.io/senai-workshop-2026/html/ds.html#ds-1
```
Quando o visitante escaneia o QR Code impresso no banner do grupo:
1. O navegador abre a página do curso correspondente.
2. O script detecta a presença do hash `#ds-1`.
3. O modal do respectivo projeto abre **imediatamente na tela**, destacando o card e registrando o lead de acesso via QR Code.

### QR Code da Página Inicial
No hero da página inicial, ao lado do texto *"Mecatrônica e Desenvolvimento de Sistemas"*, há um botão com o ícone de QR Code. Ao clicar:
1. Um modal dedicado é exibido com o QR Code da Home em destaque.
2. O visitante ou professor pode projetá-lo no telão ou permitir que pessoas escaneiem diretamente da tela.
3. Permite baixar o arquivo nos formatos **SVG** ou **PNG em alta resolução (800x800)** para impressão de materiais gráficos.

---

## 📊 Sistema de Leads e Google Sheets

O sistema rastreia os seguintes eventos de forma anônima e transparente:

| Tipo | Ação Rastreada | Descrição |
| :--- | :--- | :--- |
| **Lead Página** | Visita Página Inicial | Acesso de um visitante à home |
| **Lead Turma** | Visita Página da Turma | Acesso a DS ou Mecatrônica |
| **Lead Projeto** | Abriu Detalhes do Projeto | Clique no card para abrir o modal |
| **Lead Projeto** | Clique Funcionamento | Clique no link do Pitch Técnico |
| **Lead Projeto** | Clique Comercial | Clique no link do Pitch Comercial |
| **Lead Projeto** | Clique Visitar Site | Clique na Landing Page do grupo |
| **Lead Projeto** | Visualizou QR Code | Clique no botão para exibir o QR Code do projeto |
| **Lead QR Code** | Acesso via QR Code | Visitante chegou através do link/QR Code escaneado |
| **Lead QR Code** | Visualizou QR Code Página | Modal com QR Code da home foi aberto |
| **Lead QR Code** | Copiou Link / Baixou SVG/PNG | Ações de download e cópia de links |

### Como Conectar com o Google Sheets:

1. **Crie uma nova planilha** no Google Drive (ex: `Leads - Workshop SENAI 2026`).
2. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
3. Apague o código padrão que estiver no editor.
4. Abra o arquivo [`google-apps-script.js`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/google-apps-script.js) deste projeto, copie todo o seu conteúdo e cole no editor do Apps Script.
5. Selecione a função `initialSetup` no menu de funções do Apps Script e clique em **Executar** (conceda as permissões solicitadas pelo Google).
   - *Isso criará automaticamente os cabeçalhos coloridos e congelará a primeira linha.*
6. No canto superior direito, clique em **Implantar** > **Nova implantação**.
7. Clique no ícone de engrenagem ao lado de "Selecione o tipo" e escolha **App da Web**:
   - **Descrição:** `Webhook Leads SENAI`
   - **Executar como:** `Eu (seu-email@gmail.com)`
   - **Quem tem acesso:** `Qualquer pessoa` *(essencial para permitir o envio do GitHub Pages)*
8. Clique em **Implantar** e copie a **URL do app da Web** gerada (ela termina com `/exec`).
9. Abra o arquivo [`js/data.js`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/js/data.js) e cole a URL no campo `googleSheetsUrl`:
   ```javascript
   window.SITE = {
     googleSheetsUrl: "https://script.google.com/macros/s/AKfycb.../exec",
     ...
   };
   ```

---

## 📝 Como Adicionar ou Editar Projetos

Todas as informações do site são gerenciadas no arquivo [`js/data.js`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/js/data.js).

Para adicionar ou modificar um projeto, localize o array `projetos` da turma desejada (`ds` ou `mecatronica`) e configure o objeto:

```javascript
{
  id: "ds-1",                                     // ID único (usado no link e QR Code)
  nome: "Nome do Projeto",                        // Nome exibido nos cards e carrossel
  subtitulo: "Frase de impacto do projeto",        // Resumo curto
  descricao: "Descrição detalhada do projeto...", // Texto completo no modal
  imagem: "img/projetos/ds-1.jpg",                // Imagem local em img/projetos/ (ou URL externa, ou "")
  alunos: 5,                                      // Quantidade de integrantes
  landing: "https://...",                         // Link da Landing Page ("Visitar site")
  funcionamento: "https://...",                   // Link do Pitch Técnico ("Funcionamento")
  comercial: "https://..."                        // Link do Pitch Comercial ("Comercial")
}
```

> **Dica de Imagens:** As capas podem ser arquivos `.jpg` ou `.png`:
> - Salve as capas das turmas em [`img/turmas/`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/img/turmas) (ex: `img/turmas/ds.jpg`).
> - Salve as capas dos projetos em [`img/projetos/`](file:///Users/rafael.selvagio/Projetos/MyApps/SoftwaresIA/senai-workshop-2026/img/projetos) (ex: `img/projetos/ds-1.jpg`).
> - Se deixar `""`, o sistema exibe automaticamente a inicial estilizada do projeto.
>
> **Dica de Links:** Se algum link ainda não estiver disponível, mantenha como `""`. O botão exibirá o rótulo "Em breve" automaticamente com um aviso amigável ao ser clicado.

---

## 💻 Como Rodar Localmente

Por ser um projeto web estático, você pode abrir diretamente os arquivos `.html` no navegador ou subir um servidor local:

### Com Python 3:
```bash
# Na raiz do projeto:
python3 -m http.server 8000
```
Acesse no navegador: `http://localhost:8000`

### Com Node.js / npx:
```bash
npx serve .
```

### Com VS Code:
Instale a extensão **Live Server** e clique em **Go Live** no canto inferior.

---

## 🌐 Deploy no GitHub Pages

1. Faça o commit e envie suas alterações para o GitHub:
   ```bash
   git add .
   git commit -m "feat: atualizacoes do workshop"
   git push origin main
   ```
2. No repositório no GitHub, acesse a aba **Settings** (Configurações).
3. Na barra lateral esquerda, clique em **Pages**.
4. Em **Build and deployment** > **Branch**:
   - Selecione a branch `main`.
   - Selecione a pasta `/(root)`.
   - Clique em **Save**.
5. Em alguns instantes, o seu site estará publicado em:
   ```text
   https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html
   ```
6. URL base configurada em `js/data.js`:
   ```javascript
   baseUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026"
   ```

---

## 👥 Créditos e Equipe

- **Instituição:** SENAI São Carlos — Unidade 601
- **Ano:** 2026
- **Turmas:**
  - Técnico em Desenvolvimento de Sistemas
  - Técnico em Mecatrônica
- **Coordenação e Docência:** SENAI São Carlos

---
*Serviço Nacional de Aprendizagem Industrial — Formando o futuro da tecnologia e da indústria.*

