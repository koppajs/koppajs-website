import { describe, expect, it } from "vitest";

import { appRoutes } from "../../src/app-routes";
import { navigationItems } from "../../src/site-config";

describe("appRoutes", () => {
  it("covers every primary navigation path", () => {
    const routePaths = new Set(appRoutes.map((route) => route.path));

    navigationItems.forEach((item) => {
      expect(routePaths.has(item.path)).toBe(true);
    });
  });

  it("declares metadata for every renderable route", () => {
    const renderableRoutes = appRoutes.filter((route) => route.path !== "*");

    renderableRoutes.forEach((route) => {
      expect(route.title).toBeTruthy();
      expect(route.description).toBeTruthy();
      expect(route.componentTag).toBeTruthy();
    });
  });

  it("defines a dedicated catch-all not-found route", () => {
    expect(appRoutes).toContainEqual(
      expect.objectContaining({
        path: "*",
        name: "not-found",
        componentTag: "not-found-page",
      }),
    );
  });
});
