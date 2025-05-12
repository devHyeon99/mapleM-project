import { PropsWithChildren, useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { checkAndResetTasks } from '@/utils/taskUtils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          (error as { status?: number }).status === 404
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    checkAndResetTasks();
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <TooltipProvider>
            <Toaster richColors visibleToasts={1} position='top-center' />
            {children}
          </TooltipProvider>
        </ThemeProvider>
        {import.meta.env.MODE === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </BrowserRouter>
  );
}
