import { createRoute } from '@tanstack/react-router';

import { Todos } from '@/features/Todos';

import { rootRoute } from '../root';

export const todosRoute = createRoute({
  component: Todos,
  getParentRoute: () => rootRoute,
  path: 'todos',
});
