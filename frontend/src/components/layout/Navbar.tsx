import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellIcon,
  HeartIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
  XIcon } from
'lucide-react';
import { Logo } from './Logo';
import { MiniCart } from './MiniCart';
import { UserMenu } from './UserMenu';
import { NotificationDropdown } from './NotificationDropdown';
import { SearchBar } from '../product/SearchBar';
import { Button } from '../ui/Button';
import { useStore } from '../../contexts/StoreContext';
import { company, mainNav } from '../../data/company';
import { classNames } from '../../utils/format';

type Panel = 'cart' | 'user' | 'notifications' | null;

export function Navbar() {
  const { totals, wishlist, user, unreadCount } = useStore();
  const [panel, setPanel] = useState<Panel>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setPanel(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggle = (next: Panel) => setPanel((prev) => prev === next ? null : next);

  const iconButton =
  'relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition-colors duration-150 ease-smooth hover:bg-primary-50 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600';

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden bg-ink text-white lg:block">
        <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-2 text-[12px]">
          <p className="flex items-center gap-2 text-slate-300">
            <TruckIcon className="h-3.5 w-3.5" />
            Free delivery on orders over Rs. 25,000 — island-wide
          </p>
          <div className="flex items-center gap-5 text-slate-300">
            <span className="flex items-center gap-1.5">
              <PhoneIcon className="h-3.5 w-3.5" />
              {company.phone}
            </span>
            <span>{company.hours}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white/95 backdrop-blur">
        <div ref={barRef} className="mx-auto flex max-w-shell items-center gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className={classNames(iconButton, 'lg:hidden')}>
            
            <MenuIcon className="h-5 w-5" />
          </button>

          <Logo />

          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
              classNames(
                'rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ease-smooth',
                isActive ?
                'bg-primary-50 text-primary-700' :
                'text-ink-soft hover:bg-slate-50 hover:text-ink'
              )
              }>
              
                {item.label}
              </NavLink>
            )}
          </nav>

          <div className="ml-auto hidden max-w-sm flex-1 xl:block">
            <SearchBar placeholder="Search products, brands and categories…" />
          </div>

          <div className="ml-auto flex items-center gap-0.5 xl:ml-3">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Search"
              aria-expanded={searchOpen}
              className={classNames(iconButton, 'xl:hidden')}>
              
              <SearchIcon className="h-5 w-5" />
            </button>

            <Link to="/wishlist" aria-label="Wishlist" className={classNames(iconButton, 'hidden sm:flex')}>
              <HeartIcon className="h-5 w-5" />
              {wishlist.length > 0 &&
              <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              }
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => toggle('cart')}
                aria-label={`Cart, ${totals.count} items`}
                aria-expanded={panel === 'cart'}
                className={iconButton}>
                
                <ShoppingCartIcon className="h-5 w-5" />
                {totals.count > 0 &&
                <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                    {totals.count}
                  </span>
                }
              </button>
              <AnimatePresence>{panel === 'cart' && <MiniCart onClose={() => setPanel(null)} />}</AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => toggle('notifications')}
                aria-label={`Notifications, ${unreadCount} unread`}
                aria-expanded={panel === 'notifications'}
                className={iconButton}>
                
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 &&
                <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-warning-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                }
              </button>
              <AnimatePresence>{panel === 'notifications' && <NotificationDropdown />}</AnimatePresence>
            </div>

            {user ?
            <div className="relative ml-1">
                <button
                type="button"
                onClick={() => toggle('user')}
                aria-label="Account menu"
                aria-expanded={panel === 'user'}
                className="flex h-10 items-center gap-2 rounded-xl pl-1 pr-2 transition-colors duration-150 ease-smooth hover:bg-slate-50">
                
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-[12px] font-bold text-white">
                    {user.avatarInitials}
                  </span>
                  <span className="hidden text-sm font-semibold text-ink sm:block">
                    {user.firstName}
                  </span>
                </button>
                <AnimatePresence>{panel === 'user' && <UserMenu onClose={() => setPanel(null)} />}</AnimatePresence>
              </div> :

            <div className="ml-2 hidden items-center gap-2 sm:flex">
                <Button variant="ghost" size="sm" to="/login">
                  Login
                </Button>
                <Button size="sm" to="/register">
                  Register
                </Button>
              </div>
            }

            {!user &&
            <Link to="/login" aria-label="Login" className={classNames(iconButton, 'sm:hidden')}>
                <UserIcon className="h-5 w-5" />
              </Link>
            }
          </div>
        </div>

        <AnimatePresence>
          {searchOpen &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-line xl:hidden">
            
              <div className="mx-auto max-w-shell px-4 py-3 sm:px-6">
                <SearchBar autoFocus onNavigate={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>);

}

function MobileDrawer({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { user, logout, wishlist } = useStore();

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
          className="absolute inset-0 bg-ink/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-y-0 left-0 flex w-[86vw] max-w-xs flex-col bg-white shadow-panel"
          aria-label="Mobile navigation">
          
            <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
              <Logo />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="rounded-lg p-2 text-ink-muted hover:bg-slate-100 hover:text-ink">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 sc-scrollbar">
              {mainNav.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
              classNames(
                'block rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors duration-150 ease-smooth',
                isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-soft hover:bg-slate-50'
              )
              }>
              
                  {item.label}
                </NavLink>
            )}

              <div className="my-3 border-t border-line" />

              <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3.5 py-3 text-[15px] font-semibold text-ink-soft hover:bg-slate-50">
              
                Wishlist
                <span className="rounded-md bg-danger-50 px-2 py-0.5 text-[12px] font-bold text-danger-600">
                  {wishlist.length}
                </span>
              </Link>
              {user?.role === 'admin' &&
            <Link
              to="/admin"
              onClick={onClose}
              className="block rounded-xl px-3.5 py-3 text-[15px] font-semibold text-primary-700 hover:bg-primary-50">
              
                  Admin Dashboard
                </Link>
            }
              {user?.role === 'customer' &&
            <Link
              to="/account"
              onClick={onClose}
              className="block rounded-xl px-3.5 py-3 text-[15px] font-semibold text-ink-soft hover:bg-slate-50">
              
                  My Account
                </Link>
            }
            </nav>

            <div className="border-t border-line p-4">
              {user ?
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                logout();
                onClose();
              }}>
              
                  Logout
                </Button> :

            <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" to="/login">
                    Login
                  </Button>
                  <Button to="/register">Register</Button>
                </div>
            }
            </div>
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}