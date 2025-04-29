import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface RequireAccountRouteProps {
  children: React.ReactNode;
}

export const RequireAccountRoute = ({ children }: RequireAccountRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('account-data-storage');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const currentAccountId = parsed?.state?.currentAccountId;

        if (!currentAccountId) {
          navigate('/', { replace: true });
        }
      } catch (e) {
        navigate('/', { replace: true });
        console.log(e);
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
};
