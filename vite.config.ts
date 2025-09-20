import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ecm-connect-four/',
  plugins: [
    tailwindcss(),
  ],
})
