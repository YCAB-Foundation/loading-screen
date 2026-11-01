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
      animation: ycab-pulse-ring 1.6s cubic-bezier(0.15, 0.7, 0.3, 1) infinite;
    }
    .rings span:nth-child(2) { animation-delay: 0.4s; }
    .rings span:nth-child(3) { animation-delay: 0.8s; }
    .logo {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      height: clamp(2.4rem, 8vw, 3.4rem);
      width: auto;
      transform: scale(1);
      transform-origin: center;
      will-change: transform;
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
      opacity: 0.35;
      filter: drop-shadow(0 0 6px rgba(237, 28, 36, 0.55));
      will-change: stroke-dashoffset, opacity, filter;
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
    .sound {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: 1px solid rgba(113, 113, 122, 0.28);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.82);
      color: #52525b;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .sound:hover {
      color: var(--ycab-red);
      border-color: rgba(237, 28, 36, 0.35);
    }
    .sound:focus-visible {
      outline: 2px solid var(--ycab-red);
      outline-offset: 2px;
    }
    :host([data-theme="dark"]) .sound {
      background: rgba(24, 24, 27, 0.78);
      border-color: rgba(161, 161, 170, 0.28);
      color: #d4d4d8;
      box-shadow: none;
    }
    :host([fullscreen]) .sound {
      position: fixed;
      top: max(20px, env(safe-area-inset-top));
      right: max(20px, env(safe-area-inset-right));
    }
    .sound svg {
      width: 18px;
      height: 18px;
      display: block;
    }
    .sound .icon-muted { display: none; }
    .sound.is-muted .icon-on { display: none; }
    .sound.is-muted .icon-muted { display: block; }
    @keyframes ycab-pulse-ring {
      0% { transform: scale(0.45); opacity: 0.55; }
      70% { opacity: 0.12; }
      100% { transform: scale(1.85); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rings span { animation: none !important; }
      .ecg-draw { stroke-dashoffset: 0; opacity: 1; filter: none; }
      .logo { transform: none !important; }
    }
  `,
  html(host) {
    const custom = host.getAttribute("label");
    const text = custom
      ? custom.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`)
      : 'YCAB <em>Pulse</em>';
    return `
      <div class="loader">
        <button class="sound" type="button" part="sound" aria-label="Mute sound" aria-pressed="false">
          <svg class="icon-on" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 10v4h3l4 3V7L7 10H4z" />
            <path d="M15.5 8.5a4.5 4.5 0 0 1 0 7" />
            <path d="M18 6a8 8 0 0 1 0 12" />
          </svg>
          <svg class="icon-muted" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 10v4h3l4 3V7L7 10H4z" />
            <path d="M16 9l5 5" />
            <path d="M21 9l-5 5" />
          </svg>
        </button>
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
  mount(root, host) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const button = root.querySelector(".sound");
    const logo = root.querySelector(".logo");
    const ecg = root.querySelector(".ecg-draw");
    const canPlay = Boolean(ASSETS["heartbeat-official"]) && !reduced;
    // Measured from heartbeat-official.mp3 and ECG path geometry
    const LUB = 0.29;
    const DUB = 0.57;
    const HIGH_PEAK_OFFSET = 46;
    let muted = host.hasAttribute("muted") || !canPlay;
    let audio = null;
    let started = false;
    let listening = false;
    let raf = 0;
    let silentStarted = 0;

    function lerp(a, b, t) {
      return a + (b - a) * Math.min(1, Math.max(0, t));
    }

    function beatScale(t, at, amount, width) {
      const d = Math.abs(t - at);
      if (d >= width) return 1;
      return 1 + amount * (1 - d / width);
    }

    function applyVisual(t, duration) {
      if (!ecg || !logo || reduced) return;
      let offset;
      let opacity;
      let glow;
      if (t <= LUB) {
        const k = t / LUB;
        offset = lerp(100, HIGH_PEAK_OFFSET, k * k);
        opacity = lerp(0.35, 1, k);
        glow = lerp(6, 12, k);
      } else if (t <= DUB) {
        const k = (t - LUB) / (DUB - LUB);
        offset = lerp(HIGH_PEAK_OFFSET, 40, k);
        opacity = 1;
        glow = lerp(12, 8, k);
      } else {
        const rest = Math.max(0.01, duration - DUB);
        const k = (t - DUB) / rest;
        offset = lerp(40, 0, Math.min(1, k * 1.35));
        opacity = k < 0.55 ? 1 : lerp(1, 0.25, (k - 0.55) / 0.45);
        glow = 6;
      }
      ecg.style.strokeDashoffset = String(offset);
      ecg.style.opacity = String(opacity);
      ecg.style.filter = `drop-shadow(0 0 ${glow}px rgba(237, 28, 36, 0.9))`;
      const scale = Math.max(beatScale(t, LUB, 0.07, 0.055), beatScale(t, DUB, 0.045, 0.05));
      logo.style.transform = `scale(${scale})`;
    }

    function syncButton() {
      if (!button) return;
      button.classList.toggle("is-muted", muted);
      button.setAttribute("aria-pressed", String(muted));
      button.setAttribute("aria-label", muted ? "Unmute sound" : "Mute sound");
      button.hidden = !canPlay;
    }

    function tick() {
      const duration = (audio && audio.duration) || 1.6;
      if (!muted && audio && !audio.paused) {
        applyVisual(audio.currentTime, duration);
      } else {
        const elapsed = ((performance.now() - silentStarted) / 1000) % duration;
        applyVisual(elapsed, duration);
      }
      raf = requestAnimationFrame(tick);
    }

    function ensureAudio() {
      if (audio || !canPlay) return audio;
      audio = new Audio(ASSETS["heartbeat-official"]);
      audio.preload = "auto";
      audio.volume = 0.95;
      audio.addEventListener("ended", onAudioEnded);
      return audio;
    }

    function playPulse() {
      const node = ensureAudio();
      if (!node || muted) return Promise.reject(new Error("muted"));
      try {
        node.currentTime = 0;
        return node.play();
      } catch (error) {
        return Promise.reject(error);
      }
    }

    function onAudioEnded() {
      if (muted || !started) return;
      playPulse().catch(() => {});
    }

    function stopHeartbeat() {
      started = false;
      if (audio) audio.pause();
    }

    function startHeartbeat() {
      if (muted || started || !canPlay) return;
      playPulse()
        .then(() => {
          started = true;
          stopListening();
        })
        .catch(() => {
          started = false;
          armFallback();
        });
    }

    function stopListening() {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    }

    function onGesture(event) {
      if (button && (event.target === button || button.contains(event.target))) return;
      startHeartbeat();
    }

    function armFallback() {
      if (started || listening || muted) return;
      listening = true;
      window.addEventListener("pointerdown", onGesture);
      window.addEventListener("keydown", onGesture);
    }

    function setMuted(next) {
      const value = Boolean(next) || !canPlay;
      if (value === muted) {
        syncButton();
        host.toggleAttribute("muted", muted);
        return;
      }
      muted = value;
      host.toggleAttribute("muted", muted);
      syncButton();
      if (muted) {
        stopListening();
        stopHeartbeat();
        silentStarted = performance.now();
        return;
      }
      started = false;
      startHeartbeat();
    }

    syncButton();
    silentStarted = performance.now();
    raf = requestAnimationFrame(tick);
    if (!muted) startHeartbeat();

    function onToggle(event) {
      event.stopPropagation();
      setMuted(!muted);
    }
    if (button) button.addEventListener("click", onToggle);

    return {
      paint() {},
      setMuted,
      destroy() {
        cancelAnimationFrame(raf);
        stopListening();
        stopHeartbeat();
        if (button) button.removeEventListener("click", onToggle);
        if (audio) {
          audio.removeEventListener("ended", onAudioEnded);
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
          audio = null;
        }
      },
    };
  },
};
