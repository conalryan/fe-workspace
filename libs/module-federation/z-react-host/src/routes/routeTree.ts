
import { indexRoute } from './indexRoute';
import { rootRoute } from './rootRoute';
import { zReactRemoteRoute } from './z-react-remote';

export const routeTree = rootRoute.addChildren([indexRoute, zReactRemoteRoute]);
