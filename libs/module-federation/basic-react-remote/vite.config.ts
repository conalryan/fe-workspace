import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      exposes: {
        './remote-app': './src/App.tsx',
      },
      filename: 'remoteEntry.js',
      name: 'remote',
      remotes: {},
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
