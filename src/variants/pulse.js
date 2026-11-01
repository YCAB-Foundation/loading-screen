VARIANTS.pulse = {
  stepMs: 1600,
  steps: 1,
  css: `
    :host([fullscreen]) {
      background:
        radial-gradient(720px 340px at 50% 42%, rgba(237, 28, 36, 0.14), transparent 58%),
        #fafafa;
    }
    :host([fullscreen][data-theme="dark"]) {
      background:
        radial-gradient(720px 340px at 50% 42%, rgba(237, 28, 36, 0.22), transparent 58%),
        #18181b;
    }
    :host([fullscreen])::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(113, 113, 122, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(113, 113, 122, 0.08) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at center, black 12%, transparent 68%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 12%, transparent 68%);
      opacity: 0.75;
    }
    :host([fullscreen][data-theme="dark"])::before {
      background-image:
        linear-gradient(rgba(161, 161, 170, 0.09) 1px, transparent 1px),
        linear-gradient(90deg, rgba(161, 161, 170, 0.09) 1px, transparent 1px);
    }
    .loader {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.15rem;
      width: 100%;
      padding: 1.5rem;
      box-sizing: border-box;
      color: var(--ycab-red);
      font-family: Inter, Nunito, ui-sans-serif, system-ui, sans-serif;
      user-select: none;
    }
    .mark {
      position: relative;
      display: grid;
      place-items: center;
      width: min(18rem, 78vw);
      height: 7.5rem;
    }
    .rings {
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      pointer-events: none;
    }
    .rings span {
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--ycab-red);
      border-radius: 999px;
      opacity: 0;
      animation: ycab-pulse-ring 1.8s cubic-bezier(0.15, 0.7, 0.3, 1) infinite;
    }
    .rings span:nth-child(2) { animation-delay: 0.45s; }
    .rings span:nth-child(3) { animation-delay: 0.9s; }
    .logo {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      height: clamp(2.4rem, 8vw, 3.4rem);
      width: auto;
      animation: ycab-pulse-beat 1.6s ease-in-out infinite;
    }
    .logo img {
      display: block;
      height: 100%;
      width: auto;
      object-fit: contain;
      object-position: center;
    }
    .logo .logo-light { display: block; }
    .logo .logo-dark { display: none; }
    :host([data-theme="dark"]) .logo .logo-light { display: none; }
    :host([data-theme="dark"]) .logo .logo-dark { display: block; }
    .ecg {
      width: min(14rem, 68vw);
      height: 2.4rem;
      overflow: visible;
    }
    .ecg-track {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      opacity: 0.16;
    }
    .ecg-draw {
      fill: none;
      stroke: var(--ycab-red);
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: ycab-pulse-ecg 1.8s ease-in-out infinite;
      filter: drop-shadow(0 0 6px rgba(237, 28, 36, 0.55));
    }
    .label {
      margin: 0;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #71717a;
    }
    .label em {
      font-style: normal;
      color: var(--ycab-red);
    }
    :host([data-theme="dark"]) .label { color: #a1a1aa; }
    @keyframes ycab-pulse-ring {
      0% { transform: scale(0.45); opacity: 0.55; }
      70% { opacity: 0.12; }
      100% { transform: scale(1.85); opacity: 0; }
    }
    @keyframes ycab-pulse-beat {
      0%, 100% { transform: scale(1); }
      12% { transform: scale(1.055); }
      20% { transform: scale(1); }
      32% { transform: scale(1.035); }
      42% { transform: scale(1); }
    }
    @keyframes ycab-pulse-ecg {
      0% { stroke-dashoffset: 100; opacity: 0.35; }
      35% { stroke-dashoffset: 0; opacity: 1; }
      72% { stroke-dashoffset: 0; opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0.2; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rings span, .logo, .ecg-draw { animation: none !important; }
      .ecg-draw { stroke-dashoffset: 0; opacity: 1; }
    }
  `,
  html(host) {
    const custom = host.getAttribute("label");
    const text = custom
      ? custom.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`)
      : 'YCAB <em>Pulse</em>';
    return `
      <div class="loader">
        <div class="mark" part="logo">
          <div class="rings" aria-hidden="true"><span></span><span></span><span></span></div>
          <span class="logo">
            <img class="logo-light" src="${ASSETS["ycab-pulse_lightmode"]}" alt="" draggable="false">
            <img class="logo-dark" src="${ASSETS["ycab-pulse-darkmode"]}" alt="" draggable="false">
          </span>
        </div>
        <svg class="ecg" viewBox="0 0 240 40" aria-hidden="true">
          <path class="ecg-track" d="M4 20 H78 L88 20 L96 8 L104 32 L114 4 L124 20 H236" />
          <path class="ecg-draw" pathLength="100" d="M4 20 H78 L88 20 L96 8 L104 32 L114 4 L124 20 H236" />
        </svg>
        <p class="label" part="label">${text}</p>
      </div>`;
  },
  mount(_root, host) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const soundOn = !host.hasAttribute("muted") && !reduced && ASSETS["heartbeat-official"];
    if (!soundOn) return { paint() {}, destroy() {} };

    const audio = new Audio(ASSETS["heartbeat-official"]);
    audio.preload = "auto";
    audio.volume = 0.95;
    let loopTimer = 0;
    let started = false;
    let listening = false;

    function playPulse() {
      try {
        audio.currentTime = 0;
        return audio.play();
      } catch (_) {
        return Promise.reject(_);
      }
    }

    function startHeartbeat() {
      if (started) return;
      started = true;
      stopListening();
      playPulse();
      loopTimer = window.setInterval(() => {
        playPulse().catch(() => {});
      }, 1600);
    }

    function stopListening() {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    }

    function onGesture() {
      startHeartbeat();
    }

    function armFallback() {
      if (started || listening) return;
      listening = true;
      window.addEventListener("pointerdown", onGesture);
      window.addEventListener("keydown", onGesture);
    }

    const first = playPulse();
    if (first && typeof first.then === "function") {
      first.then(startHeartbeat).catch(armFallback);
    } else {
      startHeartbeat();
    }

    return {
      paint() {},
      destroy() {
        stopListening();
        if (loopTimer) clearInterval(loopTimer);
        loopTimer = 0;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      },
    };
  },
};
