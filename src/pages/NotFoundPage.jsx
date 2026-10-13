import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, AlertOctagon } from 'lucide-react';

export const NotFoundPage = ({ message }) => {
  return (
    <div className="not-found-page-container">
      <div className="not-found-card">
        <div className="not-found-badge">
          <AlertOctagon size={24} />
          <span>404 Error</span>
        </div>
        <h1 className="not-found-title">Halaman Tidak Ditemukan</h1>
        <p className="not-found-desc">
          {message || 'Maaf, halaman atau kos yang Anda cari tidak tersedia atau mungkin alamat URL salah.'}
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary-gradient">
            <Home size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link to="/kos" className="btn-secondary-outline">
            <Compass size={18} />
            <span>Buka Katalog Kos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
