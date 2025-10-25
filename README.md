# FE Workspace

`pnpm init`

```bash
echo "packages:\n
  - './libs/*' >> pnpm-workspace.yaml`
```

## [React Basic App](libs/react-basic-app/README.md)

## [React MUI App](libs/react-mui-app/README.md)

## [React Tan App](libs/react-tan-app/README.md)

## [React MUI Tan App](libs/react-mui-tan-app/README.md)

## [Module Federation](libs/module-federation/README.md)

## Lerna + Nx

`pnpm dlx lerna init`

`pnpm dlx lerna add-caching`

`lerna run build --parallel`

`lerna run dev --parallel`