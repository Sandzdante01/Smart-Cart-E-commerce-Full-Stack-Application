import React from 'react';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFound() {
  return (
    <div className="mx-auto max-w-shell px-6 py-24">
      <EmptyState
        icon={<CompassIcon className="h-6 w-6" />}
        title="Page not found"
        message="The page you're looking for doesn't exist or has moved. Let's get you back to shopping."
        actionLabel="Back to home"
        actionTo="/" />
      
    </div>);

}