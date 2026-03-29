import type { RouteDefinition } from "@koppajs/koppajs-router";

import { buildPageTitle, routeCopy } from "./site-config";

export const appRoutes = [
  {
    path: "/",
    name: "home",
    title: buildPageTitle(routeCopy.home.title),
    description: routeCopy.home.description,
    componentTag: "home-page",
  },
  {
    path: "/ecosystem",
    name: "ecosystem",
    title: buildPageTitle(routeCopy.ecosystem.title),
    description: routeCopy.ecosystem.description,
    componentTag: "ecosystem-page",
  },
  {
    path: "/philosophy",
    name: "philosophy",
    title: buildPageTitle(routeCopy.philosophy.title),
    description: routeCopy.philosophy.description,
    componentTag: "philosophy-page",
  },
  {
    path: "/start",
    name: "start",
    title: buildPageTitle(routeCopy.start.title),
    description: routeCopy.start.description,
    componentTag: "start-page",
  },
  {
    path: "/support",
    name: "support",
    title: buildPageTitle(routeCopy.support.title),
    description: routeCopy.support.description,
    componentTag: "support-page",
  },
  {
    path: "*",
    name: "not-found",
    title: buildPageTitle(routeCopy.notFound.title),
    description: routeCopy.notFound.description,
    componentTag: "not-found-page",
  },
] satisfies readonly RouteDefinition[];
