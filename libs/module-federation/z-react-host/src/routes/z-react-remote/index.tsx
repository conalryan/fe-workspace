import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';

import { rootRoute } from '../rootRoute';

const ZReactRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('zReactRemote/App'),
);

export const zReactRemoteRoute = createRoute({
  component: ZReactRemote,
  getParentRoute: () => rootRoute,
  path: 'z-react-remote',
});

export default zReactRemoteRoute;