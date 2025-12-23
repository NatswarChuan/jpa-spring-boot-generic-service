import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/jpa-spring-boot-generic-service/', 
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: resolve(__dirname, '../docs'),
    
    emptyOutDir: true,
    
    assetsDir: 'assets', 
  }
})