import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PackageSearchIcon } from 'lucide-react';
import { OrderTimeline } from '../../components/order/OrderTimeline';
import { Badge, statusTone } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';

export function OrderDetails() {
  const { orderId } = useParams<{orderId: string;}>();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <EmptyState
        icon={<PackageSearchIcon className="h-6 w-6" />}
        title="Order not found"
        message="We couldn't find that order. It may belong to a different account."
        actionLabel="Back to my orders"
        actionTo="/account/orders" />);


  }

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
    </div>);

}