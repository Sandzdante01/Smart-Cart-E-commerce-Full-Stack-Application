import React from 'react';
import { classNames } from '../../utils/format';

export function Skeleton({ className }: {className?: string;}) {
  return <div className={classNames('sc-skeleton rounded-lg', className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-white p-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2 px-1 pb-1 pt-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>);

}

export function ProductGridSkeleton({ count = 8 }: {count?: number;}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) =>
      <ProductCardSkeleton key={i} />
      )}
    </div>);

}

export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>);

}

export function TableSkeleton({ rows = 5, cols = 5 }: {rows?: number;cols?: number;}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="border-b border-line bg-slate-50 px-5 py-3">
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="divide-y divide-line">
        {Array.from({ length: rows }).map((_, r) =>
        <div key={r} className="flex items-center gap-4 px-5 py-4">
            {Array.from({ length: cols }).map((_, c) =>
          <Skeleton key={c} className={c === 0 ? 'h-4 w-40' : 'h-3 flex-1'} />
          )}
          </div>
        )}
      </div>
    </div>);

}

export function StatCardSkeleton({ count = 4 }: {count?: number;}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) =>
      <div key={i} className="rounded-2xl border border-line bg-white p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-7 w-32" />
          <Skeleton className="mt-3 h-3 w-20" />
        </div>
      )}
    </div>);

}