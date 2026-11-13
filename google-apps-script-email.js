/**
 * =====================================================================
 * BACKEND DEDICADO DE CAPTURA DE E-MAILS & RÉGUA DE LEMBRETES
 * WORKSHOP SENAI 2026 — SÃO CARLOS
 * =====================================================================
 * Conta: @docente.senai.br
 * 
 * Régua de 4 E-mails:
 *  1. E-mail 1 (Imediato no cadastro): Confirmação de inscrição e boas-vindas
 *  2. E-mail 2 (01/12 - Véspera): "É amanhã! Prepare-se para o Workshop SENAI 2026"
 *  3. E-mail 3 (02/12 às 07h - Dia 1): "É hoje! O 1º dia de evento começou"
 *  4. E-mail 4 (03/12 às 07h - Dia 2): "Último dia! Encerramento dos projetos de DS e Mecatrônica"
 * 
 * Funcionalidades:
 *  - Criação automática e estilização dos cabeçalhos na planilha
 *  - Recebimento via POST da landing page sem duplicar e-mails
 *  - Agendamento automático via Triggers do Google Apps Script
 *  - Menu interativo no Google Sheets com 1 clique para testes e disparos manuais
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

    // Procura se o e-mail já existe na coluna C (coluna 3)
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

    // Dispara E-mail 1: Confirmação Imediata de Cadastro
    var statusEmail1 = "E-mail não enviado";
    try {
      enviarEmailPorEstagio("confirmacao", nome, email, perfil);
      statusEmail1 = "Enviado em " + timestamp;
    } catch (emailErr) {
      statusEmail1 = "Falha (" + emailErr.message + ")";
    }

    if (linhaAlvo !== -1) {
      // Atualiza dados mantendo os status de disparo anteriores
      sheet.getRange(linhaAlvo, 1, 1, 6).setValues([[
        timestamp,
        nome,
        email,
        perfil,
        origem,
        statusEmail1
      ]]);
    } else {
      // Insere novo inscrito com colunas para os 4 e-mails
      sheet.appendRow([
        timestamp,    // Col 1: Data e Hora
        nome,         // Col 2: Nome
        email,        // Col 3: E-mail
        perfil,       // Col 4: Perfil / Segmento
        origem,       // Col 5: Origem / Página
        statusEmail1, // Col 6: E-mail 1 (Confirmação)
        "Pendente",   // Col 7: E-mail 2 (Véspera 01/12)
        "Pendente",   // Col 8: E-mail 3 (Dia 1 - 02/12 07h)
        "Pendente"    // Col 9: E-mail 4 (Dia 2 - 03/12 07h)
      ]);
      linhaAlvo = sheet.getLastRow();
      sheet.getRange(linhaAlvo, 1, 1, 9).setFontSize(10).setVerticalAlignment("middle");
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
 * Ponto de entrada HTTP GET (status da API)
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
 * Configuração dos cabeçalhos da planilha
 */
