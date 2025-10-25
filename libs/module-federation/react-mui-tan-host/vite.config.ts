import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      exposes: {
        './SharedComponent': './src/components/SharedComponent.tsx',
      },
      filename: 'reactMuiTanHostEntry.js',
      name: 'reactMuiTanHost',
      remotes: {
        reactMuiTanRemote: {
          entry: 'http://localhost:4101/reactMuiTanRemoteEntry.js',
          entryGlobalName: 'reactMuiTanRemote',
          name: 'reactMuiTanRemote',
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
