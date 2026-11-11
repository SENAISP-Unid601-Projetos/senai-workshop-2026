/* =====================================================================
   ARQUIVO DE CONTEÚDO  —  é AQUI que você edita o site.
   ---------------------------------------------------------------------
   Para cada projeto, preencha:
     id             -> identificador único para URL / QR Code (ex: "ds-1", "mec-1")
     nome           -> nome do projeto (aparece no carrossel, no card e no modal)
     subtitulo      -> frase curta de destaque
     descricao      -> resumo do projeto
     imagem         -> URL da logo/imagem (deixe "" para usar o padrão do curso)
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

  /* URL base para os links dos QR Codes (quando publicado no GitHub Pages).
     Deixe "" para autodetectar o endereço atual no navegador.
     Exemplo: "https://seu-usuario.github.io/senai-workshop-2026" */
  baseUrl: "",

  /* URL do Web App do Google Apps Script para salvar leads no Google Sheets.
     Cole aqui a URL gerada na implantação do Apps Script (termina com /exec).
     Exemplo: "https://script.google.com/macros/s/AKfycb.../exec" */
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbxDJNvpZ07fTokYSDry66IOgwjDwDDi9c6kkj7XAUI5aTm_f1zB1AllYS-fLcDsTag/exec",

  cursos: {
    ds: {
      pagina: "html/ds.html",
      nome: { pt: "Desenvolvimento de Sistemas", en: "Systems Development" },
      turma: { pt: "Turma 2026", en: "Class of 2026" },
      descricao: {
        pt: "Projetos em desenvolvimento web full-stack, mobile, banco de dados, IoT e sistemas inteligentes criados pelos grupos de trabalho da turma.",
        en: "Projects in full-stack web, mobile, databases, IoT and intelligent systems created by the class work groups."
      },
      imagem: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop",
      projetos: [
        { id: "ds-1", nome: "Projeto DS 1", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-2", nome: "Projeto DS 2", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-3", nome: "Projeto DS 3", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-4", nome: "Projeto DS 4", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-5", nome: "Projeto DS 5", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-6", nome: "Projeto DS 6", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-7", nome: "Projeto DS 7", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-8", nome: "Projeto DS 8", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-9", nome: "Projeto DS 9", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-10", nome: "Projeto DS 10", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-11", nome: "Projeto DS 11", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-12", nome: "Projeto DS 12", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-13", nome: "Projeto DS 13", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "ds-14", nome: "Projeto DS 14", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" }
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
      imagem: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&h=1080&fit=crop",
      projetos: [
        { id: "mec-1", nome: "Projeto MEC 1", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-2", nome: "Projeto MEC 2", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-3", nome: "Projeto MEC 3", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-4", nome: "Projeto MEC 4", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-5", nome: "Projeto MEC 5", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-6", nome: "Projeto MEC 6", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-7", nome: "Projeto MEC 7", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-8", nome: "Projeto MEC 8", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-9", nome: "Projeto MEC 9", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-10", nome: "Projeto MEC 10", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-11", nome: "Projeto MEC 11", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-12", nome: "Projeto MEC 12", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-13", nome: "Projeto MEC 13", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-14", nome: "Projeto MEC 14", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-15", nome: "Projeto MEC 15", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" },
        { id: "mec-16", nome: "Projeto MEC 16", subtitulo: "Frase de destaque do projeto", descricao: "Descreva aqui o objetivo e o diferencial do projeto do grupo.", imagem: "", alunos: 0, landing: "", funcionamento: "", comercial: "" }
      ]
    }
  },

  /* Equipe que desenvolveu o site (rodapé). Apague os blocos se não quiser exibir. */
  equipe: {
    lider: { nome: "Nome do Tech Lead", instagram: "", github: "" },
    devs: [
      { nome: "Nome do Desenvolvedor 1", instagram: "", github: "" },
      { nome: "Nome do Desenvolvedor 2", instagram: "", github: "" }
    ]
  }
};
