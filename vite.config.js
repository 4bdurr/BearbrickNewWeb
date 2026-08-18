import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // atau plugin tailwind kamu

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Otomatis expose IP network setiap kali dev server dinyalakan
    port: 5173,
  },
})