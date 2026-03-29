import { defineConfig } from "vite";
import koppaPlugin from "@koppajs/koppajs-vite-plugin";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    koppaPlugin({
      tsconfigFile: "./tsconfig.json",
    }),
  ],
});
