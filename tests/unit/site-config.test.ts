import { describe, expect, it } from "vitest";

import {
  buildPageTitle,
  ecosystemPackages,
  siteMeta,
  supportLanes,
} from "../../src/site-config";

describe("site-config", () => {
  it("builds branded page titles", () => {
    expect(buildPageTitle("Support")).toBe(`${siteMeta.brand} · Support`);
  });

  it("promotes the key official ecosystem packages", () => {
    expect(ecosystemPackages.map((item) => item.name)).toEqual(
      expect.arrayContaining([
        "@koppajs/koppajs-core",
        "@koppajs/koppajs-vite-plugin",
        "@koppajs/koppajs-router",
      ]),
    );
  });

  it("keeps support lanes distinct", () => {
    expect(new Set(supportLanes.map((lane) => lane.title)).size).toBe(
      supportLanes.length,
    );
  });
});
