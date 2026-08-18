import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  hideBelow?: 'sm' | 'md' | 'lg';
  width?: string;
}

interface DataTableProps<T> {
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  empty?: React.ReactNode;
}

const hideClass = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell'
};

export function DataTable<T>({ columns, rows, rowKey, caption, empty }: DataTableProps<T>) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="overflow-x-auto sc-scrollbar">
        <table className="w-full min-w-[680px] border-collapse text-left">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-line bg-slate-50/80">
              {columns.map((col) =>
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={[
                'px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted',
                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : '',
                col.hideBelow ? hideClass[col.hideBelow] : ''].

                filter(Boolean).
                join(' ')}>
                
                  {col.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) =>
            <tr
              key={rowKey(row)}
              className="transition-colors duration-150 ease-smooth hover:bg-slate-50/70">
              
                {columns.map((col) =>
              <td
                key={col.key}
                className={[
                'px-5 py-4 text-sm text-ink-soft align-middle',
                col.align === 'right' ?
                'text-right' :
                col.align === 'center' ?
                'text-center' :
                '',
                col.hideBelow ? hideClass[col.hideBelow] : ''].

                filter(Boolean).
                join(' ')}>
                
                    {col.render(row)}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}