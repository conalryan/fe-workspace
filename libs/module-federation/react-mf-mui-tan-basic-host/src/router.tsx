import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import { RemoteAppWrapper } from './RemoteAppWrapper';
import { Root } from './Root';

const rootRoute = createRootRoute({
  component: Root
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

const fooRoute = createRoute({
  component: RemoteAppWrapper,
  getParentRoute: () => rootRoute,
  path: '/feat/$',
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  fooRoute,
]);

export const router = createRouter({
  context: {},
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  routeTree,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
