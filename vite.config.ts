import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // The repo's existing GitHub Pages workflow uploads .output/public;
    // the OAuth login used for this push cannot modify workflow files,
    // so the build output goes where the workflow already expects it.
    outDir: '.output/public',
    target: 'es2020',
    cssCodeSplit: true,
  },
})
