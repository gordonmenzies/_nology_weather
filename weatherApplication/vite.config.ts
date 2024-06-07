import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  define: {
    "process.envVITE_Weather_API_KEY": JSON.stringify(process.env.VITE_API_KEY),
  },
});
