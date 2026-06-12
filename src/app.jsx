import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import photo from "./photo.js";

/* ================== dados ================== */
const START_DATE = new Date(2024, 7, 16, 0, 0, 0); // 16/08/2024

const SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "contador", label: "Contador" },
  { id: "saga", label: "Nossa Saga" },
  { id: "carta", label: "Carta" },
  { id: "quiz", label: "Quiz" },
  { id: "playlist", label: "Playlist" },
  { id: "promessa", label: "Promessa" },
];

const TIMELINE = [
  {
    title: "Crepúsculo — Arco da Apresentação",
    saga: "16 de agosto de 2024",
    text: "O dia em que tudo começou. Como Bella chegando em Forks, como Naruto entrando na Academia: nenhum de nós sabia que a vida estava prestes a mudar para sempre.",
  },
  {
    title: "Lua Nova — Exame Chunin",
    saga: "Os primeiros desafios",
    text: "Todo casal passa por provas. A gente passou pelas nossas de mãos dadas — e saiu mais forte, como quem sobrevive à Floresta da Morte.",
  },
  {
    title: "Eclipse — Arco do Resgate",
    saga: "Crescendo juntos",
    text: "Quando um vacila, o outro vai buscar. Sem deixar pra trás, sem desistir. É promessa de uma vida.",
  },
  {
    title: "Amanhecer — Arco Final (que nunca acaba)",
    saga: "Hoje e sempre",
    text: "Nosso \"para todo o sempre\" estilo Cullen, com a teimosia Uzumaki de nunca desistir. O melhor arco ainda está sendo escrito. ✍️",
  },
];

const QUIZ = [
  {
    q: "1. Plano perfeito de sábado à noite:",
    c: "🌧️ Filme com chuva na janela e cobertor",
    u: "🍜 Rodízio de lámen estilo Ichiraku",
  },
  {
    q: "2. Superpoder dos sonhos:",
    c: "✨ Imortalidade e brilhar no sol",
    u: "🌀 Rasengan e clones das sombras",
  },
  {
    q: "3. Numa briga, você:",
    c: "🧊 Mantém a pose, elegante e letal",
    u: "🔥 Grita o nome do golpe antes de dar",
  },
  {
    q: "4. Declaração de amor ideal:",
    c: "🌙 \"Você é a minha marca pessoal de heroína\"",
    u: "🍥 \"Eu nunca desisto de você, dattebayo!\"",
  },
];

const TRACKS = [
  { id: "1YHHC4n7TFrD5vaAa4cmGO", side: "tw", note: "🌙", name: "A Thousand Years — Christina Perri", from: "Amanhecer, Parte 1" },
  { id: "2tsWKbVFxGMAAzYqRZMnZ3", side: "nr", note: "🍥", name: "Blue Bird — Ikimono-gakari", from: "Naruto Shippuden, abertura 3" },
  { id: "2iKKc3oKBoADgQwdZTQIaH", side: "tw", note: "🌙", name: "Flightless Bird, American Mouth — Iron & Wine", from: "Crepúsculo (a dança do baile!)" },
  { id: "1f8rf1C31sTvrtlZFwLi0G", side: "nr", note: "👁️", name: "Madara Flexzone — MHRAP", from: "A gang do Madara não brinca em serviço" },
  { id: "5djt2IiLLsQMeBiLWJQlGB", side: "tw", note: "🌙", name: "Bella's Lullaby — Carter Burwell", from: "Crepúsculo (no piano do Edward)" },
  { id: "56cbXWJVXSwz91ssfsb1ih", side: "nr", note: "⚡", name: "Tipo Sasukezin — MHRAP", from: "No pique Uchiha, estilo vingador" },
];

/* ================== hooks utilitários ================== */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, as: Tag = "div", className = "", ...props }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/* ================== componentes ================== */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: pct + "%" }} />;
}

function Navbar({ active, theme, setTheme }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className={`navbar ${visible ? "visible" : ""}`}>
      <span className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        A 🌙 & 🍥 M
      </span>
      <nav>
        {SECTIONS.map((s) => (
          <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => go(s.id)}>
            {s.label}
          </button>
        ))}
      </nav>
      <div className="theme-toggle" title="Mudar o clima do site">
        <button className={theme === "forks" ? "on-forks" : ""} onClick={() => setTheme(theme === "forks" ? "padrao" : "forks")}>
          🌧️ Forks
        </button>
        <button className={theme === "konoha" ? "on-konoha" : ""} onClick={() => setTheme(theme === "konoha" ? "padrao" : "konoha")}>
          🍃 Konoha
        </button>
      </div>
    </header>
  );
}

