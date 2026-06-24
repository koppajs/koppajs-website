import { expect, test, type Page } from "@playwright/test";

const expectHeroToFillViewportAndCenterContent = async (
  page: Page,
  heroSelector: string,
  contentSelector: string,
) => {
  const [heroHeight, headerHeight, viewportHeight, heroBox, contentBox] =
    await Promise.all([
      page.locator(heroSelector).evaluate((element) => element.clientHeight),
      page.locator(".site-header").evaluate((element) => element.clientHeight),
      page.evaluate(() => window.innerHeight),
      page.locator(heroSelector).boundingBox(),
      page.locator(contentSelector).boundingBox(),
    ]);

  expect(heroHeight + headerHeight).toBeGreaterThanOrEqual(viewportHeight - 1);
  expect(heroBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(
    Math.abs(
      contentBox!.y +
        contentBox!.height / 2 -
        (heroBox!.y + heroBox!.height / 2),
    ),
  ).toBeLessThanOrEqual(2);
};

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
    await expect(
      page.getByRole("heading", {
        name: "Build frontends that stay clear.",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "A pragmatic, component-first framework for reactive web applications.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "A pragmatic framework for reactive web applications.",
      }),
    ).toBeVisible();
    await expect(page.locator(".home-feature-card")).toHaveCount(4);
    await expect(
      page
        .locator(".home-feature-card")
        .getByRole("heading", { name: "Extensions" }),
    ).toBeVisible();
    await expect(
      page
        .locator(".home-feature-card")
        .getByRole("heading", { name: "Documentation" }),
    ).toHaveCount(0);
    await expect(page.locator(".home-feature-card__icon svg")).toHaveCount(4);
    await expect(page.locator(".home-feature-card__icon path[d]")).toHaveCount(
      18,
    );
    await expect(page.locator(".home-feature-card__icon rect")).toHaveCount(2);
    await expect(page.locator(".home-feature-card__cutout-glow")).toHaveCount(
      0,
    );
    await expect(page.locator(".home-feature-card__bottom-cutout")).toHaveCount(
      0,
    );
    const [
      featureGridBox,
      featureCardBox,
      featureIconBox,
      featureHeadingBox,
      coreBenefitsHeadingBox,
    ] = await Promise.all([
      page.locator(".home-feature-grid").boundingBox(),
      page.locator(".home-feature-card").first().boundingBox(),
      page.locator(".home-feature-card__icon").first().boundingBox(),
      page
        .locator(".home-feature-card")
        .getByRole("heading", { name: "Core Runtime" })
        .boundingBox(),
      page
        .locator("main")
        .getByRole("heading", {
          name: "Clarity, control, and a smaller runtime.",
        })
        .boundingBox(),
    ]);

    expect(featureGridBox).not.toBeNull();
    expect(featureCardBox).not.toBeNull();
    expect(featureIconBox).not.toBeNull();
    expect(featureHeadingBox).not.toBeNull();
    expect(coreBenefitsHeadingBox).not.toBeNull();
    await expect
      .poll(async () =>
        page
          .locator(".home-feature-card")
          .first()
          .evaluate((element) => {
            const cutoutLayer = getComputedStyle(element, "::before");

            return (
              cutoutLayer.maskImage ||
              cutoutLayer.getPropertyValue("-webkit-mask-image")
            );
          }),
      )
      .toContain("radial-gradient");
    await expect
      .poll(async () =>
        page
          .locator(".home-feature-card")
          .first()
          .evaluate((element) => {
            const cutoutBorder = getComputedStyle(element, "::after");

            return {
              animationName: cutoutBorder.animationName,
              borderRadius: cutoutBorder.borderRadius,
              boxShadow: cutoutBorder.boxShadow,
              clipPath: cutoutBorder.clipPath,
              width: cutoutBorder.width,
            };
          }),
      )
      .toMatchObject({
        animationName: "none",
        borderRadius: "50%",
      });
    expect(featureIconBox!.width).toBeGreaterThanOrEqual(180);
    expect(featureIconBox!.height).toBeGreaterThanOrEqual(180);
    const cutoutBorderWidth = await page
      .locator(".home-feature-card")
      .first()
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element, "::after").width),
      );
    expect(cutoutBorderWidth).toBeLessThan(featureIconBox!.width);
    await expect
      .poll(async () =>
        page
          .locator(".home-feature-card__icon")
          .first()
          .evaluate((element) => {
            const iconStyle = getComputedStyle(element);

            return {
              animationName: iconStyle.animationName,
              backgroundColor: iconStyle.backgroundColor,
              borderTopWidth: iconStyle.borderTopWidth,
              color: iconStyle.color,
              filter: iconStyle.filter,
            };
          }),
      )
      .toMatchObject({
        animationName: "home-feature-icon-float",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderTopWidth: "0px",
        color: "rgb(100, 220, 232)",
      });
    expect(featureIconBox!.y).toBeLessThan(featureCardBox!.y);
    expect(featureHeadingBox!.y).toBeGreaterThan(
      featureIconBox!.y + featureIconBox!.height + 8,
    );
    expect(featureHeadingBox!.y).toBeLessThan(featureCardBox!.y + 170);
    expect(coreBenefitsHeadingBox!.y).toBeGreaterThan(
      featureGridBox!.y + featureGridBox!.height + 40,
    );
    expect(
      Math.abs(
        featureIconBox!.x +
          featureIconBox!.width / 2 -
          (featureCardBox!.x + featureCardBox!.width / 2),
      ),
    ).toBeLessThanOrEqual(2);
    await expect(
      page.locator("main").getByRole("heading", {
        name: "Clarity, control, and a smaller runtime.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Low overhead starts with a small runtime.",
      }),
    ).toBeVisible();

    const readDocsLink = page
      .locator("main")
      .getByRole("link", { name: "Read the Docs" });
    await expect(readDocsLink).toHaveAttribute("href", /\/docs(\/overview)?$/);
    await expect(
      page.locator("main").getByRole("link", { name: "View GitHub" }),
    ).toHaveAttribute("href", "https://github.com/koppajs");

    await expect(page.locator(".home-page .koppa-code-block")).toHaveCount(0);
    await expect(page.locator(".home-architecture__layer")).toHaveCount(0);
    expect(
      await page.locator(".home-page article.koppa-card").count(),
    ).toBeGreaterThanOrEqual(10);
    await expect(page.getByRole("link", { name: "v3.0.7" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "v0.1.2" })).toHaveCount(0);
    await expect(page.locator(".home-release-overview")).toHaveCount(0);
    await expect(
      page.getByText("Official packages and current releases."),
    ).toHaveCount(0);
    await expect(
      page.getByText("Public coordination stays in the repositories."),
    ).toHaveCount(0);
    await expect(
      page.getByText("@koppajs/koppajs-core is the runtime package"),
    ).toHaveCount(0);
    await expect(
      page.getByText(
        "Native custom elements · Focused core · Vite-powered builds",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Modular where it matters. Explicit where it counts.",
      }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Primary navigation").getByRole("link", {
        name: "Start",
        exact: true,
      }),
    ).toHaveAttribute("href", "/");
    await expect(
      page.getByLabel("Primary navigation").getByRole("link", {
        name: "Showcase",
      }),
    ).toHaveCount(0);
    await expect(
      page.locator(".site-footer").getByRole("link", { name: "Showcase" }),
    ).toHaveCount(0);
    await expect(
      page
        .locator(".site-footer")
        .getByText("Clear frontends, fewer surprises."),
    ).toBeVisible();
    await expect(
      page.locator(".site-footer").getByRole("link", { name: "Legal Notice" }),
    ).toBeVisible();
    await expect(
      page.locator(".site-footer").getByRole("link", { name: "Privacy" }),
    ).toBeVisible();

    await expectHeroToFillViewportAndCenterContent(
      page,
      ".home-hero",
      ".home-hero__copy",
    );
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
        name: "Start building with a clear path.",
      }),
    ).toBeVisible();
    await expectHeroToFillViewportAndCenterContent(
      page,
      ".site-page__hero",
      ".site-page__hero-copy",
    );

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Architecture" })
      .click();
    await expect(page).toHaveURL(/\/architecture$/);
    await expect(
      page.getByRole("heading", {
        name: "Architecture that keeps frontend work understandable.",
      }),
    ).toBeVisible();

    await page
      .getByLabel("Primary navigation")
      .getByRole("link", { name: "Ecosystem" })
      .click();
    await expect(page).toHaveURL(/\/ecosystem$/);
    await expect(
      page.getByRole("heading", {
        name: "Small official packages. Clear product capabilities.",
      }),
    ).toBeVisible();

    await page.locator(".site-header__docs").click();
    await expect(page).toHaveURL(/\/docs\/overview$/);
    await expect(page.locator(".site-header__docs")).toHaveClass(
      /is-docs-active/,
    );
    await expect(
      page.getByRole("heading", {
        name: "Understand how KoppaJS works before you wire an app.",
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
        name: "Help make KoppaJS clearer, smaller, and easier to use.",
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
      const nav = page.locator(".site-nav");
      const toggle = page.locator(".site-header__menu-toggle");
      const logoImage = page.locator(".brand-mark__logo");

      const [barBox, brandBox, actionsBox, docsBox, githubIconBox] =
        await Promise.all([
          bar.boundingBox(),
          brand.boundingBox(),
          actions.boundingBox(),
          docsAction.boundingBox(),
          githubIcon.boundingBox(),
        ]);

      expect(barBox).not.toBeNull();
      expect(brandBox).not.toBeNull();
      expect(actionsBox).not.toBeNull();
      expect(docsBox).not.toBeNull();
      expect(githubIconBox).not.toBeNull();

      expect(barBox!.width).toBeLessThanOrEqual(1442);
      expect(Math.abs(barBox!.height - 64)).toBeLessThanOrEqual(2);
      expect(actionsBox!.height).toBeLessThanOrEqual(48);
      expect(brandBox!.height).toBeGreaterThanOrEqual(28);
      expect(docsBox!.height).toBeGreaterThanOrEqual(35);
      expect(githubIconBox!.width).toBeGreaterThanOrEqual(15.5);

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
    await expect(
      page
        .getByLabel("Mobile navigation links")
        .getByRole("link", { name: "Start", exact: true }),
    ).toHaveAttribute("href", "/");
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
