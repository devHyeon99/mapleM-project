import { Routes, Route } from 'react-router';
import { AccountManagerPage } from '@/pages/Account/AccountManagerPage';
import { LoginPage } from '@/pages/Auth/Login/LoginPage';
import HomePage from '@/pages/Home/HomePage';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountManagerPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
};
