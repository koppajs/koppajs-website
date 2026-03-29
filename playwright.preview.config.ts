import { defineConfig } from "@playwright/test";

const baseURL =
  process.env.PLAYWRIGHT_PREVIEW_BASE_URL ?? "http://127.0.0.1:4274";

export default defineConfig({
  testDir: "tests",
  testMatch: /\/preview\/.+\.spec\.ts$/,
  timeout: 45_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: "retain-on-failure",
    viewport: { width: 1440, height: 960 },
    colorScheme: "light",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "CI=1 npm run build && CI=1 npm run preview",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],
});
