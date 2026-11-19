/* ===== SENAI Workshop 2026 — lógica do site ===== */
(function () {
  "use strict";
  var S = window.SITE;

  var I18N = {
    pt: {
      theme: "Tema", back: "← Voltar", eyebrow: "São Carlos · Tecnologia em Ação",
      heroTitle: 'Workshop SENAI <span class="grad">2026</span>',
      heroSub: "Desenvolvimento de Sistemas, Eletroeletrônica e Mecatrônica",
      seeClasses: "Conheça as turmas",
      classesTitle: "Turmas SENAI São Carlos 2026",
      classesSub: "Três cursos, dezenas de ideias que viram solução.",
      projects: "Projetos", students: "Alunos", seeProjects: "Ver Projetos",
      aboutTitle: "Sobre o SENAI São Carlos",
      aboutText: "O SENAI São Carlos é referência em formação técnica e tecnológica na região, preparando profissionais para os desafios da Indústria 4.0. Nossos alunos desenvolvem projetos inovadores que conectam teoria e prática, criando soluções reais para problemas do mercado de trabalho.",
      statProjects: "Projetos Desenvolvidos", statStudents: "Alunos Participantes", statCourses: "Cursos Participantes", statDedication: "Dedicação e Inovação",
      ourProjects: "Nossos Projetos", ourProjectsSub: "Landing page, pitch técnico e pitch comercial de cada grupo.",
      tech: "Funcionamento", commercial: "Comercial", visit: "Visitar site", soon: "Em breve",
      members: "integrantes", groupMembers: "Integrantes:", turmaBadge: "Turma",
      presentation: "Apresentação:", presentations: "Apresentações:", presentationDate: "Data:", presentationTime: "Horário:",
      fTitle: "SENAI São Carlos", fText: "Centro de referência em formação técnica e tecnológica, preparando profissionais para os desafios da Indústria 4.0.", fSlogan: "Formando o futuro da tecnologia",
      fClasses: "Turmas 2026", fTeam: "Equipe de Desenvolvimento", fDevs: "Desenvolvedores:", techLead: "Tech Lead",
      rights: "Serviço Nacional de Aprendizagem Industrial", copyright: "Todos os direitos reservados", devBy: "Desenvolvido por",
      noProjects: "Nenhum projeto cadastrado ainda.",
      soonMsg: "Link disponível em breve.",
      /* Modal & QR Code */
      details: "Ver detalhes",
      close: "Fechar",
      shareWhatsapp: "Compartilhar no WhatsApp",
      whatsappShareMsg: "Confira o projeto *{nome}*{turma} do Workshop SENAI 2026:\n{url}",
      whatsappPageShareMsg: "Confira o Workshop SENAI São Carlos 2026 - Desenvolvimento de Sistemas, Eletroeletrônica e Mecatrônica:\n{url}",
      qrToggle: "QR Code do Projeto",
      qrToggleHide: "Ocultar QR Code",
      openA4Poster: "Card de Mesa (1/4 A4)",
      downloadA4: "Baixar Card (PNG)",
      printA4: "Imprimir (1/4 A4)",
      printA4Grid: "4 por Folha A4",
      downloadQrOnly: "Apenas QR Code",
      a4PosterTitle: "Card Minimalista (1/4 A4)",
      evalOurProject: "AVALIE NOSSO PROJETO",
      evalOurProjectSub: "Aponte a câmera para o QR Code acima",
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
      eventDateVal: "01, 02 e 03 de Dezembro de 2026",
      eventDateDays: "Terça, Quarta e Quinta-feira • Projetos em Exposição",
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
      eventHeroBadgeDate: "01, 02 e 03 de Dezembro",
      eventHeroBadgeTime: "08h às 17h",
      eventHeroBadgeLoc: "SENAI São Carlos",
      newsBadge: "Lembrete do Evento",
      newsTitle: "Não perca o Workshop SENAI 2026",
      newsSub: "Cadastre seu e-mail para receber avisos exclusivos antes do evento (01, 02 e 03 de Dezembro) e o catálogo de projetos.",
      newsNameLabel: "Seu Nome ou Empresa",
      newsNamePlaceholder: "Ex: Carlos Mendes",
      newsEmailLabel: "Seu E-mail",
      newsEmailPlaceholder: "Ex: carlos@empresa.com.br",
      newsProfileLabel: "Perfil de Visitante",
      newsProfileVisitor: "Visitante / Comunidade",
      newsProfileCompany: "Empresa / Recrutador",
      newsProfileStudent: "Aluno / Ex-aluno",
      newsProfileTeacher: "Professor / Educador",
      newsSubmitBtn: "Receber Lembrete por E-mail",
      newsSubmitting: "Confirmando inscrição...",
      newsSuccessTitle: "Inscrição Confirmada!",
      newsSuccessDesc: "Obrigado! Enviamos um e-mail com as informações do evento e avisaremos você antes do início.",
      newsErrorInvalidEmail: "Por favor, informe um e-mail válido (ex: seu.nome@email.com).",
      newsErrorSend: "Não foi possível enviar agora. Tente novamente mais tarde.",
      newsAlreadySubscribed: "Você já está cadastrado para receber o lembrete!",
      newsChangeEmail: "Cadastrar outro e-mail",
      newsHeroBtn: "🔔 Receber Lembrete"
    },
    en: {
      theme: "Theme", back: "← Back", eyebrow: "São Carlos · Technology in Action",
      heroTitle: 'SENAI Workshop <span class="grad">2026</span>',
      heroSub: "Systems Development, Electronics and Mechatronics",
      seeClasses: "Meet the classes",
      classesTitle: "SENAI São Carlos Classes 2026",
      classesSub: "Three courses, dozens of ideas turned into solutions.",
      projects: "Projects", students: "Students", seeProjects: "See Projects",
      aboutTitle: "About SENAI São Carlos",
      aboutText: "SENAI São Carlos is a regional reference in technical and technological education, preparing professionals for the challenges of Industry 4.0. Our students develop innovative projects that connect theory and practice, creating real solutions for real market problems.",
      statProjects: "Projects Developed", statStudents: "Participating Students", statCourses: "Participating Courses", statDedication: "Dedication & Innovation",
      ourProjects: "Our Projects", ourProjectsSub: "Landing page, technical pitch and commercial pitch of each group.",
      tech: "How it works", commercial: "Commercial", visit: "Visit site", soon: "Coming soon",
      members: "members", groupMembers: "Team:", turmaBadge: "Class",
      presentation: "Presentation:", presentations: "Presentations:", presentationDate: "Date:", presentationTime: "Time:",
      fTitle: "SENAI São Carlos", fText: "A reference center in technical and technological education, preparing professionals for the challenges of Industry 4.0.", fSlogan: "Shaping the future of technology",
      fClasses: "Classes 2026", fTeam: "Development Team", fDevs: "Developers:", techLead: "Tech Lead",
      rights: "National Service for Industrial Training", copyright: "All rights reserved", devBy: "Developed by",
      noProjects: "No projects registered yet.",
      soonMsg: "Link coming soon.",
      /* Modal & QR Code */
      details: "View details",
      close: "Close",
      shareWhatsapp: "Share on WhatsApp",
      whatsappShareMsg: "Check out the project *{nome}*{turma} from SENAI Workshop 2026:\n{url}",
      whatsappPageShareMsg: "Check out SENAI São Carlos Workshop 2026 - Systems Development, Electronics & Mechatronics:\n{url}",
      qrToggle: "Project QR Code",
      qrToggleHide: "Hide QR Code",
      openA4Poster: "Table Card (1/4 A4)",
      downloadA4: "Download Card (PNG)",
      printA4: "Print (1/4 A4)",
      printA4Grid: "4 per A4 Sheet",
      downloadQrOnly: "QR Code Only",
      a4PosterTitle: "Minimalist Stand Card (1/4 A4)",
      evalOurProject: "RATE OUR PROJECT",
      evalOurProjectSub: "Point camera at the QR Code above",
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
      eventDateVal: "December 1, 2 & 3, 2026",
      eventDateDays: "Tuesday, Wednesday & Thursday • Projects on Display",
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
      eventHeroBadgeDate: "December 1, 2 & 3",
      eventHeroBadgeTime: "8am – 5pm",
      eventHeroBadgeLoc: "SENAI São Carlos",
      newsBadge: "Event Reminder",
      newsTitle: "Don't Miss the SENAI Workshop 2026",
      newsSub: "Register your email to receive exclusive notices before the event (December 1, 2 & 3) and the project catalog.",
      newsNameLabel: "Your Name or Company",
      newsNamePlaceholder: "E.g., John Doe",
      newsEmailLabel: "Your Email",
      newsEmailPlaceholder: "E.g., john@company.com",
      newsProfileLabel: "Visitor Profile",
      newsProfileVisitor: "Visitor / Community",
      newsProfileCompany: "Company / Recruiter",
      newsProfileStudent: "Student / Alumni",
      newsProfileTeacher: "Teacher / Educator",
      newsSubmitBtn: "Get Reminder by Email",
      newsSubmitting: "Confirming subscription...",
      newsSuccessTitle: "Reminder Confirmed!",
      newsSuccessDesc: "Thank you! We sent you an email with event details and will notify you right before the start.",
      newsErrorInvalidEmail: "Please provide a valid email address (e.g., your.name@email.com).",
      newsErrorSend: "Could not send right now. Please try again later.",
      newsAlreadySubscribed: "You are already subscribed to receive event reminders!",
      newsChangeEmail: "Register another email",
      newsHeroBtn: "🔔 Get Reminder"
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

  var WA_ICON_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.705 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';

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

  function formatTurma(turmaVal) {
    if (!turmaVal) return "";
    if (typeof turmaVal === "object") return tr(turmaVal) || "";
    return String(turmaVal).trim();
  }

  function formatMembers(p) {
    if (!p) return "";
    var list = p.integrantes || p.participantes;
    if (Array.isArray(list)) {
      return list.map(function (n) { return String(n).trim(); }).filter(Boolean).join(", ");
    }
    if (typeof list === "string" && list.trim()) {
      return list.trim();
    }
    if (typeof p.alunos === "string" && isNaN(Number(p.alunos)) && p.alunos.trim()) {
      return p.alunos.trim();
    }
    return "";
  }

  function getProjectStudentCount(p) {
    if (!p) return 0;
    if (Number(p.alunos) > 0) return Number(p.alunos);
    var list = p.integrantes || p.participantes;
    if (Array.isArray(list)) return list.filter(Boolean).length;
    if (typeof list === "string" && list.trim()) {
      return list.split(/[,;\n]+/).filter(function (s) { return s.trim().length > 0; }).length;
    }
    return 0;
  }

  /* ----- Formatação de Data e Horário da Apresentação ----- */
  function formatSchedule(p) {
    if (!p) return [];
    var rawList = p.apresentacao || p.apresentacoes || p.schedules || p.dias;
    if (Array.isArray(rawList) && rawList.length > 0) {
      var list = [];
      for (var i = 0; i < rawList.length; i++) {
        var item = rawList[i];
        if (!item) continue;
        if (typeof item === "string") {
          var str = String(tr(item) || "").trim();
          if (str) list.push({ data: "", horario: str });
        } else {
          var d = tr(item.data || item.dataApresentacao || item.dia || "");
          var h = tr(item.horario || item.horarioApresentacao || item.hora || "");
          d = String(d || "").trim();
          h = String(h || "").trim();
          if (d || h) list.push({ data: d, horario: h });
        }
      }
      if (list.length > 0) return list;
    }

    if (Array.isArray(p.data) || Array.isArray(p.horario)) {
      var arrD = Array.isArray(p.data) ? p.data : (p.data ? [p.data] : []);
      var arrH = Array.isArray(p.horario) ? p.horario : (p.horario ? [p.horario] : []);
      var maxLen = Math.max(arrD.length, arrH.length);
      var res = [];
      for (var j = 0; j < maxLen; j++) {
        var dj = String(tr(arrD[j]) || "").trim();
        var hj = String(tr(arrH[j]) || "").trim();
        if (dj || hj) res.push({ data: dj, horario: hj });
      }
      if (res.length > 0) return res;
    }

    var singleD = String(tr(p.data || p.dataApresentacao) || "").trim();
    var singleH = String(tr(p.horario || p.horarioApresentacao || p.hora) || "").trim();
    if (singleD || singleH) {
      return [{ data: singleD, horario: singleH }];
    }
    return [];
  }

  function renderCardScheduleHTML(p) {
    var list = formatSchedule(p);
    if (!list || list.length === 0) return "";
    var rows = [];
    var fullTitles = [];
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      var parts = [];
      if (s.data) parts.push('<span class="sched-item"><span class="sched-icon" aria-hidden="true">📅</span> ' + esc(s.data) + '</span>');
      if (s.horario) parts.push('<span class="sched-item"><span class="sched-icon" aria-hidden="true">⏰</span> ' + esc(s.horario) + '</span>');
      var rowText = (s.data ? s.data : "") + (s.data && s.horario ? " • " : "") + (s.horario ? s.horario : "");
      if (rowText) fullTitles.push(rowText);
      rows.push('<div class="project-schedule-row">' + parts.join('<span class="sched-sep" aria-hidden="true">•</span>') + '</div>');
    }
    var label = list.length > 1 ? (T("presentations") || T("presentation")) : T("presentation");
    return '<div class="project-schedule" title="' + esc(label + " " + fullTitles.join(" | ")) + '">' +
      rows.join("") +
      '</div>';
  }

  function renderModalScheduleHTML(p) {
    var list = formatSchedule(p);
    if (!list || list.length === 0) return "";
    var label = list.length > 1 ? (T("presentations") || T("presentation")) : T("presentation");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      var parts = [];
      if (s.data) parts.push('<span class="modal-sched-pill"><span class="modal-sched-pill-icon" aria-hidden="true">📅</span> ' + esc(s.data) + '</span>');
      if (s.horario) parts.push('<span class="modal-sched-pill"><span class="modal-sched-pill-icon" aria-hidden="true">⏰</span> ' + esc(s.horario) + '</span>');
      rows.push('<div class="modal-schedule-row">' + parts.join("") + '</div>');
    }
    return '<div class="modal-schedule-box">' +
      '<span class="modal-schedule-icon" aria-hidden="true">📅</span>' +
      '<div class="modal-schedule-content">' +
      '<span class="modal-schedule-label">' + esc(label) + '</span>' +
      '<div class="modal-schedule-rows">' + rows.join("") + '</div>' +
      '</div>' +
      '</div>';
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

  var courseShuffledProjects = {};

  function shuffleArray(arr) {
    if (!arr || !arr.length) return [];
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function shuffleInterleavedByTurma(arr) {
    if (!arr || arr.length <= 1) return arr ? arr.slice() : [];

    var buckets = {};
    var namedKeys = [];
    var hasUnnamed = false;

    for (var i = 0; i < arr.length; i++) {
      var p = arr[i];
      var rawTurma = p && p.turma ? formatTurma(p.turma) : "";
      var k = rawTurma ? rawTurma.toLowerCase() : "__sem_turma__";
      if (!buckets[k]) {
        buckets[k] = [];
        if (k === "__sem_turma__") {
          hasUnnamed = true;
        } else {
          namedKeys.push(k);
        }
      }
      buckets[k].push(p);
    }

    // Se não há turmas ou só há 1 turma, faz shuffle simples
    if (namedKeys.length === 0 || (namedKeys.length === 1 && !hasUnnamed)) {
      return shuffleArray(arr);
    }

    // Embaralha internamente os projetos de cada turma
    for (var key in buckets) {
      buckets[key] = shuffleArray(buckets[key]);
    }

    // Sorteia qual turma começa primeiro para garantir equidade
    namedKeys = shuffleArray(namedKeys);

    var orderKeys = namedKeys.slice();
    if (hasUnnamed) {
      orderKeys.push("__sem_turma__");
    }

    // Intercala os projetos das turmas (round-robin)
    var result = [];
    var maxLen = 0;
    for (var b = 0; b < orderKeys.length; b++) {
      if (buckets[orderKeys[b]].length > maxLen) {
        maxLen = buckets[orderKeys[b]].length;
      }
    }

    for (var round = 0; round < maxLen; round++) {
      for (var b = 0; b < orderKeys.length; b++) {
        var item = buckets[orderKeys[b]][round];
        if (item !== undefined) {
          result.push(item);
        }
      }
    }

    return result;
  }

  function getShuffledProjects(key) {
    if (!courseShuffledProjects[key]) {
      var orig = (S.cursos[key] && S.cursos[key].projetos) || [];
      courseShuffledProjects[key] = shuffleInterleavedByTurma(orig);
    }
    return courseShuffledProjects[key];
  }

  function findProject(courseKey, idOrSlug) {
    if (!S.cursos[courseKey] || !S.cursos[courseKey].projetos) return null;
    var list = (courseShuffledProjects[courseKey] && courseShuffledProjects[courseKey].length)
      ? courseShuffledProjects[courseKey]
      : S.cursos[courseKey].projetos;
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
  function totalAlunos(c) { return c.projetos.reduce(function (a, p) { return a + getProjectStudentCount(p); }, 0); }
  function fmt(n) { return n > 0 ? n : "—"; }

  /* ----- header ----- */
  function headerHTML(isCourse) {
    var home = isCourse ? "../index.html" : "index.html";
    return '<header class="header"><div class="container">' +
      (isCourse
        ? '<a class="btn-ghost back" href="' + home + '">' + T("back") + '</a>'
        : '<a class="logo" href="' + home + '">SEN<span>AI</span></a>') +
      '<div class="header-actions">' +
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
      '</div><div class="copy"><strong>SENAI São Carlos</strong> - ' + T("rights") + '<br>© ' + S.ano + ' ' + T("copyright") +
      (devCredits ? '<br>' + T("devBy") + ' ' + devCredits : '') + '</div></div></footer>';
  }

  /* ----- SEÇÃO DE CAPTURA DE E-MAILS & LEMBRETE DO WORKSHOP ----- */
  function renderNewsletterHTML(isCourse) {
    var subInfo = (window.Leads && typeof window.Leads.getNewsletterSubscription === "function")
      ? window.Leads.getNewsletterSubscription()
      : { isSubscribed: false, email: "" };
    var alreadySubscribed = subInfo.isSubscribed;
    var savedEmail = esc(subInfo.email);

    return '<section class="section newsletter-section" id="lembrete">' +
      '<div class="container">' +
      '<div class="newsletter-card reveal">' +
      '<div class="newsletter-glow"></div>' +
      '<div class="newsletter-grid">' +
      '<div class="newsletter-info">' +
      '<div class="newsletter-badge"><span class="pulse-bell">🔔</span> ' + T("newsBadge") + '</div>' +
      '<h2 class="newsletter-title">' + T("newsTitle") + '</h2>' +
      '<p class="newsletter-sub">' + T("newsSub") + '</p>' +
      '<div class="newsletter-event-pill">' +
      '<span class="newsletter-pill-item">📅 ' + T("eventHeroBadgeDate") + '</span>' +
      '<span class="newsletter-pill-sep">•</span>' +
      '<span class="newsletter-pill-item">⏰ ' + T("eventHeroBadgeTime") + '</span>' +
      '<span class="newsletter-pill-sep">•</span>' +
      '<span class="newsletter-pill-item">📍 ' + T("eventHeroBadgeLoc") + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="newsletter-form-wrapper" id="newsletterFormWrapper">' +
      (alreadySubscribed
        ? '<div class="newsletter-success-box">' +
        '<div class="newsletter-success-icon">🎉</div>' +
        '<h3>' + T("newsSuccessTitle") + '</h3>' +
        '<p>' + T("newsAlreadySubscribed") + '</p>' +
        '<div class="newsletter-confirmed-email">📧 ' + savedEmail + '</div>' +
        '<button type="button" class="btn-ghost newsletter-reset-btn" id="newsResetBtn">' + T("newsChangeEmail") + '</button>' +
        '</div>'
        : '<form class="newsletter-form" id="newsletterForm" novalidate>' +
        '<div class="newsletter-field-group">' +
        '<div class="newsletter-field">' +
        '<label for="newsName" class="newsletter-label">' + T("newsNameLabel") + '</label>' +
        '<input type="text" id="newsName" name="name" class="newsletter-input" placeholder="' + esc(T("newsNamePlaceholder")) + '">' +
        '</div>' +
        '<div class="newsletter-field">' +
        '<label for="newsEmail" class="newsletter-label">' + T("newsEmailLabel") + ' *</label>' +
        '<input type="email" id="newsEmail" name="email" class="newsletter-input" placeholder="' + esc(T("newsEmailPlaceholder")) + '" required autocomplete="email">' +
        '</div>' +
        '</div>' +
        '<div class="newsletter-field-group newsletter-bottom-row">' +
        '<div class="newsletter-field newsletter-field-select">' +
        '<label for="newsProfile" class="newsletter-label">' + T("newsProfileLabel") + '</label>' +
        '<select id="newsProfile" name="profile" class="newsletter-select">' +
        '<option value="Visitante">' + T("newsProfileVisitor") + '</option>' +
        '<option value="Empresa">' + T("newsProfileCompany") + '</option>' +
        '<option value="Aluno">' + T("newsProfileStudent") + '</option>' +
        '<option value="Professor">' + T("newsProfileTeacher") + '</option>' +
        '</select>' +
        '</div>' +
        '<button type="submit" class="btn newsletter-submit-btn" id="newsSubmitBtn">' +
        '<span>' + T("newsSubmitBtn") + '</span>' +
        '<span class="go">→</span>' +
        '</button>' +
        '</div>' +
        '<div class="newsletter-feedback" id="newsFeedback" style="display:none;" aria-live="polite"></div>' +
        '</form>') +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>';
  }

  function initNewsletterForm() {
    var form = document.getElementById("newsletterForm");
    var resetBtn = document.getElementById("newsResetBtn");

    if (resetBtn) {
      resetBtn.onclick = function () {
        try {
          localStorage.removeItem("senai_newsletter_subscribed");
        } catch (e) { }
        var section = document.getElementById("lembrete");
        if (section) {
          var isCourse = document.body ? (document.body.getAttribute("data-page") !== "home") : false;
          var tmp = document.createElement("div");
          tmp.innerHTML = renderNewsletterHTML(isCourse);
          if (tmp.firstElementChild) {
            section.parentNode.replaceChild(tmp.firstElementChild, section);
            initNewsletterForm();
          }
        }
      };
    }

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInp = document.getElementById("newsName");
      var emailInp = document.getElementById("newsEmail");
      var profileInp = document.getElementById("newsProfile");
      var submitBtn = document.getElementById("newsSubmitBtn");
      var feedback = document.getElementById("newsFeedback");

      var nameVal = (nameInp ? nameInp.value : "").trim();
      var emailVal = (emailInp ? emailInp.value : "").trim();
      var profileVal = profileInp ? profileInp.value : "Visitante";

      if (!window.Leads || typeof window.Leads.isValidEmail !== "function" || !window.Leads.isValidEmail(emailVal)) {
        if (feedback) {
          feedback.style.display = "block";
          feedback.className = "newsletter-feedback error";
          feedback.textContent = T("newsErrorInvalidEmail");
        }
        if (emailInp) emailInp.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        submitBtn.innerHTML = '<span>' + T("newsSubmitting") + '</span>';
      }
      if (feedback) feedback.style.display = "none";

      window.Leads.submitNewsletterLead({
        nome: nameVal,
        email: emailVal,
        perfil: profileVal,
        pagina: document.body ? document.body.getAttribute("data-page") : "home"
      }).then(function () {
        if (typeof triggerFireworks === "function") triggerFireworks();
        showToast(T("newsSuccessTitle") + " 🎉");
        var wrapper = document.getElementById("newsletterFormWrapper");
        if (wrapper) {
          wrapper.innerHTML =
            '<div class="newsletter-success-box">' +
            '<div class="newsletter-success-icon">🎉</div>' +
            '<h3>' + T("newsSuccessTitle") + '</h3>' +
            '<p>' + T("newsSuccessDesc") + '</p>' +
            '<div class="newsletter-confirmed-email">📧 ' + esc(emailVal) + '</div>' +
            '</div>';
        }
      }).catch(function (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("loading");
          submitBtn.innerHTML = '<span>' + T("newsSubmitBtn") + '</span> <span class="go">→</span>';
        }
        if (feedback) {
          feedback.style.display = "block";
          feedback.className = "newsletter-feedback error";
          feedback.textContent = T("newsErrorSend");
        }
      });
    });
  }

  /* ----- HOME ----- */
  function renderHome(root) {
    var np = 0, na = 0;
    cursos.forEach(function (c) { np += totalProj(c); na += totalAlunos(c); });
    var cards = Object.keys(S.cursos).map(function (k) {
      var c = S.cursos[k];
      var sigla = k === "ds" ? "DS" : (k === "eletroeletronica" || k === "ele" ? "ELE" : "MEC");
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
      '<a class="hero-news-btn" href="#lembrete" title="' + esc(T("newsTitle")) + '">' + T("newsHeroBtn") + '</a>' +
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
      renderNewsletterHTML(false) +
      footerHTML(false);

    var heroQrBtn = document.getElementById("heroQrBtn");
    if (heroQrBtn) {
      heroQrBtn.onclick = function () {
        openPageQrModal();
      };
    }

    initNewsletterForm();
    if (window.Leads) window.Leads.trackPageView("home");
  }

  function act(url, label, primary) {
    var u = safeUrl(url);
    if (u) {
      return '<a class="act' + (primary ? " primary" : "") + '" href="' + esc(u) + '" target="_blank" rel="noopener">' + label + '</a>';
    }
    return '<a class="act is-disabled' + (primary ? " primary" : "") + '" href="#" data-empty="1" aria-disabled="true" tabindex="-1" title="' + esc(T("soonMsg")) + '">' + label + '</a>';
  }

  /* ----- PÁGINA DE CURSO ----- */
  var timer = null, current = 0;
  function renderCourse(root, key) {
    var c = S.cursos[key];
    var P = getShuffledProjects(key);
    document.title = "SENAI - " + tr(c.nome) + " " + S.ano;

    var chips = P.map(function (p, i) { return '<button class="chip' + (i === 0 ? " active" : "") + '" data-go="' + i + '">' + esc(p.nome) + '</button>'; }).join("");

    var slides = P.map(function (p, i) {
      var img = resolveImg(p.imagem || c.imagem);
      var has = !!img;
      var turmaText = formatTurma(p.turma);
      return '<article class="slide' + (i === 0 ? " active" : "") + (has ? "" : " noimg") + '">' +
        '<div class="slide-bg"' + (has ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '></div>' +
        '<div class="slide-content"><span class="tag">' + esc(p.nome) + (turmaText ? ' · ' + esc(turmaText) : '') + '</span>' +
        '<h1><a class="slide-link" ' + (safeUrl(p.landing) ? 'href="' + esc(safeUrl(p.landing)) + '" target="_blank" rel="noopener"' : 'href="#" data-empty="1"') + '>' + esc(p.nome) + ' <span class="go">↗</span></a></h1>' +
        '<h2>' + esc(p.subtitulo) + '</h2></div></article>';
    }).join("");

    var dots = P.map(function (_, i) { return '<button class="dot' + (i === 0 ? " active" : "") + '" data-go="' + i + '" aria-label="Projeto ' + (i + 1) + '"></button>'; }).join("");

    var cards = P.map(function (p, i) {
      var pid = getProjectId(p, key, i);
      var u = resolveImg(p.imagem);
      var turmaText = formatTurma(p.turma);
      var membersText = formatMembers(p);

      var membersHtml = "";
      if (membersText) {
        membersHtml = '<div class="project-members" title="' + esc(T("groupMembers") + ' ' + membersText) + '">' +
          '<span class="members-icon" aria-hidden="true">👥</span>' +
          '<div class="members-content">' +
          '<span class="members-label">' + esc(T("groupMembers")) + '</span> ' +
          '<span class="members-names">' + esc(membersText) + '</span>' +
          '</div>' +
          '</div>';
      } else if (Number(p.alunos) > 0) {
        membersHtml = '<span class="meta">' + p.alunos + ' ' + T("members") + '</span>';
      }

      return '<article class="project-card reveal" id="proj-' + i + '" data-proj-id="' + esc(pid) + '" data-proj-idx="' + i + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="' + esc(p.nome) + '">' +
        '<div class="project-img">' + (u ? '<img src="' + esc(u) + '" alt="' + esc(p.nome) + '" loading="lazy">' : '<span class="ph">' + esc((p.nome || "?").charAt(0)) + '</span>') + '</div>' +
        '<div class="project-body">' +
        '<div class="pheader">' +
        '<div class="ptags">' +
        '<span class="pname">' + esc(p.nome) + '</span>' +
        (turmaText ? '<span class="pturma">' + esc(turmaText) + '</span>' : '') +
        '</div>' +
        '<span class="card-hint">' + T("details") + ' ↗</span>' +
        '</div>' +
        renderCardScheduleHTML(p) +
        '<h3>' + esc(p.subtitulo) + '</h3>' +
        '<p>' + esc(p.descricao) + '</p>' +
        membersHtml +
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
      renderNewsletterHTML(true) +
      footerHTML(true);

    initCarousel(P.length);
    initCardClicks(key, P);
    initNewsletterForm();

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

  /* =====================================================================
     MODAL DE ARTE PARA IMPRESSÃO EM FOLHA A4 & QR CODE
     ===================================================================== */
  function ensurePosterModal() {
    var m = document.getElementById("projectPosterModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "projectPosterModal";
      m.className = "modal-backdrop modal-poster-backdrop";
      m.setAttribute("aria-hidden", "true");
      m.innerHTML = '<div class="modal-poster-dialog" role="dialog" aria-modal="true" id="posterDialog"></div>';
      document.body.appendChild(m);

      m.addEventListener("click", function (e) {
        if (e.target === m) closePosterModal();
      });
    }
    return m;
  }

  function closePosterModal() {
    var m = document.getElementById("projectPosterModal");
    if (!m || !m.classList.contains("is-open")) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    var pm = document.getElementById("projectModal");
    if (!pm || !pm.classList.contains("is-open")) {
      document.body.classList.remove("modal-open");
    }
  }

  function drawRoundRect(ctx, x, y, w, h, r) {
    var rad = typeof r === "number" ? { tl: r, tr: r, br: r, bl: r } : (r || { tl: 0, tr: 0, br: 0, bl: 0 });
    ctx.beginPath();
    ctx.moveTo(x + rad.tl, y);
    ctx.lineTo(x + w - rad.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad.tr);
    ctx.lineTo(x + w, y + h - rad.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad.br, y + h);
    ctx.lineTo(x + rad.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad.bl);
    ctx.lineTo(x, y + rad.tl);
    ctx.quadraticCurveTo(x, y, x + rad.tl, y);
    ctx.closePath();
  }

  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, align) {
    if (!text) return y;
    var words = String(text).split(/\s+/);
    var line = "";
    var currentY = y;
    var origAlign = ctx.textAlign;
    if (align) ctx.textAlign = align;

    for (var i = 0; i < words.length; i++) {
      var testLine = line + (line ? " " : "") + words[i];
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY);
        line = words[i];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, x, currentY);
    }
    if (align) ctx.textAlign = origAlign;
    return currentY;
  }

  function generateA4PosterCanvas(p, courseKey, index, shareUrl, callback) {
    var width = 800;
    var height = 1131; // Proporção exata de 1/4 da folha A4 (Formato A6 / 105 x 148,5 mm)
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Fundo branco papel puro
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Moldura institucional dupla (borda externa vermelha + linha fina interna)
    ctx.strokeStyle = "#e4002b";
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, width - 36, height - 36);

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // Cantoneiras institucionais nos 4 cantos
    var cornerSize = 28;
    var cornerOffset = 30;
    ctx.strokeStyle = "#e4002b";
    ctx.lineWidth = 3;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(cornerOffset, cornerOffset + cornerSize);
    ctx.lineTo(cornerOffset, cornerOffset);
    ctx.lineTo(cornerOffset + cornerSize, cornerOffset);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - cornerOffset - cornerSize, cornerOffset);
    ctx.lineTo(width - cornerOffset, cornerOffset);
    ctx.lineTo(width - cornerOffset, cornerOffset + cornerSize);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(cornerOffset, height - cornerOffset - cornerSize);
    ctx.lineTo(cornerOffset, height - cornerOffset);
    ctx.lineTo(cornerOffset + cornerSize, height - cornerOffset);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - cornerOffset - cornerSize, height - cornerOffset);
    ctx.lineTo(width - cornerOffset, height - cornerOffset);
    ctx.lineTo(width - cornerOffset, height - cornerOffset - cornerSize);
    ctx.stroke();

    // 0. Topo do Card - Evento Workshop SENAI 2026 (100% da horizontal com gradiente)
    var headerBoxW = width - 120;
    var headerBoxX = (width - headerBoxW) / 2;
    var headerBoxY = 48;
    var headerBoxH = 46;

    ctx.fillStyle = "#0f172a";
    drawRoundRect(ctx, headerBoxX, headerBoxY, headerBoxW, headerBoxH, 8);
    ctx.fill();

    ctx.font = "900 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    var t1 = "WORKSHOP SENAI ";
    var t2 = "2026";
    var w1 = ctx.measureText(t1).width;
    var w2 = ctx.measureText(t2).width;
    var totalW = w1 + w2;
    var textStartX = (width - totalW) / 2;
    var textY = headerBoxY + (headerBoxH / 2);

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(t1, textStartX, textY);

    var grad2026 = ctx.createLinearGradient(textStartX + w1, 0, textStartX + totalW, 0);
    grad2026.addColorStop(0, "#ff3b57");
    grad2026.addColorStop(0.4, "#ff6584");
    grad2026.addColorStop(1, "#38bdf8");
    ctx.fillStyle = grad2026;
    ctx.fillText(t2, textStartX + w1, textY);

    // 1. Nome do Grupo / Projeto (com fundo destacado)
    var projNome = (p && p.nome) ? p.nome : "Projeto";
    var boxW = width - 120;
    var boxX = (width - boxW) / 2;
    var boxY = headerBoxY + headerBoxH + 16;
    var boxH = 88;

    // Fundo do nome do grupo
    ctx.fillStyle = "#f1f5f9";
    drawRoundRect(ctx, boxX, boxY, boxW, boxH, 14);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    if (ctx.measureText(projNome).width > boxW - 40) {
      ctx.font = "900 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
    drawWrappedText(ctx, projNome, width / 2, boxY + (boxH / 2), boxW - 30, 32, "center");

    // 2. Moldura Central do QR Code (ampliada)
    var qrFrameSize = 560;
    var qrFrameX = (width - qrFrameSize) / 2;
    var qrFrameY = boxY + boxH + 22;

    ctx.fillStyle = "#ffffff";
    drawRoundRect(ctx, qrFrameX, qrFrameY, qrFrameSize, qrFrameSize, 16);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // QR Code em alta resolução
    var qrSize = 510;
    var qrX = qrFrameX + (qrFrameSize - qrSize) / 2;
    var qrY = qrFrameY + (qrFrameSize - qrSize) / 2;

    var tempCanvas = document.createElement("canvas");
    if (window.QRCode && typeof window.QRCode.drawCanvas === "function") {
      window.QRCode.drawCanvas(tempCanvas, shareUrl, { size: qrSize, margin: 2 });
      ctx.drawImage(tempCanvas, qrX, qrY, qrSize, qrSize);
    }

    // 3. Avalie nosso projeto
    var ctaY = qrFrameY + qrFrameSize + 30;
    var ctaW = width - 120;
    var ctaH = 68;
    var ctaX = (width - ctaW) / 2;

    var ctaGrad = ctx.createLinearGradient(ctaX, ctaY, ctaX + ctaW, ctaY + ctaH);
    ctaGrad.addColorStop(0, "#e4002b");
    ctaGrad.addColorStop(1, "#b80022");
    ctx.fillStyle = ctaGrad;
    drawRoundRect(ctx, ctaX, ctaY, ctaW, ctaH, 12);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("⭐ AVALIE NOSSO PROJETO ⭐", width / 2, ctaY + (ctaH / 2));

    if (callback) callback(canvas);
    return canvas;
  }

  /* =====================================================================
     IMPRESSÃO ISOLADA DO CARD (1/4 DA FOLHA A4 OU GRADE 2x2 COM 4 CARDS)
     ===================================================================== */
  function printA4SheetElement(sheetElement, mode) {
    if (!sheetElement) return;

    var isGrid = (mode === "grid4");
    var iframe = document.getElementById("a4PrintFrame");
    if (iframe) {
      try {
        iframe.parentNode.removeChild(iframe);
      } catch (err) {}
    }

    iframe = document.createElement("iframe");
    iframe.id = "a4PrintFrame";
    iframe.setAttribute("style", "position:fixed;top:-9999px;left:-9999px;width:210mm;height:297mm;border:0;visibility:hidden;");
    document.body.appendChild(iframe);

    var frameDoc = iframe.contentWindow.document;
    frameDoc.open();

    var cardHtml = sheetElement.outerHTML;

    var containerHtml = "";
    if (isGrid) {
      containerHtml =
        '<div class="a4-print-grid-container">' +
          cardHtml +
          cardHtml +
          cardHtml +
          cardHtml +
          '<div class="a4-crop-line-v"></div>' +
          '<div class="a4-crop-line-h"></div>' +
        '</div>';
    } else {
      containerHtml =
        '<div class="a4-print-single-container">' +
          cardHtml +
          '<div class="a4-crop-line-v"></div>' +
          '<div class="a4-crop-line-h"></div>' +
          '<div class="a4-crop-label">✂ Linha de corte (1/4 da folha A4 — 105 × 148,5 mm)</div>' +
        '</div>';
    }

    var printStyles =
      '@page {' +
        'size: A4 portrait;' +
        'margin: 0;' +
      '}' +
      '*, *::before, *::after {' +
        'box-sizing: border-box !important;' +
        '-webkit-print-color-adjust: exact !important;' +
        'print-color-adjust: exact !important;' +
      '}' +
      'html, body {' +
        'margin: 0 !important;' +
        'padding: 0 !important;' +
        'width: 210mm !important;' +
        'height: 297mm !important;' +
        'max-height: 297mm !important;' +
        'overflow: hidden !important;' +
        'background: #ffffff !important;' +
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
      '}' +
      '.a4-print-single-container {' +
        'width: 210mm !important;' +
        'height: 297mm !important;' +
        'position: relative !important;' +
        'overflow: hidden !important;' +
        'background: #ffffff !important;' +
      '}' +
      '.a4-print-single-container .a4-sheet {' +
        'width: 105mm !important;' +
        'height: 148.5mm !important;' +
        'position: absolute !important;' +
        'top: 0 !important;' +
        'left: 0 !important;' +
      '}' +
      '.a4-print-grid-container {' +
        'width: 210mm !important;' +
        'height: 297mm !important;' +
        'max-width: 210mm !important;' +
        'max-height: 297mm !important;' +
        'margin: 0 !important;' +
        'padding: 0 !important;' +
        'display: grid !important;' +
        'grid-template-columns: 105mm 105mm !important;' +
        'grid-template-rows: 148.5mm 148.5mm !important;' +
        'position: relative !important;' +
        'overflow: hidden !important;' +
        'background: #ffffff !important;' +
      '}' +
      '.a4-crop-line-v {' +
        'position: absolute !important;' +
        'top: 0 !important;' +
        'left: 105mm !important;' +
        'width: 0 !important;' +
        'height: 297mm !important;' +
        'border-left: 1px dashed #cbd5e1 !important;' +
        'pointer-events: none !important;' +
      '}' +
      '.a4-crop-line-h {' +
        'position: absolute !important;' +
        'top: 148.5mm !important;' +
        'left: 0 !important;' +
        'width: 210mm !important;' +
        'height: 0 !important;' +
        'border-top: 1px dashed #cbd5e1 !important;' +
        'pointer-events: none !important;' +
      '}' +
      '.a4-crop-label {' +
        'position: absolute !important;' +
        'top: 154mm !important;' +
        'left: 8mm !important;' +
        'font-size: 8pt !important;' +
        'color: #94a3b8 !important;' +
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;' +
      '}' +
      '.a4-sheet {' +
        'width: 105mm !important;' +
        'height: 148.5mm !important;' +
        'max-width: 105mm !important;' +
        'max-height: 148.5mm !important;' +
        'margin: 0 !important;' +
        'padding: 8mm 7mm 7mm !important;' +
        'position: relative !important;' +
        'display: flex !important;' +
        'flex-direction: column !important;' +
        'justify-content: space-between !important;' +
        'text-align: center !important;' +
        'background: #ffffff !important;' +
        'color: #1e293b !important;' +
        'border: 1mm solid #e4002b !important;' +
        'box-sizing: border-box !important;' +
        'page-break-inside: avoid !important;' +
        'page-break-after: avoid !important;' +
      '}' +
      '.a4-inner-border {' +
        'position: absolute !important;' +
        'top: 1.8mm !important;' +
        'left: 1.8mm !important;' +
        'right: 1.8mm !important;' +
        'bottom: 1.8mm !important;' +
        'border: 0.35mm solid #cbd5e1 !important;' +
        'border-radius: 1mm !important;' +
        'pointer-events: none !important;' +
        'z-index: 1 !important;' +
      '}' +
      '.a4-corner {' +
        'position: absolute !important;' +
        'width: 5mm !important;' +
        'height: 5mm !important;' +
        'pointer-events: none !important;' +
        'z-index: 2 !important;' +
      '}' +
      '.a4-corner-tl { top: 2.8mm !important; left: 2.8mm !important; border-top: 0.7mm solid #e4002b !important; border-left: 0.7mm solid #e4002b !important; }' +
      '.a4-corner-tr { top: 2.8mm !important; right: 2.8mm !important; border-top: 0.7mm solid #e4002b !important; border-right: 0.7mm solid #e4002b !important; }' +
      '.a4-corner-bl { bottom: 2.8mm !important; left: 2.8mm !important; border-bottom: 0.7mm solid #e4002b !important; border-left: 0.7mm solid #e4002b !important; }' +
      '.a4-corner-br { bottom: 2.8mm !important; right: 2.8mm !important; border-bottom: 0.7mm solid #e4002b !important; border-right: 0.7mm solid #e4002b !important; }' +
      '.a4-header { position: relative !important; z-index: 3 !important; margin: 0 0 2mm !important; width: 100% !important; text-align: center !important; }' +
      '.a4-event-badge { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; background: #0f172a !important; border: none !important; border-radius: 1.5mm !important; padding: 2mm 3mm !important; font-size: 10pt !important; font-weight: 900 !important; color: #ffffff !important; text-transform: uppercase !important; letter-spacing: 0.6px !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }' +
      '.grad { background: linear-gradient(90deg, #ff3b57, #ff6584 40%, #38bdf8) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent !important; color: #ff3b57 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }' +
      '.a4-project-info { background: #f1f5f9 !important; border: 0.4mm solid #cbd5e1 !important; border-radius: 2.5mm !important; padding: 2.5mm 4mm !important; margin: 1.5mm 0 2mm !important; position: relative !important; z-index: 3 !important; box-sizing: border-box !important; }' +
      '.a4-project-title { font-size: 14pt !important; font-weight: 900 !important; color: #0f172a !important; margin: 0 !important; line-height: 1.15 !important; letter-spacing: -0.3px !important; word-break: break-word !important; }' +
      '.a4-qr-wrapper { flex: 1 !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; margin: 2mm 0 !important; position: relative !important; z-index: 3 !important; }' +
      '.a4-qr-card { background: #ffffff !important; padding: 2mm !important; border-radius: 2mm !important; border: 0.4mm solid #cbd5e1 !important; display: inline-block !important; box-shadow: 0 1mm 3mm rgba(0, 0, 0, 0.05) !important; }' +
      '.a4-qr-card svg { display: block !important; width: 68mm !important; height: 68mm !important; }' +
      '.a4-eval-banner { background: linear-gradient(135deg, #e4002b, #b80022) !important; color: #ffffff !important; padding: 2.5mm 4mm !important; border-radius: 2mm !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; position: relative !important; z-index: 3 !important; }' +
      '.a4-eval-badge { font-size: 9.5pt !important; font-weight: 900 !important; letter-spacing: 0.4px !important; text-transform: uppercase !important; }' +
      '.a4-eval-text { font-size: 7pt !important; font-weight: 600 !important; opacity: 0.95 !important; margin-top: 0.8mm !important; line-height: 1.2 !important; }';

    var docHtml = '<!DOCTYPE html>' +
      '<html><head><meta charset="utf-8">' +
      '<title>Workshop SENAI 2026 - Card ' + (isGrid ? '(4 por Folha A4)' : '(1/4 A4)') + '</title>' +
      '<style>' + printStyles + '</style>' +
      '</head><body>' +
      containerHtml +
      '</body></html>';

    frameDoc.write(docHtml);
    frameDoc.close();

    setTimeout(function () {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        window.print();
      }
    }, 250);
  }

  function openA4PosterModal(p, courseKey, index) {
    if (!p) return;
    var cInfo = (S && S.cursos && S.cursos[courseKey]) ? S.cursos[courseKey] : null;
    var pid = getProjectId(p, courseKey, index);
    var shareUrl = getProjectShareUrl(p, courseKey, index);

    var qrSvg = "";
    if (window.QRCode && typeof window.QRCode.generateSVG === "function") {
      qrSvg = window.QRCode.generateSVG(shareUrl, { size: 260, margin: 2 });
    }

    var m = ensurePosterModal();
    var dialog = document.getElementById("posterDialog");
    if (!dialog) return;

    var safeProjectName = (p.nome || pid || "projeto").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");

    dialog.innerHTML =
      '<div class="modal-poster-toolbar">' +
        '<div class="modal-poster-toolbar-left">' +
          '<span class="poster-toolbar-title">📄 ' + esc(T("a4PosterTitle")) + '</span>' +
          '<span class="poster-toolbar-tag">#' + esc(pid) + '</span>' +
        '</div>' +
        '<div class="modal-poster-toolbar-actions">' +
          '<button class="btn-poster-action btn-poster-primary" id="posterDownloadA4Btn" title="Baixar card minimalista em PNG de alta resolução">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
            '<span>' + esc(T("downloadA4")) + '</span>' +
          '</button>' +
          '<button class="btn-poster-action" id="posterPrintSingleBtn" title="Imprimir 1 card (ocupa 1/4 da folha A4 com marcas de corte)">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>' +
            '<span>' + esc(T("printA4")) + '</span>' +
          '</button>' +
          '<button class="btn-poster-action" id="posterPrintGridBtn" title="Imprimir folha A4 completa com 4 cards (grade 2x2 para recorte)">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
            '<span>' + esc(T("printA4Grid")) + '</span>' +
          '</button>' +
          '<button class="btn-poster-action" id="posterDownloadQrPngBtn" title="Baixar apenas o QR Code em PNG">' +
            '<span>QR PNG</span>' +
          '</button>' +
          '<button class="btn-poster-action" id="posterDownloadQrSvgBtn" title="Baixar apenas o QR Code em SVG">' +
            '<span>QR SVG</span>' +
          '</button>' +
          '<button class="modal-poster-close-btn" id="posterCloseBtn" aria-label="' + esc(T("close")) + '">&times;</button>' +
        '</div>' +
      '</div>' +
      '<div class="modal-poster-body">' +
        '<div class="a4-sheet" id="a4PosterSheet">' +
          '<div class="a4-inner-border"></div>' +
          '<div class="a4-corner a4-corner-tl"></div>' +
          '<div class="a4-corner a4-corner-tr"></div>' +
          '<div class="a4-corner a4-corner-bl"></div>' +
          '<div class="a4-corner a4-corner-br"></div>' +
          '<div class="a4-header">' +
            '<div class="a4-event-badge">Workshop SENAI <span class="grad">2026</span></div>' +
          '</div>' +
          '<div class="a4-project-info">' +
            '<h1 class="a4-project-title">' + esc(p.nome) + '</h1>' +
          '</div>' +
          '<div class="a4-qr-wrapper">' +
            '<div class="a4-qr-card">' +
              qrSvg +
            '</div>' +
          '</div>' +
          '<div class="a4-eval-banner">' +
            '<div class="a4-eval-badge">⭐ ' + esc(T("evalOurProject")) + ' ⭐</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById("posterCloseBtn").onclick = closePosterModal;

    document.getElementById("posterDownloadA4Btn").onclick = function () {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "baixou_card_a6");
      showToast("⏳ Gerando card em alta resolução...");
      setTimeout(function () {
        var canvas = generateA4PosterCanvas(p, courseKey, index, shareUrl);
        canvas.toBlob(function (blob) {
          if (blob) {
            downloadFile(blob, "card-" + safeProjectName + ".png");
            showToast("📄 Card baixado com sucesso!");
          }
        }, "image/png");
      }, 50);
    };

    document.getElementById("posterPrintSingleBtn").onclick = function () {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "imprimiu_card_single");
      printA4SheetElement(document.getElementById("a4PosterSheet"), "single");
    };

    document.getElementById("posterPrintGridBtn").onclick = function () {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "imprimiu_card_grid4");
      printA4SheetElement(document.getElementById("a4PosterSheet"), "grid4");
    };

    document.getElementById("posterDownloadQrPngBtn").onclick = function () {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "baixou_qr_png");
      if (!window.QRCode) return;
      var canvas = document.createElement("canvas");
      window.QRCode.drawCanvas(canvas, shareUrl, { size: 800, margin: 4 });
      canvas.toBlob(function (blob) {
        if (blob) {
          downloadFile(blob, "qrcode-" + pid + ".png");
          showToast("🖼️ QR Code baixado com sucesso!");
        }
      });
    };

    document.getElementById("posterDownloadQrSvgBtn").onclick = function () {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "baixou_qr_svg");
      if (!window.QRCode) return;
      var svgCode = window.QRCode.generateSVG(shareUrl, { size: 480, margin: 3 });
      var blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
      downloadFile(blob, "qrcode-" + pid + ".svg");
      showToast("📥 QR Code SVG baixado!");
    };

    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "abriu_card_a6");
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

        // Só envia e solta fogos quando AMBOS os critérios estiverem avaliados (> 0)
        var hasApresentacao = Number(updated.apresentacao) > 0;
        var hasProjeto = Number(updated.projeto) > 0;

        if (hasApresentacao && hasProjeto) {
          // Evita envio duplicado do mesmo voto consecutivo, mas permite alteração de nota ou novo voto
          var lastSentKey = "senai_last_eval_" + pid;
          var evalFingerprint = updated.apresentacao + "-" + updated.projeto;
          var lastSent = sessionStorage.getItem(lastSentKey);

          if (lastSent !== evalFingerprint) {
            sessionStorage.setItem(lastSentKey, evalFingerprint);
            markProjectRatingSubmitted(pid);
            updated.submitted = true;

            // Dispara efeito visual de fogos de artifício na página toda (dura 2 segundos)
            triggerFireworks();
            showToast(T("evalSaved") || "Avaliação salva! ⭐");

            if (window.Leads && typeof window.Leads.submitEvaluation === "function") {
              window.Leads.submitEvaluation(p, courseKey, updated);
            }
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
    var courseBadge = courseKey === "ds" ? "DS" : (courseKey === "eletroeletronica" || courseKey === "ele" ? "ELE" : "MEC");
    var img = resolveImg(p.imagem);
    var currentRatings = getProjectRatings(pid);
    var turmaText = formatTurma(p.turma);
    var membersText = formatMembers(p);

    var turmaSuffix = turmaText ? " (" + turmaText + ")" : "";
    var waMsg = (T("whatsappShareMsg") || "Confira o projeto *{nome}*{turma} do Workshop SENAI 2026:\n{url}")
      .replace("{nome}", p.nome || "")
      .replace("{turma}", turmaSuffix)
      .replace("{url}", shareUrl);
    var waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(waMsg);

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
      '<a class="modal-whatsapp-float" id="modalWhatsappFloatBtn" href="' + esc(waUrl) + '" target="_blank" rel="noopener" title="' + esc(T("shareWhatsapp")) + '" aria-label="' + esc(T("shareWhatsapp")) + '">' +
      WA_ICON_SVG +
      '</a>' +
      '<div class="modal-cover">' +
      (img
        ? '<img src="' + esc(img) + '" alt="' + esc(p.nome) + '">'
        : '<span class="ph">' + esc((p.nome || "?").charAt(0)) + '</span>') +
      '</div>' +
      '<div class="modal-scroll">' +
      '<div class="modal-meta-row">' +
      '<span class="modal-badge">' + courseBadge + ' · ' + esc(tr(c.turma)) + '</span>' +
      (turmaText ? '<span class="modal-badge modal-badge-turma">' + esc(turmaText) + '</span>' : '') +
      (!membersText && Number(p.alunos) > 0 ? '<span class="meta">' + p.alunos + ' ' + T("members") + '</span>' : '') +
      '<div class="modal-meta-actions">' +
      '<a class="btn-whatsapp-share" id="modalWhatsappBtn" href="' + esc(waUrl) + '" target="_blank" rel="noopener" title="' + esc(T("shareWhatsapp")) + '">' +
      WA_ICON_SVG +
      '<span>WhatsApp</span>' +
      '</a>' +
      '<button class="btn-qr-toggle" id="modalQrToggleBtn" aria-expanded="false" title="' + esc(T("qrToggle")) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
      '<span id="modalQrToggleText">' + esc(T("qrToggle")) + '</span>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '<h2 class="modal-title">' + esc(p.nome) + '</h2>' +
      '<h3 class="modal-sub">' + esc(p.subtitulo) + '</h3>' +
      renderModalScheduleHTML(p) +
      '<p class="modal-desc">' + esc(p.descricao) + '</p>' +
      (membersText
        ? '<div class="modal-members-box">' +
        '<span class="modal-members-icon" aria-hidden="true">👥</span>' +
        '<div class="modal-members-content">' +
        '<span class="modal-members-label">' + esc(T("groupMembers")) + '</span>' +
        '<span class="modal-members-list">' + esc(membersText) + '</span>' +
        '</div>' +
        '</div>'
        : '') +
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
      '<button class="btn-share-sec btn-share-a4" id="modalOpenA4PosterBtn">📄 ' + esc(T("openA4Poster")) + '</button>' +
      '<a class="btn-share-sec btn-share-wa" id="modalShareWaBtn" href="' + esc(waUrl) + '" target="_blank" rel="noopener">' + WA_ICON_SVG + ' WhatsApp</a>' +
      '<button class="btn-share-sec" id="modalDownloadSvgBtn">📥 ' + T("downloadSvg") + '</button>' +
      '<button class="btn-share-sec" id="modalDownloadPngBtn">🖼️ ' + T("downloadPng") + '</button>' +
      '<a class="btn-share-sec" href="' + esc(shareUrl) + '" target="_blank" rel="noopener">↗ ' + T("openNewTab") + '</a>' +
      '</div>' +
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

    if (qrToggleBtn) {
      qrToggleBtn.onclick = function () {
        if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "abriu_qr_code");
        openA4PosterModal(p, courseKey, index);
      };
    }

    var openA4Btn = document.getElementById("modalOpenA4PosterBtn");
    if (openA4Btn) {
      openA4Btn.onclick = function () {
        openA4PosterModal(p, courseKey, index);
      };
    }

    // Rastreia cliques nos botões de ação do modal
    var modalActions = document.getElementById("modalActions");
    if (modalActions) {
      modalActions.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a) return;
        if (a.hasAttribute("data-empty") || a.classList.contains("is-disabled")) return;
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

    function trackWhatsappShare() {
      if (window.Leads) window.Leads.trackProjectAction(p, courseKey, "compartilhou_whatsapp", { url: shareUrl });
    }
    var waBtn = document.getElementById("modalWhatsappBtn");
    if (waBtn) waBtn.onclick = trackWhatsappShare;
    var waFloatBtn = document.getElementById("modalWhatsappFloatBtn");
    if (waFloatBtn) waFloatBtn.onclick = trackWhatsappShare;
    var waShareBtn = document.getElementById("modalShareWaBtn");
    if (waShareBtn) waShareBtn.onclick = trackWhatsappShare;

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

    // 5 cliques rápidos no QR Code para abrir configuração oculta de URL base
    var qrClickCount = 0;
    var qrClickTimer = null;
    var qrFrame = document.getElementById("modalQrFrame");
    if (qrFrame) {
      qrFrame.addEventListener("click", function () {
        qrClickCount++;
        clearTimeout(qrClickTimer);
        qrClickTimer = setTimeout(function () { qrClickCount = 0; }, 1500);

        if (qrClickCount >= 5) {
          qrClickCount = 0;
          clearTimeout(qrClickTimer);
          var baseBox = document.getElementById("modalBaseUrlBox");
          if (baseBox) {
            var isOpen = baseBox.classList.toggle("is-open");
            if (isOpen) {
              showToast("⚙️ Configuração de URL ativada");
              baseBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
              var input = document.getElementById("modalBaseUrlInput");
              if (input) { input.focus(); input.select(); }
            }
          }
        }
      });
    }

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
    var cardEl = document.querySelector('[data-proj-id="' + esc(pid) + '"]') || document.getElementById("proj-" + index);
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

    var waPageMsg = (T("whatsappPageShareMsg") || "Confira o Workshop SENAI São Carlos 2026 - Mecatrônica e Desenvolvimento de Sistemas:\n{url}")
      .replace("{url}", homeUrl);
    var waPageUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(waPageMsg);

    var qrSvg = "";
    if (window.QRCode && typeof window.QRCode.generateSVG === "function") {
      qrSvg = window.QRCode.generateSVG(homeUrl, { size: 520, margin: 2 });
    }

    dialog.innerHTML =
      '<button class="modal-close" id="modalCloseBtn" aria-label="' + esc(T("close")) + '">&times;</button>' +
      '<a class="modal-whatsapp-float" id="pageQrWhatsappFloatBtn" href="' + esc(waPageUrl) + '" target="_blank" rel="noopener" title="' + esc(T("shareWhatsapp")) + '" aria-label="' + esc(T("shareWhatsapp")) + '">' +
      WA_ICON_SVG +
      '</a>' +
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
      '<a class="btn-share-sec btn-share-wa" id="pageQrShareWaBtn" href="' + esc(waPageUrl) + '" target="_blank" rel="noopener">' + WA_ICON_SVG + ' WhatsApp</a>' +
      '<button class="btn-share-sec" id="pageQrDownloadSvgBtn">📥 ' + T("downloadSvg") + '</button>' +
      '<button class="btn-share-sec" id="pageQrDownloadPngBtn">🖼️ ' + T("downloadPng") + '</button>' +
      '<a class="btn-share-sec" href="' + esc(homeUrl) + '" target="_blank" rel="noopener">↗ ' + T("openNewTab") + '</a>' +
      '</div>' +
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

    function trackPageWa() {
      if (window.Leads) {
        window.Leads.sendLead({
          tipo: "Lead Compartilhamento",
          pagina: "home",
          turma: "Geral",
          acao: "Compartilhou Página Inicial via WhatsApp",
          mensagem: "URL: " + homeUrl
        });
      }
    }
    var pageQrWaBtn = document.getElementById("pageQrShareWaBtn");
    if (pageQrWaBtn) pageQrWaBtn.onclick = trackPageWa;
    var pageQrWaFloatBtn = document.getElementById("pageQrWhatsappFloatBtn");
    if (pageQrWaFloatBtn) pageQrWaFloatBtn.onclick = trackPageWa;

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

    // 5 cliques rápidos no QR Code da página para abrir configuração oculta de URL base
    var pageQrClickCount = 0;
    var pageQrClickTimer = null;
    var pageQrFrame = document.getElementById("pageQrFrame");
    if (pageQrFrame) {
      pageQrFrame.addEventListener("click", function () {
        pageQrClickCount++;
        clearTimeout(pageQrClickTimer);
        pageQrClickTimer = setTimeout(function () { pageQrClickCount = 0; }, 1500);

        if (pageQrClickCount >= 5) {
          pageQrClickCount = 0;
          clearTimeout(pageQrClickTimer);
          var baseBox = document.getElementById("pageQrBaseUrlBox");
          if (baseBox) {
            var isOpen = baseBox.classList.toggle("is-open");
            if (isOpen) {
              showToast("⚙️ Configuração de URL ativada");
              baseBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
              var input = document.getElementById("pageQrBaseUrlInput");
              if (input) { input.focus(); input.select(); }
            }
          }
        }
      });
    }

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
        if (actionBtn.hasAttribute("data-empty") || actionBtn.classList.contains("is-disabled")) {
          return;
        }
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
    if (e.key === "Escape") {
      var posterM = document.getElementById("projectPosterModal");
      if (posterM && posterM.classList.contains("is-open")) {
        closePosterModal();
        return;
      }
      closeModal(true);
    }
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
    initFooterSecret();
  }

  /* ----- Acesso Secreto à Dashboard: 5 cliques no rodapé ----- */
  var footerSecretClicks = 0;
  var footerSecretTimer = null;

  function initFooterSecret() {
    var footer = document.querySelector(".footer");
    if (!footer) return;

    var copy = footer.querySelector(".copy");
    if (copy) {
      copy.style.userSelect = "none";
      copy.style.webkitUserSelect = "none";
    }

    footer.onclick = function (e) {
      if (e.target && e.target.closest("a, button, input, select, textarea")) return;

      footerSecretClicks++;
      clearTimeout(footerSecretTimer);
      footerSecretTimer = setTimeout(function () {
        footerSecretClicks = 0;
      }, 3000);

      if (footerSecretClicks >= 5) {
        footerSecretClicks = 0;
        var isCourse = document.body && document.body.getAttribute("data-page") !== "home";
        var dashUrl = isCourse ? "../dashboard.html" : "dashboard.html";
        window.location.href = dashUrl;
      }
    };
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
