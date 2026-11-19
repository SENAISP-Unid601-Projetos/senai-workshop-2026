/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — SÃO CARLOS
 * BACKEND COMPLETO: CAPTURA DE LEADS, AVALIAÇÕES, API DASHBOARD &
 * RÉGUA OFICIAL DE 5 E-MAILS DE LEMBRETES (@docente.senai.br)
 * =====================================================================
 * Evento Oficial: 01, 02 e 03 de Dezembro de 2026 (08h às 17h)
 * Cursos Técnicos:
 *  - Desenvolvimento de Sistemas (DS)
 *  - Eletroeletrônica (ELE)
 *  - Mecatrônica (MEC)
 * Local: Escola SENAI Antonio Adolpho Lobbe — São Carlos/SP
 *
 * Funcionalidades Integradas:
 *  1. doPost(e):
 *     - Inscrição Newsletter/Lembrete -> grava na aba 'Inscritos Lembrete'
 *       e dispara imediatamente o E-mail 1 (Confirmação e Boas-vindas).
 *     - Leads, visitas em projetos e avaliações (Apresentação e Solução)
 *       -> grava na aba 'Leads Workshop 2026'.
 *  2. doGet(e) - API da Dashboard em Tempo Real:
 *     - Contabilização isolada de visitas por curso (DS, ELE e MEC).
 *       (Acessos gerais à Home NÃO entram na contagem das turmas).
 *     - Top 5 Mais Bem Votados e Top 5 Menos Votados para DS, ELE e MEC.
 *     - Suporte a JSON e JSONP (callback).
 *  3. Régua de 5 E-mails de Lembrete:
 *     - E-mail 1 (Imediato no cadastro): Confirmação de inscrição e boas-vindas
 *     - E-mail 2 (30/11 às 08h): "Faltam 2 dias! Prepare-se para o Workshop SENAI 2026"
 *     - E-mail 3 (01/12 às 07h - Dia 1): "É hoje! O 1º dia do Workshop SENAI 2026 começou"
 *     - E-mail 4 (02/12 às 07h - Dia 2): "2º Dia! O Workshop SENAI 2026 continua"
 *     - E-mail 5 (03/12 às 07h - Dia 3): "Último dia! Encerramento do Workshop SENAI 2026"
 *  4. Agendamento Automático via Triggers do Google Apps Script:
 *     - Disparos automáticos programados no fuso 'America/Sao_Paulo'.
 *     - Pausas de segurança (Utilities.sleep(120)) anti-bloqueio.
 *  5. Menu na Planilha ("🔔 Workshop 2026"):
 *     - Testes rápidos para o e-mail do próprio docente.
 *     - Ativação/Cancelamento de agendamentos com 1 clique.
 *     - Disparos manuais de cada lote de e-mails.
 *     - Formatação e conferência de cabeçalhos das abas.
 *
 * --- COMO ATUALIZAR NO GOOGLE APPS SCRIPT ---
 * 1. Abra a planilha no Google Sheets.
 * 2. Acesse: Extensões > Apps Script.
 * 3. Substitua TODO o código existente por este arquivo (ou por google-apps-script-email.js).
 * 4. Salve (Ctrl+S ou ícone de disquete).
 * 5. Clique no botão azul "Implantar" (Deploy) > "Gerenciar implantações" (Manage deployments).
 * 6. Clique no ícone de lápis ✏️ ao lado da implantação ativa:
 *    - Em "Versão", selecione "Nova versão" (New version).
 *    - Em "Quem pode acessar", selecione "Qualquer pessoa" (Anyone).
 * 7. Clique em "Implantar" (Deploy).
 * =====================================================================
 */

/**
 * =====================================================================
 * GESTÃO DAS ABAS NA PLANILHA
 * =====================================================================
 */

/**
 * Obtém ou localiza a aba principal de Leads e Avaliações
 */
