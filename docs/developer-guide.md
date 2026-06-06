# Developer Guide

This guide is for developers who want to run, modify, deploy, or extend Death Alliance.

## Prerequisites

- Node.js 22 recommended.
- npm.
- Git.
- GitHub CLI optional, useful for checking Actions and Pages deployment.

## Setup

```bash
npm install
npm run validate
npm run dev
```

The local Vite URL usually looks like:

```text
http://127.0.0.1:5173/death-alliance/#/home
```

The deployed GitHub Pages demo URL is:

```text
https://npfernando.github.io/death-alliance/
```

This URL is a static demo / portfolio preview only, not a production deployment. It is useful for design review, frontend QA, and stakeholder walkthroughs, but it does not provide the production V4 backend services: upload sandboxing, metadata scanning/removal, visible private-data processing, malware scanning, package signing, IPFS publishing, torrent snapshot generation, abuse-report handling, or CID blocklist enforcement.

## Routes

The app uses hash routes so it works on GitHub Pages without server rewrite rules.

```text
#/home          Cinematic landing page
#/submit        Fictional clue submission form
#/archive       Example reports and archive table
#/manifest      Publishing/manifest concept
#/architecture  Demo boundary and V4 architecture page
#/rules         Fictional content and safety rules
#/health        Archive health concept
```

Route logic lives in `src/App.tsx`:

- `PageKey`
- `navItems`
- `routeFromHash()`
- `routeHref()`
- `activePage` state

## Project structure

```text
.github/workflows/deploy-pages.yml   GitHub Pages build/deploy workflow
src/App.tsx                          React app and routed page components
src/App.css                          Cinematic styles and page layouts
src/safety.ts                        Content modes, categories, statuses, text guard
src/App.test.tsx                     UI/safety regression tests
scripts/safety-check.mjs             Static safety check
examples/case-package/DA-000184-v1   Demo signed case-package shape
examples/archive                     Demo archive manifest, index, and public key

docs/architecture.md                 Final V4 architecture reference
docs/developer-guide.md              This guide
docs/media-assets.md                 Media asset policy and replacement flow
docs/safety-and-content-policy.md    Safety rules for implementation
```

## Validation commands

Run all checks:

```bash
npm run validate
```

Run individually:

```bash
npm run lint:safety
npm run test
npm run build
```

Expected result:

- Safety check passes.
- Vitest tests pass.
- Vite production build succeeds.

## Deployment

The repository is public and has GitHub Pages deployment configured.

On push to `main`:

1. GitHub Actions checks out the repo.
2. Installs dependencies with `npm ci`.
3. Runs `npm run validate`.
4. Uploads `dist/` as a Pages artifact.
5. Deploys to GitHub Pages.

Workflow file:

```text
.github/workflows/deploy-pages.yml
```

Check latest deployment:

```bash
gh run list --repo NPFernando/death-alliance --workflow "Deploy GitHub Pages" --limit 5
```

Watch a run:

```bash
gh run watch <RUN_ID> --repo NPFernando/death-alliance --exit-status
```

Verify live site:

```bash
curl -I -L https://npfernando.github.io/death-alliance/
```

## UI development notes

- Keep pages separate; avoid turning it back into one long page.
- Add page-level components inside `src/App.tsx` or split into `src/pages/` if the file grows.
- Keep the side rail and top bar shared.
- Use CSS classes that can animate per page, such as `.page-section` and `.page-frame`.
- Keep semantic text available in HTML even when decorative media is used.

## Media development notes

- Use videos as decorative enhancements only.
- Keep `poster` fallbacks.
- Use `muted`, `playsInline`, and `autoPlay` for ambient browser-safe video.
- Do not hide or advance video-driven UI using early fixed timers. Use media lifecycle events where possible.
- Do not remove watermarks from generated exports. Use clean exports, original licensed assets, or regenerate new clean media.

## Safety development notes

- Do not add real-person data fields to the app.
- Do not add browser-persistent hidden key storage.
- Keep hidden key/session behavior memory-only in future backend work.
- Never publish raw uploads.
- If adding backend upload flows, include metadata scan, cleanup, visible private-data check, package hash, and signature steps.
- Keep the public metadata report high level. Do not publish exact GPS values, device serials, author names, or private metadata values.

## Testing expectations for future changes

When modifying UI routes:

- Test route navigation.
- Test direct deep links.
- Test active nav state.
- Test no accidental rendering of unrelated page content.

When modifying the submission form:

- Test consent gate remains required.
- Test unsafe text guard still blocks unsafe wording.
- Test hidden-key warning behavior.

When modifying media:

- Test intro skip/replay.
- Test media-end behavior.
- Browser-test that console has no errors.

## Commit/push workflow

For this repo, after modifying files:

```bash
npm run validate
git status --short
git add <files>
git commit -m "Meaningful message"
git push origin main
```

Then verify the GitHub Pages deploy run and live URL.
