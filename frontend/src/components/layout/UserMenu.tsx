import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon } from
'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const links = [
{ label: 'My Profile', to: '/account/profile', icon: UserIcon },
{ label: 'My Orders', to: '/account/orders', icon: PackageIcon },
{ label: 'Wishlist', to: '/wishlist', icon: HeartIcon },
{ label: 'Settings', to: '/account/settings', icon: SettingsIcon }];


export function UserMenu({ onClose }: {onClose: () => void;}) {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
      
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
          {user.avatarInitials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate text-[12px] text-ink-muted">{user.email}</p>
        </div>
      </div>

      <nav className="py-1.5">
        {user.role === 'admin' &&
        <Link
          to="/admin"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors duration-150 ease-smooth hover:bg-primary-50">
          
            <LayoutDashboardIcon className="h-4 w-4" />
            Admin Dashboard
          </Link>
        }
        {user.role === 'customer' &&
        <Link
          to="/account"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50 hover:text-ink">
          
            <LayoutDashboardIcon className="h-4 w-4" />
            Account Overview
          </Link>
        }
        {links.map(({ label, to, icon: Icon }) =>
        <Link
          key={to}
          to={to}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-150 ease-smooth hover:bg-slate-50 hover:text-ink">
          
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )}
      </nav>

      <div className="border-t border-line p-1.5">
        <button
          type="button"
          onClick={() => {
            logout();
            onClose();
            navigate('/');
          }}
          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-semibold text-danger-600 transition-colors duration-150 ease-smooth hover:bg-danger-50">
          
          <LogOutIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </motion.div>);

}