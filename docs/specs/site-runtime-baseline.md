# Site Runtime Baseline

- Status: Approved
- Owner: repository maintainers

## Scope

This spec defines the current baseline behavior for the official KoppaJS website
application.

## Behavior

The repository must provide a routed marketing website that:

- presents KoppaJS as a framework ecosystem rather than as package-isolated
  pieces
- explains the project philosophy and intended fit
- gives new users a clear adoption path without duplicating full reference
  documentation
- includes explicit support and funding messaging for the ecosystem

The current route surface must include:

- `/`
- `/ecosystem`
- `/philosophy`
- `/start`
- `/support`
- a catch-all not-found route

Every final route must declare:

- a page title
- a page description
- a `componentTag`

## Constraints

- The site is marketing-first, not documentation-first.
- Internal navigation must use the official KoppaJS router.
- The site must be built with `@koppajs/koppajs-core`,
  `@koppajs/koppajs-router`, and `@koppajs/koppajs-vite-plugin`.
- The repository must support Node.js >= 22.

## Edge Cases

- Unmatched paths must render the dedicated not-found page.
- Direct browser loads to non-root routes must work in both the dev server and
  the built preview server.
- Active-link state must follow the current route.

## Validation

This baseline is only satisfied when all of the following are true:

- `npm run check` passes
- `npm run test:e2e` passes
- `npm run test:preview` passes
- `README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `TESTING_STRATEGY.md`, and
  `RELEASE.md` accurately describe the shipped behavior
