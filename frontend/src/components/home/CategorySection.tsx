import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { categories } from '../../data/categories';

export function CategorySection() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <SectionHeading
        title="Shop by Category"
        subtitle="Find the technology you need, all in one place."
        action={
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
          
            All categories
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        } />
      

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) =>
        <Link
          key={category.id}
          to={`/shop?category=${encodeURIComponent(category.name)}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lift">
          
            <div className="aspect-[4/3] overflow-hidden bg-slate-50">
              <img
              src={category.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-105" />
            
            </div>
            <div className="flex flex-1 items-center justify-between gap-2 px-3.5 py-3.5">
              <div>
                <p className="text-sm font-bold text-ink">{category.name}</p>
                <p className="text-[12px] text-ink-muted">{category.productCount} products</p>
              </div>
              <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-ink-muted transition-[color,transform] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-primary-600" />
            </div>
          </Link>
        )}
      </div>
    </section>);

}