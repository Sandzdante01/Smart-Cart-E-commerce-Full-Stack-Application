import { useState } from 'react';
import { PackageSearchIcon, SearchIcon } from 'lucide-react';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { OrderTimeline } from '../../components/order/OrderTimeline';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import type { Order, OrderStatus } from '../../types';

const statuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [payment, setPayment] = useState('All');
  const [viewing, setViewing] = useState<Order | null>(null);

  const rows = orders.filter((order) => {
    if (query && !`${order.id} ${order.customerName}`.toLowerCase().includes(query.toLowerCase()))
    return false;
    if (status !== 'All' && order.status !== status) return false;
    if (payment !== 'All' && order.payment !== payment) return false;
    return true;
  });

  const columns: Array<Column<Order>> = [
  {
    key: 'id',
    header: 'Order ID',
    render: (order) => <span className="font-semibold text-ink">{order.id}</span>
  },
  { key: 'customer', header: 'Customer', render: (order) => order.customerName },
  { key: 'date', header: 'Date', render: (order) => order.date, hideBelow: 'lg' },
  {
    key: 'items',
    header: 'Items',
    align: 'center',
    render: (order) => order.items.length,
    hideBelow: 'md'
  },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    render: (order) => <span className="font-bold text-ink">{formatLKR(order.total)}</span>
  },
  { key: 'payment', header: 'Payment', render: (order) => order.payment, hideBelow: 'lg' },
  {
    key: 'status',
    header: 'Status',
    render: (order) =>
    <div className="flex items-center gap-2">
          <Badge tone={statusTone[order.status] ?? 'neutral'}>{order.status}</Badge>
          <select
        aria-label={`Change status of ${order.id}`}
        value={order.status}
        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
        className="h-8 rounded-lg border border-line bg-white px-2 text-[12px] font-semibold text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100">
        
            {statuses.map((s) =>
        <option key={s} value={s}>
                {s}
              </option>
        )}
          </select>
        </div>

  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: (order) =>
    <button
      type="button"
      onClick={() => setViewing(order)}
      className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
      
          View
        </button>

  }];


  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[28px] font-bold text-ink">Orders</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          {rows.length} of {orders.length} orders shown. Status changes broadcast to customers in
          realtime.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_200px]">
          <div className="relative">
            <label htmlFor="admin-order-search" className="sr-only">
              Search orders
            </label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="admin-order-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID or customer…"
              className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
            
          </div>
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
            { label: 'All statuses', value: 'All' },
            ...statuses.map((s) => ({ label: s, value: s }))]
            } />
          
          <Select
            aria-label="Filter by payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            options={[
            { label: 'All payments', value: 'All' },
            { label: 'Credit / Debit Card', value: 'Credit / Debit Card' },
            { label: 'Cash on Delivery', value: 'Cash on Delivery' },
            { label: 'Bank Transfer', value: 'Bank Transfer' }]
            } />
          
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(order) => order.id}
        caption="Store orders"
        empty={
        <EmptyState
          icon={<PackageSearchIcon className="h-6 w-6" />}
          title="No orders found"
          message="No orders match these filters right now." />

        } />
      

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        size="md"
        title={viewing ? `Order ${viewing.id}` : 'Order'}
        description={viewing ? `${viewing.customerName} · ${viewing.date}` : undefined}
        footer={
        <Button variant="outline" onClick={() => setViewing(null)}>
            Close
          </Button>
        }>
        
        {viewing &&
        <div className="space-y-5">
            <ul className="divide-y divide-line rounded-xl border border-line">
              {viewing.items.map((item) =>
            <li key={item.productId} className="flex items-center gap-3 p-3.5">
                  <img
                src={item.image}
                alt=""
                className="h-12 w-12 rounded-lg border border-line object-cover" />
              
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                    <p className="text-[12px] text-ink-muted">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[13px] font-bold text-ink">
                    {formatLKR(item.price * item.quantity)}
                  </p>
                </li>
            )}
            </ul>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Payment</dt>
                <dd className="font-semibold text-ink">{viewing.payment}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping address</dt>
                <dd className="max-w-[60%] text-right font-medium text-ink">{viewing.address}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="font-bold text-ink">Total</dt>
                <dd className="font-extrabold text-ink">{formatLKR(viewing.total)}</dd>
              </div>
            </dl>

            <div>
              <h3 className="mb-3 text-sm font-bold text-ink">Fulfilment progress</h3>
              <OrderTimeline status={viewing.status} />
            </div>
          </div>
        }
      </Modal>
    </div>);

}