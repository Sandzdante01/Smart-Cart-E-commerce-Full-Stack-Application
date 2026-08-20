import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { formatLKR } from '../../utils/format';
import { Button } from '../ui/Button';

export function MiniCart({ onClose }: {onClose: () => void;}) {
  const { cartLines, totals, removeFromCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
      
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h3 className="text-sm font-bold text-ink">Your Cart</h3>
        <span className="text-[12px] font-semibold text-ink-muted">{totals.count} items</span>
      </div>

      {cartLines.length === 0 ?
      <div className="px-6 py-10 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <ShoppingBagIcon className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-ink">Your cart is empty</p>
          <p className="mt-1 text-[13px] text-ink-soft">Add a product to get started.</p>
          <Button size="sm" className="mt-4" to="/shop">
            Browse products
          </Button>
        </div> :

      <>
          <ul className="max-h-72 divide-y divide-line overflow-y-auto sc-scrollbar">
            {cartLines.map((line) =>
          <li key={line.productId} className="flex gap-3 px-4 py-3">
                <img
              src={line.product.images[0]}
              alt=""
              className="h-14 w-14 flex-shrink-0 rounded-lg border border-line object-cover" />
            
                <div className="min-w-0 flex-1">
                  <Link
                to={`/product/${line.product.slug}`}
                onClick={onClose}
                className="block truncate text-[13px] font-semibold text-ink hover:text-primary-700">
                
                    {line.product.name}
                  </Link>
                  <p className="mt-0.5 text-[12px] text-ink-muted">Qty {line.quantity}</p>
                  <p className="mt-0.5 text-[13px] font-bold text-ink">
                    {formatLKR(line.product.price * line.quantity)}
                  </p>
                </div>
                <button
              type="button"
              onClick={() => removeFromCart(line.productId)}
              aria-label={`Remove ${line.product.name}`}
              className="self-start rounded-lg p-1.5 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-danger-50 hover:text-danger-600">
              
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </li>
          )}
          </ul>

          <div className="border-t border-line px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-bold text-ink">{formatLKR(totals.subtotal)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" to="/cart">
                View Cart
              </Button>
              <Button size="sm" to="/checkout">
                Checkout
              </Button>
            </div>
          </div>
        </>
      }
    </motion.div>);

}