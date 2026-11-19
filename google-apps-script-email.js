/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — SÃO CARLOS
 * BACKEND DA PLANILHA DE E-MAILS & RÉGUA OFICIAL DE 5 LEMBRETES
 * =====================================================================
 * Este script gerencia EXCLUSIVAMENTE a PLANILHA DE E-MAILS / NEWSLETTER.
 * (Nesta planilha NÃO existem as colunas K 'Nota Apresentação' e L 'Nota Ideia e Solução'.
 *  As notas e visitas pertencem à Planilha de Leads gerenciada por google-apps-script.js).
 *
 * Evento Oficial: 01, 02 e 03 de Dezembro de 2026 (08h às 17h)
 * Cursos Técnicos Apresentados:
 *  - Desenvolvimento de Sistemas (DS)
 *  - Eletroeletrônica (ELE)
 *  - Mecatrônica (MEC)
 * Local: Escola SENAI Antonio Adolpho Lobbe — São Carlos/SP
 *
 * Estrutura Oficial das 10 Colunas (Colunas A até J):
 *   Col 1 (A): Data e Hora
 *   Col 2 (B): Nome
 *   Col 3 (C): E-mail
 *   Col 4 (D): Perfil / Segmento
 *   Col 5 (E): Origem / Página
 *   Col 6 (F): E-mail 1 (Cadastro)
 *   Col 7 (G): E-mail 2 (Véspera 30/11 08h)
 *   Col 8 (H): E-mail 3 (Dia 1 01/12 07h)
 *   Col 9 (I): E-mail 4 (Dia 2 02/12 07h)
 *  Col 10 (J): E-mail 5 (Dia 3 03/12 07h)
 *
 * Régua Oficial dos 5 Disparos:
 *  1. No cadastro (imediato): Confirmação de inscrição e boas-vindas
 *  2. 30/11 às 08h00: "Faltam 2 dias! O Workshop SENAI 2026 começa nesta terça-feira (01/12)"
 *  3. 01/12 às 07h00: "É hoje! O 1º dia do Workshop SENAI 2026 começou — Venha prestigiar!"
 *  4. 02/12 às 07h00: "2º Dia! O Workshop SENAI 2026 continua com novos projetos e bancas"
 *  5. 03/12 às 07h00: "Último dia! Grande encerramento e premiação do Workshop SENAI 2026"
 *
 * --- COMO ATUALIZAR NO GOOGLE APPS SCRIPT ---
 * 1. Abra a Planilha de E-mails/Inscritos no Google Sheets.
 * 2. Acesse: Extensões > Apps Script.
 * 3. Substitua TODO o código existente por este arquivo.
 * 4. Salve (Ctrl+S ou ícone de disquete).
 * 5. Clique no botão azul "Implantar" (Deploy) > "Gerenciar implantações" (Manage deployments).
 * 6. Clique no ícone de lápis ✏️ ao lado da implantação ativa:
 *    - Em "Versão", selecione "Nova versão" (New version).
 *    - Em "Quem pode acessar", selecione "Qualquer pessoa" (Anyone).
 * 7. Clique em "Implantar" (Deploy).
 * 8. Na planilha, use o menu "🔔 Workshop 2026 — Lembretes" >
 *    "🔧 Atualizar Cabeçalhos e Remover Colunas K/L (10 Colunas)".
 * =====================================================================
 */

/**
 * =====================================================================
 * GESTÃO DA ABA DE INSCRITOS E CABEÇALHOS (10 COLUNAS EXATAS)
 * =====================================================================
 */

