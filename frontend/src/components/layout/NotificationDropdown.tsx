import { motion } from 'framer-motion';
import { BellIcon, CheckCheckIcon, PackageIcon, TruckIcon, UserPlusIcon, AlertTriangleIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { classNames } from '../../utils/format';

const iconFor = {
  order: PackageIcon,
  stock: AlertTriangleIcon,
  delivery: TruckIcon,
  customer: UserPlusIcon
};

const toneFor = {
  order: 'bg-primary-50 text-primary-600',
  stock: 'bg-warning-50 text-warning-600',
  delivery: 'bg-success-50 text-success-600',
  customer: 'bg-electric-50 text-electric-600'
};

export function NotificationDropdown({ dark = false }: {dark?: boolean;}) {
  const { notifications, markAllRead, unreadCount } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className={classNames(
        'absolute right-0 top-full z-50 mt-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border bg-white shadow-panel',
        dark ? 'border-slate-200' : 'border-line'
      )}>
      
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h3 className="text-sm font-bold text-ink">Notifications</h3>
        {unreadCount > 0 &&
        <button
          type="button"
          onClick={markAllRead}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary-600 hover:text-primary-700">
          
            <CheckCheckIcon className="h-3.5 w-3.5" />
            Mark all read
          </button>
        }
      </div>

      {notifications.length === 0 ?
      <div className="px-6 py-10 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-ink-muted">
            <BellIcon className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-ink">You're all caught up</p>
          <p className="mt-1 text-[13px] text-ink-soft">New activity will appear here.</p>
        </div> :

      <ul className="max-h-80 divide-y divide-line overflow-y-auto sc-scrollbar">
          {notifications.map((n) => {
          const Icon = iconFor[n.type];
          return (
            <li
              key={n.id}
              className={classNames(
                'flex gap-3 px-4 py-3 transition-colors duration-150 ease-smooth hover:bg-slate-50',
                !n.read && 'bg-primary-50/40'
              )}>
              
                <span
                className={classNames(
                  'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                  toneFor[n.type]
                )}>
                
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-ink">{n.message}</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{n.time}</p>
                </div>
                {!n.read && <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />}
              </li>);

        })}
        </ul>
      }
    </motion.div>);

}