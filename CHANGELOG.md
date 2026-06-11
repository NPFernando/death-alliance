# Changelog

All notable changes to Death Alliance are documented here.

## [0.1.0] — 2026-06-06

### Added

- Cinematic React/Vite/TypeScript frontend with 8 hash-routed pages: Home, Submit, Archive, Manifest, Architecture, About, Rules, Health
- `IntroLoader` overlay playing `clip 1.mp4` on first load with skip button and 12-second safety timeout
- Replay intro button in top bar
- Background video loop (`clip 3.mp4`) and portal video panel (`clip 5.mp4`)
- In-memory case + comment voting system (demo-only, no persistence)
- Connected case thread view with evidence and comment panels
- Anonymous submission form with 5-step fictional consent gate
- `isSubmissionTextSafe` text guard blocking real-world targeting language
- `scripts/safety-check.mjs` CI scanner for banned patterns
- GitHub Actions CI/CD pipeline: safety check → test → build → deploy to Pages
- Full Vitest + React Testing Library suite (206 lines)
- V4 architecture documentation (`docs/architecture.md`)
- Safety and content policy (`docs/safety-and-content-policy.md`)
- Developer guide (`docs/developer-guide.md`)
- Media assets policy (`docs/media-assets.md`)
- Example case-package shape (`examples/case-package/DA-000184-v1/`)
- Example signed manifest shape (`examples/archive/`)

## [Unreleased] — v4 backend (planned)

- Private backend: anonymous intake, upload sandbox, metadata scanner, visible private-data checker, malware scan, Argon2id hidden-key identities
- Signed case packages (package hash + Ed25519 signature)
- IPFS publish + CID registry
- Torrent snapshot export
- Official mirror registry and CID blocklist
- Append-only event log
- Abuse report workflow