function getNewsletterSheet(ss) {
  var targetSs = ss;
  if (!targetSs) {
    try {
      targetSs = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {
      targetSs = null;
    }
  }

  if (targetSs) {
    var sheet = targetSs.getSheetByName("Inscritos Lembrete") ||
                targetSs.getSheetByName("Inscritos") ||
                targetSs.getSheetByName("Newsletter") ||
                targetSs.getSheetByName("Leads");
    if (sheet) return sheet;

    var allSheets = targetSs.getSheets();
    if (allSheets && allSheets.length > 0) return allSheets[0];
  }

  try {
    var directSheet = SpreadsheetApp.getActiveSheet();
    if (directSheet) return directSheet;
  } catch (e) {}

  throw new Error("Planilha de e-mails não encontrada. Abra a partir de Extensões > Apps Script.");
}

/**
 * Retorna os 10 cabeçalhos oficiais da régua de e-mails
 */
function getCabecalhosOficiais() {
  return [
    "Data e Hora",
    "Nome",
    "E-mail",
    "Perfil / Segmento",
    "Origem / Página",
    "E-mail 1 (Cadastro)",
    "E-mail 2 (Véspera 30/11 08h)",
    "E-mail 3 (Dia 1 01/12 07h)",
    "E-mail 4 (Dia 2 02/12 07h)",
    "E-mail 5 (Dia 3 03/12 07h)"
  ];
}

/**
 * Atualiza os cabeçalhos da planilha preservando TODOS os dados dos inscritos existentes
 * e REMOVENDO colunas excedentes K e L ("Nota Apresentação" / "Nota Ideia e Solução").
 */
function atualizarCabecalhosPlanilha() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getNewsletterSheet(ss);
  sheet.setName("Inscritos Lembrete");

  var headers = getCabecalhosOficiais();

  // 1. Atualiza a primeira linha com os 10 cabeçalhos oficiais (Colunas A até J)
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // 2. Estilização oficial SENAI
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#e4002b");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  var widths = [160, 190, 250, 170, 150, 180, 210, 200, 200, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // 3. REMOVE qualquer coluna excedente além da coluna 10 (ex: colunas K e L de notas)
  var totalColunas = sheet.getMaxColumns();
  if (totalColunas > 10) {
    sheet.deleteColumns(11, totalColunas - 10);
  }

  // 4. Se já existirem inscritos cadastrados, garante que a nova coluna 10 (E-mail 5) tenha "Pendente"
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var col10Values = sheet.getRange(2, 10, lastRow - 1, 1).getValues();
    var precisaAtualizar = false;
    for (var r = 0; r < col10Values.length; r++) {
      if (!col10Values[r][0] || String(col10Values[r][0]).trim() === "") {
        col10Values[r][0] = "Pendente";
        precisaAtualizar = true;
      }
    }
    if (precisaAtualizar) {
      sheet.getRange(2, 10, lastRow - 1, 1).setValues(col10Values);
    }
  }

  var msg = "Planilha de E-mails atualizada com sucesso!\n\n" +
            "• 10 Colunas oficiais configuradas (Data e Hora até E-mail 5);\n" +
            "• Colunas excedentes K e L removidas;\n" +
            "• Dados existentes dos inscritos foram preservados com segurança;\n" +
            "• Status da nova etapa (E-mail 5 - Dia 3) definido como 'Pendente'.";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

/**
 * Criação inicial dos cabeçalhos caso a aba esteja totalmente vazia
 */
function setupNewsletterHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.setName("Inscritos Lembrete");
    var headers = getCabecalhosOficiais();
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

    var widths = [160, 190, 250, 170, 150, 180, 210, 200, 200, 200];
    for (var i = 0; i < widths.length; i++) {
      sheet.setColumnWidth(i + 1, widths[i]);
    }

    if (sheet.getMaxColumns() > 10) {
      sheet.deleteColumns(11, sheet.getMaxColumns() - 10);
    }
  } else {
    atualizarCabecalhosPlanilha();
  }
}

/**
 * Atalho de formatação manual para o menu da planilha
 */
function formatarPlanilhaManualmente() {
  return atualizarCabecalhosPlanilha();
}

/**
 * =====================================================================
 * PONTO DE ENTRADA HTTP POST (doPost) — CAPTURA DE INSCRIÇÕES
 * =====================================================================
 */
