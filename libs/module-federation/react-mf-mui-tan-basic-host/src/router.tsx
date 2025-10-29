import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import { Root } from './Root';

const rootRoute = createRootRoute({
  component: Root
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

const fooRoute = createRoute({
  component: () => <div>Foo here...</div>,
  getParentRoute: () => rootRoute,
  path: '/foo',
});

const barRoute = createRoute({
  component: () => <div>Bar here...</div>,
  getParentRoute: () => rootRoute,
  path: '/bar',
});


export const routeTree = rootRoute.addChildren([
  indexRoute,
  fooRoute,
  barRoute,
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
