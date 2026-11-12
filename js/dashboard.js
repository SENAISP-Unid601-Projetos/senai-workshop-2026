/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — DASHBOARD DE AVALIAÇÕES E VISITAS (TOP 5)
 * =====================================================================
 * Recursos:
 * - Top 5 Mais Bem Votados & Top 5 Menos Votados (DS e MEC)
 * - Visitas no centro: contabiliza estritamente acessos à turma e projetos
 *   (ignora acessos gerais à home)
 * - Fallback inteligente: se não houver dados, lista os 5 primeiros
 *   projetos em ordem alfabética
 * - Suporta requisições via fetch e JSONP (compatibilidade total com file://)
 * - Atualização automática a cada 30 segundos com contador visual
 * - Modo Tela Cheia (Fullscreen)
 * =====================================================================
 */

(function () {
  'use strict';

  const REFRESH_INTERVAL_SECONDS = 30;
  let countdownSeconds = REFRESH_INTERVAL_SECONDS;
  let countdownTimerId = null;

  // Dicionário de Internacionalização (Português / Inglês)
  const DASH_I18N = {
    pt: {
      docTitle: "SENAI Workshop 2026 — Rankings e Visitas",
      headerTitle: "Workshop 2026 • Painel de Rankings & Visitas",
      headerSubtitle: "Critérios de avaliação: Apresentação vs. Ideia e Solução Técnica",
      badgeLoading: "Carregando...",
      badgeLive: "Google Sheets Ao Vivo",
      badgeAlphabetical: "Ordem Alfabética",
      badgeEmpty: "Planilha Vazia (Ordem Alfabética)",
      badgeOffline: "Offline (Ordem Alfabética)",
      badgeConnectedNoVotes: "Google Sheets Conectado (Sem votos ainda)",
      badgeTooltipLive: "Dados sincronizados com a planilha em tempo real",
      badgeTooltipMock: "Aguardando avaliações na planilha",
      btnRefresh: "Atualizar",
      btnRefreshTitle: "Atualizar dados agora (reseta o timer)",
      btnFullscreen: "Tela Cheia",
      btnFullscreenExit: "Sair",
      btnFullscreenTitle: "Alternar modo Tela Cheia",
      btnFullscreenExitTitle: "Sair do modo Tela Cheia (ESC)",
      btnBack: "← Voltar ao Site",
      btnLangTitle: "Alterar idioma: Português / English",
      noProjects: "Sem projetos",

      // Colunas
      colDs: "💻 Dev. de Sistemas",
      colMec: "⚙️ Mecatrônica",
      colCenter: "📊 Visitas na Turma e Projetos",
      colCenterSub: "DS vs. Mecatrônica",

      // Rankings
      topBestTitle: "Top 5 Mais Bem Votados",
      topBestSub: "Notas de 0 a 5.0 nos 2 critérios",
      topBestBadge: "🏆 Top 5",
      topWorstTitle: "Top 5 Menos Votados",
      topWorstSub: "Menores médias registradas",
      topWorstBadge: "⚠️ Top 5 Menos Votados",

      // Contadores
      evaluatedCount: "Avaliados",
      projectsCount: "Projetos",

      // KPI Placar
      kpiDsLabel: "Dev. de Sistemas",
      kpiMecLabel: "Mecatrônica",
      kpiPctSub: "das visitas",

      // Gráficos
      chartCenterLabels: ['Dev. de Sistemas (DS)', 'Mecatrônica (MEC)'],
      chartCenterDataset: 'Visitas na Turma e Projetos',
      chartCenterTooltipTotal: 'Total',
      chartCenterTooltipVisits: 'visitas',
      criteriaPresentation: 'Apresentação',
      criteriaSolution: 'Ideia e Solução Técnica',
      chartTooltipNoVotes: 'Sem votos ainda',
      chartTooltipAlphabetical: '(Exibindo em ordem alfabética)',
      chartTooltipAverage: 'Média Ponderada'
    },
    en: {
      docTitle: "SENAI Workshop 2026 — Rankings & Visits",
      headerTitle: "Workshop 2026 • Rankings & Visits Dashboard",
      headerSubtitle: "Evaluation criteria: Presentation vs. Technical Idea & Solution",
      badgeLoading: "Loading...",
      badgeLive: "Google Sheets Live",
      badgeAlphabetical: "Alphabetical Order",
      badgeEmpty: "Empty Sheet (Alphabetical Order)",
      badgeOffline: "Offline (Alphabetical Order)",
      badgeConnectedNoVotes: "Google Sheets Connected (No votes yet)",
      badgeTooltipLive: "Data synchronized in real time with spreadsheet",
      badgeTooltipMock: "Waiting for evaluations in spreadsheet",
      btnRefresh: "Refresh",
      btnRefreshTitle: "Refresh data now (resets timer)",
      btnFullscreen: "Fullscreen",
      btnFullscreenExit: "Exit",
      btnFullscreenTitle: "Toggle Fullscreen mode",
      btnFullscreenExitTitle: "Exit Fullscreen mode (ESC)",
      btnBack: "← Back to Site",
      btnLangTitle: "Switch language: Portuguese / English",
      noProjects: "No projects",

      // Colunas
      colDs: "💻 Systems Development",
      colMec: "⚙️ Mechatronics",
      colCenter: "📊 Class & Project Visits",
      colCenterSub: "DS vs. Mechatronics",

      // Rankings
      topBestTitle: "Top 5 Highest Rated",
      topBestSub: "Scores from 0 to 5.0 in both criteria",
      topBestBadge: "🏆 Top 5",
      topWorstTitle: "Top 5 Lowest Rated",
      topWorstSub: "Lowest recorded averages",
      topWorstBadge: "⚠️ Top 5 Lowest Rated",

      // Contadores
      evaluatedCount: "Evaluated",
      projectsCount: "Projects",

      // KPI Placar
      kpiDsLabel: "Systems Dev.",
      kpiMecLabel: "Mechatronics",
      kpiPctSub: "of visits",

      // Gráficos
      chartCenterLabels: ['Systems Dev. (DS)', 'Mechatronics (MEC)'],
      chartCenterDataset: 'Class and Project Visits',
      chartCenterTooltipTotal: 'Total',
      chartCenterTooltipVisits: 'visits',
      criteriaPresentation: 'Presentation',
      criteriaSolution: 'Technical Idea & Solution',
      chartTooltipNoVotes: 'No votes yet',
      chartTooltipAlphabetical: '(Showing in alphabetical order)',
      chartTooltipAverage: 'Weighted Average'
    }
  };

  // Idioma ativo sincronizado com o localStorage do site principal
  let currentLang = "pt";
  try {
    currentLang = localStorage.getItem("lang") || "pt";
  } catch (e) {}

  function getI18n() {
    return DASH_I18N[currentLang] || DASH_I18N.pt;
  }

  // Cache dos últimos dados para re-renderização instantânea ao trocar de idioma
  let lastLoadedData = null;
  let lastIsLive = false;
  let lastStatusKey = "badgeLoading";

  // Instâncias dos gráficos para limpeza de memória
  let chartInstances = {
    visitasCenter: null,
    dsTop5: null,
    dsBottom5: null,
    mecTop5: null,
    mecBottom5: null
  };

  function setupChartDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
    Chart.defaults.color = '#8e9db5';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
  }

  // Obtém a URL do Web App do Google Apps Script
  function getApiUrl() {
    var custom = "";
    try { custom = localStorage.getItem("custom_sheets_url"); } catch (e) {}
    if (custom && custom.trim()) return custom.trim();
    if (window.SITE && window.SITE.googleSheetsUrl && window.SITE.googleSheetsUrl.trim()) {
      return window.SITE.googleSheetsUrl.trim();
    }
    return "";
  }

  // Gera os 5 primeiros projetos ordenados alfabeticamente para quando não houver dados no Google Sheets
  function getAlphabeticalFallback(courseKey) {
    let nomes = [];

    if (window.SITE && window.SITE.cursos && window.SITE.cursos[courseKey] && window.SITE.cursos[courseKey].projetos) {
      nomes = window.SITE.cursos[courseKey].projetos
        .map(p => (p.nome && p.nome.trim() ? p.nome.trim() : (p.id || "")))
        .filter(n => n.length > 0);
    }

    if (nomes.length === 0) {
      nomes = courseKey === 'ds'
        ? ['Projeto DS 1', 'Projeto DS 2', 'Projeto DS 3', 'Projeto DS 4', 'Projeto DS 5']
        : ['Projeto MEC 1', 'Projeto MEC 2', 'Projeto MEC 3', 'Projeto MEC 4', 'Projeto MEC 5'];
    }

    // Ordenação alfabética natural (DS 1, DS 2, DS 3...)
    nomes.sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' }));

    const primeiros5 = nomes.slice(0, 5);
    const ordinal = (idx) => currentLang === 'en' ? `${idx + 1}.` : `${idx + 1}º`;

    return {
      projetos: primeiros5.map((nome, idx) => `${ordinal(idx)} ${nome}`),
      apresentacao: [0, 0, 0, 0, 0],
      solucaoTecnica: [0, 0, 0, 0, 0],
      isAlphabetical: true
    };
  }

  // Normaliza o ranking vindo da API para até 5 itens (suportando top5, top4 e top3)
  function normalizarRanking(rankingObj, courseKey) {
    if (!rankingObj || !rankingObj.projetos || rankingObj.projetos.length === 0) {
      return getAlphabeticalFallback(courseKey);
    }

    const maxItems = 5;
    const projetos = rankingObj.projetos.slice(0, maxItems);
    const apresentacao = (rankingObj.apresentacao || []).slice(0, maxItems);
    const solucaoTecnica = (rankingObj.solucaoTecnica || []).slice(0, maxItems);

    return {
      projetos: projetos,
      apresentacao: apresentacao,
      solucaoTecnica: solucaoTecnica,
      isAlphabetical: false
    };
  }

  // Atualiza badge de status de conexão no cabeçalho
  function updateConnectionBadge(isLive, statusKey) {
    const badge = document.getElementById('badge-connection-status');
    if (!badge) return;

    lastIsLive = isLive;
    if (statusKey) lastStatusKey = statusKey;

    const t = getI18n();
    const label = t[lastStatusKey] || lastStatusKey;

    if (isLive) {
      badge.className = "badge-live";
      badge.innerHTML = `<span class="pulse-dot-green"></span> <span id="badge-status-text">${label}</span>`;
      badge.title = t.badgeTooltipLive;
    } else {
      badge.className = "badge-mock";
      badge.innerHTML = `<span class="pulse-dot"></span> <span id="badge-status-text">${label}</span>`;
      badge.title = t.badgeTooltipMock;
    }
  }

  // ===================================================================
  // 1. GRÁFICO CENTRAL: TOTAL DE VISITAS NA TURMA E PROJETOS (DS vs MEC)
  // ===================================================================
  function renderVisitasCenterChart(visitasData) {
    const ctx = document.getElementById('chart-visitas-center');
    if (!ctx) return;
    if (chartInstances.visitasCenter) chartInstances.visitasCenter.destroy();

    const t = getI18n();
    const locale = currentLang === "pt" ? "pt-BR" : "en-US";

    const dsVal = (visitasData && Number(visitasData.ds)) || 0;
    const mecVal = (visitasData && Number(visitasData.mec)) || 0;
    const totalConsolidado = (dsVal + mecVal) || 1;

    // Atualiza cards numéricos do placar (apenas DS e MEC)
    const dsEl = document.getElementById('kpi-ds-visitas');
    const mecEl = document.getElementById('kpi-mec-visitas');
    const dsPctEl = document.getElementById('kpi-ds-pct');
    const mecPctEl = document.getElementById('kpi-mec-pct');

    if (dsEl) dsEl.textContent = dsVal.toLocaleString(locale);
    if (mecEl) mecEl.textContent = mecVal.toLocaleString(locale);

    if (dsPctEl) {
      dsPctEl.textContent = (dsVal + mecVal > 0)
        ? `${((dsVal / totalConsolidado) * 100).toFixed(1)}% ${t.kpiPctSub}`
        : `0% ${t.kpiPctSub}`;
    }

    if (mecPctEl) {
      mecPctEl.textContent = (dsVal + mecVal > 0)
        ? `${((mecVal / totalConsolidado) * 100).toFixed(1)}% ${t.kpiPctSub}`
        : `0% ${t.kpiPctSub}`;
    }

    chartInstances.visitasCenter = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: t.chartCenterLabels,
        datasets: [{
          label: t.chartCenterDataset,
          data: [dsVal, mecVal],
          backgroundColor: ['#0a6cff', '#e4002b'],
          borderRadius: 12,
          borderSkipped: false,
          maxBarThickness: 80
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#141b2b',
            titleColor: '#eef2f8',
            bodyColor: '#eef2f8',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function (context) {
                const val = context.parsed.y;
                const pct = (dsVal + mecVal > 0) ? ((val / totalConsolidado) * 100).toFixed(1) : "0";
                return ` ${t.chartCenterTooltipTotal}: ${val.toLocaleString(locale)} ${t.chartCenterTooltipVisits} (${pct}%)`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { weight: '600', size: 12 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              callback: function (val) {
                return val.toLocaleString(locale);
              }
            }
          }
        }
      }
    });
  }

  // ===================================================================
  // 2. FUNÇÃO REUTILIZÁVEL: RANKING DE PROJETOS (2 CRITÉRIOS)
  // ===================================================================
  function renderRankingChart(canvasId, instanceKey, rankingData, isTop) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (chartInstances[instanceKey]) chartInstances[instanceKey].destroy();

    const t = getI18n();
    const colorApresentacao = isTop ? '#10b981' : '#f59e0b';
    const colorSolucao = isTop ? '#06b6d4' : '#f97316';

    const count = (rankingData && rankingData.projetos) ? rankingData.projetos.length : 0;
    const projetos = count > 0 ? rankingData.projetos : [t.noProjects || 'Sem projetos'];
    const apresentacao = (rankingData && rankingData.apresentacao && rankingData.apresentacao.length > 0)
      ? rankingData.apresentacao
      : new Array(projetos.length).fill(0);
    const solucaoTecnica = (rankingData && rankingData.solucaoTecnica && rankingData.solucaoTecnica.length > 0)
      ? rankingData.solucaoTecnica
      : new Array(projetos.length).fill(0);

    const isAlpha = rankingData && rankingData.isAlphabetical;

    chartInstances[instanceKey] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: projetos,
        datasets: [
          {
            label: t.criteriaPresentation,
            data: apresentacao,
            backgroundColor: colorApresentacao,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.85,
            categoryPercentage: 0.8
          },
          {
            label: t.criteriaSolution,
            data: solucaoTecnica,
            backgroundColor: colorSolucao,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.85,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              padding: 10,
              font: { size: 11, weight: '600' }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#141b2b',
            titleColor: '#eef2f8',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function (context) {
                if (isAlpha) {
                  return ` ${context.dataset.label}: ${t.chartTooltipNoVotes}`;
                }
                const valor = Number(context.parsed.x) || 0;
                return ` ${context.dataset.label}: ${valor.toFixed(1)} / 5.0`;
              },
              afterBody: function (items) {
                if (isAlpha) {
                  return `\n${t.chartTooltipAlphabetical}`;
                }
                if (items && items.length >= 2) {
                  const v1 = Number(items[0].parsed.x) || 0;
                  const v2 = Number(items[1].parsed.x) || 0;
                  const media = ((v1 + v2) / 2).toFixed(2);
                  return `\n⭐ ${t.chartTooltipAverage}: ${media} / 5.0`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 5,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              stepSize: 1,
              font: { size: 10 }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { size: 10.5, weight: '500' }
            }
          }
        }
      }
    });
  }

  // ===================================================================
  // CARREGAMENTO DOS DADOS (SUPORTA FETCH E JSONP PARA TESTES LOCAIS)
  // ===================================================================
  function fetchJsonp(url) {
    return new Promise((resolve, reject) => {
      const callbackName = 'gas_cb_' + Math.round(100000 * Math.random());
      const script = document.createElement('script');
      const sep = url.indexOf('?') === -1 ? '?' : '&';
      script.src = `${url}${sep}callback=${callbackName}&t=${Date.now()}`;

      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error('Timeout ao carregar dados do Google Sheets'));
      }, 10000);

      function cleanup() {
        if (timeoutId) clearTimeout(timeoutId);
        if (script.parentNode) script.parentNode.removeChild(script);
        delete window[callbackName];
      }

      window[callbackName] = function (data) {
        cleanup();
        resolve(data);
      };

      script.onerror = function (err) {
        cleanup();
        reject(err);
      };

      document.head.appendChild(script);
    });
  }

  async function carregarDados() {
    setupChartDefaults();
    const apiUrl = getApiUrl();

    if (!apiUrl) {
      console.warn("[Dashboard] URL do Google Sheets não configurada. Usando ordem alfabética.");
      renderFallbackAlfabetico("Ordem Alfabética (Sem URL)");
      return;
    }

    updateConnectionBadge(false, "Sincronizando...");

    let json = null;

    // Tentativa 1: Fetch padrão
    try {
      const response = await fetch(apiUrl, { method: "GET" });
      if (response.ok) {
        json = await response.json();
      }
    } catch (e) {
      // Ignora erro de fetch (ex: CORS de file://) e tenta JSONP
    }

    // Tentativa 2: JSONP (perfeito para quando o arquivo é aberto via file:/// no navegador)
    if (!json) {
      try {
        json = await fetchJsonp(apiUrl);
      } catch (e) {
        console.warn("[Dashboard] Falha nas tentativas de fetch e JSONP:", e);
      }
    }

    if (json && json.status === "success") {
      console.log("[Dashboard] Dados recebidos com sucesso do Google Sheets:", json);

      // Suporta top5, top4 e top3 da API
      const dsRawTop = (json.ds && (json.ds.top5 || json.ds.top4 || json.ds.top3)) || null;
      const dsRawBottom = (json.ds && (json.ds.bottom5 || json.ds.bottom4 || json.ds.bottom3)) || null;
      const mecRawTop = (json.mec && (json.mec.top5 || json.mec.top4 || json.mec.top3)) || null;
      const mecRawBottom = (json.mec && (json.mec.bottom5 || json.mec.bottom4 || json.mec.bottom3)) || null;

      const totalDsAvaliados = (json.ds && json.ds.totalAvaliados) || 0;
      const totalMecAvaliados = (json.mec && json.mec.totalAvaliados) || 0;

      const dadosFinais = {
        visitas: json.visitas || { ds: 0, mec: 0, total: 0 },
        ds: {
          top5: totalDsAvaliados > 0 ? normalizarRanking(dsRawTop, 'ds') : getAlphabeticalFallback('ds'),
          bottom5: totalDsAvaliados > 0 ? normalizarRanking(dsRawBottom, 'ds') : getAlphabeticalFallback('ds'),
          totalAvaliados: totalDsAvaliados
        },
        mec: {
          top5: totalMecAvaliados > 0 ? normalizarRanking(mecRawTop, 'mecatronica') : getAlphabeticalFallback('mecatronica'),
          bottom5: totalMecAvaliados > 0 ? normalizarRanking(mecRawBottom, 'mecatronica') : getAlphabeticalFallback('mecatronica'),
          totalAvaliados: totalMecAvaliados
        }
      };

      const statusKey = (totalDsAvaliados > 0 || totalMecAvaliados > 0)
        ? "badgeLive"
        : "badgeConnectedNoVotes";

      renderComDados(dadosFinais, true, statusKey);
      return;

    } else if (json && json.status === "empty") {
      console.warn("[Dashboard] Planilha vazia. Usando ordem alfabética.");
      renderFallbackAlfabetico("badgeEmpty");
      return;
    }

    console.warn("[Dashboard] Usando ordem alfabética como fallback.");
    renderFallbackAlfabetico("badgeOffline");
  }

  function renderFallbackAlfabetico(statusKey) {
    const fallbackData = {
      visitas: { ds: 0, mec: 0, total: 0 },
      ds: {
        top5: getAlphabeticalFallback('ds'),
        bottom5: getAlphabeticalFallback('ds'),
        totalAvaliados: 0
      },
      mec: {
        top5: getAlphabeticalFallback('mecatronica'),
        bottom5: getAlphabeticalFallback('mecatronica'),
        totalAvaliados: 0
      }
    };
    renderComDados(fallbackData, false, statusKey || "badgeOffline");
  }

  function renderComDados(data, isLive, statusKey) {
    lastLoadedData = data;
    lastIsLive = isLive;
    if (statusKey) lastStatusKey = statusKey;

    const t = getI18n();

    updateConnectionBadge(isLive, lastStatusKey);

    // 1. Centro: Visitas por Turma (apenas acessos na turma e projetos)
    renderVisitasCenterChart(data.visitas);

    // 2. Esquerda: Dev. de Sistemas (Top 5 Mais e Top 5 Menos)
    renderRankingChart('chart-ds-top5', 'dsTop5', data.ds.top5, true);
    renderRankingChart('chart-ds-bottom5', 'dsBottom5', data.ds.bottom5, false);

    // 3. Direita: Mecatrônica (Top 5 Mais e Top 5 Menos)
    renderRankingChart('chart-mec-top5', 'mecTop5', data.mec.top5, true);
    renderRankingChart('chart-mec-bottom5', 'mecBottom5', data.mec.bottom5, false);

    // Atualiza contadores nos cabeçalhos
    const dsCountEl = document.getElementById('count-ds-avaliados');
    if (dsCountEl) {
      dsCountEl.textContent = data.ds.totalAvaliados > 0
        ? `${data.ds.totalAvaliados} ${t.evaluatedCount}`
        : t.badgeAlphabetical;
    }

    const mecCountEl = document.getElementById('count-mec-avaliados');
    if (mecCountEl) {
      mecCountEl.textContent = data.mec.totalAvaliados > 0
        ? `${data.mec.totalAvaliados} ${t.evaluatedCount}`
        : t.badgeAlphabetical;
    }
  }

  // ===================================================================
  // CONTROLE DO TIMER DE ATUALIZAÇÃO AUTOMÁTICA (30s)
  // ===================================================================
  function updateTimerPill() {
    const pill = document.getElementById('refresh-timer');
    if (pill) {
      pill.textContent = `${countdownSeconds}s`;
    }
  }

  function startAutoRefreshTimer() {
    if (countdownTimerId) clearInterval(countdownTimerId);
    countdownSeconds = REFRESH_INTERVAL_SECONDS;
    updateTimerPill();

    countdownTimerId = setInterval(() => {
      countdownSeconds--;

      if (countdownSeconds <= 0) {
        countdownSeconds = REFRESH_INTERVAL_SECONDS;
        updateTimerPill();
        triggerRefresh(false);
      } else {
        updateTimerPill();
      }
    }, 1000);
  }

  function triggerRefresh(isManual) {
    const btnRefresh = document.getElementById('btn-refresh-data');
    const icon = btnRefresh ? btnRefresh.querySelector('.refresh-icon') : null;

    if (icon) icon.style.transform = 'rotate(360deg)';
    if (btnRefresh) btnRefresh.style.opacity = '0.6';

    carregarDados().finally(() => {
      setTimeout(() => {
        if (icon) icon.style.transform = 'none';
        if (btnRefresh) btnRefresh.style.opacity = '1';
      }, 400);
    });

    if (isManual) {
      countdownSeconds = REFRESH_INTERVAL_SECONDS;
      updateTimerPill();
    }
  }

  // ===================================================================
  // CONTROLE DE TELA CHEIA (FULLSCREEN)
  // ===================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // Redimensionamento seguro e performático de todas as instâncias Chart.js
  function triggerChartsResize() {
    for (const k in chartInstances) {
      if (chartInstances[k]) {
        try {
          chartInstances[k].resize();
        } catch (e) {
          // ignora instâncias em transição ou descartadas
        }
      }
    }
  }

  function triggerChartsResizeSequence() {
    // Escalonamento em múltiplos intervalos para cobrir as animações nativas de tela cheia do macOS (~300ms a 700ms)
    const ticks = [50, 150, 300, 500, 750, 1000];
    ticks.forEach(delay => {
      setTimeout(triggerChartsResize, delay);
    });
  }

  function updateFullscreenButtonState() {
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const labelEl = document.getElementById('fs-label');
    const btn = document.getElementById('btn-fullscreen');
    const iconEl = btn ? btn.querySelector('.fs-icon') : null;

    document.documentElement.classList.toggle('is-fullscreen', isFullscreen);
    document.body.classList.toggle('is-fullscreen', isFullscreen);

    const t = getI18n();

    if (isFullscreen) {
      if (labelEl) labelEl.textContent = t.btnFullscreenExit;
      if (iconEl) iconEl.textContent = "🗗";
      if (btn) btn.title = t.btnFullscreenExitTitle;
    } else {
      if (labelEl) labelEl.textContent = t.btnFullscreen;
      if (iconEl) iconEl.textContent = "⛶";
      if (btn) btn.title = t.btnFullscreenTitle;
    }

    // Redimensiona todos os gráficos Chart.js com escalonamento para garantir layout perfeito
    triggerChartsResizeSequence();
  }

  // ===================================================================
  // APLICAÇÃO E TRANSIÇÃO DE IDIOMA (I18N)
  // ===================================================================
  function applyLanguage() {
    const t = getI18n();
    document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
    document.title = t.docTitle;

    const badgePt = document.getElementById('lang-badge-pt');
    const badgeEn = document.getElementById('lang-badge-en');
    if (badgePt && badgeEn) {
      if (currentLang === 'pt') {
        badgePt.classList.add('active');
        badgeEn.classList.remove('active');
      } else {
        badgePt.classList.remove('active');
        badgeEn.classList.add('active');
      }
    }

    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = currentLang === "pt" ? "EN" : "PT";

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) {
      btnLang.title = t.btnLangTitle;
      btnLang.setAttribute('aria-label', currentLang === 'pt' ? 'Idioma: Português (clique para alternar para Inglês)' : 'Language: English (click to switch to Portuguese)');
    }

    const titleEl = document.getElementById('dash-title');
    if (titleEl) titleEl.textContent = t.headerTitle;

    const subEl = document.getElementById('dash-sub');
    if (subEl) subEl.textContent = t.headerSubtitle;

    const refreshLabel = document.getElementById('refresh-label');
    if (refreshLabel) refreshLabel.textContent = t.btnRefresh;

    const btnRefresh = document.getElementById('btn-refresh-data');
    if (btnRefresh) btnRefresh.title = t.btnRefreshTitle;

    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.textContent = t.btnBack;

    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const fsLabel = document.getElementById('fs-label');
    if (fsLabel) fsLabel.textContent = isFullscreen ? t.btnFullscreenExit : t.btnFullscreen;

    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) btnFullscreen.title = isFullscreen ? t.btnFullscreenExitTitle : t.btnFullscreenTitle;

    // Colunas
    const pillDs = document.getElementById('pill-ds-label');
    if (pillDs) pillDs.textContent = t.colDs;

    const pillCenter = document.getElementById('pill-center-label');
    if (pillCenter) pillCenter.textContent = t.colCenter;

    const pillCenterSub = document.getElementById('pill-center-sub');
    if (pillCenterSub) pillCenterSub.textContent = t.colCenterSub;

    const pillMec = document.getElementById('pill-mec-label');
    if (pillMec) pillMec.textContent = t.colMec;

    // Card Titles, Subtitles & Badges
    const dsBestTitle = document.getElementById('ds-best-title');
    if (dsBestTitle) dsBestTitle.textContent = t.topBestTitle;
    const dsBestSub = document.getElementById('ds-best-sub');
    if (dsBestSub) dsBestSub.textContent = t.topBestSub;
    const dsBestBadge = document.getElementById('ds-best-badge');
    if (dsBestBadge) dsBestBadge.textContent = t.topBestBadge;

    const dsWorstTitle = document.getElementById('ds-worst-title');
    if (dsWorstTitle) dsWorstTitle.textContent = t.topWorstTitle;
    const dsWorstSub = document.getElementById('ds-worst-sub');
    if (dsWorstSub) dsWorstSub.textContent = t.topWorstSub;
    const dsWorstBadge = document.getElementById('ds-worst-badge');
    if (dsWorstBadge) dsWorstBadge.textContent = t.topWorstBadge;

    const mecBestTitle = document.getElementById('mec-best-title');
    if (mecBestTitle) mecBestTitle.textContent = t.topBestTitle;
    const mecBestSub = document.getElementById('mec-best-sub');
    if (mecBestSub) mecBestSub.textContent = t.topBestSub;
    const mecBestBadge = document.getElementById('mec-best-badge');
    if (mecBestBadge) mecBestBadge.textContent = t.topBestBadge;

    const mecWorstTitle = document.getElementById('mec-worst-title');
    if (mecWorstTitle) mecWorstTitle.textContent = t.topWorstTitle;
    const mecWorstSub = document.getElementById('mec-worst-sub');
    if (mecWorstSub) mecWorstSub.textContent = t.topWorstSub;
    const mecWorstBadge = document.getElementById('mec-worst-badge');
    if (mecWorstBadge) mecWorstBadge.textContent = t.topWorstBadge;

    // KPI Labels
    const kpiDs = document.getElementById('kpi-ds-label');
    if (kpiDs) kpiDs.textContent = t.kpiDsLabel;
    const kpiMec = document.getElementById('kpi-mec-label');
    if (kpiMec) kpiMec.textContent = t.kpiMecLabel;

    // Atualiza status badge
    updateConnectionBadge(lastIsLive, lastStatusKey);

    // Se já tiver dados carregados, re-renderiza os gráficos e contadores com o novo idioma
    if (lastLoadedData) {
      renderComDados(lastLoadedData, lastIsLive, lastStatusKey);
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === "pt" ? "en" : "pt";
    try {
      localStorage.setItem("lang", currentLang);
    } catch (e) {}
    applyLanguage();
  }

  function setLanguage(lang) {
    if (lang !== "pt" && lang !== "en") return;
    if (currentLang === lang) return;
    currentLang = lang;
    try {
      localStorage.setItem("lang", currentLang);
    } catch (e) {}
    applyLanguage();
  }

  // ===================================================================
  // INICIALIZAÇÃO
  // ===================================================================
  function init() {
    // Sincroniza tema dark/light salvo no site principal
    try {
      const savedTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);
    } catch (e) {}

    // Aplica idioma inicial
    applyLanguage();

    carregarDados();
    startAutoRefreshTimer();

    const btnRefresh = document.getElementById('btn-refresh-data');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', function () {
        triggerRefresh(true);
      });
    }

    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) {
      btnLang.addEventListener('click', function (e) {
        const badgePt = document.getElementById('lang-badge-pt');
        const badgeEn = document.getElementById('lang-badge-en');
        if (e.target === badgePt) {
          setLanguage('pt');
        } else if (e.target === badgeEn) {
          setLanguage('en');
        } else {
          toggleLanguage();
        }
      });
    }

    // Sincronização em tempo real caso o usuário altere tema ou idioma no site principal em outra aba
    window.addEventListener('storage', function (e) {
      if (e.key === 'lang' && e.newValue && e.newValue !== currentLang) {
        currentLang = e.newValue;
        applyLanguage();
      }
      if (e.key === 'theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
    });

    document.addEventListener('fullscreenchange', updateFullscreenButtonState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);

    // Redimensionamento de janela com debounce
    let winResizeTimer = null;
    window.addEventListener('resize', () => {
      if (winResizeTimer) clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(triggerChartsResize, 100);
    });

    // ResizeObserver no container de layout para estabilizar dimensões automaticamente
    if (window.ResizeObserver) {
      let roTimer = null;
      const ro = new ResizeObserver(() => {
        if (roTimer) clearTimeout(roTimer);
        roTimer = setTimeout(triggerChartsResize, 60);
      });
      const layoutEl = document.querySelector('.dash-trio-layout');
      if (layoutEl) ro.observe(layoutEl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
