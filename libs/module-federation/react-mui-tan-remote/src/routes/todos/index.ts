import { createRoute } from '@tanstack/react-router';

import { Todos } from '../../features/Todos';
import { rootRoute } from '../rootRoute';

export const todosRoute = createRoute({
  component: Todos,
  getParentRoute: () => rootRoute,
  path: '/todos',
});
