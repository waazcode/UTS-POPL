import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const COMPARE_STORAGE_KEY = 'betahin_compare';
export const MAX_COMPARE = 3;
export const MIN_COMPARE = 2;

export const BandinginContext = createContext(null);

const getInitialCompare = () => {
  try {
    const item = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_COMPARE);
    }
    return [];
  } catch (error) {
    console.error('Error parsing betahin_compare from localStorage:', error);
    return [];
  }
};

export const BandinginProvider = ({ children }) => {
  const [compareIds, setCompareIds] = useState(getInitialCompare);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareIds));
    } catch (error) {
      console.error('Error saving betahin_compare to localStorage:', error);
    }
  }, [compareIds]);

  const toggleCompare = useCallback((id, namaKos = '') => {
    setCompareIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(`"${namaKos || 'Kos'}" dihapus dari daftar perbandingan`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= MAX_COMPARE) {
          addToast(`Maksimal ${MAX_COMPARE} kos untuk dibandingkan! Hapus salah satu terlebih dahulu.`, 'warning');
          return prev;
        }
        addToast(`"${namaKos || 'Kos'}" ditambahkan ke perbandingan (${prev.length + 1}/${MAX_COMPARE})`, 'success');
        return [...prev, id];
      }
    });
  }, [addToast]);

  const removeCompare = useCallback((id, namaKos = '') => {
    setCompareIds((prev) => {
      if (namaKos) {
        addToast(`"${namaKos}" dihapus dari perbandingan`, 'info');
      }
      return prev.filter((item) => item !== id);
    });
  }, [addToast]);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    addToast('Daftar perbandingan dikosongkan', 'info');
  }, [addToast]);

  const isCompared = useCallback((id) => {
    return compareIds.includes(id);
  }, [compareIds]);

  const isMaxReached = compareIds.length >= MAX_COMPARE;
  const canCompare = compareIds.length >= MIN_COMPARE;

  return (
    <BandinginContext.Provider
      value={{
        compareIds,
        toggleCompare,
        removeCompare,
        clearCompare,
        isCompared,
        isMaxReached,
        canCompare,
        totalCompare: compareIds.length,
        maxCompare: MAX_COMPARE,
        minCompare: MIN_COMPARE,
      }}
    >
      {children}
    </BandinginContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(BandinginContext);
  if (!context) {
    throw new Error('useCompare must be used within a BandinginProvider');
  }
  return context;
};
