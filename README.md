# FE Workspace

`pnpm init`

```bash
echo "packages:\n
  - './libs/*' >> pnpm-workspace.yaml`
```

## [Basic React App](libs/basic-react-app/README.md)

## [MUI React App](libs/mui-react-app/README.md)

## Tanstack router
`pnpx create-tsrouter-app@latest libs/tanstack-react-app --template typescript`

`pnpm --filter tanstack-react-app dev`

## Tanstack query

`pnpm --filter tanstack-react-app add @tanstack/react-query @tanstack/react-query-devtools`

## z-react app

MUI, tanstack-router and tanstack-query

`pnpm --filter z-react-app dev`

## Lerna + Nx

`pnpm dlx lerna init`

`pnpm dlx lerna add-caching`

## Module Federation

`pnpm create vite libs/module-federation/basic-react-host --template react-ts`

`pnpm create vite libs/module-federation/basic-react-remote --template react-ts`

`pnpm -F basic-react-host add -D @module-federation/vite`

`pnpm -F basic-react-remote add -D @module-federation/vite`

### Add MUI to Host
`pnpm -F basic-react-host add @mui/material @emotion/react @emotion/styled`

`pnpm -F basic-react-host add @fontsource/roboto`
```css
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

`pnpm -F basic-react-host add @mui/icons-material`

