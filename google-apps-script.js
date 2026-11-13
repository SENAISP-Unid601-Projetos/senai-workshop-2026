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
    var sheet = getWorkshopSheet(ss);

    if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet);
    } else {
      ensureEvaluationHeaders(sheet);
    }

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
 * Função utilitária para testar a execução direto pelo editor do Apps Script (botão Executar)
 */
function testarScript() {
  var res = doGet({ parameter: { debug: "1" } });
  Logger.log(res.getContent());
  return res.getContent();
}
