import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { FavoritProvider } from './context/FavoritContext';
import { BandinginProvider } from './context/BandinginContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { KosListPage } from './pages/KosListPage';
import { KosDetailPage } from './pages/KosDetailPage';
import { FavoritPage } from './pages/FavoritPage';
import { BandinginPage } from './pages/BandinginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ToastProvider>
      <FavoritProvider>
        <BandinginProvider>
          <BrowserRouter>
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/kos" element={<KosListPage />} />
                <Route path="/kos/:id" element={<KosDetailPage />} />
                <Route path="/favorit" element={<FavoritPage />} />
                <Route path="/bandingin" element={<BandinginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </BrowserRouter>
        </BandinginProvider>
      </FavoritProvider>
    </ToastProvider>
  );
}

export default App;
