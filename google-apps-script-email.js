/**
 * =====================================================================
 * BACKEND DEDICADO DE CAPTURA DE E-MAILS & LEMBRETES — WORKSHOP SENAI 2026
 * =====================================================================
 * Arquivo para ser copiado na nova planilha Google criada na conta @docente.senai.br
 * 
 * Funcionalidades:
 *  1. Recebe inscrições da Landing Page via doPost()
 *  2. Grava na planilha evitando duplicidades de e-mail
 *  3. Envia e-mail de confirmação automática imediata (com layout oficial SENAI)
 *  4. Menu no Google Sheets com 1 clique para:
 *      - Enviar e-mail de teste para você mesmo
 *      - Disparar lembrete em massa para todos os inscritos pré-evento
 * =====================================================================
 */

/**
 * Ponto de entrada HTTP POST (chamado pelo formulário da landing page)
 */
function doPost(e) {
  e = e || {};
  if (!e.parameter) e.parameter = {};

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Se a planilha estiver vazia, cria e formata os cabeçalhos
    if (sheet.getLastRow() === 0) {
      configurarCabecalhos(sheet);
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

    // Dispara e-mail de confirmação imediata
    var statusEmail = "E-mail não enviado";
    try {
      enviarEmailConfirmacao(nome, email, perfil);
      statusEmail = "Confirmado via E-mail";
    } catch (emailErr) {
      statusEmail = "Pendente (" + emailErr.message + ")";
    }

    if (linhaAlvo !== -1) {
      // Atualiza os dados do registro existente mantendo o status do lembrete
      sheet.getRange(linhaAlvo, 1, 1, 5).setValues([[
        timestamp,
        nome,
        email,
        perfil,
        statusEmail
      ]]);
    } else {
      // Adiciona novo inscrito
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

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Ponto de entrada HTTP GET (para teste de status da API)
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var total = lastRow > 1 ? lastRow - 1 : 0;

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "online",
        servico: "SENAI Workshop 2026 — Gestor de E-mails",
        totalInscritos: total,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Configura e estiliza os cabeçalhos da planilha
 */
function configurarCabecalhos(sheet) {
  var headers = [
    "Data e Hora",
    "Nome",
    "E-mail",
    "Perfil / Segmento",
    "Status Confirmação",
    "Status Lembrete Workshop",
    "Origem / Página"
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
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  var widths = [160, 200, 260, 180, 180, 200, 180];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

/**
 * Função utilitária para chamar manualmente pelo menu
 */
function formatarPlanilhaManualmente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  configurarCabecalhos(ss.getActiveSheet());
  SpreadsheetApp.getUi().alert("Workshop SENAI 2026", "Cabeçalhos configurados com sucesso!", SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Envia o e-mail de confirmação imediata
 */
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

/**
 * Gerador de template HTML responsivo com identidade visual SENAI
 */
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
 * Envia e-mail de teste para o e-mail da conta Google ativa no momento
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
 * Mala direta pré-evento para todos os inscritos que ainda não receberam
 */
function enviarLembretesWorkshop() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    var msgVazia = "Nenhum inscrito encontrado na planilha.";
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

    // Só envia se tiver e-mail válido e ainda não tiver sido enviado
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
 * Cria o menu interativo na barra de menus da planilha
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🔔 Workshop 2026")
      .addItem("✉️ Enviar E-mail de Teste para Mim", "testarEnvioEmail")
      .addSeparator()
      .addItem("🚀 Disparar Lembretes para Todos os Inscritos", "enviarLembretesWorkshop")
      .addSeparator()
      .addItem("⚙️ Formatar Cabeçalhos da Planilha", "formatarPlanilhaManualmente")
      .addToUi();
  } catch (err) {
    // Execução sem UI
  }
}

/**
 * Função utilitária para testar execução sem erros no botão Executar do editor
 */
function testarScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  configurarCabecalhos(ss.getActiveSheet());
  Logger.log("Planilha configurada com sucesso!");
  return "Planilha configurada com sucesso!";
}