function doPost(e) {
  e = e || {};
  if (!e.parameter) e.parameter = {};

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getNewsletterSheet(ss);

    if (sheet.getLastRow() === 0) {
      setupNewsletterHeaders(sheet);
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
    var nome = String(data.nome || "Visitante").trim();
    var email = String(data.email || data.contato || "").toLowerCase().trim();
    var perfil = String(data.perfil || data.empresa || "Visitante").trim();
    var origem = String(data.pagina || data.origem || "Home").trim();

    if (!email || email.indexOf("@") === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "E-mail inválido fornecido." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Busca duplicação de e-mail na coluna C (coluna 3)
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
      statusEmail1 = "Confirmado via E-mail (" + timestamp + ")";
    } catch (emailErr) {
      statusEmail1 = "Falha (" + emailErr.message + ")";
    }

    if (linhaAlvo !== -1) {
      // Atualiza dados cadastrais (colunas 1 a 6) mantendo o status dos e-mails 2 a 5 intactos
      sheet.getRange(linhaAlvo, 1, 1, 6).setValues([[
        timestamp,
        nome,
        email,
        perfil,
        origem,
        statusEmail1
      ]]);
    } else {
      // Adiciona novo inscrito com EXATAMENTE 10 colunas (A até J)
      sheet.appendRow([
        timestamp,    // Col 1 (A): Data e Hora
        nome,         // Col 2 (B): Nome
        email,        // Col 3 (C): E-mail
        perfil,       // Col 4 (D): Perfil / Segmento
        origem,       // Col 5 (E): Origem / Página
        statusEmail1, // Col 6 (F): E-mail 1 (Cadastro)
        "Pendente",   // Col 7 (G): E-mail 2 (Véspera 30/11 08h)
        "Pendente",   // Col 8 (H): E-mail 3 (Dia 1 01/12 07h)
        "Pendente",   // Col 9 (I): E-mail 4 (Dia 2 02/12 07h)
        "Pendente"    // Col 10 (J): E-mail 5 (Dia 3 03/12 07h)
      ]);
      linhaAlvo = sheet.getLastRow();
      sheet.getRange(linhaAlvo, 1, 1, 10).setFontSize(10).setVerticalAlignment("middle");
    }

    // Garante que nenhuma coluna excedente (K, L...) seja mantida
    if (sheet.getMaxColumns() > 10) {
      sheet.deleteColumns(11, sheet.getMaxColumns() - 10);
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

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Ponto de entrada GET para consulta rápida de status e saúde da planilha
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getNewsletterSheet(ss);
    var total = Math.max(0, sheet.getLastRow() - 1);

    var res = {
      status: "ok",
      servico: "SENAI Workshop 2026 — Lembretes por E-mail",
      totalInscritos: total,
      colunas: 10,
      timestamp: Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss")
    };

    var jsonStr = JSON.stringify(res);
    if (e && e.parameter && e.parameter.callback) {
      return ContentService
        .createTextOutput(e.parameter.callback + "(" + jsonStr + ");")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput(jsonStr)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * =====================================================================
 * GERAÇÃO DOS MODELOS DE E-MAIL EM HTML (DESIGN OFICIAL SENAI)
 * =====================================================================
 */
function gerarHtmlEmail(estagio, nome, perfil) {
  var nomeDisplay = (nome && nome !== "Visitante") ? nome : "Prezado(a) Visitante";
  var perfilTexto = (perfil && perfil !== "Visitante") ? (" (" + perfil + ")") : "";

  var config = {
    assunto: "🔔 Workshop SENAI 2026 — São Carlos",
    preheader: "Projetos em Tecnologia, Inovação e Engenharia no SENAI São Carlos",
    badgeTitulo: "WORKSHOP SENAI 2026 • SÃO CARLOS",
    titulo: "Seu lembrete foi confirmado!",
    mensagem: "Agradecemos pelo seu interesse! Você receberá nossos avisos por e-mail antes do início do evento para não perder nenhuma das novidades.",
    destaque: "Venha conhecer mais de 40 projetos desenvolvidos com foco nas necessidades reais da indústria, tecnologia e sociedade."
  };

  switch (estagio) {
    case "confirmacao":
    case "email1":
      config.assunto = "🔔 Confirmação: Lembrete do Workshop SENAI 2026 — São Carlos";
      config.preheader = "Sua inscrição para receber avisos do Workshop SENAI 2026 foi confirmada com sucesso!";
      config.badgeTitulo = "INSCRIÇÃO CONFIRMADA • WORKSHOP SENAI 2026";
      config.titulo = "Seu lembrete está confirmado!";
      config.mensagem = "Olá, <strong>" + nomeDisplay + "</strong>" + perfilTexto + "! Agradecemos pela sua inscrição para acompanhar o <strong>Workshop SENAI 2026</strong>. Guarde esta mensagem: nós avisaremos você nas etapas do evento para não perder nada!";
      config.destaque = "Nossos formandos estão nos preparativos finais para apresentar 40 projetos práticos de alto impacto tecnológico.";
      break;

    case "lembrete_30nov":
    case "email2":
      config.assunto = "⏰ Faltam 2 dias! Workshop SENAI 2026 começa nesta terça-feira (01/12)";
      config.preheader = "Prepare-se! Terça, quarta e quinta-feira (01, 02 e 03/12) das 08h às 17h em São Carlos.";
      config.badgeTitulo = "FALTAM 2 DIAS • COMEÇA TERÇA-FEIRA";
      config.titulo = "O Workshop SENAI 2026 começa nesta terça-feira!";
      config.mensagem = "Olá, <strong>" + nomeDisplay + "</strong>! A contagem regressiva começou: faltam apenas <strong>2 dias</strong> para a abertura oficial do Workshop SENAI 2026 na Escola SENAI Antonio Adolpho Lobbe em São Carlos.";
      config.destaque = "Serão 3 dias intensos de apresentações, protótipos em bancada, softwares inteligentes, robôs e automações industriais.";
      break;

    case "lembrete_01dez":
    case "email3":
      config.assunto = "🚀 É HOJE! Começou o Workshop SENAI 2026 — 1º Dia de Apresentações";
      config.preheader = "Portões abertos a partir das 08h! Entrada gratuita na Escola SENAI São Carlos.";
      config.badgeTitulo = "É HOJE • 1º DIA DE APRESENTAÇÕES (01/12)";
      config.titulo = "É hoje! O 1º dia do Workshop SENAI 2026 começou!";
      config.mensagem = "Olá, <strong>" + nomeDisplay + "</strong>! O grande dia chegou! A partir das <strong>08h</strong>, os portões do SENAI São Carlos estão abertos para você conhecer de perto as soluções criadas pelos nossos futuros técnicos.";
      config.destaque = "Venha conversar com as equipes, assistir aos pitches técnicos e comerciais e avaliar as soluções inovadoras.";
      break;

    case "lembrete_02dez":
    case "email4":
      config.assunto = "⚡ 2º Dia do Workshop SENAI 2026: Novas Apresentações e Tecnologias";
      config.preheader = "O evento continua nesta quarta-feira (02/12) das 08h às 17h. Venha prestigiar!";
      config.badgeTitulo = "2º DIA • O WORKSHOP CONTINUA (02/12)";
      config.titulo = "2º Dia! O Workshop SENAI 2026 continua a todo vapor!";
      config.mensagem = "Olá, <strong>" + nomeDisplay + "</strong>! O segundo dia do Workshop SENAI 2026 já está acontecendo com novas bancas avaliadoras, demonstrações ao vivo e networking com empresas e a comunidade.";
      config.destaque = "Se você ainda não veio ou quer revisitar os estandes, aproveite o dia de hoje para conferir novos projetos e soluções tecnológicas.";
      break;

    case "lembrete_03dez":
    case "email5":
      config.assunto = "🏆 Último Dia! Grande Encerramento e Premiação do Workshop SENAI 2026";
      config.preheader = "Hoje (03/12) é o último dia das 08h às 17h. Encerramento com as melhores soluções técnicas!";
      config.badgeTitulo = "ÚLTIMO DIA • GRANDE ENCERRAMENTO (03/12)";
      config.titulo = "Último dia! Grande encerramento do Workshop SENAI 2026!";
      config.mensagem = "Olá, <strong>" + nomeDisplay + "</strong>! Hoje é a sua última oportunidade de prestigiar nossos formandos, conhecer os 40 projetos e acompanhar as apresentações finais de encerramento do Workshop 2026.";
      config.destaque = "Aproveite hoje até as 17h para visitar os estandes, interagir com os alunos e docentes e conhecer o futuro da indústria e da tecnologia.";
      break;
  }

  return '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<title>' + config.assunto + '</title>' +
    '</head>' +
    '<body style="margin:0;padding:0;background-color:#0d111a;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">' +
      '<div style="display:none;font-size:1px;color:#0d111a;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">' + config.preheader + '</div>' +
      '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d111a;padding:30px 15px;">' +
        '<tr><td align="center">' +
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.45);">' +

            // Header SENAI
            '<tr><td style="background:linear-gradient(135deg,#e4002b 0%,#b80022 100%);padding:32px 24px;text-align:center;">' +
              '<h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.5px;">SEN<span style="color:#ffb703;">AI</span></h1>' +
              '<p style="margin:6px 0 0;color:rgba(255,255,255,0.92);font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;">' + config.badgeTitulo + '</p>' +
            '</td></tr>' +

            // Corpo Principal
            '<tr><td style="padding:34px 28px 24px;">' +
              '<h2 style="margin:0 0 16px;color:#0f172a;font-size:21px;font-weight:800;line-height:1.3;">' + config.titulo + '</h2>' +
              '<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">' + config.mensagem + '</p>' +
              '<p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.6;background:#f8fafc;padding:14px 18px;border-radius:8px;border-left:4px solid #e4002b;">' + config.destaque + '</p>' +

              // Cards dos 3 Cursos
              '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">' +
                '<tr><td style="padding-bottom:10px;">' +
                  '<p style="margin:0;font-size:13px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Cursos Técnicos Participantes:</p>' +
                '</td></tr>' +

                // DS
                '<tr><td style="padding:8px 0;">' +
                  '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;border-radius:8px;padding:10px 14px;">' +
                    '<tr><td>' +
                      '<p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">💻 Desenvolvimento de Sistemas</p>' +
                      '<p style="margin:3px 0 0;font-size:12px;color:#475569;">Softwares web full-stack, mobile, banco de dados, cloud e IA</p>' +
                    '</td></tr>' +
                  '</table>' +
                '</td></tr>' +

                // ELE
                '<tr><td style="padding:8px 0;">' +
                  '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;border-radius:8px;padding:10px 14px;">' +
                    '<tr><td>' +
                      '<p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">⚡ Eletroeletrônica</p>' +
                      '<p style="margin:3px 0 0;font-size:12px;color:#475569;">Manutenção, montagem e desenvolvimento de sistemas eletroeletrônicos</p>' +
                    '</td></tr>' +
                  '</table>' +
                '</td></tr>' +

                // MEC
                '<tr><td style="padding:8px 0;">' +
                  '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;border-radius:8px;padding:10px 14px;">' +
                    '<tr><td>' +
                      '<p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">🤖 Mecatrônica</p>' +
                      '<p style="margin:3px 0 0;font-size:12px;color:#475569;">Automação industrial, robótica, IoT e controle avançado de processos</p>' +
                    '</td></tr>' +
                  '</table>' +
                '</td></tr>' +
              '</table>' +

              // Caixa com Detalhes do Evento
              '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:5px solid #e4002b;border-radius:8px;margin-bottom:26px;">' +
                '<tr><td style="padding:18px 20px;">' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>📅 Data:</strong> 01, 02 e 03 de Dezembro de 2026 (Terça, Quarta e Quinta)</p>' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>⏰ Horário:</strong> Das 08h às 17h • Entrada Gratuita</p>' +
                  '<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>📍 Local:</strong> Escola SENAI Antonio Adolpho Lobbe</p>' +
                  '<p style="margin:0;font-size:13px;color:#64748b;">R. Cândido Padim, 25 - Vila Prado, São Carlos - SP</p>' +
                '</td></tr>' +
              '</table>' +

              // Botões de Ação
              '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:26px;">' +
                '<tr><td align="center">' +
                  '<a href="https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html" target="_blank" style="display:inline-block;background:#e4002b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;margin:4px 6px;">🚀 Ver Projetos no Portal</a>' +
                  '<a href="https://maps.app.goo.gl/ERURVEKNRXTKch5o6" target="_blank" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;margin:4px 6px;">🗺️ Abrir no Google Maps</a>' +
                '</td></tr>' +
              '</table>' +

              '<p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">Esperamos por você! Venha se inspirar com a criatividade, tecnologia e dedicação dos nossos estudantes.</p>' +
            '</td></tr>' +

            // Rodapé Institucional
            '<tr><td style="background:#f1f5f9;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;">' +
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
 * =====================================================================
 * DISPARADORES DE E-MAIL (INDIVIDUAL E EM LOTE)
 * =====================================================================
 */

/**
 * Envia o E-mail 1 de confirmação de cadastro e boas-vindas
 */
function dispararEmail1Cadastro(nome, email, perfil) {
  var assunto = "🔔 Confirmação: Lembrete do Workshop SENAI 2026 — São Carlos";
  var htmlBody = gerarHtmlEmail("confirmacao", nome, perfil);

  MailApp.sendEmail({
    to: email,
    subject: assunto,
    htmlBody: htmlBody,
    name: "SENAI São Carlos — Workshop 2026"
  });
}

// Compatibilidade com nome legado
function enviarEmailConfirmacao(nome, email, perfil) {
  dispararEmail1Cadastro(nome, email, perfil);
}

/**
 * Função genérica para disparo de lote com proteção de segurança anti-bloqueio
 */
function dispararLoteEmail(estagio, colunaStatus, rotuloAssunto) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getNewsletterSheet(ss);
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    var msgVazia = "Nenhum inscrito encontrado na aba 'Inscritos Lembrete'.";
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
        var htmlBody = gerarHtmlEmail(estagio, nome, perfil);
        var assuntoFinal = rotuloAssunto;

        if (estagio === "lembrete_30nov") {
          assuntoFinal = "⏰ Faltam 2 dias! Workshop SENAI 2026 começa nesta terça-feira (01/12)";
        } else if (estagio === "lembrete_01dez") {
          assuntoFinal = "🚀 É HOJE! Começou o Workshop SENAI 2026 — 1º Dia de Apresentações";
        } else if (estagio === "lembrete_02dez") {
          assuntoFinal = "⚡ 2º Dia do Workshop SENAI 2026: Novas Apresentações e Tecnologias";
        } else if (estagio === "lembrete_03dez") {
          assuntoFinal = "🏆 Último Dia! Grande Encerramento e Premiação do Workshop SENAI 2026";
        }

        MailApp.sendEmail({
          to: email,
          subject: assuntoFinal,
          htmlBody: htmlBody,
          name: "SENAI São Carlos — Workshop 2026"
        });

        sheet.getRange(i + 2, colunaStatus).setValue("Enviado em " + timestamp);
        totalEnviados++;
        Utilities.sleep(150); // Pausa de segurança de 150ms anti-bloqueio
      } catch (err) {
        sheet.getRange(i + 2, colunaStatus).setValue("Falha: " + err.message);
      }
    }
  }

  var msgFinal = "Disparo concluído: " + totalEnviados + " e-mail(s) enviado(s) para o lote (Coluna " + colunaStatus + ").";
  Logger.log(msgFinal);
  return msgFinal;
}

