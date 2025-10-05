import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router.tsx';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

describe('App', () => {
  test('renders', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Create a memory history and navigate to the todos route
    const memoryHistory = createMemoryHistory({
      initialEntries: ['/todos'],
    });

    // Update the router to use the memory history
    router.update({
      history: memoryHistory,
    });

    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>,
    );

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getByText('MUI React App')).toBeDefined();
    });
  });
});
