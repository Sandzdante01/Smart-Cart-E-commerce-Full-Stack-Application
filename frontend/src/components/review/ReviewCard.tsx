import { BadgeCheckIcon } from 'lucide-react';
import { Rating } from '../ui/Rating';
import type { Review } from '../../types';

export function ReviewCard({ review, showProduct = false }: {review: Review;showProduct?: boolean;}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-ink-soft">
          {review.customerInitials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-ink">{review.customerName}</p>
            {review.verified &&
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-success-600">
                <BadgeCheckIcon className="h-3.5 w-3.5" />
                Verified purchase
              </span>
            }
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-3">
            <Rating value={review.rating} showValue={false} />
            <span className="text-[12px] text-ink-muted">{review.date}</span>
          </div>
          {showProduct &&
          <p className="mt-2 text-[12px] font-semibold text-primary-600">{review.productName}</p>
          }
          <h4 className="mt-3 text-[15px] font-semibold text-ink">{review.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{review.body}</p>
        </div>
      </div>
    </article>);

}