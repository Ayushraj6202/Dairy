import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/api':'http://localhost:8000',
    },
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',  // Ensure this matches the directory name used in Render
  },
  plugins: [react()],
})

