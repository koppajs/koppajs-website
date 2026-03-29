import { expect, test } from "@playwright/test";

test.describe("route navigation", () => {
  test("renders the homepage hero and core call to action", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Build fast web interfaces without buying into hidden magic.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "See the adoption path" }),
    ).toBeVisible();
  });

  test("navigates through primary routes and updates active nav state", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Ecosystem", exact: true })
      .click();
    await expect(page).toHaveURL(/\/ecosystem$/);
    await expect(
      page.getByRole("heading", {
        name: "A small ecosystem with clear package boundaries.",
      }),
    ).toBeVisible();
    await expect(
      page.locator('.site-nav a[data-route="/ecosystem"]'),
    ).toHaveAttribute("aria-current", "page");

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Support", exact: true })
      .click();
    await expect(page).toHaveURL(/\/support$/);
    await expect(
      page.getByRole("heading", {
        name: "If KoppaJS should keep maturing, it needs active backing.",
      }),
    ).toBeVisible();
  });

  test("surfaces the official packages on the ecosystem page", async ({
    page,
  }) => {
    await page.goto("/ecosystem");

    await expect(
      page.getByRole("heading", { name: "@koppajs/koppajs-core", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "@koppajs/koppajs-vite-plugin",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "@koppajs/koppajs-router",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("renders the dedicated not-found page for unmatched routes", async ({
    page,
  }) => {
    await page.goto("/does-not-exist");

    await expect(page).toHaveURL(/\/does-not-exist$/);
    await expect(
      page.getByRole("heading", {
        name: "This route is not part of the KoppaJS website.",
      }),
    ).toBeVisible();
    await expect(page.locator(".site-nav a[aria-current='page']")).toHaveCount(
      0,
    );
  });
});
