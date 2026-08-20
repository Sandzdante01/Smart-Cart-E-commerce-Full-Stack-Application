import { Link } from 'react-router-dom';
import { HeartIcon, MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import type { Product } from '../../types';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { setQuantity, removeFromCart, moveToWishlist } = useStore();

  return (
    <li className="flex flex-col gap-4 p-5 sm:flex-row">
      <Link
        to={`/product/${product.slug}`}
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-white">
        
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-primary-600">
          {product.brand}
        </p>
        <h3 className="mt-0.5 text-[15px] font-semibold text-ink">
          <Link to={`/product/${product.slug}`} className="hover:text-primary-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[13px] text-ink-muted">
          {product.category} · SKU {product.sku}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="flex h-10 items-center rounded-xl border border-line bg-white">
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex h-full w-9 items-center justify-center rounded-l-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50">
              
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-bold tabular-nums text-ink">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(product.id, Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-full w-9 items-center justify-center rounded-r-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50 disabled:opacity-40">
              
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => moveToWishlist(product.id)}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft transition-colors duration-150 ease-smooth hover:text-primary-700">
            
            <HeartIcon className="h-3.5 w-3.5" />
            Save for wishlist
          </button>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft transition-colors duration-150 ease-smooth hover:text-danger-600">
            
            <Trash2Icon className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>

      <div className="text-right sm:w-36">
        <p className="text-lg font-bold text-ink">{formatLKR(product.price * quantity)}</p>
        {product.originalPrice > product.price &&
        <p className="text-[13px] text-ink-muted line-through">
            {formatLKR(product.originalPrice * quantity)}
          </p>
        }
        <p className="mt-1 text-[12px] text-ink-muted">{formatLKR(product.price)} each</p>
      </div>
    </li>);

}