/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: 'jsdom',
  },
  define: { 
    'import.meta.vitest': 'undefined', 
  }, 
})