/**
 * Funções específicas para cada lote da régua oficial (Colunas 7, 8, 9 e 10)
 */
function dispararLoteEmail2_30Nov() {
  return dispararLoteEmail("lembrete_30nov", 7, "⏰ Faltam 2 dias! Workshop SENAI 2026 começa nesta terça-feira");
}

function dispararLoteEmail3_01Dez() {
  return dispararLoteEmail("lembrete_01dez", 8, "🚀 É HOJE! Começou o Workshop SENAI 2026 — 1º Dia de Apresentações");
}

function dispararLoteEmail4_02Dez() {
  return dispararLoteEmail("lembrete_02dez", 9, "⚡ 2º Dia do Workshop SENAI 2026: Novas Apresentações e Tecnologias");
}

function dispararLoteEmail5_03Dez() {
  return dispararLoteEmail("lembrete_03dez", 10, "🏆 Último Dia! Grande Encerramento e Premiação do Workshop SENAI 2026");
}

/**
 * =====================================================================
 * TESTES PARA O E-MAIL DO PRÓPRIO DOCENTE/ADMINISTRADOR
 * =====================================================================
 */
function testarEnvioEmailEstagio(estagio) {
  var meuEmail = (Session.getActiveUser() && Session.getActiveUser().getEmail()) ||
                 (Session.getEffectiveUser() && Session.getEffectiveUser().getEmail()) || "";
  if (!meuEmail) {
    var msgErro = "Nenhum e-mail de usuário ativo identificado nesta execução.";
    Logger.log(msgErro);
    return msgErro;
  }

  var assunto = "🔔 [TESTE] Workshop SENAI 2026 — Estágio: " + estagio;
  var htmlBody = gerarHtmlEmail(estagio, "Professor Rafael", "Docente SENAI");

  MailApp.sendEmail({
    to: meuEmail,
    subject: assunto,
    htmlBody: htmlBody,
    name: "SENAI São Carlos — Workshop 2026"
  });

  var msgSucesso = "E-mail de teste (" + estagio + ") enviado com sucesso para: " + meuEmail;
  Logger.log(msgSucesso);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msgSucesso, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msgSucesso;
}

