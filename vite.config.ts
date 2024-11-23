import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "https://front-mission.bigs.or.kr", // 실제 API 서버 주소
        changeOrigin: true, // 원본 도메인을 API 서버 도메인으로 변경
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
