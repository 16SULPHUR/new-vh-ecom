import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "tailwindcss";

export default defineConfig(({ command }) => {

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
  }
})