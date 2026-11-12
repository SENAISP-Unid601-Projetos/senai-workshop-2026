/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — INTEGRAÇÃO GOOGLE SHEETS COM AVALIAÇÕES & API DASHBOARD
 * =====================================================================
 * Este script gerencia toda a integração do Workshop com o Google Sheets:
 *  1. doPost(e) -> Grava acessos, cliques e notas (Apresentação e Solução Técnica)
 *  2. doGet(e)  -> Lê os dados reais da planilha e devolve JSON pronto para o Dashboard:
 *                  - Total de visitas consolidadas por turma (DS e MEC)
 *                  - Top 3 mais bem votados e Top 3 menos votados por turma
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

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

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
 * Processa as linhas da planilha em tempo real e entrega:
 *  - Contagem consolidada de visitas para DS e Mecatrônica
 *  - Top 3 mais bem votados e Top 3 menos votados por turma com:
 *    1. Apresentação
 *    2. Ideia e Solução Técnica
 * =====================================================================
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "empty",
          mensagem: "A planilha ainda não possui registros de dados.",
          visitas: { ds: 0, mec: 0, total: 0 },
          ds: {
            top3: { projetos: [], apresentacao: [], solucaoTecnica: [] },
            bottom3: { projetos: [], apresentacao: [], solucaoTecnica: [] },
            totalAvaliados: 0
          },
          mec: {
            top3: { projetos: [], apresentacao: [], solucaoTecnica: [] },
            bottom3: { projetos: [], apresentacao: [], solucaoTecnica: [] },
            totalAvaliados: 0
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var values = sheet.getDataRange().getValues();
    var rows = values.slice(1);

    var visitasDS = 0;
    var visitasMEC = 0;

    var mapaDS = {};
    var mapaMEC = {};

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var turmaRaw = String(row[2] || "").trim();
      var projId = String(row[3] || "").trim();
      var projNome = String(row[4] || "").trim();
      var pagina = String(row[7] || "").trim().toLowerCase();
      var notaAp = Number(row[10]);
      var notaSol = Number(row[11]);

      var turmaLower = turmaRaw.toLowerCase();
      var projIdLower = projId.toLowerCase();

      var isDS = turmaLower.indexOf("desenvolvimento") !== -1 ||
                 turmaLower.indexOf("sistemas") !== -1 ||
                 turmaLower === "ds" ||
                 projIdLower.indexOf("ds") === 0 ||
                 pagina === "ds";

      var isMEC = turmaLower.indexOf("meca") !== -1 ||
                  turmaLower === "mec" ||
                  projIdLower.indexOf("mec") === 0 ||
                  pagina === "mecatronica";

      if (isDS) {
        visitasDS++;
      } else if (isMEC) {
        visitasMEC++;
      }

      var temNotaAp = !isNaN(notaAp) && notaAp > 0;
      var temNotaSol = !isNaN(notaSol) && notaSol > 0;

      if ((temNotaAp || temNotaSol) && projId && projId !== "-") {
        var mapa = isDS ? mapaDS : (isMEC ? mapaMEC : null);
        if (!mapa) {
          mapa = (projIdLower.indexOf("ds") === 0) ? mapaDS : mapaMEC;
        }

        var key = projIdLower;
        if (!mapa[key]) {
          mapa[key] = {
            id: projId,
            nome: (projNome && projNome !== "-") ? projNome : projId.toUpperCase(),
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

    function processarMapa(mapa) {
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

      lista.sort(function(a, b) { return b.mediaGeral - a.mediaGeral; });

      var total = lista.length;
      var top3Raw = lista.slice(0, 3);
      var bottom3Raw = total > 3 ? lista.slice(total - 3) : lista.slice().reverse().slice(0, 3);

      var top3 = {
        projetos: top3Raw.map(function(item, idx) { return (idx + 1) + "º " + item.nome; }),
        apresentacao: top3Raw.map(function(item) { return item.apresentacao; }),
        solucaoTecnica: top3Raw.map(function(item) { return item.solucaoTecnica; }),
        medias: top3Raw.map(function(item) { return item.mediaGeral; }),
        votos: top3Raw.map(function(item) { return item.totalVotos; })
      };

      var bottom3 = {
        projetos: bottom3Raw.map(function(item, idx) {
          var pos = total > 3 ? (total - 3 + idx + 1) : (total - idx);
          return pos + "º " + item.nome;
        }),
        apresentacao: bottom3Raw.map(function(item) { return item.apresentacao; }),
        solucaoTecnica: bottom3Raw.map(function(item) { return item.solucaoTecnica; }),
        medias: bottom3Raw.map(function(item) { return item.mediaGeral; }),
        votos: bottom3Raw.map(function(item) { return item.totalVotos; })
      };

      return {
        top3: top3,
        bottom3: bottom3,
        totalAvaliados: total
      };
    }

    var dsProcessado = processarMapa(mapaDS);
    var mecProcessado = processarMapa(mapaMEC);

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

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
