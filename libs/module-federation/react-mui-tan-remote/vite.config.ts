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
        './App': './src/App.tsx',
        './MuiButton': './src/components/MuiButton.tsx',
      },
      filename: 'reactMuiTanRemoteEntry.js',
      name: 'reactMuiTanRemote',
      remotes: {
        reactMuiTanHost: {
          entry: 'http://localhost:4100/reactMuiTanHostEntry.js',
          entryGlobalName: 'reactMuiTanHost',
          name: 'reactMuiTanHost',
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
