import React from 'react';
import { AlertTriangleIcon, RotateCcwIcon } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again'
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-danger-100 bg-danger-50/60 px-6 py-14 text-center">
      
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-danger-500 ring-1 ring-danger-100">
        <AlertTriangleIcon className="h-6 w-6" />
      </span>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{message}</p>
      {onRetry &&
      <Button variant="outline" className="mt-5" onClick={onRetry}>
          <RotateCcwIcon className="h-4 w-4" />
          {retryLabel}
        </Button>
      }
    </div>);

}