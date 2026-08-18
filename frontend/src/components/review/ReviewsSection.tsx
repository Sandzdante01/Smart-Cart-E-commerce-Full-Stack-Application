import React, { useMemo, useState } from 'react';
import { MessageSquarePlusIcon, MessageSquareIcon } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { RatingInput, Rating } from '../ui/Rating';
import { EmptyState } from '../ui/EmptyState';
import { useStore } from '../../contexts/StoreContext';
import type { Product } from '../../types';

const distribution = [
{ stars: 5, percent: 89 },
{ stars: 4, percent: 8 },
{ stars: 3, percent: 2 },
{ stars: 2, percent: 1 },
{ stars: 1, percent: 0 }];


export function ReviewsSection({ product }: {product: Product;}) {
  const { reviews, user, addReview } = useStore();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const productReviews = useMemo(
    () => reviews.filter((r) => r.productId === product.id && r.status === 'Published'),
    [reviews, product.id]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3 || body.trim().length < 10) {
      setError('Add a short title and at least 10 characters of feedback.');
      return;
    }
    addReview({
      productId: product.id,
      productName: product.name,
      customerName: user ? `${user.firstName} ${user.lastName}` : 'SmartCart Customer',
      customerInitials: user?.avatarInitials ?? 'SC',
      rating,
      title: title.trim(),
      body: body.trim(),
      verified: true
    });
    setOpen(false);
    setTitle('');
    setBody('');
    setRating(5);
    setError('');
  };

  return (
    <section className="mt-14" aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="reviews-heading" className="text-2xl font-bold text-ink">
          Customer Reviews
        </h2>
        {user?.role === 'customer' &&
        <Button variant="outline" onClick={() => setOpen(true)}>
            <MessageSquarePlusIcon className="h-4 w-4" />
            Write a Review
          </Button>
        }
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-5xl font-extrabold tracking-tight text-ink">
            {product.rating.toFixed(1)}
            <span className="text-xl font-bold text-ink-muted"> / 5</span>
          </p>
          <div className="mt-2">
            <Rating value={product.rating} showValue={false} size="md" />
          </div>
          <p className="mt-1.5 text-[13px] text-ink-muted">
            Based on {product.reviews} verified reviews
          </p>

          <ul className="mt-5 space-y-2.5">
            {distribution.map((row) =>
            <li key={row.stars} className="flex items-center gap-3">
                <span className="w-12 flex-shrink-0 text-[12px] font-semibold text-ink-soft">
                  {row.stars} stars
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                  className="block h-full rounded-full bg-amber-400"
                  style={{ width: `${row.percent}%` }} />
                
                </span>
                <span className="w-9 flex-shrink-0 text-right text-[12px] font-semibold text-ink-muted">
                  {row.percent}%
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-4">
          {productReviews.length === 0 ?
          <EmptyState
            compact
            icon={<MessageSquareIcon className="h-6 w-6" />}
            title="No reviews yet"
            message="Be the first to share how this product performs in day-to-day use." /> :


          productReviews.map((review) => <ReviewCard key={review.id} review={review} />)
          }
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Write a review"
        description={product.name}
        footer={
        <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submit}>Publish review</Button>
          </>
        }>
        
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <p className="mb-1.5 text-[13px] font-semibold text-ink-soft">Your rating</p>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <Input
            label="Review title"
            value={title}
            placeholder="Excellent build quality"
            onChange={(e) => setTitle(e.target.value)} />
          
          <div>
            <label htmlFor="review-body" className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
              Your review
            </label>
            <textarea
              id="review-body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you like, and what could be better?"
              className="w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
            
          </div>
          {error && <p className="text-[12px] font-medium text-danger-600">{error}</p>}
        </form>
      </Modal>
    </section>);

}