import { motion } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, ZapIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { productImages } from '../../data/products';

const highlights = [
{ icon: TruckIcon, label: 'Free delivery over Rs. 25,000' },
{ icon: ShieldCheckIcon, label: '100% genuine, warranty backed' },
{ icon: ZapIcon, label: 'Same-day dispatch in Colombo' }];


export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(17,24,39,0.06) 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
      
      <div className="relative mx-auto grid max-w-shell items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary-600">
            SmartCart Technologies · Colombo
          </p>
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.05] text-ink sm:text-[54px] lg:text-[60px]">
            Upgrade Your <span className="text-primary-600">Digital Life</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            Discover the latest technology, smart devices and accessories — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" to="/shop">
              Shop Now
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" to="/deals">
              Explore Deals
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {highlights.map(({ icon: Icon, label }) =>
            <li key={label} className="flex items-center gap-2 text-[13px] font-medium text-ink-soft">
                <Icon className="h-4 w-4 text-primary-600" />
                {label}
              </li>
            )}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
          className="relative">
          
          <div className="overflow-hidden rounded-3xl border border-line bg-slate-50 shadow-card">
            <img
              src={productImages.hero}
              alt="MacBook, smartphone, wireless headphones and a smartwatch"
              className="h-full w-full object-cover" />
            
          </div>
          <div className="absolute -bottom-5 left-5 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-lift sm:block">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">
              Trusted by
            </p>
            <p className="mt-1 text-2xl font-extrabold text-ink">12,400+</p>
            <p className="text-[13px] text-ink-soft">customers island-wide</p>
          </div>
        </motion.div>
      </div>
    </section>);

}