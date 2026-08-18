import React from 'react';
import { QuoteIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Rating } from '../ui/Rating';
import { testimonials } from '../../data/reviews';

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="border-y border-line bg-white py-16">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          title="What our customers say"
          subtitle="Real feedback from SmartCart shoppers across Sri Lanka." />
        

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <figure className="flex flex-col rounded-2xl border border-primary-100 bg-primary-50/50 p-7">
            <QuoteIcon className="h-7 w-7 text-primary-300" aria-hidden="true" />
            <blockquote className="mt-4 text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
              “{featured.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {featured.initials}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{featured.name}</span>
                <span className="block text-[13px] text-ink-muted">{featured.role}</span>
              </span>
              <span className="ml-auto">
                <Rating value={featured.rating} showValue={false} />
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-5">
            {rest.map((t) =>
            <figure key={t.id} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <Rating value={t.rating} showValue={false} />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-ink-soft">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-ink">{t.name}</span>
                    <span className="block text-[12px] text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>);

}