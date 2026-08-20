import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapPinIcon,
  MessageSquareIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon } from
'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { classNames } from '../../utils/format';

const links = [
{ label: 'Overview', to: '/account', icon: LayoutDashboardIcon, end: true },
{ label: 'My Profile', to: '/account/profile', icon: UserIcon },
{ label: 'My Orders', to: '/account/orders', icon: PackageIcon },
{ label: 'Wishlist', to: '/wishlist', icon: HeartIcon },
{ label: 'Reviews', to: '/account/reviews', icon: MessageSquareIcon },
{ label: 'Addresses', to: '/account/addresses', icon: MapPinIcon },
{ label: 'Settings', to: '/account/settings', icon: SettingsIcon }];


export function AccountLayout() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-shell px-4 py-8 sm:px-6 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {user?.avatarInitials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="truncate text-[12px] text-ink-muted">{user?.location}</p>
              </div>
            </div>

            <nav className="mt-3 flex gap-1 overflow-x-auto pb-1 sc-hide-scrollbar lg:flex-col lg:overflow-visible">
              {links.map(({ label, to, icon: Icon, end }) =>
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                classNames(
                  'flex flex-shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-150 ease-smooth',
                  isActive ?
                  'bg-primary-50 text-primary-700' :
                  'text-ink-soft hover:bg-slate-50 hover:text-ink'
                )
                }>
                
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex flex-shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-danger-600 transition-colors duration-150 ease-smooth hover:bg-danger-50">
                
                <LogOutIcon className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>);

}