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
  readonly icon?: "runtime" | "elements" | "build" | "extensions";
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

const card = (
  title: string,
  body: string,
  eyebrow?: string,
  footer?: string,
): string => `
  <article class="koppa-card koppa-card--quiet">
    ${eyebrow ? `<p class="koppa-eyebrow">${eyebrow}</p>` : ""}
    <h3>${title}</h3>
    <p class="koppa-text-muted">${body}</p>
    ${footer ? `<div>${footer}</div>` : ""}
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

export const homeProductCards = [
  {
    title: "Core Runtime",
    body: "Runs component registration, reactive state, lifecycle, rendering, and DOM reconciliation in a small browser runtime.",
    icon: "runtime",
  },
  {
    title: "Custom Elements",
    body: "Registers Components as native custom elements so lifecycle and ownership stay close to the browser platform.",
    icon: "elements",
  },
  {
    title: "Vite Build Plugin",
    body: "Turns .kpa files into runtime-ready modules with script, style, dependency loading, and identity attributes prepared ahead of time.",
    icon: "build",
  },
  {
    title: "Extensions",
    body: "Plugins and modules add focused capabilities around the core without turning every app into an all-in-one stack.",
    icon: "extensions",
  },
] as const satisfies readonly SiteCard[];

export const homePromiseCards = [
  {
    title: "Component-first",
    body: "Build interfaces from small, local units instead of scattering behavior across the app.",
  },
  {
    title: "Modular",
    body: "Use the runtime, router, tooling, and docs surfaces as separate pieces with clear jobs.",
  },
  {
    title: "Reduced",
    body: "A smaller public surface means fewer surprises, less drift, and code that remains easier to review.",
  },
  {
    title: "Low-overhead",
    body: "The runtime avoids a virtual DOM layer and keeps .kpa parsing, TypeScript, Sass, and custom-element identity attributes in the build pipeline.",
  },
] as const satisfies readonly SiteCard[];

export const homePerformanceCards = [
  {
    title: "Less runtime overhead",
    body: "Core focuses on custom element registration, reactive updates, event binding, lifecycle, and DOM reconciliation.",
  },
  {
    title: "Local component ownership",
    body: "Template, controller, and style blocks stay together in .kpa files before the Vite plugin emits runtime-ready modules.",
  },
  {
    title: "Build-time clarity",
    body: "The Vite plugin owns .kpa parsing, TS transpilation, Sass compilation, import dependency loaders, and custom-element identity attributes.",
  },
] as const satisfies readonly SiteCard[];

export const architectureValueCards = [
  {
    title: "Fewer surprises",
    body: "The framework favors visible behavior over implicit flows that are hard to reason about later.",
  },
  {
    title: "Smaller runtime",
    body: "Core stays focused on component runtime behavior and leaves .kpa transformation to the Vite plugin.",
  },
  {
    title: "Clear ownership",
    body: "Components, routing, tooling, and documentation each have a job that can be understood independently.",
  },
  {
    title: "Modular growth",
    body: "Teams can add capabilities when they need them without turning every application into the full stack.",
  },
] as const satisfies readonly SiteCard[];

export const aboutStatements = [
  "KoppaJS exists for developers who want productive frontend tools without losing control of the application shape.",
  "It is built for reactive interfaces where readability, performance, and explicit behavior matter after the first release.",
  "The project treats reduction as a product decision: not less ambition, but less unnecessary surface area.",
] as const;

const ecosystemPitchByKey = new Map([
  [
    "core",
    "Start with the runtime that registers custom elements, runs component controllers, manages reactive updates, and reconciles DOM.",
  ],
  [
    "router",
    "Add routing when your product needs deterministic navigation, deep links, redirects, and application-level page flow.",
  ],
  [
    "vite-plugin",
    "Use the Vite plugin to parse .kpa files, compile TS/Sass where needed, inject custom-element identity attributes, and emit runtime-ready modules.",
  ],
  [
    "documentation",
    "Use the documentation package when you want the official docs experience as a standalone app or embedded product surface.",
  ],
] as const);

export const sitePages = [
  {
    path: "/architecture",
    label: "Architecture",
    title: "Architecture",
    description:
      "Why KoppaJS architecture stays small, explicit, component-first, and practical for reactive frontend applications.",
    eyebrow: "Architecture",
    headline: "Architecture that keeps frontend work understandable.",
    lead: "KoppaJS is designed around a simple product promise: build reactive web applications without letting the framework become the hardest part to understand.",
    actions: [
      {
        label: "Read Architecture Docs",
        path: "/architecture",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "Explore Ecosystem", path: "/ecosystem" },
    ],
    bodyHtml: [
      section(
        "Product Value",
        "Less magic. More control.",
        "The architecture is intentionally visible so teams can understand what runs, what builds, and where responsibilities live.",
        cardGrid(
          4,
          architectureValueCards.map((item) =>
            card(item.title, item.body, "Benefit"),
          ),
        ),
      ),
      section(
        "Component Ownership",
        "Applications stay readable when behavior has a clear home.",
        "KoppaJS puts components at the center of the application model. Structure, behavior, and reuse stay close enough to inspect instead of spreading across hidden framework layers.",
        cardGrid(3, [
          card(
            "Clear boundaries",
            "Components make product surfaces easier to divide, review, and evolve.",
            "Components",
          ),
          card(
            "Local reasoning",
            "Developers can follow behavior from the component outward before reaching for broader application concerns.",
            "Components",
          ),
          card(
            "Long-term shape",
            "The architecture helps applications remain explainable as screens, routes, and teams grow.",
            "Components",
          ),
        ]),
      ),
      section(
        "Runtime And Build-Time",
        "The right work happens in the right place.",
        "KoppaJS keeps runtime behavior focused and moves .kpa transformation into explicit tooling. That separation is a practical reason the framework can stay small and predictable.",
        list([
          "Runtime registers custom elements, runs component controllers, manages reactive updates, and reconciles DOM.",
          "Build tooling handles .kpa parsing, TS transpilation, Sass compilation, and custom-element identity attributes before the browser sees the app.",
          "Routing and documentation are added as product capabilities, not hidden core weight.",
        ]),
      ),
      section(
        "Technical Depth",
        "The product site explains why. The docs explain how.",
        "If you are ready to inspect the exact contracts, route model, component lifecycle, or build pipeline, the documentation goes deeper without turning this page into an API manual.",
        cardGrid(2, [
          card(
            "Architecture docs",
            "Read the detailed model for layers, boundaries, and integration points.",
            "Documentation",
            '<a class="koppa-link" href="/docs/architecture" data-route="/docs/architecture">Open architecture docs</a>',
          ),
          card(
            "Core concepts",
            "Learn the component model, templates, reactivity, props, events, slots, and lifecycle.",
            "Documentation",
            '<a class="koppa-link" href="/docs/core-concepts" data-route="/docs/core-concepts">Open core concepts</a>',
          ),
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/ecosystem",
    label: "Ecosystem",
    title: "Ecosystem",
    description:
      "Official KoppaJS packages presented as product capabilities: runtime, routing, build tooling, and documentation.",
    eyebrow: "Ecosystem",
    headline: "Small official packages. Clear product capabilities.",
    lead: "KoppaJS keeps its ecosystem focused so teams can add only the pieces their application actually needs.",
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
        "Modular where it matters.",
        "Each official package exists to make one part of the product usable without forcing the rest of the ecosystem into every app.",
        cardGrid(
          2,
          ecosystemPackages.map((item) =>
            card(
              item.name,
              ecosystemPitchByKey.get(item.key) ?? item.summary,
              item.role,
              `<a class="koppa-link" href="${item.href}" target="_blank" rel="noreferrer">Open repository</a>`,
            ),
          ),
        ),
      ),
      section(
        "Adoption Path",
        "Start small and add capabilities deliberately.",
        "The package set is intentionally narrow. That makes it easier to understand why each dependency is present and what user-facing capability it unlocks.",
        cardGrid(3, [
          card(
            "First component",
            `${ic("@koppajs/koppajs-core")} plus ${ic("@koppajs/koppajs-vite-plugin")} is enough to start building component-based browser surfaces.`,
            "Start",
          ),
          card(
            "Routed application",
            `Add ${ic("@koppajs/koppajs-router")} when navigation, deep links, redirects, and page state become product requirements.`,
            "Grow",
          ),
          card(
            "Documented product",
            `Use ${ic("koppajs-documentation")} when a project needs a maintained documentation surface around the system.`,
            "Explain",
          ),
        ]),
      ),
      section(
        "Why A Small Ecosystem Helps",
        "A focused stack is easier to trust.",
        "KoppaJS does not try to win with a large package catalog. It aims to keep the official path understandable, installable, and easy to evaluate.",
        list([
          "Fewer official packages make the product easier to audit.",
          "Clear package roles keep runtime, routing, build, and docs concerns separate.",
          "Teams can adopt more of the stack without losing sight of what changed.",
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/about",
    label: "About",
    title: "About",
    description:
      "The product story behind KoppaJS: a pragmatic, focused, component-first frontend framework for reactive and maintainable web applications.",
    eyebrow: "About",
    headline: "Built for reactive frontends that need to stay clear.",
    lead: "KoppaJS exists for teams that want a pragmatic framework, not a black box. It is small on purpose, component-first by design, and explicit where product code needs control.",
    actions: [
      {
        label: "Get Started",
        path: "/overview",
        isDocsPath: true,
        variant: "primary",
      },
      { label: "Support the Project", path: "/support" },
    ],
    bodyHtml: [
      section(
        "Why KoppaJS Exists",
        "Frontend tools should make applications clearer, not harder to inspect.",
        "Many frameworks add comfort by hiding more behavior. KoppaJS takes a different path: reduce the surface, keep responsibilities visible, and give developers a framework that stays understandable.",
        list(aboutStatements, true),
      ),
      section(
        "What It Values",
        "Pragmatic reduction over feature spectacle.",
        "The project is shaped around product work where maintainability matters: dashboards, tools, documentation surfaces, and applications that need to be changed with confidence.",
        cardGrid(3, [
          card(
            "Clarity",
            "Developers should be able to see how components are assembled and where behavior comes from.",
            "Value",
          ),
          card(
            "Performance",
            "The fastest abstraction is often the one that avoids doing unnecessary work in the first place.",
            "Value",
          ),
          card(
            "Longevity",
            "A smaller framework surface helps applications survive release cycles, refactors, and team changes.",
            "Value",
          ),
        ]),
      ),
      section(
        "Who It Fits",
        "KoppaJS is for teams that prefer explicit control.",
        "It is a good fit when you want component-based frontend architecture, a small runtime, and a modular path from simple surfaces to routed applications.",
        list([
          "You want applications built from clear component units.",
          "You prefer small APIs over broad all-in-one convenience.",
          "You care about keeping runtime overhead low before the final optimization pass.",
          "You want build-time work and runtime behavior to stay easy to distinguish.",
        ]),
      ),
      section(
        "What It Is Not",
        "Not more framework than necessary.",
        "KoppaJS is not trying to hide every decision or provide a giant default platform. It is for teams that see clarity as a feature.",
        cardGrid(2, [
          card(
            "Not magic-first",
            "KoppaJS avoids surprising behavior that is convenient at first and expensive to debug later.",
            "Boundary",
          ),
          card(
            "Not all-in-one",
            "The ecosystem grows through focused packages instead of pushing every capability into the core.",
            "Boundary",
          ),
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/support",
    label: "Support",
    title: "Support",
    description:
      "How to support KoppaJS through GitHub issues, focused pull requests, documentation fixes, and examples.",
    eyebrow: "Support",
    headline: "Help make KoppaJS clearer, smaller, and easier to use.",
    lead: "The project improves through real usage, actionable issues, focused pull requests, better examples, and documentation fixes.",
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
        "Support Paths",
        "Concrete feedback is the most useful support.",
        "KoppaJS is small enough that focused contributions can quickly improve the experience for everyone evaluating or using the framework.",
        cardGrid(3, [
          card(
            "Report issues",
            "Share reproducible bugs, unclear behavior, or documentation gaps in the relevant repository.",
            "GitHub",
          ),
          card(
            "Improve docs",
            "Fix unclear onboarding, examples, API notes, and product explanations when they do not match real usage.",
            "Docs",
          ),
          card(
            "Open focused PRs",
            "Small, specific changes are easier to review and keep aligned with the product direction.",
            "Code",
          ),
        ]),
      ),
      section(
        "Where To Start",
        "Use the public repositories for coordination.",
        "Until additional channels are published, GitHub remains the official place for issues, pull requests, and project discussion.",
        list([
          'Open the organization at <a class="koppa-link" href="https://github.com/koppajs" target="_blank" rel="noreferrer">github.com/koppajs</a>.',
          "Use repository issues for bugs, unclear documentation, and feature discussions.",
          "Use pull requests for docs fixes, examples, tests, and focused implementation improvements.",
        ]),
      ),
    ].join("\n"),
  },
  {
    path: "/impressum",
    label: "Legal Notice",
    title: "Legal Notice",
    description:
      "Current project and contact information available inside the KoppaJS repositories for the public website surface.",
    eyebrow: "Legal Notice",
    headline: "Project notice for the current open-source website surface.",
    lead: "This page describes the information currently present in the maintained KoppaJS repositories. A deployed domain may require additional operator-specific details.",
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
        "Deployment Scope",
        "Repository content and deployment operation are separate concerns.",
        "If this application is deployed on a domain with additional legal operator requirements, that domain operator must add the required operator details for that deployment.",
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
    label: "Privacy",
    title: "Privacy",
    description:
      "Privacy summary for the current KoppaJS website codebase and its implemented browser behavior.",
    eyebrow: "Privacy",
    headline: "Privacy summary for the current static website implementation.",
    lead: "The current website implementation does not ship analytics, cookies, account flows, or form submissions. Normal web hosting logs may still exist at the deployment layer.",
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
    ].join("\n"),
  },
] as const satisfies readonly SitePageDefinition[];

export const sitePageMap = new Map(
  sitePages.map((page) => [page.path, page]),
) as Map<string, SitePageDefinition>;
