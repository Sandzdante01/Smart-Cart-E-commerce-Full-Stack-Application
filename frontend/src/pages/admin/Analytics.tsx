import React from 'react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BanknoteIcon, PercentIcon, RepeatIcon, ShoppingBagIcon } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { SalesChart } from '../../components/admin/SalesChart';
import { categories } from '../../data/categories';
import { useStore } from '../../contexts/StoreContext';
import { formatCompactLKR, formatLKR } from '../../utils/format';

const palette = ['#4338ca', '#0ea5e9', '#16a34a', '#d97706', '#6366f1', '#0284c7'];

export function AdminAnalytics() {
  const { products } = useStore();

  const byCategory = categories.map((category) => ({
    name: category.name,
    value: products.
    filter((p) => p.category === category.name).
    reduce((sum, p) => sum + p.sales * p.price, 0)
  }));

  const topBrands = Object.entries(
    products.reduce<Record<string, number>>((acc, product) => {
      acc[product.brand] = (acc[product.brand] ?? 0) + product.sales;
      return acc;
    }, {})
  ).
  map(([name, value]) => ({ name, value })).
  sort((a, b) => b.value - a.value).
  slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-ink">Analytics</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Revenue, conversion and category performance for SmartCart.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          emphasis
          label="Revenue this month"
          value={formatLKR(4892450)}
          change="+12.5%"
          icon={<BanknoteIcon className="h-4 w-4" />} />
        
        <StatCard
          label="Average order value"
          value={formatLKR(186300)}
          change="+4.1%"
          icon={<ShoppingBagIcon className="h-4 w-4" />}
          accent="electric" />
        
        <StatCard
          label="Conversion rate"
          value="3.8%"
          change="+0.6%"
          icon={<PercentIcon className="h-4 w-4" />}
          accent="success" />
        
        <StatCard
          label="Repeat customers"
          value="41%"
          change="+2.3%"
          icon={<RepeatIcon className="h-4 w-4" />}
          accent="warning" />
        
      </div>

      <SalesChart />

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Revenue by category</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={100}
                  paddingAngle={2}>
                  
                  {byCategory.map((entry, index) =>
                  <Cell key={entry.name} fill={palette[index % palette.length]} />
                  )}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatLKR(value)}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e6e8ef', fontSize: 13 }} />
                
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {byCategory.map((entry, index) =>
            <li key={entry.name} className="flex items-center gap-2 text-[13px] text-ink-soft">
                <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: palette[index % palette.length] }} />
              
                {entry.name}
              </li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Units sold by brand</h2>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBrands} layout="vertical" margin={{ left: 8, right: 16 }}>
                <XAxis
                  type="number"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false} />
                
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false} />
                
                <Tooltip
                  formatter={(value: number) => [`${value} units`, 'Sold']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e6e8ef', fontSize: 13 }} />
                
                <Bar dataKey="value" fill="#4338ca" radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Highest grossing products</h2>
        <ul className="mt-4 divide-y divide-line">
          {[...products].
          sort((a, b) => b.sales * b.price - a.sales * a.price).
          slice(0, 6).
          map((product) =>
          <li key={product.id} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                <img
              src={product.images[0]}
              alt=""
              className="h-11 w-11 rounded-lg border border-line object-cover" />
            
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{product.name}</p>
                  <p className="text-[12px] text-ink-muted">
                    {product.brand} · {product.sales} units
                  </p>
                </div>
                <p className="text-[13px] font-bold text-ink">
                  {formatCompactLKR(product.sales * product.price)}
                </p>
              </li>
          )}
        </ul>
      </section>
    </div>);

}