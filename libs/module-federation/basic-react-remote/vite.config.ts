import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      exposes: {
        './App': './src/App.tsx',
      },
      filename: 'basicReactRemoteEntry.js',
      name: 'basicReactRemote',
      remotes: {
        host: 'http://localhost:3200/hostEntry.js'
      },
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    react(),
  ],
});
