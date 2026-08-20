import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Rating } from '../components/ui/Rating';
import { ProductGridSkeleton } from '../components/ui/LoadingSkeleton';
import { useStore } from '../contexts/StoreContext';
import { formatLKR } from '../utils/format';

export function Wishlist() {
  const { wishlist, products, productsLoading, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <PageHeader
        title="My Wishlist"
        subtitle={`${items.length} product${items.length === 1 ? '' : 's'} saved for later.`}
        crumbs={[{ label: 'Wishlist' }]} />
      

      <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
        {productsLoading ?
        <ProductGridSkeleton count={4} /> :
        items.length === 0 ?
        <EmptyState
          icon={<HeartIcon className="h-6 w-6" />}
          title="Your wishlist is empty"
          message="Tap the heart on any product to save it here and keep an eye on price drops."
          actionLabel="Browse products"
          actionTo="/shop" /> :


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) =>
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 ease-smooth hover:border-primary-200 hover:shadow-card">
            
                <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={`Remove ${product.name} from wishlist`}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/95 text-ink-muted transition-colors duration-150 ease-smooth hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600">
              
                  <XIcon className="h-4 w-4" />
                </button>

                <Link to={`/product/${product.slug}`} className="aspect-square overflow-hidden bg-slate-50">
                  <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.04]" />
              
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-primary-600">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">
                    <Link to={`/product/${product.slug}`} className="hover:text-primary-700">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-2">
                    <Rating value={product.rating} reviews={product.reviews} />
                  </div>
                  <p className="mt-3 text-lg font-bold text-ink">{formatLKR(product.price)}</p>

                  <div className="mt-auto pt-4">
                    <Button fullWidth onClick={() => addToCart(product.id)} disabled={product.stock === 0}>
                      <ShoppingCartIcon className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </article>
          )}
          </div>
        }
      </div>
    </>);

}