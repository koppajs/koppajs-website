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
  optimizeDeps: {
    exclude: [
      "koppajs-documentation",
      "koppajs-documentation/code-blocks",
      "koppajs-documentation/ecosystem",
      "koppajs-documentation/integration",
      "koppajs-documentation/routes",
    ],
  },
  plugins: [
    koppaPlugin({
      tsconfigFile: "./tsconfig.json",
    }),
  ],
});
