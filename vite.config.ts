import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
})
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_AUTH_TOKEN: string
  readonly VITE_API_KEY: string
  // Другие переменные, если есть
}


