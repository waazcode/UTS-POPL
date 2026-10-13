import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Compass } from 'lucide-react';
import kosData from '../data/kos.json';
import { KosCard } from '../components/KosCard';
import { EmptyState } from '../components/EmptyState';
import { useFavorit } from '../hooks/useFavorit';
import { useCompare } from '../hooks/useCompare';

export const FavoritPage = () => {
  const { favoritIds, toggleFavorit, clearFavorit, totalFavorit } = useFavorit();
  const { isCompared, toggleCompare, isMaxReached } = useCompare();

  // Filter full kos objects matching saved IDs
  const favoritedKosList = kosData.filter((k) => favoritIds.includes(k.id));

  return (
    <div className="favorit-page-container">
      {/* Page Header */}
      <div className="catalog-header-banner">
        <div className="catalog-header-content">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Beranda</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Favorit Saya</span>
          </nav>
          <div className="favorit-title-row">
            <div>
              <h1 className="catalog-title">Kos Favorit Anda</h1>
              <p className="catalog-subtitle">
                Daftar kos pilihan yang telah Anda simpan di peramban ini.
              </p>
            </div>
            {totalFavorit > 0 && (
              <button
                type="button"
                onClick={clearFavorit}
                className="btn-clear-all-fav"
                title="Hapus semua favorit"
              >
                <Trash2 size={16} />
                <span>Kosongkan Semua</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="favorit-main-content">
        {favoritedKosList.length > 0 ? (
          <div>
            <div className="favorit-count-summary">
              Menampilkan <strong>{favoritedKosList.length}</strong> kos favorit yang tersimpan.
            </div>
            <div className="kos-grid-cards">
              {favoritedKosList.map((kos) => (
                <KosCard
                  key={kos.id}
                  kos={kos}
                  isFavorit={true}
                  onToggleFavorit={toggleFavorit}
                  isCompared={isCompared(kos.id)}
                  onToggleCompare={toggleCompare}
                  isMaxReached={isMaxReached}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<Heart size={48} className="empty-fav-icon" />}
            title="Belum Ada Kos Favorit"
            description="Anda belum menambahkan kos ke dalam daftar favorit. Jelajahi katalog kos dan klik ikon hati untuk menyimpan kos idaman Anda."
            actionText="Jelajahi Katalog Kos"
            actionLink="/kos"
          />
        )}
      </div>
    </div>
  );
};
