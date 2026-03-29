# Release Process for `koppajs-website`

This document describes the repository-specific release workflow for the
official KoppaJS website repository.

The project uses a manual, tag-driven release process.
Only tagged versions are official website baselines.

This repository does **not** publish to npm. Tags represent website milestones
and repository states.

---

## Release Model

The release is controlled by:

- the version in `package.json`
- the release entry in `CHANGELOG.md`
- the release-ready state on `main`
- the Git tag in the form `vX.Y.Z`

Important consequences:

- a merge alone does not create an official release baseline
- the tag version must match `package.json`
- release notes must already exist in `CHANGELOG.md`
- browser tests are part of the release gate, not optional follow-up work

---

## Preconditions

Before cutting a release, ensure all of the following are true:

- `package.json` contains the target version
- `CHANGELOG.md` contains the corresponding release notes
- `README.md` and contributor docs reflect the current public surface
- the lockfile is up to date
- all checks and browser tests pass

Tooling expectations for local verification:

- Node.js >= 22
- npm >= 10

This repository enforces `engine-strict=true` in `.npmrc`, so incompatible
Node.js versions should be treated as a release blocker.

---

## Local Validation Before Tagging

Recommended commands:

```bash
npm install
npm run check
npx playwright install chromium
npm run test:browser
```

Why this matters:

- `npm run check` validates docs, formatting, lint, types, unit tests, and
  build output
- `npm run test:browser` validates real navigation against both the dev server
  and the built preview

---

## Release Steps

1. Finalize the release content on the intended release branch.
2. Update `package.json` and `CHANGELOG.md`.
3. Run the local validation commands.
4. Merge the release-ready state into `main`.
5. Tag the release commit on `main` as `vX.Y.Z`.
6. Push the tag.
7. Verify the GitHub Actions workflow completes successfully.

---

## What Counts As A Release-Worthy Change

Examples:

- a new or removed public route
- changed positioning or support messaging that materially changes the public
  website contract
- a new quality gate or release prerequisite
- major visual or UX changes to the official website baseline
