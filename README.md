# 🎮 Khanza.NET STORE — Platform Marketplace & Rekber Akun Game
> **A Member of PT. Khanza Digital Nusantara**  
> *Platform Marketplace Jual Beli Akun Game Terpercaya, Bergaransi Anti-Hackback & Berbadan Hukum Resmi.*

---

## 🌟 Fitur Unggulan

### 1. 🛡️ CMS Admin Dashboard (Pusat Pengelolaan)
- **Otorisasi Terproteksi:** Dilindungi PIN login rahasia admin dengan enkripsi lokal.
- 🔑 **Menu Ganti Password:** Fitur ubah password / PIN admin langsung di dalam panel CMS dengan verifikasi kata sandi lama, visibilitas toggle mata (show/hide), serta fitur pemulihan darurat (*Emergency Reset*).
- 📊 **Ringkasan Bisnis (KPI Dashboard):**
  - Nilai total aset inventory akun tersedia (*Asset Value*).
  - Total omset transaksi rekber selesai (*Gross Revenue*).
  - Distribusi stok akun per game universe.
  - Jumlah pesanan masuk yang perlu diproses admin.
- 📦 **Katalog Akun (CRUD Lengkap):** Tambah akun baru, ubah harga, diskon flash sale, badge sultan, spesifikasi akun, ubah status (`Tersedia`, `Booked`, `Terjual`), hingga hapus akun.
- 🧾 **Pesanan Rekber (Orders Management):** Daftar invoice otomatis dari pembeli, terintegrasi tombol WhatsApp direct untuk panduan serah terima data login secara instan.
- 🎟️ **Kupon Promo & Voucher Diskon:** Buat dan kelola kupon potongan persentase (%) atau nominal rupiah (Rp).
- ⚙️ **Pengaturan & Backup Data:** 
  - Ganti nomor WhatsApp Admin Rekber.
  - **Export Cadangan Database (JSON)** untuk mengamankan data ke komputer/server.
  - Reset database ke pengaturan default pabrik kapan pun dibutuhkan.

### 2. 📱 100% Mobile & Gadget Optimized
- **Mobile Bottom Navigation Bar:** Bilah menu bawah khas aplikasi e-commerce modern (Home, Katalog, Wishlist, Keranjang, Admin).
- **Sticky Buy Bar:** Tombol "Beli via WA" dan "Checkout" menempel di bawah layar HP saat melihat detail akun, memudahkan checkout dengan satu jempol tanpa harus scroll panjang.
- **Adaptive Touch Controls:** Responsive grid, modal layar penuh otomatis pada HP, dan input yang ramah keyboard smartphone.

### 3. 🎨 Adaptive Game Universe Themes
Warna tema, background banner, sound effect audio (Web Audio API), dan katalog otomatis beradaptasi saat memilih game:
- ⚔️ **Mobile Legends (MLBB):** Mythic Gold & Royal Blue
- 🎯 **Valorant:** Tactical Crimson & Radiant Cyan
- ✨ **Genshin Impact:** Celestial Gold & Astral Indigo
- 🔥 **Free Fire (FF):** Blazing Lava & Volcanic Ember
- 🛡️ **PUBG Mobile (PUBGM):** Hazard Yellow & Military Carbon
- 🚀 **Honkai: Star Rail (HSR):** Astral Cosmic Violet & Neon Cyan

---

## 🖥️ Panduan Instalasi di LXC Container Proxmox

Panduan ini ditujukan untuk deployment di container **LXC Proxmox** (menggunakan template OS **Debian 12** atau **Ubuntu 22.04 / 24.04 LTS**).

### Langkah 1: Buat Container LXC di Proxmox VE
1. Masuk ke Web GUI Proxmox VE Anda (`https://IP-PROXMOX:8006`).
2. Klik **Create CT** (di pojok kanan atas):
   - **General:** Beri Hostname (misal: `khanza-store`), masukkan password root.
   - **Template:** Pilih template Linux standar (rekomendasi: `debian-12-standard` atau `ubuntu-22.04-standard`).
   - **Disks:** Alokasikan minimal **8 GB - 15 GB** disk.
   - **CPU:** 1 atau 2 Cores.
   - **Memory:** 1024 MB (1 GB) RAM & 512 MB Swap sudah sangat cukup.
   - **Network:** Gunakan IP statis (misal: `192.168.1.50/24`) atau DHCP.
3. Klik **Finish** dan jalankan (*Start*) container LXC tersebut.

---

### Langkah 2: Masuk ke Terminal LXC & Pasang Kebutuhan (Node.js & Nginx)
Buka Console LXC di Proxmox, kemudian jalankan perintah berikut:

```bash
# 1. Update paket sistem
apt update && apt upgrade -y

# 2. Pasang utilitas dasar (curl, git, nginx, rsync)
apt install -y curl git nginx rsync ufw

# 3. Pasang Node.js LTS (Versi 20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 4. Verifikasi versi
node -v
npm -v
```

