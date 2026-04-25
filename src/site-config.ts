import { sitePageMap } from "./site-content";

export const siteMeta = {
  brand: "KoppaJS",
  tagline: "Build interfaces without hidden magic.",
  logoTextSrc: "/koppajs-logo-text.png",
  logoIconSrc: "/koppajs-logo-icon.png",
  githubLabel: "GitHub",
  supportLabel: "Support",
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
  { label: "Docs", path: "/docs", kind: "docs" },
  { label: "Architecture", path: "/architecture", kind: "internal" },
  { label: "Ecosystem", path: "/ecosystem", kind: "internal" },
  { label: "Showcase", path: "/showcase", kind: "internal" },
  { label: "About", path: "/about", kind: "internal" },
  { label: "Get Started", path: "/learn", kind: "cta" },
] as const satisfies readonly PrimaryNavigationItem[];

export const footerNavigation = [
  { label: "Home", path: "/" },
  { label: "Learn", path: "/learn" },
  { label: "Architecture", path: "/architecture" },
  { label: "Ecosystem", path: "/ecosystem" },
  { label: "Showcase", path: "/showcase" },
  { label: "About", path: "/about" },
  { label: "Support", path: "/support" },
  { label: "Impressum", path: "/impressum" },
  { label: "Datenschutz", path: "/datenschutz" },
] as const;

const homeRouteMeta = {
  title: "Home",
  description:
    "The official KoppaJS website: product positioning, architecture, package boundaries, and the embedded documentation system.",
};

const learnRouteMeta = {
  title: "Learn",
  description:
    "Entry paths into the KoppaJS documentation system, from first install to architecture and real application composition.",
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
