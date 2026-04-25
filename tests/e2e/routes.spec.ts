import { expect, test } from "@playwright/test";

test.describe("website navigation", () => {
  test("renders the homepage and required homepage structure", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      "/koppajs-logo-icon.png",
    );
    await expect(page.locator(".brand-mark__logo")).toBeVisible();
    await expect(page.locator(".site-header__github")).toBeVisible();
    await expect(page.locator(".site-header__support")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Build interfaces without hidden magic.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "A real KoppaJS bootstrap is small enough to read directly.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Four official packages. Four clear jobs.",
      }),
    ).toBeVisible();

    const [heroHeight, headerHeight, viewportHeight] = await Promise.all([
      page.locator(".home-hero").evaluate((element) => element.clientHeight),
      page.locator(".site-header").evaluate((element) => element.clientHeight),
      page.evaluate(() => window.innerHeight),
    ]);
    const [
      headerRailBox,
      headerBarPaddingLeft,
      headerBarPaddingRight,
      mainBox,
      mainPaddingLeft,
      mainPaddingRight,
    ] = await Promise.all([
      page.locator(".site-header > .koppa-container").boundingBox(),
      page
        .locator(".site-header__bar")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingLeft),
        ),
      page
        .locator(".site-header__bar")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingRight),
        ),
      page.locator(".site-outlet").boundingBox(),
      page
        .locator(".site-outlet")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingLeft),
        ),
      page
        .locator(".site-outlet")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingRight),
        ),
    ]);

    expect(heroHeight + headerHeight).toBeGreaterThanOrEqual(
      viewportHeight - 2,
    );
    expect(headerRailBox).not.toBeNull();
    expect(mainBox).not.toBeNull();
    expect(Math.abs(headerRailBox!.x - mainBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(headerRailBox!.width - mainBox!.width)).toBeLessThanOrEqual(
      1,
    );
    expect(Math.abs(mainPaddingLeft - 16)).toBeLessThanOrEqual(1);
    expect(Math.abs(mainPaddingRight - 16)).toBeLessThanOrEqual(1);
    expect(
      Math.abs(
        headerRailBox!.width -
          headerBarPaddingLeft -
          headerBarPaddingRight -
          (mainBox!.width - mainPaddingLeft - mainPaddingRight),
      ),
    ).toBeLessThanOrEqual(1);
  });

  test("navigates through the website shell and into the embedded documentation system", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Get Started" })
      .click();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(
      page.getByRole("heading", {
        name: "A structured path into the KoppaJS documentation system.",
      }),
    ).toBeVisible();

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Architecture" })
      .click();
    await expect(page).toHaveURL(/\/architecture$/);
    await expect(
      page.getByRole("heading", {
        name: "The system stays calm because each layer owns a specific concern.",
      }),
    ).toBeVisible();

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Ecosystem" })
      .click();
    await expect(page).toHaveURL(/\/ecosystem$/);
    await expect(
      page.getByRole("heading", {
        name: "A small package set with clear ownership boundaries.",
      }),
    ).toBeVisible();

    await page.locator(".site-header__docs").click();
    await expect(page).toHaveURL(/\/docs\/overview$/);
    await expect(page.locator(".site-header__docs")).toHaveClass(
      /is-docs-active/,
    );
    await expect(
      page.getByRole("heading", {
        name: "Understand the system before you start wiring components.",
      }),
    ).toBeVisible();
    await expect(page.getByLabel("Documentation navigation")).toBeVisible();
    const [
      siteOutletBox,
      docsGridBox,
      siteOutletPaddingLeft,
      siteOutletPaddingRight,
    ] = await Promise.all([
      page.locator(".site-outlet").boundingBox(),
      page.locator(".documentation-shell__grid").boundingBox(),
      page
        .locator(".site-outlet")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingLeft),
        ),
      page
        .locator(".site-outlet")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).paddingRight),
        ),
    ]);

    expect(siteOutletBox).not.toBeNull();
    expect(docsGridBox).not.toBeNull();
    expect(docsGridBox!.width).toBeLessThanOrEqual(
      siteOutletBox!.width - siteOutletPaddingLeft - siteOutletPaddingRight + 1,
    );
    expect(docsGridBox!.x).toBeGreaterThanOrEqual(
      siteOutletBox!.x + siteOutletPaddingLeft - 1,
    );

    await page
      .getByLabel("Documentation navigation")
      .getByRole("link", { name: "Getting Started" })
      .click();
    await expect(page).toHaveURL(/\/docs\/getting-started$/);
    await expect(page.locator(".site-header__docs")).toHaveClass(
      /is-docs-active/,
    );
    await expect(
      page.getByRole("heading", {
        name: "From an empty directory to a readable application shell.",
      }),
    ).toBeVisible();
  });

  test("keeps support and not-found routes explicit", async ({ page }) => {
    await page.goto("/support");

    await expect(
      page.getByRole("heading", {
        name: "A small ecosystem stays healthy through deliberate backing.",
      }),
    ).toBeVisible();

    await page.goto("/missing-route");

    await expect(
      page.getByRole("heading", {
        name: "This route is not part of the KoppaJS website.",
      }),
    ).toBeVisible();
  });

  test("keeps the header bar on one line across supported viewport widths", async ({
    page,
  }) => {
    for (const scenario of [
      { width: 360, height: 844, usesDrawer: true },
      { width: 768, height: 900, usesDrawer: true },
      { width: 799, height: 900, usesDrawer: true },
      { width: 800, height: 900, usesDrawer: false },
      { width: 960, height: 900, usesDrawer: false },
      { width: 1000, height: 900, usesDrawer: false },
      { width: 1024, height: 900, usesDrawer: false },
      { width: 1079, height: 900, usesDrawer: false },
      { width: 1120, height: 900, usesDrawer: false },
      { width: 1680, height: 1000, usesDrawer: false },
    ]) {
      await page.setViewportSize({
        width: scenario.width,
        height: scenario.height,
      });
      await page.goto("/");

      const bar = page.locator(".site-header__bar");
      const brand = page.locator(".brand-mark");
      const actions = page.locator(".site-header__actions");
      const docsAction = page.locator(".site-header__docs");
      const githubIcon = page.locator(
        ".site-header__github .site-header__action-icon",
      );
      const supportIcon = page.locator(
        ".site-header__support .site-header__support-icon",
      );
      const nav = page.locator(".site-nav");
      const toggle = page.locator(".site-header__menu-toggle");
      const logoImage = page.locator(".brand-mark__logo");

      const [
        barBox,
        brandBox,
        actionsBox,
        docsBox,
        githubIconBox,
        supportIconBox,
      ] = await Promise.all([
        bar.boundingBox(),
        brand.boundingBox(),
        actions.boundingBox(),
        docsAction.boundingBox(),
        githubIcon.boundingBox(),
        supportIcon.boundingBox(),
      ]);

      expect(barBox).not.toBeNull();
      expect(brandBox).not.toBeNull();
      expect(actionsBox).not.toBeNull();
      expect(docsBox).not.toBeNull();
      expect(githubIconBox).not.toBeNull();
      expect(supportIconBox).not.toBeNull();

      expect(barBox!.width).toBeLessThanOrEqual(1442);
      expect(Math.abs(barBox!.height - 64)).toBeLessThanOrEqual(2);
      expect(actionsBox!.height).toBeLessThanOrEqual(48);
      expect(brandBox!.height).toBeGreaterThanOrEqual(28);
      expect(docsBox!.height).toBeGreaterThanOrEqual(35);
      expect(githubIconBox!.width).toBeGreaterThanOrEqual(15.5);
      expect(supportIconBox!.width).toBeGreaterThanOrEqual(15.5);

      const brandCenterY = brandBox!.y + brandBox!.height / 2;
      const actionsCenterY = actionsBox!.y + actionsBox!.height / 2;
      const actionsRightInset =
        barBox!.x + barBox!.width - (actionsBox!.x + actionsBox!.width);
      const [barRadius, barColumnGap, actionsGap, barPaddingRight] =
        await Promise.all([
          bar.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).borderTopLeftRadius),
          ),
          bar.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).columnGap),
          ),
          actions.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).columnGap),
          ),
          bar.evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).paddingRight),
          ),
        ]);
      const logoCurrentSrc = await logoImage.evaluate(
        (element) => (element as HTMLImageElement).currentSrc,
      );

      expect(Math.abs(brandCenterY - actionsCenterY)).toBeLessThanOrEqual(2);
      expect(Math.abs(barRadius - 32)).toBeLessThanOrEqual(1);
      expect(Math.abs(barColumnGap - 16)).toBeLessThanOrEqual(1);

      if (scenario.width < 400) {
        const barLeftInset = barBox!.x;
        const barRightInset = scenario.width - (barBox!.x + barBox!.width);

        expect(Math.abs(actionsGap - 4.8)).toBeLessThanOrEqual(1);
        expect(Math.abs(barLeftInset - 6)).toBeLessThanOrEqual(1);
        expect(Math.abs(barRightInset - 6)).toBeLessThanOrEqual(1);
        expect(logoCurrentSrc).toContain("/koppajs-logo-icon.png");
      } else {
        expect(Math.abs(actionsGap - 12)).toBeLessThanOrEqual(1);
        expect(logoCurrentSrc).toContain("/koppajs-logo-text.png");
      }

      if (scenario.usesDrawer) {
        const barLeftInset = barBox!.x;
        const barRightInset = scenario.width - (barBox!.x + barBox!.width);

        expect(Math.abs(barPaddingRight - 16)).toBeLessThanOrEqual(1);
        expect(Math.abs(actionsRightInset - 16)).toBeLessThanOrEqual(1);

        if (scenario.width >= 400) {
          expect(Math.abs(barLeftInset - 8)).toBeLessThanOrEqual(1);
          expect(Math.abs(barRightInset - 8)).toBeLessThanOrEqual(1);
        }

        await expect(toggle).toBeVisible();
        await expect(nav).toBeHidden();
        continue;
      }

      await expect(toggle).toBeHidden();
      await expect(nav).toBeVisible();

      const navBox = await nav.boundingBox();

      expect(navBox).not.toBeNull();

      const navCenterY = navBox!.y + navBox!.height / 2;
      const brandRight = brandBox!.x + brandBox!.width;
      const actionsLeft = actionsBox!.x;
      const navCenterX = navBox!.x + navBox!.width / 2;
      const expectedNavCenterX = brandRight + (actionsLeft - brandRight) / 2;
      const navGap = await nav.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).columnGap),
      );

      expect(Math.abs(brandCenterY - navCenterY)).toBeLessThanOrEqual(2);
      expect(Math.abs(navCenterX - expectedNavCenterX)).toBeLessThanOrEqual(4);
      expect(Math.abs(navGap - 11.2)).toBeLessThanOrEqual(1);
    }
  });

  test("uses a collapsible mobile navigation header", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.locator(".site-header__menu-toggle")).toBeVisible();
    await expect(page.locator(".site-nav")).toBeHidden();
    await expect(page.locator("#site-mobile-menu")).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const mobileMenu = page.locator("#site-mobile-menu");
    const mobilePanel = page.locator(".site-menu__panel");

    await expect(mobileMenu).toHaveAttribute("aria-hidden", "false");
    await expect(mobilePanel).toBeVisible();

    const panelBox = await mobilePanel.boundingBox();

    expect(panelBox).not.toBeNull();
    await expect
      .poll(async () => {
        const box = await mobilePanel.boundingBox();
        return box ? Math.round(box.x + box.width) : null;
      })
      .toBe(390);

    await page
      .getByLabel("Mobile navigation links")
      .getByRole("link", { name: "Get Started" })
      .click();

    await expect(page).toHaveURL(/\/learn$/);
    await expect(mobileMenu).toHaveAttribute("aria-hidden", "true");
  });
});
