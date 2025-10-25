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
      filename: 'hostEntry.js',
      name: 'host',
      remotes: {
        basicReactRemote: {
          entry: 'http://localhost:3201/basicReactRemoteEntry.js',
          entryGlobalName: 'basicReactRemote',
          name: 'basicReactRemote',
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
