import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { classNames } from '../../utils/format';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  trailing,
  id,
  className,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label &&
      <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
            {icon}
          </span>
        }
        <input
          id={inputId}
          className={classNames(
            'h-11 w-full rounded-xl border bg-white text-sm text-ink placeholder:text-ink-muted/80 transition-colors duration-150 ease-smooth focus:outline-none focus:ring-4',
            icon ? 'pl-10' : 'pl-3.5',
            trailing ? 'pr-11' : 'pr-3.5',
            error ?
            'border-danger-500 focus:border-danger-500 focus:ring-danger-100' :
            'border-line focus:border-primary-500 focus:ring-primary-100',
            className
          )}
          aria-invalid={Boolean(error)}
          {...rest} />
        
        {trailing &&
        <span className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</span>
        }
      </div>
      {error ?
      <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-danger-600">
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p> :
      hint ?
      <p className="mt-1.5 text-[12px] text-ink-muted">{hint}</p> :
      null}
    </div>);

}