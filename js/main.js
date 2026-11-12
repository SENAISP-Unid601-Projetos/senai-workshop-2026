/* ===== SENAI Workshop 2026 — lógica do site ===== */
(function () {
  "use strict";
  var S = window.SITE;

  var I18N = {
    pt: {
      theme: "Tema", back: "← Voltar", eyebrow: "São Carlos · Tecnologia em Ação",
      heroTitle: 'Workshop SENAI <span class="grad">2026</span>',
      heroSub: "Mecatrônica e Desenvolvimento de Sistemas",
      seeClasses: "Conheça as turmas",
      classesTitle: "Turmas SENAI São Carlos 2026",
      classesSub: "Dois cursos, dezenas de ideias que viram solução.",
      projects: "Projetos", students: "Alunos", seeProjects: "Ver Projetos",
      aboutTitle: "Sobre o SENAI São Carlos",
      aboutText: "O SENAI São Carlos é referência em formação técnica e tecnológica na região, preparando profissionais para os desafios da Indústria 4.0. Nossos alunos desenvolvem projetos inovadores que conectam teoria e prática, criando soluções reais para problemas do mercado de trabalho.",
      statProjects: "Projetos Desenvolvidos", statStudents: "Alunos Participantes", statCourses: "Cursos Participantes", statDedication: "Dedicação e Inovação",
      ourProjects: "Nossos Projetos", ourProjectsSub: "Landing page, pitch técnico e pitch comercial de cada grupo.",
      tech: "Funcionamento", commercial: "Comercial", visit: "Visitar site", soon: "Em breve",
      members: "integrantes",
      fTitle: "SENAI São Carlos", fText: "Centro de referência em formação técnica e tecnológica, preparando profissionais para os desafios da Indústria 4.0.", fSlogan: "Formando o futuro da tecnologia",
      fClasses: "Turmas 2026", fTeam: "Equipe de Desenvolvimento", fDevs: "Desenvolvedores:", techLead: "Tech Lead",
      rights: "Serviço Nacional de Aprendizagem Industrial", copyright: "Todos os direitos reservados", devBy: "Desenvolvido por",
      noProjects: "Nenhum projeto cadastrado ainda.",
      soonMsg: "Link disponível em breve.",
      /* Modal & QR Code */
      details: "Ver detalhes",
      close: "Fechar",
      qrToggle: "QR Code do Projeto",
      qrToggleHide: "Ocultar QR Code",
      qrTitle: "QR Code do Projeto",
      qrSub: "Aponte a câmera do celular para abrir direto neste projeto.",
      copyLink: "Copiar link",
      linkCopied: "Link copiado para a área de transferência!",
      downloadSvg: "Baixar QR Code (SVG)",
      downloadPng: "Baixar QR Code (PNG)",
      openNewTab: "Abrir em nova aba",
      customBaseUrl: "⚙️ Configurar URL do GitHub Pages",
      save: "Salvar",
      reset: "Restaurar padrão",
      baseUrlSaved: "URL base configurada!",
      baseUrlReset: "URL padrão restaurada!",
      pageQrBtn: "QR Code do Workshop SENAI 2026",
      pageQrTitle: "QR Code do Workshop SENAI 2026",
      pageQrSub: "Aponte a câmera do seu celular para abrir o portal completo do evento.",
      evalTitle: "Avalie este grupo",
      evalApresentacao: "Apresentação:",
      evalProjeto: "Ideia e Solução Técnica:",
      evalSaved: "Avaliação salva! ⭐",
      dashboard: "Rankings",
      dashboardTitle: "Ver painel de notas e rankings",
      dashboardHero: "🏆 Acompanhar Rankings",
      dashboardFooter: "Rankings & Apuração",
      dashboardFooterDesc: "Acompanhe os projetos mais votados e o total de visitas ao vivo.",
      dashboardFooterBtn: "Acessar Painel",
      eventTitle: "Data e Local do Evento",
      eventSub: "Venha prestigiar os projetos inovadores e soluções desenvolvidas pelos nossos alunos.",
      eventDateLabel: "Data do Evento",
      eventDateVal: "02 e 03 de Dezembro de 2026",
      eventDateDays: "Quarta e Quinta-feira • Projetos em Exposição",
      eventTimeLabel: "Horário",
      eventTimeVal: "Das 08h às 17h",
      eventTimeSub: "Aberto ao público • Entrada gratuita",
      eventLocLabel: "Local",
      eventLocName: "Faculdade de Tecnologia e Escola SENAI",
      eventLocUnit: "Antonio Adolpho Lobbe • São Carlos/SP",
      eventAddrLabel: "Endereço",
      eventAddrVal: "R. Cândido Padim, 25 - Vila Prado",
      eventAddrCity: "São Carlos - SP • CEP 13574-002",
      eventOpenMaps: "Abrir no Google Maps",
      eventMapTitle: "📍 Mapa de Localização",
      eventViewRoute: "Ver rota no Google Maps ↗",
      eventHeroBadgeDate: "02 e 03 de Dezembro",
      eventHeroBadgeTime: "08h às 17h",
      eventHeroBadgeLoc: "SENAI São Carlos"
    },
    en: {
      theme: "Theme", back: "← Back", eyebrow: "São Carlos · Technology in Action",
      heroTitle: 'SENAI Workshop <span class="grad">2026</span>',
      heroSub: "Mechatronics and Systems Development",
      seeClasses: "Meet the classes",
      classesTitle: "SENAI São Carlos Classes 2026",
      classesSub: "Two courses, dozens of ideas turned into solutions.",
      projects: "Projects", students: "Students", seeProjects: "See Projects",
      aboutTitle: "About SENAI São Carlos",
      aboutText: "SENAI São Carlos is a regional reference in technical and technological education, preparing professionals for the challenges of Industry 4.0. Our students develop innovative projects that connect theory and practice, creating real solutions for real market problems.",
      statProjects: "Projects Developed", statStudents: "Participating Students", statCourses: "Participating Courses", statDedication: "Dedication & Innovation",
      ourProjects: "Our Projects", ourProjectsSub: "Landing page, technical pitch and commercial pitch of each group.",
      tech: "How it works", commercial: "Commercial", visit: "Visit site", soon: "Coming soon",
      members: "members",
      fTitle: "SENAI São Carlos", fText: "A reference center in technical and technological education, preparing professionals for the challenges of Industry 4.0.", fSlogan: "Shaping the future of technology",
      fClasses: "Classes 2026", fTeam: "Development Team", fDevs: "Developers:", techLead: "Tech Lead",
      rights: "National Service for Industrial Training", copyright: "All rights reserved", devBy: "Developed by",
      noProjects: "No projects registered yet.",
      soonMsg: "Link coming soon.",
      /* Modal & QR Code */
      details: "View details",
      close: "Close",
      qrToggle: "Project QR Code",
      qrToggleHide: "Hide QR Code",
      qrTitle: "Project QR Code",
      qrSub: "Scan with your phone to open directly to this project.",
      copyLink: "Copy link",
      linkCopied: "Link copied to clipboard!",
      downloadSvg: "Download QR Code (SVG)",
      downloadPng: "Download QR Code (PNG)",
      openNewTab: "Open in new tab",
      customBaseUrl: "⚙️ Configure GitHub Pages URL",
      save: "Save",
      reset: "Reset default",
      baseUrlSaved: "Base URL configured!",
      baseUrlReset: "Default base URL restored!",
      pageQrBtn: "SENAI Workshop 2026 QR Code",
      pageQrTitle: "SENAI Workshop 2026 QR Code",
      pageQrSub: "Point your phone camera to access the full event portal.",
      evalTitle: "Rate this group",
      evalApresentacao: "Presentation:",
      evalProjeto: "Idea & Technical Solution:",
      evalSaved: "Rating saved! ⭐",
      dashboard: "Rankings",
      dashboardTitle: "View ratings and rankings dashboard",
      dashboardHero: "🏆 View Live Rankings",
      dashboardFooter: "Rankings & Results",
      dashboardFooterDesc: "Track most voted projects and live total visits.",
      dashboardFooterBtn: "Open Dashboard",
      eventTitle: "Event Date & Location",
      eventSub: "Come check out the innovative projects and solutions developed by our students.",
      eventDateLabel: "Event Date",
      eventDateVal: "December 2 & 3, 2026",
      eventDateDays: "Wednesday & Thursday • Projects on Display",
      eventTimeLabel: "Hours",
      eventTimeVal: "8:00 AM to 5:00 PM",
      eventTimeSub: "Open to the public • Free admission",
      eventLocLabel: "Location",
      eventLocName: "SENAI College of Technology and School",
      eventLocUnit: "Antonio Adolpho Lobbe • São Carlos/SP",
      eventAddrLabel: "Address",
      eventAddrVal: "R. Cândido Padim, 25 - Vila Prado",
      eventAddrCity: "São Carlos - SP • Brazil",
      eventOpenMaps: "Open in Google Maps",
      eventMapTitle: "📍 Location Map",
      eventViewRoute: "Open in Google Maps ↗",
      eventHeroBadgeDate: "December 2 & 3",
      eventHeroBadgeTime: "8am – 5pm",
      eventHeroBadgeLoc: "SENAI São Carlos"
    }
  };

  /* ----- estado (tema / idioma) ----- */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function removeStore(k) { try { localStorage.removeItem(k); } catch (e) { return null; } }
  var lang = store("lang") || "pt";
  var theme = store("theme") || "dark";
  function applyTheme() { document.documentElement.setAttribute("data-theme", theme); }
  applyTheme();

  function T(k) { return (I18N[lang] && I18N[lang][k]) || k; }
  function tr(x) { return x && typeof x === "object" ? (x[lang] || x.pt || "") : (x || ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safeUrl(u) {
    u = String(u || "").trim();
    if (!u) return "";
    if (/^(javascript|vbscript):/i.test(u)) return "";
    return u;
  }

  /* Resolve caminhos de imagens locais (ex: 'img/turmas/ds.jpg') para funcionar tanto
     na Home (raiz) quanto dentro das páginas de turmas em 'html/' (../img/...) */
  function resolveImg(u) {
    u = safeUrl(u);
    if (!u) return "";
    if (/^(https?:|\/\/|data:)/i.test(u)) return u;

    var isCoursePage = document.body ? (document.body.getAttribute("data-page") !== "home") : false;

    if (isCoursePage) {
      if (u.indexOf("../") === 0) return u;
      if (u.indexOf("./") === 0) u = u.substring(2);
      if (u.indexOf("/") === 0) return u;
      return "../" + u;
    } else {
      if (u.indexOf("../") === 0) return u.replace(/^\.\.\//, "");
      return u;
    }
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function getProjectId(p, courseKey, index) {
    return String((p && p.id) || (p && slugify(p.nome)) || (courseKey + "-" + (index + 1)));
  }

  function getCustomBase() {
    return (store("custom_base_url") || S.baseUrl || "").trim().replace(/\/+$/, "");
  }

  function getProjectShareUrl(project, courseKey, index) {
    var pid = getProjectId(project, courseKey, index);
    var custom = getCustomBase();
    if (custom) {
      if (custom.indexOf(".html") !== -1) {
        return custom.split("#")[0].split("?")[0] + "#" + pid;
      }
      return custom + "/html/" + courseKey + ".html#" + pid;
    }
    var hrefClean = window.location.href.split("#")[0].split("?")[0];
    var page = document.body.getAttribute("data-page");
    if (page === "home") {
      var baseHref = hrefClean.replace(/index\.html$/i, "").replace(/\/+$/, "");
      return baseHref + "/html/" + courseKey + ".html#" + pid;
    }
    return hrefClean + "#" + pid;
  }

  function getHomePageShareUrl() {
    var custom = getCustomBase();
    if (custom) {
      if (custom.indexOf(".html") !== -1) {
        return custom.replace(/\/html\/[a-z0-9_-]+\.html/i, "/index.html").split("#")[0].split("?")[0];
      }
      return custom.replace(/\/+$/, "") + "/";
    }
    var hrefClean = window.location.href.split("#")[0].split("?")[0];
    var page = document.body.getAttribute("data-page");
    if (page !== "home") {
      return hrefClean.replace(/\/html\/[a-z0-9_-]+\.html/i, "/index.html");
    }
    return hrefClean;
  }

  function findProject(courseKey, idOrSlug) {
    if (!S.cursos[courseKey] || !S.cursos[courseKey].projetos) return null;
    var list = S.cursos[courseKey].projetos;
    var target = String(idOrSlug || "").trim().toLowerCase();
    if (!target) return null;

    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      var pid = getProjectId(p, courseKey, i).toLowerCase();
      var pslug = slugify(p.nome);
      var idxStr = String(i);
      var projIdx = "proj-" + i;
      if (pid === target || pslug === target || idxStr === target || projIdx === target) {
        return { project: p, index: i, courseKey: courseKey };
      }
    }
    return null;
  }

  function findProjectAnyCourse(idOrSlug) {
    var keys = Object.keys(S.cursos);
    for (var i = 0; i < keys.length; i++) {
      var res = findProject(keys[i], idOrSlug);
      if (res) return res;
    }
    return null;
  }

  var cursos = Object.keys(S.cursos).map(function (k) { return S.cursos[k]; });
  function totalProj(c) { return c.projetos.length; }
  function totalAlunos(c) { return c.projetos.reduce(function (a, p) { return a + (Number(p.alunos) || 0); }, 0); }
  function fmt(n) { return n > 0 ? n : "—"; }

  /* ----- header ----- */
  function headerHTML(isCourse) {
    var home = isCourse ? "../index.html" : "index.html";
    var dashUrl = isCourse ? "../dashboard.html" : "dashboard.html";
    return '<header class="header"><div class="container">' +
      (isCourse
        ? '<a class="btn-ghost back" href="' + home + '">' + T("back") + '</a>'
        : '<a class="logo" href="' + home + '">SEN<span>AI</span></a>') +
      '<div class="header-actions">' +
      '<a class="btn-ghost header-dash-btn" href="' + dashUrl + '" title="' + esc(T("dashboardTitle")) + '">📊 ' + T("dashboard") + '</a>' +
      '<button class="btn-ghost" id="themeBtn">' + T("theme") + ' ' + (theme === "dark" ? "☀" : "☾") + '</button>' +
      '<button class="btn-ghost btn-lang" id="langBtn" title="' + (lang === "pt" ? "Alterar idioma: Português / English" : "Switch language: Portuguese / English") + '" aria-label="' + (lang === "pt" ? "Idioma: Português selecionado" : "Language: English selected") + '">' +
      '<span class="lang-icon">🌐</span>' +
      '<span class="lang-badges">' +
      '<span class="lang-badge' + (lang === "pt" ? ' active' : '') + '" id="lang-badge-pt">PT</span>' +
      '<span class="lang-divider">|</span>' +
      '<span class="lang-badge' + (lang === "en" ? ' active' : '') + '" id="lang-badge-en">EN</span>' +
      '</span>' +
      '</button>' +
      '</div></div></header>';
  }

  /* ----- footer ----- */
  function personHTML(p, role) {
    var links = "";
    if (safeUrl(p.instagram)) links += '<a href="' + esc(safeUrl(p.instagram)) + '" target="_blank" rel="noopener">Instagram</a>';
    if (safeUrl(p.github)) links += '<a href="' + esc(safeUrl(p.github)) + '" target="_blank" rel="noopener">GitHub</a>';
    return '<div class="person"><b>' + esc(p.nome) + '</b>' + (role ? '<small>' + role + '</small><br>' : '') + links + '</div>';
  }
  function footerHTML(isCourse) {
    if (isCourse === undefined) {
      isCourse = document.body ? (document.body.getAttribute("data-page") !== "home") : false;
    }
    var dashUrl = isCourse ? "../dashboard.html" : "dashboard.html";
    var eq = S.equipe || {};
    var team = "";
    if (eq.lider && eq.lider.nome) team += personHTML(eq.lider, T("techLead"));
    if (eq.devs && eq.devs.length) {
      if (eq.lider && eq.lider.nome) {
        team += '<p style="margin:12px 0 8px">' + T("fDevs") + '</p>';
      }
      team += eq.devs.map(function (d) { return personHTML(d); }).join("");
    }

    var devCredits = "";
    if (eq.lider && eq.lider.nome) {
      devCredits = esc(eq.lider.nome);
    } else if (eq.devs && eq.devs.length) {
      var devNames = eq.devs.filter(function (d) { return d && d.nome; }).map(function (d) { return esc(d.nome); });
      if (devNames.length === 1) devCredits = devNames[0];
      else if (devNames.length === 2) devCredits = devNames[0] + " e " + devNames[1];
      else if (devNames.length > 2) devCredits = devNames.slice(0, -1).join(", ") + " e " + devNames[devNames.length - 1];
    }

    return '<footer class="footer"><div class="container"><div class="footer-grid">' +
      '<div><h4>' + T("fTitle") + '</h4><p>' + T("fText") + '</p><strong class="tf">' + T("fSlogan") + '</strong></div>' +
      '<div><h4>' + T("fClasses") + '</h4><ul>' + cursos.map(function (c) { return '<li>' + esc(tr(c.nome)) + ' — ' + esc(tr(c.turma)) + '</li>'; }).join("") + '</ul></div>' +
      (team ? '<div><h4>' + T("fTeam") + '</h4>' + team + '</div>' : '') +
      '<div><h4>' + T("dashboardFooter") + '</h4><p>' + T("dashboardFooterDesc") + '</p><a class="footer-dash-link" href="' + dashUrl + '">📊 ' + T("dashboardFooterBtn") + ' →</a></div>' +
      '</div><div class="copy"><strong>SENAI São Carlos</strong> - ' + T("rights") + '<br>© ' + S.ano + ' ' + T("copyright") +
      (devCredits ? '<br>' + T("devBy") + ' ' + devCredits : '') + '</div></div></footer>';
  }

  /* ----- HOME ----- */
  function renderHome(root) {
    var np = 0, na = 0;
    cursos.forEach(function (c) { np += totalProj(c); na += totalAlunos(c); });
    var cards = Object.keys(S.cursos).map(function (k) {
      var c = S.cursos[k];
      var sigla = k === "ds" ? "DS" : "MEC";
      return '<article class="class-card reveal">' +
        '<div class="class-img"><img src="' + esc(resolveImg(c.imagem)) + '" alt="' + esc(tr(c.nome)) + '" loading="lazy"><span class="badge">' + sigla + '</span></div>' +
        '<div class="class-body"><h3>' + esc(tr(c.nome)) + ' · ' + esc(tr(c.turma)) + '</h3><p>' + esc(tr(c.descricao)) + '</p>' +
        '<div class="stats-row"><div><b>' + totalProj(c) + '</b><span>' + T("projects") + '</span></div><div><b>' + fmt(totalAlunos(c)) + '</b><span>' + T("students") + '</span></div></div>' +
        '<a class="btn" href="' + esc(c.pagina) + '">' + T("seeProjects") + '</a></div></article>';
    }).join("");

    root.innerHTML = headerHTML(false) +
      '<section class="hero"><div class="container"><span class="eyebrow">' + T("eyebrow") + '</span>' +
      '<h1>' + T("heroTitle") + '</h1>' +
      '<div class="hero-event-pill">' +
        '<span class="hero-pill-icon">📅</span> <strong>' + T("eventHeroBadgeDate") + '</strong>' +
        '<span class="hero-pill-sep">•</span>' +
        '<span class="hero-pill-icon">⏰</span> <strong>' + T("eventHeroBadgeTime") + '</strong>' +
        '<span class="hero-pill-sep">•</span>' +
        '<span class="hero-pill-icon">📍</span> <a href="#local">' + T("eventHeroBadgeLoc") + '</a>' +
      '</div>' +
      '<p class="sub hero-sub-row">' +
        '<span>' + T("heroSub") + '</span>' +
        '<button class="hero-qr-btn" id="heroQrBtn" type="button" title="' + esc(T("pageQrBtn")) + '" aria-label="' + esc(T("pageQrBtn")) + '">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/>' +
            '<path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/>' +
            '<path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>' +
          '</svg>' +
        '</button>' +
      '</p>' +
      '<div class="hero-cta">' +
        '<a class="btn" href="#turmas">' + T("seeClasses") + '</a>' +
        '<a class="hero-dash-btn" href="dashboard.html" title="' + esc(T("dashboardTitle")) + '">' + T("dashboardHero") + '</a>' +
      '</div></div></section>' +
      '<section class="section" id="turmas"><div class="container"><h2 class="section-title">' + T("classesTitle") + '</h2><p class="section-sub">' + T("classesSub") + '</p><div class="class-grid">' + cards + '</div></div></section>' +
      '<section class="section about"><div class="container"><h2 class="section-title">' + T("aboutTitle") + '</h2><br><p class="about-text">' + T("aboutText") + '</p>' +
      '<div class="stat-grid">' +
      '<div class="stat reveal"><b>' + np + '</b><span>' + T("statProjects") + '</span></div>' +
      '<div class="stat reveal"><b>' + fmt(na) + '</b><span>' + T("statStudents") + '</span></div>' +
      '<div class="stat reveal"><b>' + cursos.length + '</b><span>' + T("statCourses") + '</span></div>' +
      '<div class="stat reveal"><b>100%</b><span>' + T("statDedication") + '</span></div></div></div></section>' +
      '<section class="section event-location" id="local"><div class="container">' +
      '<h2 class="section-title">' + T("eventTitle") + '</h2>' +
      '<p class="section-sub">' + T("eventSub") + '</p>' +
      '<div class="event-grid">' +
        '<div class="event-card reveal">' +
          '<div class="event-info-item">' +
            '<div class="event-icon-box">📅</div>' +
            '<div>' +
              '<h3>' + T("eventDateLabel") + '</h3>' +
              '<p><strong>' + T("eventDateVal") + '</strong></p>' +
              '<span class="event-subtext">' + T("eventDateDays") + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="event-info-item">' +
            '<div class="event-icon-box">⏰</div>' +
            '<div>' +
              '<h3>' + T("eventTimeLabel") + '</h3>' +
              '<p><strong>' + T("eventTimeVal") + '</strong></p>' +
              '<span class="event-subtext">' + T("eventTimeSub") + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="event-info-item">' +
            '<div class="event-icon-box">📍</div>' +
            '<div>' +
              '<h3>' + T("eventLocLabel") + '</h3>' +
              '<p><strong>' + T("eventLocName") + '</strong></p>' +
              '<span class="event-subtext">' + T("eventLocUnit") + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="event-info-item">' +
            '<div class="event-icon-box">🗺️</div>' +
            '<div>' +
              '<h3>' + T("eventAddrLabel") + '</h3>' +
              '<p>' + T("eventAddrVal") + '</p>' +
              '<span class="event-subtext">' + T("eventAddrCity") + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="event-actions">' +
            '<a class="btn event-map-btn" href="https://maps.app.goo.gl/ERURVEKNRXTKch5o6" target="_blank" rel="noopener">' +
              '<span>🗺️ ' + T("eventOpenMaps") + '</span>' +
              '<span class="go">↗</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div class="map-card reveal">' +
          '<div class="map-header">' +
            '<span class="map-title">' + T("eventMapTitle") + '</span>' +
            '<a href="https://maps.app.goo.gl/ERURVEKNRXTKch5o6" target="_blank" rel="noopener" class="map-external-link">' + T("eventViewRoute") + '</a>' +
          '</div>' +
          '<div class="map-frame-wrapper">' +
            '<iframe src="https://maps.google.com/maps?q=-22.0234009,-47.8972138&amp;hl=pt-BR&amp;z=16&amp;output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + esc(T("eventLocName")) + '"></iframe>' +
          '</div>' +
        '</div>' +
      '</div></div></section>' +
      footerHTML(false);

    var heroQrBtn = document.getElementById("heroQrBtn");
    if (heroQrBtn) {
      heroQrBtn.onclick = function () {
        openPageQrModal();
      };
    }

    if (window.Leads) window.Leads.trackPageView("home");
  }

  function act(url, label, primary) {
    var u = safeUrl(url);
    return u
      ? '<a class="act' + (primary ? " primary" : "") + '" href="' + esc(u) + '" target="_blank" rel="noopener">' + label + '</a>'
      : '<a class="act' + (primary ? " primary" : "") + '" href="#" data-empty="1">' + label + '</a>';
  }

  /* ----- PÁGINA DE CURSO ----- */
  var timer = null, current = 0;
  function renderCourse(root, key) {
    var c = S.cursos[key];
    var P = c.projetos;
    document.title = "SENAI - " + tr(c.nome) + " " + S.ano;

    var chips = P.map(function (p, i) { return '<button class="chip' + (i === 0 ? " active" : "") + '" data-go="' + i + '">' + esc(p.nome) + '</button>'; }).join("");

    var slides = P.map(function (p, i) {
      var img = resolveImg(p.imagem || c.imagem);
      var has = !!img;
      return '<article class="slide' + (i === 0 ? " active" : "") + (has ? "" : " noimg") + '">' +
        '<div class="slide-bg"' + (has ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '></div>' +
        '<div class="slide-content"><span class="tag">' + esc(p.nome) + '</span>' +
        '<h1><a class="slide-link" ' + (safeUrl(p.landing) ? 'href="' + esc(safeUrl(p.landing)) + '" target="_blank" rel="noopener"' : 'href="#" data-empty="1"') + '>' + esc(p.nome) + ' <span class="go">↗</span></a></h1>' +
        '<h2>' + esc(p.subtitulo) + '</h2></div></article>';
    }).join("");

    var dots = P.map(function (_, i) { return '<button class="dot' + (i === 0 ? " active" : "") + '" data-go="' + i + '" aria-label="Projeto ' + (i + 1) + '"></button>'; }).join("");

    var cards = P.map(function (p, i) {
      var pid = getProjectId(p, key, i);
      var u = resolveImg(p.imagem);
      return '<article class="project-card reveal" id="proj-' + i + '" data-proj-id="' + esc(pid) + '" data-proj-idx="' + i + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="' + esc(p.nome) + '">' +
        '<div class="project-img">' + (u ? '<img src="' + esc(u) + '" alt="' + esc(p.nome) + '" loading="lazy">' : '<span class="ph">' + esc((p.nome || "?").charAt(0)) + '</span>') + '</div>' +
        '<div class="project-body">' +
          '<div class="pheader"><span class="pname">' + esc(p.nome) + '</span><span class="card-hint">' + T("details") + ' ↗</span></div>' +
          '<h3>' + esc(p.subtitulo) + '</h3>' +
          '<p>' + esc(p.descricao) + '</p>' +
          (Number(p.alunos) > 0 ? '<span class="meta">' + p.alunos + ' ' + T("members") + '</span>' : '') +
          '<div class="actions">' + act(p.funcionamento, T("tech")) + act(p.comercial, T("commercial")) + act(p.landing, T("visit"), true) + '</div>' +
        '</div>' +
      '</article>';
    }).join("");

    root.innerHTML = headerHTML(true) +
      '<nav class="project-nav"><div class="container">' + chips + '</div></nav>' +
      '<section class="carousel" id="carousel">' + slides +
      '<button class="arrow prev" aria-label="Anterior">‹</button><button class="arrow next" aria-label="Próximo">›</button>' +
      '<div class="dots">' + dots + '</div><a class="scroll-down" href="#projetos" aria-label="Descer">↓</a></section>' +
      '<section class="section" id="projetos"><div class="container"><h2 class="section-title">' + T("ourProjects") + '</h2><p class="section-sub">' + T("ourProjectsSub") + '</p>' +
      (P.length ? '<div class="project-grid" id="projectGrid">' + cards + '</div>' : '<p class="section-sub">' + T("noProjects") + '</p>') + '</div></section>' +
      footerHTML(true);

    initCarousel(P.length);
    initCardClicks(key, P);

    // Rastreia cliques no slide link do carrossel
    document.querySelectorAll(".slide-link").forEach(function (el) {
      el.addEventListener("click", function () {
        var pIdx = current;
        if (P[pIdx] && window.Leads) {
          window.Leads.trackProjectAction(P[pIdx], key, "visitar_site", { url: P[pIdx].landing });
        }
      });
    });

    if (window.Leads) window.Leads.trackCourseView(key, tr(c.nome));
  }

  function go(i, n) {
    var slides = document.querySelectorAll(".slide"), dots = document.querySelectorAll(".dot"), chips = document.querySelectorAll(".chip");
    current = (i + n) % n;
    [slides, dots, chips].forEach(function (list) {
      list.forEach(function (el, idx) { el.classList.toggle("active", idx === current); });
    });
    var chip = chips[current];
    if (chip && chip.scrollIntoView) chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  function initCarousel(n) {
    if (!n) return;
    current = 0;
    var car = document.getElementById("carousel");
    var AUTOPLAY_MS = 5000;
    function restart() { clearInterval(timer); timer = setInterval(function () { go(current + 1, n); }, AUTOPLAY_MS); }
    restart();
    car.querySelector(".prev").onclick = function () { go(current - 1 + n, n); restart(); };
    car.querySelector(".next").onclick = function () { go(current + 1, n); restart(); };
    document.querySelectorAll("[data-go]").forEach(function (b) {
      b.onclick = function () {
        var i = Number(b.getAttribute("data-go"));
        go(i, n); restart();
        if (b.classList.contains("chip")) {
          var card = document.getElementById("proj-" + i);
          if (card) { card.scrollIntoView({ behavior: "smooth", block: "center" }); card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash"); }
        }
      };
    });
    var x0 = null;
    car.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1) + n, n); restart(); }
      x0 = null;
    }, { passive: true });
    document.onkeydown = function (e) {
      // Don't navigate carousel if modal is currently open
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "ArrowLeft") { go(current - 1 + n, n); restart(); }
      if (e.key === "ArrowRight") { go(current + 1, n); restart(); }
    };
  }

  /* ----- MODAL DO PROJETO & QR CODE ----- */
  var activeModalProject = null;

  function ensureModal() {
    var m = document.getElementById("projectModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "projectModal";
      m.className = "modal-backdrop";
      m.setAttribute("aria-hidden", "true");
      m.innerHTML = '<div class="modal-dialog" role="dialog" aria-modal="true" id="modalDialog"></div>';
      document.body.appendChild(m);

      m.addEventListener("click", function (e) {
        if (e.target === m) closeModal(true);
      });
    }
    return m;
  }

  function closeModal(clearHash) {
    var m = document.getElementById("projectModal");
    if (!m || !m.classList.contains("is-open")) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeModalProject = null;

    if (clearHash !== false) {
      try {
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      } catch (err) {
        window.location.hash = "";
      }
    }
  }

  function downloadFile(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function copyText(str, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(function () {
        showToast(msg || T("linkCopied"));
      }).catch(function () {
        fallbackCopy(str, msg);
      });
    } else {
      fallbackCopy(str, msg);
    }
  }

  function fallbackCopy(str, msg) {
    var inp = document.createElement("textarea");
    inp.value = str;
    inp.style.position = "fixed";
    inp.style.opacity = "0";
    document.body.appendChild(inp);
    inp.focus();
    inp.select();
    try {
      document.execCommand("copy");
      showToast(msg || T("linkCopied"));
    } catch (e) {
      showToast("Erro ao copiar.");
    }
    document.body.removeChild(inp);
  }

  /* ----- AVALIAÇÃO DO PROJETO (ESTRELAS) ----- */
  function getProjectRatings(pid) {
    try {
      var all = JSON.parse(localStorage.getItem("senai_ratings") || "{}");
      return all[pid] || { apresentacao: 0, projeto: 0 };
    } catch (e) {
      return { apresentacao: 0, projeto: 0 };
    }
  }

  function saveProjectRating(pid, criterion, value) {
    try {
      var all = JSON.parse(localStorage.getItem("senai_ratings") || "{}");
      if (!all[pid]) all[pid] = { apresentacao: 0, projeto: 0 };
      all[pid][criterion] = Number(value) || 0;
      all[pid].updatedAt = new Date().toISOString();
      localStorage.setItem("senai_ratings", JSON.stringify(all));
      return all[pid];
    } catch (e) {
      return { apresentacao: 0, projeto: 0 };
    }
  }

  function markProjectRatingSubmitted(pid) {
    try {
      var all = JSON.parse(localStorage.getItem("senai_ratings") || "{}");
      if (!all[pid]) all[pid] = { apresentacao: 0, projeto: 0 };
      all[pid].submitted = true;
      localStorage.setItem("senai_ratings", JSON.stringify(all));
      return all[pid];
    } catch (e) {
      return { apresentacao: 0, projeto: 0, submitted: true };
    }
  }

  function renderStarsHTML(criterion, score) {
    var stars = "";
    for (var i = 1; i <= 5; i++) {
      var active = Boolean(score && i <= score);
      var activeClass = active ? " is-active" : "";
      var inlineStyle = active ? ' style="color:#ffb703;text-shadow:0 0 10px rgba(255,183,3,0.7)"' : '';
      stars += '<button class="star-btn' + activeClass + '"' + inlineStyle + ' data-crit="' + criterion + '" data-val="' + i + '" type="button" aria-label="' + i + ' estrelas">★</button>';
    }
    return '<div class="eval-stars" data-crit="' + criterion + '">' + stars + '</div>';
  }

  /* ----- EFEITO VISUAL: FOGOS DE ARTIFÍCIO (2 SEGUNDOS) ----- */
  var fireworksTimer = null;
  var fireworksAnimId = null;

  function triggerFireworks() {
    var existing = document.getElementById("senaiFireworksCanvas");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
      if (fireworksAnimId) cancelAnimationFrame(fireworksAnimId);
      clearTimeout(fireworksTimer);
    }

    var canvas = document.createElement("canvas");
    canvas.id = "senaiFireworksCanvas";
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    canvas.style.transition = "opacity 0.4s ease-out";
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var realW = window.innerWidth;
    var realH = window.innerHeight;
    canvas.width = realW * dpr;
    canvas.height = realH * dpr;
    ctx.scale(dpr, dpr);

    var particles = [];
    var colors = [
      "#ffb703", "#fbbf24", "#e4002b", "#ff3b57",
      "#00f0ff", "#10b981", "#a855f7", "#ffffff", "#38bdf8"
    ];

    function createBurst(cx, cy, count) {
      count = count || 45;
      for (var i = 0; i < count; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 8 + 2;
        var color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 2,
          color: color,
          alpha: 1,
          decay: Math.random() * 0.016 + 0.016,
          gravity: 0.12
        });
      }
    }

    // Explosões comemorativas espalhadas pela tela
    createBurst(realW * 0.5, realH * 0.35, 60);
    createBurst(realW * 0.25, realH * 0.42, 45);
    createBurst(realW * 0.75, realH * 0.38, 45);

    setTimeout(function () {
      createBurst(realW * 0.38, realH * 0.25, 45);
      createBurst(realW * 0.62, realH * 0.28, 45);
      createBurst(realW * 0.85, realH * 0.5, 35);
      createBurst(realW * 0.15, realH * 0.5, 35);
    }, 250);

    var startTime = Date.now();
    var duration = 2000; // Exatamente 2 segundos

    function loop() {
      var elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        fireworksAnimId = null;
        return;
      }

      ctx.clearRect(0, 0, realW, realH);

      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      fireworksAnimId = requestAnimationFrame(loop);
    }

    loop();

    setTimeout(function () {
      canvas.style.opacity = "0";
    }, 1600);

    fireworksTimer = setTimeout(function () {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      if (fireworksAnimId) cancelAnimationFrame(fireworksAnimId);
    }, 2000);
  }

  function initRatingHandlers(p, courseKey, pid) {
    var evalBar = document.getElementById("modalEvalBar");
    if (!evalBar) return;
    var current = getProjectRatings(pid);

    function updateStarsUI(criterion, score) {
      var group = evalBar.querySelector('.eval-stars[data-crit="' + criterion + '"]');
      if (!group) return;
      var btns = group.querySelectorAll(".star-btn");
      btns.forEach(function (btn) {
        var val = Number(btn.getAttribute("data-val"));
        var active = val <= score;
        btn.classList.toggle("is-active", active);
        if (active) {
          btn.style.color = "#ffb703";
          btn.style.textShadow = "0 0 10px rgba(255, 183, 3, 0.7)";
        } else {
          btn.style.color = "";
          btn.style.textShadow = "";
        }
      });
    }

    evalBar.querySelectorAll(".star-btn").forEach(function (btn) {
      var crit = btn.getAttribute("data-crit");
      var val = Number(btn.getAttribute("data-val"));

      btn.addEventListener("mouseenter", function () {
        updateStarsUI(crit, val);
      });

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var updated = saveProjectRating(pid, crit, val);
        current = updated;
        updateStarsUI(crit, val);

        btn.style.transform = "scale(1.35)";
        setTimeout(function () { btn.style.transform = ""; }, 180);

        // Opção 1: Só envia e só solta os fogos quando AMBOS os critérios estiverem avaliados (> 0)
        var hasApresentacao = Number(updated.apresentacao) > 0;
        var hasProjeto = Number(updated.projeto) > 0;

        if (hasApresentacao && hasProjeto && !updated.submitted) {
          markProjectRatingSubmitted(pid);
          updated.submitted = true;

          // Dispara efeito visual de fogos de artifício na página toda (dura 2 segundos)
          triggerFireworks();

          if (window.Leads && typeof window.Leads.submitEvaluation === "function") {
            window.Leads.submitEvaluation(p, courseKey, updated);
          }
        }
      });
    });

    evalBar.querySelectorAll(".eval-stars").forEach(function (group) {
      var crit = group.getAttribute("data-crit");
      group.addEventListener("mouseleave", function () {
        updateStarsUI(crit, current[crit] || 0);
      });
    });
  }

  function openModal(p, courseKey, index, updateUrl) {
    if (!p) return;
    var c = S.cursos[courseKey];
    var pid = getProjectId(p, courseKey, index);
    var shareUrl = getProjectShareUrl(p, courseKey, index);
    var customBase = getCustomBase();
    var courseBadge = courseKey === "ds" ? "DS" : "MEC";
    var img = resolveImg(p.imagem);
    var currentRatings = getProjectRatings(pid);

    var m = ensureModal();
    var dialog = document.getElementById("modalDialog");
    dialog.className = "modal-dialog";
    activeModalProject = { project: p, courseKey: courseKey, index: index };

    var qrSvg = "";
    if (window.QRCode && typeof window.QRCode.generateSVG === "function") {
      qrSvg = window.QRCode.generateSVG(shareUrl, { size: 160, margin: 2 });
    }

    dialog.innerHTML =
      '<button class="modal-close" id="modalCloseBtn" aria-label="' + esc(T("close")) + '">&times;</button>' +
      '<div class="modal-cover">' +
        (img
          ? '<img src="' + esc(img) + '" alt="' + esc(p.nome) + '">'
          : '<span class="ph">' + esc((p.nome || "?").charAt(0)) + '</span>') +
      '</div>' +
      '<div class="modal-scroll">' +
        '<div class="modal-meta-row">' +
          '<span class="modal-badge">' + courseBadge + ' · ' + esc(tr(c.turma)) + '</span>' +
          '<span class="pname">' + esc(p.nome) + '</span>' +
          (Number(p.alunos) > 0 ? '<span class="meta">' + p.alunos + ' ' + T("members") + '</span>' : '') +
          '<button class="btn-qr-toggle" id="modalQrToggleBtn" aria-expanded="false" title="' + esc(T("qrToggle")) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
            '<span id="modalQrToggleText">' + esc(T("qrToggle")) + '</span>' +
          '</button>' +
        '</div>' +
        '<h2 class="modal-title">' + esc(p.nome) + '</h2>' +
        '<h3 class="modal-sub">' + esc(p.subtitulo) + '</h3>' +
        '<p class="modal-desc">' + esc(p.descricao) + '</p>' +
        '<div class="modal-actions actions" id="modalActions">' +
          act(p.funcionamento, T("tech")) +
          act(p.comercial, T("commercial")) +
          act(p.landing, T("visit"), true) +
        '</div>' +
        '<div class="modal-eval-bar" id="modalEvalBar">' +
          '<div class="eval-title">' +
            '<span>' + T("evalTitle") + '</span>' +
          '</div>' +
          '<span class="eval-divider">-</span>' +
          '<div class="eval-item">' +
            '<span class="eval-label">' + T("evalApresentacao") + '</span>' +
            renderStarsHTML("apresentacao", currentRatings.apresentacao) +
          '</div>' +
          '<span class="eval-divider">-</span>' +
          '<div class="eval-item">' +
            '<span class="eval-label">' + T("evalProjeto") + '</span>' +
            renderStarsHTML("projeto", currentRatings.projeto) +
          '</div>' +
        '</div>' +
        '<div class="modal-share" id="modalShareBox">' +
          '<div class="modal-share-top">' +
            '<div class="modal-share-title">' +
              '<span>' + T("qrTitle") + '</span>' +
              '<span class="modal-share-badge">#' + esc(pid) + '</span>' +
            '</div>' +
            '<span class="modal-share-sub">' + T("qrSub") + '</span>' +
          '</div>' +
          '<div class="modal-share-grid">' +
            '<div class="modal-qr-frame" id="modalQrFrame">' + qrSvg + '</div>' +
            '<div class="modal-share-info">' +
              '<div class="modal-url-box">' +
                '<input type="text" class="modal-url-input" id="modalUrlInput" value="' + esc(shareUrl) + '" readonly>' +
                '<button class="modal-btn-copy" id="modalCopyBtn">' + T("copyLink") + '</button>' +
              '</div>' +
              '<div class="modal-share-buttons">' +
                '<button class="btn-share-sec" id="modalDownloadSvgBtn">📥 ' + T("downloadSvg") + '</button>' +
                '<button class="btn-share-sec" id="modalDownloadPngBtn">🖼️ ' + T("downloadPng") + '</button>' +
                '<a class="btn-share-sec" href="' + esc(shareUrl) + '" target="_blank" rel="noopener">↗ ' + T("openNewTab") + '</a>' +
              '</div>' +
              '<button class="modal-base-url-toggle" id="modalBaseUrlToggle">' + T("customBaseUrl") + '</button>' +
              '<div class="modal-base-url-box" id="modalBaseUrlBox">' +
                '<label>URL base no GitHub Pages (ex: https://usuario.github.io/senai-workshop-2026):</label>' +
                '<div class="modal-base-url-row">' +
                  '<input type="text" class="modal-base-url-input" id="modalBaseUrlInput" placeholder="https://seu-usuario.github.io/senai-workshop-2026" value="' + esc(customBase) + '">' +
                  '<button class="modal-base-url-save" id="modalBaseUrlSave">' + T("save") + '</button>' +
                  '<button class="btn-share-sec" id="modalBaseUrlReset" style="padding:4px 8px;font-size:.75rem">' + T("reset") + '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Handlers inside modal
    document.getElementById("modalCloseBtn").onclick = function () { closeModal(true); };
    initRatingHandlers(p, courseKey, pid);

    var qrToggleBtn = document.getElementById("modalQrToggleBtn");
    var shareBox = document.getElementById("modalShareBox");
    var qrToggleText = document.getElementById("modalQrToggleText");

    if (qrToggleBtn && shareBox) {
      qrToggleBtn.onclick = function () {
        var isOpen = shareBox.classList.toggle("is-open");
        qrToggleBtn.classList.toggle("is-active", isOpen);
        qrToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (qrToggleText) qrToggleText.textContent = isOpen ? T("qrToggleHide") : T("qrToggle");
        if (isOpen) {
          if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "abriu_qr_code");
          shareBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      };
    }

    // Rastreia cliques nos botões de ação do modal
    var modalActions = document.getElementById("modalActions");
    if (modalActions) {
      modalActions.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a) return;
        var label = (a.textContent || "").trim().toLowerCase();
        var actType = "visitar_site";
        var actUrl = p.landing;
        if (label.indexOf("funcionamento") !== -1 || label.indexOf("how it works") !== -1) {
          actType = "funcionamento";
          actUrl = p.funcionamento;
        } else if (label.indexOf("comercial") !== -1) {
          actType = "comercial";
          actUrl = p.comercial;
        }
        if (window.Leads) window.Leads.trackProjectAction(p, courseKey, actType, { url: actUrl });
      });
    }

    var copyBtn = document.getElementById("modalCopyBtn");
    copyBtn.onclick = function () {
      var currentUrl = document.getElementById("modalUrlInput").value;
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "copiou_link_qr");
      copyText(currentUrl, T("linkCopied"));
    };

    var inputUrl = document.getElementById("modalUrlInput");
    inputUrl.onclick = function () { inputUrl.select(); };

    document.getElementById("modalDownloadSvgBtn").onclick = function () {
      var currentUrl = document.getElementById("modalUrlInput").value;
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "baixou_qr_svg");
      if (!window.QRCode) return;
      var svgCode = window.QRCode.generateSVG(currentUrl, { size: 360, margin: 3 });
      var blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
      downloadFile(blob, "qrcode-" + pid + ".svg");
    };

    document.getElementById("modalDownloadPngBtn").onclick = function () {
      var currentUrl = document.getElementById("modalUrlInput").value;
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "baixou_qr_png");
      if (!window.QRCode) return;
      var canvas = document.createElement("canvas");
      window.QRCode.drawCanvas(canvas, currentUrl, { size: 600, margin: 4 });
      canvas.toBlob(function (blob) {
        if (blob) downloadFile(blob, "qrcode-" + pid + ".png");
      });
    };

    // Base URL toggle & save
    var toggleBtn = document.getElementById("modalBaseUrlToggle");
    var baseBox = document.getElementById("modalBaseUrlBox");
    toggleBtn.onclick = function () { baseBox.classList.toggle("is-open"); };

    document.getElementById("modalBaseUrlSave").onclick = function () {
      var v = document.getElementById("modalBaseUrlInput").value.trim().replace(/\/+$/, "");
      if (v) {
        store("custom_base_url", v);
        showToast(T("baseUrlSaved"));
      } else {
        removeStore("custom_base_url");
        showToast(T("baseUrlReset"));
      }
      openModal(p, courseKey, index, false);
    };

    document.getElementById("modalBaseUrlReset").onclick = function () {
      removeStore("custom_base_url");
      showToast(T("baseUrlReset"));
      openModal(p, courseKey, index, false);
    };

    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (updateUrl !== false) {
      try {
        history.replaceState(null, "", "#" + pid);
      } catch (err) {
        window.location.hash = pid;
      }
    }

    // Scroll card into view in background
    var cardEl = document.getElementById("proj-" + index);
    if (cardEl && cardEl.scrollIntoView) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function openPageQrModal() {
    var homeUrl = getHomePageShareUrl();
    var customBase = getCustomBase();
    var m = ensureModal();
    var dialog = document.getElementById("modalDialog");
    dialog.className = "modal-dialog modal-dialog-page-qr";
    activeModalProject = null;

    var qrSvg = "";
    if (window.QRCode && typeof window.QRCode.generateSVG === "function") {
      qrSvg = window.QRCode.generateSVG(homeUrl, { size: 520, margin: 2 });
    }

    dialog.innerHTML =
      '<button class="modal-close" id="modalCloseBtn" aria-label="' + esc(T("close")) + '">&times;</button>' +
      '<div class="page-qr-dialog-body">' +
        '<div class="page-qr-header">' +
          '<span class="modal-badge">SENAI SÃO CARLOS · 2026</span>' +
          '<h2 class="page-qr-title">' + esc(T("pageQrTitle")) + '</h2>' +
          '<p class="page-qr-sub">' + esc(T("pageQrSub")) + '</p>' +
        '</div>' +
        '<div class="page-qr-frame" id="pageQrFrame">' + qrSvg + '</div>' +
        '<div class="modal-url-box page-qr-url-box">' +
          '<input type="text" class="modal-url-input" id="pageQrUrlInput" value="' + esc(homeUrl) + '" readonly>' +
          '<button class="modal-btn-copy" id="pageQrCopyBtn">' + T("copyLink") + '</button>' +
        '</div>' +
        '<div class="modal-share-buttons" style="justify-content:center">' +
          '<button class="btn-share-sec" id="pageQrDownloadSvgBtn">📥 ' + T("downloadSvg") + '</button>' +
          '<button class="btn-share-sec" id="pageQrDownloadPngBtn">🖼️ ' + T("downloadPng") + '</button>' +
          '<a class="btn-share-sec" href="' + esc(homeUrl) + '" target="_blank" rel="noopener">↗ ' + T("openNewTab") + '</a>' +
        '</div>' +
        '<button class="modal-base-url-toggle" id="pageQrBaseUrlToggle">' + T("customBaseUrl") + '</button>' +
        '<div class="modal-base-url-box" id="pageQrBaseUrlBox">' +
          '<label>URL base no GitHub Pages (ex: https://usuario.github.io/senai-workshop-2026):</label>' +
          '<div class="modal-base-url-row">' +
            '<input type="text" class="modal-base-url-input" id="pageQrBaseUrlInput" placeholder="https://seu-usuario.github.io/senai-workshop-2026" value="' + esc(customBase) + '">' +
            '<button class="modal-base-url-save" id="pageQrBaseUrlSave">' + T("save") + '</button>' +
            '<button class="btn-share-sec" id="pageQrBaseUrlReset" style="padding:4px 8px;font-size:.75rem">' + T("reset") + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById("modalCloseBtn").onclick = function () { closeModal(false); };

    var copyBtn = document.getElementById("pageQrCopyBtn");
    copyBtn.onclick = function () {
      var currentUrl = document.getElementById("pageQrUrlInput").value;
      if (window.Leads) {
        window.Leads.sendLead({
          tipo: "Lead QR Code",
          pagina: "home",
          turma: "Geral",
          acao: "Copiou Link da Página Inicial",
          mensagem: "URL: " + currentUrl
        });
      }
      copyText(currentUrl, T("linkCopied"));
    };

    var inputUrl = document.getElementById("pageQrUrlInput");
    inputUrl.onclick = function () { inputUrl.select(); };

    document.getElementById("pageQrDownloadSvgBtn").onclick = function () {
      var currentUrl = document.getElementById("pageQrUrlInput").value;
      if (window.Leads) {
        window.Leads.sendLead({
          tipo: "Lead QR Code",
          pagina: "home",
          turma: "Geral",
          acao: "Baixou QR Code Página (SVG)",
          mensagem: "URL: " + currentUrl
        });
      }
      if (!window.QRCode) return;
      var svgCode = window.QRCode.generateSVG(currentUrl, { size: 480, margin: 3 });
      var blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
      downloadFile(blob, "qrcode-senai-workshop-2026.svg");
    };

    document.getElementById("pageQrDownloadPngBtn").onclick = function () {
      var currentUrl = document.getElementById("pageQrUrlInput").value;
      if (window.Leads) {
        window.Leads.sendLead({
          tipo: "Lead QR Code",
          pagina: "home",
          turma: "Geral",
          acao: "Baixou QR Code Página (PNG)",
          mensagem: "URL: " + currentUrl
        });
      }
      if (!window.QRCode) return;
      var canvas = document.createElement("canvas");
      window.QRCode.drawCanvas(canvas, currentUrl, { size: 800, margin: 4 });
      canvas.toBlob(function (blob) {
        if (blob) downloadFile(blob, "qrcode-senai-workshop-2026.png");
      });
    };

    var toggleBtn = document.getElementById("pageQrBaseUrlToggle");
    var baseBox = document.getElementById("pageQrBaseUrlBox");
    toggleBtn.onclick = function () { baseBox.classList.toggle("is-open"); };

    document.getElementById("pageQrBaseUrlSave").onclick = function () {
      var v = document.getElementById("pageQrBaseUrlInput").value.trim().replace(/\/+$/, "");
      if (v) {
        store("custom_base_url", v);
        showToast(T("baseUrlSaved"));
      } else {
        removeStore("custom_base_url");
        showToast(T("baseUrlReset"));
      }
      openPageQrModal();
    };

    document.getElementById("pageQrBaseUrlReset").onclick = function () {
      removeStore("custom_base_url");
      showToast(T("baseUrlReset"));
      openPageQrModal();
    };

    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (window.Leads) {
      window.Leads.sendLead({
        tipo: "Lead QR Code",
        pagina: "home",
        turma: "Geral",
        acao: "Visualizou QR Code da Página Inicial",
        mensagem: "Abriu modal com QR Code grande do Workshop"
      });
    }
  }

  function initCardClicks(courseKey, P) {
    var grid = document.getElementById("projectGrid");
    if (!grid) return;

    function handleCardActivation(card) {
      var idx = Number(card.getAttribute("data-proj-idx"));
      if (P[idx]) {
        if (window.Leads) window.Leads.trackProjectAction(P[idx], courseKey, "abriu_modal");
        openModal(P[idx], courseKey, idx, true);
      }
    }

    grid.addEventListener("click", function (e) {
      // If clicking inside action buttons, let default link/toast handle it and track lead
      var actionBtn = e.target.closest ? e.target.closest(".actions a, .actions button") : null;
      if (actionBtn) {
        var cardEl = e.target.closest ? e.target.closest(".project-card") : null;
        if (cardEl) {
          var idx = Number(cardEl.getAttribute("data-proj-idx"));
          var p = P[idx];
          if (p && window.Leads) {
            var label = (actionBtn.textContent || "").trim().toLowerCase();
            var actType = "visitar_site";
            var actUrl = p.landing;
            if (label.indexOf("funcionamento") !== -1 || label.indexOf("how it works") !== -1) {
              actType = "funcionamento";
              actUrl = p.funcionamento;
            } else if (label.indexOf("comercial") !== -1) {
              actType = "comercial";
              actUrl = p.comercial;
            }
            window.Leads.trackProjectAction(p, courseKey, actType, { url: actUrl });
          }
        }
        return;
      }

      var card = e.target.closest ? e.target.closest(".project-card") : null;
      if (card) {
        handleCardActivation(card);
      }
    });

    grid.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest ? e.target.closest(".project-card") : null;
        if (card && e.target === card) {
          e.preventDefault();
          handleCardActivation(card);
        }
      }
    });
  }

  /* Listeners globais para Modal (Esc e histórico) */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal(true);
  });

  window.addEventListener("hashchange", function () {
    var raw = (window.location.hash || "").replace(/^#\/?/, "").trim();
    var page = document.body.getAttribute("data-page");
    if (!raw) {
      closeModal(false);
      return;
    }
    if (page === "home") {
      if (raw === "qr" || raw === "qrcode" || raw === "qrcode-home") {
        openPageQrModal();
        return;
      }
      var any = findProjectAnyCourse(raw);
      if (any) {
        window.location.replace(S.cursos[any.courseKey].pagina + "#" + raw);
      }
    } else {
      var found = findProject(page, raw);
      if (found) {
        openModal(found.project, page, found.index, false);
      } else {
        closeModal(false);
      }
    }
  });

  /* Verifica se a página foi aberta com hash ou query indicando projeto */
  function checkInitialRoute() {
    var page = document.body.getAttribute("data-page");
    var candidate = "";

    // 1. Checa Hash (ex: #ds-1)
    if (window.location.hash) {
      candidate = window.location.hash.replace(/^#\/?/, "").trim();
    }

    // 2. Fallback para Query Params (ex: ?p=ds-1 ou ?projeto=ds-1)
    if (!candidate && window.location.search) {
      try {
        var params = new URLSearchParams(window.location.search);
        candidate = params.get("projeto") || params.get("p") || params.get("id") || "";
      } catch (err) {
        candidate = "";
      }
    }

    if (!candidate) return;

    if (page === "home") {
      if (candidate === "qr" || candidate === "qrcode" || candidate === "qrcode-home") {
        setTimeout(openPageQrModal, 100);
        return;
      }
      var matchAny = findProjectAnyCourse(candidate);
      if (matchAny) {
        window.location.replace(S.cursos[matchAny.courseKey].pagina + "#" + candidate);
      }
    } else {
      var match = findProject(page, candidate);
      if (match) {
        if (window.Leads) window.Leads.trackProjectAction(match.project, page, "acesso_via_qr_code");
        // Abre imediatamente o modal do projeto
        setTimeout(function () {
          openModal(match.project, page, match.index, false);
        }, 100);
      }
    }
  }

  /* ----- aviso para botões ainda sem link ----- */
  var toastTimer = null;
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[data-empty]") : null;
    if (a) { e.preventDefault(); showToast(T("soonMsg")); }
  });

  /* ----- reveal on scroll ----- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ----- boot ----- */
  function render() {
    var root = document.getElementById("app");
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    var page = document.body.getAttribute("data-page");
    if (page === "home") renderHome(root); else renderCourse(root, page);
    var themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
      themeBtn.onclick = function () { theme = theme === "dark" ? "light" : "dark"; store("theme", theme); applyTheme(); render(); };
    }
    var langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.onclick = function (e) {
        var badgePt = document.getElementById("lang-badge-pt");
        var badgeEn = document.getElementById("lang-badge-en");
        if (e && e.target === badgePt) {
          if (lang === "pt") return;
          lang = "pt";
        } else if (e && e.target === badgeEn) {
          if (lang === "en") return;
          lang = "en";
        } else {
          lang = lang === "pt" ? "en" : "pt";
        }
        store("lang", lang);
        render();
      };
    }
    initReveal();
    checkInitialRoute();
  }

  // Sincronização em tempo real entre abas/páginas (ex: dashboard vs site)
  window.addEventListener("storage", function (e) {
    if (e.key === "lang" && e.newValue && e.newValue !== lang) {
      lang = e.newValue;
      render();
    }
    if (e.key === "theme" && e.newValue && e.newValue !== theme) {
      theme = e.newValue;
      applyTheme();
      render();
    }
  });

  render();
})();