function FloatingHearts({ hearts }) {
  return (
    <>
      {hearts.map((h) => (
        <span key={h.id} className="float-heart" style={{ left: h.x + "px", top: h.y + "px" }}>
          {h.emoji}
        </span>
      ))}
    </>
  );
}

function Hero({ theme, spawnHearts }) {
  const onHeart = (e) => {
    const r = e.target.getBoundingClientRect();
    spawnHearts(r.left + r.width / 2, r.top);
  };
  return (
    <div className="hero" id="inicio">
      <div className="hero-photo" style={{ backgroundImage: `url(${photo})` }} aria-hidden="true" />
      <div className={`hero-half forks glass ${theme === "konoha" ? "dim" : ""}`}>
        <svg className="icon" width="110" height="110" viewBox="0 0 100 100">
          <circle cx="50" cy="42" r="26" fill="#dfe9ef" />
          <circle cx="58" cy="36" r="26" fill="#1b3a4b" />
          <polygon points="14,95 24,68 34,95" fill="#13242f" />
          <polygon points="32,95 44,60 56,95" fill="#0e1c25" />
          <polygon points="56,95 68,66 80,95" fill="#13242f" />
        </svg>
        <h2>Forks</h2>
        <p className="sub">"E assim o leão se apaixonou pela ovelha..."</p>
      </div>

      <div className={`hero-half konoha glass ${theme === "forks" ? "dim" : ""}`}>
        <svg className="icon" width="110" height="110" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#fff" strokeWidth="4" opacity="0.9" />
          <path d="M50 18 C 30 30, 30 58, 48 70 C 44 56, 48 42, 62 34 C 54 44, 52 58, 60 68 C 74 56, 72 32, 50 18 Z" fill="#fff" opacity="0.95" />
          <path d="M50 70 L 50 82" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <h2>Konoha</h2>
        <p className="sub">"Eu nunca volto atrás na minha palavra. Esse é o meu jeito ninja!"</p>
      </div>

      <div className="hero-center">
        <h1>
          Angelytta <span className="amp">&</span> Murilo
        </h1>
        <p>Onde o crepúsculo encontra a vontade do fogo 🔥🌙</p>
        <button className="heart-btn" onClick={onHeart} title="Clica aqui, vai...">
          ❤️
        </button>
      </div>

      <button
        className="scroll-hint"
        aria-label="Rolar para baixo"
        onClick={() => document.getElementById("contador")?.scrollIntoView({ behavior: "smooth" })}
      >
        ▼
      </button>
    </div>
  );
}

function pad(n) {
  return String(n);
}

