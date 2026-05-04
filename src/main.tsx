import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import './index.css';

import PublicRouter from './router/PublicRouter.tsx';
import { AuthProvider } from './core/AuthContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <PublicRouter />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
