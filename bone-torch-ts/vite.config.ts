import path from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      'bt-engine': path.resolve(__dirname, "./src/engine"),
      'bone-torch': path.resolve(__dirname, "./src/apps/boneTorch"),
    }
  }
})
