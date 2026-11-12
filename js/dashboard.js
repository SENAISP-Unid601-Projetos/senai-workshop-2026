/**
 * =====================================================================
 * SENAI WORKSHOP 2026 — DASHBOARD DE AVALIAÇÕES E VISITAS
 * =====================================================================
 * Recursos:
 * - Atualização automática a cada 30 segundos com contador visual
 * - Botão de tela cheia (Fullscreen)
 * - Conexão ao Google Apps Script (doGet) com fallback mock
 * - Layout em 3 colunas: DS (esquerda) | Visitas (centro) | MEC (direita)
 * =====================================================================
 */

(function () {
  'use strict';

  const REFRESH_INTERVAL_SECONDS = 30;
  let countdownSeconds = REFRESH_INTERVAL_SECONDS;
  let countdownTimerId = null;

  // Base de dados de contingência (caso a planilha esteja vazia ou offline)
  const FALLBACK_MOCK = {
    visitas: {
      ds: 1024,
      mec: 818,
      total: 1842
    },
    ds: {
      top4: {
        projetos: ['1º DS-03: Smart Agri IoT', '2º DS-07: Logística Reversa', '3º DS-01: Portal IA Vagas', '4º DS-10: Visão Comp. EPI'],
        apresentacao: [5.0, 4.9, 4.7, 4.8],
        solucaoTecnica: [4.9, 4.8, 4.8, 4.6]
      },
      bottom4: {
        projetos: ['11º DS-08: Monitor Energia', '12º DS-02: Gestão Manutenção', '13º DS-14: Assistente FAQ', '14º DS-11: Portal Legado'],
        apresentacao: [3.7, 3.5, 3.4, 3.2],
        solucaoTecnica: [3.5, 3.3, 3.1, 3.0]
      },
      totalAvaliados: 14
    },
    mec: {
      top4: {
        projetos: ['1º MEC-02: Braço Robótico', '2º MEC-05: Célula 4.0', '3º MEC-08: AGV com Lidar', '4º MEC-01: Esteira Seletora'],
        apresentacao: [4.9, 4.7, 4.8, 4.6],
        solucaoTecnica: [4.9, 4.9, 4.7, 4.7]
      },
      bottom4: {
        projetos: ['13º MEC-06: Bancada Hidráulica', '14º MEC-10: Torno CNC Retrofit', '15º MEC-15: Solda Automática', '16º MEC-14: Testes Pneumáticos'],
        apresentacao: [3.8, 3.6, 3.4, 3.3],
        solucaoTecnica: [3.5, 3.3, 3.2, 3.0]
      },
      totalAvaliados: 16
    }
  };

  // Instâncias dos gráficos para limpeza
  let chartInstances = {
    visitasCenter: null,
    dsTop4: null,
    dsBottom4: null,
    mecTop4: null,
    mecBottom4: null
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

  // Atualiza badge de status de conexão
  function updateConnectionBadge(isLive, labelText) {
    const badge = document.getElementById('badge-connection-status');
    if (!badge) return;

    if (isLive) {
      badge.className = "badge-live";
      badge.innerHTML = `<span class="pulse-dot-green"></span> ${labelText || "Google Sheets Ao Vivo"}`;
      badge.title = "Dados sincronizados com a planilha em tempo real";
    } else {
      badge.className = "badge-mock";
      badge.innerHTML = `<span class="pulse-dot"></span> ${labelText || "Dados Simulados (Mock)"}`;
      badge.title = "Exibindo dados de simulação";
    }
  }

  // ===================================================================
  // 1. GRÁFICO CENTRAL: TOTAL GERAL DE VISITAS POR TURMA (DS vs MEC)
  // ===================================================================
  function renderVisitasCenterChart(visitasData) {
    const ctx = document.getElementById('chart-visitas-center');
    if (!ctx) return;
    if (chartInstances.visitasCenter) chartInstances.visitasCenter.destroy();

    const dsVal = visitasData.ds || 0;
    const mecVal = visitasData.mec || 0;
    const totalConsolidado = (dsVal + mecVal) || 1;

    // Atualiza cards numéricos do placar
    const dsEl = document.getElementById('kpi-ds-visitas');
    const mecEl = document.getElementById('kpi-mec-visitas');
    const totEl = document.getElementById('kpi-total-visitas');
    const dsPctEl = document.getElementById('kpi-ds-pct');
    const mecPctEl = document.getElementById('kpi-mec-pct');

    if (dsEl) dsEl.textContent = dsVal.toLocaleString('pt-BR');
    if (mecEl) mecEl.textContent = mecVal.toLocaleString('pt-BR');
    if (totEl) totEl.textContent = (dsVal + mecVal).toLocaleString('pt-BR');

    if (dsPctEl) dsPctEl.textContent = `${((dsVal / totalConsolidado) * 100).toFixed(1)}% das visitas`;
    if (mecPctEl) mecPctEl.textContent = `${((mecVal / totalConsolidado) * 100).toFixed(1)}% das visitas`;

    chartInstances.visitasCenter = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Dev. de Sistemas (DS)', 'Mecatrônica (MEC)'],
        datasets: [{
          label: 'Total Geral de Visitas',
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
                const pct = ((val / totalConsolidado) * 100).toFixed(1);
                return ` Total: ${val.toLocaleString('pt-BR')} visitas (${pct}%)`;
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
                return val.toLocaleString('pt-BR');
              }
            }
          }
        }
      }
    });
  }

  // ===================================================================
  // 2. FUNÇÃO REUTILIZÁVEL: RANKING DE 4 PROJETOS (2 CRITÉRIOS)
  // ===================================================================
  function renderRankingChart(canvasId, instanceKey, rankingData, isTop) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (chartInstances[instanceKey]) chartInstances[instanceKey].destroy();

    const colorApresentacao = isTop ? '#10b981' : '#f59e0b';
    const colorSolucao = isTop ? '#06b6d4' : '#f97316';

    const projetos = (rankingData && rankingData.projetos && rankingData.projetos.length > 0)
      ? rankingData.projetos
      : ['Sem avaliações ainda'];

    const apresentacao = (rankingData && rankingData.apresentacao && rankingData.apresentacao.length > 0)
      ? rankingData.apresentacao
      : [0];

    const solucaoTecnica = (rankingData && rankingData.solucaoTecnica && rankingData.solucaoTecnica.length > 0)
      ? rankingData.solucaoTecnica
      : [0];

    chartInstances[instanceKey] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: projetos,
        datasets: [
          {
            label: 'Apresentação',
            data: apresentacao,
            backgroundColor: colorApresentacao,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.85,
            categoryPercentage: 0.8
          },
          {
            label: 'Ideia e Solução Técnica',
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
            backgroundColor: '#141b2b',
            titleColor: '#eef2f8',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return ` ${context.dataset.label}: ${context.parsed.x.toFixed(1)} / 5.0`;
              },
              afterBody: function (items) {
                if (items.length >= 2) {
                  const media = ((items[0].parsed.x + items[1].parsed.x) / 2).toFixed(2);
                  return `\n⭐ Média Ponderada: ${media} / 5.0`;
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
              font: { size: 11, weight: '500' }
            }
          }
        }
      }
    });
  }

  // ===================================================================
  // CARREGAMENTO DOS DADOS (API GOOGLE SHEETS COM FALLBACK MOCK)
  // ===================================================================
  async function carregarDados() {
    setupChartDefaults();
    const apiUrl = getApiUrl();

    if (!apiUrl) {
      console.warn("[Dashboard] URL da API do Google Sheets não encontrada. Usando dados mock.");
      renderComDados(FALLBACK_MOCK, false, "Dados Simulados (Mock)");
      return;
    }

    try {
      updateConnectionBadge(false, "Sincronizando...");
      const response = await fetch(apiUrl, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const json = await response.json();

      if (json && json.status === "success") {
        console.log("[Dashboard] Dados reais recebidos do Google Sheets:", json);

        const dadosReais = {
          visitas: json.visitas || FALLBACK_MOCK.visitas,
          ds: {
            top4: (json.ds && json.ds.top4 && json.ds.top4.projetos && json.ds.top4.projetos.length > 0)
              ? json.ds.top4
              : FALLBACK_MOCK.ds.top4,
            bottom4: (json.ds && json.ds.bottom4 && json.ds.bottom4.projetos && json.ds.bottom4.projetos.length > 0)
              ? json.ds.bottom4
              : FALLBACK_MOCK.ds.bottom4,
            totalAvaliados: (json.ds && json.ds.totalAvaliados) || 0
          },
          mec: {
            top4: (json.mec && json.mec.top4 && json.mec.top4.projetos && json.mec.top4.projetos.length > 0)
              ? json.mec.top4
              : FALLBACK_MOCK.mec.top4,
            bottom4: (json.mec && json.mec.bottom4 && json.mec.bottom4.projetos && json.mec.bottom4.projetos.length > 0)
              ? json.mec.bottom4
              : FALLBACK_MOCK.mec.bottom4,
            totalAvaliados: (json.mec && json.mec.totalAvaliados) || 0
          }
        };

        renderComDados(dadosReais, true, "Google Sheets Ao Vivo");
        return;

      } else if (json && json.status === "empty") {
        console.warn("[Dashboard] Planilha vazia. Usando mock.");
        renderComDados(FALLBACK_MOCK, false, "Planilha Vazia (Usando Mock)");
        return;
      }

      throw new Error(json.message || "Resposta inválida da API");

    } catch (err) {
      console.warn("[Dashboard] Erro ao buscar Google Sheets. Usando dados mock como fallback:", err);
      renderComDados(FALLBACK_MOCK, false, "Offline (Modo Mock)");
    }
  }

  function renderComDados(data, isLive, badgeLabel) {
    updateConnectionBadge(isLive, badgeLabel);

    // 1. Centro: Visitas por Turma
    renderVisitasCenterChart(data.visitas);

    // 2. Esquerda: Dev. de Sistemas
    renderRankingChart('chart-ds-top4', 'dsTop4', data.ds.top4, true);
    renderRankingChart('chart-ds-bottom4', 'dsBottom4', data.ds.bottom4, false);

    // 3. Direita: Mecatrônica
    renderRankingChart('chart-mec-top4', 'mecTop4', data.mec.top4, true);
    renderRankingChart('chart-mec-bottom4', 'mecBottom4', data.mec.bottom4, false);

    // Atualiza contadores de projetos avaliados nos cabeçalhos
    const dsCountEl = document.getElementById('count-ds-avaliados');
    if (dsCountEl && data.ds.totalAvaliados !== undefined) {
      dsCountEl.textContent = `${data.ds.totalAvaliados} Avaliados`;
    }

    const mecCountEl = document.getElementById('count-mec-avaliados');
    if (mecCountEl && data.mec.totalAvaliados !== undefined) {
      mecCountEl.textContent = `${data.mec.totalAvaliados} Avaliados`;
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

  function updateFullscreenButtonState() {
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const labelEl = document.getElementById('fs-label');
    const btn = document.getElementById('btn-fullscreen');
    const iconEl = btn ? btn.querySelector('.fs-icon') : null;

    if (isFullscreen) {
      if (labelEl) labelEl.textContent = "Sair";
      if (iconEl) iconEl.textContent = "🗗";
      if (btn) btn.title = "Sair do modo Tela Cheia (ESC)";
    } else {
      if (labelEl) labelEl.textContent = "Tela Cheia";
      if (iconEl) iconEl.textContent = "⛶";
      if (btn) btn.title = "Alternar modo Tela Cheia";
    }
  }

  // ===================================================================
  // INICIALIZAÇÃO
  // ===================================================================
  function init() {
    // 1. Carga inicial dos dados
    carregarDados();

    // 2. Inicia contador de 30s
    startAutoRefreshTimer();

    // 3. Evento do botão Atualizar (Manual)
    const btnRefresh = document.getElementById('btn-refresh-data');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', function () {
        triggerRefresh(true);
      });
    }

    // 4. Evento do botão Fullscreen
    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    document.addEventListener('fullscreenchange', updateFullscreenButtonState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
