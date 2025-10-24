import { Todos } from '@/Todos';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../root';

export const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'todos',
  component: Todos,
});
