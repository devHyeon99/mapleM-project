import { useAuthStore } from '@/store/useAuthStore';
import { Navigate } from 'react-router';
import { JSX } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (session) {
    return <Navigate to='/' replace />;
  }

  return children;
};
