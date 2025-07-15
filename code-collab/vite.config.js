import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config'
// import { monacoEditorPlugin } from 'vite-plugin-monaco-editor'; // ✅ Correct import


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
