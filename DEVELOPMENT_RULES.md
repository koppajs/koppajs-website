# Development Rules

## Scope

These rules apply to repository maintenance, documentation work, and the
marketing website application owned by this repository.

## Governance Rules

- `DECISION_HIERARCHY.md` defines precedence when repository documents disagree.
- `ARCHITECTURE.md`, `TESTING_STRATEGY.md`, and `RELEASE.md` are part of the
  maintained repository contract and must stay accurate.
- Specs in `docs/specs/` take precedence over README-level explanation.

## Documentation Contract Rules

- `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, and `CONTRIBUTING.md` are governed by `docs/specs/repository-documentation-contract.md`.
- If one of those files changes shape, update the spec and `scripts/check-doc-contract.mjs` in the same change.
- Keep official KoppaJS branding, logo usage, and section order consistent across governed root documents.
- Repository-specific guidance must stay local to this repository so contributors do not need other repos to recover the rules.

## Product Surface Rules

- The public site is marketing-first. Do not turn this repository into the main
  reference documentation surface.
- Core package behavior belongs in package repos and `koppajs-documentation`,
  not in duplicated website prose.
- Internal navigation must remain router-driven and use explicit route metadata.

## Change Safety Rules

- Prefer explicit repository contracts over implicit convention.
- Update contributor docs whenever workflow, architecture, release, or
  quality-gate behavior changes.
- Run the local document check before committing changes to governed files.
