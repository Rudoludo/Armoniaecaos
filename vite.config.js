import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  /* server: {
    host: true, // allows access from LAN
  }, */
  /* build: {
    sourcemap: false, // Ensure this is set to false for production
    // Or remove it entirely, as 'false' is often the default for production
  }, */
  base: '/', // Set this to your repository name!
  
})
