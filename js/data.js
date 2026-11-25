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
  data: "01, 02 e 03 de Dezembro de 2026",

  /* Informações do Evento */
  evento: {
    data: "01, 02 e 03 de Dezembro de 2026",
    horario: "Das 08h30 às 12h e das 13h30 às 17h",
    diasSemana: { pt: "Terça, Quarta e Quinta-feira", en: "Tuesday, Wednesday and Thursday" },
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
         - apresentacao: Dias e horários de apresentação por equipe:
             [
               { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
               { data: "03/12/2026", horario: "das 13h às 17h" }
             ]
         - alunos: Quantidade de alunos (opcional se preencher integrantes)
         - landing: Link da landing page
         - funcionamento: Link do vídeo técnico (YouTube)
         - comercial: Link do vídeo comercial (YouTube)
      */
      projetos: [
        {
          id: "ds-1",
          nome: "ParkSync",
          turma: "2IDS-SEDUC",
          integrantes: ["João Guilherme da Silva", "Emily Cesar Moreira", "Hudson Henrique Silva Bento", "Amanda Savoy Nunes"],
          subtitulo: "A segurança condominial, redefinida.",
          descricao: "O ParkSync é um sistema inteligente para gestão de estacionamentos em condomínios, que automatiza o acesso de moradores e o controle de vagas, proporcionando mais segurança, agilidade e organização, com monitoramento em tempo real pela portaria.",
          imagem: "img/projetos/ds-1.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://parksync-landing-page.onrender.com/",
          funcionamento: "",
          comercial: "https://youtu.be/E5x2HYuXN_A"
        },
        {
          id: "ds-2",
          nome: "AgroVision",
          turma: "2IDS-SEDUC",
          integrantes: ["Ryan Nicolas Alves Linhares", "Nicole Vitória dos Santos Barbosa", "Rafaella Figueiredo Trevelin", "Lukas Justyn Goes de Souza"],
          subtitulo: "Sistema de Agricultura de Precisão",
          descricao: "Sistema de agricultura de precisão que integra visão computacional, inteligência artificial e mapeamento aéreo simulado por drone para monitorar plantações e identificar áreas que necessitam de intervenção.",
          imagem: "img/projetos/ds-2.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://ryan22-ai.github.io/AgroVision-Site/",
          funcionamento: "",
          comercial: "https://youtu.be/vOEN_oBTHuU"
        },
        {
          id: "ds-3",
          nome: "TeenLab",
          turma: "2IDS-SEDUC",
          integrantes: ["Paola Laiane Araujo Pereira", "Rafael Gomes da Silva", "Sofia Marques", "Lorena da Silva Lima"],
          subtitulo: "FSeu Assistente Culinário",
          descricao: "Desenvolvimento de um robô assistente físico com inteligência artificial para orientar usuários no preparo de receitas culinárias, oferecendo instruções interativas e personalizadas em tempo real, tornando a experiência de cozinhar mais prática, acessível e eficiente.",
          imagem: "img/projetos/ds-3.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://lorenaslima6-rgb.github.io/bitbyte-landing-page/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-4",
          nome: "InnovaRoom",
          turma: "2IDS-SEDUC",
          integrantes: ["Gabriel da Silva Viana", "Laura da Silva Lopes", "Isabel de Aguiar Ciferri"],
          subtitulo: "Reservou, chegou, abriu.",
          descricao: "Sistema inteligente de reserva de salas integrado a um painel automatizado de chaves. O professor realiza a reserva antecipadamente e, no horário agendado, autentica sua identidade por biometria digital, reconhecimento facial ou crachá. A chave correspondente é liberada somente para usuários autorizados com reserva ativa, garantindo mais segurança, controle e praticidade.",
          imagem: "img/projetos/ds-4.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://gabrieldasilvaviana.github.io/ReservaDeSala-System1/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-5",
          nome: "Old Fly",
          turma: "2IDS-SEDUC",
          integrantes: ["Sophia Nunes", "Lucas Santos", "Rafael Teixeira"],
          subtitulo: "Mais cuidado, segurança e tranquilidade em cada dose!",
          descricao: "O Old Fly é um sistema inteligente que integra aplicativo e dispenser automatizado para auxiliar idosos e cuidadores no gerenciamento de medicamentos. Permite controlar doses, horários, receitas e estoque, com alertas de reposição e acesso personalizado. O dispenser realiza a liberação programada dos medicamentos, utilizando alarmes para proporcionar mais segurança, organização e autonomia no tratamento.",
          imagem: "img/projetos/ds-5.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://graceful-donut-514384.netlify.app/",
          funcionamento: "",
          comercial: "https://youtu.be/pFknP1iiuJc"
        },
        {
          id: "ds-6",
          nome: "PreZence",
          turma: "2IDS-SEDUC",
          integrantes: ["Adrielly Izidorio", "Kevyn Leal", "Jhon Santos", "Lexander Silva"],
          subtitulo: "O futuro da educação começa com a tecnologia.",
          descricao: "O PreZence é uma plataforma inteligente de gestão de frequência escolar que utiliza reconhecimento facial (FaceScan) para automatizar o registro de presença dos alunos. Integra alunos, professores e gestores em um ambiente digital, permitindo monitorar frequências, consultar informações acadêmicas e gerenciar turmas com mais agilidade, praticidade e segurança.",
          imagem: "img/projetos/ds-6.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://adriellyvis.github.io/Chamada-Senai-Landing/",
          funcionamento: "https://youtu.be/dGjn0l-_vRw?si=0mJuFkegajEW6nQ4",
          comercial: ""
        },
        {
          id: "ds-7",
          nome: "Vexto",
          turma: "2IDS-SC",
          integrantes: ["Alvaro Augusto da Silva Netto", "Emanuelli Vitória da Silva Couto", "Flávia Kamila de Almeida", "Jasmine de Lucca Izzi"],
          subtitulo: "Nossa agilidade, sua proteção!",
          descricao: "O projeto tem como objetivo facilitar e automatizar a distribuição de EPIs por meio de pontos de retirada estratégicos, permitindo que gestores acompanhem o histórico de entregas e consultem, de forma centralizada, quem retirou, qual equipamento foi retirado e quando ocorreu a retirada, garantindo maior controle, rastreabilidade e eficiência.",
          imagem: "img/projetos/ds-7.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://flaviaalmeiida.github.io/landing-page-/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-8",
          nome: "Clear Spaces",
          turma: "2IDS-SC",
          integrantes: ["Vinícius Bernardi Sant'Ana", "Júlio Cesar Pires Miranda dos Santos", "Luan Fernandes da Silva", "Letícia Salvador Ciscare"],
          subtitulo: "Ambientes limpos, organizados e prontos para você!.",
          descricao: "A Clear Spaces é uma plataforma inteligente para gerenciamento de limpeza de ambientes corporativos. O sistema permite organizar tarefas, acompanhar serviços realizados, controlar cronogramas e monitorar a execução das atividades, proporcionando mais eficiência, praticidade e qualidade na gestão dos espaços.",
          imagem: "img/projetos/ds-8.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://landingpageclearspaces.vercel.app/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-9",
          nome: "Ajuda+",
          turma: "2IDS-SC",
          integrantes: ["Alany de Castro Tanganelli dos Santos", "Ana Lívia De Carvalho Ferreira", "Emanuella Frederico", "Gabriel De Oliveira"],
          subtitulo: "Com o Ajuda+ o apoio e conexão é para você!",
          descricao: "O Ajuda+ é uma plataforma digital que reúne instituições de caridade em perfis detalhados e transparentes. A confiança do doador vem de extratos públicos que mostram toda a movimentação financeira de receitas e despesas de cada instituição. O sistema também facilita o ato de doar, com filtros por região e por tipo de apoio, e dá visibilidade às instituições com menos recursos, para que a ajuda seja distribuída de forma justa.",
          imagem: "img/projetos/ds-9.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://fredd-08.github.io/ajuda-landingpage/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-10",
          nome: "HelpSanca",
          turma: "2IDS-SC",
          integrantes: ["Giuliano D. Pau", "Gustavo de O. Arantes", "Ester L. Antoniazzi", "Gabrielle de L. Callé"],
          subtitulo: "O HelpSanca é uma plataforma colaborativa que permite aos cidadãos registrar, localizar e acompanhar problemas urbanos, como buracos nas vias, iluminação pública danificada e descarte irregular de lixo. A solução facilita a comunicação entre a população e os responsáveis pela manutenção da cidade, contribuindo para uma gestão urbana mais ágil, participativa e eficiente.",
          descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.",
          imagem: "img/projetos/ds-10.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://giulianodanellipau.github.io/HelpSanca-LandingPage/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-11",
          nome: "Beluga",
          turma: "2IDS-SC",
          integrantes: ["Eduarda Mazzari", "Guilherme Hideki", "Carlos Vicente", "Henzo Montanari"],
          subtitulo: "Visão na ponta dos dedos: tecnologia que transforma percepção em autonomia.",
          descricao: "O BELUGA é uma solução de tecnologia assistiva que utiliza inteligência artificial e visão computacional para identificar objetos por meio de uma câmera, transmitindo informações por áudio. A proposta é ampliar a autonomia, a acessibilidade e a independência dos colaboradores em seu ambiente de trabalho.",
          imagem: "img/projetos/ds-11.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://belugasite.vercel.app/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-12",
          nome: "FloodPath",
          turma: "2IDS-SC",
          integrantes: ["Nathan De Oliveira Pereira", "Rafaela Alves de Sousa", "Ryan Henrique Dos Santos Silva", "Stella Ribeiro Gomes"],
          subtitulo: "Frase de destaque do projetoDesvie dos alagamentos. Chegue com segurança!",
          descricao: "O FloodPath é um sistema inteligente que identifica e mapeia pontos de alagamento em tempo real, auxiliando motoristas e pedestres a evitar áreas de risco e encontrar rotas mais seguras durante períodos de chuva.",
          imagem: "img/projetos/ds-12.jpeg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://kapooll.github.io/Landing-page-floodpath/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-13",
          nome: "Zelo",
          turma: "2IDS-SC",
          integrantes: ["Lara Corsic", "Ruan Fernandes da Silva", "Maria Isabelle", "Kevin Correa"],
          subtitulo: "Autonomia para quem vive, tranquilidade para quem ama.",
          descricao: "Aplicativo desenvolvido para auxiliar idosos nas atividades do dia a dia, permitindo acompanhar rotinas, organizar tarefas e enviar lembretes importantes. A solução promove mais autonomia, segurança e qualidade de vida para os idosos, além de proporcionar tranquilidade e confiança aos familiares e cuidadores.",
          imagem: "img/projetos/ds-13.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://ruanfernandesdasilva.github.io/landing-page/",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ds-14",
          nome: "BusPass",
          turma: "2IDS-SC",
          integrantes: ["Vitor Derencio", "Leticia S. Meira", "Maria C. Feitosa", "Kauan Fernandes"],
          subtitulo: "Seu transporte, mais simples e conectado.",
          descricao: "O BusPass é uma solução inteligente de mobilidade urbana que facilita o acesso a informações sobre linhas, rotas e serviços de transporte público. Integrando uma plataforma digital à tecnologia RFID, busca tornar a experiência dos usuários mais prática, acessível e eficiente, contribuindo para um transporte mais conectado e moderno.",
          imagem: "img/projetos/ds-14.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://landing-page-wt6o.onrender.com/",
          funcionamento: "",
          comercial: ""
        }
      ]
    },

    eletroeletronica: {
      id: "eletroeletronica",
      pagina: "html/eletroeletronica.html",
      nome: { pt: "Eletroeletrônica", en: "Electronics" },
      turma: { pt: "Turma 2026", en: "Class of 2026" },
      descricao: {
        pt: "Manutenção, montagem e desenvolvimento de sistemas eletroeletrônicos industriais e prediais.",
        en: "Maintenance, assembly and development of industrial and building electrical and electronic systems."
      },
      imagem: "img/turmas/ele.jpeg",
      projetos: [
        {
          id: "ele-1",
          nome: "AutoSort",
          turma: "2IELE-SEDUC",
          integrantes: ["Bianca Cremonezzi", "Erick Kennedy", "Gabriel Casagrande Borges do Rosário", "Leticia Moreira Laurentino Leite", "Matheus Ferreira Patricio", "Rhuan Donda Cardoso"],
          subtitulo: "O futuro em boas mãos.",
          descricao: "O *AutoSort* é uma empresa responsável pelo projeto de retrofit de uma bancada didática de automação industrial, que busca modernizar sua estrutura por meio da atualização de componentes e da integração de um novo CLP. O sistema utiliza sensores ópticos para identificar diferentes tipos de peças e controlar sua movimentação e separação automática. O projeto tem como objetivo aproximar o ensino técnico das tecnologias utilizadas na indústria.",
          imagem: "img/projetos/ele-1.png",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/autosort?usp=sharing",
          funcionamento: "https://youtu.be/LZEhbVGpsmU?si=riTi2TbZa0w5ILxi",
          comercial: "https://youtu.be/Llgg_pCNkJw?si=jrdOpYIPPgZtMtEh"
        },
        {
          id: "ele-2",
          nome: "RACM",
          turma: "2IELE-SEDUC",
          integrantes: ["Eduardo Vieira Jacob", "Charles Wagner da Silva Bomfim", "David Sander da Silva dos Santos", "Vitor Gabriel Ramiro de Oliveira", "João Vitor Barbosa Martins"],
          subtitulo: "Modernizando o presente e construindo o futuro da indústria.",
          descricao: "O projeto consiste no retrofit de uma célula eletropneumática, visando modernizar equipamentos existentes, melhorar os processos de automação industrial e reduzir custos por meio do reaproveitamento de componentes.",
          imagem: "img/projetos/ele-2.png",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/racmproject/inicio",
          funcionamento: "https://youtu.be/PL5HY8tn3ng?si=o81csFdsYzURHmzI",
          comercial: "https://youtu.be/e2MF2aUY-hc?si=JHQNgwzY2xl4clnV"
        },
        {
          id: "ele-3",
          nome: "VotScan",
          turma: "2IELE-SEDUC",
          integrantes: ["João Pedro Nais", "Rafael Marques", "Vinicius Amos", "Albino lima", "Ruan Moraes"],
          subtitulo: "Mais prática, mais diagnóstico, mais aprendizado.",
          descricao: "O VoltScan é um projeto desenvolvido para auxiliar no ensino de manutenção elétrica, utilizando tecnologia para simular falhas em painéis elétricos. Por meio de uma ESP32, relés e um aplicativo, o sistema permite criar situações em que os alunos podem praticar a identificação e o diagnóstico de problemas, desenvolvendo habilidades técnicas e aproximando o aprendizado da realidade profissional.",
          imagem: "img/projetos/ele-3.png",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/testevoltwsss/in%C3%ADcio",
          funcionamento: "https://youtu.be/oYSSpK7R8Mc?is=J2pqvM3sBwL53zfQ",
          comercial: "https://youtube.com/shorts/otA-uUibR3s?is=RP9uTCZb-rApQyf8"
        },
        {
          id: "ele-4",
          nome: "Nexo",
          turma: "2IELE-SEDUC",
          integrantes: ["Ananda Caroline Lourenço da Silva", "Cauã Dotti Santos", "Daniel Santos Bezerra", "Lucas Camargo dos Santos", "Vinícius Henrique Menochelli"],
          subtitulo: "Conectando Ideias. Criando Soluções.",
          descricao: "O objetivo principal se resume em construir um kit didático funcional, auxiliar os alunos no de-senvolvimento de competências técnicas por meio de uma metodologia prática sim-ples e dinâmica, além disso, economizar tempo para que o docente conclua suas aulas com êxito.",
          imagem: "img/projetos/ele-4.png",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/view/projeto-nexo-kit/home",
          funcionamento: "https://youtube.com/shorts/_gDks0uWCyI?si=QciP-Kk1S5INFchS",
          comercial: "https://www.youtube.com/shorts/Ni2zi50d5OY"
        },
        {
          id: "ele-5",
          nome: "Celeste",
          turma: "2IELE-SEDUC",
          integrantes: ["Luiz Guilherme Costa", "Luiz Ricardo Leite", "Rafael Henrique Gonçalves Aguiar", "Juan Henrique da Silva Ribeiro"],
          subtitulo: "Inovação que conecta, e segurança que transforma.",
          descricao: "A Celeste Automação Elétrica é especializada em soluções inteligentes de automação e otimização de sistemas elétricos, desenvolvendo projetos que unem tecnologia, eficiência e segurança. Nosso compromisso é modernizar processos, reduzir desperdícios e aumentar a produtividade, oferecendo soluções inovadoras e confiáveis que transformam desafios em resultados.",
          imagem: "img/projetos/ele-5.png",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "",
          funcionamento: "",
          comercial: ""
        },
        {
          id: "ele-6",
          nome: "Haze",
          turma: "2IELE-SEDUC",
          integrantes: ["Carlos Fabricio Santos de Santana", "Claudio Boni Mazzini", "Christopher Henry Oliveira de Souza", "Omar Gomes Barbosa dos Reis", "Murillo Correa"],
          subtitulo: "Inteligência que acelera a sua produção.",
          descricao: "É um sistema automatizada que utiliza-se de sensores ópticos e indutivos para identificar os objetos que passam em sua esteira e selecioná-los por características específicas.  Seu papel numa indústria de reciclagem passa a ser essencial quando a demanda pede alta produtividade e um processamento de toneladas de resíduos por hora sem interrupção.",
          imagem: "img/projetos/ele-6.webp",
          alunos: 0,
          apresentacao: [
            { data: "01/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/linhaautomatizadaseparadoradep/vis%C3%A3o-geral",
          funcionamento: "",
          comercial: "https://www.youtube.com/watch?v=ZaypNz9lFbs"
        },
        {
          id: "ele-7",
          nome: "Predicta",
          turma: "4ELE-VW",
          integrantes: ["Anna Karolina Dantas dos Santos", "Christopher Silva da Costa", "Matheus Christian Papareli Barbosa", "Thaís de Oliveira"],
          subtitulo: "A um passo à frente.",
          descricao: "O SmartPredict é um sistema de manutenção preditiva industrial que coleta telemetria contínua de temperatura, vibração, pressão e umidade para antecipar falhas críticas. Executando inferência na borda (edge computing) em Raspberry Pi, o modelo de IA aprende a linha de base operacional da máquina e dispara alertas em tempo real via painel e ntfy ante anomalias, integrando documentação de engenharia com modelos 3D dos gabinetes.",
          imagem: "img/projetos/ele-7.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 16h30" }
          ],
          landing: "https://karolinadantas.github.io/predicta/",
          funcionamento: "https://www.youtube.com/shorts/n644lnowdko",
          comercial: "https://youtu.be/jeO7wPUNhGg?is=HmDhs_6S0pKw_Xkd"
        },
        {
          id: "ele-8",
          nome: "Trion",
          turma: "4ELE-VW",
          integrantes: ["Gabriel Mathias", "Gustavo Peixoto de Freitas", "Gustavo Silveira", "Vitor Hugo Gini Sala"],
          subtitulo: "Frase de destaque do projeto",
          descricao: "O projeto de Retrofit da Mesa Seletora do grupo TRION consiste na renovação e modernização do equipamento, com foco na integração de um CLP (Controlador Lógico Programável) ao sistema de controle. O trabalho também abrange a modernização dos componentes do sistema de separação entre peças já existente e a atualização dos cilindros pneumáticos, visando maior precisão, confiabilidade e eficiência operacional do conjunto.",
          imagem: "img/projetos/ele-8.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 16h30" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/trion/in%C3%ADcio",
          funcionamento: "https://youtu.be/p-D8j1IhhUA?si=RLQFhPTrJt1cvQej",
          comercial: "https://youtu.be/__tE0LGTysc?si=HdFK9eRUwFMzJT_j"
        },
        {
          id: "ele-9",
          nome: "Vision Tech",
          turma: "4ELE-VW",
          integrantes: ["Isabela Guimarães da Silva", "Jennifer Gabrielli Fonseca", "Leomardo de Oliveira Otaviano", "Lucas Sperandio"],
          subtitulo: "Tecnologia que enxerga.",
          descricao: "A VisionTech apresenta um projeto de modernização de uma mesa seletora, substituindo os sensores convencionais de identificação de tamanho e cor por uma solução baseada em ESP32 e câmera. Por meio da visão computacional, o sistema busca realizar a identificação dos objetos de forma mais simplificada, reduzindo a quantidade de sensores físicos e, consequentemente, a necessidade de manutenção.",
          imagem: "img/projetos/ele-9.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 16h30" }
          ],
          landing: "https://jegabriellifonseca-web.github.io/VISIONTECH/",
          funcionamento: "",
          comercial: "https://www.youtube.com/watch?v=J-OVlAiYMRw"
        }/*,
        {
          id: "ele-10",
          nome: "RetroTech",
          turma: "4ELE-VW",
          integrantes: ["Arthur Jacob de Paiva Santos", "Eduardo Minetto Corregliano", "Matheus de Rizzo Valério", "Pedro Miuel Gastaldi da Costa", "Rafael Ceschi Rufino"],
          subtitulo: "Frase de destaque do projeto",
          descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.",
          imagem: "img/projetos/mec-x.jpeg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 16h30" }
          ],
          landing: "",
          funcionamento: "",
          comercial: ""
        }*/
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
        {
          id: "mec-1",
          nome: "LatheVision",
          turma: "2IMEC-B",
          integrantes: ["Camilly Cardoso da Silva", "Grazieli Fornaziero de Melo", "Jhennifer Milena Silva", "Julia Rangel Gimenes"],
          subtitulo: "LatheVision, sua produção, sempre à vista",
          descricao: "A LatheVision é uma solução de manutenção preditiva para tornos mecânicos, que monitora corrente, nível de óleo, rotação e vibração. Seu diferencial é integrar sensores em um único sistema, prevenindo falhas, reduzindo paradas e oferecendo um custo acessível às indústrias.",
          imagem: "img/projetos/mec-1.jpeg",
          alunos: 4,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/lathevision/in%C3%ADcio",
          funcionamento: "https://youtu.be/W4yv00il-30?si=Dj0v7-xhAh2rdR9b",
          comercial: "https://youtu.be/uBuyZBMDfOs?si=8o5PJ-8WecO1SlDf"
        },
        {
          id: "mec-2",
          nome: "PrecisionTech",
          turma: "2IMEC-B",
          integrantes: ["Brenda Coelho Santos", "Guilherme Henrique Rosado", "Enzo Deresto", "Diego Montanari"],
          subtitulo: "Transformando precisão em inteligência; Inovando o futuro da furação.",
          descricao: "O objetivo do projeto é modernizar uma furadeira de bancada convencional por meio da automação e da tecnologia, tornando o processo de furação mais preciso, seguro e eficiente. Seu diferencial está na integração de sensores, laser e uma IHM, que permitem maior controle da operação, monitoramento das informações e facilidade de uso.",
          imagem: "img/projetos/mec-2.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/precisiontech/in%C3%ADcio",
          funcionamento: "https://youtu.be/1vd4hlzFCe0",
          comercial: "https://youtu.be/OYfu8zbrp1Q"
        },
        {
          id: "mec-3",
          nome: "MecMonitor",
          turma: "2IMEC-B",
          integrantes: ["Ana Laura Milani", "Esther Barbosa Celestino", "Gabriela dos Santos Martinez", "Isadora Rodrigues Papa"],
          subtitulo: "Transformando dados em decisões e equipamento em inteligência digital!",
          descricao: "A MecMonitor integra IoT e monitoramento inteligente para acompanhar equipamentos industriais, utilizando gêmeo digital e representação 3D para facilitar a visualização e análise de dados.",
          imagem: "img/projetos/mec-3.jpg",
          alunos: 4,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/mecmonitor/in%C3%ADcio",
          funcionamento: "https://youtu.be/aHWcUqvuHp4?si=6h6Z-o9V0vJpEK3F",
          comercial: "https://youtu.be/pIhB30Ymmsg"
        },
        {
          id: "mec-4",
          nome: "MicroWork",
          turma: "2IMEC-B",
          integrantes: ["Hiago Carneiro", "Arthur Matos", "Gustavo Trindade", "Andrey Tanan"],
          subtitulo: "Tecnologia compacta. Controle completo.",
          descricao: "O objetivo do MicroLogic é democratizar a automação para pequenas e médias empresas através de um CLP portátil e fácil de instalar. Seu principal diferencial é o preço bem menor que os modelos comuns, aliado ao código aberto sem licenças, acesso remoto em tempo real via IoT e controle de robôs.",
          imagem: "img/projetos/mec-4.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/micro-work/in%C3%ADcio",
          funcionamento: "https://youtu.be/lofR74d96lU",
          comercial: "https://youtu.be/67qOy0IFUao"
        },
        {
          id: "mec-5",
          nome: "MecaVision",
          turma: "2IMEC-B",
          integrantes: ["Luis Chiesse", "Natalia Sala", "Lucas Alves"],
          subtitulo: "Frase de destaque do projeto",
          descricao: "O projeto Monta Cubo tem como objetivo inovar o processo de montagem do cubo mágico utilizando visão computacional. Seu principal diferencial é oferecer três kits com diferentes propostas e funcionalidades, proporcionando versatilidade, acessibilidade e uma experiência tecnológica de aprendizagem.",
          imagem: "img/projetos/mec-5.jpeg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/docente.senai.br/mecavision?usp=sharing",
          funcionamento: "https://youtu.be/3Z-v8Awbyy0?is=niZgLOTVKH88JwX3",
          comercial: "https://youtu.be/ehDyFFJY30g?is=b9E8rV0ZaY9MojEu"
        },
        {
          id: "mec-6",
          nome: "Smart Factory",
          turma: "2IMEC-B",
          integrantes: ["Otávio Gialorenço", "Yasmim Gardino", "Leonardo Patracão", "Nicholas Cortez"],
          subtitulo: "SmartFactory, Antecipe falhas. Potencialize resultados.",
          descricao: "A SmartFactory oferece monitoramento inteligente de equipamentos rotativos, acompanhando vibração, temperatura e corrente elétrica. Com tecnologia IoT, permite monitorar os equipamentos remotamente, por qualquer dispositivo conectado à internet, auxiliando na prevenção de até 80% das falhas.",
          imagem: "img/projetos/mec-6.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/smartfactory/in%C3%ADcio",
          funcionamento: "https://youtu.be/bWXB2GlRraw",
          comercial: "https://youtu.be/DaIIry128DA"
        },
        {
          id: "mec-7",
          nome: "InkMix",
          turma: "2IMEC-B",
          integrantes: ["Maria Clara Pereira", "Pedro Henrique Escapolli Motta", "Peterson Alessandro Junior", "Luiz Fernando Cardoso Pinto"],
          subtitulo: "A cor certa na medida exata!",
          descricao: "A ColorSync oferece praticidade e agilidade na produção de tintas. Permitindo que a produção seja feita a partir do reconhecimento da cor de um cartão, assim permitindo que qualquer pessoa seja capaz de produzir uma cor. Nosso produto também conta com monitoramento por IoT.",
          imagem: "img/projetos/mec-7.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/inkmix1/in%C3%ADcio",
          funcionamento: "https://drive.google.com/file/d/1a08d__SYs85vxcJWslz4OZZkziXFEHWV/view?usp=drive_link",
          comercial: "https://drive.google.com/file/d/1BhUOrYhmE34pne4HtjW9KkPUgVg5wC2R/view?usp=drivesdk"
        },
        {
          id: "mec-8",
          nome: "FlowBotics",
          turma: "2IMEC-B",
          integrantes: ["Lívia Cardoso", "Lívia Caliel", "Lívia Santos", "Karyna Napolitano"],
          subtitulo: "CompactMover, Movimentando de forma mais inteligente, reduzindo riscos , acelerando o crescimento.",
          descricao: "O CompactMover, desenvolvido pela FlowBotics, é um AGV segue-linha equipado com sensores anticolisão, criado para eliminar os gargalos logísticos da movimentação manual de cargas. Uma solução autônoma e segura que otimiza o fluxo e a eficiência da sua operação.",
          imagem: "img/projetos/mec-8.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/cyberpipe/in%C3%ADcio",
          funcionamento: "https://youtu.be/ncgJ-N5UVG4",
          comercial: "https://youtu.be/EpUmotV35Mw?si=qxFlQ_I9Bm8GpOmi"
        },
        {
          id: "mec-9",
          nome: "PneuTech Automação",
          turma: "2IMEC-C",
          integrantes: ["Manuella Da Silva Pradela", "Pedro Augusto Oliveiora De Lima", "Yasmin Vitória Vanzetto", "Victor Hugo Pessota"],
          subtitulo: "Tecnologia, precisão e inovação em cada corte.",
          descricao: "A PneuCut automatiza o corte de mangueiras pneumáticas para tornar o processo mais rápido, seguro e padronizado. Seu principal diferencial é a precisão e uniformidade: garante cortes retos e na medida exata, evitando desperdícios, prevenindo vazamentos nas conexões e aumentando a produtividade da operação.",
          imagem: "img/projetos/mec-9.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/pneutech?usp=sharing",
          funcionamento: "https://youtu.be/rTpyQ92vSVU?si=RRCgzd6_5Qx03kZI",
          comercial: "https://youtu.be/CPDIH-O03U4?si=Dg1QkZCEruu-SsML"
        },
        {
          id: "mec-10",
          nome: "BRATORQ",
          turma: "2IMEC-C",
          integrantes: ["Isis Cristina Segnini Brodowsky", "Lara Rodrigues Callegaro", "Miguel Henrique Gionimi Rodrigues", "Rafael Aalexandre Zani"],
          subtitulo: "Mais precisão, menos esforço, melhores resultados.",
          descricao: "A BRATORQ é um projeto desenvolvido por técnicos em Mecatrônica, que une tecnologia, inovação e automação para facilitar os processos de trabalho. O equipamento consiste em uma furadeira integrada a um braço articulado, proporcionando maior precisão, estabilidade e praticidade nas operações de perfuração. A proposta é reduzir o esforço físico do operador, facilitar o manuseio da ferramenta e otimizar as atividades, oferecendo uma solução versátil e eficiente para diferentes aplicações.",
          imagem: "img/projetos/mec-10.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/bratorq/in%C3%ADcio",
          funcionamento: "https://www.youtube.com/watch?v=S9cxZcED_rc",
          comercial: "https://youtu.be/Dss8px-Ml50?feature=shared"
        },
        {
          id: "mec-11",
          nome: "MotorTech",
          turma: "2IMEC-C",
          integrantes: ["Lorena Maria Franco Galera", "Izabela Niza de Oliveira", "Letícia Saraiva Ferreira da Silva", "Isadora Caroline Massambani"],
          subtitulo: "Automação ao seu alcance!",
          descricao: "A solução da MotorTech é utilizar um braço robótico com garra, programado para montagem e desmontagem de motores e uma linha de produção, sistema de parada e retomada do mesmo ponto e sem necessidade de interferência humana constante. Pelo tamanho reduzido do robô, a instalação é móvel e com menor custo, gerando mais custo benefício ao cliente.",
          imagem: "img/projetos/mec-11.jpg",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/motortech/p%C3%A1gina-inicial",
          funcionamento: "https://youtu.be/emsoAGRS53U?si=odFWWNdVva6ad4DV",
          comercial: "https://youtu.be/a3GSUYtcUbE?si=7_TwsibmukGdeyC3"
        },
        {
          id: "mec-12",
          nome: "AFID Machining",
          turma: "2IMEC-C",
          integrantes: ["Arthur Seifert", "Daniel Ramos", "Felipe Fuzato", "Isabela Pedrozo"],
          subtitulo: "Transformando ideias em circuitos, com precisão e inovação.",
          descricao: "O projeto AFID Machining consiste no desenvolvimento de uma CNC Router voltada à fabricação e prototipagem de placas de circuito impresso (PCBs), com o objetivo de tornar esse processo mais acessível, prático e preciso. Desenvolvida por estudantes de Mecatrônica, a máquina utiliza três eixos de movimentação (X, Y e Z), motores de passo e um sistema de controle automatizado para executar trajetórias de usinagem a partir de comandos digitais. Atualmente em fase de desenvolvimento e montagem, o projeto busca integrar conhecimentos de mecânica, eletrônica e programação, oferecendo uma solução que facilite a criação de protótipos eletrônicos e incentive a inovação tecnológica.",
          imagem: "img/projetos/mec-12.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/afidmachining/in%C3%ADcio",
          funcionamento: "https://www.youtube.com/watch?v=7AjiiXWqtWg",
          comercial: "https://www.youtube.com/watch?v=lOqLGV1QoPs"
        },
        {
          id: "mec-13",
          nome: "MOLDCORE",
          turma: "2IMEC-C",
          integrantes: ["Gustavo Micheletti", "Aline Moraes", "Andressa Sebin", "Gustavo da Silva"],
          subtitulo: "Moldando o seu futuro.",
          descricao: "A MOLDCORE tem como objetivo desenvolver uma mini injetora plástica compacta, de baixo custo e fácil utilização.Seu diferencial está no controle eletrônico de temperatura, acionamento manual e uso de materias reutilizados, oferecendo uma alternativa acessível para a produção de pequenas peças plásticas.",
          imagem: "img/projetos/mec-13.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/moldcore/in%C3%ADcio",
          funcionamento: "https://www.youtube.com/watch?v=S1LuXnuzmKw",
          comercial: "https://www.youtube.com/watch?v=wanKp92rB04"
        },
        {
          id: "mec-14",
          nome: "WeldTorno",
          turma: "2IMEC-C",
          integrantes: ["Breno Rafael", "Gleison Santos", "Bruno Gabriel", "Gabriel Lino"],
          subtitulo: "Transformando inovação em movimento, precisão em cada giro e eficiência em cada solda.",
          descricao: "O WeldTorno surgiu a partir da necessidade de facilitar o processo de soldagem de peças cilíndricas, proporcionando uma rotação controlada e contínua durante a execução da solda. ",
          imagem: "img/projetos/mec-14.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/weldturn/in%C3%ADcio",
          funcionamento: "https://www.youtube.com/watch?v=IJF09taypvw",
          comercial: "https://www.youtube.com/watch?v=hvCYlfhIV3Q"
        },
        {
          id: "mec-15",
          nome: "NeoPress",
          turma: "2IMEC-C",
          integrantes: ["Ana Rubia Pedro", "Anna Julia Paris", "Ana Julia Viana", "Amanda de Lúcia"],
          subtitulo: "Inovação que ensina.",
          descricao: "Desenvolver uma prensa pneumática didática, compacta e segura, com o objetivo de modernizar o ensino técnico, aproximando os estudantes da realidade industrial e proporcionando uma aprendizagem prática em pneumática, comandos elétricos e dispositivos de segurança, considerando os requisitos da NR-12.",
          imagem: "img/projetos/mec-15.png",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://canva.link/ekrbuztgzn3y8ar",
          funcionamento: "https://youtu.be/M09hCnvOHok?si=JOSJQ7JFdF46fZkP",
          comercial: "https://youtu.be/cu7i8MbM_sY?si=wkAdPAHUDa35ExBD"
        },
        {
          id: "mec-16",
          nome: "NexusAtlas",
          turma: "2IMEC-C",
          integrantes: ["João Victor de Oliveira", "Kenid Isak Correa", "Isac Adorno Machado", "Octávio Alves Boaventura"],
          subtitulo: "SynchroArm, em sincronia com o futuro.",
          descricao: "O SynchroArm tem como diferencial a integração entre robótica, automação e Realidade Virtual, utilizando um Gêmeo Digital para controlar e visualizar um braço robótico remotamente. Seu objetivo é tornar operações industriais mais seguras, reduzindo a exposição humana a ambientes de risco.",
          imagem: "img/projetos/mec-16.webp",
          alunos: 0,
          apresentacao: [
            { data: "02/12/2026", horario: "das 13h30 às 17h" },
            { data: "03/12/2026", horario: "das 8h30 às 12h e das 13h30 às 17h" }
          ],
          landing: "https://sites.google.com/aluno.senai.br/nexusatlas/in%C3%ADcio",
          funcionamento: "https://youtu.be/YWlLSevBkzs?si=VtKE27a8S4rMoRUP",
          comercial: "https://youtu.be/AU6h155QdM8?si=qbYUoQfa07lO1pEw"
        }
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
