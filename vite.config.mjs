import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import koppaPlugin from "@koppajs/koppajs-vite-plugin";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
  resolve: {
    dedupe: ["@koppajs/koppajs-core", "@koppajs/koppajs-router"],
  },
  plugins: [
    koppaPlugin({
      tsconfigFile: "./tsconfig.json",
    }),
  ],
});
