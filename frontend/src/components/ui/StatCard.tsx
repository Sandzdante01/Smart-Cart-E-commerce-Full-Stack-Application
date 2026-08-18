import React from 'react';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { classNames } from '../../utils/format';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  accent?: 'primary' | 'electric' | 'success' | 'warning';
  emphasis?: boolean;
}

const accents = {
  primary: 'bg-primary-50 text-primary-600',
  electric: 'bg-electric-50 text-electric-600',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600'
};

export function StatCard({
  label,
  value,
  change,
  trend = 'up',
  icon,
  accent = 'primary',
  emphasis = false
}: StatCardProps) {
  return (
    <div
      className={classNames(
        'rounded-2xl border bg-white p-5 transition-shadow duration-200 ease-smooth hover:shadow-card',
        emphasis ? 'border-primary-200 ring-1 ring-primary-100' : 'border-line'
      )}>
      
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-semibold text-ink-muted">{label}</p>
        {icon &&
        <span className={classNames('flex h-9 w-9 items-center justify-center rounded-xl', accents[accent])}>
            {icon}
          </span>
        }
      </div>
      <p
        className={classNames(
          'mt-3 font-bold tracking-tight text-ink',
          emphasis ? 'text-3xl' : 'text-2xl'
        )}>
        
        {value}
      </p>
      {change &&
      <p
        className={classNames(
          'mt-2 inline-flex items-center gap-1 text-[13px] font-semibold',
          trend === 'up' ? 'text-success-600' : 'text-danger-600'
        )}>
        
          {trend === 'up' ?
        <TrendingUpIcon className="h-3.5 w-3.5" /> :

        <TrendingDownIcon className="h-3.5 w-3.5" />
        }
          {change}
          <span className="font-medium text-ink-muted">vs last month</span>
        </p>
      }
    </div>);

}