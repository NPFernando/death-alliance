# Death Alliance

Death Alliance is a fictional / ARG / roleplay clue archive concept inspired by dark justice, betrayal, hidden technology, false accusation, and mystery-novel themes.

This project is inspired by the novel `蒙冤入狱，重生后我大开杀戒` and is not affiliated with the original author, publisher, or platform.

Important: this project is for fictional, anonymized, roleplay, ARG, and creative storytelling content only. It must not be used for real-world accusations, doxxing, harassment, revenge, threats, vigilantism, or exposing identifiable real people.

## What is implemented

- Cinematic black landing page with animated Grim Reaper / Death silhouette, halo, fog, and typewriter-style copy.
- Safe fictional case-type gate.
- Anonymous identity model UI using anonymous name + hidden key warning.
- Fictional clue submission portal with consent gate.
- Metadata-safe publishing flow visualization.
- Community dispute/voting/archive health mock dashboard.
- Signed public archive distribution concept using IPFS/torrent-style snapshots as a public archive distribution system.
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

## Local setup

```bash
npm install
npm run validate
npm run dev
```

Open the Vite URL shown in the terminal.

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

## License

No license is currently granted. Add a license only when ready to publish terms explicitly.
