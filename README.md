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

## [Lit Notes](libs/lit-notes/README.md)

## Lerna + Nx

`pnpm dlx lerna init`

`pnpm dlx lerna add-caching`

`lerna run build --parallel`

`lerna run dev --parallel`

### Common Lerna Commands

1. Run commands across all packages
```bash
# Run a script in parallel across all packages
lerna run build --parallel

# Run a script in all packages (sequentially)
lerna run test

# Run a script with streaming output
lerna run dev --parallel --stream
```

2. Run commands on specific packages
```bash
# Run on packages that match a pattern
lerna run build --scope="react-*"

# Run on a specific package
lerna run dev --scope=react-mui-tan-host

# Exclude certain packages
lerna run build --ignore=react-basic-app
```

3. For your module federation setup specifically
```bash
# Run both module federation apps
lerna run dev --parallel --scope=react-mui-tan-host --scope=react-mui-tan-remote

# Or using pattern matching
lerna run dev --parallel --scope="react-mui-tan-*"
```

4. Other useful Lerna commands
```bash
# List all packages
lerna list

# Show package dependency graph
lerna list --graph

# Run commands only on changed packages
lerna run test --since HEAD~1

# Bootstrap (install dependencies for all packages)
lerna bootstrap
```
-------------------------------------------------------------------------------