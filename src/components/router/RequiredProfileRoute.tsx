import { JSX } from 'react';
import { Navigate } from 'react-router';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuthStore } from '@/store/useAuthStore';

export const RequiredProfileRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isLoading, session, profile } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <Navigate to='/login' replace />;
  }

  if (session && (!profile || !profile.nickname)) {
    return <Navigate to='/' replace />;
  }

  return children;
};
