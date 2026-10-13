import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  Columns,
  Heart,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
} from 'lucide-react';
import kosData from '../data/kos.json';
import { KosCard } from '../components/KosCard';
import { useFavorit } from '../hooks/useFavorit';
import { useCompare } from '../hooks/useCompare';

export const HomePage = () => {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');
  const { isFavorit, toggleFavorit } = useFavorit();
  const { isCompared, toggleCompare, isMaxReached } = useCompare();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/kos?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate('/kos');
    }
  };

  const popularKos = kosData.filter((k) => k.terpopuler).slice(0, 3);

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={15} />
            <span>Platform Pencari Kos Mahasiswa Banda Aceh #1</span>
          </div>
          <h1 className="hero-title">
            Temukan Kos Nyaman, <br />
            <span className="hero-title-gradient">Paling Pas Buat Mahasiswa.</span>
          </h1>
          <p className="hero-subtitle">
            Cari kos dekat kampus USK, UIN Ar-Raniry, dan UNMUHA tanpa perantara.
            Bandingkan fasilitas berdampingan, simpan favorit, dan hubungi langsung pemilik via WhatsApp.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleQuickSearch} className="hero-search-box">
            <div className="hero-search-input-wrapper">
              <Search size={20} className="hero-search-icon" />
              <input
                type="text"
                placeholder="Cari nama kos, area (Darussalam, Rukoh, USK, UIN Ar-Raniry, Batoh)..."
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>
            <button type="submit" className="hero-search-submit-btn">
              <span>Cari Kos</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="hero-quick-tags">
            <span className="quick-tags-label">Pencarian Cepat:</span>
            <Link to="/kos?q=Darussalam" className="quick-tag-pill">
              Darussalam
            </Link>
            <Link to="/kos?q=Rukoh" className="quick-tag-pill">
              Rukoh
            </Link>
            <Link to="/kos?tipe=Putri" className="quick-tag-pill">
              Kos Putri
            </Link>
            <Link to="/kos?tipe=Putra" className="quick-tag-pill">
              Kos Putra
            </Link>
            <Link to="/kos?facility=AC" className="quick-tag-pill">
              Ber-AC
            </Link>
            <Link to="/kos?facility=Kamar+Mandi+Dalam" className="quick-tag-pill">
              Kamar Mandi Dalam
            </Link>
          </div>
        </div>

        {/* Hero Features Floating Grid */}
        <div className="hero-stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-blue">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="stat-title">100% Terverifikasi</h4>
              <p className="stat-desc">Data kos valid langsung survei</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-emerald">
              <MapPin size={22} />
            </div>
            <div>
              <h4 className="stat-title">Jarak Presisi</h4>
              <p className="stat-desc">Dihitung akurat ke gerbang kampus</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-amber">
              <Zap size={22} />
            </div>
            <div>
              <h4 className="stat-title">Bebas Biaya Admin</h4>
              <p className="stat-desc">Hubungi pemilik langsung tanpa calo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Popular Section */}
      <section className="home-section popular-section">
        <div className="section-header-row">
          <div>
            <span className="section-badge">Rekomendasi Pilihan</span>
            <h2 className="section-title">Kos Terpopuler di Sekitar Kampus</h2>
            <p className="section-subtitle">
              Paling sering dilihat dan difavoritkan mahasiswa bulan ini.
            </p>
          </div>
          <Link to="/kos" className="btn-view-all">
            <span>Lihat Semua Katalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="kos-grid-cards">
          {popularKos.map((kos) => (
            <KosCard
              key={kos.id}
              kos={kos}
              isFavorit={isFavorit(kos.id)}
              onToggleFavorit={toggleFavorit}
              isCompared={isCompared(kos.id)}
              onToggleCompare={toggleCompare}
              isMaxReached={isMaxReached}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition / Features Section */}
      <section className="home-section features-overview-section">
        <div className="section-header-center">
          <span className="section-badge">Mengapa Betah.in?</span>
          <h2 className="section-title">Fitur Spesial Dirancang Untuk Mahasiswa</h2>
          <p className="section-subtitle">
            Didesain dengan arsitektur berorientasi objek yang modular, ringan, dan cepat.
          </p>
        </div>

        <div className="feature-cards-grid">
          <div className="feature-item-card">
            <div className="feature-item-icon">
              <Compass size={28} />
            </div>
            <h3>Filter Cerdas Multi-Kriteria</h3>
            <p>
              Saring kos berdasarkan kata kunci, radius jarak ke kampus, rentang harga,
              tipe kos, hingga daftar fasilitas wajib dengan logika instan tanpa reload.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-item-icon">
              <Columns size={28} />
            </div>
            <h3>Tabel Bandingin Berdampingan</h3>
            <p>
              Bingung memilih antara 2-3 kos? Gunakan fitur Bandingin untuk membandingkan
              harga, jarak, dan fasilitas dengan penanda "Termurah" & "Terdekat" otomatis.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-item-icon">
              <Heart size={28} />
            </div>
            <h3>Simpan Favorit di Peramban</h3>
            <p>
              Tandai kos incaran Anda ke daftar favorit. Tersimpan aman di localStorage
              peramban, siap ditinjau kembali kapan saja Anda membuka website.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-item-icon">
              <MessageCircle size={28} />
            </div>
            <h3>1-Klik Chat WhatsApp Pemilik</h3>
            <p>
              Tanyakan ketersediaan kamar secara instan dengan pesan otomatis yang sudah
              mencantumkan nama kos spesifik langsung ke nomor WhatsApp pemilik.
            </p>
          </div>
        </div>
      </section>

      {/* Testimoni Mahasiswa */}
      <section className="home-section testimonials-section">
        <div className="section-header-center">
          <span className="section-badge">Cerita Mahasiswa</span>
          <h2 className="section-title">Apa Kata Mereka Tentang Betah.in?</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Fitur Bandingin ngebantu banget pas galau milih 3 kos di kawasan Rukoh.
              Langsung keliatan mana yang fasilitasnya lebih lengkap dan lebih deket ke Fakultas Teknik USK."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">FR</div>
              <div>
                <h4 className="author-name">Fajar Ramadhan</h4>
                <p className="author-univ">Teknik Elektro USK</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Nemu kos putri di Darussalam yang ada kamar mandi dalam dan WiFi kenceng cuma dalam 5 menit.
              Tombol WhatsApp-nya langsung kirim format nama kos, pemiliknya cepat merespons!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">CN</div>
              <div>
                <h4 className="author-name">Cut Nurul Anisa</h4>
                <p className="author-univ">Pendidikan Bahasa Inggris UIN Ar-Raniry</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Tampilannya super cepat dan bersih, filter fasilitasnya bener-bener akurat
              karena cuma nampilin kos yang punya semua fasilitas yang dicentang di sekitar Batoh."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">DP</div>
              <div>
                <h4 className="author-name">Dimas Pratama</h4>
                <p className="author-univ">Informatika UNMUHA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <div className="cta-banner-text">
            <h2>Siap Menemukan Hunian Idamanmu?</h2>
            <p>Jelajahi pilihan kos terbaik di dekat kampusmu sekarang juga secara gratis.</p>
          </div>
          <Link to="/kos" className="btn-cta-white">
            <span>Buka Katalog Kos</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
