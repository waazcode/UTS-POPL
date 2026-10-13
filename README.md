# Betah.in — Platform Pencarian & Komparasi Kos Mahasiswa

> **Tugas Proyek UTS Praktikum Pemrograman Berorientasi Objek Lanjut (POPL) A**  
> **Tema:** Web Application Front-End Mahasiswa (Single Page Application)  
> **Framework:** React 19 + Vite (Component-Based Object-Oriented Architecture)  
> **Kontainerisasi:** Docker Multi-Stage Build (Node 20 + Nginx Alpine)  
> **Docker Hub Repository:** `https://hub.docker.com/r/fawwaz/betahin` *(Ganti dengan username Docker Hub tim kalian)*

---

## 👥 Struktur Anggota Tim

| No | Nama Anggota | NIM | Peran Utama & Kontribusi |
|:---|:---|:---|:---|
| 1. | **Fawwaz Ziyadi Ilmi** | *(Isi NIM)* | **Lead Front-End & Docker:** Arsitektur SPA, Custom Hooks (`useKos`), Multi-stage Dockerfile, Integrasi Router |
| 2. | *(Nama Anggota 2)* | *(Isi NIM)* | **UI/UX & State Manager:** Context Provider (`FavoritContext`, `BandinginContext`), LocalStorage Persistence, Komponen Filter & Sort |
| 3. | *(Nama Anggota 3)* | *(Isi NIM)* | **Presenter Components & Testing:** Komparasi Side-by-Side (`CompareTable`), Detail Kos, Photo Gallery, Dokumentasi Presentasi |

---

## 📌 Deskripsi Singkat Proyek

### 1. Latar Belakang Masalah
Bagi mahasiswa baru maupun mahasiswa tingkat lanjut di kota pendidikan, mencari tempat tinggal sementara (kos-kosan) sering kali menjadi proses yang melelahkan dan memakan waktu. Permasalahan umum yang sering dihadapi antara lain:
- **Informasi tersebar dan tidak terstandar:** Mahasiswa harus berpindah-pindah platform atau mendatangi gang-gang sempit satu per satu.
- **Kesulitan membandingkan:** Sulit menimbang antara dua atau tiga pilihan kos (misalnya kos A lebih murah tetapi lebih jauh, sedangkan kos B fasilitasnya lebih lengkap namun lebih mahal).
- **Adanya calo / biaya admin tersembunyi:** Banyak platform komersial yang memungut biaya perantara atau membatasi komunikasi langsung ke pemilik kos.

### 2. Tujuan
Aplikasi **Betah.in** dibangun untuk:
1. Menyediakan Single Page Application (SPA) yang cepat, intuitif, dan responsif bagi mahasiswa untuk menjelajahi kos di sekitar kampus.
2. Memberikan fitur filter cerdas multi-kriteria secara instan di sisi klien tanpa perlu reload halaman.
3. Menghadirkan tabel perbandingan (*side-by-side comparison*) dengan penanda otomatis untuk nilai terbaik (*Termurah* dan *Terdekat*).
4. Menghubungkan calon penghuni langsung dengan pemilik kos melalui integrasi pesan WhatsApp otomatis tanpa perantara.

### 3. Manfaat
- **Efisiensi Waktu:** Mahasiswa dapat memfilter dan membandingkan 2–3 kos sekaligus hanya dalam beberapa klik.
- **Transparansi Biaya & Fasilitas:** Matriks fasilitas memudahkan pengecekan ketersediaan AC, WiFi, kamar mandi dalam, dan parkir.
- **Portabilitas & Kemudahan Deployment:** Seluruh aplikasi dibungkus dalam Docker image berbasis Nginx yang sangat ringan (~62 MB) dan siap di-deploy ke lingkungan komputasi awan (GCP / Docker Hub).

---

## 🎯 Target Pengguna & Ruang Lingkup

- **Target Pengguna:** Mahasiswa dan mahasiswi perguruan tinggi yang mencari hunian dekat kampus.
- **Cakupan Wilayah Data:** Kota **Banda Aceh** (fokus pada kawasan sentra mahasiswa sekitar kampus **Universitas Syiah Kuala (USK)**, **UIN Ar-Raniry**, dan **UNMUHA** seperti Kopelma Darussalam, Rukoh, Lamgugob, Batoh, Jeulingke, dan Ulee Kareng).
- **Fokus Utama:** **Front-End Development** (seluruh filter, sorting, komparasi, dan persistensi favorit berjalan di browser menggunakan Context API dan localStorage). Backend bersifat opsional dan pada tahap UTS ini data dibaca dari static JSON dataset terstruktur.

