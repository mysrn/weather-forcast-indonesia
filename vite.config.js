import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/weather-forcast-indonesia/',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    port: 3000
  }
})
