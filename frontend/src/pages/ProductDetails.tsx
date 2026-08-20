import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PackageSearchIcon,
  PlusIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TruckIcon } from
'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductGrid } from '../components/product/ProductGrid';
import { ReviewsSection } from '../components/review/ReviewsSection';
import { Badge, badgeTone } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Rating } from '../components/ui/Rating';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductDetailSkeleton } from '../components/ui/LoadingSkeleton';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useStore } from '../contexts/StoreContext';
import { classNames, formatLKR } from '../utils/format';

const promises = [
{ icon: TruckIcon, text: 'Free delivery on orders over Rs. 25,000' },
{ icon: ShieldCheckIcon, text: '1 year local warranty included' },
{ icon: RotateCcwIcon, text: '7 day returns on unopened items' }];


export function ProductDetails() {
  const { slug } = useParams<{slug: string;}>();
  const navigate = useNavigate();
  const { products, productsLoading, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    setQuantity(1);
  }, [slug]);

  if (productsLoading) {
    return (
      <div className="mx-auto max-w-shell px-6 py-12">
        <ProductDetailSkeleton />
      </div>);

  }

  if (!product) {
    return (
      <div className="mx-auto max-w-shell px-6 py-20">
        <EmptyState
          icon={<PackageSearchIcon className="h-6 w-6" />}
          title="Product could not be found"
          message="This product may have been removed or the link is incorrect."
          actionLabel="Back to shop"
          actionTo="/shop" />
        
      </div>);

  }

  const wishlisted = isWishlisted(product.id);
  const savings = product.originalPrice - product.price;
  const related = products.
  filter((p) => p.category === product.category && p.id !== product.id).
  slice(0, 4);

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
        { label: 'Shop', to: '/shop' },
        { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` },
        { label: product.name }]
        } />
      

      <div className="mx-auto max-w-shell px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-[13px] font-bold uppercase tracking-wide text-primary-600">
                
                {product.brand}
              </Link>
              {product.badge &&
              <Badge tone={badgeTone[product.badge] ?? 'primary'}>{product.badge}</Badge>
              }
            </div>

            <h1 className="mt-2 text-[30px] font-bold leading-tight text-ink sm:text-[34px]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={product.rating} size="md" />
              <a href="#reviews-heading" className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
                {product.reviews} Reviews
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-[34px] font-extrabold leading-none tracking-tight text-ink">
                {formatLKR(product.price)}
              </span>
              {savings > 0 &&
              <>
                  <span className="text-lg text-ink-muted line-through">
                    {formatLKR(product.originalPrice)}
                  </span>
                  <Badge tone="success">Save {formatLKR(savings)}</Badge>
                </>
              }
            </div>

            <p
              className={classNames(
                'mt-3 text-sm font-semibold',
                product.stock === 0 ?
                'text-danger-600' :
                product.stock <= 10 ?
                'text-warning-600' :
                'text-success-600'
              )}>
              
              {product.stock === 0 ?
              'Out of Stock — restocking soon' :
              `In Stock — ${product.stock} available`}
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-xl border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-full w-11 items-center justify-center rounded-l-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50 disabled:opacity-40"
                  disabled={quantity <= 1}>
                  
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span
                  aria-live="polite"
                  className="w-12 text-center text-sm font-bold tabular-nums text-ink">
                  
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-full w-11 items-center justify-center rounded-r-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50 disabled:opacity-40"
                  disabled={quantity >= product.stock}>
                  
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                onClick={() => addToCart(product.id, quantity)}
                disabled={product.stock === 0}>
                
                <ShoppingCartIcon className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="dark"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product.id, quantity);
                  navigate('/checkout');
                }}>
                
                Buy Now
              </Button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={classNames(
                  'flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-200 ease-smooth',
                  wishlisted ?
                  'border-danger-100 bg-danger-50 text-danger-500' :
                  'border-line bg-white text-ink-muted hover:text-danger-500'
                )}>
                
                <HeartIcon className={classNames('h-5 w-5', wishlisted && 'fill-current')} />
              </button>
            </div>

            <ul className="mt-7 space-y-2.5 rounded-2xl border border-line bg-white p-5">
              {promises.map(({ icon: Icon, text }) =>
              <li key={text} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                  <Icon className="h-4 w-4 flex-shrink-0 text-primary-600" />
                  {text}
                </li>
              )}
            </ul>
          </div>
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-2" aria-labelledby="specs-heading">
          <div>
            <h2 id="specs-heading" className="text-2xl font-bold text-ink">
              Specifications
            </h2>
            <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {product.specs.map((spec) =>
              <div key={spec.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <dt className="text-[13px] font-semibold text-ink-muted">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{spec.value}</dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="text-[13px] font-semibold text-ink-muted">SKU</dt>
                <dd className="text-sm font-semibold text-ink">{product.sku}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-ink">In the box</h2>
            <ul className="mt-5 space-y-3 rounded-2xl border border-line bg-white p-6">
              {[
              `1 × ${product.name}`,
              'USB-C charging cable',
              'Quick start guide and warranty card',
              'SmartCart authenticity certificate'].
              map((item) =>
              <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </section>

        <ReviewsSection product={product} />

        {related.length > 0 &&
        <section className="mt-16">
            <SectionHeading
            title="You may also like"
            subtitle={`More from ${product.category}.`} />
          
            <div className="mt-7">
              <ProductGrid products={related} />
            </div>
          </section>
        }
      </div>
    </>);

}