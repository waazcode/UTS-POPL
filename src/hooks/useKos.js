import { useState, useMemo, useCallback } from 'react';
import kosData from '../data/kos.json';

export const DEFAULT_FILTERS = {
  keyword: '',
  minPrice: 500000,
  maxPrice: 3000000,
  maxDistance: 5.0, // km
  tipe: 'Semua', // 'Semua' | 'Putra' | 'Putri' | 'Campur'
  selectedFacilities: [],
  sortBy: 'termurah', // 'termurah' | 'termahal' | 'terdekat' | 'populer'
};

export const ALL_FACILITIES = [
  'AC',
  'WiFi',
  'Kamar Mandi Dalam',
  'Water Heater',
  'Kasur',
  'Lemari',
  'Meja Belajar',
  'Parkir Motor',
  'Parkir Mobil',
  'Dapur Bersama',
  'Akses 24 Jam',
  'Keamanan 24 Jam',
];

export const useKos = (initialParams = {}) => {
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    ...initialParams,
  }));

  const setKeyword = useCallback((keyword) => {
    setFilters((prev) => ({ ...prev, keyword }));
  }, []);

  const setMinPrice = useCallback((minPrice) => {
    setFilters((prev) => ({ ...prev, minPrice: Number(minPrice) }));
  }, []);

  const setMaxPrice = useCallback((maxPrice) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(maxPrice) }));
  }, []);

  const setMaxDistance = useCallback((maxDistance) => {
    setFilters((prev) => ({ ...prev, maxDistance: Number(maxDistance) }));
  }, []);

  const setTipe = useCallback((tipe) => {
    setFilters((prev) => ({ ...prev, tipe }));
  }, []);

  const toggleFacility = useCallback((facility) => {
    setFilters((prev) => {
      const exists = prev.selectedFacilities.includes(facility);
      const updated = exists
        ? prev.selectedFacilities.filter((f) => f !== facility)
        : [...prev.selectedFacilities, facility];
      return { ...prev, selectedFacilities: updated };
    });
  }, []);

  const setSortBy = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Filter & sorting pipeline (Pure functional execution)
  const filteredKos = useMemo(() => {
    let result = [...kosData];

    // 1. Keyword search (nama, alamat, kampus)
    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.nama.toLowerCase().includes(q) ||
          item.alamat.toLowerCase().includes(q) ||
          (item.kampus && item.kampus.toLowerCase().includes(q))
      );
    }

    // 2. Rentang Harga (min & max)
    result = result.filter(
      (item) => item.harga >= filters.minPrice && item.harga <= filters.maxPrice
    );

    // 3. Jarak Maksimum ke Kampus (km)
    result = result.filter((item) => item.jarak <= filters.maxDistance);

    // 4. Tipe Kos (Putra, Putri, Campur)
    if (filters.tipe && filters.tipe !== 'Semua') {
      result = result.filter((item) => item.tipe === filters.tipe);
    }

    // 5. Fasilitas (syarat: kos harus memiliki SEMUA fasilitas terpilih - AND logic)
    if (filters.selectedFacilities.length > 0) {
      result = result.filter((item) =>
        filters.selectedFacilities.every((facility) =>
          item.fasilitas.includes(facility)
        )
      );
    }

    // 6. Pengurutan / Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'termurah':
          return a.harga - b.harga;
        case 'termahal':
          return b.harga - a.harga;
        case 'terdekat':
          return a.jarak - b.jarak;
        case 'populer':
          return (b.terpopuler ? 1 : 0) - (a.terpopuler ? 1 : 0) || b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [filters]);

  const isFiltered = useMemo(() => {
    return (
      filters.keyword.trim() !== '' ||
      filters.minPrice !== DEFAULT_FILTERS.minPrice ||
      filters.maxPrice !== DEFAULT_FILTERS.maxPrice ||
      filters.maxDistance !== DEFAULT_FILTERS.maxDistance ||
      filters.tipe !== DEFAULT_FILTERS.tipe ||
      filters.selectedFacilities.length > 0 ||
      filters.sortBy !== DEFAULT_FILTERS.sortBy
    );
  }, [filters]);

  return {
    allKos: kosData,
    kosList: filteredKos,
    totalAll: kosData.length,
    totalFiltered: filteredKos.length,
    filters,
    isFiltered,
    setKeyword,
    setMinPrice,
    setMaxPrice,
    setMaxDistance,
    setTipe,
    toggleFacility,
    setSortBy,
    resetFilters,
  };
};
