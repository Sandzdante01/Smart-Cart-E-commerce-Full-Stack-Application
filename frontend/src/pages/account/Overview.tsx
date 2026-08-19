import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HeartIcon, MessageSquareIcon, PackageIcon, PiggyBankIcon } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { OrderCard } from '../../components/order/OrderCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';

export function AccountOverview() {
  const { user, orders, wishlist, reviews } = useStore();
  const myOrders = orders.filter((o) => o.customerId === user?.id);
  const myReviews = reviews.filter((r) => r.customerName === `${user?.firstName} ${user?.lastName}`);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white p-6">
        <h1 className="text-[26px] font-bold text-ink">Welcome back, {user?.firstName}!</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Here's a snapshot of your SmartCart activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Orders"
          value="12"
          icon={<PackageIcon className="h-4 w-4" />}
          accent="primary" />
        
        <StatCard
          label="Wishlist"
          value={String(Math.max(8, wishlist.length))}
          icon={<HeartIcon className="h-4 w-4" />}
          accent="electric" />
        
        <StatCard
          label="Reviews"
          value={String(Math.max(15, myReviews.length))}
          icon={<MessageSquareIcon className="h-4 w-4" />}
          accent="warning" />
        
        <StatCard
          label="Saved"
          value={formatLKR(42500)}
          icon={<PiggyBankIcon className="h-4 w-4" />}
          accent="success" />
        
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-ink">Recent orders</h2>
            <p className="mt-1 text-[13px] text-ink-soft">Track deliveries and reorder in a tap.</p>
          </div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
            
            All orders
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {myOrders.length === 0 ?
        <EmptyState
          compact
          icon={<PackageIcon className="h-6 w-6" />}
          title="No orders yet"
          message="When you place your first order it will appear here with live delivery tracking."
          actionLabel="Start shopping"
          actionTo="/shop" /> :


        <div className="space-y-4">
            {myOrders.slice(0, 3).map((order) =>
          <OrderCard key={order.id} order={order} />
          )}
          </div>
        }
      </section>
    </div>);

}