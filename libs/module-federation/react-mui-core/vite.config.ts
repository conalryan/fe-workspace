import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.svg'],
  build: {
    lib: {
      entry: {
        'foundations/index': resolve(__dirname, 'src/foundations/index.ts'),
        index: resolve(__dirname, 'src/index.ts')
      },
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true
  },
  envPrefix: ['VITE_', 'REACT_APP_'],
  plugins: [
    react(),
    dts({
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.ts', '**/*.stories.tsx'],
      insertTypesEntry: true
    })
  ]
})
