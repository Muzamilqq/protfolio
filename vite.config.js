import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "maath",
          ],
          // Split animation libraries
          "animation-vendor": ["motion"],
          // Split email utility
          "email-vendor": ["@emailjs/browser"],
          // Split globe
          "globe-vendor": ["cobe"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
