import { helloWorldRoute } from './hello-world';
import { indexRoute } from './indexRoute';
import { rootRoute } from './rootRoute';
import { todosRoute } from './todos';

export const routeTree = rootRoute.addChildren([indexRoute, helloWorldRoute, todosRoute]);
