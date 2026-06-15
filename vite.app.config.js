// vite.app.config.js — builds the demo SITE (index.html + pages),
// separate from vite.config.js which builds the npm library.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist-site" },
});
