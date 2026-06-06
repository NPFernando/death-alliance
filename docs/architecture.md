# Death Alliance V4 Architecture

Death Alliance is a fictional / ARG / roleplay archive concept. The current repository is a static React/Vite frontend deployed through GitHub Pages. This document describes the intended V4 system architecture so future developers can build the backend, media processing, package signing, and archive export layers safely.

## Safety boundary

The platform is for fictional, anonymized, roleplay, ARG, lore, and worldbuilding submissions only.

It must not be used for real-world accusations against identifiable people, private personal data, harassment, threats, revenge content, or unsafe uploads.

## Current demo implementation

The current GitHub Pages site is a static demo / portfolio preview only. It is not production and does not process real submissions, uploads, identity sessions, metadata scans, signed packages, IPFS publishing, torrent snapshots, abuse reports, or CID blocklists.

```text
GitHub repository
  -> GitHub Actions validation/build
  -> GitHub Pages static deployment
  -> Hash-routed React app
       #/home
       #/submit
       #/archive
       #/manifest
       #/rules
       #/health
```

Current frontend scope:

- Cinematic homepage and intro overlay.
- Separate hash-routed pages.
- Safe fictional submission form mockup.
- Example fictional archive reports.
- Manifest/archive-health mock views.
- Static safety validation script.

## Intended V4 layers

```text
Layer 1: Public Experience Layer
  - Static frontend
  - Public case pages
  - Public archive browsing
  - Public comments and vote summaries
  - Manifest viewer
  - Mirror verification and archive health UI

Layer 2: Submission and Safety Layer
  - Submission API
  - Temporary upload sandbox
  - Metadata scanner
  - Visible private-data detector
  - Cleanup worker
  - Package builder
  - Signature service
  - Publishing queue

Layer 3: Distributed Archive Layer
  - Signed case packages
  - Static archive export
  - Signed archive manifest
  - IPFS package copies
  - Torrent-style snapshots
  - Mirror registry
  - CID blocklist and takedown registry
```

## End-to-end V4 flow

```text
Anonymous user
  -> Website landing page
  -> Anonymous name + optional hidden key
  -> Submission form
  -> Temporary upload sandbox
  -> Metadata scan
  -> Visible private-data check
  -> User cleanup confirmation
  -> Final cleaned package
  -> Package hash
  -> Package signature
  -> Final cleaned submission -> Direct IPFS/torrent publish
  -> CID/torrent snapshot stored
  -> Public archive updated
  -> Community comments, evidence updates, support/dispute votes
  -> Case reputation/status changes over time
  -> Signed manifest updated
  -> Mirror/archive health updated
```

## Component responsibilities

### Public frontend

- Renders public pages and archive states.
- Never stores hidden keys in browser persistent storage.
- Uses hash routing for GitHub Pages compatibility.
- Shows strong fictional/safety notices.
- Treats vote/status data as community signals, not truth decisions.

### Submission API

Future service. Responsibilities:

- Create draft submission records.
- Validate fictional content mode and consent.
- Issue signed upload URLs or accept upload streams.
- Enforce file type, file size, rate limit, and abuse controls.
- Never publish raw uploads.

### Sandbox worker

Future isolated worker. Responsibilities:

- Store uploads temporarily.
- Scan metadata.
- Remove metadata according to user cleanup choice.
- Run malware scanning.
- Run visible private-data checks.
- Produce cleaned files only.
- Delete detailed metadata values after processing.

### Package builder

Future service. Responsibilities:

- Build case package folders.
- Generate `case.json`, `case.md`, `public-metadata-report.json`, `event-log.json`, summaries, and uploads.
- Generate package hash.
- Send package hash to signature service.

### Signature service

Future service. Responsibilities:

- Keep signing keys isolated.
- Sign final cleaned packages and archive manifests.
- Publish public key ID and verification docs.
- Avoid exposing private keys to public frontend or workers.

### Archive publisher

Future service. Responsibilities:

- Add final cleaned packages to IPFS.
- Queue torrent-style archive snapshots.
- Update archive version registry.
- Update signed manifest.
- Respect takedown/blocklist registry for official channels.

## Suggested backend deployment model

```text
Static frontend hosting
  -> API gateway / WAF
  -> Submission API
  -> Queue
  -> Isolated processing workers
  -> Private object storage
  -> Database
  -> Signature service on private network
  -> Archive publisher
```

Recommended controls:

- Rate limiting.
- File size/type allowlist.
- Temporary object storage expiry.
- Worker network isolation.
- No public database access.
- No public signing-key access.
- Append-only public event log.
- Abuse report and official takedown/blocklist flow.

## Data model summary

Core future tables:

- `anonymous_identities`
- `submissions`
- `upload_processing`
- `comments`
- `comment_uploads`
- `evidence_updates`
- `votes`
- `case_events`
- `archive_versions`
- `abuse_reports`
- `cid_blocklist`
- `mirror_registry`

See `docs/developer-guide.md` for implementation notes and validation commands.

## Archive package shape

```text
case-package/
  case.json
  case.md
  public-metadata-report.json
  event-log.json
  vote-summary.json
  comment-summary.json
  evidence-summary.json
  signature.txt
  uploads/
    cleaned-image-001.png
    cleaned-document-001.pdf
    cleaned-video-001.mp4
```

## Manifest shape

```json
{
  "project": "Death Alliance",
  "version": "4.0",
  "latest_archive_version": "v12",
  "latest_archive_cid": "QmExampleRootCID",
  "latest_torrent": "DeathAlliance-Archive-v12.torrent",
  "published_at": "2026-06-06T00:00:00Z",
  "public_key_id": "DA-OFFICIAL-KEY-01",
  "signature": "..."
}
```

## Non-goals

- No real-world accusation platform.
- No private identity recovery.
- No hidden key storage in browser storage.
- No raw upload publishing.
- No unsafe distribution behavior.
- No watermark removal from third-party/generated media exports.