function Counter() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, now - START_DATE.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  // próximo marco: aniversários de namoro (a cada ano)
  const nextAnniv = new Date(START_DATE);
  while (nextAnniv.getTime() <= now) nextAnniv.setFullYear(nextAnniv.getFullYear() + 1);
  const prevAnniv = new Date(nextAnniv);
  prevAnniv.setFullYear(prevAnniv.getFullYear() - 1);
  const pctToAnniv = ((now - prevAnniv.getTime()) / (nextAnniv.getTime() - prevAnniv.getTime())) * 100;
  const daysLeft = Math.ceil((nextAnniv.getTime() - now) / 86400000);

  return (
    <section id="contador">
      <Reveal>
        <h2 className="section-title">⏳ Imprinting Ativado</h2>
        <p className="section-sub">Como os lobos de La Push: quando aconteceu, foi pra sempre.</p>
        <div className="counter-wrap">
          <div className="moon">🌙🦊</div>
          <div className="counter">
            <TimeBox value={d} label="Dias" />
            <TimeBox value={h} label="Horas" />
            <TimeBox value={m} label="Minutos" />
            <TimeBox value={s} label="Segundos" />
          </div>
          <p className="since">
            desde <strong>16 de agosto de 2024</strong> — o dia em que o imprinting aconteceu 💛
          </p>
          <div className="milestone">
            <div className="bar">
              <div className="fill" style={{ width: pctToAnniv.toFixed(2) + "%" }} />
            </div>
            faltam {daysLeft} dia{daysLeft === 1 ? "" : "s"} pro nosso próximo aniversário de namoro 🎉
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TimeBox({ value, label }) {
  const [tick, setTick] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setTick(true);
      const t = setTimeout(() => setTick(false), 480);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <div className="box">
      <div className={`num ${tick ? "tick" : ""}`}>{pad(value)}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function Timeline() {
  return (
    <section id="saga">
      <Reveal>
        <h2 className="section-title">📖 A Nossa Saga</h2>
        <p className="section-sub">Cada capítulo da história, cada arco do anime — tudo nosso.</p>
      </Reveal>
      <div className="timeline">
        {TIMELINE.map((item) => (
          <Reveal key={item.title} className="tl-item">
            <h3>{item.title}</h3>
            <span className="saga">{item.saga}</span>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Letter({ toast }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="carta">
      <Reveal>
        <h2 className="section-title">💌 A Carta</h2>
        <p className="section-sub">Escrita com o drama do Edward, selada com o selo Uzumaki.</p>
        <div className="letter-fold">
          {!open ? (
            <>
              <button
                className="envelope"
                aria-label="Abrir a carta"
                onClick={() => {
                  setOpen(true);
                  toast("Com carinho, do Murilo pra Angelytta 💛");
                }}
              >
                💌
              </button>
              <p className="hint">(clica no envelope pra abrir, amor)</p>
            </>
          ) : (
            <div className="letter">
              <p className="dear">Angelytta,</p>
              <p>
                Antes de você, minha vida era como Forks sem sol — uma espera nublada por algo que eu nem sabia nomear. Você é o meu tipo bem
                particular de marca: não preciso de cem anos de existência para saber que nenhum século teria sentido sem você nele.
              </p>
              <p>
                E se o destino quiser nos testar, que venha. Porque eu carrego comigo a vontade do fogo: <em>eu nunca volto atrás na minha palavra</em>{" "}
                — e a minha palavra é você. Esse é o meu jeito ninja de amar.
              </p>
              <p className="sign">
                — Para todo o sempre, e mais um pouco.
                <br />
                Murilo 🦊
              </p>
              <p className="seal">
                <svg className="uzumaki-seal" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="23" fill="none" stroke="#b3411e" strokeWidth="3" />
                  <path
                    d="M25 25 m0 -14 a14 14 0 1 1 -14 14 a11 11 0 1 0 11 -11 a8 8 0 1 1 -8 8 a5 5 0 1 0 5 -5"
                    fill="none"
                    stroke="#b3411e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                &nbsp;selado pelo clã Uzumaki
              </p>
              <button className="close-letter" onClick={() => setOpen(false)}>
                Guardar a carta 💌
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Quiz({ toast }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const answered = Object.keys(answers).length;
  const allDone = answered === QUIZ.length;

  const choose = (i, side) => {
    setAnswers((a) => ({ ...a, [i]: side }));
    setResult(null);
  };

  const reveal = () => {
    const c = Object.values(answers).filter((v) => v === "c").length;
    const u = QUIZ.length - c;
    let msg;
    if (c > u) msg = "🧛 Você é um(a) CULLEN! Elegância, drama e amor eterno. Bem-vindo(a) à família.";
    else if (u > c) msg = "🍥 Você é um(a) UZUMAKI! Coração gigante, teimosia infinita e lámen no sangue. Dattebayo!";
    else msg = "⚡ Empate perfeito: um(a) CULLEN-UZUMAKI! Brilha no sol E faz Rasengan. Igualzinho a nós dois. 💛";
    setResult(msg);
    toast("Clã revelado! ⚡");
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <section id="quiz">
      <Reveal>
        <h2 className="section-title">🧛🍜 Você é mais Cullen ou mais Uzumaki?</h2>
        <p className="section-sub">Responde aí, sem trapacear com Genjutsu nem leitura de mentes.</p>
        <div className="quiz-card">
          <div className="quiz-progress" aria-label={`${answered} de ${QUIZ.length} perguntas respondidas`}>
            {QUIZ.map((_, i) => (
              <span key={i} className={answers[i] ? "done" : ""} />
            ))}
          </div>
          {QUIZ.map((item, i) => (
            <div className="quiz-q" key={i}>
              <p>{item.q}</p>
              <button className={answers[i] === "c" ? "sel-c" : ""} onClick={() => choose(i, "c")}>
                {item.c}
              </button>
              <button className={answers[i] === "u" ? "sel-u" : ""} onClick={() => choose(i, "u")}>
                {item.u}
              </button>
            </div>
          ))}
          <button className="quiz-go" onClick={reveal} disabled={!allDone}>
            {allDone ? "Revelar meu clã ⚡" : `Faltam ${QUIZ.length - answered} resposta${QUIZ.length - answered === 1 ? "" : "s"}...`}
          </button>
          {result && <div className="quiz-result">{result}</div>}
          {(result || answered > 0) && (
            <button className="quiz-reset" onClick={reset}>
              refazer o teste
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Playlist() {
  return (
    <section id="playlist">
      <Reveal>
        <h2 className="section-title">🎵 A Trilha Sonora da Gente</h2>
        <p className="section-sub">Metade casamento dos Cullen, metade gang do Madara. Perfeita.</p>
      </Reveal>
      <div className="playlist">
        {TRACKS.map((t) => (
          <Reveal key={t.id} className={`track ${t.side}`}>
            <div className="track-head">
              <span className="note">{t.note}</span>
              <div className="track-info">
                <div className="t-name">{t.name}</div>
                <div className="t-from">{t.from}</div>
              </div>
            </div>
            <div className="player">
              <iframe
                src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={t.name}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Promise_() {
  return (
    <section id="promessa">
      <Reveal>
        <div className="promise">
          <h2 className="section-title">🤝 Murilo e Angelytta - Um vale sem fim</h2>
          <blockquote>
            "Eu, <strong>Murilo Rodrigues</strong>, vou me tornar um Hokage do seu coração, nunca duvide de mim — eu não volto atrás na minha palavra, porque esse é o meu jeito ninja.<br />
          </blockquote>
          <div className="names">Angelytta ❤ Murilo</div>
          <p className="date">16 de agosto de 2024 — ∞</p>
        </div>
      </Reveal>
    </section>
  );
}

function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button className={`to-top ${show ? "show" : ""}`} aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ↑
    </button>
  );
}

/* ================== app ================== */
function App() {
  const [theme, setThemeState] = useState("padrao");
  const [active, setActive] = useState("inicio");
  const [toastMsg, setToastMsg] = useState(null);
  const [hearts, setHearts] = useState([]);
  const toastTimer = useRef(null);
  const heartId = useRef(0);

  const setTheme = (t) => {
    setThemeState(t);
    document.body.classList.remove("theme-forks", "theme-konoha");
    if (t === "forks") document.body.classList.add("theme-forks");
    if (t === "konoha") document.body.classList.add("theme-konoha");
  };

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const spawnHearts = useCallback((x, y) => {
    const emojis = ["❤️", "🌙", "🍥", "💛", "🦊", "🧛"];
    const batch = Array.from({ length: 7 }, (_, i) => ({
      id: ++heartId.current,
      x: x + (Math.random() * 90 - 45),
      y: y - Math.random() * 22,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => {
      setHearts((h) => h.filter((it) => !batch.some((b) => b.id === it.id)));
    }, 2700);
  }, []);

  // scrollspy: marca a seção ativa na navbar
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <ProgressBar />
      <Navbar active={active} theme={theme} setTheme={setTheme} />
      <FloatingHearts hearts={hearts} />
      <Hero theme={theme} spawnHearts={spawnHearts} />
      <div className="divider">✦ ✦ ✦</div>
      <Counter />
      <div className="divider">✦ ✦ ✦</div>
      <Timeline />
      <div className="divider">✦ ✦ ✦</div>
      <Letter toast={toast} />
      <div className="divider">✦ ✦ ✦</div>
      <Quiz toast={toast} />
      <div className="divider">✦ ✦ ✦</div>
      <Playlist />
      <div className="divider">✦ ✦ ✦</div>
      <Promise_ />
      <footer>
        Feito com chakra, veneno de vampiro e muito amor. 🦇🍃
        <br />
        Forks–Konoha © para todo o sempre.
      </footer>
      <ToTop />
      <div className={`toast ${toastMsg ? "show" : ""}`} role="status">
        {toastMsg}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
