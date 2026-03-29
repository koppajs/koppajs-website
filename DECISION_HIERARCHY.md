# Decision Hierarchy

## Purpose

This document defines which repository documents are authoritative when guidance
conflicts. Lower-precedence documents must be updated to match higher-precedence
ones.

## Precedence Order

1. Approved specs in `docs/specs/`
2. `ARCHITECTURE.md`
3. `DEVELOPMENT_RULES.md`
4. `TESTING_STRATEGY.md`
5. `RELEASE.md`
6. Contributor workflow docs such as `CONTRIBUTING.md`
7. Informational docs such as `README.md` and `CHANGELOG.md`
8. Generated artifacts such as `dist/`, `coverage/`, and Playwright reports

## How To Resolve Conflicts

- Follow the highest-precedence applicable document.
- Update every lower-precedence document affected by the conflict in the same
  change when feasible.
- If a material user-visible behavior lacks a governing spec, add one before
  finishing the change.
- Do not use stale README copy as justification for architectural drift.

## Tests In The Hierarchy

Tests are executable evidence, not top-level governance.

When tests conflict with higher-precedence docs:

- update the tests if the documented intent is correct
- update the governing document first if the implementation is the new intended
  behavior
