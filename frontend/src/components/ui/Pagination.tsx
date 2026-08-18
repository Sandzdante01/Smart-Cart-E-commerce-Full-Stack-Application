import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { classNames } from '../../utils/format';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-colors duration-150 ease-smooth hover:border-primary-300 hover:text-primary-700 disabled:opacity-40">
        
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {pages.map((p) =>
      <button
        key={p}
        type="button"
        onClick={() => onChange(p)}
        aria-current={p === page ? 'page' : undefined}
        className={classNames(
          'h-9 min-w-[36px] rounded-lg px-3 text-sm font-semibold transition-colors duration-150 ease-smooth',
          p === page ?
          'bg-primary-600 text-white' :
          'border border-line bg-white text-ink-soft hover:border-primary-300 hover:text-primary-700'
        )}>
        
          {p}
        </button>
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-colors duration-150 ease-smooth hover:border-primary-300 hover:text-primary-700 disabled:opacity-40">
        
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>);

}