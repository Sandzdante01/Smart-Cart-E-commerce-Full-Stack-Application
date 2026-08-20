import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { EmptyState } from '../ui/EmptyState';

export function ProtectedRoute({ role }: {role?: 'customer' | 'admin';}) {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role && user.role !== role) {
    return (
      <div className="mx-auto max-w-shell px-6 py-24">
        <EmptyState
          icon={<LockIcon className="h-6 w-6" />}
          title="You don't have access to this area"
          message="This section is reserved for SmartCart administrators. Sign in with an administrator account to continue."
          actionLabel="Back to store"
          actionTo="/" />
        
      </div>);

  }

  return <Outlet />;
}