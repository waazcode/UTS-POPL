import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKos } from '../hooks/useKos';
import { useFavorit } from '../hooks/useFavorit';
import { useCompare } from '../hooks/useCompare';
import { FilterBar } from '../components/FilterBar';
import { SortSelect } from '../components/SortSelect';
import { KosCard } from '../components/KosCard';
import { EmptyState } from '../components/EmptyState';
import { Home, Compass, RotateCcw } from 'lucide-react';

export const KosListPage = () => {
  const [searchParams] = useSearchParams();
  const {
    kosList,
    totalAll,
    totalFiltered,
    filters,
    isFiltered,
    setKeyword,
    setMaxPrice,
    setMaxDistance,
    setTipe,
    toggleFacility,
    setSortBy,
    resetFilters,
  } = useKos();

  const { isFavorit, toggleFavorit } = useFavorit();
  const { isCompared, toggleCompare, isMaxReached } = useCompare();

  // Handle URL query parameters on initial mount
  useEffect(() => {
    const q = searchParams.get('q');
    const tipeParam = searchParams.get('tipe');
    const facilityParam = searchParams.get('facility');

    if (q) setKeyword(q);
    if (tipeParam) setTipe(tipeParam);
    if (facilityParam && !filters.selectedFacilities.includes(facilityParam)) {
      toggleFacility(facilityParam);
    }
  }, [searchParams]);

  return (
    <div className="kos-list-page-container">
      {/* Header Banner */}
      <div className="catalog-header-banner">
        <div className="catalog-header-content">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <span>Beranda</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Katalog Kos</span>
          </nav>
          <h1 className="catalog-title">Katalog Kos Kampus</h1>
          <p className="catalog-subtitle">
            Pilihan kos terdekat dengan fasilitas lengkap, harga transparan, dan sistem filter instan.
          </p>
        </div>
      </div>

      <div className="catalog-main-layout">
        {/* Left: Filter Sidebar */}
        <FilterBar
          filters={filters}
          isFiltered={isFiltered}
          onKeywordChange={setKeyword}
          onMaxPriceChange={setMaxPrice}
          onMaxDistanceChange={setMaxDistance}
          onTipeChange={setTipe}
          onToggleFacility={toggleFacility}
          onResetFilters={resetFilters}
          totalFiltered={totalFiltered}
          totalAll={totalAll}
        />

        {/* Right: Results Content */}
        <div className="catalog-results-area">
          {/* Results Toolbar */}
          <div className="catalog-toolbar">
            <div className="toolbar-count-text">
              Ditemukan <strong>{totalFiltered}</strong> kos sesuai filter
            </div>
            <SortSelect value={filters.sortBy} onChange={setSortBy} />
          </div>

          {/* Cards Grid or Empty State */}
          {kosList.length > 0 ? (
            <div className="kos-grid-cards">
              {kosList.map((kos) => (
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
          ) : (
            <EmptyState
              title="Tidak Ada Kos yang Cocok"
              description="Tidak ada kos yang memenuhi semua kriteria pencarian dan fasilitas yang Anda pilih. Coba sesuaikan batas harga, jarak, atau kurangi fasilitas wajib."
              actionText="Reset Semua Filter"
              onAction={resetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};
