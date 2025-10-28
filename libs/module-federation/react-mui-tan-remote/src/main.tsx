import { light } from '@conalryan/react-mui-core-mf/foundations';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import { queryClient } from './queries/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={light}>
        <CssBaseline enableColorScheme />
        {/* <RouterProvider router={router} /> */}
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
