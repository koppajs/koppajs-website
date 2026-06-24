# Change Log

All notable changes to **koppajs-website** are documented in this file.

This project uses a **manual, tag-driven release process**.
Only tagged versions represent official releases.

This changelog documents **intentional milestones and guarantees**,
not every internal refactor.

---

## [Unreleased]

This section is intentionally empty.
Changes will only appear here when they:

- affect repository behavior or public guidance,
- change contributor workflow or governance,
- or alter the documented package or repository contract.

---

## [0.0.2] - Product Positioning Refresh

**2026-06-24**

This release updates the public KoppaJS website positioning while keeping the
embedded documentation pinned to the existing `koppajs-documentation` `v0.0.1`
baseline.

### Changed

- Reworked the homepage around the clearer product promise, focused package
  capabilities, component-first positioning, and runtime/build-time boundaries
- Refined the Learn, Architecture, Ecosystem, About, and Support copy to align
  the website with the current public product framing
- Updated the primary navigation and footer labels for the focused public route
  structure
- Expanded browser and unit coverage for the updated homepage structure,
  navigation behavior, and route metadata

### Removed

- Removed the standalone `/showcase` route from public navigation and route
  expectations
- Removed the header support icon action in favor of repository and page-level
  support paths

---

## [0.0.1] - Initial Website Baseline

**2026-03-28**

This release establishes the first public KoppaJS website baseline. The
repository now owns a marketing-oriented SPA built on KoppaJS itself, aligned
governance documents, and executable quality gates for routing and browser
behavior.

### Added

- Added a routed KoppaJS website surface focused on ecosystem positioning,
  philosophy, adoption, and support
- Added Vitest unit coverage and Playwright browser coverage for route and
  preview behavior
- Added repository-local `ARCHITECTURE.md`, `DECISION_HIERARCHY.md`,
  `TESTING_STRATEGY.md`, `RELEASE.md`, and a site runtime baseline spec

### Changed

- Raised the repository Node.js minimum to `>=22`, kept `.nvmrc` on `22` as
  the maintainer default, and expanded CI checks to Node 22 and 24
- Upgraded the repository from a meta-layer-only placeholder to a working
  `0.0.1` application baseline with build, lint, typecheck, test, and preview
  workflows

---
