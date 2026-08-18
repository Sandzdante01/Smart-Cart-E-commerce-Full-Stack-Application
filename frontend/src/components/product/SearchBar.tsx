import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function SearchBar({
  placeholder = 'Search for laptops, phones, headphones…',
  autoFocus = false,
  onNavigate
}: SearchBarProps) {
  const { products } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products.
    filter(
      (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).
    slice(0, 6);
  }, [products, query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          id="site-search"
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-9 text-sm text-ink placeholder:text-ink-muted/80 transition-colors duration-150 ease-smooth focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
        
        {query &&
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
          
            <XIcon className="h-4 w-4" />
          </button>
        }
      </form>

      {open && query.trim().length >= 2 &&
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-panel">
          {suggestions.length === 0 ?
        <p className="px-4 py-5 text-sm text-ink-soft">
              No products match “{query}”. Try a brand or category.
            </p> :

        <ul className="max-h-80 overflow-y-auto py-1 sc-scrollbar">
              {suggestions.map((p) =>
          <li key={p.id}>
                  <button
              type="button"
              onClick={() => {
                navigate(`/product/${p.slug}`);
                setOpen(false);
                setQuery('');
                onNavigate?.();
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ease-smooth hover:bg-primary-50">
              
                    <img
                src={p.images[0]}
                alt=""
                className="h-10 w-10 rounded-lg border border-line object-cover" />
              
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
                      <span className="block text-[12px] text-ink-muted">
                        {p.brand} · {p.category}
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-primary-700">
                      {formatLKR(p.price)}
                    </span>
                  </button>
                </li>
          )}
            </ul>
        }
        </div>
      }
    </div>);

}