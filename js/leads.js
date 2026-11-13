/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — SISTEMA DE CAPTURA E TRACKING DE LEADS
 * =====================================================================
 * Rastreia acessos e intenções de interesse:
 *  - Lead da página (acesso à home)
 *  - Lead da turma (acesso a DS ou Mecatrônica)
 *  - Lead do projeto (cliques em Funcionamento, Comercial, Visitar site e QR Code)
 *  - Lead de contato direto (formulário de interesse deixado por visitantes/empresas)
 *
 * Envia para a planilha do Google Sheets via Google Apps Script.
 * =====================================================================
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Leads = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function getSheetsUrl() {
    var custom = "";
    try { custom = localStorage.getItem("custom_sheets_url"); } catch (e) {}
    if (custom && custom.trim()) return custom.trim();
    if (window.SITE && window.SITE.googleSheetsUrl && window.SITE.googleSheetsUrl.trim()) {
      return window.SITE.googleSheetsUrl.trim();
    }
    return "";
  }

  function getDeviceType() {
    var ua = navigator.userAgent || "";
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) return "Mobile";
    return "Desktop";
  }

  function getFormattedDate() {
    var now = new Date();
    var d = String(now.getDate()).padStart(2, '0');
    var m = String(now.getMonth() + 1).padStart(2, '0');
    var y = now.getFullYear();
    var h = String(now.getHours()).padStart(2, '0');
    var min = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    return d + "/" + m + "/" + y + " " + h + ":" + min + ":" + s;
  }

  function saveLocalHistory(lead) {
    try {
      var hist = JSON.parse(localStorage.getItem("senai_lead_history") || "[]");
      hist.unshift(lead);
      if (hist.length > 60) hist.pop();
      localStorage.setItem("senai_lead_history", JSON.stringify(hist));
    } catch (e) {}
  }

  function getLocalHistory() {
    try {
      return JSON.parse(localStorage.getItem("senai_lead_history") || "[]");
    } catch (e) {
      return [];
    }
  }

  function sendLead(data) {
    data = data || {};
    var payload = {
      timestamp: getFormattedDate(),
      tipo: data.tipo || "Interação",
      turma: data.turma || "-",
      projeto_id: data.projeto_id || "-",
      projeto_nome: data.projeto_nome || "-",
      acao: data.acao || "-",
      nome: data.nome || "-",
      contato: data.contato || "-",
      empresa: data.empresa || data.perfil || "-",
      mensagem: data.mensagem || "-",
      nota_apresentacao: (data.nota_apresentacao && Number(data.nota_apresentacao) > 0) ? Number(data.nota_apresentacao) : "",
      nota_projeto: (data.nota_projeto && Number(data.nota_projeto) > 0) ? Number(data.nota_projeto) : "",
      pagina: data.pagina || (document.body ? document.body.getAttribute("data-page") : "-") || "-",
      dispositivo: getDeviceType(),
      origem: window.location.href || "-"
    };

    // Log para desenvolvimento e auditoria
    console.log("[SENAI Lead Tracked]:", payload);
    saveLocalHistory(payload);

    var endpoint = getSheetsUrl();
    if (!endpoint) {
      // Endpoint ainda não configurado
      return Promise.resolve({ status: "local_only", data: payload });
    }

    // Envio para Google Apps Script com no-cors para evitar bloqueio de redirecionamento
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function () {
      return { status: "sent", data: payload };
    }).catch(function (err) {
      console.warn("[SENAI Lead Error]:", err);
      return { status: "error", error: err, data: payload };
    });
  }

  /* ----- Rastreamento da Página (Home) ----- */
  function trackPageView(pageName) {
    pageName = pageName || "home";
    var sessionKey = "senai_tracked_pv_" + pageName;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, "1");
    } catch (e) {}

    return sendLead({
      tipo: "Lead Página",
      pagina: pageName,
      turma: "Geral",
      acao: "Visita Página Inicial",
      mensagem: document.referrer ? ("Referrer: " + document.referrer) : "Acesso Direto"
    });
  }

  /* ----- Rastreamento da Turma (DS / Mecatrônica) ----- */
  function trackCourseView(courseKey, courseName) {
    courseKey = courseKey || "curso";
    var sessionKey = "senai_tracked_course_" + courseKey;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, "1");
    } catch (e) {}

    var nome = courseName || (courseKey === "ds" ? "Desenvolvimento de Sistemas" : "Mecatrônica");
    return sendLead({
      tipo: "Lead Turma",
      pagina: courseKey,
      turma: nome,
      acao: "Visita Página da Turma",
      mensagem: "Explorando turma de " + nome
    });
  }

  /* ----- Rastreamento de Ações do Projeto ----- */
  function trackProjectAction(project, courseKey, action, extra) {
    if (!project) return;
    extra = extra || {};
    var turmaNome = courseKey === "ds" ? "Desenvolvimento de Sistemas" : (courseKey === "mecatronica" ? "Mecatrônica" : courseKey);
    var pid = project.id || (project.nome ? project.nome.toLowerCase().replace(/\s+/g, '-') : "-");

    var acaoFormatada = action;
    var tipoLead = "Lead Projeto";

    switch (action) {
      case "funcionamento":
        acaoFormatada = "Clique Funcionamento (Pitch Técnico)";
        break;
      case "comercial":
        acaoFormatada = "Clique Comercial (Pitch Comercial)";
        break;
      case "visitar_site":
        acaoFormatada = "Clique Visitar Site (Landing Page)";
        break;
      case "abriu_qr_code":
        acaoFormatada = "Visualizou QR Code do Projeto";
        break;
      case "acesso_via_qr_code":
        acaoFormatada = "Acesso Direto via QR Code / Link Único";
        tipoLead = "Lead QR Code";
        break;
      case "copiou_link_qr":
        acaoFormatada = "Copiou Link do Projeto";
        break;
      case "baixou_qr_svg":
        acaoFormatada = "Baixou QR Code (SVG)";
        break;
      case "baixou_qr_png":
        acaoFormatada = "Baixou QR Code (PNG)";
        break;
      case "abriu_modal":
        acaoFormatada = "Abriu Detalhes do Projeto";
        break;
    }

    return sendLead({
      tipo: tipoLead,
      turma: turmaNome,
      projeto_id: pid,
      projeto_nome: project.nome || "-",
      acao: acaoFormatada,
      mensagem: extra.mensagem || (extra.url ? ("URL: " + extra.url) : "-")
    });
  }

  /* ----- Rastreamento de Contato Ativo (Lead com formulário) ----- */
  function submitContactLead(formData) {
    formData = formData || {};
    return sendLead({
      tipo: "Lead Contato",
      turma: formData.turma || "-",
      projeto_id: formData.projeto_id || "-",
      projeto_nome: formData.projeto_nome || "-",
      acao: "Formulário de Interesse Enviado",
      nome: formData.nome || "-",
      contato: formData.contato || "-",
      empresa: formData.empresa || formData.perfil || "-",
      mensagem: formData.mensagem || "Interesse registrado pelo visitante"
    });
  }

  /* ----- Rastreamento de Avaliação com Estrelas (Apresentação & Projeto) ----- */
  function submitEvaluation(project, courseKey, ratings) {
    if (!project) return;
    ratings = ratings || {};
    var turmaNome = courseKey === "ds" ? "Desenvolvimento de Sistemas" : (courseKey === "mecatronica" ? "Mecatrônica" : courseKey);
    var pid = project.id || (project.nome ? project.nome.toLowerCase().replace(/\s+/g, '-') : "-");
    var ap = Number(ratings.apresentacao) || 0;
    var proj = Number(ratings.projeto) || 0;

    var detalhes = [];
    if (ap > 0) detalhes.push("Apresentação: " + ap + "★");
    if (proj > 0) detalhes.push("Ideia e Solução Técnica: " + proj + "★");
    var resumo = detalhes.join(" | ") || "Avaliação registrada";

    return sendLead({
      tipo: "Avaliação",
      turma: turmaNome,
      projeto_id: pid,
      projeto_nome: project.nome || "-",
      acao: "Avaliação: " + resumo,
      mensagem: resumo,
      nota_apresentacao: ap,
      nota_projeto: proj
    });
  }

  /* ----- Inscrição para Receber Lembretes do Workshop por E-mail ----- */
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email || "").trim());
  }

  function submitNewsletterLead(formData) {
    formData = formData || {};
    var email = String(formData.email || "").trim();
    if (!isValidEmail(email)) {
      return Promise.reject(new Error("E-mail com formato inválido."));
    }

    var payload = {
      tipo: "Newsletter Lembrete",
      acao: "Inscrição Lembrete Workshop",
      nome: formData.nome ? String(formData.nome).trim() : "Visitante",
      email: email,
      contato: email,
      perfil: formData.perfil ? String(formData.perfil).trim() : "Visitante",
      empresa: formData.perfil ? String(formData.perfil).trim() : "Visitante",
      mensagem: "Inscrição para receber lembrete do evento (02 e 03 de Dezembro)",
      pagina: formData.pagina || (document.body ? document.body.getAttribute("data-page") : "home") || "home"
    };

    try {
      localStorage.setItem("senai_newsletter_email", email);
      localStorage.setItem("senai_newsletter_subscribed", "true");
    } catch (e) {}

    return sendLead(payload);
  }

  function getNewsletterSubscription() {
    try {
      var isSubscribed = localStorage.getItem("senai_newsletter_subscribed") === "true";
      var email = localStorage.getItem("senai_newsletter_email") || "";
      return { isSubscribed: isSubscribed, email: email };
    } catch (e) {
      return { isSubscribed: false, email: "" };
    }
  }

  return {
    sendLead: sendLead,
    trackPageView: trackPageView,
    trackCourseView: trackCourseView,
    trackProjectAction: trackProjectAction,
    submitContactLead: submitContactLead,
    submitEvaluation: submitEvaluation,
    submitNewsletterLead: submitNewsletterLead,
    getNewsletterSubscription: getNewsletterSubscription,
    isValidEmail: isValidEmail,
    getSheetsUrl: getSheetsUrl,
    getLocalHistory: getLocalHistory
  };
}));

