import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
})
