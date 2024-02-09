import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // We want support of top level await for brotli-wasm
  build: {
    target: 'esnext',
  },
  // Yarn run dev: it won't work with the loading of the wasm file
  optimizeDeps: {
     exclude: ['brotli-wasm'],
     esbuildOptions: {
      target: 'esnext',
     },
  },
  // Local dev: Yarn run dev with npm link
  // server: {
  //   fs: {
  //     allow: ['.', '/home/nand/Code/web3protocol/web3protocol-js'],
  //   },
  // },
})
