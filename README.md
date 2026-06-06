# Death Alliance

Death Alliance is a fictional / ARG / roleplay clue archive concept inspired by dark justice, betrayal, hidden technology, false accusation, and mystery-novel themes.

This project is inspired by the novel `蒙冤入狱，重生后我大开杀戒` and is not affiliated with the original author, publisher, or platform.

Important: this project is for fictional, anonymized, roleplay, ARG, and creative storytelling content only. It must not be used for real-world accusations, doxxing, harassment, revenge, threats, vigilantism, or exposing identifiable real people.

## What is implemented

- Hash-routed GitHub Pages deployment with separate Home, Submit, Archive, Manifest, Architecture, About, Rules, and Status pages.
- Visible demo-mode banner that links to the architecture boundary page.
- Cinematic black landing page with animated Grim Reaper / Death silhouette, halo, fog, and typewriter-style copy.
- Safe fictional case-type gate.
- Anonymous identity model UI using anonymous name + hidden key warning.
- Fictional clue submission portal with consent gate.
- Interactive fictional archive reports with working in-memory upvotes/downvotes, selected threads, connected evidence, and comment voting.
- Metadata-safe publishing flow visualization.
- Community dispute/voting/archive health mock dashboard.
- Signed public archive distribution concept using IPFS/torrent-style snapshots as a public archive distribution system.
- GitHub Pages workflow that validates, builds, and deploys the live site after pushes to `main`.
- Safety checks that block real private-data collection patterns in the static codebase.

## Safety model

The app intentionally does not ask for real addresses, real legal names, phone numbers, national IDs, or real accusations against identifiable people.

The intended V4 publishing rule is:

`Final cleaned submission → Direct IPFS/torrent publish`

Only after:

1. Temporary sandbox upload
2. Metadata scan
3. Metadata warning to uploader
4. Visible private-data check
5. User cleanup confirmation
6. Cleaned package generation
7. Package hash generation
8. Package signing

Community review happens after publishing through comments, votes, evidence updates, and disputes.

## Live demo site

The public GitHub Pages build auto-updates from pushes to `main` after the validation/build workflow succeeds:

https://npfernando.github.io/death-alliance/

Important: this GitHub Pages deployment is a static demo / portfolio preview only. It is not a production deployment and must not be treated as a live anonymous clue service. It uses static mock data and decorative demo media; it does not include the production backend, upload sandbox, metadata scanner, visible private-data detector, package signing service, IPFS publisher, torrent snapshot builder, moderation workflow, abuse-report queue, or takedown/blocklist operations required by the V4 architecture.

Useful routes:

- `#/home`
- `#/submit`
- `#/archive`
- `#/manifest`
- `#/architecture`
- `#/about`
- `#/rules`
- `#/health`

## Documentation

Developer reference docs:

- [V4 Architecture](docs/architecture.md) — final layered architecture, publishing flow, backend responsibilities, package/manifest shapes.
- [Developer Guide](docs/developer-guide.md) — setup, routes, validation, deployment, testing expectations.
- [Media Assets Guide](docs/media-assets.md) — clean media replacement flow, watermark policy, optimization guidance.
- [Safety and Content Policy](docs/safety-and-content-policy.md) — fictional-only safety rules, upload processing, metadata/reporting policy.

## Example archive artifacts

Static demo examples for backend/API developers:

- `examples/case-package/DA-000184-v1/` — concrete signed case-package shape.
- `examples/archive/death-alliance-manifest.json` — demo signed manifest shape.
- `examples/archive/index.json` — demo static archive index.
- `examples/archive/public-key.txt` — placeholder public key format.

These files are documentation/demo artifacts only. They are not cryptographic production outputs.

## Local setup

```bash
npm install
npm run validate
npm run dev
```

Open the Vite URL shown in the terminal.

## Cinematic UI assets

This project uses local decorative media assets committed with the app:

- `vid/clip 1.mp4` — first-load cinematic intro/loading overlay.
- `vid/clip 3.mp4` — subtle global background atmosphere behind the dashboard.
- `vid/clip 5.mp4` — portal/media panel background loop.
- `vid/clip 2.mp4` and `vid/clip 4.mp4` — reserved for future section transitions or alternate hero loops.
- `img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png` — Grim Reaper hero artwork and video poster fallback.
- `img/ui design.png` — visual reference mockup for the CloudScope-style dark dashboard layout.

The videos are decorative only. The semantic content remains normal HTML text, the intro can be skipped/replayed, and the site must stay readable and usable if videos fail to load or reduced-motion preferences are enabled.

## Validation

```bash
npm run lint:safety
npm run test
npm run build
```

## Project structure

```text
src/
  App.tsx              Main page and submission UX
  App.css              Cinematic Death Alliance styling/animations
  safety.ts            Allowed content modes/categories/statuses and guard helpers
  App.test.tsx         UI and safety regression tests
scripts/
  safety-check.mjs     Static check for banned storage/private-data patterns
```

## Future backend phases

- Submission API with temporary sandbox upload.
- Metadata processor and visible private-data detector.
- Package builder and signature service.
- IPFS publisher and torrent snapshot queue.
- Append-only event log, signed manifest, mirror verification, CID blocklist, and archive health API.

## Contributing

Forks, self-hosted instances, and safe fictional/archive improvements are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT License. See [LICENSE](LICENSE).

Anyone may create, modify, deploy, and run their own instance under the MIT terms. Public forks are encouraged to credit the original project as a courtesy:

> Based on Death Alliance by Naveen Fernando — created as a fictional archive and safety-first storytelling experiment. Thank you for keeping public-interest creative tools alive for humanity.