---

## 🏛️ Arsitektur Berbasis OOP & Design Patterns

Aplikasi ini menerapkan prinsip-prinsip Berorientasi Objek (*Object-Oriented Programming* & *Component-Based Architecture*) yang dimanifestasikan melalui 3 design pattern utama:

```
src/
├── data/
│   └── kos.json               # Static Single Source of Truth
├── context/                   # [PROVIDER PATTERN] Global State Providers
│   ├── FavoritContext.jsx
│   ├── BandinginContext.jsx
│   └── ToastContext.jsx
├── hooks/                     # [CUSTOM HOOKS PATTERN] Encapsulated Business Logic
│   ├── useKos.js
│   ├── useFavorit.js
│   ├── useCompare.js
│   └── useToast.js
├── components/                # [PRESENTER PATTERN] Stateless / Pure Presentational Components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── KosCard.jsx
│   ├── FilterBar.jsx
│   ├── SortSelect.jsx
│   ├── Gallery.jsx
│   ├── CompareTable.jsx
│   ├── EmptyState.jsx
│   └── Toast.jsx
├── pages/                     # [CONTAINER PATTERN] Stateful Route Containers
│   ├── HomePage.jsx
│   ├── KosListPage.jsx
│   ├── KosDetailPage.jsx
│   ├── FavoritPage.jsx
│   ├── BandinginPage.jsx
│   └── NotFoundPage.jsx
└── styles/
    └── index.css              # Modern Vanilla CSS Design System
```

### 1. Container-Presenter Pattern
Memisahkan tanggung jawab antara pengelolaan logika/data (*Container*) dan representasi visual antarmuka (*Presenter*):
- **Container Pages** (`KosListPage`, `KosDetailPage`, `BandinginPage`):
  Mengambil data, memanggil hooks, mengelola siklus hidup komponen, dan mendistribusikan data ke komponen visual.
- **Presenter Components** (`KosCard`, `FilterBar`, `SortSelect`, `CompareTable`, `Gallery`):
  Murni menerima `props` dan memicu callback event (`onToggleFavorit`, `onToggleCompare`) tanpa terikat langsung pada global state.

### 2. Custom Hooks Pattern
Mengisolasi dan merangkum logika bisnis agar dapat digunakan kembali (*reusable*) dan teruji:
- **`useKos`**: Menjalankan pipeline filter berurutan (kata kunci → rentang harga → jarak maks → tipe kos → fasilitas dengan logika AND) dan pengurutan (*sorting*).
- **`useFavorit`**: Mengelola *toggle* favorit dan sinkronisasi otomatis ke `localStorage`.
- **`useCompare`**: Mengelola validasi batas maksimal 3 kos, minimal 2 kos untuk komparasi, dan penentuan kos terbaik.

### 3. Context & Provider Pattern
Menyediakan *state sharing* global tanpa *prop drilling* berlapis:
- **`FavoritContext`**: Membagikan status dan jumlah kos tersimpan ke `Navbar`, `KosCard`, dan `FavoritPage`.
- **`BandinginContext`**: Membagikan status kos yang dipilih untuk komparasi ke `Navbar`, `KosCard`, dan `BandinginPage`.
- **`ToastContext`**: Memberikan umpan balik visual (*toast notification*) mengambang secara dinamis.

---

## ⚙️ Fitur-Fitur Unggulan Aplikasi

1. **Katalog & Filter Multi-Kriteria Instan:**
   - Pencarian real-time berdasarkan nama kos, alamat, atau kampus.
   - Filter rentang harga per bulan dengan slider interaktif.
   - Filter radius jarak ke kampus (0.5 km – 5.0 km).
   - Filter tipe kos (Semua, Putra, Putri, Campur).
   - Filter fasilitas wajib (AC, WiFi, Kamar Mandi Dalam, Kasur, Lemari, Parkir, dll.) dengan syarat kos harus memiliki **seluruh** fasilitas terpilih.
   - Tombol *Reset Filter* otomatis saat tidak ada hasil yang cocok (*EmptyState*).

