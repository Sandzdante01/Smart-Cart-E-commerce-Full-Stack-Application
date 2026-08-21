import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, PackageSearchIcon, PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Rating } from '../../components/ui/Rating';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/LoadingSkeleton';
import { useStore } from '../../contexts/StoreContext';
import { brands } from '../../data/products';
import { formatLKR } from '../../utils/format';
import type { Product } from '../../types';

export function AdminProducts() {
  const { products, productsLoading, categories, deleteProduct } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [stock, setStock] = useState('All');
  const [brand, setBrand] = useState('All');
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const rows = useMemo(
    () =>
    products.filter((p) => {
      if (query && !`${p.name} ${p.brand} ${p.sku}`.toLowerCase().includes(query.toLowerCase()))
      return false;
      if (category !== 'All' && p.category !== category) return false;
      if (status !== 'All' && p.status !== status) return false;
      if (brand !== 'All' && p.brand !== brand) return false;
      if (stock === 'Low' && (p.stock === 0 || p.stock > 10)) return false;
      if (stock === 'Out' && p.stock !== 0) return false;
      if (stock === 'Healthy' && p.stock <= 10) return false;
      return true;
    }),
    [products, query, category, status, brand, stock]
  );

  const columns: Array<Column<Product>> = [
  {
    key: 'image',
    header: 'Image',
    width: '84px',
    render: (product) =>
    <img
      src={product.images[0]}
      alt=""
      className="h-11 w-11 rounded-lg border border-line object-cover" />


  },
  {
    key: 'product',
    header: 'Product',
    render: (product) =>
    <div className="min-w-0">
          <Link
        to={`/product/${product.slug}`}
        className="block truncate font-semibold text-ink hover:text-primary-700">
        
            {product.name}
          </Link>
          <p className="text-[12px] text-ink-muted">
            {product.brand} · {product.sku}
          </p>
        </div>

  },
  { key: 'category', header: 'Category', render: (p) => p.category, hideBelow: 'md' },
  {
    key: 'price',
    header: 'Price',
    align: 'right',
    render: (p) => <span className="font-bold text-ink">{formatLKR(p.price)}</span>
  },
  {
    key: 'stock',
    header: 'Stock',
    align: 'right',
    render: (p) =>
    <span
      className={
      p.stock === 0 ?
      'font-bold text-danger-600' :
      p.stock <= 10 ?
      'font-bold text-warning-600' :
      'font-semibold text-ink'
      }>
      
          {p.stock}
        </span>

  },
  {
    key: 'rating',
    header: 'Rating',
    hideBelow: 'lg',
    render: (p) => <Rating value={p.rating} showValue={false} />
  },
  {
    key: 'status',
    header: 'Status',
    render: (p) => <Badge tone={statusTone[p.status] ?? 'neutral'}>{p.status}</Badge>
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: (product) =>
    <div className="flex items-center justify-end gap-1">
          <button
        type="button"
        onClick={() => navigate(`/product/${product.slug}`)}
        aria-label={`View ${product.name}`}
        className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-slate-100 hover:text-ink">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        type="button"
        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
        aria-label={`Edit ${product.name}`}
        className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-primary-50 hover:text-primary-700">
        
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
        type="button"
        onClick={() => setToDelete(product)}
        aria-label={`Delete ${product.name}`}
        className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-danger-50 hover:text-danger-600">
        
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>

  }];


  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-ink">Products</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            {rows.length} of {products.length} products shown.
          </p>
        </div>
        <Button to="/admin/products/new">
          <PlusIcon className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_repeat(4,150px)]">
          <div className="relative">
            <label htmlFor="admin-product-search" className="sr-only">
              Search products
            </label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="admin-product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand or SKU…"
              className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
            
          </div>
          <Select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
            { label: 'All categories', value: 'All' },
            ...categories.map((c) => ({ label: c.name, value: c.name }))]
            } />
          
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
            { label: 'All statuses', value: 'All' },
            { label: 'Active', value: 'Active' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Out of Stock', value: 'Out of Stock' }]
            } />
          
          <Select
            aria-label="Filter by stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            options={[
            { label: 'All stock', value: 'All' },
            { label: 'Healthy', value: 'Healthy' },
            { label: 'Low stock', value: 'Low' },
            { label: 'Out of stock', value: 'Out' }]
            } />
          
          <Select
            aria-label="Filter by brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            options={[
            { label: 'All brands', value: 'All' },
            ...brands.map((b) => ({ label: b, value: b }))]
            } />
          
        </div>
      </div>

      {productsLoading ?
      <TableSkeleton rows={6} cols={6} /> :

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(product) => product.id}
        caption="Product catalogue"
        empty={
        <EmptyState
          icon={<PackageSearchIcon className="h-6 w-6" />}
          title="No products found"
          message="No products match these filters. Adjust the search or clear a filter to see more." />

        } />

      }

      <Modal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete Product?"
        description={
        toDelete ?
        `Are you sure you want to delete ${toDelete.name}? This action cannot be undone.` :
        undefined
        }
        footer={
        <>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
            variant="danger"
            onClick={async () => {
              if (!toDelete) return;
              try {
                await deleteProduct(toDelete.id);
                toast.success('Product deleted', { description: toDelete.name });
              } catch (err: any) {
                toast.error(err.message || 'Failed to delete product.');
              }
              setToDelete(null);
            }}>
            
              Delete Product
            </Button>
          </>
        } />
      
    </div>);

}