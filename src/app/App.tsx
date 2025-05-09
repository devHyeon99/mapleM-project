import { useAuthInitializer } from '@/hooks/useAuthInitializer';
import { Router } from './router';

export function App() {
  useAuthInitializer();
  return <Router />;
}
