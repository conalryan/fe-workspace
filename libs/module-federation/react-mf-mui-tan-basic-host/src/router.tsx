import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { lazy } from 'react';

import { Root } from './Root';

const rootRoute = createRootRoute({
  component: Root
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

const BasicApp = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicRemote/BasicApp'),
);

const fooRoute = createRoute({
  component: BasicApp,
  getParentRoute: () => rootRoute,
  path: '/foo',
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
