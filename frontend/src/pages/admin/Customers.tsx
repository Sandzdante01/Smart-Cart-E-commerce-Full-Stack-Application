import { useEffect, useState } from 'react';
import { SearchIcon, UsersIcon } from 'lucide-react';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/LoadingSkeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { api } from '../../services/api';
import { formatLKR } from '../../utils/format';
import type { CustomerRecord } from '../../types';

export function AdminCustomers() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    api.
    getCustomers().
    then((data) => {
      if (!active) return;
      setCustomers(data);
      setLoading(false);
    }).
    catch(() => {
      if (!active) return;
      setError(true);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [reload]);

  const rows = customers.filter((c) =>
  `${c.name} ${c.email} ${c.location}`.toLowerCase().includes(query.toLowerCase())
  );

  const columns: Array<Column<CustomerRecord>> = [
  {
    key: 'customer',
    header: 'Customer',
    render: (customer) =>
    <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-[12px] font-bold text-primary-700">
            {customer.name.
        split(' ').
        map((part) => part[0]).
        join('')}
          </span>
          <div>
            <p className="font-semibold text-ink">{customer.name}</p>
            <p className="text-[12px] text-ink-muted">{customer.location}</p>
          </div>
        </div>

  },
  { key: 'email', header: 'Email', render: (c) => c.email, hideBelow: 'md' },
  { key: 'orders', header: 'Orders', align: 'center', render: (c) => c.orders },
  {
    key: 'spent',
    header: 'Total Spent',
    align: 'right',
    render: (c) => <span className="font-bold text-ink">{formatLKR(c.totalSpent)}</span>
  },
  { key: 'joined', header: 'Joined', render: (c) => c.joined, hideBelow: 'lg' },
  {
    key: 'status',
    header: 'Status',
    render: (c) => <Badge tone={statusTone[c.status] ?? 'neutral'}>{c.status}</Badge>
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: (c) =>
    <a
      href={`mailto:${c.email}`}
      className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
      
          Email
        </a>

  }];


  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[28px] font-bold text-ink">Customers</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          856 registered customers. Showing the five most active accounts.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <div className="relative max-w-md">
          <label htmlFor="admin-customer-search" className="sr-only">
            Search customers
          </label>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            id="admin-customer-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or city…"
            className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
          
        </div>
      </div>

      {loading ?
      <TableSkeleton rows={5} cols={6} /> :
      error ?
      <ErrorState
        message="Unable to load customers."
        onRetry={() => setReload((r) => r + 1)} /> :


      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(c) => c.id}
        caption="Registered customers"
        empty={
        <EmptyState
          icon={<UsersIcon className="h-6 w-6" />}
          title="No customers found"
          message="No accounts match that search." />

        } />

      }
    </div>);

}