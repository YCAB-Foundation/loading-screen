VARIANTS.iserve = {
  stepMs: 800,
  steps: VALUES.length,
  font: true,
  css: `
    .card {
      padding: 36px 24px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: "Nunito", "Segoe UI", system-ui, sans-serif;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      padding: 16px 0;
    }
    .icon {
      width: min(44px, calc((100% - 72px) / 6));
      aspect-ratio: 1;
      flex: none;
      opacity: 0.3;
      transform: scale(0.92) translateY(0);
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .icon.is-active {
      opacity: 1;
      transform: scale(1.15) translateY(-4px);
    }
    .icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .brand {
      margin: 16px 0 0;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.25em;
      line-height: 1;
      text-align: center;
      color: #4d4d4d;
    }
    :host([data-theme="dark"]) .brand { color: #a3a3a3; }
    .letter { transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    .letter.is-active { color: var(--ycab-red); }
    .label {
      min-height: 24px;
      margin: 8px 0 0;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--ycab-red);
      text-align: center;
    }
    .label.enter { animation: ycab-rise 0.2s ease both; }
    @media (prefers-reduced-motion: reduce) {
      .icon, .letter { transition: none; }
      .icon.is-active { transform: none; }
    }
  `,
  html() {
    const brand = [
      { char: "I", step: 0 },
      { char: "-" },
      { char: "S", step: 1 },
      { char: "E", step: 2 },
      { char: "R", step: 3 },
      { char: "V", step: 4 },
      { char: "E", step: 5 },
    ];
    return `
      <div class="card" part="card">
        <div class="row" part="icons">
          ${VALUES.map((v) => `<div class="icon"><img src="${ASSETS[v.icon]}" alt="" draggable="false"></div>`).join("")}
        </div>
        <div class="brand" part="brand">
          ${brand.map((b) => `<span class="letter"${b.step === undefined ? "" : ` data-step="${b.step}"`}>${b.char}</span>`).join("")}
        </div>
        <p class="label" part="label"></p>
      </div>`;
  },
  mount(root) {
    const icons = [...root.querySelectorAll(".icon")];
    const letters = [...root.querySelectorAll(".letter")];
    const label = root.querySelector(".label");
    return {
      paint(step) {
        icons.forEach((node, i) => node.classList.toggle("is-active", i === step));
        letters.forEach((node) => node.classList.toggle("is-active", node.dataset.step === String(step)));
        label.textContent = VALUES[step].name;
        label.classList.remove("enter");
        void label.offsetWidth;
        label.classList.add("enter");
      },
    };
  },
};
