/* =====================================================================
   ARQUIVO DE CONTEÚDO  —  é AQUI que você edita o site.
   ---------------------------------------------------------------------
   Para cada projeto, preencha:
     id             -> identificador único para URL / QR Code (ex: "ds-1", "mec-1")
     nome           -> nome do projeto (aparece no carrossel, no card e no modal)
     subtitulo      -> frase curta de destaque
     descricao      -> resumo do projeto
     imagem         -> Capa ou logo (JPG ou PNG).
                       * Capas de turmas: salve em 'img/turmas/' (ex: 'img/turmas/ds.jpg' ou 'img/turmas/mecatronica.png')
                       * Capas de projetos: salve em 'img/projetos/' (ex: 'img/projetos/ds-1.jpg' ou 'img/projetos/mec-1.png')
                       * Deixe "" para usar a letra inicial / padrão visual.
     alunos         -> quantidade de integrantes do grupo (número)
     landing        -> link da LANDING PAGE do grupo        (botão "Visitar site")
     funcionamento  -> link do PITCH TÉCNICO (como o sistema funciona)  (botão "Funcionamento")
     comercial      -> link do PITCH COMERCIAL                          (botão "Comercial")

   Enquanto um link estiver vazio ("") o botão aparece como "Em breve".
   Para adicionar um projeto, copie um bloco { ... }, e cole na lista.
   Para remover, apague o bloco. Os contadores da home atualizam sozinhos.
   ===================================================================== */

