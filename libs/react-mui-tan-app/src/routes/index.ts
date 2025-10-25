import { rootRoute } from './root';
import { todosRoute } from './todos';

export const routeTree = rootRoute.addChildren([todosRoute]);
