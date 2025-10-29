import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

const rootRoute = createRootRoute();

const featRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feat',
});

const featLandingRoute = createRoute({
  component: () => <div>Feature Landing</div>,
  getParentRoute: () => featRoute,
  path: '/',
});

const featDetailsRoute = createRoute({
  component: () => <div>Feature Details</div>,
  getParentRoute: () => featRoute,
  path: '/details',
});

export const routeTree = rootRoute.addChildren([
  featRoute.addChildren([featLandingRoute, featDetailsRoute]),
]);

export const router = createRouter({
  defaultNotFoundComponent: () => <p>Not found!!</p>,
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
