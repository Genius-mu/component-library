// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Handles Tailwind v4 — no config needed
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "ComponentLibrary",
      fileName: (format) => `component-library.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "framerMotion",
          "lucide-react": "lucideReact",
        },
      },
    },
    // Important: Do NOT bundle CSS into JS — let users import it
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
