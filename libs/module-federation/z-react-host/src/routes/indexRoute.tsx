import { createRoute, Navigate } from '@tanstack/react-router';

import { rootRoute } from './rootRoute';

export const indexRoute = createRoute({
  component: () => <Navigate to="/z-react-remote" />,
  getParentRoute: () => rootRoute,
  path: '/',
});
