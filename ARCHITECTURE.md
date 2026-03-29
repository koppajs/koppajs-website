# Architecture

## System Overview

`koppajs-website` is the official marketing website for KoppaJS. It is a Vite
single-page application built with KoppaJS components, the official KoppaJS
router, and the official KoppaJS Vite plugin.

The repository is intentionally website-specific:

- it owns public positioning, ecosystem framing, adoption guidance, and support
  messaging
- it does not replace the package repos or the dedicated documentation repo
- it keeps page behavior explicit through route metadata and plain component
  registration

## Primary Runtime Flow

1. `src/main.ts` imports the global stylesheet and registers components/pages.
2. `Core()` initializes the KoppaJS runtime and custom elements.
3. `<app-shell>` mounts the shared page frame with header, outlet, and footer.
4. `KoppajsRouter` owns route resolution, active-link state, metadata updates,
   and not-found handling.
5. Page components render static marketing content through `.kpa` templates.
6. Vite builds the application through `@koppajs/koppajs-vite-plugin`.

## Major Subsystems

### App Bootstrap

- `src/main.ts`
- Owns runtime initialization and router setup.
- Waits for the outlet before calling the router so page rendering stays
  deterministic.

### Route And Metadata Contract

- `src/app-routes.ts`
- `src/site-config.ts`
- Every renderable route must define `path`, `title`, `description`, and
  `componentTag`.
- Internal navigation uses `a[data-route]` so router delegation and active state
  remain consistent.

### Shared Layout

- `src/components/app-shell.kpa`
- `src/components/site-header.kpa`
- `src/components/site-footer.kpa`
- These components own shell composition, top-level navigation, footer links,
  and the support CTA surface.

### Page Surface

- `src/pages/*.kpa`
- Pages are marketing-oriented and route-owned.
- Package-level implementation details stay in the package repos.

### Styling

- `src/style.css`
- Owns the visual system, layout rhythm, motion, and responsive behavior.
- Styling is centralized so page templates stay readable and content-first.

### Quality Gates

- `vitest.config.ts`
- `playwright.config.ts`
- `playwright.preview.config.ts`
- `.github/workflows/ci.yml`
- Unit tests protect route/config contracts. Browser tests protect navigation and
  preview behavior.

## Architectural Invariants

- The site remains marketing-first, not reference-doc-first.
- Every final route has a dedicated page component and explicit metadata.
- Internal navigation uses router-managed links with `data-route`.
- Not-found behavior stays explicit through the catch-all route.
- The site must build and run on Node.js >= 22.

## Repository Boundaries

- `src/` owns the website application.
- `tests/` owns repository-local verification of route, navigation, and preview
  behavior.
- `docs/specs/` owns approved repository behavior.
- Root docs own contributor, release, and governance guidance.

## Related Documents

- `DECISION_HIERARCHY.md`
- `DEVELOPMENT_RULES.md`
- `TESTING_STRATEGY.md`
- `RELEASE.md`
- `docs/specs/site-runtime-baseline.md`
