import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "CompostickLibrary", // Changed
      fileName: (format) => `compostick-library.${format}.js`, // Changed
    },
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "motion", // Changed to 'motion' (common global)
          "lucide-react": "lucideReact",
        },
      },
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
