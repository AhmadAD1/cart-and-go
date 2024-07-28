
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@admin": path.resolve(__dirname, "./src/admin"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  // base: "/", // the base URL should be set to the root path ("/") because Vercel handles the routing and serves your app from the root.
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
