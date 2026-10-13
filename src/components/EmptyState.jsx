import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export const EmptyState = ({
  icon,
  title = 'Tidak Ada Data',
  description = 'Data yang Anda cari tidak ditemukan.',
  actionText,
  onAction,
  actionLink,
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        {icon || <SearchX size={44} />}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      
      {actionLink && actionText && (
        <Link to={actionLink} className="btn-empty-action">
          {actionText}
        </Link>
      )}

      {onAction && actionText && !actionLink && (
        <button type="button" onClick={onAction} className="btn-empty-action">
          {actionText}
        </button>
      )}
    </div>
  );
};