function getWorkshopSheet(ss) {
  var targetSs = ss;
  if (!targetSs) {
    try {
      targetSs = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {
      targetSs = null;
    }
  }

  if (targetSs) {
    var sByName = targetSs.getSheetByName("Leads Workshop 2026") || targetSs.getSheetByName("Leads");
    if (sByName) return sByName;
    try {
      var sActive = targetSs.getActiveSheet();
      if (sActive) return sActive;
    } catch (e) {}
    var allSheets = targetSs.getSheets();
    if (allSheets && allSheets.length > 0) return allSheets[0];
  }

  try {
    var directSheet = SpreadsheetApp.getActiveSheet();
    if (directSheet) return directSheet;
  } catch (e) {}

  throw new Error("Planilha não encontrada. Abra a partir de Extensões > Apps Script na planilha do evento.");
}

/**
 * Obtém ou cria a aba dedicada para os inscritos da Newsletter / Régua de Lembretes
 */
function getNewsletterSheet(ss) {
  var targetSs = ss || SpreadsheetApp.getActiveSpreadsheet();
  var sheet = targetSs.getSheetByName("Inscritos Lembrete") || targetSs.getSheetByName("Newsletter");
  if (!sheet) {
    sheet = targetSs.insertSheet("Inscritos Lembrete");
    setupNewsletterHeaders(sheet);
  }
  return sheet;
}

/**
 * =====================================================================
 * CONFIGURAÇÃO DE CABEÇALHOS
 * =====================================================================
 */

/**
 * Configuração dos cabeçalhos da aba 'Leads Workshop 2026' (12 Colunas)
 */
function setupSheetHeaders(sheet) {
  sheet.setName("Leads Workshop 2026");

  var headers = [
    "Data e Hora",
    "Tipo de Lead",
    "Turma",
    "ID Projeto",
    "Nome do Projeto",
    "Ação / Evento",
    "Detalhes / URL",
    "Página",
    "Dispositivo",
    "URL de Origem",
    "Nota Apresentação",
    "Nota Ideia e Solução"
  ];

  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#e4002b");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  var widths = [150, 130, 170, 100, 180, 170, 260, 90, 110, 260, 150, 170];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

/**
 * Garante que as colunas de avaliação existam na aba de Leads
 */
function ensureEvaluationHeaders(sheet) {
  var maxCols = sheet.getLastColumn();
  if (maxCols < 11 || !sheet.getRange(1, 11).getValue()) {
    var range = sheet.getRange(1, 11, 1, 2);
    range.setValues([["Nota Apresentação", "Nota Ideia e Solução"]]);
    range.setBackground("#e4002b");
    range.setFontColor("#ffffff");
    range.setFontWeight("bold");
    range.setFontSize(11);
    range.setHorizontalAlignment("center");
    range.setVerticalAlignment("middle");
    sheet.setColumnWidth(11, 150);
    sheet.setColumnWidth(12, 170);
  }
}

/**
 * Configuração dos cabeçalhos da aba 'Inscritos Lembrete' (10 Colunas)
 */
function setupNewsletterHeaders(sheet) {
  sheet.setName("Inscritos Lembrete");

  var headers = [
    "Data e Hora",
    "Nome",
    "E-mail",
    "Perfil / Segmento",
    "Origem / Página",
    "E-mail 1 (Cadastro)",
    "E-mail 2 (30/11 08h)",
    "E-mail 3 (01/12 07h)",
    "E-mail 4 (02/12 07h)",
    "E-mail 5 (03/12 07h)"
  ];

  sheet.clear();
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#e4002b");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  var widths = [160, 190, 250, 160, 140, 190, 190, 190, 190, 190];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

// Atalhos manuais para o menu
function formatarPlanilhaManualmente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getNewsletterSheet(ss);
  setupNewsletterHeaders(sheet);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", "Aba 'Inscritos Lembrete' configurada com sucesso para a régua oficial de 5 e-mails (10 colunas)!", SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
}

function setupWorkshopHeadersManualmente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getWorkshopSheet(ss);
  if (sheet.getLastRow() === 0) {
    setupSheetHeaders(sheet);
  } else {
    ensureEvaluationHeaders(sheet);
  }
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", "Aba 'Leads Workshop 2026' configurada/atualizada com sucesso (12 colunas)!", SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
}

/**
 * =====================================================================
 * PONTO DE ENTRADA HTTP POST (doPost)
 * =====================================================================
 * Roteia automaticamente:
 *  - Inscrições de lembretes para 'Inscritos Lembrete'
 *  - Cliques, leads e notas de avaliação para 'Leads Workshop 2026'
 * =====================================================================
 */
function doPost(e) {
  e = e || {};
  if (!e.parameter) e.parameter = {};

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    // Identifica se a chamada é de Inscrição na Newsletter / Régua de Lembretes
    var isNewsletter = (data.tipo === "Newsletter Lembrete") ||
                       (data.tipo === "Inscrição Newsletter") ||
                       (data.acao === "Inscrição Lembrete Workshop");

    if (isNewsletter) {
      return processarInscricaoNewsletter(ss, data, timestamp);
    }

    // Caso contrário, grava na aba principal de Leads e Avaliações
    var sheet = getWorkshopSheet(ss);

    if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet);
    } else {
      ensureEvaluationHeaders(sheet);
    }

    var notaApresentacao = "";
    if (data.nota_apresentacao !== undefined && data.nota_apresentacao !== null && data.nota_apresentacao !== "") {
      var numAp = Number(data.nota_apresentacao);
      if (!isNaN(numAp) && numAp > 0) {
        notaApresentacao = numAp;
      }
    }

    var notaProjeto = "";
    if (data.nota_projeto !== undefined && data.nota_projeto !== null && data.nota_projeto !== "") {
      var numProj = Number(data.nota_projeto);
      if (!isNaN(numProj) && numProj > 0) {
        notaProjeto = numProj;
      }
    }

    var row = [
      timestamp,
      data.tipo || "Interação",
      data.turma || "-",
      data.projeto_id || "-",
      data.projeto_nome || "-",
      data.acao || "-",
      data.mensagem || "-",
      data.pagina || "-",
      data.dispositivo || "-",
      data.origem || "-",
      notaApresentacao,
      notaProjeto
    ];

    sheet.appendRow(row);

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setFontSize(10).setVerticalAlignment("middle");

    if (notaApresentacao !== "" || notaProjeto !== "") {
      sheet.getRange(lastRow, 11, 1, 2).setHorizontalAlignment("center");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * =====================================================================
 * GESTÃO DE INSCRIÇÕES NA NEWSLETTER (Régua de 5 E-mails)
 * =====================================================================
 */
function processarInscricaoNewsletter(ss, data, timestamp) {
  var sheet = getNewsletterSheet(ss);
  if (sheet.getLastRow() === 0) {
    setupNewsletterHeaders(sheet);
  }

  var nome = String(data.nome || "Visitante").trim();
  var email = String(data.email || data.contato || "").toLowerCase().trim();
  var perfil = String(data.perfil || data.empresa || "Visitante").trim();
  var origem = String(data.pagina || data.origem || "Home").trim();

  if (!email || email.indexOf("@") === -1) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "E-mail inválido fornecido." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Verifica se o e-mail já existe na coluna C (coluna 3) para evitar duplicações
  var lastRow = sheet.getLastRow();
  var linhaAlvo = -1;
  if (lastRow > 1) {
    var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (var i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase().trim() === email) {
        linhaAlvo = i + 2;
        break;
      }
    }
  }

  // Dispara E-mail 1: Confirmação Imediata de Cadastro e Boas-vindas
  var statusEmail1 = "E-mail não enviado";
  try {
    dispararEmail1Cadastro(nome, email, perfil);
    statusEmail1 = "Confirmado via E-mail";
  } catch (emailErr) {
    statusEmail1 = "Falha (" + emailErr.message + ")";
  }

  if (linhaAlvo !== -1) {
    // Atualiza dados cadastrais (colunas 1 a 6) mantendo intactos os status dos e-mails 2 a 5
    sheet.getRange(linhaAlvo, 1, 1, 6).setValues([[
      timestamp,
      nome,
      email,
      perfil,
      origem,
      statusEmail1
    ]]);
  } else {
    // Insere novo inscrito com as 10 colunas da régua de 5 e-mails
    sheet.appendRow([
      timestamp,    // Col 1: Data e Hora
      nome,         // Col 2: Nome
      email,        // Col 3: E-mail
      perfil,       // Col 4: Perfil / Segmento
      origem,       // Col 5: Origem / Página
      statusEmail1, // Col 6: E-mail 1 (Cadastro - Imediato)
      "Pendente",   // Col 7: E-mail 2 (30/11 às 08h)
      "Pendente",   // Col 8: E-mail 3 (01/12 às 07h - Dia 1)
      "Pendente",   // Col 9: E-mail 4 (02/12 às 07h - Dia 2)
      "Pendente"    // Col 10: E-mail 5 (03/12 às 07h - Dia 3)
    ]);
    linhaAlvo = sheet.getLastRow();
    sheet.getRange(linhaAlvo, 1, 1, 10).setFontSize(10).setVerticalAlignment("middle");
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      tipo: "newsletter",
      row: linhaAlvo,
      email: email,
      message: "Inscrição confirmada com sucesso!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =====================================================================
 * API DO DASHBOARD (doGet) — SUPORTE A DS, ELE E MEC
 * =====================================================================
 * Regras:
 *  - Visitas: contabiliza APENAS acessos na turma e nos projetos (DS, ELE e MEC).
 *    Acessos gerais à página inicial ("home", "Geral") NÃO entram na contagem.
 *  - Rankings: Top 5 mais bem votados e Top 5 menos votados por turma.
 *  - Suporta JSON e JSONP (callback) para conexão sem bloqueio de CORS.
 * =====================================================================
 */
function doGet(e) {
  e = e || {};
  if (!e.parameter) e.parameter = {};

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getWorkshopSheet(ss);

    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return buildApiResponse(e, {
        status: "empty",
        mensagem: "A planilha ainda não possui registros de dados.",
        visitas: { ds: 0, ele: 0, mec: 0, total: 0 },
        ds: {
          top5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          totalAvaliados: 0
        },
        ele: {
          top5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          totalAvaliados: 0
        },
        mec: {
          top5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom3: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          top4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom4: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          totalAvaliados: 0
        }
      });
    }

    var values = sheet.getDataRange().getValues();
    var headerRow = values[0];
    var rows = values.slice(1);

    // Mapeamento dinâmico e seguro dos cabeçalhos
    var colMap = {
      tipo: 1,
      turma: 2,
      projId: 3,
      projNome: 4,
      acao: 5,
      pagina: 7,
      notaAp: 10,
      notaSol: 11
    };

    for (var c = 0; c < headerRow.length; c++) {
      var h = String(headerRow[c] || "").toLowerCase().trim();

      // 1. Colunas de Notas
      if (h.indexOf("apresenta") !== -1) {
        colMap.notaAp = c;
      } else if (h.indexOf("solu") !== -1 || h.indexOf("ideia") !== -1 || (h.indexOf("nota") !== -1 && h.indexOf("proj") !== -1)) {
        colMap.notaSol = c;
      }
      // 2. Colunas de Projeto
      else if (h === "id" || h === "id projeto" || h === "id do projeto" || (h.indexOf("id") !== -1 && h.indexOf("ideia") === -1 && h.indexOf("dispositivo") === -1)) {
        colMap.projId = c;
      } else if (h.indexOf("nome") !== -1) {
        colMap.projNome = c;
      }
      // 3. Colunas de Turma, Tipo, Ação e Página
      else if (h.indexOf("turma") !== -1 || h === "curso") {
        colMap.turma = c;
      } else if (h.indexOf("tipo") !== -1) {
        colMap.tipo = c;
      } else if ((h.indexOf("ação") !== -1 || h.indexOf("acao") !== -1 || h.indexOf("evento") !== -1) && h.indexOf("apresenta") === -1) {
        colMap.acao = c;
      } else if (h.indexOf("página") !== -1 || h.indexOf("pagina") !== -1) {
        colMap.pagina = c;
      }
    }

    var visitasDS = 0;
    var visitasELE = 0;
    var visitasMEC = 0;

    var mapaDS = {};
    var mapaELE = {};
    var mapaMEC = {};

    function parseRatingNumber(val) {
      if (val === undefined || val === null || val === "") return 0;
      if (typeof val === "number") return isNaN(val) ? 0 : val;
      var clean = String(val).trim().replace(',', '.').replace(/[^0-9.]/g, '');
      var parsed = parseFloat(clean);
      return isNaN(parsed) ? 0 : parsed;
    }

    function pagLowerIsHome(p) {
      return p === "home" || p === "" || p === "-" || p === "index" || p === "index.html" || p === "geral";
    }

    // Normalização de chaves de projetos para agregação consistente
    function normalizarChaveProjeto(id, nome, turma, isDS, isELE, isMEC) {
      var idClean = String(id || "").toLowerCase().trim();
      var nomeClean = String(nome || "").toLowerCase().trim();
      var turmaClean = String(turma || "").toLowerCase().trim();

      var prefix = "ds";
      if (isELE || turmaClean.indexOf("eletro") !== -1 || turmaClean === "ele" || idClean.indexOf("ele") === 0 || nomeClean.indexOf("ele") !== -1) {
        prefix = "ele";
      } else if (isMEC || turmaClean.indexOf("meca") !== -1 || turmaClean === "mec" || idClean.indexOf("mec") === 0 || nomeClean.indexOf("mec") !== -1) {
        prefix = "mec";
      } else {
        prefix = "ds";
      }

      // 1. Extrai número do ID (ex: "ele-1", "ele1", "ds-2", "mec-1", "2")
      var idNum = idClean.match(/(\d+)/);
      if (idNum) {
        return prefix + "-" + Number(idNum[1]);
      }

      // 2. Extrai número do Nome (ex: "Projeto ELE 2", "Projeto DS 2", "Grupo 2")
      var nomeNum = nomeClean.match(/(\d+)/);
      if (nomeNum) {
        return prefix + "-" + Number(nomeNum[1]);
      }

      var fallback = idClean && idClean !== "-" ? idClean : nomeClean;
      return fallback || (prefix + "-projeto");
    }

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var tipoRaw = String(row[colMap.tipo] || "").trim();
      var turmaRaw = String(row[colMap.turma] || "").trim();
      var projId = String(row[colMap.projId] || "").trim();
      var projNome = String(row[colMap.projNome] || "").trim();
      var acaoRaw = String(row[colMap.acao] || "").trim();
      var pagina = String(row[colMap.pagina] || "").trim().toLowerCase();

      var notaAp = parseRatingNumber(row[colMap.notaAp]);
      var notaSol = parseRatingNumber(row[colMap.notaSol]);

      var turmaLower = turmaRaw.toLowerCase();
      var projIdLower = projId.toLowerCase();
      var projNomeLower = projNome.toLowerCase();
      var tipoLower = tipoRaw.toLowerCase();
      var acaoLower = acaoRaw.toLowerCase();

      // Identificação precisa dos 3 cursos técnicos
      var isDS = turmaLower.indexOf("desenvolvimento") !== -1 ||
                 turmaLower.indexOf("sistemas") !== -1 ||
                 turmaLower === "ds" ||
                 projIdLower.indexOf("ds") === 0 ||
                 projNomeLower.indexOf("ds") !== -1 ||
                 pagina === "ds";

      var isELE = turmaLower.indexOf("eletro") !== -1 ||
                  turmaLower === "ele" ||
                  projIdLower.indexOf("ele") === 0 ||
                  projNomeLower.indexOf("ele") !== -1 ||
                  pagina === "eletroeletronica";

      var isMEC = turmaLower.indexOf("meca") !== -1 ||
                  turmaLower === "mec" ||
                  projIdLower.indexOf("mec") === 0 ||
                  projNomeLower.indexOf("mec") !== -1 ||
                  pagina === "mecatronica";

      // REGRA: Contabilizar apenas acessos na TURMA e nos PROJETOS (DS, ELE e MEC).
      // Acessos à página inicial geral NÃO entram na contagem das turmas.
      var isAcessoPaginaGeral = (tipoLower.indexOf("página") !== -1 || tipoLower.indexOf("pagina") !== -1) &&
                                (pagLowerIsHome(pagina) || turmaLower === "geral" || acaoLower.indexOf("página inicial") !== -1);

      if (!isAcessoPaginaGeral) {
        if (isDS) {
          visitasDS++;
        } else if (isELE) {
          visitasELE++;
        } else if (isMEC) {
          visitasMEC++;
        }
      }

      // Processa avaliações para os rankings
      var temNotaAp = notaAp > 0;
      var temNotaSol = notaSol > 0;

      if (temNotaAp || temNotaSol) {
        var key = normalizarChaveProjeto(projId, projNome, turmaRaw, isDS, isELE, isMEC);

        var mapa = isELE
          ? mapaELE
          : (isMEC
            ? mapaMEC
            : (isDS
              ? mapaDS
              : (key.indexOf("ele") === 0 ? mapaELE : (key.indexOf("mec") === 0 ? mapaMEC : mapaDS))));

        if (!mapa[key]) {
          var numKey = key.match(/(\d+)/);
          var padraoNome = (key.indexOf("ele") === 0)
            ? ("Projeto ELE " + (numKey ? numKey[1] : ""))
            : ((key.indexOf("mec") === 0)
              ? ("Projeto MEC " + (numKey ? numKey[1] : ""))
              : ("Projeto DS " + (numKey ? numKey[1] : "")));

          var nomeFinal = (projNome && projNome !== "-" && projNome.toLowerCase() !== "projeto") ? projNome : padraoNome;

          mapa[key] = {
            id: key,
            nome: nomeFinal,
            somaAp: 0,
            qtdAp: 0,
            somaSol: 0,
            qtdSol: 0
          };
        }

        if (temNotaAp) {
          mapa[key].somaAp += notaAp;
          mapa[key].qtdAp++;
        }
        if (temNotaSol) {
          mapa[key].somaSol += notaSol;
          mapa[key].qtdSol++;
        }
      }
    }

    // Calcula médias e extrai rankings dos Top 5 mais e Top 5 menos votados
    function processarMapaTop5(mapa) {
      var lista = [];
      for (var k in mapa) {
        var p = mapa[k];
        var mediaAp = p.qtdAp > 0 ? (p.somaAp / p.qtdAp) : 0;
        var mediaSol = p.qtdSol > 0 ? (p.somaSol / p.qtdSol) : 0;
        var mediaGeral = 0;

        if (p.qtdAp > 0 && p.qtdSol > 0) {
          mediaGeral = (mediaAp + mediaSol) / 2;
        } else if (p.qtdAp > 0) {
          mediaGeral = mediaAp;
        } else if (p.qtdSol > 0) {
          mediaGeral = mediaSol;
        }

        lista.push({
          id: p.id,
          nome: p.nome,
          apresentacao: Number(mediaAp.toFixed(2)),
          solucaoTecnica: Number(mediaSol.toFixed(2)),
          mediaGeral: Number(mediaGeral.toFixed(2)),
          totalVotos: Math.max(p.qtdAp, p.qtdSol)
        });
      }

      // Ordena por maior média geral (desempate por maior número de votos)
      lista.sort(function(a, b) {
        if (b.mediaGeral !== a.mediaGeral) return b.mediaGeral - a.mediaGeral;
        return b.totalVotos - a.totalVotos;
      });

      var total = lista.length;
      var top5Raw = lista.slice(0, 5);
      var bottom5Raw = total > 5 ? lista.slice(total - 5) : lista.slice().reverse().slice(0, 5);

      var top5 = {
        projetos: top5Raw.map(function(item, idx) { return (idx + 1) + "º " + item.nome; }),
        apresentacao: top5Raw.map(function(item) { return item.apresentacao; }),
        solucaoTecnica: top5Raw.map(function(item) { return item.solucaoTecnica; }),
        medias: top5Raw.map(function(item) { return item.mediaGeral; }),
        votos: top5Raw.map(function(item) { return item.totalVotos; })
      };

      var bottom5 = {
        projetos: bottom5Raw.map(function(item, idx) {
          var pos = total > 5 ? (total - 5 + idx + 1) : (total - idx);
          return pos + "º " + item.nome;
        }),
        apresentacao: bottom5Raw.map(function(item) { return item.apresentacao; }),
        solucaoTecnica: bottom5Raw.map(function(item) { return item.solucaoTecnica; }),
        medias: bottom5Raw.map(function(item) { return item.mediaGeral; }),
        votos: bottom5Raw.map(function(item) { return item.totalVotos; })
      };

      return {
        top5: top5,
        bottom5: bottom5,
        top3: top5,
        bottom3: bottom5,
        top4: top5,
        bottom4: bottom5,
        totalAvaliados: total
      };
    }

    var dsProcessado = processarMapaTop5(mapaDS);
    var eleProcessado = processarMapaTop5(mapaELE);
    var mecProcessado = processarMapaTop5(mapaMEC);

    var response = {
      status: "success",
      timestamp: Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss"),
      totalLinhas: rows.length,
      visitas: {
        ds: visitasDS,
        ele: visitasELE,
        mec: visitasMEC,
        total: visitasDS + visitasELE + visitasMEC
      },
      ds: dsProcessado,
      ele: eleProcessado,
      mec: mecProcessado
    };

    // Modo debug para auditoria de linhas com avaliações na planilha (?debug=1)
    if (e && e.parameter && (e.parameter.debug == "1" || e.parameter.debug == "true")) {
      response.debug = {
        planilhaNome: sheet.getName(),
        totalLinhasPlanilha: rows.length,
        colunasMapeadas: colMap,
        avaliacoesEncontradas: rows.map(function(r, idx) {
          var ap = parseRatingNumber(r[colMap.notaAp]);
          var sol = parseRatingNumber(r[colMap.notaSol]);
          var id = String(r[colMap.projId] || "").trim();
          var nome = String(r[colMap.projNome] || "").trim();
          var turma = String(r[colMap.turma] || "").trim();
          var tipo = String(r[colMap.tipo] || "").trim();
          var tLower = turma.toLowerCase();
          var iLower = id.toLowerCase();
          var isD = tLower.indexOf("ds") !== -1 || iLower.indexOf("ds") !== -1;
          var isE = tLower.indexOf("eletro") !== -1 || tLower === "ele" || iLower.indexOf("ele") === 0;
          var isM = tLower.indexOf("mec") !== -1 || iLower.indexOf("mec") === 0;

          return {
            linha: idx + 2,
            tipo: tipo,
            turma: turma,
            projId: id,
            projNome: nome,
            notaApresentacao: ap,
            notaSolucao: sol,
            chaveNormalizada: normalizarChaveProjeto(id, nome, turma, isD, isE, isM)
          };
        }).filter(function(item) {
          return item.notaApresentacao > 0 || item.notaSolucao > 0 || item.tipo.toLowerCase().indexOf("aval") !== -1;
        })
      };
    }

    return buildApiResponse(e, response);

  } catch (err) {
    return buildApiResponse(e, { status: "error", message: err.toString() });
  }
}

