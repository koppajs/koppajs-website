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
      page.getByRole("link", { name: "See what KoppaJS is" }),
    ).toBeVisible();
  });

  test("navigates through primary routes and the right-side quick links", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Philosophy", exact: true })
      .click();
    await expect(page).toHaveURL(/\/philosophy$/);
    await expect(
      page.getByRole("heading", {
        name: "KoppaJS is opinionated about clarity, not ceremony.",
      }),
    ).toBeVisible();
    await expect(
      page.locator('.site-nav a[data-route="/philosophy"]'),
    ).toHaveAttribute("aria-current", "page");

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("heading", {
        name: "What KoppaJS is, what it is for, and where it could go next.",
      }),
    ).toBeVisible();
    await expect(
      page.locator('.site-nav a[data-route="/about"]'),
    ).toHaveAttribute("aria-current", "page");

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

    await expect(
      page
        .getByLabel("Primary navigation")
        .getByRole("link", { name: "Support", exact: true }),
    ).toHaveCount(0);
    await expect(
      page
        .getByLabel("Primary navigation")
        .getByRole("link", { name: "Docs", exact: true }),
    ).toHaveCount(0);

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Blog", exact: true })
      .click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByRole("heading", {
        name: "KoppaJS writing, release notes, and deeper architecture context.",
      }),
    ).toBeVisible();
    await expect(
      page.locator('.site-nav a[data-route="/blog"]'),
    ).toHaveAttribute("aria-current", "page");

    await page
      .locator('.site-header__actions a[data-route="/support"]')
      .click();
    await expect(page).toHaveURL(/\/support$/);
    await expect(
      page.getByRole("heading", {
        name: "If KoppaJS should keep maturing, it needs active backing.",
      }),
    ).toBeVisible();
    await expect(
      page.locator('.site-header__actions a[data-route="/support"]'),
    ).toHaveAttribute("aria-current", "page");

    await page
      .locator('.site-header__actions a[data-route="/docs"]')
      .click();
    await expect(page).toHaveURL(/\/docs$/);
    await expect(
      page.getByRole("heading", {
        name: "Pragmatic frontend made modular.",
      }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Documentation navigation"),
    ).toBeVisible();
    await expect(
      page.locator('.site-header__actions a[data-route="/docs"]'),
    ).toHaveAttribute("aria-current", "page");

    await page.evaluate(() => {
      (
        window as typeof window & { __docsClientMarker?: number }
      ).__docsClientMarker = 7;
    });

    await page
      .getByLabel("Documentation navigation")
      .getByRole("link", { name: "API", exact: true })
      .click();
    await expect(page).toHaveURL(/\/docs-api$/);
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as typeof window & { __docsClientMarker?: number })
              .__docsClientMarker ?? null,
        ),
      )
      .toBe(7);
    await expect(
      page.getByRole("heading", {
        name: "The reference for runtime, directives and component contract.",
      }),
    ).toBeVisible();
  });

  test("switches the website language from the footer", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Deutsch" }).click();

    await expect(
      page.getByRole("heading", {
        name: "Schnelle Weboberflächen bauen, ohne sich in versteckter Magie zu verlieren.",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByLabel("Primary navigation")
        .getByRole("link", { name: "Ökosystem", exact: true }),
    ).toBeVisible();

    await page.goto("/ecosystem");
    await expect(
      page.getByRole("heading", {
        name: "Ein kleines Ökosystem mit klaren Paketgrenzen.",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "English" }).click();
    await expect(
      page.getByRole("heading", {
        name: "A small ecosystem with clear package boundaries.",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Deutsch" }).click();
    await expect(
      page.getByRole("heading", {
        name: "Ein kleines Ökosystem mit klaren Paketgrenzen.",
      }),
    ).toBeVisible();
  });

  test("switches the embedded documentation language from the docs sidebar", async ({
    page,
  }) => {
    await page.goto("/docs");

    await page
      .locator(".documentation-layout__locale")
      .getByRole("button", { name: "Deutsch" })
      .click();

    await expect(
      page.getByLabel("Dokumentationsnavigation"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Pragmatisches Frontend, modular gedacht.",
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
