import { describe, expect, it } from "vitest";

import {
  primaryNavigation,
  buildPageTitle,
  footerNavigation,
  siteMeta,
} from "../../src/site-config";
import {
  architectureValueCards,
  aboutStatements,
  homePerformanceCards,
  homeProductCards,
  homePromiseCards,
} from "../../src/site-content";

describe("site-config", () => {
  it("builds branded page titles", () => {
    expect(buildPageTitle("Architecture")).toBe(
      `${siteMeta.brand} · Architecture`,
    );
  });

  it("keeps the top navigation aligned with the required 1.0 structure", () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      "Start",
      "Docs",
      "Architecture",
      "Ecosystem",
      "Get Started",
    ]);
  });

  it("keeps the product website copy surfaces distinct", () => {
    expect(new Set(homeProductCards.map((item) => item.title)).size).toBe(
      homeProductCards.length,
    );
    expect(homeProductCards.map((item) => item.title)).toEqual([
      "Core Runtime",
      "Custom Elements",
      "Vite Build Plugin",
      "Extensions",
    ]);
    expect(homeProductCards.every((item) => item.icon)).toBe(true);
    expect(new Set(homePromiseCards.map((item) => item.title)).size).toBe(
      homePromiseCards.length,
    );
    expect(new Set(homePerformanceCards.map((item) => item.title)).size).toBe(
      homePerformanceCards.length,
    );
    expect(architectureValueCards.map((item) => item.title)).toContain(
      "Smaller runtime",
    );
    expect(aboutStatements.length).toBeGreaterThan(1);
    expect(footerNavigation.map((item) => item.label)).toEqual(
      expect.arrayContaining(["Legal Notice", "Privacy"]),
    );
  });
});
