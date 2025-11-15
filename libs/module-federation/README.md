# Module Federation

## [React MUI Tan Host](./react-mf-mui-tan-host/README.md)

## [React MUI Tan Remote](./react-mf-mui-tan-remote/README.md)

### Errors with current router setup

**Navigate to** http://localhost:4100/react-mf-mui-tan-remote

Error
```bash
App.tsx:56 Error: Invariant failed: Could not find parent match for matchId "undefined"
    at invariant (@tanstack_react-rout…s?v=dbd6ad26:1006:9)
    at Object.select (@tanstack_react-rout…s?v=dbd6ad26:6702:7)
    at @tanstack_react-rout…?v=dbd6ad26:5481:16
    at memoizedSelector (@tanstack_react-rout…s?v=dbd6ad26:115:32)
    at @tanstack_react-rout…s?v=dbd6ad26:135:24
    at mountSyncExternalStore (react-dom_client.js?v=00137419:4552:26)
    at Object.useSyncExternalStore (react-dom_client.js?v=00137419:16564:18)
    at exports.useSyncExternalStore (__mf__virtual_reactM…s?v=dbd6ad26:933:36)
    at exports.useSyncExternalStoreWithSelector (@tanstack_react-rout…s?v=dbd6ad26:144:21)
    at useStore (@tanstack_react-rout…?v=dbd6ad26:5388:75)
```

**Navigate to** http://localhost:4100/react-mf-mui-tan-remote/hello

AppBar loads but the remote does not; shows "Not Found"

**Navigate to** http://localhost:4101/hello-world

Remote app displays correctly

**Navigate to** http://localhost:4101/todos

Remote app displays correctly

## Router Integration

Q: Are you required to use the same router with React Module Federation?

Dia: Short answer: No.

You don’t have to use the same router across federated React apps. Module Federation only cares about how modules are exposed/consumed at runtime—it’s agnostic to your routing solution. However, there are some practical considerations:
 • If you want consistent URL behavior and client-side navigation between host and remotes, using the same router (and version) can simplify things.
 • Mixed routers can work, but you need a clear boundary: the host typically owns top-level routes, and remotes render within a route outlet. Inside a remote, you can use its own router (or no router) as long as it doesn’t try to control the top-level history.
 • Watch for history conflicts: multiple routers managing the same history object can cause double-handling of navigation events. Prefer a single “source of truth” for top-level navigation (usually the host).
 • If you must mix, isolate: render remotes as components that don’t attach global listeners or mutate the host’s history. Pass down navigation APIs if needed.
 • Keep versions aligned if you share routing state or components, e.g., react-router v6 across host/remote. Version mismatches can lead to subtle bugs.

Common patterns:
 • Host controls routes, remotes are route elements: Host uses react-router (or Next.js routing), and loads remote components for specific paths.
 • Remote self-contained widget: Remote uses its own router internally but never changes the host’s URL, or uses hash routing to avoid interfering with the host.

If you share links or want seamless transitions, standardize on one router and history. If you’re embedding independent widgets, separate routers are fine.

### Tanstack Router + Vite Integration

Below is a minimal, working setup to use TanStack Router with Vite Module Federation (vite-plugin-federation). The pattern is:
 • The host owns the top-level TanStack Router instance.
 • Each remote exposes route components (and optionally route definitions) that the host lazy-loads.
 • Keep router state/history controlled by the host. Remotes should export plain React components (no own router instances) unless they’re fully isolated widgets.

Plan
 1. Install dependencies and configure Vite Module Federation in host and remote.
 2. In the remote, expose route components (and optional route meta) via federation.
 3. In the host, create a TanStack Router with lazy routes that import remote components via federation module names.
 4. Handle typings and route params, ensure consistent React version and shared deps.

Host app (Vite + React + TanStack Router v1+)
 • vite.config.ts
