
import { indexRoute } from './indexRoute';
import { reactMuiTanRemoteRoute } from './react-mui-tan-remote';
import { rootRoute } from './rootRoute';

export const routeTree = rootRoute.addChildren([indexRoute, reactMuiTanRemoteRoute]);
