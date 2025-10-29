import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    federation({
      exposes: {
        './BasicApp': './src/App.tsx',
      },
      filename: 'basicRemoteEntry.js',
      name: 'basicRemote',
      remotes: {},
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
