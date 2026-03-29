import type { RouteDefinition } from "@koppajs/koppajs-router";
import { createDocumentationRoutes } from "koppajs-documentation/routes";
import { getKoppaLocale } from "koppajs-documentation/i18n";

import { buildPageTitle, getRouteCopy } from "./site-config";

const routeCopy = getRouteCopy(getKoppaLocale());

export const appRoutes = [
  {
    path: "/",
    name: "home",
    title: buildPageTitle(routeCopy.home.title),
    description: routeCopy.home.description,
    componentTag: "home-page",
  },
  {
    path: "/philosophy",
    name: "philosophy",
    title: buildPageTitle(routeCopy.philosophy.title),
    description: routeCopy.philosophy.description,
    componentTag: "philosophy-page",
  },
  {
    path: "/about",
    name: "about",
    title: buildPageTitle(routeCopy.about.title),
    description: routeCopy.about.description,
    componentTag: "about-page",
  },
  {
    path: "/ecosystem",
    name: "ecosystem",
    title: buildPageTitle(routeCopy.ecosystem.title),
    description: routeCopy.ecosystem.description,
    componentTag: "ecosystem-page",
  },
  {
    path: "/blog",
    name: "blog",
    title: buildPageTitle(routeCopy.blog.title),
    description: routeCopy.blog.description,
    componentTag: "blog-page",
  },
  {
    path: "/support",
    name: "support",
    title: buildPageTitle(routeCopy.support.title),
    description: routeCopy.support.description,
    componentTag: "support-page",
  },
  ...createDocumentationRoutes({
    basePath: "/docs",
    includeFallback: false,
    locale: getKoppaLocale(),
    pathStyle: "flat",
  }),
  {
    path: "/datenschutz",
    name: "privacy",
    title: buildPageTitle(routeCopy.privacy.title),
    description: routeCopy.privacy.description,
    componentTag: "privacy-page",
  },
  {
    path: "/impressum",
    name: "imprint",
    title: buildPageTitle(routeCopy.imprint.title),
    description: routeCopy.imprint.description,
    componentTag: "imprint-page",
  },
  {
    path: "*",
    name: "not-found",
    title: buildPageTitle(routeCopy.notFound.title),
    description: routeCopy.notFound.description,
    componentTag: "not-found-page",
  },
] satisfies readonly RouteDefinition[];
