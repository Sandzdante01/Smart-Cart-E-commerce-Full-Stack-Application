import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { salesSeries, type SalesPeriod } from '../../data/orders';
import { classNames, formatCompactLKR, formatLKR } from '../../utils/format';

const periods: SalesPeriod[] = ['7 Days', '30 Days', '3 Months', '12 Months'];

export function SalesChart() {
  const [period, setPeriod] = useState<SalesPeriod>('12 Months');
  const data = salesSeries[period];
  const total = data.reduce((sum, point) => sum + point.value, 0);

  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">Sales performance</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            {formatLKR(total)} across the selected period
          </p>
        </div>
        <div className="flex rounded-xl border border-line bg-slate-50 p-1">
          {periods.map((option) =>
          <button
            key={option}
            type="button"
            onClick={() => setPeriod(option)}
            className={classNames(
              'rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors duration-150 ease-smooth',
              period === option ? 'bg-white text-primary-700 shadow-sm' : 'text-ink-muted hover:text-ink'
            )}>
            
              {option}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[...data]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4338ca" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#4338ca" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e6e8ef" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e6e8ef' }}
              tickLine={false} />
            
            <YAxis
              tickFormatter={(value: number) => formatCompactLKR(value)}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={72} />
            
            <Tooltip
              formatter={(value: number) => [formatLKR(value), 'Revenue']}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e6e8ef',
                fontSize: 13,
                boxShadow: '0 12px 32px -12px rgba(17,24,39,0.22)'
              }} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4338ca"
              strokeWidth={2.5}
              fill="url(#salesFill)" />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>);

}