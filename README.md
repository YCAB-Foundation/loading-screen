# @ycab-foundation/loading-screen

Kumpulan loading screen YCAB yang bisa langsung dipakai di React, Next.js, Vue, Laravel, maupun HTML biasa.

Cukup pasang satu kali, lalu tampilkan dengan tag `<ycab-loader>`. Kamu tidak perlu menyalin CSS, JavaScript, atau gambar apa pun ke project — semuanya sudah ada di dalam package.

Ada tiga pilihan tampilan yang bisa kamu gunakan:

| Variant  | Tampilan                                                  |
| -------- | --------------------------------------------------------- |
| `iserve` | Enam ikon nilai dan tulisan I-SERVE yang menyala bergantian (default) |
| `values` | Ikon nilai muncul satu per satu dengan efek cahaya       |
| `logo`   | Logo YCAB Foundation dengan ornamen yang berkedip        |

---

## Daftar Isi

1. [Instalasi](#1-instalasi)
2. [Menampilkan loading pertama kamu](#2-menampilkan-loading-pertama-kamu)
3. [Memilih variant dan tema](#3-memilih-variant-dan-tema)
4. [Loading layar penuh](#4-loading-layar-penuh)
5. [Panduan per framework](#5-panduan-per-framework)
6. [Daftar atribut](#6-daftar-atribut)
7. [Daftar fungsi JavaScript](#7-daftar-fungsi-javascript)
8. [Mengubah warna dan gaya](#8-mengubah-warna-dan-gaya)

---

## 1. Instalasi

Ada dua cara memasang package ini. Pilih salah satu yang sesuai dengan project kamu.

### Cara A — Lewat npm

Gunakan cara ini jika project kamu memakai npm (React, Next.js, Vue, atau Laravel dengan Vite). Jalankan perintah berikut di folder project:

```bash
npm i @ycab-foundation/loading-screen
```

Setelah terpasang, import package di file utama aplikasi kamu (misalnya `main.jsx`, `main.js`, atau `app.js`):

```js
import "@ycab-foundation/loading-screen";
```

Import ini cukup dilakukan **satu kali**. Setelah itu, tag `<ycab-loader>` bisa dipakai di halaman mana saja.

### Cara B — Lewat CDN

Gunakan cara ini jika project kamu tidak memakai npm, misalnya HTML biasa atau Laravel Blade tanpa Vite. Tambahkan baris berikut di dalam `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>
```

---

## 2. Menampilkan loading pertama kamu

Setelah package terpasang, letakkan tag berikut di tempat kamu ingin loading muncul:

```html
<ycab-loader></ycab-loader>
```

Hasilnya adalah loading screen variant `iserve` dengan tema terang. Loading akan terus beranimasi sampai tag tersebut kamu hapus dari halaman.

---

## 3. Memilih variant dan tema

### Mengganti variant

Untuk mengganti tampilan, tambahkan atribut `variant`:

```html
<ycab-loader variant="iserve"></ycab-loader>
<ycab-loader variant="values"></ycab-loader>
<ycab-loader variant="logo"></ycab-loader>
```

Variant juga bisa diganti saat halaman sedang berjalan. Animasinya akan langsung berubah tanpa perlu memuat ulang halaman.

### Mengganti tema

Gunakan atribut `theme` untuk memilih tema terang atau gelap:

```html
<ycab-loader theme="light"></ycab-loader>
<ycab-loader theme="dark"></ycab-loader>
<ycab-loader theme="auto"></ycab-loader>
```

Jika memilih `auto`, tema akan mengikuti pengaturan mode gelap/terang di perangkat pengguna.

---

## 4. Loading layar penuh

Sering kali kamu ingin loading menutupi seluruh halaman, misalnya saat menyimpan data atau berpindah halaman. Ada dua cara untuk melakukannya.

### Lewat atribut

Tambahkan atribut `fullscreen` pada tag:

```html
<ycab-loader variant="logo" fullscreen></ycab-loader>
```

### Lewat JavaScript

Cara ini lebih praktis karena kamu tidak perlu menulis tag di HTML. Panggil `show()` untuk menampilkan loading, lalu `hide()` untuk menutupnya:

```js
import YCABLoader from "@ycab-foundation/loading-screen";

YCABLoader.show({ variant: "logo" });

// setelah proses selesai
YCABLoader.hide();
```

Jika kamu memakai CDN, fungsi yang sama tersedia lewat `window.YCABLoader`, sehingga tidak perlu `import`.

### Menutup loading secara otomatis

Kalau kamu sedang menunggu sebuah proses (misalnya request ke API), gunakan `wrap()`. Loading akan muncul selama proses berjalan dan otomatis tertutup ketika selesai — termasuk jika prosesnya gagal.

```js
const response = await YCABLoader.wrap(fetch("/api/users"));
```

Kamu juga bisa memilih variant dan tema:

```js
await YCABLoader.wrap(simpanData(), { variant: "values", theme: "dark" });
```

---

## 5. Panduan per framework

### HTML biasa

**Langkah 1.** Tambahkan script CDN di dalam `<head>`.

**Langkah 2.** Gunakan tag atau fungsi JavaScript-nya.

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>
</head>
<body>
  <ycab-loader variant="iserve"></ycab-loader>

  <button onclick="YCABLoader.show({ variant: 'logo' })">Tampilkan loading</button>
</body>
</html>
```

### React

**Langkah 1.** Install package:

```bash
npm i @ycab-foundation/loading-screen
```

**Langkah 2.** Import di `main.jsx` (atau `index.js`):

```jsx
import "@ycab-foundation/loading-screen";
```

**Langkah 3.** Gunakan di komponen:

```jsx
export default function UserList({ loading, users }) {
  if (loading) {
    return <ycab-loader variant="iserve" theme="auto" />;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Langkah 4 (opsional).** Tampilkan loading layar penuh saat menyimpan data:

```jsx
import YCABLoader from "@ycab-foundation/loading-screen";

async function handleSave(data) {
  await YCABLoader.wrap(
    fetch("/api/save", { method: "POST", body: JSON.stringify(data) }),
    { variant: "logo" }
  );
}
```

> **Catatan:** Di React, tulis atribut `fullscreen`, `plain`, dan `hide-label` dengan string kosong, misalnya `<ycab-loader fullscreen="" />`. Hindari penulisan `fullscreen={true}`.

### Next.js (App Router)

**Langkah 1.** Install package:

```bash
npm i @ycab-foundation/loading-screen
```

**Langkah 2.** Buat file `app/loading.jsx`. Next.js akan menampilkan file ini secara otomatis setiap kali halaman sedang dimuat.

```jsx
"use client";
import "@ycab-foundation/loading-screen";

export default function Loading() {
  return <ycab-loader variant="iserve" fullscreen="" />;
}
```

Baris `"use client"` wajib ada karena loading screen ini berjalan di browser.

### Vue 3

**Langkah 1.** Install package:

```bash
npm i @ycab-foundation/loading-screen
```

**Langkah 2.** Daftarkan `ycab-loader` sebagai custom element di `vite.config.js`. Tanpa langkah ini, Vue akan menampilkan peringatan di console.

```js
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "ycab-loader",
        },
      },
    }),
  ],
};
```

**Langkah 3.** Import di `main.js`:

```js
import "@ycab-foundation/loading-screen";
```

**Langkah 4.** Gunakan di komponen:

```vue
<script setup>
import { ref } from "vue";

const loading = ref(true);
</script>

<template>
  <ycab-loader v-if="loading" variant="values" theme="auto" />
</template>
```

### Laravel

#### Menggunakan Vite

**Langkah 1.** Install package:

```bash
npm i @ycab-foundation/loading-screen
```

**Langkah 2.** Import di `resources/js/app.js`:

```js
import "@ycab-foundation/loading-screen";
```

**Langkah 3.** Pastikan layout Blade kamu sudah memuat `@vite('resources/js/app.js')`. Setelah itu, tag `<ycab-loader>` bisa digunakan di semua view.

#### Tanpa Vite (Blade saja)

**Langkah 1.** Tambahkan script CDN di layout utama, misalnya `resources/views/layouts/app.blade.php`:

```blade
<head>
  <script src="https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js"></script>
</head>
```

**Langkah 2.** Gunakan di view mana pun.

#### Contoh: loading saat form disubmit

```blade
<form method="POST" action="{{ route('orders.store') }}" onsubmit="YCABLoader.show({ variant: 'logo' })">
  @csrf
  <input type="text" name="name">
  <button type="submit">Simpan</button>
</form>
```

Loading akan tampil sampai halaman berikutnya selesai dimuat.

#### Contoh: loading otomatis untuk setiap request Axios

Tambahkan kode ini di `resources/js/app.js` (atau `bootstrap.js`). Setiap request Axios akan menampilkan loading, dan loading akan tertutup ketika response diterima.

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

Jika beberapa request berjalan bersamaan, loading baru akan tertutup setelah semua request selesai.

---

## 6. Daftar atribut

Berikut semua atribut yang bisa kamu tambahkan pada tag `<ycab-loader>`:

| Atribut      | Pilihan nilai                  | Default   | Fungsi                                                                 |
| ------------ | ------------------------------ | --------- | ---------------------------------------------------------------------- |
| `variant`    | `iserve`, `values`, `logo`     | `iserve`  | Memilih tampilan loading.                                              |
| `theme`      | `light`, `dark`, `auto`        | `light`   | Memilih tema terang, gelap, atau mengikuti perangkat.                  |
| `fullscreen` | –                              | –         | Menampilkan loading menutupi seluruh halaman.                          |
| `plain`      | –                              | –         | Menghilangkan kotak kartu di belakang animasi (variant `iserve` dan `values`). |
| `hide-label` | –                              | –         | Menyembunyikan teks di bawah animasi.                                  |
| `label`      | teks bebas                     | `Loading` | Teks untuk pembaca layar. Pada variant `logo`, teks ini juga ditampilkan. |
| `step-ms`    | angka dalam milidetik          | 800 (`logo`: 440) | Mengatur kecepatan animasi. Semakin kecil, semakin cepat.              |

Atribut tanpa pilihan nilai (`fullscreen`, `plain`, `hide-label`) cukup ditulis namanya saja, contohnya:

```html
<ycab-loader variant="values" plain hide-label></ycab-loader>
```

---

## 7. Daftar fungsi JavaScript

Fungsi-fungsi berikut bisa diakses lewat `import YCABLoader from "@ycab-foundation/loading-screen"` atau `window.YCABLoader` jika memakai CDN.

### `YCABLoader.show(options)`

Menampilkan loading layar penuh. Jika dipanggil beberapa kali, loading tetap hanya muncul satu.

```js
YCABLoader.show({ variant: "values", theme: "dark" });
```

### `YCABLoader.hide()`

Menutup loading layar penuh. Jika `show()` dipanggil tiga kali, `hide()` juga perlu dipanggil tiga kali sebelum loading benar-benar tertutup. Untuk langsung menutupnya, gunakan:

```js
YCABLoader.hide({ force: true });
```

### `YCABLoader.wrap(proses, options)`

Menampilkan loading selama `proses` berjalan, lalu menutupnya secara otomatis.

```js
const users = await YCABLoader.wrap(
  fetch("/api/users").then((res) => res.json())
);
```

### Pilihan `options`

Pilihan berikut bisa digunakan pada `show()` dan `wrap()`:

| Pilihan     | Contoh nilai                  | Fungsi                              |
| ----------- | ----------------------------- | ----------------------------------- |
| `variant`   | `"iserve"`, `"values"`, `"logo"` | Memilih tampilan loading.        |
| `theme`     | `"light"`, `"dark"`, `"auto"` | Memilih tema.                       |
| `hideLabel` | `true`                        | Menyembunyikan teks.                |
| `plain`     | `true`                        | Menghilangkan kotak kartu.          |
| `label`     | `"Menyimpan data…"`           | Teks untuk pembaca layar.           |
| `stepMs`    | `600`                         | Mengatur kecepatan animasi.         |

---

## 8. Mengubah warna dan gaya

### Mengganti warna

Kamu bisa menyesuaikan warna loading dengan CSS biasa di project kamu:

```css
ycab-loader {
  --ycab-red: #d6001c;
  --ycab-card: #fffaf5;
  --ycab-backdrop: rgba(255, 255, 255, 0.85);
}
```

| Variable          | Yang diubah                                   |
| ----------------- | --------------------------------------------- |
| `--ycab-red`      | Warna aksen (ikon dan huruf yang aktif)       |
| `--ycab-card`     | Warna latar kartu                             |
| `--ycab-ink`      | Warna teks di dalam kartu                     |
| `--ycab-border`   | Warna garis tepi kartu                        |
| `--ycab-shadow`   | Bayangan kartu                                |
| `--ycab-backdrop` | Warna latar saat mode layar penuh             |

### Mengubah bentuk bagian tertentu

Untuk mengubah gaya bagian tertentu, gunakan `::part()`. Bagian yang tersedia adalah `card`, `label`, `icons`, `brand`, dan `logo`.

```css
ycab-loader::part(card) {
  border-radius: 12px;
}

ycab-loader::part(label) {
  font-size: 14px;
}
```

### Mematikan font dari Google Fonts

Variant `iserve` memakai font Nunito yang dimuat dari Google Fonts. Jika project kamu tidak mengizinkan koneksi ke Google Fonts, tambahkan kode ini **sebelum** package dimuat:

```html
<script>
  window.YCAB_LOADER_NO_FONT = true;
</script>
```

Loading akan tetap tampil normal dengan font bawaan sistem.
