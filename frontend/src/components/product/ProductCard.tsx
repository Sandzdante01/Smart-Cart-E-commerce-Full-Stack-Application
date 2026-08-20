import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { Badge, badgeTone } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { useStore } from '../../contexts/StoreContext';
import { classNames, discountPercent, formatLKR } from '../../utils/format';
import type { Product } from '../../types';

export function ProductCard({ product }: {product: Product;}) {
  const { addToCart, toggleWishlist, isWishlisted, recentlyUpdatedStock } = useStore();
  const wishlisted = isWishlisted(product.id);
  const off = discountPercent(product.price, product.originalPrice);
  const justUpdated = recentlyUpdatedStock.includes(product.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[box-shadow,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.04]" />
          
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && <Badge tone={badgeTone[product.badge] ?? 'primary'}>{product.badge}</Badge>}
          {off > 0 && <Badge tone="danger">-{off}%</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          className={classNames(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-[background-color,color,border-color] duration-200 ease-smooth',
            wishlisted ?
            'border-danger-100 bg-danger-50 text-danger-500' :
            'border-line bg-white/95 text-ink-muted hover:text-danger-500'
          )}>
          
          <HeartIcon className={classNames('h-4 w-4', wishlisted && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-primary-600">
          {product.brand}
        </p>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">
          <Link to={`/product/${product.slug}`} className="transition-colors duration-150 ease-smooth hover:text-primary-700">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold text-ink">{formatLKR(product.price)}</span>
          {product.originalPrice > product.price &&
          <span className="text-[13px] text-ink-muted line-through">
              {formatLKR(product.originalPrice)}
            </span>
          }
        </div>

        <p
          className={classNames(
            'mt-1.5 text-[12px] font-semibold transition-colors duration-200 ease-smooth',
            product.stock === 0 ?
            'text-danger-600' :
            product.stock <= 10 ?
            'text-warning-600' :
            'text-success-600',
            justUpdated && 'text-electric-600'
          )}>
          
          {product.stock === 0 ?
          'Out of stock' :
          product.stock <= 10 ?
          `Low stock — only ${product.stock} left` :
          `In stock — ${product.stock} available`}
        </p>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            disabled={product.stock === 0}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white transition-[background-color,transform] duration-200 ease-smooth hover:bg-primary-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-ink-muted">
            
            <ShoppingCartIcon className="h-4 w-4" />
            {product.stock === 0 ? 'Notify me' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>);

}