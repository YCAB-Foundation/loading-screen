# @ycab-foundation/loading-screen

Loading screen YCAB dalam satu web component: `<ycab-loader>`.
Bisa dipakai di React, Next.js, Vue, Laravel (Blade / Vite), maupun HTML biasa — tanpa copy-paste CSS/JS.

Tersedia 3 varian, tinggal ganti atribut `variant`:

| Variant  | Tampilan                                         |
| -------- | ------------------------------------------------ |
| `iserve` | 6 ikon nilai + tulisan I-SERVE (default)         |
| `values` | Ikon nilai bergantian satu per satu dengan glow  |
| `logo`   | Logo YCAB Foundation dengan ornamen berkedip     |

Semua gambar sudah tertanam di dalam package, jadi tidak perlu mengatur path aset.

---

## Instalasi

```bash
npm i @ycab-foundation/loading-screen
```

Atau tanpa npm, lewat CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>
```

---

## Penggunaan cepat

Import sekali (biasanya di entry file aplikasi), lalu pakai tag-nya di mana saja:

```js
import "@ycab-foundation/loading-screen";
```

```html
<ycab-loader variant="iserve"></ycab-loader>
<ycab-loader variant="values" theme="dark"></ycab-loader>
<ycab-loader variant="logo" theme="auto"></ycab-loader>
```

Loading layar penuh lewat JavaScript:

```js
import YCABLoader from "@ycab-foundation/loading-screen";

YCABLoader.show({ variant: "logo" });
// ...
YCABLoader.hide();

// atau otomatis tampil selama promise berjalan
const data = await YCABLoader.wrap(fetch("/api/data").then((r) => r.json()));
```

---

## Contoh per framework

### HTML biasa

```html
<script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>

<ycab-loader variant="iserve"></ycab-loader>

<script>
  YCABLoader.show({ variant: "values", theme: "dark" });
  setTimeout(() => YCABLoader.hide(), 2000);
</script>
```

### React (Vite / CRA)

```jsx
// main.jsx
import "@ycab-foundation/loading-screen";
```

```jsx
import { useState } from "react";
import YCABLoader from "@ycab-foundation/loading-screen";

export default function UserList() {
  const [loading, setLoading] = useState(true);

  if (loading) return <ycab-loader variant="iserve" theme="auto" />;
  return <div>...</div>;
}

async function save(payload) {
  await YCABLoader.wrap(
    fetch("/api/save", { method: "POST", body: JSON.stringify(payload) }),
    { variant: "logo" }
  );
}
```

> Untuk atribut boolean (`fullscreen`, `plain`, `hide-label`) di React, tulis sebagai string kosong:
> `<ycab-loader fullscreen="" />`, bukan `fullscreen={true}`.

### Next.js (App Router)

Package aman di-import saat SSR. Import di komponen client:

```jsx
"use client";
import "@ycab-foundation/loading-screen";

export default function Loading() {
  return <ycab-loader variant="iserve" fullscreen="" />;
}
```

Simpan sebagai `app/loading.jsx` agar otomatis tampil saat perpindahan halaman.

### Vue 3 (Vite)

Beri tahu Vue bahwa `ycab-loader` adalah custom element:

```js
// vite.config.js
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag === "ycab-loader" },
      },
    }),
  ],
};
```

```js
// main.js
import "@ycab-foundation/loading-screen";
```

```vue
<template>
  <ycab-loader v-if="loading" :variant="variant" theme="auto" />
</template>
```

### Laravel

**Dengan Vite** (`resources/js/app.js`):

```js
import "@ycab-foundation/loading-screen";
```

**Tanpa build step** — taruh di layout Blade (`resources/views/layouts/app.blade.php`):

```blade
<head>
  <script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>
</head>
<body>
  @yield('content')
</body>
```

Contoh tampilkan loading saat submit form:

```blade
<form method="POST" action="{{ route('orders.store') }}" onsubmit="YCABLoader.show({ variant: 'logo' })">
  @csrf
  ...
