import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from "fs"
import { remoteDisplayServer } from './src/vitePlugins/remoteDisplayServer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: 'examples',
      plugins: [
        react(),
        nodePolyfills(),
        remoteDisplayServer(),
      ],
      resolve: {
        alias: {
          'three-fiber-webxr-toolbox': path.resolve(process.cwd(), 'src')
        }
      },
      envDir: process.cwd(),
      server: {
        host: '0.0.0.0',
        port: 3001,
        https: {
          key: fs.readFileSync("./localhost-key.pem"),
          cert: fs.readFileSync("./localhost.pem"),
        },
      }
    }
  } else {
    return {
      resolve: {
        alias: {
          'three-fiber-webxr-toolbox': path.resolve(process.cwd(), 'src')
        }
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
