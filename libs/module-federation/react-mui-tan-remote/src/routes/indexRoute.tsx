import { createRoute, Navigate } from '@tanstack/react-router';

import { rootRoute } from './rootRoute';

export const indexRoute = createRoute({
  component: () => <Navigate to="/hello-world" />,
  getParentRoute: () => rootRoute,
  path: '/',
});
