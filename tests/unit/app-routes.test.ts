import { describe, expect, it } from "vitest";

import { appRoutes } from "../../src/app-routes";

describe("appRoutes", () => {
  it("covers the required website top-level structure", () => {
    const routePaths = appRoutes.map((route) => route.path);

    expect(routePaths).toEqual(
      expect.arrayContaining([
        "/",
        "/learn",
        "/architecture",
        "/ecosystem",
        "/showcase",
        "/about",
        "/support",
        "/docs",
        "/docs/overview",
        "/impressum",
        "/datenschutz",
        "*",
      ]),
    );
  });

  it("embeds the nested documentation route tree instead of reimplementing it", () => {
    expect(appRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "/docs/getting-started/installation",
          componentTag: "documentation-page",
        }),
        expect.objectContaining({
          path: "/docs/core-concepts/lifecycle",
          componentTag: "documentation-page",
        }),
        expect.objectContaining({
          path: "/docs/api",
          componentTag: "documentation-page",
        }),
      ]),
    );
  });

  it("defines explicit metadata for every final renderable route", () => {
    appRoutes
      .filter((route) => route.path !== "*" && !("redirectTo" in route))
      .forEach((route) => {
        expect(route.title).toBeTruthy();
        expect(route.description).toBeTruthy();
        expect(route.componentTag).toBeTruthy();
      });
  });
});
