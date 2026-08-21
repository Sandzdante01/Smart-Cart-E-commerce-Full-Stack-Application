import React from 'react';
import { StarIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { brands } from '../../data/products';
import { formatLKR } from '../../utils/format';
import { Button } from '../ui/Button';

export interface Filters {
  category: string;
  brands: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export const defaultFilters: Filters = {
  category: 'All',
  brands: [],
  maxPrice: 600000,
  minRating: 0,
  inStockOnly: false
};

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0">
      <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-ink">{title}</h3>
      {children}
    </div>);

}

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const { categories } = useStore();
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
          
          Reset
        </button>
      </div>

      <Group title="Category">
        <div className="space-y-1">
          {['All', ...categories.map((c) => c.name)].map((name) =>
          <label
            key={name}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50">
            
              <input
              type="radio"
              name="category"
              checked={filters.category === name}
              onChange={() => set({ category: name })}
              className="h-4 w-4 border-line text-primary-600 focus:ring-primary-500" />
            
              {name}
            </label>
          )}
        </div>
      </Group>

      <Group title="Brand">
        <div className="max-h-48 space-y-1 overflow-y-auto pr-1 sc-scrollbar">
          {brands.map((brand) =>
          <label
            key={brand}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50">
            
              <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() =>
              set({
                brands: filters.brands.includes(brand) ?
                filters.brands.filter((b) => b !== brand) :
                [...filters.brands, brand]
              })
              }
              className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500" />
            
              {brand}
            </label>
          )}
        </div>
      </Group>

      <Group title="Price range">
        <input
          type="range"
          min={25000}
          max={600000}
          step={5000}
          value={filters.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          aria-label="Maximum price"
          className="w-full accent-primary-600" />
        
        <div className="mt-2 flex items-center justify-between text-[13px] text-ink-soft">
          <span>Rs. 25,000</span>
          <span className="font-semibold text-ink">Up to {formatLKR(filters.maxPrice)}</span>
        </div>
      </Group>

      <Group title="Customer rating">
        <div className="space-y-1">
          {[0, 4, 4.5, 4.8].map((rating) =>
          <label
            key={rating}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50">
            
              <input
              type="radio"
              name="rating"
              checked={filters.minRating === rating}
              onChange={() => set({ minRating: rating })}
              className="h-4 w-4 border-line text-primary-600 focus:ring-primary-500" />
            
              {rating === 0 ?
            'Any rating' :

            <span className="flex items-center gap-1">
                  <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {rating} & up
                </span>
            }
            </label>
          )}
        </div>
      </Group>

      <Group title="Availability">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => set({ inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500" />
          
          In stock only
        </label>
      </Group>

      <Button variant="outline" fullWidth className="mt-5" onClick={onReset}>
        Clear all filters
      </Button>
    </div>);

}