```typescript
// filename: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // Key is the import name used in code, value is the remote URL entry
        remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@tanstack/react-router': { singleton: true, requiredVersion: '^1.0.0' },
      },
    }),
  ],
  server: {
    port: 5000,
  },
});
```
￼
 • main.tsx
```typescript
// filename: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

const rootEl = document.getElementById('root')!;
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
￼
 • router.tsx
```typescript
// filename: src/router.tsx
import React, { Suspense } from 'react';
import {
  createRouter,
  Router,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';

// Host routes
const rootRoute = createRootRoute({
  component: () => (
    <div style={{ padding: 16 }}>
      <h1>Host Shell</h1>
      <nav style={{ display: 'flex', gap: 12 }}>
        <a href="/">Home</a>
        <a href="/remote">Remote</a>
        <a href="/remote/user/42">Remote User</a>
      </nav>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  ),
});

const Outlet = rootRoute.useOutlet();

// Local host component
function Home() {
  return <div>Host Home</div>;
}

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Remote-fed routes:
// We lazy import remote components by their federated import specifier.
// vite-plugin-federation supports dynamic import('remoteApp/Module').
const RemotePage = React.lazy(() => import('remoteApp/RemotePage'));
const RemoteUserPage = React.lazy(() => import('remoteApp/RemoteUserPage'));

const remoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote',
  component: () => <RemotePage />,
});

const remoteUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote/user/$userId',
  component: () => <RemoteUserPage />,
});

const routeTree = rootRoute.addChildren([homeRoute, remoteRoute, remoteUserRoute]);

export const router: Router = createRouter({
  routeTree,
  defaultPreload: 'intent', // optional: good DX
});

// Type safety (optional in v1+)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```
￼
Remote app (Vite + React)
 • vite.config.ts
```typescript
// filename: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './RemotePage': './src/RemotePage.tsx',
        './RemoteUserPage': './src/RemoteUserPage.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@tanstack/react-router': { singleton: true, requiredVersion: '^1.0.0' },
      },
    }),
  ],
  build: {
    target: 'esnext', // required for federation dynamic imports
    minify: false, // helpful in dev
  },
  server: {
    port: 5001,
  },
});
```
￼
 • RemotePage.tsx
```typescript
// filename: src/RemotePage.tsx
import React from 'react';

/**
 * Federated component rendered at host route /remote
 * Keep it a plain React component. Do not create its own RouterProvider.
 */
export default function RemotePage() {
  return (
    <div>
      <h2>Remote Page</h2>
      <p>This component is loaded from the remote app.</p>
    </div>
  );
}
```
￼
 • RemoteUserPage.tsx
```typescript
// filename: src/RemoteUserPage.tsx
import React from 'react';
import { useParams } from '@tanstack/react-router';

/**
 * Federated component for a param route rendered by host at /remote/user/$userId
 * It relies on the host's RouterProvider, so we can use @tanstack/react-router hooks.
 */
export default function RemoteUserPage() {
  const { userId } = useParams({ from: '/remote/user/$userId' });
  return (
    <div>
      <h2>Remote User</h2>
      <p>Viewing user: {userId}</p>
    </div>
  );
}
```

Key considerations
 • Single RouterProvider: Only the host mounts RouterProvider. Remotes export components that assume an existing TanStack Router context.
 • Shared singletons: Configure shared for react, react-dom, @tanstack/react-router to avoid version mismatches and duplicate contexts.
 • Type-safe params in remotes: When remotes use router hooks, reference the host route path template in useParams (string literal must match host path).
 • Preloading: You can preload remote chunks on hover via defaultPreload or define route-level preload.
 • Error boundaries and Suspense: Wrap remote routes in Suspense and optionally define error components for resilience.

Optional: Remote-defined routes
If you want remotes to define their own route configs and pass them to the host, expose factory functions from remotes and add them in the host.

Remote
 • routes.ts
