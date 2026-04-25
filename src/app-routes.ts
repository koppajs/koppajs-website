import type { RouteDefinition } from "@koppajs/koppajs-router";
import { createDocumentationRoutes } from "koppajs-documentation/routes";

import { getSiteRouteMeta } from "./site-config";

const orderedSitePages = [
  "/architecture",
  "/ecosystem",
  "/showcase",
  "/about",
  "/support",
] as const;

const legalSitePages = ["/impressum", "/datenschutz"] as const;

const createSitePageRoute = (path: string) => ({
  path,
  name: path.slice(1).replaceAll("/", "-"),
  ...getSiteRouteMeta(path),
  componentTag: "site-content-page",
});

export const appRoutes = [
  {
    path: "/",
    name: "home",
    ...getSiteRouteMeta("/"),
    componentTag: "home-page",
  },
  {
    path: "/learn",
    name: "learn",
    ...getSiteRouteMeta("/learn"),
    componentTag: "learn-page",
  },
  ...orderedSitePages.map((path) => createSitePageRoute(path)),
  ...createDocumentationRoutes({
    basePath: "/docs",
    includeFallback: false,
    pathStyle: "nested",
  }),
  ...legalSitePages.map((path) => createSitePageRoute(path)),
  {
    path: "*",
    name: "not-found",
    ...getSiteRouteMeta("*"),
    componentTag: "not-found-page",
  },
] satisfies readonly RouteDefinition[];
