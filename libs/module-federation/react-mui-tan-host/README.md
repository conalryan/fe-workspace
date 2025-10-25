# Basic React Host

## [MUI Installation](https://mui.com/material-ui/getting-started/installation/)

1. `pnpm add @mui/material @emotion/react @emotion/styled`
2. `pnpm add @fontsource/roboto`
index.css
```css
@import '@fontsource/roboto/300.css';
@import '@fontsource/roboto/400.css';
@import '@fontsource/roboto/500.css';
@import '@fontsource/roboto/700.css';
```
3. `pnpm add @mui/icons-material`

Combined install
`pnpm add @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material`

## [Tanstack Router Installation](https://tanstack.com/router/latest/docs/framework/react/quick-start)

`pnpm -F react-mui-tan-host add @tanstack/react-router`

`pnpm -F react-mui-tan-host add @tanstack/react-router-devtools`

## Tanstack Router Integration

main.tsx
```typescript
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

router.tsx
```typescript
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routes';

export const router = createRouter({
  context: {},
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  routeTree,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

routes/routeTree.tsx
```typescript
import { indexRoute } from './indexRoute';
import { rootRoute } from './rootRoute';
import { reactMuiTanRemoteRoute } from './react-mui-tan-remote';

export const routeTree = rootRoute.addChildren([indexRoute, reactMuiTanRemoteRoute]);
```

routes/root.tsx
```typescript
import { createRootRoute } from '@tanstack/react-router';
import App from '../App';

export const rootRoute = createRootRoute({
  component: App,
});
```

routes/indexroute.tsx
```typescript
import { createRoute, Navigate } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';

export const indexRoute = createRoute({
  component: () => <Navigate to="/react-mui-tan-remote" />,
  getParentRoute: () => rootRoute,
  path: '/',
});
```

routes/react-mui-tan-remote
```typescript
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
  path: 'react-mui-tan-remote',
});

export default reactMuiTanRemoteRoute;
```

## Module Federation Configuration
vite.confit.ts
```typescript
export default defineConfig({
  plugins: [
    federation({
      exposes: {
        './SharedComponent': './src/components/SharedComponent.tsx',
      },
      filename: 'reactMuiTanHostEntry.js',
      name: 'reactMuiTanHost',
      remotes: {
        reactMuiTanRemote: {
          entry: 'http://localhost:4101/reactMuiTanRemoteEntry.js',
          entryGlobalName: 'reactMuiTanRemote',
          name: 'reactMuiTanRemote',
          shareScope: 'default',
          type: 'module',
        },
      },
      shared: {
        '@emotion/react': {
          requiredVersion: dependencies['@emotion/react'],
          singleton: true,
        },
        '@emotion/styled': {
          requiredVersion: dependencies['@emotion/styled'],
          singleton: true,
        },
        '@mui/icons-material': {
          requiredVersion: dependencies['@mui/icons-material'],
          singleton: true,
        },
        '@mui/material': {
          requiredVersion: dependencies['@mui/material'],
          singleton: true,
        },
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion: dependencies['react-dom'],
          singleton: true,
        },
      },
    }),
    react(),
  ],
});
```

## Module Federation Integration
App.tsx
```typescript
const reactMuiTanRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('reactMuiTanRemote/App'),
);

const MuiButtonFromRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('reactMuiTanRemote/MuiButton'),
);
```
