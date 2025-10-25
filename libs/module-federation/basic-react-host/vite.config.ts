import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      exposes: {},
      filename: 'remoteEntry.js',
      name: 'host',
      remotes: {
        remoteApp: {
          entry: 'http://localhost:3201/remoteApp.js',
          entryGlobalName: 'remoteApp',
          name: 'remoteApp',
          shareScope: 'default',
          type: 'module',
        },
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
