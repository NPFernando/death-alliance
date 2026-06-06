# Safety and Content Policy

Death Alliance is a fictional / ARG / roleplay archive. This policy is the implementation reference for developers and contributors.

## Allowed content

Allowed submissions and examples must be framed as one or more of:

- Fictional clue.
- Roleplay case.
- ARG-style evidence.
- Mystery story report.
- Worldbuilding content.
- Novel-inspired scenario.
- Fictional injustice archive.
- Fictional technology theft case.
- Fictional corruption report.
- Fictional counter-evidence or dispute comment.

## Prohibited content

Do not build features or copy that encourages:

- Real accusations against identifiable real people.
- Real addresses, phone numbers, national IDs, private photos, private videos, or private documents.
- Doxxing, harassment, threats, revenge content, vigilantism, or illegal material.
- Uploading uncleaned metadata or real private identity data.
- Targeting a real person or organization as a real-world claim.

## Required submission consent

The submission UI must block submission unless the user confirms the content is fictional, anonymized, roleplay-based, or part of a created story universe.

The user must also confirm that the content does not contain real private information or real-world accusations against identifiable people.

## Anonymous identity rules

Current frontend behavior is a static mock. Future backend implementation must follow these rules:

- Anonymous name can be public.
- Hidden key must never be stored in plain text.
- Use Argon2id when available; bcrypt fallback is acceptable.
- Do not store hidden keys in localStorage, sessionStorage, IndexedDB, persistent cookies, or browser cache.
- Session tokens should be short-lived and memory-only in the browser.
- If the hidden key is lost, the anonymous identity cannot be recovered.

## Upload processing rules

Never publish raw initial uploads.

Future backend upload flow must include:

1. Temporary sandbox upload.
2. File type and size validation.
3. Malware scan.
4. Metadata scan.
5. Metadata warning screen.
6. User cleanup confirmation.
7. Metadata removal.
8. Visible private-data check.
9. Cleaned file generation.
10. Package hash generation.
11. Package signing.
12. Final cleaned package publishing.

If cleanup fails, block the upload and ask the user to provide another file or continue without that upload.

## Public metadata report rule

Public reports must show high-level status only:

- metadata_detected
- metadata_removed
- cleaned_file_generated
- safe_to_publish

Do not publish exact GPS values, device serials, author names, owner fields, raw EXIF/XMP/IPTC values, document author metadata, or similar private details.

## Visible private-data check

Metadata removal is not enough. Future systems must also detect visible content risks such as faces, house numbers, vehicle plates, IDs, private documents, chat screenshots with real names, maps, and confidential company information.

Recommended default:

- Blur or reject visible private information before distributed publishing.
- Ask the user to replace unsafe files.
- Add warning labels only for fictional/anonymized context.

## Community review model

The platform does not decide truth before publishing. Community review happens after a cleaned package is published through:

- Support votes.
- Dispute votes.
- Comments.
- Counter-evidence.
- Supporting evidence.
- Unsafe flags.
- Duplicate flags.
- Case status recalculation.

Votes and reputation are community signals, not absolute truth.

## Takedown/blocklist model

Official channels should be able to:

- Hide cases from the website.
- Mark cases unsafe.
- Add unsafe CIDs to an official blocklist.
- Stop showing official torrent snapshot links.
- Stop pinning known unsafe CIDs.
- Publish correction or dispute notices.
- Mark old versions deprecated or superseded.

Because distributed copies may exist outside official control, the UI must clearly state that removing a case from the official website may not remove copies already mirrored elsewhere.

## Static safety check

`scripts/safety-check.mjs` scans app/source files for patterns that should not appear in production UI code.

Docs may discuss policy terms for developer reference, but app code should stay safe and fictional-first.
