import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Badge, statusTone } from '../ui/Badge';
import { formatLKR } from '../../utils/format';
import type { Order } from '../../types';

export function OrderCard({ order }: {order: Order;}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 ease-smooth hover:border-primary-200 hover:shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-ink">#{order.id}</p>
          <p className="mt-0.5 text-[13px] text-ink-muted">
            Placed {order.date} · {order.payment}
          </p>
        </div>
        <Badge tone={statusTone[order.status] ?? 'neutral'}>{order.status}</Badge>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-3">
          {order.items.slice(0, 3).map((item) =>
          <img
            key={item.productId}
            src={item.image}
            alt=""
            className="h-12 w-12 rounded-lg border-2 border-white bg-white object-cover ring-1 ring-line" />

          )}
        </div>
        <p className="text-[13px] text-ink-soft">
          {order.items.length} item{order.items.length === 1 ? '' : 's'} ·{' '}
          <span className="font-semibold text-ink">{formatLKR(order.total)}</span>
        </p>
        <Link
          to={`/account/orders/${order.id}`}
          className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
          
          View details
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>);

}