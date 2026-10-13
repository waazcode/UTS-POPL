import React from 'react';
import { Link } from 'react-router-dom';
import { X, Check, MessageCircle, MapPin, Tag, Star, Award, Trash2 } from 'lucide-react';
import { ALL_FACILITIES } from '../hooks/useKos';

export const CompareTable = ({
  kosList = [],
  onRemoveCompare,
  onClearAll,
}) => {
  if (kosList.length < 2) return null;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  const minPrice = Math.min(...kosList.map((k) => k.harga));
  const minDistance = Math.min(...kosList.map((k) => k.jarak));

  return (
    <div className="compare-table-section">
      <div className="compare-table-top-actions">
        <p className="compare-summary-text">
          Membandingkan <strong>{kosList.length}</strong> kos berdampingan.
        </p>
        <button
          type="button"
          onClick={onClearAll}
          className="btn-clear-compare"
          title="Kosongkan perbandingan"
        >
          <Trash2 size={15} />
          <span>Hapus Semua Pilihan</span>
        </button>
      </div>

      <div className="compare-table-responsive-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-header-cell compare-col-label">
                Kriteria Perbandingan
              </th>
              {kosList.map((kos) => (
                <th key={kos.id} className="compare-header-cell compare-col-item">
                  <div className="compare-item-card-header">
                    <button
                      type="button"
                      className="compare-remove-item-btn"
                      onClick={() => onRemoveCompare(kos.id, kos.nama)}
                      title={`Hapus ${kos.nama} dari perbandingan`}
                      aria-label={`Hapus ${kos.nama}`}
                    >
                      <X size={16} />
                    </button>
                    <img
                      src={kos.foto?.[0]}
                      alt={kos.nama}
                      className="compare-item-header-img"
                    />
                    <span className="compare-item-tipe-badge">{kos.tipe}</span>
                    <h4 className="compare-item-title">
                      <Link to={`/kos/${kos.id}`}>{kos.nama}</Link>
                    </h4>
                    <p className="compare-item-kampus">{kos.kampus || kos.alamat}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 1. Baris Harga */}
            <tr>
              <td className="compare-row-title">
                <div className="row-title-with-icon">
                  <Tag size={16} />
                  <span>Harga per Bulan</span>
                </div>
              </td>
              {kosList.map((kos) => {
                const isBestPrice = kos.harga === minPrice;
                return (
                  <td
                    key={kos.id}
                    className={`compare-data-cell ${isBestPrice ? 'cell-best-highlight' : ''}`}
                  >
                    <div className="compare-cell-val price-val">
                      {formatRupiah(kos.harga)}
                    </div>
                    {isBestPrice && (
                      <div className="badge-best-value badge-best-price">
                        <Award size={13} />
                        <span>Termurah</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 2. Baris Jarak ke Kampus */}
            <tr>
              <td className="compare-row-title">
                <div className="row-title-with-icon">
                  <MapPin size={16} />
                  <span>Jarak ke Kampus</span>
                </div>
              </td>
              {kosList.map((kos) => {
                const isBestDistance = kos.jarak === minDistance;
                return (
                  <td
                    key={kos.id}
                    className={`compare-data-cell ${isBestDistance ? 'cell-best-highlight' : ''}`}
                  >
                    <div className="compare-cell-val">
                      {kos.jarak} km
                    </div>
                    {isBestDistance && (
                      <div className="badge-best-value badge-best-distance">
                        <Award size={13} />
                        <span>Terdekat</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 3. Baris Tipe Kos */}
            <tr>
              <td className="compare-row-title">Tipe Kos</td>
              {kosList.map((kos) => (
                <td key={kos.id} className="compare-data-cell text-center">
                  <span className={`badge-tipe badge-${kos.tipe.toLowerCase()}`}>
                    Kos {kos.tipe}
                  </span>
                </td>
              ))}
            </tr>

            {/* 4. Rating Penghuni */}
            <tr>
              <td className="compare-row-title">Rating</td>
              {kosList.map((kos) => (
                <td key={kos.id} className="compare-data-cell text-center">
                  <div className="compare-rating-val">
                    <Star size={15} fill="#f59e0b" color="#f59e0b" />
                    <span>{kos.rating || '4.8'} / 5.0</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* 5. Alamat Lengkap */}
            <tr>
              <td className="compare-row-title">Alamat Lengkap</td>
              {kosList.map((kos) => (
                <td key={kos.id} className="compare-data-cell text-muted-small">
                  {kos.alamat}
                </td>
              ))}
            </tr>

            {/* 6. Section Header Fasilitas */}
            <tr className="compare-section-divider">
              <td colSpan={kosList.length + 1}>
                <strong>Matriks Fasilitas Kos</strong>
              </td>
            </tr>

            {/* Fasilitas Loop */}
            {ALL_FACILITIES.map((facility) => (
              <tr key={facility}>
                <td className="compare-row-subfacility">{facility}</td>
                {kosList.map((kos) => {
                  const hasFacility = kos.fasilitas?.includes(facility);
                  return (
                    <td key={kos.id} className="compare-data-cell text-center">
                      {hasFacility ? (
                        <div className="fac-indicator fac-yes" title="Tersedia">
                          <Check size={16} />
                          <span className="fac-text">Ada</span>
                        </div>
                      ) : (
                        <div className="fac-indicator fac-no" title="Tidak Tersedia">
                          <X size={16} />
                          <span className="fac-text">Tidak</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* 7. Hubungi Pemilik CTA */}
            <tr>
              <td className="compare-row-title">Aksi Langsung</td>
              {kosList.map((kos) => {
                const message = encodeURIComponent(
                  `Halo ${kos.namaPemilik || 'Pemilik Kos'}, saya tertarik dan ingin menanyakan ketersediaan kamar di *${kos.nama}* (dilihat dari Betah.in).`
                );
                const waUrl = `https://wa.me/${kos.whatsapp}?text=${message}`;

                return (
                  <td key={kos.id} className="compare-data-cell text-center">
                    <div className="compare-actions-cell">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wa-direct"
                        title="Chat WhatsApp Pemilik"
                      >
                        <MessageCircle size={15} />
                        <span>Chat Pemilik</span>
                      </a>
                      <Link to={`/kos/${kos.id}`} className="btn-detail-link-simple">
                        Lihat Detail Lengkap
                      </Link>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
