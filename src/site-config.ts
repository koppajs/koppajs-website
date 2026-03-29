import {
  defaultKoppaLocale,
  getKoppaLocale,
  normalizeKoppaLocale,
  type KoppaLocale,
} from "koppajs-documentation/i18n";

export const siteMeta = {
  brand: "KoppaJS",
  tagline:
    "Explicit frontend architecture for teams that want to stay in control.",
  websiteRepoUrl: "https://github.com/koppajs/koppajs-website",
  docsUrl: "https://github.com/koppajs/koppajs-documentation",
  starterUrl: "https://github.com/koppajs/create-koppajs",
  githubOrgUrl: "https://github.com/koppajs",
} as const;

const navigationItemsByLocale = {
  en: [
    { label: "Home", path: "/" },
    { label: "Philosophy", path: "/philosophy" },
    { label: "About", path: "/about" },
    { label: "Ecosystem", path: "/ecosystem" },
    { label: "Blog", path: "/blog" },
  ],
  de: [
    { label: "Start", path: "/" },
    { label: "Philosophie", path: "/philosophy" },
    { label: "Über", path: "/about" },
    { label: "Ökosystem", path: "/ecosystem" },
    { label: "Blog", path: "/blog" },
  ],
} as const satisfies Record<
  KoppaLocale,
  readonly { label: string; path: string }[]
>;

export const getNavigationItems = (
  locale: KoppaLocale = defaultKoppaLocale,
) => navigationItemsByLocale[normalizeKoppaLocale(locale)];

export const navigationItems = getNavigationItems();

const siteChromeCopyByLocale = {
  en: {
    headerCaption: "",
    docsLabel: "Docs",
    supportLabel: "Support",
    privacyLabel: "Privacy",
    imprintLabel: "Imprint",
    footerHeading: "Built for teams that want clarity they can maintain.",
    footerCopy:
      "The official site should explain what KoppaJS is, why it exists, how the ecosystem fits together, and where deeper docs or support belong.",
    footerPrimaryCta: "What is KoppaJS?",
    footerSecondaryCta: "Support the ecosystem",
    footerNavigateLabel: "Navigate",
    footerPackagesLabel: "Official packages",
    footerFundingLabel: "What support funds",
    footerFundingCopy:
      "Reference apps, docs, examples, tests, and the steady release discipline that makes a small ecosystem trustworthy.",
    footerLanguageLabel: "Language",
  },
  de: {
    headerCaption: "",
    docsLabel: "Docs",
    supportLabel: "Support",
    privacyLabel: "Datenschutz",
    imprintLabel: "Impressum",
    footerHeading: "Für Teams gebaut, die Klarheit langfristig tragen wollen.",
    footerCopy:
      "Die offizielle Website soll erklären, was KoppaJS ist, warum es existiert, wie das Ökosystem zusammenhängt und wo tiefere Docs oder Support hingehören.",
    footerPrimaryCta: "Was ist KoppaJS?",
    footerSecondaryCta: "Ökosystem unterstützen",
    footerNavigateLabel: "Navigation",
    footerPackagesLabel: "Offizielle Pakete",
    footerFundingLabel: "Was Support finanziert",
    footerFundingCopy:
      "Referenz-Apps, Docs, Beispiele, Tests und die konstante Release-Disziplin, die ein kleines Ökosystem vertrauenswürdig macht.",
    footerLanguageLabel: "Sprache",
  },
} as const;

export const getSiteChromeCopy = (
  locale: KoppaLocale = getKoppaLocale(),
) => siteChromeCopyByLocale[normalizeKoppaLocale(locale)];

export const ecosystemPackages = [
  {
    name: "@koppajs/koppajs-core",
    role: "Runtime",
    href: "https://github.com/koppajs/koppajs-core",
    summary:
      "Registers components, executes controllers, and keeps rendering explicit.",
  },
  {
    name: "@koppajs/koppajs-vite-plugin",
    role: "Build pipeline",
    href: "https://github.com/koppajs/koppajs-vite-plugin",
    summary:
      "Compiles `.kpa` files into modules the runtime can execute and inspect.",
  },
  {
    name: "@koppajs/koppajs-router",
    role: "Navigation",
    href: "https://github.com/koppajs/koppajs-router",
    summary:
      "Owns route resolution, active links, and History API behavior without hidden magic.",
  },
  {
    name: "create-koppajs",
    role: "Onboarding",
    href: "https://github.com/koppajs/create-koppajs",
    summary: "Gets new projects to a working KoppaJS baseline quickly.",
  },
  {
    name: "koppajs-documentation",
    role: "Deep reference",
    href: "https://github.com/koppajs/koppajs-documentation",
    summary:
      "Ships the versioned documentation surface that can run standalone or be embedded into the official website.",
  },
] as const;

