import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { NotificationDropdown } from './NotificationDropdown';
import { useStore } from '../../contexts/StoreContext';

export function AdminLayout() {
  const { unreadCount, user } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-full w-full bg-canvas">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <AdminSidebar />
      </aside>

      <AnimatePresence>
        {mobileOpen &&
        <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setMobileOpen(false)} />
          
            <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-y-0 left-0 w-[84vw] max-w-xs">
            
              <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open admin menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft hover:bg-slate-100 lg:hidden">
              
              <MenuIcon className="h-5 w-5" />
            </button>

            <div className="relative hidden max-w-md flex-1 md:block">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                aria-label="Search the admin console"
                placeholder="Search orders, products, customers…"
                className="h-10 w-full rounded-xl border border-line bg-slate-50 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100" />
              
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen((o) => !o)}
                  aria-label={`Notifications, ${unreadCount} unread`}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-100">
                  
                  <BellIcon className="h-5 w-5" />
                  {unreadCount > 0 &&
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  }
                </button>
                <AnimatePresence>{notifOpen && <NotificationDropdown dark />}</AnimatePresence>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-line px-2 py-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
                  {user?.avatarInitials ?? 'IS'}
                </span>
                <span className="hidden text-[13px] font-semibold text-ink sm:block">
                  {user ? `${user.firstName} ${user.lastName}` : 'Isuru Senarath'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>);

}