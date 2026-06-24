# Release Process for `koppajs-website`

This document describes the repository-specific release workflow for the
official KoppaJS website repository.

The project uses a manual, tag-driven release process.
Only tagged versions are official website baselines.

This repository does **not** publish to npm. Tags represent website milestones
and repository states. Tagged releases also deploy the built website artifact to
the production FTP target.

---

## Release Model

The release is controlled by:

- the version in `package.json`
- the release entry in `CHANGELOG.md`
- the release-ready state on `main`
- the Git tag in the form `vX.Y.Z`
- the pinned `koppajs-documentation` Git tag dependency
- the FTP deployment settings stored in GitHub Secrets

Important consequences:

- a merge alone does not create an official release baseline
- the tag version must match `package.json`
- release notes must already exist in `CHANGELOG.md`
- `koppajs-documentation` must point to a fixed GitHub tag archive, not a local
  `file:` dependency
- the pinned `koppajs-documentation` tag must exist before the website tag is
  pushed
- website-only releases may keep the previous `koppajs-documentation` tag when
  the embedded documentation baseline has not changed
- browser tests are part of the release gate, not optional follow-up work
- the deploy uploads the generated `dist/` artifact, including
  `dist/.htaccess`

---

## Preconditions

Before cutting a release, ensure all of the following are true:

- `package.json` contains the target version
- `CHANGELOG.md` contains the corresponding release notes
- `README.md` and contributor docs reflect the current public surface
- if the release updates the embedded documentation baseline,
  `koppajs-documentation` has already been released and tagged
- `package.json` points to the intended documentation tag, which may be the
  previous tag for website-only releases
- `src/.htaccess` contains the production SPA rewrite rules
- the lockfile is up to date
- all checks and browser tests pass
- these GitHub Secrets exist for the production environment:
  `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, and `FTP_REMOTE_DIR`

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
npx playwright install chromium
npm run release:check
VITE_BASE_PATH=/ npm run build
npm run deploy:prepare
```

Why this matters:

- `npm run release:check` validates docs, formatting, lint, types, unit tests,
  build output, browser behavior, tag/version alignment when running in GitHub
  Actions, and the pinned documentation dependency
- `npm run test:browser` validates real navigation against both the dev server
  and the built preview
- `npm run deploy:prepare` copies the fixed `src/.htaccess` file into
  `dist/.htaccess`

---

## Release Steps

1. If the website release updates the embedded documentation baseline, release
   `koppajs-documentation` first and wait until its GitHub Actions release
   workflow has passed.
2. If a documentation release was created, merge the released documentation
   `main` branch back into its `develop` branch.
3. Finalize the website release content on the intended release branch.
4. Update `package.json` and `CHANGELOG.md`.
5. Pin `koppajs-documentation` to the intended documentation tag. For
   website-only releases, keep the existing documentation tag.
6. Run the local validation commands.
7. Merge the release-ready website state into `main`.
8. Tag the website release commit on `main` as `vX.Y.Z`.
9. Push the tag.
10. Verify that GitHub Actions creates the GitHub Release and deploys the
    website over FTP.
11. Merge the released website `main` branch back into `develop`.

Do not tag `develop`.
Do not tag the release branch.
Tag only the release commit that is already on `main`.

## GitHub Workflow Behavior

The workflow `.github/workflows/release.yml` runs on pushed tags matching
`vX.Y.Z`.

For each matching tag it will:

1. install dependencies
2. install the Playwright Chromium browser
3. run `npm run release:check`
4. build with `VITE_BASE_PATH=/`
5. copy `src/.htaccess` to `dist/.htaccess`
6. verify the deploy artifact
7. create a GitHub Release with generated release notes
8. mirror `dist/` to `FTP_REMOTE_DIR` via plain FTP

---

## What Counts As A Release-Worthy Change

Examples:

- a new or removed public route
- changed positioning or support messaging that materially changes the public
  website contract
- a new quality gate or release prerequisite
- major visual or UX changes to the official website baseline
