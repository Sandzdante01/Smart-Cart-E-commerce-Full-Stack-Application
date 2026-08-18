import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
  compact = false
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white text-center ${
      compact ? 'px-6 py-10' : 'px-6 py-16'}`
      }>
      
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        {icon}
      </div>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{message}</p>
      {actionLabel &&
      <div className="mt-5">
          {actionTo ?
        <Button to={actionTo}>{actionLabel}</Button> :

        <Button onClick={onAction}>{actionLabel}</Button>
        }
        </div>
      }
    </div>);

}