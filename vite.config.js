// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite"; // Official v4 plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Handles Tailwind v4 integration — no config file needed
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"), // Your barrel file exporting all components
      name: "ComponentLibrary",
      fileName: (format) => `my-design-system.${format}.js`,
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
  },
});