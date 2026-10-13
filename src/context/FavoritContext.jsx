import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const FAVORIT_STORAGE_KEY = 'betahin_favorit';

export const FavoritContext = createContext(null);

const getInitialFavorit = () => {
  try {
    const item = localStorage.getItem(FAVORIT_STORAGE_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing betahin_favorit from localStorage:', error);
    return [];
  }
};

export const FavoritProvider = ({ children }) => {
  const [favoritIds, setFavoritIds] = useState(getInitialFavorit);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(FAVORIT_STORAGE_KEY, JSON.stringify(favoritIds));
    } catch (error) {
      console.error('Error saving betahin_favorit to localStorage:', error);
    }
  }, [favoritIds]);

  const toggleFavorit = useCallback((id, namaKos = '') => {
    setFavoritIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(`"${namaKos || 'Kos'}" dihapus dari favorit`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast(`"${namaKos || 'Kos'}" berhasil disimpan ke favorit`, 'success');
        return [...prev, id];
      }
    });
  }, [addToast]);

  const isFavorit = useCallback((id) => {
    return favoritIds.includes(id);
  }, [favoritIds]);

  const clearFavorit = useCallback(() => {
    setFavoritIds([]);
    addToast('Semua favorit berhasil dikosongkan', 'info');
  }, [addToast]);

  return (
    <FavoritContext.Provider value={{ favoritIds, toggleFavorit, isFavorit, clearFavorit, totalFavorit: favoritIds.length }}>
      {children}
    </FavoritContext.Provider>
  );
};

export const useFavorit = () => {
  const context = useContext(FavoritContext);
  if (!context) {
    throw new Error('useFavorit must be used within a FavoritProvider');
  }
  return context;
};
