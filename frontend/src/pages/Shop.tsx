import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterPanel, defaultFilters, type Filters } from '../components/product/FilterPanel';
import { Pagination } from '../components/ui/Pagination';
import { Select } from '../components/ui/Select';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';
import { useStore } from '../contexts/StoreContext';

const PAGE_SIZE = 8;

const sortOptions = [
{ label: 'Featured', value: 'featured' },
{ label: 'Price: Low to High', value: 'price-asc' },
{ label: 'Price: High to Low', value: 'price-desc' },
{ label: 'Newest', value: 'newest' },
{ label: 'Highest Rated', value: 'rating' },
{ label: 'Most Popular', value: 'popular' }];


export function Shop() {
  const { products, productsLoading, productsError, reloadProducts } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    category: searchParams.get('category') ?? 'All'
  });

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
    setFilters((prev) => ({ ...prev, category: searchParams.get('category') ?? 'All' }));
    setPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => {
      if (q && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) return false;
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.stock === 0) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'popular':
        return [...result].sort((a, b) => b.sales - a.sales);
      default:
        return [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [products, query, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(filtered.length, safePage * PAGE_SIZE);

  const resetFilters = () => {
    setFilters(defaultFilters);
    setQuery('');
    setSearchParams({});
    setPage(1);
  };

  const changeFilters = (next: Filters) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Shop All Products"
        subtitle="Explore our collection of technology products."
        crumbs={[{ label: 'Shop' }]} />
      

      <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FilterPanel filters={filters} onChange={changeFilters} onReset={resetFilters} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="rounded-2xl border border-line bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <label htmlFor="shop-search" className="sr-only">
                    Search products
                  </label>
                  <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    id="shop-search"
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by product, brand or category…"
                    className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
                  
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setDrawerOpen(true)}>
                    
                    <SlidersHorizontalIcon className="h-4 w-4" />
                    Filters
                  </Button>
                  <div className="w-48">
                    <Select
                      aria-label="Sort products"
                      options={sortOptions}
                      value={sort}
                      onChange={(e) => setSort(e.target.value)} />
                    
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
                <p className="text-[13px] font-medium text-ink-soft">
                  Showing {from}–{to} of {filtered.length} products
                </p>
                {(filters.category !== 'All' || filters.brands.length > 0 || query) &&
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
                  
                    Clear filters
                  </button>
                }
              </div>
            </div>

            <div className="mt-6">
              {productsError ?
              <ErrorState message="Unable to load products." onRetry={reloadProducts} /> :

              <ProductGrid
                products={paged}
                loading={productsLoading}
                columns={3}
                onClearFilters={resetFilters} />

              }
            </div>

            {!productsLoading && !productsError && filtered.length > 0 &&
            <div className="mt-8">
                <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
              </div>
            }
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
            className="absolute inset-0 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setDrawerOpen(false)} />
          
            <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-y-0 right-0 w-[88vw] max-w-sm overflow-y-auto bg-canvas p-4 sc-scrollbar">
            
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-ink">Filter products</h2>
                <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="rounded-lg p-2 text-ink-muted hover:bg-white">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel filters={filters} onChange={changeFilters} onReset={resetFilters} />
              <Button fullWidth className="mt-4" onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} products
              </Button>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </>);

}