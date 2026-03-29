# Testing Strategy

## Purpose

The test suite protects the website's public behavior: route rendering,
navigation, active-link state, and production-preview stability.

## Current Test Stack

- Vitest 4
- JSDOM for fast repository-local unit tests
- Playwright with Chromium for browser verification
- V8 coverage reporting for route and site configuration contracts

## Test Philosophy

- Prefer behavior-driven tests over implementation-detail tests.
- Add or update browser coverage when routes, CTA flow, or layout behavior
  changes.
- Keep unit tests focused on explicit repository-owned contracts such as route
  metadata and site configuration.

## Test Layers

### Unit Tests

Use unit tests for:

- route metadata
- site configuration helpers
- repository-owned content contracts that do not require a real browser

### Browser Tests

Use Playwright for:

- internal navigation between major routes
- active-link state in the header
- not-found handling
- built-preview deep links through `vite preview`

## Coverage Expectations

- `npm run test:unit` collects coverage for `src/app-routes.ts` and
  `src/site-config.ts`
- route and configuration coverage is expected to stay exhaustive
- Playwright coverage is behavior protection, not numeric coverage

## Release And CI Gates

The repository quality gates currently include:

- `npm run check`
- `npm run test:e2e`
- `npm run test:preview`

CI runs the main quality gate on Node 22 and 24, then runs browser coverage on
Node 22.
