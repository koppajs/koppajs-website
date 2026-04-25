import { ecosystemPackages } from "koppajs-documentation/ecosystem";

export type SiteAction = {
  readonly label: string;
  readonly path: string;
  readonly variant?: "primary" | "secondary";
  readonly isDocsPath?: boolean;
};

export type SitePageDefinition = {
  readonly path: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly lead: string;
  readonly actions?: readonly SiteAction[];
  readonly bodyHtml: string;
};

type SiteCard = {
  readonly title: string;
  readonly body: string;
};

type SiteComparisonRow = {
  readonly framework: string;
  readonly defaultModel: string;
  readonly whatKoppaDoes: string;
  readonly bestFit: string;
};

type HomeLearningPath = {
  readonly title: string;
  readonly body: string;
  readonly path: string;
  readonly isDocsPath?: boolean;
};

type HomeShowcaseEntry = {
  readonly title: string;
  readonly body: string;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const ic = (value: string): string =>
  `<code class="koppa-inline-code">${escapeHtml(value)}</code>`;

const section = (
  eyebrow: string,
  title: string,
  lead: string,
  content: string,
): string => `
  <section class="site-page__section koppa-stack">
    <div class="site-page__section-header koppa-stack">
      <p class="koppa-eyebrow">${eyebrow}</p>
      <h2 class="site-page__section-title">${title}</h2>
      <p class="koppa-text-muted">${lead}</p>
    </div>
    ${content}
  </section>
`;

const card = (title: string, body: string, eyebrow?: string): string => `
  <article class="koppa-card koppa-card--quiet">
    ${eyebrow ? `<p class="koppa-eyebrow">${eyebrow}</p>` : ""}
    <h3>${title}</h3>
    <p class="koppa-text-muted">${body}</p>
  </article>
`;

const cardGrid = (columns: 2 | 3 | 4, items: readonly string[]): string => `
  <div class="koppa-grid koppa-grid--${columns}">
    ${items.join("\n")}
  </div>
`;

const list = (items: readonly string[], ordered = false): string => {
  const tag = ordered ? "ol" : "ul";

  return `
    <${tag} class="koppa-list koppa-text-muted">
      ${items.map((item) => `<li>${item}</li>`).join("\n")}
    </${tag}>
  `;
};

const table = (
  headers: readonly string[],
  rows: readonly (readonly string[])[],
): string => `
  <div class="koppa-table-wrap">
    <table class="koppa-table">
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
            `,
          )
          .join("\n")}
      </tbody>
    </table>
  </div>
`;

const codeBlock = (label: string, language: string, source: string): string => `
  <div class="koppa-code-block" data-language="${language}">
    <div class="koppa-code-block__header">
      <span class="koppa-code-block__label">${label}</span>
      <button type="button" class="koppa-copy-button" data-copy-state="idle">Copy</button>
    </div>
    <pre><code>${escapeHtml(source)}</code></pre>
  </div>
