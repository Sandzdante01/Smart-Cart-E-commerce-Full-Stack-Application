export function formatLKR(value: number): string {
  return `Rs. ${Math.round(value).toLocaleString('en-US')}`;
}

export function formatCompactLKR(value: number): string {
  if (value >= 1_000_000) return `Rs. ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `Rs. ${Math.round(value / 1_000)}K`;
  return `Rs. ${value}`;
}

export function discountPercent(price: number, original: number): number {
  if (!original || original <= price) return 0;
  return Math.round((original - price) / original * 100);
}

export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function slugify(value: string): string {
  return value.
  toLowerCase().
  replace(/[^a-z0-9]+/g, '-').
  replace(/(^-|-$)/g, '');
}