export const supportLanes = [
  {
    title: "Use it on a focused surface",
    emphasis: "Production use is the strongest validation signal.",
    action:
      "Pilot KoppaJS where explicit control matters more than framework fashion.",
  },
  {
    title: "Contribute contracts and examples",
    emphasis: "Better examples and sharper contracts make adoption easier.",
    action: "Open issues, refine docs, and tighten tests across the ecosystem.",
  },
  {
    title: "Fund roadmap work",
    emphasis: "Financial support buys maintainable time, not vanity velocity.",
    action:
      "Back the work that makes the ecosystem more approachable and more stable.",
  },
] as const;

const routeCopyByLocale = {
  en: {
    home: {
      title: "Home",
      description:
        "Landing page for the official KoppaJS website.",
    },
    philosophy: {
      title: "Philosophy",
      description:
        "Why KoppaJS exists, which principles shape it, and where it draws boundaries.",
    },
    about: {
      title: "About",
      description:
        "What KoppaJS is, what it is built for, and where the project may go next.",
    },
    ecosystem: {
      title: "Ecosystem",
      description:
        "Official package landscape and how the KoppaJS pieces fit together.",
    },
    blog: {
      title: "Blog",
      description:
        "Articles, release notes, and architecture writing around KoppaJS.",
    },
    support: {
      title: "Support",
      description:
        "Contribution and funding paths for teams that want the KoppaJS ecosystem to grow.",
    },
    privacy: {
      title: "Privacy",
      description:
        "Privacy information for the KoppaJS website.",
    },
    imprint: {
      title: "Imprint",
      description:
        "Provider and contact information for the KoppaJS website.",
    },
    notFound: {
      title: "Not Found",
      description:
        "Fallback page for unmatched routes on the official KoppaJS website.",
    },
  },
  de: {
    home: {
      title: "Startseite",
      description:
        "Landingpage der offiziellen KoppaJS-Website.",
    },
    philosophy: {
      title: "Philosophie",
      description:
        "Warum KoppaJS existiert, welche Grundsätze es prägen und wo die Grenzen bewusst gezogen werden.",
    },
    about: {
      title: "Über",
      description:
        "Was KoppaJS ist, wofür es gedacht ist und wohin sich das Projekt entwickeln könnte.",
    },
    ecosystem: {
      title: "Ökosystem",
      description:
        "Die offiziellen Pakete und wie die Teile von KoppaJS zusammenpassen.",
    },
    blog: {
      title: "Blog",
      description:
        "Artikel, Release-Notizen und Architekturtexte rund um KoppaJS.",
    },
    support: {
      title: "Support",
      description:
        "Beitrags- und Finanzierungswege für Teams, die das KoppaJS-Ökosystem wachsen sehen wollen.",
    },
    privacy: {
      title: "Datenschutz",
      description:
        "Datenschutzhinweise für die KoppaJS-Website.",
    },
    imprint: {
      title: "Impressum",
      description:
        "Anbieter- und Kontaktinformationen für die KoppaJS-Website.",
    },
    notFound: {
      title: "Nicht gefunden",
      description:
        "Fallback-Seite für unbekannte Routen auf der offiziellen KoppaJS-Website.",
    },
  },
} as const;

export const getRouteCopy = (
  locale: KoppaLocale = getKoppaLocale(),
) => routeCopyByLocale[normalizeKoppaLocale(locale)];

export const routeCopy = getRouteCopy();

export const buildPageTitle = (pageTitle: string): string =>
  `${siteMeta.brand} · ${pageTitle}`;

export const getSiteRouteMeta = (
  path: string,
  locale: KoppaLocale = getKoppaLocale(),
): { title: string; description: string } => {
  const copy = getRouteCopy(locale);

  switch (path) {
    case "/":
      return {
        title: buildPageTitle(copy.home.title),
        description: copy.home.description,
      };
    case "/philosophy":
      return {
        title: buildPageTitle(copy.philosophy.title),
        description: copy.philosophy.description,
      };
    case "/about":
      return {
        title: buildPageTitle(copy.about.title),
        description: copy.about.description,
      };
    case "/ecosystem":
      return {
        title: buildPageTitle(copy.ecosystem.title),
        description: copy.ecosystem.description,
      };
    case "/blog":
      return {
        title: buildPageTitle(copy.blog.title),
        description: copy.blog.description,
      };
    case "/support":
      return {
        title: buildPageTitle(copy.support.title),
        description: copy.support.description,
      };
    case "/datenschutz":
      return {
        title: buildPageTitle(copy.privacy.title),
        description: copy.privacy.description,
      };
    case "/impressum":
      return {
        title: buildPageTitle(copy.imprint.title),
        description: copy.imprint.description,
      };
    default:
      return {
        title: buildPageTitle(copy.notFound.title),
        description: copy.notFound.description,
      };
  }
};
