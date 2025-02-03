import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Asegúrate de que coincida con el puerto que usas
    strictPort: true,
  },
});
