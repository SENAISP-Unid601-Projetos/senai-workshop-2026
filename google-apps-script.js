/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — INTEGRAÇÃO GOOGLE SHEETS COM AVALIAÇÕES & API DASHBOARD
 * =====================================================================
 * Este script gerencia toda a integração do Workshop com o Google Sheets:
 *  1. doPost(e) -> Grava acessos, cliques e notas (Apresentação e Solução Técnica)
 *  2. doGet(e)  -> Lê os dados reais da planilha e devolve JSON/JSONP para o Dashboard:
 *                  - Total de visitas na turma e no projeto (DS e MEC)
 *                    (Acessos gerais à página home NÃO entram na conta de DS/MEC)
 *                  - Top 5 mais bem votados e Top 5 menos votados por turma
 *
 * Colunas na planilha:
 *  1. Data e Hora
 *  2. Tipo de Lead
 *  3. Turma
 *  4. ID Projeto
 *  5. Nome do Projeto
 *  6. Ação / Evento
 *  7. Detalhes / URL
 *  8. Página
 *  9. Dispositivo
 * 10. URL de Origem
 * 11. Nota Apresentação   (1 a 5, vazio para outras interações)
 * 12. Nota Ideia e Solução (1 a 5, vazio para outras interações)
 *
 * --- COMO ATUALIZAR NO GOOGLE APPS SCRIPT ---
 * 1. Abra a planilha no Google Sheets.
 * 2. Acesse: Extensões > Apps Script.
 * 3. Substitua TODO o código existente por este arquivo.
 * 4. Salve (Ctrl+S ou ícone de disquete).
 * 5. Clique no botão azul "Implantar" (Deploy) > "Gerenciar implantações" (Manage deployments).
 * 6. Clique no ícone de lápis ✏️ ao lado da implantação ativa:
 *    - Em "Versão", selecione "Nova versão" (New version).
 *    - Em "Quem pode acessar", selecione "Qualquer pessoa" (Anyone).
 * 7. Clique em "Implantar" (Deploy).
 * =====================================================================
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

  throw new Error("Planilha não encontrada. Certifique-se de que o script foi aberto a partir de Extensões > Apps Script na planilha.");
}

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

    // Roteamento para Inscrição de Newsletter / Lembrete do Workshop por E-mail
    var isNewsletter = (data.tipo === "Newsletter Lembrete") ||
                       (data.tipo === "Inscrição Newsletter") ||
                       (data.acao === "Inscrição Lembrete Workshop");

    if (isNewsletter) {
      return processarInscricaoNewsletter(ss, data, timestamp);
    }

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
 * API DO DASHBOARD (doGet)
 * =====================================================================
 * Regras:
 * - Visitas: contabiliza APENAS acessos na turma e no projeto (DS e MEC).
 *   Acessos gerais à página inicial ("home", "Geral") NÃO entram na contagem.
 * - Rankings: Top 5 mais bem votados e Top 5 menos votados por turma.
 * - Suporta JSON e JSONP (para testes locais via file:// ou localhost).
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
        visitas: { ds: 0, mec: 0, total: 0 },
        ds: {
          top5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          totalAvaliados: 0
        },
        mec: {
          top5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
          bottom5: { projetos: [], apresentacao: [], solucaoTecnica: [], medias: [], votos: [] },
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

      // 1. Colunas de Notas (testadas primeiro para evitar falso positivo com "ação" ou "id")
      if (h.indexOf("apresenta") !== -1) {
        colMap.notaAp = c;
      } else if (h.indexOf("solu") !== -1 || h.indexOf("ideia") !== -1 || (h.indexOf("nota") !== -1 && h.indexOf("proj") !== -1)) {
        colMap.notaSol = c;
      }
      // 2. Colunas de Projeto (evita que "ideia" ou "dispositivo" casem com "id")
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
    var visitasMEC = 0;

    var mapaDS = {};
    var mapaMEC = {};

    function parseRatingNumber(val) {
      if (val === undefined || val === null || val === "") return 0;
      if (typeof val === "number") return isNaN(val) ? 0 : val;
      var clean = String(val).trim().replace(',', '.').replace(/[^0-9.]/g, '');
      var parsed = parseFloat(clean);
      return isNaN(parsed) ? 0 : parsed;
    }

    // Normalização inteligente de ID e Nome para agrupar variações (ex: "ds-2", "2", "Projeto DS 2")
    function normalizarChaveProjeto(id, nome, turma, isDS, isMEC) {
      var idClean = String(id || "").toLowerCase().trim();
      var nomeClean = String(nome || "").toLowerCase().trim();
      var turmaClean = String(turma || "").toLowerCase().trim();

      var prefix = (isMEC || turmaClean.indexOf("meca") !== -1 || turmaClean === "mec" || idClean.indexOf("mec") !== -1 || nomeClean.indexOf("mec") !== -1) ? "mec" : "ds";

      // 1. Extrai número do ID (ex: "ds-2", "ds2", "mec-1", "2")
      var idNum = idClean.match(/(\d+)/);
      if (idNum) {
        return prefix + "-" + Number(idNum[1]);
      }

      // 2. Extrai número do Nome (ex: "Projeto DS 2", "Projeto 2", "Grupo 2")
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

      // Identifica se a linha pertence a Desenvolvimento de Sistemas ou Mecatrônica
      var isDS = turmaLower.indexOf("desenvolvimento") !== -1 ||
                 turmaLower.indexOf("sistemas") !== -1 ||
                 turmaLower === "ds" ||
                 projIdLower.indexOf("ds") === 0 ||
                 projNomeLower.indexOf("ds") !== -1 ||
                 pagina === "ds";

      var isMEC = turmaLower.indexOf("meca") !== -1 ||
                  turmaLower === "mec" ||
                  projIdLower.indexOf("mec") === 0 ||
                  projNomeLower.indexOf("mec") !== -1 ||
                  pagina === "mecatronica";

      // REGRA: Contabilizar apenas acesso na TURMA e no PROJETO (DS e MEC).
      // Acessos apenas na página inicial ("home", "Geral", "Lead Página") NÃO devem ser contabilizados.
      var isAcessoPaginaGeral = (tipoLower.indexOf("página") !== -1 || tipoLower.indexOf("pagina") !== -1) &&
                                (pagLowerIsHome(pagina) || turmaLower === "geral" || acaoLower.indexOf("página inicial") !== -1);

      if (!isAcessoPaginaGeral) {
        if (isDS) {
          visitasDS++;
        } else if (isMEC) {
          visitasMEC++;
        }
      }

      // Processa avaliações para o ranking
      var temNotaAp = notaAp > 0;
      var temNotaSol = notaSol > 0;

      if (temNotaAp || temNotaSol) {
        var key = normalizarChaveProjeto(projId, projNome, turmaRaw, isDS, isMEC);
        var mapa = isDS ? mapaDS : (isMEC ? mapaMEC : (key.indexOf("mec") === 0 ? mapaMEC : mapaDS));

        if (!mapa[key]) {
          var numKey = key.match(/(\d+)/);
          var padraoNome = (isDS || key.indexOf("ds") === 0)
            ? ("Projeto DS " + (numKey ? numKey[1] : ""))
            : ("Projeto MEC " + (numKey ? numKey[1] : ""));
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

    function pagLowerIsHome(p) {
      return p === "home" || p === "" || p === "-" || p === "index" || p === "index.html";
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
        // Aliases para retrocompatibilidade
        top3: top5,
        bottom3: bottom5,
        top4: top5,
        bottom4: bottom5,
        totalAvaliados: total
      };
    }

    var dsProcessado = processarMapaTop5(mapaDS);
    var mecProcessado = processarMapaTop5(mapaMEC);

    var response = {
      status: "success",
      timestamp: Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss"),
      totalLinhas: rows.length,
      visitas: {
        ds: visitasDS,
        mec: visitasMEC,
        total: visitasDS + visitasMEC
      },
      ds: dsProcessado,
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
          return {
            linha: idx + 2,
            tipo: tipo,
            turma: turma,
            projId: id,
            projNome: nome,
            notaApresentacao: ap,
            notaSolucao: sol,
            chaveNormalizada: normalizarChaveProjeto(id, nome, turma, turma.toLowerCase().indexOf("ds") !== -1 || id.toLowerCase().indexOf("ds") !== -1, turma.toLowerCase().indexOf("mec") !== -1 || id.toLowerCase().indexOf("mec") !== -1)
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

// Suporta retorno JSON direto e JSONP (callback) para testes locais sem bloqueio de CORS
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
 * =====================================================================
 * GESTÃO DE NEWSLETTER E DISPARO DE LEMBRETES POR E-MAIL
 * =====================================================================
 */

function getNewsletterSheet(ss) {
  var sheet = ss.getSheetByName("Inscritos Lembrete") || ss.getSheetByName("Newsletter");
  if (!sheet) {
    sheet = ss.insertSheet("Inscritos Lembrete");
    setupNewsletterHeaders(sheet);
  }
  return sheet;
}

function setupNewsletterHeaders(sheet) {
  sheet.setName("Inscritos Lembrete");

  var headers = [
    "Data e Hora",
    "Nome",
    "E-mail",
    "Perfil / Segmento",
    "Status Confirmação",
    "Status Lembrete Workshop",
    "Origem / Página"
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

  var widths = [160, 200, 260, 180, 180, 200, 180];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

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

  // Verifica se o e-mail já existe na planilha para evitar duplicações
  var lastRow = sheet.getLastRow();
  var linhaAlvo = -1;
  if (lastRow > 1) {
    var emailColValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (var i = 0; i < emailColValues.length; i++) {
      if (String(emailColValues[i][0]).toLowerCase().trim() === email) {
        linhaAlvo = i + 2;
        break;
      }
    }
  }

  // Envia e-mail de confirmação imediata
  var statusEmail = "E-mail não enviado";
  try {
    enviarEmailConfirmacao(nome, email, perfil);
    statusEmail = "Confirmado via E-mail";
  } catch (emailErr) {
    statusEmail = "Pendente (" + emailErr.message + ")";
  }

  if (linhaAlvo !== -1) {
    // Atualiza registro existente
    sheet.getRange(linhaAlvo, 1, 1, 5).setValues([[
      timestamp,
      nome,
      email,
      perfil,
      statusEmail
    ]]);
  } else {
    // Novo cadastro
    sheet.appendRow([
      timestamp,
      nome,
      email,
      perfil,
      statusEmail,
      "Pendente",
      origem
    ]);
    linhaAlvo = sheet.getLastRow();
    sheet.getRange(linhaAlvo, 1, 1, 7).setFontSize(10).setVerticalAlignment("middle");
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

function enviarEmailConfirmacao(nome, email, perfil) {
  var assunto = "🔔 Confirmação: Lembrete do Workshop SENAI 2026";
  var htmlBody = gerarHtmlEmail("confirmacao", nome, perfil);

  MailApp.sendEmail({
    to: email,
    subject: assunto,
    htmlBody: htmlBody,
    name: "SENAI São Carlos — Workshop 2026"
  });
}

function gerarHtmlEmail(tipo, nome, perfil) {
  var nomeDisplay = nome && nome !== "Visitante" ? nome : "Prezado(a) Visitante";
  var isLembreteFinal = (tipo === "lembrete");

  var tituloPrincipal = isLembreteFinal
    ? "O Workshop SENAI 2026 é nesta semana!"
    : "Seu lembrete foi confirmado!";

  var mensagemPrincipal = isLembreteFinal
    ? "Os formandos dos cursos técnicos em <strong>Desenvolvimento de Sistemas</strong> e <strong>Mecatrônica</strong> estão prontos para apresentar projetos inovadores, protótipos de automação, softwares e soluções inteligentes."
    : "Agradecemos pelo seu interesse! Você receberá nosso aviso por e-mail antes do início do evento para não perder nenhuma das apresentações e novidades.";

  return '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head><meta charset="UTF-8"><title>Workshop SENAI 2026</title></head>' +
    '<body style="margin:0;padding:0;background-color:#0d111a;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d111a;padding:25px 15px;">' +
        '<tr><td align="center">' +
          '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.35);">' +
            '<tr><td style="background:linear-gradient(135deg,#e4002b 0%,#b80022 100%);padding:30px 24px;text-align:center;">' +
              '<h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-0.5px;">SEN<span style="color:#ffb703;">AI</span></h1>' +
              '<p style="margin:6px 0 0;color:rgba(255,255,255,0.92);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Workshop SENAI 2026 • São Carlos</p>' +
            '</td></tr>' +
            '<tr><td style="padding:32px 28px 24px;">' +
              '<h2 style="margin:0 0 14px;color:#0f172a;font-size:20px;font-weight:800;">Olá, ' + nomeDisplay + '! 👋</h2>' +
              '<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">' + tituloPrincipal + '</p>' +
              '<p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;">' + mensagemPrincipal + '</p>' +
              '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:5px solid #e4002b;border-radius:8px;margin-bottom:26px;">' +
                '<tr><td style="padding:18px 20px;">' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>📅 Data:</strong> 02 e 03 de Dezembro de 2026</p>' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>⏰ Horário:</strong> Das 08h às 17h • Entrada Gratuita</p>' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>📍 Local:</strong> Escola SENAI Antonio Adolpho Lobbe</p>' +
                  '<p style="margin:0;font-size:13px;color:#64748b;">R. Cândido Padim, 25 - Vila Prado, São Carlos - SP</p>' +
                '</td></tr>' +
              '</table>' +
              '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">' +
                '<tr><td align="center">' +
                  '<a href="https://maps.app.goo.gl/ERURVEKNRXTKch5o6" target="_blank" style="display:inline-block;background:#e4002b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;margin:4px 6px;">🗺️ Abrir no Google Maps</a>' +
                  '<a href="https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html" target="_blank" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;margin:4px 6px;">🚀 Ver Projetos no Portal</a>' +
                '</td></tr>' +
              '</table>' +
              '<p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">Nos vemos lá! Venha se inspirar com a criatividade, tecnologia e dedicação dos nossos formandos.</p>' +
            '</td></tr>' +
            '<tr><td style="background:#f1f5f9;padding:18px 24px;text-align:center;border-top:1px solid #e2e8f0;">' +
              '<p style="margin:0 0 4px;font-size:12px;color:#475569;font-weight:600;">Faculdade de Tecnologia e Escola SENAI Antonio Adolpho Lobbe — São Carlos/SP</p>' +
              '<p style="margin:0;font-size:11px;color:#94a3b8;">Serviço Nacional de Aprendizagem Industrial • Todos os direitos reservados © 2026</p>' +
            '</td></tr>' +
          '</table>' +
        '</td></tr>' +
      '</table>' +
    '</body>' +
    '</html>';
}

/**
 * Envia um e-mail de teste diretamente para a conta ativa do administrador/docente
 */
function testarEnvioEmail() {
  var meuEmail = (Session.getActiveUser() && Session.getActiveUser().getEmail()) ||
                 (Session.getEffectiveUser() && Session.getEffectiveUser().getEmail()) || "";
  if (!meuEmail) {
    var msgErro = "Nenhum e-mail de usuário ativo identificado nesta execução.";
    Logger.log(msgErro);
    return msgErro;
  }

  var assunto = "🔔 [TESTE] Lembrete do Workshop SENAI 2026";
  var htmlBody = gerarHtmlEmail("lembrete", "Professor Rafael", "Docente SENAI");

  MailApp.sendEmail({
    to: meuEmail,
    subject: assunto,
    htmlBody: htmlBody,
    name: "SENAI São Carlos — Workshop 2026"
  });

  var msgSucesso = "E-mail de teste enviado com sucesso para: " + meuEmail;
  Logger.log(msgSucesso);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msgSucesso, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msgSucesso;
}

/**
 * Dispara os lembretes pré-evento em lote para todos os inscritos com status 'Pendente'
 */
function enviarLembretesWorkshop() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getNewsletterSheet(ss);
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    var msgVazia = "Nenhum inscrito encontrado na aba 'Inscritos Lembrete'.";
    Logger.log(msgVazia);
    try {
      SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msgVazia, SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (e) {}
    return msgVazia;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  var totalEnviados = 0;
  var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var nome = row[1];
    var email = row[2];
    var perfil = row[3];
    var statusLembrete = String(row[5] || "");

    // Só envia se tiver e-mail válido e o lembrete ainda não tiver sido enviado
    if (email && String(email).indexOf("@") !== -1 && statusLembrete.indexOf("Enviado") === -1) {
      try {
        var assunto = "🔔 É Nesta Semana! Workshop SENAI 2026 — São Carlos";
        var htmlBody = gerarHtmlEmail("lembrete", nome, perfil);

        MailApp.sendEmail({
          to: email,
          subject: assunto,
          htmlBody: htmlBody,
          name: "SENAI São Carlos — Workshop 2026"
        });

        sheet.getRange(i + 2, 6).setValue("Enviado em " + timestamp);
        totalEnviados++;
        Utilities.sleep(150); // Pausa de segurança de 150ms
      } catch (err) {
        sheet.getRange(i + 2, 6).setValue("Falha: " + err.message);
      }
    }
  }

  var msgFinal = "Disparo concluído: " + totalEnviados + " e-mail(s) de lembrete enviado(s).";
  Logger.log(msgFinal);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msgFinal, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msgFinal;
}

/**
 * Menu suspenso no Google Sheets para disparar testes e lembretes com 1 clique
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🔔 Workshop 2026")
      .addItem("✉️ Enviar E-mail de Teste para Mim", "testarEnvioEmail")
      .addSeparator()
      .addItem("🚀 Disparar Lembretes para Todos os Inscritos", "enviarLembretesWorkshop")
      .addToUi();
  } catch (err) {
    // Execução sem interface gráfica ativa
  }
}

/**
 * Função utilitária para testar a execução direto pelo editor do Apps Script (botão Executar)
 */
function testarScript() {
  var res = doGet({ parameter: { debug: "1" } });
  Logger.log(res.getContent());
  return res.getContent();
}
