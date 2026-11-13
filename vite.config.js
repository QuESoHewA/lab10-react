import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const src = (p = "") => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": src(),
      "@components": src("components"),
      "@pages": src("pages"),
      "@context": src("context"),
      "@data": src("data"),
      "@utils": src("utils"),
    },
  },
});