function testarEnvioEmail1() { return testarEnvioEmailEstagio("confirmacao"); }
function testarEnvioEmail2() { return testarEnvioEmailEstagio("lembrete_30nov"); }
function testarEnvioEmail3() { return testarEnvioEmailEstagio("lembrete_01dez"); }
function testarEnvioEmail4() { return testarEnvioEmailEstagio("lembrete_02dez"); }
function testarEnvioEmail5() { return testarEnvioEmailEstagio("lembrete_03dez"); }

// Compatibilidade com menu original
function testarEnvioEmail() { return testarEnvioEmail1(); }

/**
 * =====================================================================
 * AGENDAMENTO AUTOMÁTICO VIA TRIGGERS DO GOOGLE APPS SCRIPT
 * =====================================================================
 */

/**
 * Configura os 4 disparos automáticos nos dias e horários exatos solicitados
 */
function configurarAgendamentosAutomaticos() {
  cancelarAgendamentosAutomaticos();

  var fuso = "America/Sao_Paulo";

  // 1. E-mail 2: 30/11/2026 às 08h00 (Véspera)
  var dataEmail2 = new Date(2026, 10, 30, 8, 0, 0); // Mês 10 = Novembro em JS
  ScriptApp.newTrigger("dispararLoteEmail2_30Nov")
    .timeBased()
    .at(dataEmail2)
    .inTimezone(fuso)
    .create();

  // 2. E-mail 3: 01/12/2026 às 07h00 (Dia 1)
  var dataEmail3 = new Date(2026, 11, 1, 7, 0, 0); // Mês 11 = Dezembro em JS
  ScriptApp.newTrigger("dispararLoteEmail3_01Dez")
    .timeBased()
    .at(dataEmail3)
    .inTimezone(fuso)
    .create();

  // 3. E-mail 4: 02/12/2026 às 07h00 (Dia 2)
  var dataEmail4 = new Date(2026, 11, 2, 7, 0, 0);
  ScriptApp.newTrigger("dispararLoteEmail4_02Dez")
    .timeBased()
    .at(dataEmail4)
    .inTimezone(fuso)
    .create();

  // 4. E-mail 5: 03/12/2026 às 07h00 (Dia 3)
  var dataEmail5 = new Date(2026, 11, 3, 7, 0, 0);
  ScriptApp.newTrigger("dispararLoteEmail5_03Dez")
    .timeBased()
    .at(dataEmail5)
    .inTimezone(fuso)
    .create();

  var msg = "Agendamentos automáticos ativados com sucesso:\n" +
            "• E-mail 2: 30/11/2026 às 08h00 (Véspera)\n" +
            "• E-mail 3: 01/12/2026 às 07h00 (Dia 1)\n" +
            "• E-mail 4: 02/12/2026 às 07h00 (Dia 2)\n" +
            "• E-mail 5: 03/12/2026 às 07h00 (Dia 3)";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

/**
 * Remove todos os agendamentos anteriores para evitar duplicidade
 */
function cancelarAgendamentosAutomaticos() {
  var triggers = ScriptApp.getProjectTriggers();
  var funcoesAlvo = [
    "dispararLoteEmail2_30Nov",
    "dispararLoteEmail3_01Dez",
    "dispararLoteEmail4_02Dez",
    "dispararLoteEmail5_03Dez",
    "enviarLembretesWorkshop"
  ];

  var cancelados = 0;
  for (var i = 0; i < triggers.length; i++) {
    var fnName = triggers[i].getHandlerFunction();
    if (funcoesAlvo.indexOf(fnName) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
      cancelados++;
    }
  }

  var msg = "Todos os agendamentos automáticos foram cancelados (" + cancelados + " gatilhos removidos).";
  Logger.log(msg);
  return msg;
}

function cancelarAgendamentosManualmente() {
  var msg = cancelarAgendamentosAutomaticos();
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
}

/**
 * =====================================================================
 * MENU SUSPENSO NA PLANILHA GOOGLE SHEETS
 * =====================================================================
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🔔 Workshop 2026 — Lembretes")
      .addItem("✉️ Enviar E-mail de Teste para Mim (1. Cadastro)", "testarEnvioEmail1")
      .addItem("✉️ Enviar E-mail de Teste para Mim (2. Véspera 30/11 08h)", "testarEnvioEmail2")
      .addItem("✉️ Enviar E-mail de Teste para Mim (3. Dia 1 01/12 07h)", "testarEnvioEmail3")
      .addItem("✉️ Enviar E-mail de Teste para Mim (4. Dia 2 02/12 07h)", "testarEnvioEmail4")
      .addItem("✉️ Enviar E-mail de Teste para Mim (5. Dia 3 03/12 07h)", "testarEnvioEmail5")
      .addSeparator()
      .addItem("⏰ Ativar Agendamento Automático dos 4 Lotes (30/11 a 03/12)", "configurarAgendamentosAutomaticos")
      .addItem("⏹️ Cancelar Todos os Agendamentos Automáticos", "cancelarAgendamentosManualmente")
      .addSeparator()
      .addItem("🚀 Disparar AGORA Lote 2 (Véspera 30/11 - 08h)", "executarLote2Manual")
      .addItem("🚀 Disparar AGORA Lote 3 (Dia 1 01/12 - 07h)", "executarLote3Manual")
      .addItem("🚀 Disparar AGORA Lote 4 (Dia 2 02/12 - 07h)", "executarLote4Manual")
      .addItem("🚀 Disparar AGORA Lote 5 (Dia 3 03/12 - 07h)", "executarLote5Manual")
      .addSeparator()
      .addItem("🔧 Atualizar Cabeçalhos e Remover Colunas K/L (10 Colunas)", "formatarPlanilhaManualmente")
      .addToUi();
  } catch (err) {
    // Modo headless
  }
}

function executarLote2Manual() {
  var res = dispararLoteEmail2_30Nov();
  try { SpreadsheetApp.getUi().alert("Workshop SENAI 2026", res, SpreadsheetApp.getUi().ButtonSet.OK); } catch(e){}
}
function executarLote3Manual() {
  var res = dispararLoteEmail3_01Dez();
  try { SpreadsheetApp.getUi().alert("Workshop SENAI 2026", res, SpreadsheetApp.getUi().ButtonSet.OK); } catch(e){}
}
function executarLote4Manual() {
  var res = dispararLoteEmail4_02Dez();
  try { SpreadsheetApp.getUi().alert("Workshop SENAI 2026", res, SpreadsheetApp.getUi().ButtonSet.OK); } catch(e){}
}
function executarLote5Manual() {
  var res = dispararLoteEmail5_03Dez();
  try { SpreadsheetApp.getUi().alert("Workshop SENAI 2026", res, SpreadsheetApp.getUi().ButtonSet.OK); } catch(e){}
}