---

### Langkah 3: Clone Repository & Build Project

```bash
# 1. Masuk ke direktori web root server
cd /var/www

# 2. Clone repository Khanza.NET STORE
git clone https://github.com/kajurtkjsmkbp-hub/katalog-akun-game.git

# 3. Masuk ke direktori project
cd /var/www/katalog-akun-game

# 4. Pasang dependensi project
npm install

# 5. Build aplikasi untuk mode production
npm run build
```

Hasil build akan terbentuk di direktori `/var/www/katalog-akun-game/dist`.

---

### Langkah 4: Konfigurasi Web Server Nginx

Buat file konfigurasi Nginx untuk melayani aplikasi:

```bash
nano /etc/nginx/sites-available/katalog-akun-game
```

Tempelkan konfigurasi berikut:

```nginx
server {
    listen 80;
    server_name _;  # Ganti dengan nama domain Anda jika ada (misal: store.khanza.net)

    root /var/www/katalog-akun-game/dist;
    index index.html;

    # Gzip Compression untuk performa cepat di HP
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        # Fallback ke index.html untuk Single Page Application (SPA React)
        try_files $uri $uri/ /index.html;
    }

    # Cache file statis agar loading instan
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 404 /index.html;
}
```

Aktifkan konfigurasi dan restart Nginx:

```bash
# Hapus default config jika ada
rm -f /etc/nginx/sites-enabled/default

# Aktifkan konfigurasi baru
ln -s /etc/nginx/sites-available/katalog-akun-game /etc/nginx/sites-enabled/

# Uji konfigurasi Nginx
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx
```

🎉 **Selesai!** Buka browser dan akses IP container LXC Anda (misal: `http://192.168.1.50`).

---

## 🔄 Panduan Update Kode di Proxmox (Data Aman & Tidak Ditindih)

Ketika terdapat pembaruan kode baru dari GitHub, ikuti prosedur aman berikut agar **data konfigurasi lokal, file backup data akun, dan pengaturan di Proxmox TIDAK tertimpa / terhapus**:

### Cara Cepat (Jalankan di Terminal LXC):

```bash
# 1. Pindah ke folder project di container LXC
cd /var/www/katalog-akun-game

# 2. Amankan perubahan lokal jika ada (misal modifikasi env atau file custom)
git stash save "backup-lokal-$(date +%Y%m%d_%H%M%S)"

# 3. Tarik update kode terbaru dari repository GitHub
git pull origin main

# 4. Pasang dependensi baru jika ada penambahan library
npm install

# 5. Build ulang versi produksi
npm run build

# 6. Bersihkan cache Nginx dan muat ulang layanan (Zero-Downtime)
systemctl reload nginx
```

---

### 🛡️ Mengapa Data Anda Tetap Aman di Proxmox?
1. **Penyimpanan Katalog & Transaksi:** 
   Sistem Khanza.NET STORE menyimpan database akun dan pesanan yang Anda ubah di penyimpanan browser (`localStorage`) di bawah kunci `khanza_*` yang persisten dan independen dari proses `git pull`.
2. **Cadangan Manual (Ekspor JSON):**
   Sebelum melakukan pembaruan besar, Anda juga disarankan membuka:
   > **CMS Admin** ➔ Tab **Pengaturan & Backup** ➔ Klik **"Unduh Cadangan Database (JSON)"**.
   File JSON ini dapat diunggah kembali kapan saja jika Anda ingin memulihkan seluruh katalog akun secara instan.

---

## ⚙️ Skrip Update Otomatis (Opsional)

Untuk memudahkan pembaruan rutin cukup dengan 1 perintah di terminal LXC Proxmox:

```bash
cat << 'EOF' > /usr/local/bin/update-katalog
#!/bin/bash
set -e
echo "🔄 [1/4] Mengamankan file lokal..."
cd /var/www/katalog-akun-game
git stash save "auto-backup-$(date +%Y%m%d_%H%M%S)" || true

echo "⬇️ [2/4] Mengunduh pembaruan dari GitHub..."
git pull origin main

echo "📦 [3/4] Mengompilasi aplikasi..."
npm install
npm run build

echo "🚀 [4/4] Memuat ulang Nginx..."
systemctl reload nginx

echo "✅ Pembaruan selesai! Data akun dan konfigurasi tetap aman."
EOF

# Berikan izin eksekusi
chmod +x /usr/local/bin/update-katalog
```

Setiap kali ingin update di masa mendatang, cukup ketik:
```bash
update-katalog
```

---

## 📞 Bantuan & Legalitas
- **Platform:** Khanza.NET STORE
- **Badan Usaha:** PT. Khanza Digital Nusantara
- **Repository:** [https://github.com/kajurtkjsmkbp-hub/katalog-akun-game](https://github.com/kajurtkjsmkbp-hub/katalog-akun-game)
- **Lisensi:** MIT License
