import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { classNames } from '../../utils/format';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{label: string;value: string;}>;
  compact?: boolean;
}

export function Select({ label, options, compact, id, className, ...rest }: SelectProps) {
  const selectId = id ?? rest.name ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label &&
      <label htmlFor={selectId} className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
          {label}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          className={classNames(
            'w-full appearance-none rounded-xl border border-line bg-white pl-3.5 pr-9 text-sm font-medium text-ink transition-colors duration-150 ease-smooth focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100',
            compact ? 'h-9' : 'h-11',
            className
          )}
          {...rest}>
          
          {options.map((option) =>
          <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true" />
        
      </div>
    </div>);

}