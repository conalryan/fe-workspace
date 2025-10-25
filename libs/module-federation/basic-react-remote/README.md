# Basic React Remote

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
        './App': './src/App.tsx',
        './MuiButton': './src/components/MuiButton.tsx',
      },
      filename: 'basicReactRemoteEntry.js',
      name: 'basicReactRemote',
      remotes: {
        basicReactHost: {
          entry: 'http://localhost:3200/basicReactHostEntry.js',
          entryGlobalName: 'basicReactHost',
          name: 'basicReactHost',
          shareScope: 'default',
          type: 'module',
        }
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
const SharedComponent = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicReactHost/SharedComponent'),
  // Example of how to import a named export instead of default export
  // const TheComponent = lazy(
  //   async () => {
  //     // @ts-expect-error Module federation remote import not recognized by TypeScript
  //     const { SharedComponent } = await import('basicReactHost/SharedComponent');
  //     return { default: SharedComponent };
  //   },
  // );
);
```