2. **Tabel Komparasi Side-by-Side (Bandingin):**
   - Mendukung pemilihan 2 hingga 3 kos.
   - Penanda otomatis **"Termurah"** (berdasarkan nilai harga terkecil) dan **"Terdekat"** (berdasarkan jarak terdekat).
   - Matriks perbandingan fasilitas dengan indikator visual *Ada* / *Tidak*.
   - Tombol hapus individu serta pembersihan seluruh slot komparasi.
   - Validasi edukatif: jika kurang dari 2 kos dipilih, sistem menampilkan panduan memilih kos tambahan.

3. **Manajemen Favorit (Browser Storage):**
   - Menandai kos dengan satu klik pada tombol hati.
   - Menggunakan `localStorage` dengan kunci `betahin_favorit` yang aman berkat *try/catch error handling*.
   - Data tetap tersimpan utuh meskipun peramban di-*refresh* atau ditutup.

4. **1-Klik Hubungi Pemilik via WhatsApp:**
   - Tautan langsung ke `https://wa.me/{nomor}` dengan pesan otomatis yang sudah menyertakan nama kos yang diminati.

5. **Responsif & Visual Modern (Vanilla CSS):**
   - Desain modern berstandar industri dengan palet warna HSL/Emerald, tipografi Google Fonts (*Plus Jakarta Sans*), micro-animations, dan tata letak responsif untuk desktop, tablet, dan smartphone.

---

## 🌿 Manajemen Versi (Git & GitHub Standard)

Sesuai dengan ketentuan praktikum POPL:

### 1. Aturan Penamaan Branch
- **Fitur Baru:** `feat_{nama_fitur}/{tanggal}`  
  Contoh: `feat_katalog-filter/13-10-2026`, `feat_bandingin-kos/13-10-2026`
- **Perbaikan Bug:** `fix_{nama_fitur}/{tanggal}`  
  Contoh: `fix_localstorage-parsing/13-10-2026`

### 2. Aturan Format Commit Message
- `feat: <deskripsi>` → Untuk penambahan/peningkatan fitur fungsional.
- `fix: <deskripsi>` → Untuk perbaikan *bug* atau kesalahan logika.
- `style: <deskripsi>` → Untuk perubahan tampilan antarmuka dan CSS.
- `chore: <deskripsi>` → Untuk perubahan konfigurasi, dependensi, atau dokumentasi.

### Contoh Riwayat Commit Terstruktur:
```bash
* feat: implementasi fitur komparasi side-by-side dengan penanda nilai terbaik
* feat: implementasi pipeline filter multi-kriteria dan custom hook useKos
* feat: implementasi context provider dan sinkronisasi localStorage favorit
* style: styling modern design system vanilla css dan responsive grid layout
* chore: setup konfigurasi vite react, routing, dan multi-stage dockerfile
```

---

## 🐳 Penerapan Kontainerisasi Docker

Aplikasi Betah.in dikontainerisasi menggunakan **Multi-Stage Dockerfile** untuk menghasilkan image yang ramping, aman, dan berkinerja tinggi.

### 1. Alur Multi-Stage Build
- **Stage 1 (Build):** Menggunakan base image `node:20-alpine`. Menginstal dependensi `npm install` dan melakukan proses kompilasi bundel production dengan `npm run build`.
- **Stage 2 (Production):** Menggunakan base image `nginx:alpine`. Menyalin hasil kompilasi folder `dist` ke direktori web root Nginx (`/usr/share/nginx/html`) dan menerapkan `nginx.conf` khusus SPA (`try_files $uri $uri/ /index.html;`) untuk mendukung rute client-side React Router.

### 2. Panduan Build & Tag Image
Jalankan perintah berikut di direktori utama proyek:

```bash
# 1. Build Docker image secara lokal
docker build -t betahin:v1-UTS .

# 2. Beri tag image dengan format nama pengguna Docker Hub dan akhiran -UTS
docker tag betahin:v1-UTS <username_dockerhub>/betahin:v1-UTS

# Contoh:
docker tag betahin:v1-UTS fawwaz/betahin:v1-UTS
```

### 3. Push ke Public Repository Docker Hub
```bash
# Pastikan sudah login ke Docker Hub
docker login

# Push image ke repository publik
docker push <username_dockerhub>/betahin:v1-UTS
```

### 4. Menjalankan Kontainer
Aplikasi dapat dijalankan melalui container Docker langsung maupun menggunakan Docker Compose:

**Menggunakan Docker CLI:**
```bash
docker run -d -p 8080:80 --name betahin-container <username_dockerhub>/betahin:v1-UTS
```
Buka peramban di: `http://localhost:8080`

