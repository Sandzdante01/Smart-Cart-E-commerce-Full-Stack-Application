import { StarIcon } from 'lucide-react';
import { classNames } from '../../utils/format';

interface RatingProps {
  value: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

export function Rating({ value, reviews, size = 'sm', showValue = true, className }: RatingProps) {
  return (
    <div className={classNames('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) =>
        <StarIcon
          key={star}
          className={classNames(
            sizeMap[size],
            star <= Math.round(value) ?
            'fill-amber-400 text-amber-400' :
            'fill-slate-200 text-slate-200'
          )}
          aria-hidden="true" />

        )}
      </div>
      {showValue &&
      <span className="text-[13px] font-semibold text-ink">{value.toFixed(1)}</span>
      }
      {typeof reviews === 'number' &&
      <span className="text-[13px] text-ink-muted">({reviews})</span>
      }
    </div>);

}

export function RatingInput({
  value,
  onChange



}: {value: number;onChange: (value: number) => void;}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        className="rounded p-0.5 transition-transform duration-150 ease-smooth hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
        
          <StarIcon
          className={classNames(
            'h-6 w-6',
            star <= value ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          )} />
        
        </button>
      )}
    </div>);

}