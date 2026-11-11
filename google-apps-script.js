/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — INTEGRAÇÃO GOOGLE SHEETS & CAPTURA DE LEADS
 * =====================================================================
 * Este script recebe os leads da página, da turma e de cada projeto
 * (cliques em Funcionamento, Comercial, Visitar Site, QR Code e formulário de contato)
 * e grava automaticamente em linhas na sua planilha do Google Sheets.
 *
 * --- PASSO A PASSO PARA CONFIGURAR ---
 * 1. Abra sua planilha no Google Sheets (pode ser uma planilha em branco).
 * 2. No menu superior, clique em: Extensões > Apps Script.
 * 3. Apague qualquer código existente no editor e cole todo este arquivo.
 * 4. Clique no ícone de disquete (Salvar).
 * 5. Clique no botão azul "Implantar" (Deploy) > "Nova implantação" (New deployment).
 * 6. Clique na engrenagem ao lado de "Selecionar tipo" e escolha "App da Web" (Web app).
 * 7. Preencha:
 *    - Descrição: "API Leads SENAI 2026"
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem pode acessar: "Qualquer pessoa" (Anyone)   <-- IMPORTANTE!
 * 8. Clique em "Implantar" e autorize as permissões da sua conta Google.
 * 9. Copie a "URL do app da Web" gerada (termina com "/exec").
 * 10. Cole essa URL no arquivo `js/data.js` do projeto, na propriedade:
 *     googleSheetsUrl: "https://script.google.com/macros/s/.../exec"
 * =====================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Aguarda até 10 segundos para evitar conflito de gravações concorrentes
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Se a aba estiver vazia, cria os cabeçalhos oficiais estilizados
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet);
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
      data.origem || "-"
    ];

    sheet.appendRow(row);

    // Formata a nova linha com alinhamento limpo
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setFontSize(10).setVerticalAlignment("middle");

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

function doGet(e) {
  // Teste simples para verificar no navegador se o Web App está ativo
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      mensagem: "API SENAI Workshop 2026 conectada ao Google Sheets com sucesso!",
      hora: Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss")
    }))
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
    "URL de Origem"
  ];

  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#e4002b"); // Vermelho SENAI
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // Larguras recomendadas para as colunas
  var widths = [150, 130, 170, 100, 180, 170, 260, 90, 110, 260];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

