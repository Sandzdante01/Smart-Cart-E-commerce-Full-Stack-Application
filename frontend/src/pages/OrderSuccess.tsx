import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, MailIcon, PackageIcon, TruckIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useStore } from '../contexts/StoreContext';
import { company } from '../data/company';
import { formatLKR } from '../utils/format';

export function OrderSuccess() {
  const location = useLocation();
  const { orders } = useStore();
  const orderId = (location.state as {orderId?: string;} | null)?.orderId ?? 'SC-2026-1024';
  const order = orders.find((o) => o.id === orderId) ?? orders[0];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
        
        <motion.span
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.24, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-500 text-white">
          
          <CheckIcon className="h-8 w-8" />
        </motion.span>

        <h1 className="mt-6 text-[30px] font-bold text-ink sm:text-[34px]">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft">Thank you for shopping with SmartCart.</p>

        <dl className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-line p-4">
            <dt className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-ink-muted">
              <PackageIcon className="h-3.5 w-3.5" />
              Order number
            </dt>
            <dd className="mt-2 text-base font-extrabold text-ink">#{order.id}</dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-ink-muted">
              <TruckIcon className="h-3.5 w-3.5" />
              Estimated delivery
            </dt>
            <dd className="mt-2 text-base font-bold text-ink">{order.estimatedDelivery}</dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-ink-muted">
              <MailIcon className="h-3.5 w-3.5" />
              Total paid
            </dt>
            <dd className="mt-2 text-base font-extrabold text-ink">{formatLKR(order.total)}</dd>
          </div>
        </dl>

        <ul className="mt-6 divide-y divide-line rounded-2xl border border-line text-left">
          {order.items.map((item) =>
          <li key={item.productId} className="flex items-center gap-4 p-4">
              <img
              src={item.image}
              alt=""
              className="h-14 w-14 rounded-lg border border-line object-cover" />
            
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                <p className="text-[13px] text-ink-muted">
                  {item.brand} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-bold text-ink">{formatLKR(item.price * item.quantity)}</p>
            </li>
          )}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" to={`/account/orders/${order.id}`}>
            View Order
          </Button>
          <Button size="lg" variant="outline" to="/shop">
            Continue Shopping
          </Button>
        </div>

        <p className="mt-8 text-[13px] text-ink-muted">
          A confirmation email is on its way. Questions? Write to{' '}
          <Link to="/contact" className="font-semibold text-primary-600 hover:text-primary-700">
            {company.supportEmail}
          </Link>
          .
        </p>
      </motion.div>
    </div>);

}