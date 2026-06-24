import { sitePageMap } from "./site-content";

export const siteMeta = {
  brand: "KoppaJS",
  tagline: "Build frontends that stay clear.",
  logoTextSrc: "/koppajs-logo-text.png",
  logoIconSrc: "/koppajs-logo-icon.png",
  githubLabel: "GitHub",
  githubOrgUrl: "https://github.com/koppajs",
  websiteRepoUrl: "https://github.com/koppajs/koppajs-website",
  docsRepoUrl: "https://github.com/koppajs/koppajs-documentation",
} as const;

export type PrimaryNavigationItem = {
  readonly label: string;
  readonly path: string;
  readonly kind: "internal" | "external" | "docs" | "cta";
};

export const primaryNavigation = [
  { label: "Start", path: "/", kind: "internal" },
  { label: "Docs", path: "/docs", kind: "docs" },
  { label: "Architecture", path: "/architecture", kind: "internal" },
  { label: "Ecosystem", path: "/ecosystem", kind: "internal" },
  { label: "Get Started", path: "/learn", kind: "cta" },
] as const satisfies readonly PrimaryNavigationItem[];

export const footerNavigation = [
  { label: "Home", path: "/" },
  { label: "Learn", path: "/learn" },
  { label: "Architecture", path: "/architecture" },
  { label: "Ecosystem", path: "/ecosystem" },
  { label: "About", path: "/about" },
  { label: "Support", path: "/support" },
  { label: "Legal Notice", path: "/impressum" },
  { label: "Privacy", path: "/datenschutz" },
] as const;

const homeRouteMeta = {
  title: "Home",
  description:
    "KoppaJS is a pragmatic, focused, component-first frontend framework for reactive, modular web applications that stay clear.",
};

const learnRouteMeta = {
  title: "Learn",
  description:
    "Choose the right KoppaJS learning path: installation, first Component, core concepts, examples, and docs.",
};

const notFoundRouteMeta = {
  title: "Not Found",
  description: "Fallback page for unknown routes on the KoppaJS website.",
};

export const buildPageTitle = (pageTitle: string): string =>
  `${siteMeta.brand} · ${pageTitle}`;

export const getSiteRouteMeta = (
  path: string,
): { title: string; description: string } => {
  if (path === "/") {
    return {
      title: buildPageTitle(homeRouteMeta.title),
      description: homeRouteMeta.description,
    };
  }

  if (path === "/learn") {
    return {
      title: buildPageTitle(learnRouteMeta.title),
      description: learnRouteMeta.description,
    };
  }

  const page = sitePageMap.get(path);

  if (page) {
    return {
      title: buildPageTitle(page.title),
      description: page.description,
    };
  }

  return {
    title: buildPageTitle(notFoundRouteMeta.title),
    description: notFoundRouteMeta.description,
  };
};
