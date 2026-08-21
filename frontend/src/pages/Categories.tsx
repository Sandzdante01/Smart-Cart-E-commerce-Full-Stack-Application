import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useStore } from '../contexts/StoreContext';
import type { Category } from '../types';

export function Categories() {
  const { categories } = useStore();

  if (categories.length === 0) {
    return (
      <>
        <PageHeader
          title="Categories"
          subtitle="Six focused collections covering everything we stock — from ultrabooks to everyday accessories."
          crumbs={[{ label: 'Categories' }]} />
        <div className="mx-auto max-w-shell px-6 py-20 text-center text-slate-400">
          Loading categories...
        </div>
      </>
    );
  }

  const [lead, ...rest] = categories;

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Six focused collections covering everything we stock — from ultrabooks to everyday accessories."
        crumbs={[{ label: 'Categories' }]} />
      

      <div className="mx-auto max-w-shell px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <Link
            to={`/shop?category=${encodeURIComponent(lead.name)}`}
            className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-ink lg:col-span-2">
            
            <img
              src={lead.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-300 ease-smooth group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-ink/55" />
            <div className="relative p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary-300">
                {lead.productCount} products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">{lead.name}</h2>
              <p className="mt-2 max-w-md text-sm text-slate-200">{lead.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                Browse {lead.name}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((category) =>
            <CategoryTile key={category.id} category={category} />
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((category) =>
          <CategoryTile key={category.id} category={category} />
          )}
        </div>
      </div>
    </>);

}

function CategoryTile({ category }: {category: Category;}) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lift">
      
      <img
        src={category.image}
        alt=""
        loading="lazy"
        className="h-20 w-20 flex-shrink-0 rounded-xl border border-line object-cover" />
      
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-ink">{category.name}</p>
        <p className="mt-0.5 text-[13px] text-ink-muted">{category.productCount} products</p>
        <p className="mt-1.5 line-clamp-2 text-[13px] text-ink-soft">{category.description}</p>
      </div>
      <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-ink-muted transition-[color,transform] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-primary-600" />
    </Link>);

}