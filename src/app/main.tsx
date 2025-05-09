import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import { App } from './App';
import '@/styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element with id "root" not found in DOM');
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
