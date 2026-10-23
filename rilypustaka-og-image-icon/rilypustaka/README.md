# RilyLibrary (rilypustaka)

Website perpustakaan sederhana — **Read. Discover. Imagine.**

## Live

- GitHub Pages: https://rilyavfianca.github.io/rilypustaka/
- Custom domain (jika sudah aktif): https://rilyavfianca.my.id/

## Fitur

- Koleksi buku dari `data/books.json`
- Filter kategori & pencarian
- Open Graph / Twitter Card (`og:image`) agar thumbnail muncul otomatis saat link di-share ke WhatsApp, Telegram, Facebook, X, dll.

## Deploy ulang ke GitHub Pages

1. Upload / push seluruh isi folder ini ke repo `rilypustaka` (branch `main`).
2. Pastikan GitHub Pages aktif: Settings → Pages → Source = Deploy from a branch → `main` / root.
3. Setelah live, cek preview link:
   - WhatsApp: kirim link ke chat pribadi
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter/X: https://cards-dev.twitter.com/validator
4. Jika thumbnail lama masih muncul, klik **Scrape Again** di Facebook Debugger.

## Catatan domain custom

Jika `https://rilyavfianca.my.id/` sudah mengarah ke repo ini, ganti di `index.html`:

- `og:url` → `https://rilyavfianca.my.id/`
- `og:image` & `twitter:image` → `https://rilyavfianca.my.id/assets/og-image.jpg`
- `canonical` → `https://rilyavfianca.my.id/`

File gambar OG: `assets/og-image.jpg` (1200×630).

## Ikon / Favicon

Sudah termasuk:
- `assets/favicon.ico` + PNG sizes (16, 32, 48, 192, 512)
- `assets/apple-touch-icon.png` (180×180)
- `assets/logo-1024.png` (versi besar)
- `assets/site.webmanifest`

Ikon berupa buku terbuka dengan daun (warna sage/forest green + cream + gold), cocok dengan tema website.
