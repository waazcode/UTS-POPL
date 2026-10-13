import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const Gallery = ({ photos = [], title = 'Foto Kos' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="gallery-empty">
        <ImageIcon size={40} />
        <p>Tidak ada foto tersedia</p>
      </div>
    );
  }

  const currentPhoto = photos[activeIndex] || photos[0];

  return (
    <div className="gallery-container">
      {/* Main Image */}
      <div className="gallery-main-wrapper">
        <img
          src={currentPhoto}
          alt={`${title} - Foto ${activeIndex + 1}`}
          className="gallery-main-image"
        />
        <div className="gallery-counter">
          {activeIndex + 1} / {photos.length} Foto
        </div>
      </div>

      {/* Thumbnails Row */}
      {photos.length > 1 && (
        <div className="gallery-thumbnails-row">
          {photos.map((photo, index) => (
            <button
              key={index}
              type="button"
              className={`gallery-thumb-btn ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat foto ${index + 1}`}
            >
              <img
                src={photo}
                alt={`${title} thumbnail ${index + 1}`}
                className="gallery-thumb-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