/**
 * Constrói a saída em formato JSON ou JSONP (callback)
 */
function buildApiResponse(e, data) {
  var jsonStr = JSON.stringify(data);
  if (e && e.parameter && e.parameter.callback) {
    return ContentService
      .createTextOutput(e.parameter.callback + "(" + jsonStr + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(jsonStr)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =====================================================================
 * RÉGUA OFICIAL DE DISPARO DE E-MAILS (5 ESTÁGIOS)
 * =====================================================================
 */

/**
 * Disparador individual do E-mail 1 (Inscrição imediata e confirmação)
 */
function dispararEmail1Cadastro(nome, email, perfil) {
  enviarEmailPorEstagio("confirmacao", nome, email, perfil);
}

// Compatibilidade com nome legado
function enviarEmailConfirmacao(nome, email, perfil) {
  dispararEmail1Cadastro(nome, email, perfil);
}

/**
 * Disparador genérico em lote para qualquer uma das colunas (7, 8, 9 ou 10)
 * Inclui pausa de segurança (Utilities.sleep(120)) para respeitar cotas do Google Mail
 */
function dispararLoteEmail(estagio, colunaStatus, rotulo) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getNewsletterSheet(ss);
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    var msgVazia = "Nenhum inscrito cadastrado na aba 'Inscritos Lembrete'.";
    Logger.log(msgVazia);
    return msgVazia;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  var totalEnviados = 0;
  var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var nome = row[1];
    var email = row[2];
    var perfil = row[3];
    var statusAtual = String(row[colunaStatus - 1] || "");

    // Só envia se for e-mail válido e ainda não tiver sido enviado
    if (email && String(email).indexOf("@") !== -1 && statusAtual.indexOf("Enviado") === -1 && statusAtual.indexOf("Confirmado") === -1) {
      try {
        enviarEmailPorEstagio(estagio, nome, email, perfil);
        sheet.getRange(i + 2, colunaStatus).setValue("Enviado em " + timestamp);
        totalEnviados++;
        Utilities.sleep(120); // Pausa de segurança anti-bloqueio de 120ms
      } catch (err) {
        sheet.getRange(i + 2, colunaStatus).setValue("Falha: " + err.message);
      }
    }
  }

  var msgFinal = rotulo + ": " + totalEnviados + " e-mail(s) enviado(s) com sucesso.";
  Logger.log(msgFinal);
  return msgFinal;
}

// E-mail 2: 30/11 às 08:00 (Faltam 2 dias)
function dispararEmail30Nov() {
  var resultado = dispararLoteEmail("30nov", 7, "E-mail 2 (30/11 às 08h)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// E-mail 3: 01/12 às 07:00 (Dia 1 - É hoje!)
function dispararEmail01Dez() {
  var resultado = dispararLoteEmail("01dez", 8, "E-mail 3 (01/12 às 07h)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// E-mail 4: 02/12 às 07:00 (Dia 2 - Continuação)
function dispararEmail02Dez() {
  var resultado = dispararLoteEmail("02dez", 9, "E-mail 4 (02/12 às 07h)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// E-mail 5: 03/12 às 07:00 (Dia 3 - Encerramento)
function dispararEmail03Dez() {
  var resultado = dispararLoteEmail("03dez", 10, "E-mail 5 (03/12 às 07h)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// Compatibilidade com chamadas anteriores
function dispararEmailVespera() { return dispararEmail30Nov(); }
function dispararEmailDia1() { return dispararEmail01Dez(); }
function dispararEmailDia2() { return dispararEmail02Dez(); }
function dispararEmailDia3() { return dispararEmail03Dez(); }
function enviarLembretesWorkshop() { return dispararEmail30Nov(); }

/**
 * =====================================================================
 * ENVIO DE E-MAIL E CONTEÚDOS ESPECÍFICOS DE CADA ETAPA
 * =====================================================================
 */
function enviarEmailPorEstagio(estagio, nome, email, perfil) {
  var config = obterConteudoEmail(estagio, nome, perfil);

  MailApp.sendEmail({
    to: email,
    subject: config.assunto,
    htmlBody: gerarHtmlCompleto(config),
    name: "SENAI São Carlos — Workshop 2026"
  });
}

function obterConteudoEmail(estagio, nome, perfil) {
  var nomeDisplay = (nome && nome !== "Visitante") ? nome : "Prezado(a) Visitante";

  switch (estagio) {
    case "confirmacao":
      return {
        nome: nomeDisplay,
        tag: "Inscrição Confirmada",
        assunto: "🔔 Confirmação: Lembrete do Workshop SENAI 2026",
        titulo: "Seu lembrete está confirmado!",
        subtitulo: "Agradecemos pelo seu interesse no <strong>Workshop SENAI 2026</strong>. Você receberá avisos e lembretes exclusivos antes e durante o evento para acompanhar os projetos inovadores de <strong>Desenvolvimento de Sistemas</strong>, <strong>Eletroeletrônica</strong> e <strong>Mecatrônica</strong>.",
        destaque: "📅 O evento ocorrerá nos dias <strong>01, 02 e 03 de Dezembro de 2026</strong>, das <strong>08h às 17h</strong>, com <strong>Entrada Gratuita</strong>.",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "🚀 Ver Projetos no Portal"
      };

    case "30nov":
    case "vespera":
      return {
        nome: nomeDisplay,
        tag: "Faltam 2 Dias • Contagem Regressiva",
        assunto: "⏳ Faltam 2 dias! Workshop SENAI 2026 — Prepare-se para ver as inovações",
        titulo: "A contagem regressiva começou: faltam 2 dias!",
        subtitulo: "Na próxima terça-feira (01/12), tem início o Workshop SENAI 2026! Alunos formandos dos cursos técnicos de <strong>Desenvolvimento de Sistemas</strong>, <strong>Eletroeletrônica</strong> e <strong>Mecatrônica</strong> demonstrarão protótipos industriais, automação robótica, sistemas IoT, inteligência artificial e softwares aplicados.",
        destaque: "📍 <strong>Local:</strong> Escola SENAI Antonio Adolpho Lobbe (Rua Cândido Padim, 25 - Vila Prado). O evento abre na terça (01/12) às 08h!",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "🔍 Conhecer os Projetos"
      };

    case "01dez":
    case "dia1":
      return {
        nome: nomeDisplay,
        tag: "1º Dia • Começa Hoje!",
        assunto: "🚀 É Hoje! O 1º dia do Workshop SENAI 2026 começou — Estamos te esperando!",
        titulo: "Os portões abrem hoje às 08h!",
        subtitulo: "O 1º dia do <strong>Workshop SENAI 2026</strong> está oficialmente aberto! Venha interagir diretamente com os estudantes nas bancadas de teste, ver de perto protótipos em funcionamento e participar da votação das melhores ideias técnicas e comerciais.",
        destaque: "⭐ <strong>Você pode votar nos projetos:</strong> Acesse nosso portal interativo pelo celular durante sua visita e deixe suas estrelas para os projetos de Desenvolvimento de Sistemas, Eletroeletrônica e Mecatrônica.",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "⭐ Acessar Portal e Votar"
      };

    case "02dez":
    case "dia2":
      return {
        nome: nomeDisplay,
        tag: "2º Dia • O Workshop Continua",
        assunto: "💡 2º Dia! O Workshop SENAI 2026 continua — Novas demonstrações hoje!",
        titulo: "O segundo dia de inovação já começou!",
        subtitulo: "Nossas bancadas continuam a todo vapor com projetos de alta tecnologia! Se você ainda não visitou ou quer rever as inovações em automação, robótica e software dos cursos de <strong>Desenvolvimento de Sistemas</strong>, <strong>Eletroeletrônica</strong> e <strong>Mecatrônica</strong>, venha hoje até as 17h!",
        destaque: "🎯 A interação entre alunos, empresas e comunidade é intensa. Não perca a oportunidade de fazer networking e conhecer os novos talentos da indústria.",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "📱 Ver Lista de Projetos"
      };

    case "03dez":
    case "dia3":
      return {
        nome: nomeDisplay,
        tag: "Último Dia • Grande Encerramento",
        assunto: "🏆 Último Dia! Workshop SENAI 2026 — Encerramento das apresentações",
        titulo: "Hoje é o último dia de apresentações!",
        subtitulo: "Chegou o grande encerramento do <strong>Workshop SENAI 2026</strong>! Última oportunidade para prestigiar os projetos dos formandos de <strong>Desenvolvimento de Sistemas</strong>, <strong>Eletroeletrônica</strong> e <strong>Mecatrônica</strong>, avaliar as soluções e registrar seus votos.",
        destaque: "🏅 As apresentações se encerram hoje às 17h. Venha prestigiar nossos futuros profissionais da tecnologia e indústria!",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "⭐ Votar no Portal Antes do Fim"
      };

    default:
      return obterConteudoEmail("confirmacao", nome, perfil);
  }
}

/**
 * Layout HTML oficial responsivo
 */
function gerarHtmlCompleto(c) {
  return '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head><meta charset="UTF-8"><title>Workshop SENAI 2026</title></head>' +
    '<body style="margin:0;padding:0;background-color:#0d111a;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d111a;padding:25px 15px;">' +
        '<tr><td align="center">' +
          '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.35);">' +
            '<tr><td style="background:linear-gradient(135deg,#e4002b 0%,#b80022 100%);padding:30px 24px;text-align:center;">' +
              '<span style="display:inline-block;background:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">' + c.tag + '</span>' +
              '<h1 style="margin:4px 0 0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.5px;">SEN<span style="color:#ffb703;">AI</span></h1>' +
              '<p style="margin:6px 0 0;color:rgba(255,255,255,0.92);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Workshop SENAI 2026 • São Carlos</p>' +
            '</td></tr>' +
            '<tr><td style="padding:32px 28px 24px;">' +
              '<h2 style="margin:0 0 14px;color:#0f172a;font-size:20px;font-weight:800;">Olá, ' + c.nome + '! 👋</h2>' +
              '<p style="margin:0 0 14px;color:#334155;font-size:16px;font-weight:700;line-height:1.4;">' + c.titulo + '</p>' +
              '<p style="margin:0 0 20px;color:#475569;font-size:14px;line-height:1.6;">' + c.subtitulo + '</p>' +
              '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:5px solid #e4002b;border-radius:8px;margin-bottom:24px;">' +
                '<tr><td style="padding:16px 18px;">' +
                  '<p style="margin:0 0 6px;font-size:14px;color:#0f172a;">' + c.destaque + '</p>' +
                  '<p style="margin:0 0 6px;font-size:13px;color:#334155;"><strong>⏰ Horário:</strong> Das 08h às 17h • Entrada Gratuita</p>' +
                  '<p style="margin:0;font-size:13px;color:#64748b;"><strong>📍 Local:</strong> Escola SENAI Antonio Adolpho Lobbe (R. Cândido Padim, 25 - Vila Prado, São Carlos)</p>' +
                '</td></tr>' +
              '</table>' +
              '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">' +
                '<tr><td align="center">' +
                  '<a href="' + c.ctaUrl + '" target="_blank" style="display:inline-block;background:#e4002b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;margin:4px 6px;">' + c.ctaTexto + '</a>' +
                  '<a href="https://maps.app.goo.gl/ERURVEKNRXTKch5o6" target="_blank" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;margin:4px 6px;">🗺️ Abrir Google Maps</a>' +
                '</td></tr>' +
              '</table>' +
              '<p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;text-align:center;">Nos vemos lá! Venha prestigiar os projetos e o talento dos nossos alunos de Desenvolvimento de Sistemas, Eletroeletrônica e Mecatrônica.</p>' +
            '</td></tr>' +
            '<tr><td style="background:#f1f5f9;padding:18px 24px;text-align:center;border-top:1px solid #e2e8f0;">' +
              '<p style="margin:0 0 4px;font-size:12px;color:#475569;font-weight:600;">Faculdade de Tecnologia e Escola SENAI Antonio Adolpho Lobbe — São Carlos/SP</p>' +
              '<p style="margin:0;font-size:11px;color:#94a3b8;">Serviço Nacional de Aprendizagem Industrial • © 2026</p>' +
            '</td></tr>' +
          '</table>' +
        '</td></tr>' +
      '</table>' +
    '</body>' +
    '</html>';
}

/**
 * =====================================================================
 * AGENDAMENTO AUTOMÁTICO VIA TRIGGERS DO GOOGLE APPS SCRIPT
 * =====================================================================
 * Cria gatilhos automáticos programados para disparar no fuso America/Sao_Paulo:
 *  - E-mail 2 em 30/11/2026 às 08:00 (Faltam 2 dias)
 *  - E-mail 3 em 01/12/2026 às 07:00 (Dia 1 - É hoje!)
 *  - E-mail 4 em 02/12/2026 às 07:00 (Dia 2 - Continuação)
 *  - E-mail 5 em 03/12/2026 às 07:00 (Dia 3 - Encerramento)
 * =====================================================================
 */
function agendarDisparosAutomaticos() {
  cancelarAgendamentosAnteriores();

  // Mês em JavaScript é 0-indexado: 10 = Novembro, 11 = Dezembro
  var d2 = new Date(2026, 10, 30, 8, 0, 0); // 30/11/2026 às 08:00
  var d3 = new Date(2026, 11, 1, 7, 0, 0);  // 01/12/2026 às 07:00
  var d4 = new Date(2026, 11, 2, 7, 0, 0);  // 02/12/2026 às 07:00
  var d5 = new Date(2026, 11, 3, 7, 0, 0);  // 03/12/2026 às 07:00

  ScriptApp.newTrigger("dispararEmail30Nov").timeBased().at(d2).inTimezone("America/Sao_Paulo").create();
  ScriptApp.newTrigger("dispararEmail01Dez").timeBased().at(d3).inTimezone("America/Sao_Paulo").create();
  ScriptApp.newTrigger("dispararEmail02Dez").timeBased().at(d4).inTimezone("America/Sao_Paulo").create();
  ScriptApp.newTrigger("dispararEmail03Dez").timeBased().at(d5).inTimezone("America/Sao_Paulo").create();

  var msg = "Agendamento automático concluído com sucesso!\n\n" +
            "• E-mail 2 (Faltam 2 dias): 30/11/2026 às 08:00\n" +
            "• E-mail 3 (Dia 1 - É hoje): 01/12/2026 às 07:00\n" +
            "• E-mail 4 (Dia 2): 02/12/2026 às 07:00\n" +
            "• E-mail 5 (Dia 3 / Fim): 03/12/2026 às 07:00\n\n" +
            "O Google Apps Script fará os disparos automaticamente nos horários programados!";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

function cancelarAgendamentosAnteriores() {
  var triggers = ScriptApp.getProjectTriggers();
  var funcoes = [
    "dispararEmail30Nov",
    "dispararEmail01Dez",
    "dispararEmail02Dez",
    "dispararEmail03Dez",
    "dispararEmailVespera",
    "dispararEmailDia1",
    "dispararEmailDia2",
    "dispararEmailDia3",
    "enviarLembretesWorkshop"
  ];
  for (var i = 0; i < triggers.length; i++) {
    if (funcoes.indexOf(triggers[i].getHandlerFunction()) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

function cancelarAgendamentosComAviso() {
  cancelarAgendamentosAnteriores();
  var msg = "Todos os agendamentos automáticos foram cancelados com sucesso.";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

/**
 * =====================================================================
 * TESTE: ENVIA OS 5 MODELOS PARA O E-MAIL DO DOCENTE
 * =====================================================================
 */
function testarEnvioTodosModelos() {
  var meuEmail = (Session.getActiveUser() && Session.getActiveUser().getEmail()) ||
                 (Session.getEffectiveUser() && Session.getEffectiveUser().getEmail()) || "";
  if (!meuEmail) {
    var erro = "Nenhum e-mail de usuário identificado para teste. Verifique se está autenticado na planilha com sua conta @docente.senai.br.";
    Logger.log(erro);
    try {
      SpreadsheetApp.getUi().alert("Workshop SENAI 2026", erro, SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (e) {}
    return erro;
  }

  var estagios = ["confirmacao", "30nov", "01dez", "02dez", "03dez"];
  for (var i = 0; i < estagios.length; i++) {
    enviarEmailPorEstagio(estagios[i], "Docente SENAI", meuEmail, "Docente");
    Utilities.sleep(300);
  }

  var msg = "Sucesso! Os 5 modelos de e-mail foram enviados para: " + meuEmail + "\n\nVerifique sua caixa de entrada!";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

function testarEnvioEmail() {
  var meuEmail = (Session.getActiveUser() && Session.getActiveUser().getEmail()) ||
                 (Session.getEffectiveUser() && Session.getEffectiveUser().getEmail()) || "";
  if (!meuEmail) {
    var erro = "Nenhum e-mail de usuário identificado nesta execução.";
    Logger.log(erro);
    return erro;
  }

  enviarEmailPorEstagio("confirmacao", "Professor(a)", meuEmail, "Docente SENAI");
  var msg = "E-mail de teste de confirmação enviado para: " + meuEmail;
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

/**
 * =====================================================================
 * MENU NA PLANILHA COM 1 CLIQUE
 * =====================================================================
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🔔 Workshop 2026")
      .addItem("✉️ Enviar os 5 Modelos de Teste para Mim", "testarEnvioTodosModelos")
      .addItem("✉️ Enviar 1 E-mail de Teste para Mim", "testarEnvioEmail")
      .addSeparator()
      .addItem("⏰ Ativar Agendamento Automático (30/11, 01/12, 02/12 e 03/12)", "agendarDisparosAutomaticos")
      .addItem("🛑 Cancelar Todos os Agendamentos Automáticos", "cancelarAgendamentosComAviso")
      .addSeparator()
      .addItem("🚀 Disparar Manualmente: E-mail 2 (30/11 às 08h)", "dispararEmail30Nov")
      .addItem("🚀 Disparar Manualmente: E-mail 3 (01/12 às 07h)", "dispararEmail01Dez")
      .addItem("🚀 Disparar Manualmente: E-mail 4 (02/12 às 07h)", "dispararEmail02Dez")
      .addItem("🚀 Disparar Manualmente: E-mail 5 (03/12 às 07h)", "dispararEmail03Dez")
      .addSeparator()
      .addItem("⚙️ Formatar/Atualizar Aba 'Inscritos Lembrete' (10 Colunas)", "formatarPlanilhaManualmente")
      .addItem("⚙️ Formatar/Atualizar Aba 'Leads Workshop 2026' (12 Colunas)", "setupWorkshopHeadersManualmente")
      .addToUi();
  } catch (err) {
    // Execução em contexto sem interface gráfica
  }
}

/**
 * Função utilitária para testar execução direta pelo editor
 */
function testarScript() {
  var res = doGet({ parameter: { debug: "1" } });
  Logger.log(res.getContent());
  return res.getContent();
}
