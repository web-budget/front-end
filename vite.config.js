import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import { envConfig } from '@geprog/vite-plugin-env-config'

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin(),
    envConfig({ variables: ['API_URL', 'LOG_REQUEST'] }),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