```typescript
// filename: src/routes.ts
import { createRoute } from '@tanstack/react-router';

export function createRemoteRoutes(rootRoute: ReturnType<typeof import('@tanstack/react-router').createRootRoute>) {
  const RemotePage = (await import('./RemotePage')).default; // if you want internal lazy
  const RemoteUserPage = (await import('./RemoteUserPage')).default;

  const remoteRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/remote',
    component: RemotePage,
  });

  const remoteUserRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/remote/user/$userId',
    component: RemoteUserPage,
  });

  return [remoteRoute, remoteUserRoute];
}
```
￼
Expose it:￼

Host usage:￼

This adds dynamism but be mindful of types and async timing; typically you’ll statically declare route paths in the host and only lazy-load components from remotes.

Troubleshooting
 • “Module not found: remoteApp/…”: Ensure remote server is running and host federation remotes points to the remoteEntry.js with correct port and path.
 • “Multiple React detected”: Verify shared singleton config and that both apps use the same React version.
 • Router hooks undefined or crash: The remote must render under the host’s RouterProvider, and the shared @tanstack/react-router must be singleton.
 • HMR in dev: vite-plugin-federation has limited HMR across hosts/remotes; restart as needed, or use static linkage during development.

Assumptions: You’re on React 18, TanStack Router v1+, Vite 5+, vite-plugin-federation by @originjs. If your versions differ, share them and I’ll adjust the config.

#### Mismatched TanStack Router versions often create multiple contexts, causing hooks and navigation to break.

When the host and a remote load different versions of @tanstack/react-router, Module Federation may instantiate separate copies at runtime. Because TanStack Router relies on React context, having two distinct packages means components from a remote can attach to a different router context than the host. The result is subtle, hard-to-debug failures.

Why version mismatches break things ￼
 • Duplicate router contexts: Each copy ships its own context symbols. A remote’s ‎`useRouter`/‎`useParams` may read a different context than the host, so state and navigation don’t sync.
 • Hook invariants: Hooks expect to be under the same RouterProvider instance; mismatched packages can yield “not mounted” style failures, undefined values, or stale state.
 • Type/runtime drift: Even if TypeScript compiles, runtime contracts (route tree shape, preload behavior, loader APIs) can diverge across versions, producing edge-case bugs during navigation, preloading, or data loading.
 • Shared utilities mismatch: Link components, loaders, and error boundaries from different versions may not interoperate cleanly.

Typical symptoms ￼
 • Navigation doesn’t update the UI or updates in only the host or only the remote.
 • Params or search state appear undefined/stale inside remote components.
 • Preloading, loaders, or error boundaries misfire under federated routes.
 • Multiple React detected-like issues if peer dependencies diverge, compounding router context problems.

When it can still work ￼

Minor/patch differences that don’t change context internals or public contracts may work, but this is fragile. As soon as either side changes context keys or hook behavior, interoperability breaks.

Preventing issues (recommended setup) ￼
 • Share as singletons: Force a single instance of React, React DOM, and TanStack Router across host and remotes.
 • Align versions: Pin the same major/minor for the router everywhere. Prefer exact or tight ranges to avoid accidental drift.
 • Host owns RouterProvider: Remotes export plain components; they do not mount their own RouterProvider.

Example federation shared config (React 19):￼
```typescript
shared: {
  react: { singleton: true, requiredVersion: '^19.0.0', strictVersion: false },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0', strictVersion: false },
  '@tanstack/react-router': { singleton: true, requiredVersion: '^1.0.0', strictVersion: false },
}
```

Version strategy ￼
 • Development: strictVersion false (with tight ranges) to avoid hard breaks, but keep lockfiles aligned.
 • Production: consider strictVersion true once host/remote are guaranteed to deploy in lockstep; otherwise fail fast on drift.
 • Deploy discipline: treat router version as a platform dependency; update host and remotes together and verify federation uses only one resolved copy at runtime.

Since you’re on React 19, ensure both host and remotes share React/DOM as singletons and that the TanStack Router version is identical; React context is stable, but mismatched router packages will still split the context and break hooks.