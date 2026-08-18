import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3Icon,
  LayersIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MessageSquareIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  UsersIcon,
  XIcon } from
'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { classNames } from '../../utils/format';

const items = [
{ label: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon, end: true },
{ label: 'Products', to: '/admin/products', icon: PackageIcon },
{ label: 'Categories', to: '/admin/categories', icon: LayersIcon },
{ label: 'Orders', to: '/admin/orders', icon: ShoppingCartIcon },
{ label: 'Customers', to: '/admin/customers', icon: UsersIcon },
{ label: 'Reviews', to: '/admin/reviews', icon: MessageSquareIcon },
{ label: 'Analytics', to: '/admin/analytics', icon: BarChart3Icon },
{ label: 'Settings', to: '/admin/settings', icon: SettingsIcon }];


export function AdminSidebar({ onNavigate }: {onNavigate?: () => void;}) {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-[#0f1420] text-slate-300">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
            <ShoppingBagIcon className="h-[18px] w-[18px]" />
          </span>
          <span className="leading-tight">
            <span className="block text-[17px] font-extrabold tracking-tight text-white">
              SmartCart
            </span>
            <span className="block text-[11px] font-medium text-slate-500">Admin Console</span>
          </span>
        </div>
        {onNavigate &&
        <button
          type="button"
          onClick={onNavigate}
          aria-label="Close menu"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden">
          
            <XIcon className="h-5 w-5" />
          </button>
        }
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 sc-hide-scrollbar" aria-label="Admin">
        {items.map(({ label, to, icon: Icon, end }) =>
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
          classNames(
            'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-150 ease-smooth',
            isActive ?
            'bg-primary-600 text-white' :
            'text-slate-400 hover:bg-white/5 hover:text-white'
          )
          }>
          
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        )}
      </nav>

      <div className="border-t border-white/10 p-3">
        <NavLink
          to="/"
          className="mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-400 transition-colors duration-150 ease-smooth hover:bg-white/5 hover:text-white">
          
          <StoreIcon className="h-[18px] w-[18px]" />
          View Storefront
        </NavLink>
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-[12px] font-bold text-white">
            {user?.avatarInitials ?? 'IS'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-bold text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'Isuru Senarath'}
            </p>
            <p className="truncate text-[11px] text-slate-500">Administrator</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            aria-label="Logout"
            className="rounded-lg p-2 text-slate-400 transition-colors duration-150 ease-smooth hover:bg-danger-500/15 hover:text-danger-500">
            
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>);

}