<a id="readme-top"></a>

<div align="center">
  <img src="https://public-assets-1b57ca06-687a-4142-a525-0635f7649a5c.s3.eu-central-1.amazonaws.com/koppajs/koppajs-logo-text-900x226.png" width="500" alt="KoppaJS Logo">
</div>

<br>

<div align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License"></a>
</div>

<br>

<div align="center">
  <h1 align="center">koppajs-website</h1>
  <h3 align="center">Official website repository for KoppaJS</h3>
  <p align="center">
    <i>The public home for the framework, ecosystem, and package-level entry points.</i>
  </p>
</div>

<br>

<div align="center">
  <p align="center">
    <a href="https://github.com/koppajs/koppajs-documentation">Documentation</a>
    &middot;
    <a href="https://github.com/koppajs/create-koppajs">create-koppajs</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-core">KoppaJS Core</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-vite-plugin">Vite Plugin</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-website/issues">Issues</a>
  </p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#what-is-this-repository">What is this repository?</a></li>
    <li><a href="#site-experience">Site Experience</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#route-map">Route Map</a></li>
    <li><a href="#local-development">Local Development</a></li>
    <li><a href="#current-status">Current Status</a></li>
    <li><a href="#architecture-governance">Architecture & Governance</a></li>
    <li><a href="#community-contribution">Community & Contribution</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## What is this repository?

`koppajs-website` is the official website repository for the KoppaJS project.

It exists as the public-facing web presence for the framework, its official
ecosystem packages, and the philosophy behind the project.

---

## Site Experience

The website is intentionally **marketing-first** rather than documentation-first.

It is responsible for:

- explaining why KoppaJS exists and what kind of teams it fits
- presenting the official ecosystem around core, router, and the Vite plugin
- creating a clear entry path for new users without duplicating full docs
- making support, contribution, and funding conversations explicit

Detailed package documentation remains owned by the package repos and the
dedicated documentation repository.

---

## Stack

The site uses the same ecosystem it promotes:

- `@koppajs/koppajs-core` for component registration and runtime behavior
- `@koppajs/koppajs-router` for SPA routing and active-link state
- `@koppajs/koppajs-vite-plugin` to compile `.kpa` component files
- Vite for local development and production builds
- Vitest for repository-local unit coverage
- Playwright for browser navigation and built-preview verification

Local requirements:

- Node.js >= 22
- npm >= 10

---

## Route Map

The current route baseline includes:

- `/` for the main product, architecture, and package overview
- `/learn` for structured entry paths into the documentation system
- `/architecture` for the website/docs boundary and system ownership map
- `/ecosystem` for the official package landscape
- `/showcase` for realistic application categories and fit
- `/about` for project intent and non-goals
- `/support` for contribution and funding paths
- `/docs/*` for the embedded documentation application
- `/impressum` and `/datenschutz` for the current legal and privacy surfaces
- `*` for a dedicated not-found experience

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the local site:

```bash
npm run dev
```

Run the main quality gate:

```bash
npm run check
```

Run browser coverage:

```bash
npx playwright install chromium
npm run test:browser
```

---

## Current Status

The website now serves as the public product surface for KoppaJS:

- a routed KoppaJS application with a dark-first design system shared with the documentation package
- a complete public route structure for product framing, architecture, ecosystem, showcase, support, and legal pages
- embedded documentation mounted through the exported documentation contract instead of website-owned reimplementation
- local unit and browser test coverage plus CI validation on Node 22 and 24

The dedicated documentation repo remains the right place for deep reference
material, while this repository owns positioning, discovery, and the public
entry narrative.

---

## Architecture & Governance

Project intent, contributor rules, and documentation contracts live in the local repo meta layer:

- [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
- [RELEASE.md](./RELEASE.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [docs/specs/README.md](./docs/specs/README.md)
- [docs/specs/repository-documentation-contract.md](./docs/specs/repository-documentation-contract.md)
- [docs/specs/site-runtime-baseline.md](./docs/specs/site-runtime-baseline.md)

The file-shape contract for `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, and `CONTRIBUTING.md` is defined in [docs/specs/repository-documentation-contract.md](./docs/specs/repository-documentation-contract.md).

Run the local document guard before committing:

```bash
npm run check:docs
```

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/koppajs-website/issues

Contributor workflow details live in [CONTRIBUTING.md](./CONTRIBUTING.md), and
release expectations live in [RELEASE.md](./RELEASE.md).

Community expectations live in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch
