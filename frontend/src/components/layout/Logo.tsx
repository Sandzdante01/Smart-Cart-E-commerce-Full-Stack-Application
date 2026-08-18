import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';

export function Logo({
  to = '/',
  variant = 'light',
  showTagline = false




}: {to?: string;variant?: 'light' | 'dark';showTagline?: boolean;}) {
  return (
    <Link to={to} className="flex items-center gap-2.5" aria-label="SmartCart home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
        <ShoppingBagIcon className="h-[18px] w-[18px]" />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-[19px] font-extrabold tracking-tight ${
          variant === 'dark' ? 'text-white' : 'text-ink'}`
          }>
          
          Smart<span className="text-primary-600">Cart</span>
        </span>
        {showTagline &&
        <span
          className={`block text-[11px] font-medium ${
          variant === 'dark' ? 'text-slate-400' : 'text-ink-muted'}`
          }>
          
            Shop Smarter. Live Better.
          </span>
        }
      </span>
    </Link>);

}