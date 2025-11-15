import { createRoute, Navigate } from '@tanstack/react-router';

import { rootRoute } from './rootRoute';

export const indexRoute = createRoute({
  component: () => <Navigate to="/react-mf-mui-tan-remote" />,
  getParentRoute: () => rootRoute,
  path: '/',
});