</form>
```

Contoh dengan Axios:

```js
axios.interceptors.request.use((config) => {
  YCABLoader.show();
  return config;
});
axios.interceptors.response.use(
  (response) => {
    YCABLoader.hide();
    return response;
  },
  (error) => {
    YCABLoader.hide();
    return Promise.reject(error);
  }
);
```

---

## Atribut `<ycab-loader>`

| Atribut      | Nilai                          | Default    | Keterangan                                                           |
| ------------ | ------------------------------ | ---------- | -------------------------------------------------------------------- |
| `variant`    | `iserve` \| `values` \| `logo` | `iserve`   | Jenis loading screen. Bisa diganti kapan saja.                       |
| `theme`      | `light` \| `dark` \| `auto`    | `light`    | `auto` mengikuti setting gelap/terang perangkat.                     |
| `fullscreen` | boolean                        | –          | Tampil sebagai overlay menutupi seluruh halaman.                     |
| `plain`      | boolean                        | –          | Tanpa background kartu (untuk `iserve` & `values`).                  |
| `hide-label` | boolean                        | –          | Sembunyikan teks di bawah animasi.                                   |
| `label`      | string                         | `Loading`  | Teks untuk screen reader. Di varian `logo` juga jadi teks yang tampil. |
| `step-ms`    | angka (ms)                     | 800 / 440  | Kecepatan pergantian animasi.                                        |
| `start`      | timestamp (ms)                 | –          | Samakan timing beberapa loader dengan memberi nilai yang sama.       |

---

## API JavaScript

```js
import YCABLoader, { show, hide, wrap } from "@ycab-foundation/loading-screen";
```

Tanpa bundler, API yang sama tersedia di `window.YCABLoader`.

| Fungsi                      | Keterangan                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `show(options?)`            | Tampilkan loader layar penuh. Pemanggilan berulang tidak membuat overlay ganda.             |
| `hide({ force? })`          | Tutup loader. Jika `show()` dipanggil 3x, butuh 3x `hide()` — atau `hide({ force: true })`. |
| `wrap(promiseOrFn, opts?)`  | Tampilkan loader selama promise berjalan, lalu otomatis ditutup (termasuk saat error).      |
| `variants`                  | Daftar varian yang tersedia.                                                                |

Opsi untuk `show` / `wrap`:

```ts
{
  variant?: "iserve" | "values" | "logo";
  theme?: "light" | "dark" | "auto";
  stepMs?: number;
  hideLabel?: boolean;
  plain?: boolean;
  label?: string;
}
```

---

## Kustomisasi tampilan

Warna bisa diubah lewat CSS variable dari luar:

```css
ycab-loader {
  --ycab-red: #d6001c;
  --ycab-card: #fffaf5;
  --ycab-backdrop: rgba(255, 255, 255, 0.85);
}
```

| Variable          | Fungsi                              |
| ----------------- | ----------------------------------- |
| `--ycab-red`      | Warna aksen                         |
| `--ycab-card`     | Background kartu                    |
| `--ycab-ink`      | Warna teks di kartu                 |
| `--ycab-border`   | Warna border kartu                  |
| `--ycab-shadow`   | Bayangan kartu                      |
| `--ycab-backdrop` | Background overlay mode fullscreen  |

Bagian dalam komponen juga bisa di-style lewat `::part()`: `root`, `card`, `label`, `icons`, `brand`, `logo`.

```css
ycab-loader::part(card) {
  border-radius: 12px;
}
```

Varian `iserve` memuat font Nunito dari Google Fonts. Untuk mematikannya (misalnya karena CSP), set sebelum package di-load:

```js
window.YCAB_LOADER_NO_FONT = true;
```

---

## TypeScript

Type sudah disertakan, termasuk deklarasi JSX untuk `<ycab-loader>` di React. Tidak perlu install `@types` tambahan.

---

## Development

```bash
npm run build      # generate dist/ dari src/
```

Buka `demo.html` (lewat MAMP/web server lokal) untuk melihat semua varian.

Struktur:

```
src/
  shared.js           data nilai I-SERVE & registry varian
  core.js             web component, tema, fullscreen, API show/hide/wrap
  variants/*.js       satu file per varian
  assets/*.webp       gambar (ditanam ke bundle saat build)
scripts/build.mjs     bundler sederhana tanpa dependency
```

### Menambah varian baru

1. Buat `src/variants/nama.js`:

   ```js
   VARIANTS.nama = {
     stepMs: 800,
     steps: 4,
     css: `...`,
     html(host) { return `<div class="card" part="card">...</div>`; },
     mount(root, host) {
       return {
         paint(step) { /* update tampilan untuk step ke-n */ },
         destroy() {},
       };
     },
   };
   ```

2. Taruh gambarnya di `src/assets/` (akses lewat `ASSETS["nama-file-tanpa-ekstensi"]`).
3. Jalankan `npm run build`, lalu pakai dengan `<ycab-loader variant="nama">`.

### Rilis versi baru

```bash
npm run build
git add -A && git commit -m "..."
npm version patch          # atau minor / major
git push origin main --follow-tags
npm publish --access public
```
