import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // Only images that explicitly ask for a format. The v1 site keeps its original files.
    imagetools({ include: /[?&]format=/ }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@v2': fileURLToPath(new URL('./v2/src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      // Independent pages: the current site at /, and the frozen older sites at /v1/ and /v2/
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        v1: fileURLToPath(new URL('./v1/index.html', import.meta.url)),
        v2: fileURLToPath(new URL('./v2/index.html', import.meta.url))
      }
    }
  }
})
