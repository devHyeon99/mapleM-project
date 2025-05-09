import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const LazyLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};
