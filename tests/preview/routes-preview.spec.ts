import { expect, test } from "@playwright/test";

test.describe("preview routes", () => {
  test("loads a deep link through vite preview", async ({ page }) => {
    await page.goto("/philosophy");

    await expect(
      page.getByRole("heading", {
        name: "KoppaJS is opinionated about clarity, not ceremony.",
      }),
    ).toBeVisible();
  });

  test("keeps the not-found route working in preview", async ({ page }) => {
    await page.goto("/preview-missing");

    await expect(
      page.getByRole("heading", {
        name: "This route is not part of the KoppaJS website.",
      }),
    ).toBeVisible();
  });
});
