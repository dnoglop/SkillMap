import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Adicionei o plugin do React, que é comum

export default defineConfig({
  plugins: [react()], // Adicione plugins se necessário
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: [".replit.dev"],
  },
});
