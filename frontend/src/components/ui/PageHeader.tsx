import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, crumbs = [], action }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto max-w-shell px-6 py-8 lg:py-10">
        {crumbs.length > 0 &&
        <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
              <li>
                <Link to="/" className="hover:text-primary-700">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) =>
            <li key={crumb.label} className="flex items-center gap-1">
                  <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.to ?
              <Link to={crumb.to} className="hover:text-primary-700">
                      {crumb.label}
                    </Link> :

              <span className="font-medium text-ink">{crumb.label}</span>
              }
                </li>
            )}
            </ol>
          </nav>
        }
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-bold text-ink sm:text-[36px]">{title}</h1>
            {subtitle && <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">{subtitle}</p>}
          </div>
          {action}
        </div>
      </div>
    </div>);

}