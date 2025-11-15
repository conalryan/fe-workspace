import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';

import { rootRoute } from '../rootRoute';

const reactMuiTanRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('reactMuiTanRemote/App'),
);

export const reactMuiTanRemoteRoute = createRoute({
  component: reactMuiTanRemote,
  getParentRoute: () => rootRoute,
  path: '/react-mf-mui-tan-remote',
});

export default reactMuiTanRemoteRoute;