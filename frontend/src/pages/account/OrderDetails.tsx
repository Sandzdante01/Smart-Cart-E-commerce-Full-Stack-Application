import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PackageSearchIcon } from 'lucide-react';
import { OrderTimeline } from '../../components/order/OrderTimeline';
import { Badge, statusTone } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { RatingInput } from '../../components/ui/Rating';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import { toast } from 'sonner';
import type { OrderItem } from '../../types';

export function OrderDetails() {
  const { orderId } = useParams<{orderId: string;}>();
  const { orders, reviews, user, addReview } = useStore();
  
  const [reviewProduct, setReviewProduct] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <EmptyState
        icon={<PackageSearchIcon className="h-6 w-6" />}
        title="Order not found"
        message="We couldn't find that order. It may belong to a different account."
        actionLabel="Back to my orders"
        actionTo="/account/orders" />
    );
  }

  const hasReviewed = (productId: string) => {
    const customerFullName = user ? `${user.firstName} ${user.lastName}` : '';
    return reviews.some((r) => r.productId === productId && r.customerName === customerFullName);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3 || body.trim().length < 10) {
      setError('Add a short title and at least 10 characters of feedback.');
      return;
    }
    if (!reviewProduct) return;

    addReview({
      productId: reviewProduct.productId,
      productName: reviewProduct.name,
      customerName: user ? `${user.firstName} ${user.lastName}` : 'SmartCart Customer',
      customerInitials: user?.avatarInitials ?? 'SC',
      rating,
      title: title.trim(),
      body: body.trim(),
      verified: true,
      status: 'Pending'
    });

    toast.success('Review submitted successfully!', {
      description: 'Your review will be visible on the admin side after moderation.'
    });

    setReviewProduct(null);
    setTitle('');
    setBody('');
    setRating(5);
    setError('');
  };

  return (
    <div className="space-y-5">
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to my orders
      </Link>

      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-ink">Order #{order.id}</h1>
            <p className="mt-1.5 text-[15px] text-ink-soft">
              Placed {order.date} · Estimated delivery {order.estimatedDelivery}
            </p>
          </div>
          <Badge tone={statusTone[order.status] ?? 'neutral'}>{order.status}</Badge>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Items</h2>
            <ul className="mt-4 divide-y divide-line">
              {order.items.map((item) =>
                <li key={item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <img
                    src={item.image}
                    alt=""
                    className="h-16 w-16 rounded-xl border border-line object-cover" />
                
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="mt-0.5 text-[13px] text-ink-muted">
                      {item.brand} · Qty {item.quantity}
                    </p>
                    {order.status === 'Delivered' && (
                      <div className="mt-2">
                        {hasReviewed(item.productId) ? (
                          <span className="text-[12px] font-semibold text-success-600 bg-success-50 px-2 py-0.5 rounded">Reviewed</span>
                        ) : (
                          <button
                            onClick={() => setReviewProduct(item)}
                            className="text-[12px] font-semibold text-primary-600 hover:text-primary-750 underline">
                            Write a Review
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-ink">
                    {formatLKR(item.price * item.quantity)}
                  </p>
                </li>
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Delivery progress</h2>
            <div className="mt-5">
              <OrderTimeline status={order.status} />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-base font-bold text-ink">Payment summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatLKR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Discount</dt>
                <dd className="font-semibold text-success-600">−{formatLKR(order.discount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="font-semibold text-ink">
                  {order.shipping === 0 ? 'Free' : formatLKR(order.shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="text-base font-bold text-ink">Total</dt>
                <dd className="text-lg font-extrabold text-ink">{formatLKR(order.total)}</dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="text-ink-soft">Payment method</dt>
                <dd className="font-semibold text-ink">{order.payment}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-base font-bold text-ink">Shipping address</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{order.address}</p>
            <Button variant="outline" fullWidth className="mt-5" to="/contact">
              Need help with this order?
            </Button>
          </section>
        </aside>
      </div>

      <Modal
        open={Boolean(reviewProduct)}
        onClose={() => setReviewProduct(null)}
        title="Write a review"
        description={reviewProduct?.name}
        footer={
          <>
            <Button variant="outline" onClick={() => setReviewProduct(null)}>
              Cancel
            </Button>
            <Button onClick={submitReview}>Submit review</Button>
          </>
        }>
        
        <form className="space-y-4" onSubmit={submitReview}>
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
    </div>
  );
}