**Menggunakan Docker Compose:**
```bash
docker compose up -d --build
```

---

## 💻 Panduan Menjalankan Proyek Secara Lokal (Development)

Jika ingin menjalankan server pengembangan lokal tanpa Docker:

```bash
# 1. Clone repository
git clone <URL_REPOSITORY_GITHUB>
cd "UTS PRAK POPL"

# 2. Install dependensi
npm install

# 3. Jalankan Vite Development Server
npm run dev

# 4. Buka di browser
# http://localhost:5173/
```

---

## 📊 Rencana Pengembangan Lanjutan (Future Work)

1. **Pengembangan Back-End & Database:** Mengintegrasikan REST API / GraphQL dengan basis data relasional (PostgreSQL / Supabase) untuk penyimpanan data kos terpusat.
2. **Otentikasi Akun (Auth):** Fitur login untuk mahasiswa (menyimpan preferensi multi-perangkat) dan portal pemilik kos.
3. **Portal Pengelolaan Listing Pemilik:** Fitur bagi pemilik kos untuk mengunggah foto baru, mengedit harga, dan memperbarui ketersediaan kamar secara mandiri.
4. **Peta Interaktif (GIS / Leaflet):** Visualisasi sebaran kos di sekitar kampus secara real-time pada peta interaktif.
5. **Sistem Ulasan & Rating Penghuni:** Memberi ruang bagi mahasiswa untuk memberikan ulasan terverifikasi terkait fasilitas dan keamanan kos.

---

## 🎤 Panduan Slide Presentasi & Live Demo UTS

### Susunan Slide Rekomendasi (7 Slide Utama):
1. **Slide 1 - Judul & Tim:** Nama Aplikasi ("Betah.in"), Tagline, dan Daftar Anggota Tim beserta pembagian perannya.
2. **Slide 2 - Deskripsi Proyek:** Latar Belakang (masalah mencari kos), Tujuan, dan Manfaat bagi mahasiswa.
3. **Slide 3 - Tampilan & Fungsionalitas:** Screenshot Halaman Beranda, Katalog Kos, dan Detail Kos beserta keunggulan fiturnya.
4. **Slide 4 - Fitur Komparasi & Favorit:** Screenshot Tabel Bandingin (highlight *Termurah/Terdekat*) dan daftar Favorit.
5. **Slide 5 - Arsitektur & Desain Berorientasi Objek:** Penjelasan Container-Presenter, Custom Hooks (`useKos`), dan Context API disertai cuplikan kode.
6. **Slide 6 - Penerapan Kontainerisasi Docker:** Penjelasan multi-stage build `Dockerfile`, link publik Docker Hub, dan tangkapan layar build tag `-UTS`.
7. **Slide 7 - Rencana Masa Depan & Penutup:** Roadmap fitur (Backend, Peta interaktif, Dashboard pemilik) dan sesi tanya jawab.

### Skenario Pembagian Live Demo Tim:
- **Anggota 1 (Demo Fungsionalitas & Arsitektur):**
  - Menjalankan aplikasi web secara live di browser.
  - Mendemonstrasikan pencarian, filter harga/jarak/fasilitas (logika AND), dan pengurutan kos.
  - Membuka halaman detail kos dan menunjukkan tombol WhatsApp yang mengarah langsung ke nomor pemilik.
  - Menunjukkan struktur kode dan implementasi *Container-Presenter Pattern*.
- **Anggota 2 (Demo Favorit, Komparasi & Git History):**
  - Mendemonstrasikan pemilihan 2–3 kos ke fitur Bandingin dan menjelaskan highlight nilai terbaik (*Termurah* & *Terdekat*).
  - Mendemonstrasikan penambahan kos ke Favorit dan membuktikan persistensi data di `localStorage` saat halaman di-*refresh*.
  - Membuka GitHub repository, menunjukkan cabang (*branch*) yang sesuai aturan (`feat_.../...`), dan menjelaskan salah satu commit miliknya sesuai standar (*feat:*, *fix:*, dll).
- **Anggota 3 (Demo Kontainerisasi Docker):**
  - Menjelaskan isi berkas `Dockerfile` (alokasi stage build Node.js dan stage production Nginx).
  - Menunjukkan Docker image yang sudah dibuat dengan tag `-UTS` (`betahin:v1-UTS`).
  - Membuka repository publik di Docker Hub dan memverifikasi bahwa image telah sukses di-push dan siap di-pull.