`;

export const whyKoppaCards = [
  {
    title: "Explicit by design",
    body: "Bootstrap, registration, routing, and documentation integration are all visible in application code.",
  },
  {
    title: "Deterministic behavior",
    body: "Route metadata, component registration, and build transformation all use narrow contracts instead of hidden conventions.",
  },
  {
    title: "Stable contracts",
    body: "Core, router, Vite plugin, and documentation each own one primary responsibility and expose a small public surface.",
  },
  {
    title: "Built to stay understandable",
    body: "The product favors readable architecture over framework spectacle, especially once the codebase lives beyond a prototype.",
  },
] as const satisfies readonly SiteCard[];

export const architectureLayers = [
  {
    title: "core",
    body: "Owns component registration, runtime boot, lifecycle, and reactive rendering.",
  },
  {
    title: "router",
    body: "Owns path matching, active-link state, browser history, redirects, and outlet rendering.",
  },
  {
    title: "plugins",
    body: "Own app-wide services or modules without bloating the runtime bootstrap surface.",
  },
  {
    title: "tooling",
    body: "Owns .kpa transformation, builds, type checking, and repository quality gates.",
  },
] as const satisfies readonly SiteCard[];

export const learningPaths = [
  {
    title: "Start in 15 minutes",
    body: "Install the supported baseline, inspect the starter, and render a first component.",
    path: "/getting-started",
    isDocsPath: true,
  },
  {
    title: "Understand architecture",
    body: "Read how the runtime, router, tooling, website shell, and docs module fit together.",
    path: "/architecture",
  },
  {
    title: "Build a real app",
    body: "Move from isolated components to routing, examples, and package boundary decisions.",
    path: "/examples",
    isDocsPath: true,
  },
] as const satisfies readonly HomeLearningPath[];

export const comparisonRows = [
  {
    framework: "React",
    defaultModel:
      "Library-first, ecosystem-heavy, architecture often assembled from adjacent tools.",
    whatKoppaDoes:
      "Ships a smaller runtime model and a narrower official package set with fewer hidden architectural decisions.",
    bestFit:
      "Teams that want less assembly and a more inspectable default shape.",
  },
  {
    framework: "Vue",
    defaultModel:
      "Integrated component model with strong conventions and a larger built-in story.",
    whatKoppaDoes:
      "Keeps the public surface smaller and pushes more responsibility into explicit app-owned bootstrap files.",
    bestFit:
      "Teams that prefer fewer conventions and tighter package boundaries.",
  },
  {
    framework: "Angular",
    defaultModel:
      "Comprehensive platform with a large official surface and more framework-owned structure.",
    whatKoppaDoes:
      "Uses a much smaller mental model, browser-first routing, and a lighter package graph.",
    bestFit: "Teams that want less platform weight and more direct control.",
  },
  {
    framework: "Lit",
    defaultModel:
      "Low-level Web Components primitives with more application structure left to the user.",
    whatKoppaDoes:
      "Adds a clearer application model around .kpa files, bootstrapping, and official routing/tooling.",
    bestFit:
      "Teams that like Web Components but want a stronger product-shaped baseline.",
  },
] as const satisfies readonly SiteComparisonRow[];

export const showcaseEntries = [
  {
    title: "Internal operations surfaces",
    body: "Admin and workflow tools where explicit routing, readable state updates, and maintainable bootstrap code matter more than trend alignment.",
  },
  {
    title: "Long-lived documentation and portal apps",
    body: "Products that benefit from a stable layout shell, deterministic navigation, and first-class code examples in the UI.",
  },
  {
    title: "Focused browser applications",
    body: "Apps that do not need a large plugin marketplace, but do need understandable component boundaries and predictable builds.",
  },
] as const satisfies readonly HomeShowcaseEntry[];

export const stabilityPoints = [
  "Semantic versioning is part of the product trust surface, not release decoration.",
  "Repository-local quality gates exist across typechecking, unit tests, browser tests, and build output.",
  "Route tables, metadata, and docs integration are explicit rather than inferred.",
  "The public packages are narrow enough to version and review deliberately.",
] as const;

export const aboutStatements = [
  "KoppaJS exists for teams that want direct control over frontend architecture without building everything from raw browser primitives.",
  "The project favors explicit seams, small contracts, and deterministic structure over marketing-friendly abstraction.",
  "The goal is not minimalism as an aesthetic. The goal is a codebase that remains legible under maintenance pressure.",
] as const;

const ecosystemRows = ecosystemPackages.map((item) => [
  ic(item.name),
  item.role,
  item.summary,
]);

export const sitePages = [
  {
    path: "/architecture",
    label: "Architecture",
    title: "Architecture",
    description:
      "System layers, ownership boundaries, and the contract between the website shell and the documentation module.",
    eyebrow: "Architecture",
    headline:
      "The system stays calm because each layer owns a specific concern.",
    lead: "KoppaJS is not presented as a monolith. The public website explains the product, the documentation app teaches it, and the packages keep runtime, routing, and build responsibilities separate.",
    actions: [
      {
        label: "Read the Docs",
        path: "/overview",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "View Packages", path: "/ecosystem" },
    ],
    bodyHtml: [
      section(
        "System Layers",
        "The architecture is modular by design.",
        "Each major layer is small enough to explain directly and stable enough to review independently.",
        cardGrid(
          4,
          architectureLayers.map((layer) =>
            card(layer.title, layer.body, "Layer"),
          ),
        ),
      ),
      section(
        "Assembly Contract",
        "The website imports the documentation contract directly.",
        "That keeps one route model, one metadata model, and one navigation source instead of parallel website-owned documentation logic.",
        codeBlock(
          "website/main.ts",
          "ts",
          [
            "import {",
            "  getDocumentationRouteMeta,",
            "  installDocumentationRouteMap,",
            "  registerDocumentation,",
            '} from "koppajs-documentation";',
            "",
            "registerDocumentation();",
            "installDocumentationRouteMap({",
            '  basePath: "/docs",',
            '  pathStyle: "nested",',
            "});",
          ].join("\n"),
        ),
      ),
      section(
        "Ownership Map",
        "The product stays coherent because ownership is explicit.",
        "The website presents KoppaJS as a product. The documentation package teaches it. Neither side should silently absorb the other's responsibility.",
        table(
          ["Concern", "Website", "Documentation package"],
          [
            [
              "Public product routes",
              "Owns marketing-neutral product pages such as /, /learn, /architecture, and /about.",
              "Does not redefine them.",
            ],
            [
              "Documentation route tree",
              "Consumes generated docs routes under /docs.",
              "Exports route generation, route metadata, and navigation structure.",
            ],
            [
              "Documentation navigation",
              "Reads exported navigation items.",
              "Owns labels, hierarchy, and page ordering.",
            ],
            [
              "Visual system",
              "Imports shared theme tokens and package data.",
              "Publishes the reusable theme foundation and shared docs UI contract.",
            ],
          ],
        ),
      ),
      section(
        "Request Flow",
        "A route moves through a visible chain of responsibility.",
        "You should be able to point at each step in code: route creation, metadata lookup, component registration, and final rendering.",
        list(
          [
            "The website route table matches either a website-owned page or a documentation route generated by the documentation package.",
            "The runtime registers website components and documentation components separately before the router renders anything.",
            "Metadata comes from website route definitions or from getDocumentationRouteMeta(...) depending on the current path.",
            "The final page renders inside the website shell or the standalone documentation shell without duplicating documentation ownership.",
          ],
          true,
        ),
      ),
    ].join("\n"),
  },
  {
    path: "/ecosystem",
    label: "Ecosystem",
    title: "Ecosystem",
    description:
      "Official package map for KoppaJS: runtime, router, Vite plugin, and documentation as one coherent product system.",
    eyebrow: "Ecosystem",
    headline: "A small package set with clear ownership boundaries.",
    lead: "The official ecosystem is intentionally narrow. Each package exists for a reason, and the boundaries are part of what makes the system maintainable.",
    actions: [
      {
        label: "Package Docs",
        path: "/packages",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "Read Architecture", path: "/architecture" },
    ],
    bodyHtml: [
      section(
        "Official Packages",
        "These are the maintained product surfaces.",
        "The goal is not ecosystem size. The goal is a package graph that remains inspectable and stable.",
        cardGrid(
          2,
          ecosystemPackages.map((item) =>
            card(
              item.name,
              `${item.summary} ${item.installCommand ? `Install with ${ic(item.installCommand)}.` : ""}`,
              item.role,
            ),
          ),
        ),
      ),
      section(
        "Responsibilities",
        "The package split is part of the architecture.",
        "You should be able to explain why each package is installed by reading the manifest and the route or build setup.",
        table(["Package", "Role", "Why it exists"], ecosystemRows),
      ),
      section(
        "Adoption Path",
        "Add packages when the product boundary becomes real.",
        "The narrow package graph is useful only if applications introduce packages deliberately instead of defaulting to the whole stack at once.",
        table(
          ["Application shape", "Packages", "Reason"],
          [
            [
              "Single routed-less surface",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-vite-plugin")}`,
              "Enough to register components, transform .kpa files, and ship one explicit browser surface.",
            ],
            [
              "Route-based product",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-router")} + ${ic("@koppajs/koppajs-vite-plugin")}`,
              "Adds deterministic navigation, deep links, redirects, and outlet rendering without expanding the runtime contract.",
            ],
            [
              "Public product with integrated docs",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-router")} + ${ic("@koppajs/koppajs-vite-plugin")} + ${ic("koppajs-documentation")}`,
              "Extends the product with a standalone and embeddable documentation surface that still keeps ownership separate.",
            ],
          ],
        ),
      ),
      section(
        "Selection Discipline",
        "Introduce packages when the application boundary demands them.",
        "A team should be able to justify every official package in use with one short sentence.",
        list([
          `${ic("@koppajs/koppajs-core")} is the runtime baseline.`,
          `${ic("@koppajs/koppajs-router")} becomes relevant when routes, deep links, redirects, or fallback pages are product requirements.`,
          `${ic("@koppajs/koppajs-vite-plugin")} owns .kpa transformation and should stay the only build-time owner of that concern.`,
          `${ic("koppajs-documentation")} owns the public docs surface and the website embed contract.`,
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/showcase",
    label: "Showcase",
    title: "Showcase",
    description:
      "Realistic KoppaJS use cases and product surfaces where explicit architecture and a small mental model are practical advantages.",
    eyebrow: "Showcase",
    headline:
      "KoppaJS is built for serious browser surfaces, not novelty demos.",
    lead: "The product is best understood through realistic application categories rather than fake company logos or decorative landing-page demos.",
    actions: [
      {
        label: "View Examples",
        path: "/examples",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "Learn Architecture", path: "/architecture" },
    ],
    bodyHtml: [
      section(
        "Where It Fits",
        "These are the kinds of products the architecture is shaped for.",
        "The common thread is not industry. It is the need for stable boundaries and explicit ownership in the browser layer.",
        cardGrid(
          3,
          showcaseEntries.map((item) =>
            card(item.title, item.body, "Use case"),
          ),
        ),
      ),
      section(
        "Reference Surfaces",
        "The examples are realistic because the requirements are realistic.",
        "KoppaJS is most useful when the browser layer needs to stay comprehensible under release pressure, not just during the first demo.",
        table(
          ["Surface", "Why KoppaJS fits", "Typical package set"],
          [
            [
              "Operations console",
              "Route ownership, readable state updates, and direct component boundaries matter more than ecosystem breadth.",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-router")} + ${ic("@koppajs/koppajs-vite-plugin")}`,
            ],
            [
              "Documentation or portal product",
              "Navigation, code examples, and stable content structure benefit from the documentation embed contract.",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-router")} + ${ic("@koppajs/koppajs-vite-plugin")} + ${ic("koppajs-documentation")}`,
            ],
            [
              "Focused workflow dashboard",
              "Long-lived business logic benefits from a smaller mental model and deterministic builds.",
              `${ic("@koppajs/koppajs-core")} + ${ic("@koppajs/koppajs-router")} + ${ic("@koppajs/koppajs-vite-plugin")}`,
            ],
          ],
        ),
      ),
      section(
        "What These Surfaces Have In Common",
        "The fit is architectural, not aesthetic.",
        "These projects usually benefit from direct control over route definitions, build behavior, and component boundaries.",
        list([
          "A route map that should remain easy to audit.",
          "A repository that values CI, explicit versioning, and deterministic builds.",
          "A team that prefers visible contracts over framework-owned hidden behavior.",
        ]),
      ),
      section(
        "Non-Goals",
        "The product is intentionally not shaped for every frontend problem.",
        "That restraint keeps the ecosystem smaller and the defaults easier to reason about.",
        list([
          "Large plugin-marketplace strategies where a framework is expected to solve every adjacent concern.",
          "SSR-first application architectures that require a server rendering contract the current runtime does not claim to provide.",
          "Brand-heavy marketing microsites where animation density matters more than inspectable application structure.",
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/about",
    label: "About",
    title: "About",
    description:
      "Why KoppaJS exists, what kind of engineering it values, and what the project is trying to protect in frontend architecture.",
    eyebrow: "About",
    headline:
      "KoppaJS exists to keep frontend architecture inspectable under real maintenance pressure.",
    lead: "The project is built around a calm idea: browser applications should not become harder to understand just because the tooling or framework layer becomes more capable.",
    actions: [
      {
        label: "Read the Docs",
        path: "/overview",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "Support the Project", path: "/support" },
    ],
    bodyHtml: [
      section(
        "Why The Project Exists",
        "The product is shaped by long-term maintainability concerns.",
        "KoppaJS exists for teams that do not want to trade readability away when the application starts to matter.",
        list(aboutStatements, true),
      ),
      section(
        "What The Project Optimizes For",
        "The priorities are architectural before they are cosmetic.",
        "The result should feel precise, structured, stable, and deliberate rather than feature-stacked or noisy.",
        cardGrid(3, [
          card(
            "Explicit structure",
            "Route metadata, component registration, and docs integration should remain visible in code.",
            "Value",
          ),
          card(
            "Deterministic behavior",
            "The same inputs should produce the same route, build, and rendering outcomes.",
            "Value",
          ),
          card(
            "Calm architecture",
            "The codebase should still be explainable after multiple releases and team changes.",
            "Value",
          ),
        ]),
      ),
      section(
        "Non-Goals",
        "The project protects clarity by refusing a few common framework instincts.",
        "KoppaJS is easier to understand precisely because it does not try to become an all-encompassing platform.",
        list([
          "It does not hide bootstrap, routing, or documentation registration behind generated conventions.",
          "It does not expand the public package set unless the responsibility split is clear and durable.",
          "It does not optimize for novelty demos that rely on spectacle more than maintainable structure.",
        ]),
      ),
      section(
        "Maintenance Discipline",
        "Long-term readability requires operational discipline, not just a design philosophy.",
        "The framework only stays trustworthy if contracts, documentation, and releases are treated as product surfaces.",
        table(
          ["Area", "Commitment"],
          [
            [
              "Public API",
              "Keep the top-level surface small and version changes deliberately under semver.",
            ],
            [
              "Documentation",
              "Treat docs navigation, route metadata, and examples as canonical system behavior, not secondary content.",
            ],
            [
              "Build layer",
              "Keep .kpa transformation inside one explicit Vite plugin boundary instead of scattering build behavior.",
            ],
            [
              "Quality gates",
              "Use type checks, tests, and production build validation to protect the visible contract.",
            ],
          ],
        ),
      ),
    ].join("\n"),
  },
  {
    path: "/support",
    label: "Support",
    title: "Support",
    description:
      "How to support KoppaJS through usage, contracts, documentation, tests, and direct funding for maintenance work.",
    eyebrow: "Support",
    headline: "A small ecosystem stays healthy through deliberate backing.",
    lead: "Support is not framed as hype. It is about funding the work that keeps a small framework credible: examples, tests, docs, release discipline, and issue triage.",
    actions: [
      {
        label: "Open GitHub",
        path: "https://github.com/koppajs",
        variant: "primary",
      },
      { label: "Read the Docs", path: "/overview", isDocsPath: true },
    ],
    bodyHtml: [
      section(
        "Support Lanes",
        "There are several ways to make the ecosystem stronger.",
        "The best form of support depends on whether you are a user, maintainer, or organization evaluating KoppaJS for real product work.",
        cardGrid(3, [
          card(
            "Use it deliberately",
            "Production use on a focused surface is the strongest feedback signal for architecture and docs.",
            "Lane",
          ),
          card(
            "Tighten contracts",
            "Issues, docs fixes, and test improvements help the ecosystem more than vague encouragement.",
            "Lane",
          ),
          card(
            "Fund maintenance",
            "Direct support creates time for documentation, CI hardening, release discipline, and package stability work.",
            "Lane",
          ),
        ]),
      ),
      section(
        "Contribution Standard",
        "Useful support is concrete.",
        "Small ecosystems improve fastest when issues, pull requests, and architecture proposals are specific enough to act on immediately.",
        list([
          "Report bugs with repository, browser, version, and reproduction details instead of generic symptoms.",
          "Treat missing examples and unclear documentation as first-class product defects.",
          "Propose contract changes with ownership, migration impact, and package boundaries stated explicitly.",
        ]),
      ),
      section(
        "What Support Funds",
        "Maintenance work is product work.",
        "In a small ecosystem, documentation depth, CI coverage, and release discipline are part of the product trust surface.",
        table(
          ["Area", "Why it matters"],
          [
            [
              "Documentation depth",
              "Keeps onboarding, examples, and API reference aligned with the real public contract.",
            ],
            [
              "Test and CI coverage",
              "Protects route behavior, embeddable docs behavior, and deterministic production builds.",
            ],
            [
              "Maintenance time",
              "Supports issue triage, semver review, dependency updates, and product-quality examples.",
            ],
          ],
        ),
      ),
      section(
        "Current Official Paths",
        "The public coordination surface is intentionally simple.",
        "Until a deployment publishes additional official support channels, the repositories remain the canonical public entry point.",
        list([
          'Use <a class="koppa-link" href="https://github.com/koppajs" target="_blank" rel="noreferrer">github.com/koppajs</a> and repository issues for public coordination.',
          "Use pull requests for documentation fixes, example updates, and contract clarifications.",
          "Treat any deployment-specific funding or support links as official only when they are published directly by the deployment operator.",
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/impressum",
    label: "Impressum",
    title: "Impressum",
    description:
      "Current project and contact information available inside the KoppaJS repositories for the public website surface.",
    eyebrow: "Impressum",
    headline: "Project notice for the current open-source website surface.",
    lead: "The repositories identify KoppaJS as the public project surface and Bastian Bensch as the named maintainer on multiple maintained repositories. Public project contact currently happens through the official GitHub organization and repository issue trackers.",
    bodyHtml: [
      section(
        "Project Surface",
        "This website represents the KoppaJS open-source project.",
        "The maintained repositories describe the project under the KoppaJS name and use Bastian Bensch as the named author or copyright holder in multiple official repositories.",
        list([
          "Project: KoppaJS",
          "Maintainer named in official repositories: Bastian Bensch",
          'Public contact and issue intake: <a class="koppa-link" href="https://github.com/koppajs" target="_blank" rel="noreferrer">github.com/koppajs</a>',
        ]),
      ),
      section(
        "Scope Of This Notice",
        "This route documents the information currently present in the maintained project repositories.",
        "If this application is deployed on a domain with additional legal operator requirements, that domain operator must add the legally required operator details for that deployment.",
        list([
          "No commercial storefront is implemented in the current website codebase.",
          "No user account system or submission form is implemented in the current website codebase.",
          "External repository links point to GitHub-hosted project surfaces.",
        ]),
      ),
      section(
        "Repository Boundary",
        "The repository implementation and the deployed operator are separate concerns.",
        "This source tree describes the current open-source product surface. A deployment may carry additional legal or operational obligations that are outside the repository itself.",
        table(
          ["Surface", "Current repository statement"],
          [
            [
              "Open-source project",
              "Identified as KoppaJS with public repository contact through the GitHub organization.",
            ],
            [
              "Commercial processing",
              "No storefront, checkout flow, or paid account flow is implemented in the current codebase.",
            ],
            [
              "Deployment operator",
              "Must publish domain-specific operator details when the actual deployment requires them.",
            ],
          ],
        ),
      ),
    ].join("\n"),
  },
  {
    path: "/datenschutz",
    label: "Datenschutz",
    title: "Datenschutz",
    description:
      "Privacy summary for the current KoppaJS website codebase and its implemented browser behavior.",
    eyebrow: "Datenschutz",
    headline: "Privacy summary for the current static website implementation.",
    lead: "The website codebase is a client-side application shell. The current implementation does not ship analytics, cookies, account flows, or form submissions. Normal web hosting logs may still exist at the deployment layer.",
    bodyHtml: [
      section(
        "Application Behavior",
        "This is what the current codebase does.",
        "The privacy surface should describe implemented behavior, not speculative future integrations.",
        list([
          "No analytics scripts are included in the application source.",
          "No cookie banner or cookie-setting client logic is present in the application source.",
          "No account registration, login, or profile collection flow is present in the application source.",
          "Navigation is handled client-side through the browser history and route state only.",
        ]),
      ),
      section(
        "Deployment Layer",
        "Normal hosting behavior is outside the SPA source but still relevant in production.",
        "Static hosting platforms typically generate server or CDN logs. If the site is deployed with additional services such as analytics, donation tooling, or embeds, those services must be documented by the actual operator of that deployment.",
        list([
          "Review your hosting provider's server-log and CDN behavior.",
          "Document any third-party embeds or payment links added during deployment.",
          "Update the legal notice when the deployed surface diverges from the repository implementation.",
        ]),
      ),
      section(
        "When This Notice Must Change",
        "The privacy notice should change when behavior changes.",
        "A calm privacy surface lists implemented behavior only. New integrations must not remain implicit.",
        table(
          ["Change", "Documentation impact"],
          [
            [
              "Analytics or telemetry added",
              "Document provider, data categories, retention, and any consent requirements.",
            ],
            [
              "Forms, accounts, or payments added",
              "Document collected fields, legal basis, processors, and user rights handling.",
            ],
            [
              "Third-party embeds introduced",
              "Document which external services receive browser requests and why they are necessary.",
            ],
          ],
        ),
      ),
    ].join("\n"),
  },
] as const satisfies readonly SitePageDefinition[];

export const sitePageMap = new Map(
  sitePages.map((page) => [page.path, page]),
) as Map<string, SitePageDefinition>;