window.SITE = {
  ano: 2026,

  /* Informações do Evento */
  evento: {
    data: "02 e 03 de Dezembro de 2026",
    horario: "Das 08h às 17h",
    diasSemana: { pt: "Quarta e Quinta-feira", en: "Wednesday and Thursday" },
    local: "Faculdade de Tecnologia e Escola SENAI Antonio Adolpho Lobbe",
    endereco: "R. Cândido Padim, 25 - Vila Prado, São Carlos - SP",
    mapsUrl: "https://maps.app.goo.gl/ERURVEKNRXTKch5o6",
    mapsEmbedUrl: "https://maps.google.com/maps?q=-22.0234009,-47.8972138&hl=pt-BR&z=16&output=embed"
  },

  /* URL base para os links dos QR Codes (quando publicado no GitHub Pages).
     Deixe "" para autodetectar o endereço atual no navegador.
     Exemplo: "https://seu-usuario.github.io/senai-workshop-2026" */
  baseUrl: "",

  /* URL do Web App do Google Apps Script para salvar leads no Google Sheets.
     Cole aqui a URL gerada na implantação do Apps Script (termina com /exec).
     Exemplo: "https://script.google.com/macros/s/AKfycb.../exec" */
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbxDJNvpZ07fTokYSDry66IOgwjDwDDi9c6kkj7XAUI5aTm_f1zB1AllYS-fLcDsTag/exec",

  /* URL do Web App dedicado para captura de e-mails e envio de lembretes (@docente.senai.br).
     Se preenchido, os cadastros de lembretes irão direto para essa planilha separada.
     Se deixado vazio (""), usará a googleSheetsUrl configurada acima. */
  newsletterSheetsUrl: "https://script.google.com/macros/s/AKfycbzu86ZjQpd54ztK94HLCh08OZ9CaxacWdwruK3QmAuzt5Fwlefq8fQZnEqS2Iug_MKA/exec",

  cursos: {
    ds: {
      pagina: "html/ds.html",
      nome: { pt: "Desenvolvimento de Sistemas", en: "Systems Development" },
      turma: { pt: "Turma 2026", en: "Class of 2026" },
      descricao: {
        pt: "Projetos em desenvolvimento web full-stack, mobile, banco de dados, IoT e sistemas inteligentes criados pelos grupos de trabalho da turma.",
        en: "Projects in full-stack web, mobile, databases, IoT and intelligent systems created by the class work groups."
      },
      // Capa da turma (local: "img/turmas/ds.png" ou URL externa)
      imagem: "img/turmas/ds.png",
      /* Campos suportados em cada projeto:
         - id: identificador único (ex: "ds-1", "mec-1")
         - nome: Nome do projeto
         - turma: Turma específica (ex: "Turma A", "Turma B", "1º Termo", etc.)
         - integrantes: Nomes dos participantes — aceita texto "Aluno 1, Aluno 2" ou lista ["Aluno 1", "Aluno 2"]
         - subtitulo: Frase de destaque/slogan
         - descricao: Resumo da solução e diferencial
         - imagem: Caminho da imagem de capa (ex: "img/projetos/ds-1.jpeg")
         - alunos: Quantidade de alunos (opcional se preencher integrantes)
         - landing: Link da landing page
         - funcionamento: Link do vídeo técnico (YouTube)
         - comercial: Link do vídeo comercial (YouTube)
      */
      projetos: [
        { id: "ds-1", nome: "Projeto DS 1", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-2", nome: "Projeto DS 2", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-3", nome: "Projeto DS 3", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-4", nome: "Projeto DS 4", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-5", nome: "Projeto DS 5", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-6", nome: "Projeto DS 6", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-7", nome: "Projeto DS 7", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-8", nome: "Projeto DS 8", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-9", nome: "Projeto DS 9", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-10", nome: "Projeto DS 10", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-11", nome: "Projeto DS 11", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-12", nome: "Projeto DS 12", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-13", nome: "Projeto DS 13", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-14", nome: "Projeto DS 14", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/ds-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" }
      ]
    },

    mecatronica: {
      pagina: "html/mecatronica.html",
      nome: { pt: "Mecatrônica", en: "Mechatronics" },
      turma: { pt: "Turma 2026", en: "Class of 2026" },
      descricao: {
        pt: "Projetos integrando robótica, automação industrial, eletrônica e programação embarcada para soluções mecatrônicas.",
        en: "Projects integrating robotics, industrial automation, electronics and embedded programming for mechatronic solutions."
      },
      // Capa da turma (local: "img/turmas/mec.png" ou URL externa)
      imagem: "img/turmas/mec.png",
      projetos: [
        { id: "mec-1", nome: "LatheVision", turma: "2IMEC-B", subtitulo: "LatheVision, sua produção, sempre à vista", descricao: "A LatheVision é uma solução de manutenção preditiva para tornos mecânicos, que monitora corrente, nível de óleo, rotação e vibração. Seu diferencial é integrar sensores em um único sistema, prevenindo falhas, reduzindo paradas e oferecendo um custo acessível às indústrias.", imagem: "img/projetos/mec-1.jpeg", alunos: 4, landing: "https://sites.google.com/aluno.senai.br/lathevision/in%C3%ADcio", funcionamento: "", comercial: "" },
        { id: "mec-2", nome: "Projeto MEC 2", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },

        { id: "mec-3", nome: "MecMonitor", turma: "2IMEC-B", subtitulo: "Transformando dados em decisões e equipamento em inteligência digital!", descricao: "A MecMonitor integra IoT e monitoramento inteligente para acompanhar equipamentos industriais, utilizando gêmeo digital e representação 3D para facilitar a visualização e análise de dados.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "https://sites.google.com/aluno.senai.br/mecmonitor/in%C3%ADcio", funcionamento: "https://youtu.be/4OZV84CrP4Q", comercial: "https://youtu.be/pIhB30Ymmsg" },

        { id: "mec-4", nome: "Projeto MEC 4", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-5", nome: "Projeto MEC 5", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },

        { id: "mec-6", nome: "Smart Factory", turma: "2IMEC-B", subtitulo: "SmartFactory, Antecipe falhas. Potencialize resultados.", descricao: "A SmartFactory oferece monitoramento inteligente de equipamentos rotativos, acompanhando vibração, temperatura e corrente elétrica. Com tecnologia IoT, permite monitorar os equipamentos remotamente, por qualquer dispositivo conectado à internet, auxiliando na prevenção de até 80% das falhas.", imagem: "img/projetos/mec-6.jpg", alunos: 0, landing: "https://sites.google.com/aluno.senai.br/smartfactory/in%C3%ADcio", funcionamento: "", comercial: "https://youtu.be/DaIIry128DA" },

        { id: "mec-7", nome: "Projeto MEC 7", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-8", nome: "Projeto MEC 8", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-9", nome: "Projeto MEC 9", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-10", nome: "Projeto MEC 10", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-11", nome: "Projeto MEC 11", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-12", nome: "Projeto MEC 12", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-13", nome: "Projeto MEC 13", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-14", nome: "Projeto MEC 14", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-15", nome: "Projeto MEC 15", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-1.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-16", nome: "Projeto MEC 16", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "img/projetos/mec-2.jpeg", alunos: 0, landing: "", funcionamento: "", comercial: "" }
      ]
    }
  },

  /* Equipe que desenvolveu o site (rodapé). Apague os blocos se não quiser exibir. */
  equipe: {
    lider: null,
    devs: [
      { nome: "Rafael de Sena Selvagio", instagram: "", github: "https://github.com/professor-rafael-selvagio" },
      { nome: "Wesley Pecoraro", instagram: "", github: "https://github.com/Wesleypec" }
    ]
  }
};
