import { expect, test } from "@playwright/test";

test.describe("preview routes", () => {
  test("loads a deep website route through vite preview", async ({ page }) => {
    await page.goto("/architecture");

    await expect(
      page.getByRole("heading", {
        name: "The system stays calm because each layer owns a specific concern.",
      }),
    ).toBeVisible();
  });

  test("keeps embedded docs deep links working in preview", async ({
    page,
  }) => {
    await page.goto("/docs/core-concepts/lifecycle");

    await expect(
      page.getByRole("heading", {
        name: "Lifecycle hooks are useful because their order is predictable.",
      }),
    ).toBeVisible();
  });
});
