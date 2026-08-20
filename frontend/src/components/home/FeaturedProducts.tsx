import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductGrid } from '../product/ProductGrid';
import { ErrorState } from '../ui/ErrorState';
import { useStore } from '../../contexts/StoreContext';

export function FeaturedProducts() {
  const { products, productsLoading, productsError, reloadProducts } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <SectionHeading
        title="Featured Products"
        subtitle="Our most popular technology picks."
        action={
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
          
            View all products
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        } />
      

      <div className="mt-8">
        {productsError ?
        <ErrorState message="Unable to load products." onRetry={reloadProducts} /> :

        <ProductGrid products={featured} loading={productsLoading} />
        }
      </div>
    </section>);

}