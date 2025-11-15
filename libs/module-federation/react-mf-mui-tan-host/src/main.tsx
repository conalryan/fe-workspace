import { light } from '@conalryan/react-mf-mui-core/foundations';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from '@tanstack/react-router';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { router } from './router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={light}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
