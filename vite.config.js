import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "Morgu",
      fileName: (format) => `morgu.${format}.js`,
    },
    rollupOptions: {
      // Externalize peer deps AND their sub-paths (react/jsx-runtime,
      // react-dom/client, etc.) so they aren't bundled into the library.
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^framer-motion($|\/)/,
        /^lucide-react($|\/)/,
      ],
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "morgu.css" : "[name][extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "framer-motion": "motion",
          "lucide-react": "lucideReact",
        },
      },
    },
    cssCodeSplit: false,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
