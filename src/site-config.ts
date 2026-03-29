export const siteMeta = {
  brand: "KoppaJS",
  tagline:
    "Explicit frontend architecture for teams that want to stay in control.",
  websiteRepoUrl: "https://github.com/koppajs/koppajs-website",
  docsUrl: "https://github.com/koppajs/koppajs-documentation",
  starterUrl: "https://github.com/koppajs/create-koppajs",
  githubOrgUrl: "https://github.com/koppajs",
} as const;

export const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Ecosystem", path: "/ecosystem" },
  { label: "Philosophy", path: "/philosophy" },
  { label: "Start", path: "/start" },
  { label: "Support", path: "/support" },
] as const;

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
      "Keeps detailed package and framework documentation outside the marketing surface.",
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

export const routeCopy = {
  home: {
    title: "Marketing Website",
    description:
      "Official KoppaJS website for ecosystem positioning, philosophy, and support paths.",
  },
  ecosystem: {
    title: "Ecosystem",
    description:
      "Official package landscape and how the KoppaJS pieces fit together.",
  },
  philosophy: {
    title: "Philosophy",
    description:
      "Why KoppaJS favors explicit contracts, readable systems, and deliberate scope.",
  },
  start: {
    title: "Start",
    description: "Adoption guidance for teams evaluating and piloting KoppaJS.",
  },
  support: {
    title: "Support",
    description:
      "Contribution and funding paths for teams that want the KoppaJS ecosystem to grow.",
  },
  notFound: {
    title: "Not Found",
    description:
      "Fallback page for unmatched routes on the official KoppaJS website.",
  },
} as const;

export const buildPageTitle = (pageTitle: string): string =>
  `${siteMeta.brand} · ${pageTitle}`;
