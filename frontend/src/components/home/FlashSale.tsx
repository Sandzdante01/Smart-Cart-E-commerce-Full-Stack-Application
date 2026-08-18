import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, FlameIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { discountPercent, formatLKR } from '../../utils/format';
import { Skeleton } from '../ui/LoadingSkeleton';

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return [h, m, s];
}

export function FlashSale() {
  const { products, productsLoading, addToCart } = useStore();
  const [h, m, s] = useCountdown(5 * 3600 + 42 * 60 + 18);
  const deals = products.filter((p) => p.flashSale).slice(0, 4);

  return (
    <section className="bg-ink py-16">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md bg-danger-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-danger-500">
              <FlameIcon className="h-3.5 w-3.5" />
              Ends soon
            </p>
            <h2 className="mt-3 text-[30px] font-bold text-white">Flash Sale</h2>
            <p className="mt-2 text-[15px] text-slate-400">
              Limited-time deals on selected technology.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[h, m, s].map((unit, i) =>
            <React.Fragment key={i}>
                <span className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-white/5 text-xl font-bold tabular-nums text-white ring-1 ring-white/10">
                  {unit}
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                    {['hrs', 'min', 'sec'][i]}
                  </span>
                </span>
                {i < 2 && <span className="text-xl font-bold text-slate-600">:</span>}
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productsLoading ?
          Array.from({ length: 4 }).map((_, i) =>
          <div key={i} className="rounded-2xl bg-white/5 p-4">
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <Skeleton className="mt-4 h-4 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-1/2" />
                </div>
          ) :
          deals.map((product) => {
            const sold = Math.max(0, 40 - product.stock);
            const progress = Math.min(100, Math.round(sold / 40 * 100));
            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-[background-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-white/[0.07]">
                
                    <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-white">
                      <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.04]" />
                  
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[12px] font-semibold uppercase tracking-wide text-primary-400">
                        {product.brand}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-snug text-white">
                        <Link to={`/product/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <div className="mt-2.5 flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-bold text-white">{formatLKR(product.price)}</span>
                        <span className="text-[13px] text-slate-500 line-through">
                          {formatLKR(product.originalPrice)}
                        </span>
                        <span className="rounded-md bg-danger-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                          -{discountPercent(product.price, product.originalPrice)}%
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                        className="h-full rounded-full bg-danger-500 transition-[width] duration-300 ease-smooth"
                        style={{ width: `${progress}%` }} />
                      
                        </div>
                        <p className="mt-2 text-[12px] font-semibold text-slate-400">
                          Only {product.stock} left
                        </p>
                      </div>

                      <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="mt-4 h-10 w-full rounded-xl bg-white text-sm font-bold text-ink transition-[background-color,transform] duration-200 ease-smooth hover:bg-slate-200 active:scale-[0.98]">
                    
                        Add to Cart
                      </button>
                    </div>
                  </article>);

          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/deals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-400">
            
            See all flash deals
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>);

}