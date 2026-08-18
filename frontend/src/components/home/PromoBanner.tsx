import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="bg-primary-700">
      <div className="mx-auto flex max-w-shell flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="inline-flex w-fit items-center rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            Limited Time Offer
          </span>
          <p className="text-lg font-bold text-white sm:text-xl">
            Up to 30% Off Selected Electronics
          </p>
        </div>
        <Link
          to="/deals"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-primary-700 transition-[background-color,transform] duration-200 ease-smooth hover:bg-primary-50 active:scale-[0.98]">
          
          View Deals
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>);

}