VARIANTS.values = {
  stepMs: 800,
  steps: VALUES.length,
  css: `
    .card {
      padding: 40px 36px 32px;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.2;
      background: radial-gradient(circle at 50% 42%, var(--ycab-red) 0%, transparent 68%);
    }
    .stage {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 190px;
    }
    .aura {
      position: absolute;
      width: 176px;
      height: 176px;
      border-radius: 999px;
      pointer-events: none;
      background: var(--ycab-red);
      filter: blur(28px);
      animation: ycab-aura 2.2s ease-in-out infinite;
    }
    .slot {
      position: relative;
      width: 144px;
      height: 144px;
      overflow: hidden;
    }
    .layer {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 6px 8px rgba(15, 23, 42, 0.12));
    }
    .layer.enter { animation: ycab-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .layer.exit { animation: ycab-slide-out 0.22s ease-in both; }
    .float {
      width: 144px;
      height: 144px;
      animation: ycab-float 2.6s ease-in-out infinite;
    }
    .float img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .label {
      position: relative;
      z-index: 1;
      margin: 18px 0 0;
      min-height: 36px;
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .label.enter { animation: ycab-rise 0.25s ease both; }
    @keyframes ycab-aura {
      0%, 100% { transform: scale(1); opacity: 0.15; }
      50% { transform: scale(1.08); opacity: 0.3; }
    }
    @keyframes ycab-float {
      0%, 100% { transform: translateY(-3px); }
      50% { transform: translateY(3px); }
    }
    @keyframes ycab-slide-in {
      from { transform: translateX(60px) scale(0.88); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    @keyframes ycab-slide-out {
      from { transform: none; opacity: 1; }
      to { transform: translateX(-60px) scale(0.88); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .aura, .float, .layer.enter, .layer.exit { animation: none; }
    }
  `,
  html() {
    return `
      <div class="card" part="card">
        <div class="glow"></div>
        <div class="stage">
          <div class="aura"></div>
          <div class="slot"></div>
        </div>
        <p class="label" part="label"></p>
      </div>`;
  },
  mount(root) {
    const slot = root.querySelector(".slot");
    const label = root.querySelector(".label");
    const EXIT_MS = 220;
    let token = 0;

    function mountStep(step) {
      const layer = document.createElement("div");
      layer.className = "layer enter";
      layer.innerHTML = `<div class="float"><img src="${ASSETS[VALUES[step].icon]}" alt="" draggable="false"></div>`;
      slot.replaceChildren(layer);
      label.textContent = VALUES[step].name;
      label.classList.remove("enter");
      void label.offsetWidth;
      label.classList.add("enter");
    }

    return {
      paint(step) {
        const current = ++token;
        const previous = slot.querySelector(".layer");
        if (!previous) {
          mountStep(step);
          return;
        }
        previous.classList.remove("enter");
        previous.classList.add("exit");
        setTimeout(() => {
          if (current === token) mountStep(step);
        }, EXIT_MS);
      },
      destroy() {
        token += 1;
      },
    };
  },
};
