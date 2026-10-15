# 🧠 INGATAN PROYEK (PROJECT BRAIN & MEMORY)
> **Dokumentasi Lengkap Memori, Konteks, Arsitektur, Riwayat Keputusan, dan Panduan Operasional Khanza.NET STORE**  
> *Terakhir diperbarui: 2026-10-15*

---

## 🏢 1. Profil & Identitas Proyek

* **Nama Platform:** Khanza.NET STORE
* **Badan Usaha / Legal Holding:** PT. Khanza Digital Nusantara
* **Format Branding Resmi:** `Khanza.NET STORE — A Member of PT. Khanza Digital Nusantara`
* **Legalitas Usaha:**
  - **NIB (Nomor Induk Berusaha):** 2410260089123
  - **Status Kominfo:** Terdaftar Resmi PSE (Penyelenggara Sistem Elektronik)
  - **Jaminan Transaksi:** Sistem Escrow / Rekber Resmi Bergaransi Anti-Hackback Seumur Hidup
* **Repository GitHub:** [https://github.com/kajurtkjsmkbp-hub/katalog-akun-game](https://github.com/kajurtkjsmkbp-hub/katalog-akun-game)
* **Branch Utama:** `main`

---

## 🛠️ 2. Arsitektur Teknologi & Dependensi

* **Framework:** React 19 + Vite 6
* **Styling & CSS:** Tailwind CSS v3 (`tailwindcss@3.4.19`, `autoprefixer`, `postcss`)
* **Typography:** 
  - `Rajdhani` (Heading gaming esports)
  - `Chakra Petch` (Display font futuristik)
  - `Inter` (Body text modern & clean)
* **Icon Library:** `lucide-react`
* **Audio Engine:** Web Audio API Native Synth (SFX hover, click, modal popup, theme switch, dan checkout sukses tanpa aset audio eksternal)
* **Animasi & Efek:** `canvas-confetti` (efek klaim kupon promo dan sukses checkout)
* **Penyimpanan Data (Persistence):**
  - Menggunakan browser `localStorage` dengan prefix `khanza_*`:
    - `khanza_game_accounts`: Seluruh data inventaris akun game (CRUD dinamis).
    - `khanza_orders`: Riwayat transaksi dan invoice pesanan rekber.
    - `khanza_vouchers`: Daftar kupon diskon promo aktif.
    - `khanza_admin_phone`: Nomor WhatsApp Admin Rekber resmi.
    - `khanza_admin_pin`: PIN otorisasi CMS Admin (Default awal: `admin123` / dapat diubah).

---

## 🎨 3. Adaptive Game Universe Themes

Platform mendukung perubahan tema visual secara dinamis berbasis data CSS Variables (`data-theme`) pada elemen `<html>`:

1. **Semua Game (`all`):** Cyber Indigo & Neon Cyan
2. **Mobile Legends (`mlbb`):** Mythic Gold & Royal Electric Blue (Badge Collector/Legend)
3. **Valorant (`valorant`):** Tactical Crimson & Radiant Cyan (Kurunami & Champions showcase)
4. **Genshin Impact (`genshin`):** Celestial Gold & Astral Deep Indigo (C6R5 & Primogems)
5. **Free Fire (`ff`):** Blazing Lava & Volcanic Ember (Bundle Old S1/S2)
6. **PUBG Mobile (`pubgm`):** Hazard Yellow & Military Carbon (Glacier M416 Max)
7. **Honkai: Star Rail (`hsr`):** Astral Cosmic Violet & Stellar Cyan (E6S5 Acheron & Firefly)

---

## 🛡️ 4. Panel CMS Admin Dashboard & Keamanan

### A. Otorisasi & Keamanan Login
* **Kebijakan Privasi:** Password/PIN aktif **TIDAK PERNAH** dibocorkan di tampilan placeholder maupun teks footer.
* **Placeholder Standar:** `Masukkan PIN / Password Admin...`
* **Fitur Ganti Password:**
  - Terletak pada tab **"Ganti Password"** di sidebar CMS Admin.
  - Form: Password Saat Ini (Lama) ➔ Password Baru (min 4 karakter) ➔ Ulangi Password Baru.
  - Dilengkapi ikon toggle mata (show/hide password).
  - Validasi error jika password lama tidak cocok atau konfirmasi berbeda.
* **Fitur Pemulihan Darurat (Reset Password):**
  - Tombol **"Lupa Password?"** pada modal login.
  - Masukkan kata verifikasi `khanza` untuk mengembalikan password ke default `admin123`.

### B. Fitur Manajemen di CMS
* **Ringkasan Bisnis (Dashboard):** KPI real-time (Aset inventory ready, omset penjualan sukses, total akun per game, pesanan rekber masuk).
* **Katalog Akun:** Pencarian cepat, filter game, filter status, tambah akun baru, edit akun modal, hapus akun, dan tombol ubah status 1-klik (`Tersedia`, `Booked`, `Terjual`).
* **Pesanan Rekber:** Daftar invoice, info buyer (nama, no WA, email), tombol langsung chat WhatsApp pembeli dengan pesan otomatis serah terima akun, dan update status pesanan.
* **Kupon Promo:** Pembuatan voucher persentase (%) atau potongan harga rupiah (Rp).
* **Pengaturan & Backup:** Ganti nomor WA admin, ekspor seluruh database ke file `JSON`, dan opsi factory reset.

---

## 📱 5. Optimasi Mobile & Gadget (100% Responsif)

* **Mobile Bottom Navigation Bar (`MobileBottomNav.jsx`):**
  - Bilah menu bawah permanen di layar smartphone (Home, Katalog, Wishlist dengan badge jumlah, Keranjang dengan badge jumlah, dan CMS Admin).
* **Sticky Bottom Buy Bar (`AccountDetailModal.jsx`):**
  - Di layar HP, tombol `Beli WA` dan `Checkout` selalu melayang di bawah layar sehingga pelanggan dapat langsung bertransaksi tanpa perlu scroll panjang.
* **Anti Auto-Zoom iOS:**
  - Input teks pada smartphone menggunakan ukuran `16px / text-base` agar Safari iOS tidak melakukan zoom otomatis saat mengetik.
* **Touch-Friendly Controls:**
  - Modal adaptif menjadi full-screen di layar HP (`rounded-none sm:rounded-3xl`).
  - Menu tab CMS Admin berupa horizontal pill slider yang dapat digeser halus dengan jari (`scrollbar-none`).

---

## 🖥️ 6. Prosedur Deployment di LXC Proxmox

* **OS Rekomendasi:** Debian 12 / Ubuntu 22.04 LTS Container.
* **Web Server:** Nginx (Single Page Application configuration).
* **Runtime:** Node.js 20.x LTS.

### Konfigurasi Nginx (`/etc/nginx/sites-available/katalog-akun-game`):
```nginx
server {
    listen 80;
    server_name _;

    root /var/www/katalog-akun-game/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 404 /index.html;
}
```

---

## 🔄 7. Prosedur Update Kode di Proxmox (Data TIDAK Boleh Ditindih)

### Mengapa data aman saat update?
1. Seluruh akun game, pesanan, dan PIN yang dibuat atau diedit tersimpan di `localStorage` browser di bawah kunci `khanza_*`, bukan di file kode Git.
2. Proses `git pull` hanya memperbarui berkas aplikasi (HTML, CSS, JS) tanpa menghapus data browser maupun konfigurasi lokal.

### Perintah Update Manual:
```bash
cd /var/www/katalog-akun-game
git stash save "backup-lokal-$(date +%Y%m%d_%H%M%S)"
git pull origin main
npm install
npm run build
systemctl reload nginx
```

### Skrip Update 1-Perintah (`/usr/local/bin/update-katalog`):
```bash
cat << 'EOF' > /usr/local/bin/update-katalog
#!/bin/bash
set -e
echo "🔄 Mengamankan data lokal..."
cd /var/www/katalog-akun-game
git stash save "backup-$(date +%Y%m%d_%H%M%S)" || true

echo "⬇️ Mengunduh pembaruan dari GitHub..."
git pull origin main

echo "📦 Membangun aplikasi..."
npm install
npm run build

echo "🚀 Memuat ulang Nginx..."
systemctl reload nginx

echo "✅ Selesai! Update berhasil tanpa menindih data lokal."
EOF

chmod +x /usr/local/bin/update-katalog
```

---

## 📜 8. Ringkasan File Kunci Proyek

* `index.html` — Entry point HTML dengan font gaming dan title PT. Khanza Digital Nusantara.
* `src/main.jsx` — React root bootstrap.
* `src/App.jsx` — Komponen utama, orkestrasi modal, drawer, filter, dan MobileBottomNav.
* `src/index.css` — Definisi CSS Variables untuk tema 6 game, cyber-grid, glassmorphism, no-scrollbar.
* `src/context/ThemeContext.jsx` — Pengelola tema game aktif dan sound effects Web Audio API.
* `src/context/CartContext.jsx` — Penyimpanan data reaktif dan LocalStorage `khanza_*`.
* `src/components/Navbar.jsx` — Header dengan branding resmi, pencarian, dan menu aksi.
* `src/components/MobileBottomNav.jsx` — Bilah navigasi bawah untuk pengguna HP/gadget.
* `src/components/AdminCMSModal.jsx` — Dashboard CMS Admin, auth, CRUD, orders, dan ganti password.
* `src/components/EditAccountModal.jsx` — Form modal edit spesifikasi akun.
* `src/components/AddAccountModal.jsx` — Form penambahan akun baru.
* `src/components/AccountCard.jsx` — Tampilan kartu akun game esports dengan fast buy WA.
* `src/components/AccountDetailModal.jsx` — Detail lengkap spesifikasi akun dengan sticky action bar mobile.
* `src/components/CheckoutModal.jsx` — Alur checkout rekber, voucher, dan pembuatan invoice.
* `src/components/GameSelector.jsx` — Selector game dengan audio FX dan auto-adapt theme.
* `src/components/FilterBar.jsx` — Filter rank, kategori badge, dan sorting harga/rating.
* `src/components/TrustSection.jsx` — Informasi legalitas PT. Khanza Digital Nusantara dan review pembeli.
* `src/components/Footer.jsx` — Legalitas usaha lengkap (NIB, PSE Kominfo, izin Rekber).
* `README.md` — Dokumentasi publik GitHub beserta panduan Proxmox LXC.
* `INGATAN.md` — File ini (dokumentasi memori lengkap).
