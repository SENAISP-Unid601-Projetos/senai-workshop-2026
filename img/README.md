# 🖼️ Diretório de Imagens — Workshop SENAI 2026

Este diretório armazena as capas e materiais visuais do portal do Workshop SENAI 2026.

---

## 📁 Estrutura das Pastas

```text
img/
├── turmas/        # Capas oficiais das turmas (DS e Mecatrônica)
│   ├── ds.jpg           # (ou ds.png) Capa da turma de Desenvolvimento de Sistemas
│   └── mecatronica.jpg  # (ou mecatronica.png) Capa da turma de Mecatrônica
│
└── projetos/      # Capas dos projetos dos grupos
    ├── ds-1.jpg         # (ou .png) Capa do Projeto DS 1
    ├── ds-2.jpg         # Capa do Projeto DS 2...
    ├── mec-1.jpg        # Capa do Projeto Mecatrônica 1...
    └── ...
```

---

## 📐 Recomendações e Formatos

| Tipo | Resolução Recomendada | Proporção | Formatos Aceitos |
| :--- | :--- | :--- | :--- |
| **Capas de Turmas** | `1920 × 1080 px` | 16:9 widescreen | `.jpg`, `.jpeg`, `.png`, `.webp` |
| **Capas de Projetos** | `1280 × 720 px` ou `800 × 600 px` | 16:9 ou 4:3 | `.jpg`, `.jpeg`, `.png`, `.webp` |

> 💡 **Dica de Performance:** Mantenha os arquivos com peso inferior a **500 KB** (idealmente entre **80 KB e 300 KB**) para carregamento rápido em dispositivos móveis e redes de feiras/eventos.

---

## 🔗 Como Configurar em `js/data.js`

Basta apontar o caminho relativo a partir da raiz:

### 1. Capas das Turmas
```javascript
// js/data.js
cursos: {
  ds: {
    // ...
    imagem: "img/turmas/ds.jpg", // ou .png
  },
  mecatronica: {
    // ...
    imagem: "img/turmas/mecatronica.jpg", // ou .png
  }
}
```

### 2. Capas dos Projetos
```javascript
// js/data.js
projetos: [
  {
    id: "ds-1",
    nome: "Projeto DS 1",
    imagem: "img/projetos/ds-1.jpg", // ou .png
    // ...
  }
]
```

*(O sistema resolve automaticamente os caminhos corretos tanto na página inicial quanto dentro de `html/ds.html` e `html/mecatronica.html`)*.
