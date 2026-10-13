import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Columns, MapPin, Check, Wifi, Wind, Bath, ArrowUpRight, Star } from 'lucide-react';

export const KosCard = ({
  kos,
  isFavorit = false,
  onToggleFavorit,
  isCompared = false,
  onToggleCompare,
  isMaxReached = false,
}) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  const getTipeBadgeClass = (tipe) => {
    switch (tipe?.toLowerCase()) {
      case 'putra':
        return 'badge-tipe badge-putra';
      case 'putri':
        return 'badge-tipe badge-putri';
      case 'campur':
        return 'badge-tipe badge-campur';
      default:
        return 'badge-tipe';
    }
  };

  return (
    <article className="kos-card">
      {/* Thumbnail & Badges */}
      <div className="kos-card-image-wrapper">
        <img
          src={kos.foto?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
          alt={kos.nama}
          className="kos-card-image"
          loading="lazy"
        />
        <div className="kos-card-overlay-top">
          <span className={getTipeBadgeClass(kos.tipe)}>{kos.tipe}</span>
          <button
            type="button"
            className={`kos-fav-btn ${isFavorit ? 'favorited' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorit?.(kos.id, kos.nama);
            }}
            aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            title={isFavorit ? 'Hapus dari favorit' : 'Simpan favorit'}
          >
            <Heart size={18} fill={isFavorit ? 'currentColor' : 'none'} />
          </button>
        </div>

        {kos.terpopuler && (
          <div className="kos-badge-populer">
            <span>Populer</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="kos-card-content">
        <div className="kos-card-meta-row">
          <div className="kos-distance-badge">
            <MapPin size={13} />
            <span>{kos.jarak} km ke kampus</span>
          </div>
          {kos.rating && (
            <div className="kos-rating-badge">
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span>{kos.rating}</span>
            </div>
          )}
        </div>

        <h3 className="kos-card-title">
          <Link to={`/kos/${kos.id}`} className="kos-title-link">
            {kos.nama}
          </Link>
        </h3>

        <p className="kos-card-address">{kos.alamat}</p>

        {/* Quick Facilities Preview */}
        <div className="kos-card-facilities-preview">
          {kos.fasilitas?.includes('AC') && (
            <span className="fac-preview-item" title="AC">
              <Wind size={13} /> AC
            </span>
          )}
          {kos.fasilitas?.includes('WiFi') && (
            <span className="fac-preview-item" title="WiFi">
              <Wifi size={13} /> WiFi
            </span>
          )}
          {kos.fasilitas?.includes('Kamar Mandi Dalam') && (
            <span className="fac-preview-item" title="KM Dalam">
              <Bath size={13} /> KM Dalam
            </span>
          )}
        </div>

        {/* Price & Actions Row */}
        <div className="kos-card-footer">
          <div className="kos-price-group">
            <span className="kos-price-amount">{formatRupiah(kos.harga)}</span>
            <span className="kos-price-period">/ bulan</span>
          </div>

          <div className="kos-card-actions">
            <button
              type="button"
              className={`btn-compare-toggle ${isCompared ? 'compared-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleCompare?.(kos.id, kos.nama);
              }}
              title={
                isCompared
                  ? 'Keluarkan dari perbandingan'
                  : isMaxReached
                  ? 'Batas maksimal 3 kos tercapai'
                  : 'Bandingkan dengan kos lain'
              }
            >
              {isCompared ? (
                <>
                  <Check size={14} />
                  <span>Dibandingkan</span>
                </>
              ) : (
                <>
                  <Columns size={14} />
                  <span>Bandingkan</span>
                </>
              )}
            </button>

            <Link
              to={`/kos/${kos.id}`}
              className="btn-card-detail"
              aria-label={`Detail kos ${kos.nama}`}
            >
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
