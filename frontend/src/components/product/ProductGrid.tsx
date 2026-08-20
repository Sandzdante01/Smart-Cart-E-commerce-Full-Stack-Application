import { PackageSearchIcon } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../ui/EmptyState';
import { ProductGridSkeleton } from '../ui/LoadingSkeleton';
import type { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 3 | 4;
  skeletonCount?: number;
  onClearFilters?: () => void;
}

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
  skeletonCount = 8,
  onClearFilters
}: ProductGridProps) {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />;

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearchIcon className="h-6 w-6" />}
        title="No products found"
        message="We couldn't find anything matching those filters. Try widening your search or clearing a filter."
        actionLabel={onClearFilters ? 'Clear all filters' : undefined}
        onAction={onClearFilters} />);


  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:gap-5 ${
      columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`
      }>
      
      {products.map((product) =>
      <ProductCard key={product.id} product={product} />
      )}
    </div>);

}