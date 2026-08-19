import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageIcon } from 'lucide-react';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { Select } from '../../components/ui/Select';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import type { Order } from '../../types';

const statusFilters = [
{ label: 'All statuses', value: 'All' },
{ label: 'Pending', value: 'Pending' },
{ label: 'Processing', value: 'Processing' },
{ label: 'Shipped', value: 'Shipped' },
{ label: 'Delivered', value: 'Delivered' },
{ label: 'Cancelled', value: 'Cancelled' }];


export function AccountOrders() {
  const { orders, user } = useStore();
  const [status, setStatus] = useState('All');

  const rows = orders.filter(
    (o) => o.customerId === user?.id && (status === 'All' || o.status === status)
  );

  const columns: Array<Column<Order>> = [
  {
    key: 'id',
    header: 'Order',
    render: (order) =>
    <Link to={`/account/orders/${order.id}`} className="font-semibold text-ink hover:text-primary-700">
          #{order.id}
        </Link>

  },
  { key: 'date', header: 'Date', render: (order) => order.date, hideBelow: 'sm' },
  {
    key: 'items',
    header: 'Items',
    render: (order) => `${order.items.length} item${order.items.length === 1 ? '' : 's'}`,
    hideBelow: 'md'
  },
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
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (order) =>
    <Link
      to={`/account/orders/${order.id}`}
      className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
      
          View
        </Link>

  }];


  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-ink">My Orders</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            {rows.length} order{rows.length === 1 ? '' : 's'} in your history.
          </p>
        </div>
        <div className="w-48">
          <Select
            aria-label="Filter by status"
            options={statusFilters}
            value={status}
            onChange={(e) => setStatus(e.target.value)} />
          
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(order) => order.id}
        caption="Your SmartCart orders"
        empty={
        <EmptyState
          icon={<PackageIcon className="h-6 w-6" />}
          title="No orders found"
          message="No orders match this status filter. Try selecting all statuses."
          actionLabel="Browse products"
          actionTo="/shop" />

        } />
      
    </div>);

}