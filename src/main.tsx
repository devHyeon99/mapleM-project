import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AccountDetail } from '@/components/AccountDetail/AccountDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.tsx';
import Test from './Test.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <Toaster visibleToasts={1} position='top-center' />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/account/:id' element={<AccountDetail />} />
            <Route path='/test' element={<Test />} />
            <Route
              path='*'
              element={<div>404 - 페이지를 찾을 수 없습니다.</div>}
            />
          </Routes>
        </ThemeProvider>
        {import.meta.env.MODE === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
