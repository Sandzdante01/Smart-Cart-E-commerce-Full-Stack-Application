import React from 'react';
import { classNames } from '../../utils/format';

type Tone = 'neutral' | 'primary' | 'electric' | 'success' | 'warning' | 'danger' | 'dark';

const tones: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-ink-soft ring-slate-200',
  primary: 'bg-primary-50 text-primary-700 ring-primary-100',
  electric: 'bg-electric-50 text-electric-600 ring-electric-100',
  success: 'bg-success-50 text-success-600 ring-success-100',
  warning: 'bg-warning-50 text-warning-600 ring-warning-100',
  danger: 'bg-danger-50 text-danger-600 ring-danger-100',
  dark: 'bg-ink text-white ring-ink'
};

export function Badge({
  children,
  tone = 'neutral',
  className




}: {children: React.ReactNode;tone?: Tone;className?: string;}) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
        tones[tone],
        className
      )}>
      
      {children}
    </span>);

}

export const statusTone: Record<string, Tone> = {
  Pending: 'neutral',
  Processing: 'warning',
  Shipped: 'electric',
  Delivered: 'success',
  Cancelled: 'danger',
  Active: 'success',
  Inactive: 'neutral',
  Draft: 'neutral',
  'Out of Stock': 'danger',
  Published: 'success'
};

export const badgeTone: Record<string, Tone> = {
  'Best Seller': 'primary',
  New: 'electric',
  Popular: 'warning',
  Gaming: 'dark',
  Featured: 'primary',
  Value: 'success',
  Business: 'neutral',
  Camera: 'electric',
  Comfort: 'neutral',
  Fitness: 'success',
  Storage: 'neutral',
  Convertible: 'neutral'
};