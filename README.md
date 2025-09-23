# PNPM Workspace

`pnpm init`

```bash
echo "packages:\n
  - './packages/*' >> pnpm-workspace.yaml`
```

## React app

`pnpm create vite packages/basic-react-app --template react-ts`

`pnpm i`

`pnpm --filter basic-react-app dev`