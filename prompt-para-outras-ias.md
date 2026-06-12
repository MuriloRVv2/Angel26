# Prompt para testar em outras IAs 🧪

Copie e cole o texto abaixo em outras IAs (ChatGPT, Gemini, Copilot, etc.) para comparar o resultado:

---

Crie um site romântico de página única usando **React** (pode ser via CDN com Babel standalone, ou um bundle único — o resultado final deve ser um único arquivo HTML que funciona ao abrir no navegador) para um casal: **Angelytta**, que ama a saga Crepúsculo, e **Murilo**, que ama Naruto. Estamos juntos desde **16 de agosto de 2024**.

O site deve ter o tema "Forks encontra Konoha" e conter as seguintes seções e funcionalidades:

## Seções de conteúdo

1. **Hero dividido ao meio com foto do casal e glassmorphism**: uma foto do casal (fornecida por mim — usar como imagem de fundo embutida em base64 ou um placeholder) cobre o hero inteiro como background. Por cima dela ficam dois painéis de vidro translúcidos (glassmorphism com `backdrop-filter: blur` + gradientes semitransparentes), de modo que a foto apareça "ofuscada" através do vidro: o painel esquerdo com a estética de Forks/Crepúsculo (vidro em tons frios de azul, névoa, floresta e lua em SVG) e a frase "E assim o leão se apaixonou pela ovelha"; o painel direito com a estética de Konoha/Naruto (vidro em tons quentes de laranja, símbolo da Vila da Folha em SVG) e a frase "Eu nunca volto atrás na minha palavra. Esse é o meu jeito ninja!". No centro, um card com os nomes "Angelytta & Murilo". Os ícones SVG devem flutuar suavemente (animação CSS) e deve haver uma seta animada de "role para baixo".

2. **Contador de "imprinting"** em tempo real (dias, horas, minutos e segundos juntos desde 16/08/2024), com referência ao imprinting dos lobos de La Push. Incluir também uma **barra de progresso até o próximo aniversário de namoro**, mostrando quantos dias faltam.

3. **Linha do tempo do namoro** onde cada fase corresponde a um livro da saga Crepúsculo E a um arco de Naruto ao mesmo tempo (ex.: início = "Crepúsculo / Arco da Apresentação", desafios = "Lua Nova / Exame Chunin", etc.), com efeito de hover que desloca o card.

4. **Carta de amor** do Murilo para a Angelytta, no estilo dramático do Edward Cullen terminando com referências de Naruto ("nindô", "jeito ninja"), em visual de pergaminho e selada com a espiral do clã Uzumaki em SVG. A carta deve começar **fechada como um envelope 💌 clicável** e abrir com animação de "desdobrar" ao clicar, com botão para fechar de novo.

5. **Quiz interativo** "Você é mais Cullen ou mais Uzumaki?" com 4 perguntas divertidas, **barra de progresso de perguntas respondidas**, botão de revelar desabilitado até responder tudo (mostrando quantas faltam), resultado com animação de "pop" (incluindo empate "Cullen-Uzumaki") e botão de refazer o teste.

6. **Playlist do casal com players do Spotify sempre visíveis**: cards misturando músicas de Crepúsculo (A Thousand Years — Christina Perri, Flightless Bird American Mouth — Iron & Wine, Bella's Lullaby — Carter Burwell) com músicas de Naruto (Blue Bird — Ikimono-gakari, Madara Flexzone — MHRAP, Tipo Sasukezin — MHRAP). Cada card mostra o nome/origem da faixa e, logo abaixo, um iframe embed do Spotify **já carregado e visível** (`https://open.spotify.com/embed/track/ID?utm_source=generator&theme=0`, altura 152px, `loading="lazy"`) — sem precisar clicar em botão de play para o player aparecer. Grade responsiva com cards largos (mínimo ~390px, máximo 2 colunas, centralizada com max-width ~860px) para o player do Spotify caber confortavelmente.

7. **Promessa final** "ninja-vampira": ele jura pelo nindô, ela jura "para todo o sempre", com os nomes e a data 16/08/2024.

## Elementos de UX/UI (todos como componentes/estado React)

- **Barra de progresso de leitura** fixa no topo, mostrando o quanto da página já foi rolado (gradiente azul → dourado → laranja).
- **Navbar fixa** que aparece só depois de rolar meia tela, com links suaves para cada seção e **scrollspy** (a seção visível fica destacada na navbar), usando IntersectionObserver.
- **Toggle de tema** na navbar com 3 estados: padrão, "🌧️ Forks" (esfria as cores do site e escurece o lado Konoha do hero) e "🍃 Konoha" (esquenta as cores e escurece o lado Forks), aplicado via variáveis CSS no body.
- **Animações de entrada ao rolar** (fade + slide para cima) em todas as seções e cards, via IntersectionObserver, reutilizável como componente `<Reveal>`.
- **Botão de coração no hero** que, ao ser clicado, dispara uma chuva de emojis flutuantes (❤️ 🌙 🍥 💛 🦊 🧛) que sobem e desaparecem.
- **Sistema de toasts** (notificações discretas no rodapé) para feedbacks: abrir a carta, revelar o resultado do quiz, começar a tocar uma música.
- **Botão "voltar ao topo"** flutuante que só aparece após rolar a página.
- **Microinterações**: números do contador pulsam quando mudam, cards levantam no hover, botões com transições suaves.
- **Acessibilidade**: aria-labels nos botões de ícone, role="status" no toast, e respeitar `prefers-reduced-motion` (desativar animações).

## Requisitos técnicos

- Todo o conteúdo em português do Brasil; design escuro e elegante com detalhes dourados; tom carinhoso e bem-humorado.
- Usar apenas SVGs desenhados no próprio código para os elementos visuais (sem imagens externas, sem fontes externas — as únicas exceções são os iframes do Spotify na playlist e, se necessário, o CDN do React).
- Responsivo para celular (hero empilha em telas pequenas, navbar com scroll horizontal).
- Componentes React com hooks (useState, useEffect, useRef, IntersectionObserver em custom hook).

---

💡 **Dica:** depois de gerar em cada IA, abra os arquivos lado a lado no navegador e compare design, contador, quiz, players de música, animações e textos para escolher (ou misturar) as melhores partes.
