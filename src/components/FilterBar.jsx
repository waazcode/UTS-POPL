import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { ALL_FACILITIES } from '../hooks/useKos';

export const FilterBar = ({
  filters,
  isFiltered,
  onKeywordChange,
  onMaxPriceChange,
  onMaxDistanceChange,
  onTipeChange,
  onToggleFacility,
  onResetFilters,
  totalFiltered,
  totalAll,
}) => {
  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const tipeOptions = [
    { label: 'Semua', value: 'Semua' },
    { label: 'Putra', value: 'Putra' },
    { label: 'Putri', value: 'Putri' },
    { label: 'Campur', value: 'Campur' },
  ];

  return (
    <aside aria-label="Filter Pencarian Kos" className="filter-sidebar">
      <div className="filter-header">
        <div className="filter-title-group">
          <SlidersHorizontal size={18} className="filter-title-icon" />
          <h2 className="filter-title">Filter Pencarian</h2>
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="btn-reset-filters"
            title="Reset semua filter"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Search Keyword */}
      <div className="filter-section">
        <label className="filter-label" htmlFor="search-keyword">
          Cari Kos / Alamat / Kampus
        </label>
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            id="search-keyword"
            type="text"
            className="filter-input-text"
            placeholder="Contoh: Darussalam, Rukoh, USK..."
            value={filters.keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          />
          {filters.keyword && (
            <button
              type="button"
              className="clear-keyword-btn"
              onClick={() => onKeywordChange('')}
              aria-label="Hapus kata kunci"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 2. Tipe Kos */}
      <div className="filter-section">
        <span className="filter-label">Tipe Kos</span>
        <div className="tipe-pills-group">
          {tipeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`tipe-pill-btn ${filters.tipe === opt.value ? 'active' : ''}`}
              onClick={() => onTipeChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Slider Harga Maksimum */}
      <div className="filter-section">
        <div className="filter-label-between">
          <span className="filter-label">Batas Harga Maksimal</span>
          <span className="filter-val-badge">{formatRupiah(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min="700000"
          max="3000000"
          step="100000"
          value={filters.maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="filter-range-slider"
        />
        <div className="range-hints">
          <span>Rp 700 rb</span>
          <span>Rp 3 jt</span>
        </div>
      </div>

      {/* 4. Slider Jarak Maksimum ke Kampus */}
      <div className="filter-section">
        <div className="filter-label-between">
          <span className="filter-label">Jarak Maks. ke Kampus</span>
          <span className="filter-val-badge">{filters.maxDistance} km</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="5.0"
          step="0.1"
          value={filters.maxDistance}
          onChange={(e) => onMaxDistanceChange(e.target.value)}
          className="filter-range-slider"
        />
        <div className="range-hints">
          <span>0.5 km (Jalan Kaki)</span>
          <span>5.0 km</span>
        </div>
      </div>

      {/* 5. Fasilitas Checkboxes */}
      <div className="filter-section">
        <div className="filter-label-between">
          <span className="filter-label">Fasilitas Wajib</span>
          {filters.selectedFacilities.length > 0 && (
            <span className="filter-active-count">
              {filters.selectedFacilities.length} dipilih
            </span>
          )}
        </div>
        <p className="filter-helper-text">
          Kos harus memiliki seluruh fasilitas yang dicentang.
        </p>
        <div className="facilities-grid-checklist">
          {ALL_FACILITIES.map((fac) => {
            const isChecked = filters.selectedFacilities.includes(fac);
            return (
              <label
                key={fac}
                className={`facility-checkbox-label ${isChecked ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFacility(fac)}
                  className="hidden-checkbox"
                />
                <div className="custom-check-box">
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="fac-label-text">{fac}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="filter-footer-summary">
        <Sparkles size={14} />
        <span>
          Menampilkan <strong>{totalFiltered}</strong> dari {totalAll} kos
        </span>
      </div>
    </aside>
  );
};
