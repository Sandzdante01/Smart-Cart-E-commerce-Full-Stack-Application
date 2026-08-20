import { Link } from 'react-router-dom';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BanknoteIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon } from
'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { SalesChart } from '../../components/admin/SalesChart';
import { RealtimeSimulator } from '../../components/admin/RealtimeSimulator';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';
import { StatCardSkeleton } from '../../components/ui/LoadingSkeleton';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import type { Order } from '../../types';

export function AdminDashboard() {
  const { orders, products, productsLoading, user } = useStore();
  const recentOrders = orders.slice(0, 4);
  const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).slice(0, 5);

  const orderColumns: Array<Column<Order>> = [
  {
    key: 'id',
    header: 'Order',
    render: (order) =>
    <Link to="/admin/orders" className="font-semibold text-ink hover:text-primary-700">
          {order.id}
        </Link>

  },
  { key: 'customer', header: 'Customer', render: (order) => order.customerName },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    render: (order) => <span className="font-bold text-ink">{formatLKR(order.total)}</span>
  },
  {
    key: 'status',
    header: 'Status',
    render: (order) => <Badge tone={statusTone[order.status] ?? 'neutral'}>{order.status}</Badge>
  }];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-ink">
          Good morning, {user?.firstName ?? 'Isuru'} 👋
        </h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Here's what's happening with your store today.
        </p>
      </div>

      {productsLoading ?
      <StatCardSkeleton /> :

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
          emphasis
          label="Total Revenue"
          value={formatLKR(4892450)}
          change="+12.5%"
          icon={<BanknoteIcon className="h-4 w-4" />}
          accent="primary" />
        
          <StatCard
          label="Total Orders"
          value="1,284"
          change="+8.2%"
          icon={<ShoppingCartIcon className="h-4 w-4" />}
          accent="electric" />
        
          <StatCard
          label="Total Customers"
          value="856"
          change="+14.4%"
          icon={<UsersIcon className="h-4 w-4" />}
          accent="success" />
        
          <StatCard
          label="Total Products"
          value="124"
          change="+5.8%"
          icon={<PackageIcon className="h-4 w-4" />}
          accent="warning" />
        
        </div>
      }

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SalesChart />

        <div className="space-y-6">
          <RealtimeSimulator />

          <section className="rounded-2xl border border-warning-100 bg-white p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning-50 text-warning-600">
                <AlertTriangleIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-base font-bold text-ink">Low stock</h2>
                <p className="text-[12px] text-ink-muted">{lowStock.length} products need restocking</p>
              </div>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {lowStock.map((product) =>
              <li key={product.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <img
                  src={product.images[0]}
                  alt=""
                  className="h-10 w-10 rounded-lg border border-line object-cover" />
                
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{product.name}</p>
                    <p className="text-[12px] text-ink-muted">{product.category}</p>
                  </div>
                  <Badge tone="warning">Only {product.stock} left</Badge>
                </li>
              )}
            </ul>
            <Link
              to="/admin/products"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
              
              Manage inventory
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-lg font-bold text-ink">Recent orders</h2>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
              
              All orders
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <DataTable
            columns={orderColumns}
            rows={recentOrders}
            rowKey={(order) => order.id}
            caption="Most recent store orders" />
          
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-lg font-bold text-ink">Top products</h2>
            <Link
              to="/admin/analytics"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
              
              Analytics
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <ul className="divide-y divide-line">
              {topProducts.map((product) =>
              <li key={product.id} className="flex items-center gap-3 px-5 py-4">
                  <img
                  src={product.images[0]}
                  alt=""
                  className="h-11 w-11 rounded-lg border border-line object-cover" />
                
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{product.name}</p>
                    <p className="text-[12px] text-ink-muted">{product.sales} sales</p>
                  </div>
                  <div className="hidden sm:block">
                    <Rating value={product.rating} showValue={false} />
                  </div>
                  <p className="w-28 text-right text-[13px] font-bold text-ink">
                    {formatLKR(product.sales * product.price)}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>);

}