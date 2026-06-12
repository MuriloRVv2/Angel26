# 🌙🍥 Angelytta & Murilo — Forks encontra Konoha

Site romântico do casal: Crepúsculo (Angelytta) + Naruto (Murilo).
Juntos desde **16 de agosto de 2024**. 💛

## 📂 O que tem aqui

| Arquivo | Descrição |
|---|---|
| `index.html` | **O site pronto!** Um arquivo único com tudo embutido (React compilado, CSS, foto do casal em base64). É só abrir no navegador — funciona no PC e no celular. |
| `src/app.jsx` | Código-fonte React (componentes: Navbar, Hero, Contador, Linha do Tempo, Carta, Quiz, Playlist, Promessa, toasts, etc.) |
| `src/styles.css` | Todos os estilos do site (glassmorphism, animações, temas) |
| `src/photo.js` | Foto do casal embutida em base64 (gerada a partir de `uploads/`) |
| `src/photo_b64.txt` | A foto em base64 puro (arquivo intermediário do build) |
| `uploads/` | Foto original do casal |
| `build.sh` | Script que recompila o site após editar o código-fonte |
| `prompt-para-outras-ias.md` | Prompt completo para testar/gerar o mesmo site em outras IAs |
| `package.json` | Dependências do projeto (react, react-dom, esbuild) |

## ▶️ Como usar o site

1. Abra o `index.html` em qualquer navegador. Pronto! 🎉
2. Os players de música usam embeds do Spotify, então precisam de internet pra tocar.
   Sem login no Spotify toca uma prévia de 30s; logado no navegador, toca a faixa completa.

## 🛠️ Como editar o site

1. Instale o Node.js (https://nodejs.org)
2. Na pasta do projeto, rode:
   ```bash
   npm install
   bash build.sh
   ```
3. Edite `src/app.jsx` (conteúdo/lógica) ou `src/styles.css` (visual) e rode `bash build.sh` de novo — o `index.html` é regenerado com as mudanças.

## ✨ Funcionalidades

- Hero dividido Forks/Konoha com a foto do casal sob glassmorphism
- Contador de "imprinting" em tempo real + barra até o próximo aniversário
- Linha do tempo da saga do casal (livros de Crepúsculo × arcos de Naruto)
- Carta de amor em envelope clicável com selo Uzumaki
- Quiz "Você é mais Cullen ou mais Uzumaki?"
- Playlist com player do Spotify embutido (um por vez + equalizador)
- Promessa ninja-vampira
- UX/UI: navbar com scrollspy, barra de progresso de leitura, toggle de tema
  Forks/Konoha, animações ao rolar, chuva de corações, toasts, botão voltar
  ao topo, acessibilidade (aria-labels, prefers-reduced-motion)

---
Feito com chakra, veneno de vampiro e muito amor. 🦇🍃
