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
