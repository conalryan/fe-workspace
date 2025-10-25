import { createRoute } from '@tanstack/react-router';

import { rootRoute } from '../rootRoute';

export const helloWorldRoute = createRoute({
  component: () => <h1>hello world</h1>,
  getParentRoute: () => rootRoute,
  path: 'hello-world',
});
