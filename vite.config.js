import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "/bayes-theorem/" : "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "react-vendor";
          }

          if (id.includes("node_modules/d3/")) {
            return "viz-vendor";
          }

          if (id.includes("node_modules/katex/") || id.includes("node_modules/react-katex/")) {
            return "math-vendor";
          }

          return undefined;
        }
      }
    }
  }
});
