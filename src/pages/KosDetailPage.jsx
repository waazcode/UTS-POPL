import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Columns,
  MessageCircle,
  Share2,
  CheckCircle2,
  AlertCircle,
  Home,
  Check,
  ShieldCheck,
  Phone,
  User,
  Zap,
} from 'lucide-react';
import kosData from '../data/kos.json';
import { Gallery } from '../components/Gallery';
import { useFavorit } from '../hooks/useFavorit';
import { useCompare } from '../hooks/useCompare';
import { useToast } from '../hooks/useToast';
import { NotFoundPage } from './NotFoundPage';

export const KosDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const kos = kosData.find((item) => item.id === id);

  const { isFavorit, toggleFavorit } = useFavorit();
  const { isCompared, toggleCompare, isMaxReached } = useCompare();

  if (!kos) {
    return <NotFoundPage message={`Kos dengan ID "${id}" tidak ditemukan.`} />;
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  const favorited = isFavorit(kos.id);
  const compared = isCompared(kos.id);

  const waMessage = encodeURIComponent(
    `Halo ${kos.namaPemilik || 'Bapak/Ibu Pemilik'}, saya menemukan kos *${kos.nama}* melalui aplikasi Betah.in.\n\nApakah saat ini masih ada kamar yang tersedia? Saya berencana ingin survei lokasi. Terima kasih!`
  );
  const waUrl = `https://wa.me/${kos.whatsapp}?text=${waMessage}`;

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        addToast('Tautan kos berhasil disalin ke clipboard!', 'success');
      } else {
        addToast('Salin URL ini: ' + window.location.href, 'info');
      }
    } catch {
      addToast('Gagal menyalin tautan.', 'warning');
    }
  };

  return (
    <div className="kos-detail-page-container">
      {/* Top Navigation & Breadcrumbs */}
      <div className="detail-top-nav">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-back-link"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/">Beranda</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/kos">Katalog Kos</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{kos.nama}</span>
        </nav>
      </div>

      {/* Main Detail Header */}
      <div className="detail-header-block">
        <div className="detail-header-meta">
          <span className={`badge-tipe badge-${kos.tipe.toLowerCase()}`}>
            Kos {kos.tipe}
          </span>
          <div className="detail-distance-badge">
            <MapPin size={15} />
            <span>{kos.jarak} km ke {kos.kampus || 'Kampus'}</span>
          </div>
          {kos.rating && (
            <div className="detail-rating-badge">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{kos.rating} / 5.0</span>
            </div>
          )}
        </div>
        <h1 className="detail-title">{kos.nama}</h1>
        <p className="detail-address">{kos.alamat}</p>
      </div>

      {/* Gallery Section */}
      <div className="detail-gallery-section">
        <Gallery photos={kos.foto} title={kos.nama} />
      </div>

      {/* Two Column Layout: Main Info + Sticky Contact Card */}
      <div className="detail-body-grid">
        {/* Left Column: Details */}
        <div className="detail-main-content">
          {/* Deskripsi */}
          <section className="detail-card-section">
            <h2 className="detail-section-title">Deskripsi Kos</h2>
            <p className="detail-description-text">{kos.deskripsi}</p>
          </section>

          {/* Fasilitas Lengkap */}
          <section className="detail-card-section">
            <h2 className="detail-section-title">Fasilitas yang Tersedia</h2>
            <div className="detail-facilities-grid">
              {kos.fasilitas?.map((fac) => (
                <div key={fac} className="detail-facility-item">
                  <div className="facility-icon-circle">
                    <Check size={16} />
                  </div>
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Aturan & Tata Tertib */}
          <section className="detail-card-section">
            <h2 className="detail-section-title">Aturan & Tata Tertib Kos</h2>
            <ul className="detail-rules-list">
              {kos.aturan?.map((rule, idx) => (
                <li key={idx} className="detail-rule-item">
                  <AlertCircle size={17} className="rule-bullet-icon" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lokasi & Sekitar */}
          <section className="detail-card-section">
            <h2 className="detail-section-title">Informasi Area Kampus</h2>
            <div className="detail-campus-info-box">
              <ShieldCheck size={24} className="campus-info-icon" />
              <div>
                <h4>Dekat dengan {kos.kampus || 'Universitas'}</h4>
                <p>
                  Hanya berjarak {kos.jarak} km, sangat mudah dijangkau dengan jalan kaki,
                  sepeda motor, atau ojek daring. Dekat dengan warung makan, laundry, dan minimarket.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Action Card */}
        <aside className="detail-sidebar-sticky">
          <div className="sticky-action-card">
            <div className="sticky-price-row">
              <span className="price-tag-label">Biaya Sewa</span>
              <div className="sticky-price-value">
                <span className="price-num">{formatRupiah(kos.harga)}</span>
                <span className="price-sub">/ bulan</span>
              </div>
            </div>

            {/* Pemilik Kos Info */}
            <div className="owner-profile-card">
              <div className="owner-avatar">
                <User size={20} />
              </div>
              <div className="owner-details">
                <p className="owner-label">Pemilik / Pengelola Kos</p>
                <h4 className="owner-name">{kos.namaPemilik || 'Pengelola Kos'}</h4>
                <span className="owner-verified-badge">
                  <CheckCircle2 size={12} /> Terverifikasi Betah.in
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-chat"
            >
              <MessageCircle size={20} />
              <span>Hubungi via WhatsApp</span>
            </a>
            <p className="wa-help-hint">
              *Tautan langsung membuka chat WhatsApp dengan pesan ketersediaan kamar.
            </p>

            {/* Action Buttons: Favorit & Bandingin */}
            <div className="sticky-action-buttons">
              <button
                type="button"
                className={`btn-sticky-toggle ${favorited ? 'active-fav' : ''}`}
                onClick={() => toggleFavorit(kos.id, kos.nama)}
              >
                <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
                <span>{favorited ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}</span>
              </button>

              <button
                type="button"
                className={`btn-sticky-toggle ${compared ? 'active-comp' : ''}`}
                onClick={() => toggleCompare(kos.id, kos.nama)}
              >
                <Columns size={18} />
                <span>{compared ? 'Ada di Bandingan' : 'Bandingkan Kos Ini'}</span>
              </button>

              <button
                type="button"
                className="btn-sticky-toggle"
                onClick={handleShare}
              >
                <Share2 size={18} />
                <span>Bagikan Kos</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
