VARIANTS.logo = {
  stepMs: 440,
  steps: 7,
  css: `
    .loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      user-select: none;
    }
    .box {
      position: relative;
      width: 300px;
      max-width: 100%;
      aspect-ratio: 540 / 480;
    }
    .box img {
      position: absolute;
      display: block;
    }
    .wordmark {
      inset: 0;
      width: 100%;
      height: 100%;
    }
    :host([data-theme="dark"]) .wordmark { filter: brightness(0) invert(1); }
    .ornament {
      opacity: 0.3;
      transition: opacity 0.18s ease-out;
    }
    .ornament.is-active { opacity: 1; }
    .label {
      margin: 22px 0 0;
      font-size: 14px;
      font-weight: 650;
      color: #4d4d4d;
    }
    :host([data-theme="dark"]) .label { color: #e5e7eb; }
  `,
  html(host) {
    const ornaments = [
      { src: "ornament-01-panah-rumah", left: 15.193, top: 18.325, width: 16.703, height: 16.101 },
      { src: "ornament-02-morph-1", left: 31.897, top: 4.118, width: 20.065, height: 20.098 },
      { src: "ornament-03-love-miring", left: 58.065, top: 3.537, width: 23.945, height: 27.092 },
      { src: "ornament-04-love-penuh", left: 66.303, top: 31.245, width: 32.963, height: 34.385 },
      { src: "ornament-05-love-bawah", left: 60.472, top: 71.227, width: 25.624, height: 25.463 },
      { src: "ornament-06-buku-bawah", left: 38.404, top: 83.468, width: 19.147, height: 15.614 },
      { src: "ornament-07-buku-kiri", left: 19.657, top: 74.137, width: 16.383, height: 12.897 },
    ];
    const text = (host.getAttribute("label") || "Loading…").replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
    return `
      <div class="loader">
        <div class="box" part="logo">
          <img class="wordmark" src="${ASSETS.wordmark}" alt="" draggable="false">
          ${ornaments
            .map((o) => `<img class="ornament" src="${ASSETS[o.src]}" alt="" draggable="false" style="left:${o.left}%;top:${o.top}%;width:${o.width}%;height:${o.height}%">`)
            .join("")}
        </div>
        <p class="label" part="label">${text}</p>
      </div>`;
  },
  mount(root) {
    const ornaments = [...root.querySelectorAll(".ornament")];
    return {
      paint(step) {
        ornaments.forEach((node, i) => node.classList.toggle("is-active", i === step));
      },
    };
  },
};
