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

## Module Federation Configuration
vite.confit.ts
```typescript
export default defineConfig({
  plugins: [
    federation({
      exposes: {
        './SharedComponent': './src/components/SharedComponent.tsx',
      },
      filename: 'basicReactHostEntry.js',
      name: 'basicReactHost',
      remotes: {
        basicReactRemote: {
          entry: 'http://localhost:3201/basicReactRemoteEntry.js',
          entryGlobalName: 'basicReactRemote',
          name: 'basicReactRemote',
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
const BasicReactRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicReactRemote/App'),
);

const MuiButtonFromRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicReactRemote/MuiButton'),
);
```
