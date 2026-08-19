import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShoppingCartIcon, TagIcon, TruckIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { company } from '../data/company';
import { formatLKR } from '../utils/format';

export function Cart() {
  const { cartLines, totals } = useStore();

  if (cartLines.length === 0) {
    return (
      <>
        <PageHeader title="Shopping Cart" crumbs={[{ label: 'Cart' }]} />
        <div className="mx-auto max-w-shell px-6 py-16">
          <EmptyState
            icon={<ShoppingCartIcon className="h-6 w-6" />}
            title="Your cart is empty"
            message="Browse our featured technology picks and add something you love — free delivery kicks in over Rs. 25,000."
            actionLabel="Continue Shopping"
            actionTo="/shop" />
          
        </div>
      </>);

  }

  const shortfall = company.freeShippingThreshold - totals.subtotal;

  return (
    <>
      <PageHeader
        title="Shopping Cart"
        subtitle={`${totals.count} item${totals.count === 1 ? '' : 's'} ready for checkout.`}
        crumbs={[{ label: 'Cart' }]} />
      

      <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {cartLines.map((line) =>
              <CartItem key={line.productId} product={line.product} quantity={line.quantity} />
              )}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" to="/shop">
                Continue Shopping
              </Button>
              {shortfall > 0 ?
              <p className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft">
                  <TruckIcon className="h-4 w-4 text-primary-600" />
                  Add {formatLKR(shortfall)} more for free delivery
                </p> :

              <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-success-600">
                  <TruckIcon className="h-4 w-4" />
                  Free delivery unlocked
                </p>
              }
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-bold text-ink">Order Summary</h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="font-semibold text-ink">{formatLKR(totals.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Discount</dt>
                  <dd className="font-semibold text-success-600">−{formatLKR(totals.discount)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="font-semibold text-ink">
                    {totals.shipping === 0 ? 'Free' : formatLKR(totals.shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <dt className="text-base font-bold text-ink">Total</dt>
                  <dd className="text-xl font-extrabold text-ink">{formatLKR(totals.total)}</dd>
                </div>
              </dl>

              <Button size="lg" fullWidth className="mt-6" to="/checkout">
                Proceed to Checkout
                <ArrowRightIcon className="h-4 w-4" />
              </Button>

              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-primary-50 p-3.5">
                <TagIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                <p className="text-[12px] leading-relaxed text-primary-700">
                  Your cart discount of {formatLKR(totals.discount)} has been applied automatically.
                  All prices include taxes in LKR.
                </p>
              </div>

              <p className="mt-4 text-center text-[12px] text-ink-muted">
                Need help?{' '}
                <Link to="/contact" className="font-semibold text-primary-600 hover:text-primary-700">
                  Contact support
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>);

}