# Cara Publish Update

Dokumen ini untuk tim yang mengelola package `@ycab-foundation/loading-screen`.
Ikuti langkah-langkah di bawah setiap kali ada perubahan yang perlu diterbitkan ke npm.

---

## Yang perlu disiapkan

Sebelum mulai, pastikan:

1. Kamu sudah login ke akun npm yang punya akses ke organization `ycab-foundation`.
2. Two-Factor Authentication (2FA) di akun npm sudah aktif.
3. Perubahan kode sudah selesai dan sudah dites di `demo.html`.

Cek status login:

```bash
npm whoami
```

Jika belum login:

```bash
npm login
```

---

## Langkah publish update

### 1. Bangun ulang package

Jalankan build agar folder `dist/` berisi versi terbaru:

```bash
npm run build
```

Buka `demo.html` di browser dan pastikan ketiga variant (`iserve`, `values`, `logo`) masih tampil normal.

### 2. Commit perubahan

Simpan semua perubahan ke Git, termasuk folder `dist/`:

```bash
git add -A
git commit -m "Deskripsi singkat perubahan"
```

Contoh pesan commit yang jelas:

- `Update animasi variant values`
- `Perbaiki tampilan dark mode di logo`
- `Perbarui README cara pakai`

### 3. Naikkan nomor versi

Pilih salah satu sesuai besarnya perubahan:

| Perintah            | Contoh hasil | Kapan dipakai                                      |
| ------------------- | ------------ | -------------------------------------------------- |
| `npm version patch` | `1.0.3` → `1.0.4` | Perbaikan kecil, update README, perbaikan bug     |
| `npm version minor` | `1.0.3` → `1.1.0` | Fitur baru yang tetap kompatibel dengan versi lama |
| `npm version major` | `1.0.3` → `2.0.0` | Perubahan yang bisa memutus cara pakai lama        |

Perintah ini otomatis:

- mengubah nomor versi di `package.json`
- membuat commit versi
- membuat tag Git (misalnya `v1.0.4`)

### 4. Push ke GitHub

```bash
git push origin main --follow-tags
```

Flag `--follow-tags` ikut mengirim tag versi ke GitHub.

### 5. Publish ke npm

```bash
npm publish --access public
```

Jika npm meminta kode 2FA, masukkan kode dari aplikasi authenticator:

```bash
npm publish --access public --otp=123456
```

Atau, jika memakai security key / passkey, ikuti konfirmasi yang muncul di browser.

### 6. Pastikan publish berhasil

Buka halaman package:

[https://www.npmjs.com/package/@ycab-foundation/loading-screen](https://www.npmjs.com/package/@ycab-foundation/loading-screen)

Pastikan nomor versi terbaru sudah muncul. CDN biasanya menyusul beberapa menit kemudian:

```
https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1/dist/ycab-loader.js
```

---

## Ringkasan perintah

Salin dan sesuaikan pesan commit-nya:

```bash
npm run build
git add -A
git commit -m "Deskripsi singkat perubahan"
npm version patch
git push origin main --follow-tags
npm publish --access public
```

---

## Jika publish gagal

### Error 403 — butuh 2FA

Aktifkan Two-Factor Authentication di [npmjs.com](https://www.npmjs.com/) lewat **Account → Two-Factor Authentication**, lalu coba publish lagi.

### Error 403 — tidak punya akses organization

Pastikan akun npm kamu adalah anggota organization `ycab-foundation`. Minta admin organization untuk menambahkan akses.

### Error 403 — versi sudah ada

Nomor versi di `package.json` sudah pernah dipublish. Naikkan lagi dengan `npm version patch`, lalu publish ulang.

### CDN belum menampilkan update

CDN jsDelivr bisa menyimpan cache beberapa menit. Tunggu sebentar, atau pakai URL dengan nomor versi lengkap, misalnya:

```
https://cdn.jsdelivr.net/npm/@ycab-foundation/loading-screen@1.0.4/dist/ycab-loader.js
```

---

## Catatan penting

- Folder `dist/` harus ikut di-commit. Tanpa itu, CDN dan pengguna yang menginstal dari GitHub tidak mendapat file terbaru.
- README (`README.md`) ikut terbit ke halaman npm saat publish. Jika README diubah, naikkan versi (minimal `patch`) supaya halaman npm ikut terbarui.
- Jangan mengubah nomor versi di `package.json` secara manual. Selalu pakai `npm version` agar tag Git dan versi npm tetap selaras.
