import { describe, expect, it } from "vitest";

import {
  primaryNavigation,
  buildPageTitle,
  siteMeta,
} from "../../src/site-config";
import {
  aboutStatements,
  learningPaths,
  whyKoppaCards,
} from "../../src/site-content";

describe("site-config", () => {
  it("builds branded page titles", () => {
    expect(buildPageTitle("Architecture")).toBe(
      `${siteMeta.brand} · Architecture`,
    );
  });

  it("keeps the top navigation aligned with the required 1.0 structure", () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      "Docs",
      "Architecture",
      "Ecosystem",
      "Showcase",
      "About",
      "Get Started",
    ]);
  });

  it("keeps the homepage explanation cards and learning paths distinct", () => {
    expect(new Set(whyKoppaCards.map((item) => item.title)).size).toBe(
      whyKoppaCards.length,
    );
    expect(new Set(learningPaths.map((item) => item.title)).size).toBe(
      learningPaths.length,
    );
    expect(aboutStatements.length).toBeGreaterThan(1);
  });
});
