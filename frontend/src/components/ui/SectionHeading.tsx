import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, action, align = 'left' }: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-[32px]">{title}</h2>
        {subtitle && <p className="mt-2.5 text-[15px] text-ink-soft">{subtitle}</p>}
      </div>);

  }

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-ink sm:text-[30px]">{title}</h2>
        {subtitle && <p className="mt-2 text-[15px] text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>);

}