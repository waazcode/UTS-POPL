import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Shield, Code, Layers, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <div className="brand-logo-icon">
              <Home size={20} className="logo-icon-svg" />
            </div>
            <span className="brand-name">Betah<span className="brand-accent">.in</span></span>
          </div>
          <p className="footer-desc">
            Platform pencarian dan perbandingan kos mahasiswa berbasis React SPA.
            Membantu menemukan hunian terdekat kampus dengan filter cerdas, fitur favorit, dan komparasi instan.
          </p>
          <div className="footer-badge-academic">
            <Sparkles size={14} />
            <span>UTS Praktikum Pemrograman Berorientasi Objek Lanjut (POPL) A</span>
          </div>
        </div>

        <div className="footer-nav-col">
          <h4 className="footer-heading">Navigasi Cepat</h4>
          <ul className="footer-links">
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/kos">Katalog Lengkap Kos</Link></li>
            <li><Link to="/favorit">Daftar Favorit Saya</Link></li>
            <li><Link to="/bandingin">Tabel Bandingin Kos</Link></li>
          </ul>
        </div>

        <div className="footer-tech-col">
          <h4 className="footer-heading">Arsitektur & Pola Desain</h4>
          <ul className="footer-tech-list">
            <li>
              <Code size={14} />
              <span>Container-Presenter Pattern</span>
            </li>
            <li>
              <Layers size={14} />
              <span>Custom Hooks & Context Provider</span>
            </li>
            <li>
              <Shield size={14} />
              <span>Dockerized Multi-Stage Nginx Build</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Betah.in — UTS Praktikum POPL A. Seluruh hak cipta dilindungi.
        </p>
        <p className="footer-subtext">
          Dibuat dengan React 19, Vanilla CSS Modern, dan Docker Containerization.
        </p>
      </div>
    </footer>
  );
};
