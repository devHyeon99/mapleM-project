import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { RequiredProfileRoute } from '@/components/router/RequiredProfileRoute';
import { PublicOnlyRoute } from '@/components/router/PublicOnlyRoute';
import { ROUTES } from '@/constants/routes';
import HomePage from '@/pages/Home/HomePage';

const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'));
const AccountManagerPage = lazy(
  () => import('@/pages/Account/AccountManagerPage')
);
const NotFoundPage = lazy(() =>
  Promise.resolve({
    default: () => <div>404 - 페이지를 찾을 수 없습니다.</div>,
  })
);

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />

      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path={ROUTES.ACCOUNT}
        element={
          <RequiredProfileRoute>
            <AccountManagerPage />
          </RequiredProfileRoute>
        }
      />

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
};
