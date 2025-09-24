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

## MUI app

`pnpm create vite packages/mui-react-app --template react-ts`

`pnpm i`

`pnpm --filter mui-react-app dev`

Added MUI Dependencies to package.json:

@mui/material - Core MUI components
@emotion/react and @emotion/styled - Required for MUI styling
@mui/icons-material - Material Design icons
Updated App.tsx with MUI components:

Added MUI imports for various components (Container, Typography, Button, Card, etc.)
Replaced the basic HTML elements with MUI components
Added Material Design icons (Add/Remove) for the counter buttons
Improved the layout with proper spacing and styling
Updated main.tsx with MUI theme provider:

Added ThemeProvider for consistent theming
Added CssBaseline for better default styling
Created a basic light theme
Installed all dependencies using pnpm

🚀 What You Get:
A beautiful Material Design interface
Responsive layout with Container and proper spacing
App bar with title
Card-based counter component with styled buttons and icons
Consistent typography and theming
Better accessibility and user experience


## Tanstack router
`pnpx create-tsrouter-app@latest packages/tanstack-react-app --template typescript`

`pnpm --filter tanstack-react-app dev`