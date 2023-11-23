import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: 'examples',
      plugins: [react()],
      resolve: {
        alias: {
          'three-fiber-webxr-toolbox': path.resolve(process.cwd(), 'src')
        }
      }
    }
  } else {
    return {
      optimizeDeps: {
        exclude: [
          '@react-three/fiber',
          '@react-three/xr',
          'react',
          'react-dom',
          'three',
        ]
      },
      build: {
        minify: false,
        sourcemap: true,
        target: 'es2018',
        lib: {
          formats: ['es', 'cjs'],
          entry: 'src/index.tsx',
          fileName: '[name]'
        },
        rollupOptions: {
          external: (id) => !id.startsWith('.') && !path.isAbsolute(id),
          output: {
            preserveModules: true,
            sourcemapExcludeSources: true
          }
        }
      }
    }
  }
})