function configurarCabecalhos(sheet) {
  var headers = [
    "Data e Hora",
    "Nome",
    "E-mail",
    "Perfil / Segmento",
    "Origem / Página",
    "E-mail 1 (Cadastro)",
    "E-mail 2 (Véspera 01/12)",
    "E-mail 3 (Dia 1 02/12 07h)",
    "E-mail 4 (Dia 2 03/12 07h)"
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

  var widths = [160, 190, 250, 160, 140, 190, 190, 190, 190];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

function formatarPlanilhaManualmente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  configurarCabecalhos(ss.getActiveSheet());
  SpreadsheetApp.getUi().alert("Workshop SENAI 2026", "Cabeçalhos configurados com sucesso para os 4 e-mails!", SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * =====================================================================
 * DISPARADORES DOS 4 ESTÁGIOS DE E-MAILS
 * =====================================================================
 */

/**
 * Disparador genérico para qualquer uma das colunas (7, 8 ou 9)
 */
function dispararLoteEmail(estagio, colunaStatus, rotulo) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    var msgVazia = "Nenhum inscrito cadastrado na planilha.";
    Logger.log(msgVazia);
    return msgVazia;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  var totalEnviados = 0;
  var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var nome = row[1];
    var email = row[2];
    var perfil = row[3];
    var statusAtual = String(row[colunaStatus - 1] || "");

    // Só envia se for e-mail válido e ainda não tiver sido enviado
    if (email && String(email).indexOf("@") !== -1 && statusAtual.indexOf("Enviado") === -1) {
      try {
        enviarEmailPorEstagio(estagio, nome, email, perfil);
        sheet.getRange(i + 2, colunaStatus).setValue("Enviado em " + timestamp);
        totalEnviados++;
        Utilities.sleep(150); // Pausa de segurança anti-bloqueio
      } catch (err) {
        sheet.getRange(i + 2, colunaStatus).setValue("Falha: " + err.message);
      }
    }
  }

  var msgFinal = rotulo + ": " + totalEnviados + " e-mail(s) enviado(s) com sucesso.";
  Logger.log(msgFinal);
  return msgFinal;
}

// 1. E-mail 2: Véspera (01/12)
function dispararEmailVespera() {
  var resultado = dispararLoteEmail("vespera", 7, "E-mail 2 (Véspera - 01/12)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// 2. E-mail 3: Dia 1 (02/12 às 07:00)
function dispararEmailDia1() {
  var resultado = dispararLoteEmail("dia1", 8, "E-mail 3 (Dia 1 - 02/12)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

// 3. E-mail 4: Dia 2 (03/12 às 07:00)
function dispararEmailDia2() {
  var resultado = dispararLoteEmail("dia2", 9, "E-mail 4 (Dia 2 - 03/12)");
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", resultado, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return resultado;
}

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
        subtitulo: "Agradecemos pelo seu interesse no <strong>Workshop SENAI 2026</strong>. Você receberá avisos exclusivos antes e durante o evento para aproveitar ao máximo as apresentações de <strong>Desenvolvimento de Sistemas</strong> e <strong>Mecatrônica</strong>.",
        destaque: "📅 O evento ocorrerá nos dias <strong>02 e 03 de Dezembro</strong>, das <strong>08h às 17h</strong>, com <strong>Entrada Gratuita</strong>.",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "🚀 Ver Projetos no Portal"
      };

    case "vespera":
      return {
        nome: nomeDisplay,
        tag: "É Amanhã!",
        assunto: "⏳ É Amanhã! Workshop SENAI 2026 — Prepare-se para ver as inovações",
        titulo: "Os portões abrem amanhã às 08h!",
        subtitulo: "A contagem regressiva terminou! Os formandos dos cursos técnicos em <strong>Desenvolvimento de Sistemas</strong> e <strong>Mecatrônica</strong> estão prontos para demonstrar protótipos industriais, automação robótica, IoT, aplicativos e inteligência artificial.",
        destaque: "📍 <strong>Local:</strong> Escola SENAI Antonio Adolpho Lobbe (Rua Cândido Padim, 25 - Vila Prado). Esperamos você!",
        ctaUrl: "https://maps.app.goo.gl/ERURVEKNRXTKch5o6",
        ctaTexto: "🗺️ Traçar Rota no Google Maps"
      };

    case "dia1":
      return {
        nome: nomeDisplay,
        tag: "1º Dia • Começa Hoje!",
        assunto: "🚀 É Hoje! O Workshop SENAI 2026 Começa às 08h — Estamos te esperando!",
        titulo: "O Workshop SENAI 2026 começou!",
        subtitulo: "A partir das 08h de hoje, venha interagir diretamente com os estudantes, testar os projetos nas bancadas e participar da votação das melhores ideias técnicas e comerciais.",
        destaque: "⭐ <strong>Você pode votar nos projetos:</strong> Acesse nosso portal interativo pelo celular durante sua visita e deixe suas estrelas para os grupos.",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "⭐ Acessar Portal e Votar"
      };

    case "dia2":
      return {
        nome: nomeDisplay,
        tag: "Último Dia • Encerramento",
        assunto: "⭐ Último Dia! Workshop SENAI 2026 — Encerramento das apresentações",
        titulo: "Hoje é o último dia de apresentações!",
        subtitulo: "Se você ainda não visitou ou quer rever as inovações tecnológicas dos formandos, hoje é a oportunidade perfeita! Nossos alunos continuam demonstrando suas soluções até as 17h.",
        destaque: "🏆 Não deixe de conferir os projetos de destaque e parabenizar nossos futuros profissionais da indústria e tecnologia!",
        ctaUrl: "https://senaisp-unid601-projetos.github.io/senai-workshop-2026/index.html",
        ctaTexto: "📱 Ver Lista de Projetos"
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
              '<p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;text-align:center;">Nos vemos lá! Venha prestigiar os projetos e o talento dos nossos alunos.</p>' +
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
 * Cria gatilhos automáticos para disparar:
 *  - E-mail 2 em 01/12/2026 às 09:00
 *  - E-mail 3 em 02/12/2026 às 07:00
 *  - E-mail 4 em 03/12/2026 às 07:00
 */
function agendarDisparosAutomaticos() {
  cancelarAgendamentosAnteriores();

  // Mês em JavaScript é 0-indexado (11 = Dezembro)
  var d2 = new Date(2026, 11, 1, 9, 0, 0); // 01/12/2026 às 09:00
  var d3 = new Date(2026, 11, 2, 7, 0, 0); // 02/12/2026 às 07:00
  var d4 = new Date(2026, 11, 3, 7, 0, 0); // 03/12/2026 às 07:00

  ScriptApp.newTrigger("dispararEmailVespera").timeBased().at(d2).create();
  ScriptApp.newTrigger("dispararEmailDia1").timeBased().at(d3).create();
  ScriptApp.newTrigger("dispararEmailDia2").timeBased().at(d4).create();

  var msg = "Agendamento automático concluído!\n\n" +
            "• E-mail 2 (Véspera): 01/12/2026 às 09:00\n" +
            "• E-mail 3 (Dia 1): 02/12/2026 às 07:00\n" +
            "• E-mail 4 (Dia 2): 03/12/2026 às 07:00\n\n" +
            "O Google Apps Script fará os disparos automaticamente!";
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert("Workshop SENAI 2026", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
  return msg;
}

function cancelarAgendamentosAnteriores() {
  var triggers = ScriptApp.getProjectTriggers();
  var funcoes = ["dispararEmailVespera", "dispararEmailDia1", "dispararEmailDia2"];
  for (var i = 0; i < triggers.length; i++) {
    if (funcoes.indexOf(triggers[i].getHandlerFunction()) !== -1) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * =====================================================================
 * TESTE: ENVIA OS 4 MODELOS PARA O E-MAIL DO DOCENTE
 * =====================================================================
 */
function testarEnvioTodosModelos() {
  var meuEmail = (Session.getActiveUser() && Session.getActiveUser().getEmail()) ||
                 (Session.getEffectiveUser() && Session.getEffectiveUser().getEmail()) || "";
  if (!meuEmail) {
    var erro = "Nenhum e-mail de usuário identificado para teste.";
    Logger.log(erro);
    return erro;
  }

  var estagios = ["confirmacao", "vespera", "dia1", "dia2"];
  for (var i = 0; i < estagios.length; i++) {
    enviarEmailPorEstagio(estagios[i], "Professor Rafael", meuEmail, "Docente SENAI");
    Utilities.sleep(400);
  }

  var msg = "Sucesso! Os 4 modelos de e-mail foram enviados para: " + meuEmail + "\n\nVerifique sua caixa de entrada!";
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
      .addItem("✉️ Enviar os 4 Modelos de Teste para Mim", "testarEnvioTodosModelos")
      .addSeparator()
      .addItem("⏰ Ativar Agendamento Automático (01/12, 02/12 e 03/12)", "agendarDisparosAutomaticos")
      .addSeparator()
      .addItem("🚀 Disparar Manualmente: E-mail 2 (Véspera - 01/12)", "dispararEmailVespera")
      .addItem("🚀 Disparar Manualmente: E-mail 3 (Dia 1 - 02/12 às 07h)", "dispararEmailDia1")
      .addItem("🚀 Disparar Manualmente: E-mail 4 (Dia 2 - 03/12 às 07h)", "dispararEmailDia2")
      .addSeparator()
      .addItem("⚙️ Formatar Cabeçalhos da Planilha", "formatarPlanilhaManualmente")
      .addToUi();
  } catch (err) {
    // Execução sem interface gráfica ativa
  }
}

/**
 * Função utilitária para testar execução direta pelo editor
 */
function testarScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  configurarCabecalhos(ss.getActiveSheet());
  return "Planilha configurada com sucesso para a régua de 4 e-mails!";
}
