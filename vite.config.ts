import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "tailwindcss";

const basenameProd = '/'
export default defineConfig(({ command }) => {
  const isProd = command === 'build'
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      host: "0.0.0.0",
    },
    base: isProd ? basenameProd : '',
  }
})