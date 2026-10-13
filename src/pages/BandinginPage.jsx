import React from 'react';
import { Link } from 'react-router-dom';
import { Columns, Compass, Plus, AlertCircle, Info, Sparkles } from 'lucide-react';
import kosData from '../data/kos.json';
import { CompareTable } from '../components/CompareTable';
import { EmptyState } from '../components/EmptyState';
import { KosCard } from '../components/KosCard';
import { useCompare } from '../hooks/useCompare';
import { useFavorit } from '../hooks/useFavorit';

export const BandinginPage = () => {
  const {
    compareIds,
    removeCompare,
    clearCompare,
    totalCompare,
    minCompare,
    maxCompare,
    isMaxReached,
    toggleCompare,
  } = useCompare();

  const { isFavorit, toggleFavorit } = useFavorit();

  const selectedKosList = kosData.filter((k) => compareIds.includes(k.id));

  return (
    <div className="bandingin-page-container">
      {/* Header Banner */}
      <div className="catalog-header-banner">
        <div className="catalog-header-content">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Beranda</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Bandingin Kos</span>
          </nav>
          <div className="bandingin-title-row">
            <div>
              <h1 className="catalog-title">Komparasi Kos Berdampingan</h1>
              <p className="catalog-subtitle">
                Bandingkan 2 hingga 3 kos pilihan secara langsung untuk menemukan kos yang paling hemat dan paling dekat.
              </p>
            </div>
            <div className="compare-status-indicator">
              <span className="indicator-pill">
                {totalCompare} / {maxCompare} Terpilih
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bandingin-main-content">
        {/* Case 1: Less than 2 kos chosen */}
        {selectedKosList.length < minCompare ? (
          <div className="compare-insufficient-wrapper">
            <div className="compare-info-alert">
              <Info size={22} className="alert-info-icon" />
              <div>
                <h4>
                  {selectedKosList.length === 1
                    ? 'Pilih 1 Kos Lagi untuk Memulai Komparasi'
                    : 'Pilih Minimal 2 Kos untuk Melihat Perbandingan'}
                </h4>
                <p>
                  Fitur komparasi membutuhkan minimal <strong>2 kos</strong> dan maksimal{' '}
                  <strong>3 kos</strong> agar dapat menampilkan matriks tabel harga, jarak, dan fasilitas.
                </p>
              </div>
            </div>

            {selectedKosList.length === 1 && (
              <div className="single-selected-preview">
                <h3 className="preview-heading">Kos Pertama yang Sudah Anda Pilih:</h3>
                <div className="single-selected-card-row">
                  <div className="selected-item-box">
                    <KosCard
                      kos={selectedKosList[0]}
                      isFavorit={isFavorit(selectedKosList[0].id)}
                      onToggleFavorit={toggleFavorit}
                      isCompared={true}
                      onToggleCompare={toggleCompare}
                      isMaxReached={isMaxReached}
                    />
                  </div>

                  {/* Slot Kos Kedua */}
                  <div className="compare-slot-empty">
                    <div className="slot-empty-icon">
                      <Plus size={36} />
                    </div>
                    <h4>Pilih Kos Kedua</h4>
                    <p>Buka katalog kos dan klik tombol "Bandingkan" pada kos kedua yang ingin ditinjau.</p>
                    <Link to="/kos" className="btn-add-compare-slot">
                      <Compass size={16} />
                      <span>Cari Kos Kedua</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {selectedKosList.length === 0 && (
              <EmptyState
                icon={<Columns size={48} className="empty-compare-icon" />}
                title="Belum Ada Kos yang Dipilih"
                description="Anda belum memilih kos untuk dibandingkan. Buka katalog kos dan tekan tombol 'Bandingkan' pada kos yang Anda minati (2-3 kos)."
                actionText="Jelajahi Katalog Kos"
                actionLink="/kos"
              />
            )}
          </div>
        ) : (
          /* Case 2: 2 or 3 kos selected -> Show CompareTable */
          <div className="compare-active-wrapper">
            <div className="compare-tips-card">
              <Sparkles size={18} className="tips-icon" />
              <span>
                Tip: Nilai dengan penanda <strong>"Termurah"</strong> dan <strong>"Terdekat"</strong> disorot otomatis untuk memudahkan keputusan Anda.
              </span>
            </div>

            <CompareTable
              kosList={selectedKosList}
              onRemoveCompare={removeCompare}
              onClearAll={clearCompare}
            />
          </div>
        )}
      </div>
    </div>
  );
};
