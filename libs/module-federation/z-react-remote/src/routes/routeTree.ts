
import { helloWorldRoute } from './hello-world';
import { indexRoute } from './indexRoute';
import { rootRoute } from './rootRoute';

export const routeTree = rootRoute.addChildren([indexRoute, helloWorldRoute]);
