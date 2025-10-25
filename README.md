# FE Workspace

`pnpm init`

```bash
echo "packages:\n
  - './libs/*' >> pnpm-workspace.yaml`
```

## [Basic React App](libs/basic-react-app/README.md)

## [MUI React App](libs/mui-react-app/README.md)

## [Tanstack React App](libs/tanstack-react-app/README.md)

## [z-react app](libs/z-react-app/README.md)

## [Module Federation](libs/module-federation/README.md)

## Lerna + Nx

`pnpm dlx lerna init`

`pnpm dlx lerna add-caching`

`lerna run build --parallel`

`lerna run dev --parallel`