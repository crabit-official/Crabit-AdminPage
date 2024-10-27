import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import AuthProvider from '@hooks/AuthProvider.tsx';
import globalStyles from '@styles/globalStyles.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.tsx';

import './index.css';

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={client}>
      {import.meta.env.MODE === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
