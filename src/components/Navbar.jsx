import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Heart, Columns, Menu, X, Sparkles } from 'lucide-react';
import { useFavorit } from '../hooks/useFavorit';
import { useCompare } from '../hooks/useCompare';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalFavorit } = useFavorit();
  const { totalCompare, maxCompare } = useCompare();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-logo-icon">
            <Home size={22} className="logo-icon-svg" />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">Betah<span className="brand-accent">.in</span></span>
            <span className="brand-tag">Cari Kos Kampus</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav desktop-only">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Home size={18} />
            <span>Beranda</span>
          </NavLink>

          <NavLink
            to="/kos"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Compass size={18} />
            <span>Katalog Kos</span>
          </NavLink>

          <NavLink
            to="/favorit"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Heart size={18} />
            <span>Favorit</span>
            {totalFavorit > 0 && (
              <span className="nav-badge favorit-badge">{totalFavorit}</span>
            )}
          </NavLink>

          <NavLink
            to="/bandingin"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Columns size={18} />
            <span>Bandingin</span>
            {totalCompare > 0 && (
              <span className="nav-badge compare-badge">
                {totalCompare}/{maxCompare}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Action Button Desktop */}
        <div className="navbar-action desktop-only">
          <Link to="/kos" className="btn-primary-gradient">
            <Sparkles size={16} />
            <span>Cari Sekarang</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn mobile-only"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu navigasi"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer mobile-only">
          <nav className="mobile-nav-list">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <Home size={20} />
              <span>Beranda</span>
            </NavLink>

            <NavLink
              to="/kos"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <Compass size={20} />
              <span>Katalog Kos</span>
            </NavLink>

            <NavLink
              to="/favorit"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <div className="mobile-nav-text-group">
                <Heart size={20} />
                <span>Favorit</span>
              </div>
              {totalFavorit > 0 && (
                <span className="nav-badge favorit-badge">{totalFavorit}</span>
              )}
            </NavLink>

            <NavLink
              to="/bandingin"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <div className="mobile-nav-text-group">
                <Columns size={20} />
                <span>Bandingin Kos</span>
              </div>
              {totalCompare > 0 && (
                <span className="nav-badge compare-badge">
                  {totalCompare}/{maxCompare}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
