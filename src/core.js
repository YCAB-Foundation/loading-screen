const TAG = "ycab-loader";
const DEFAULT_VARIANT = "iserve";
const FONT_HREF = "https://fonts.googleapis.com/css2?family=Nunito:wght@600;800&display=swap";

const BASE_CSS = `
  :host {
    --ycab-red: #ed1c24;
    --ycab-card: #ffffff;
    --ycab-ink: #0f172a;
    --ycab-border: rgba(226, 232, 240, 0.9);
    --ycab-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    --ycab-backdrop: rgba(244, 245, 247, 0.92);
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
  }
  :host([hidden]) { display: none; }
  :host([data-theme="dark"]) {
    --ycab-card: #141922;
    --ycab-ink: #f8fafc;
    --ycab-border: rgba(255, 255, 255, 0.08);
    --ycab-shadow: none;
    --ycab-backdrop: rgba(11, 15, 23, 0.92);
  }
  :host([fullscreen]) {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    align-items: center;
    padding: 20px;
    background: var(--ycab-backdrop);
    animation: ycab-fade-in 0.2s ease both;
  }
  :host([fullscreen].is-leaving) { animation: ycab-fade-out 0.25s ease both; }
  .root {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .card {
    position: relative;
    box-sizing: border-box;
    width: min(100%, 420px);
    border-radius: 24px;
    background: var(--ycab-card);
    color: var(--ycab-ink);
    border: 1px solid var(--ycab-border);
    box-shadow: var(--ycab-shadow);
    font-family: "Segoe UI", Helvetica, Arial, sans-serif;
    user-select: none;
    transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
  }
  :host([plain]) .card {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  :host([hide-label]) .label { display: none; }
  @keyframes ycab-rise {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ycab-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ycab-fade-out { from { opacity: 1; } to { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    :host([fullscreen]), .label.enter { animation: none; }
  }
`;

function loadFont() {
  if (window.YCAB_LOADER_NO_FONT || document.querySelector(`link[href="${FONT_HREF}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

function defineElement() {
  if (customElements.get(TAG)) return;

  class YcabLoader extends HTMLElement {
    static get observedAttributes() {
      return ["variant", "theme", "label"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._raf = 0;
      this._view = null;
      this._media = window.matchMedia("(prefers-color-scheme: dark)");
      this._onMedia = () => this._applyTheme();
      this._tick = this._tick.bind(this);
    }

    connectedCallback() {
      this._started = Number(this.getAttribute("start")) || Date.now();
      this._applyTheme();
      this._render();
      this._media.addEventListener("change", this._onMedia);
      this._raf = requestAnimationFrame(this._tick);
    }

    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._media.removeEventListener("change", this._onMedia);
      if (this._view && this._view.destroy) this._view.destroy();
      this._view = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "theme") this._applyTheme();
      else if (this._view && oldValue !== newValue) this._render();
    }

    _applyTheme() {
      const theme = this.getAttribute("theme");
      const dark = theme === "dark" || (theme === "auto" && this._media.matches);
      this.dataset.theme = dark ? "dark" : "light";
    }

    _render() {
      if (this._view && this._view.destroy) this._view.destroy();
      const name = this.getAttribute("variant");
      this._variant = VARIANTS[name] || VARIANTS[DEFAULT_VARIANT];
      if (this._variant.font) loadFont();
      this.shadowRoot.innerHTML = `
        <style>${BASE_CSS}${this._variant.css}</style>
        <div class="root" part="root" role="status" aria-live="polite">${this._variant.html(this)}</div>`;
      this.shadowRoot.querySelector(".root").setAttribute("aria-label", this.getAttribute("label") || "Loading");
      this._view = this._variant.mount(this.shadowRoot, this);
      this._step = -1;
    }

    _tick() {
      const { steps } = this._variant;
      const stepMs = Number(this.getAttribute("step-ms")) || this._variant.stepMs;
      const cycle = stepMs * steps;
      const elapsed = (((Date.now() - this._started) % cycle) + cycle) % cycle;
      const step = Math.floor(elapsed / stepMs);
      if (step !== this._step) {
        this._step = step;
        this._view.paint(step);
      }
      this._raf = requestAnimationFrame(this._tick);
    }
  }

  customElements.define(TAG, YcabLoader);
}

if (isBrowser) defineElement();

const OPTION_ATTRS = { variant: "variant", theme: "theme", stepMs: "step-ms", label: "label" };
const OPTION_FLAGS = { hideLabel: "hide-label", plain: "plain" };

let overlay = null;
let pending = 0;

function show(options = {}) {
  if (!isBrowser) return null;
  pending += 1;
  if (!overlay) {
    overlay = document.createElement(TAG);
    overlay.setAttribute("fullscreen", "");
    document.body.appendChild(overlay);
  }
  overlay.classList.remove("is-leaving");
  for (const [key, attr] of Object.entries(OPTION_ATTRS)) {
    if (options[key] != null) overlay.setAttribute(attr, String(options[key]));
  }
  for (const [key, attr] of Object.entries(OPTION_FLAGS)) {
    if (options[key] != null) overlay.toggleAttribute(attr, Boolean(options[key]));
  }
  return overlay;
}

function hide(options = {}) {
  if (!isBrowser || !overlay) return;
  pending = options.force ? 0 : Math.max(0, pending - 1);
  if (pending > 0) return;
  const node = overlay;
  overlay = null;
  node.classList.add("is-leaving");
  const remove = () => node.remove();
  node.addEventListener("animationend", remove, { once: true });
  setTimeout(remove, 400);
}

async function wrap(task, options) {
  show(options);
  try {
    return await (typeof task === "function" ? task() : task);
  } finally {
    hide();
  }
}

const YCABLoader = { show, hide, wrap, variants: Object.keys(VARIANTS) };

if (isBrowser) window.YCABLoader = YCABLoader;
