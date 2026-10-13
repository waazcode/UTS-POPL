import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortSelect = ({ value, onChange }) => {
  return (
    <div className="sort-select-wrapper">
      <label htmlFor="kos-sort-select" className="sort-label">
        <ArrowUpDown size={15} />
        <span>Urutkan:</span>
      </label>
      <select
        id="kos-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sort-dropdown"
      >
        <option value="termurah">Harga Termurah</option>
        <option value="termahal">Harga Termahal</option>
        <option value="terdekat">Jarak Terdekat Kampus</option>
        <option value="populer">Paling Populer</option>
      </select>
    </div>
  );
};
