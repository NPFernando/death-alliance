# Media Assets Guide

Death Alliance uses cinematic images and videos as decorative atmosphere. The app must remain understandable and usable through semantic HTML text even if media fails to load.

## Current committed assets

```text
img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png
  Homepage Grim Reaper artwork and poster fallback.

img/ui design.png
  Visual reference mockup for the dark dashboard layout.

vid/clip 1.mp4
  First-load cinematic intro/loading overlay.

vid/clip 3.mp4
  Global background atmosphere behind the app shell.

vid/clip 5.mp4
  Manifest/media panel background loop.

vid/clip 2.mp4
vid/clip 4.mp4
  Reserved for future transitions or alternate hero loops.
```

## Watermark policy

Do not remove, obscure, crop out, or otherwise process a generated video/image for the purpose of removing a watermark.

If a generated asset has a watermark:

1. Do not commit it as a production hero asset.
2. Do not wire it into the public site as a clean asset.
3. Either use it as-is only with explicit acceptance that the watermark remains, or replace it with a clean export/new generated asset that does not contain a watermark.
4. Keep watermarked test exports ignored by Git when possible.

The repository currently ignores:

```text
vid/*watermarked*.mp4
```

## Replacing the homepage image with a clean video

When a clean licensed/watermark-free homepage video is available, use this path:

```text
vid/homepage-hero-clean.mp4
```

Recommended media properties:

- MP4/H.264 for broad browser support.
- Under 10 MB when practical.
- 8-15 seconds if looping.
- Muted decorative video.
- Portrait or square aspect ratio if replacing the current Reaper frame.
- Keep `img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png` as poster fallback.

Implementation pattern:

```tsx
const homepageHeroVideo = new URL('../vid/homepage-hero-clean.mp4', import.meta.url).href;

<video className="hero-video" autoPlay muted loop playsInline poster={heroImage}>
  <source src={homepageHeroVideo} type="video/mp4" />
</video>
```

Keep the `img` fallback or poster so the page still looks intentional if video fails.

## Browser QA checklist

After replacing media:

- Run `npm run validate`.
- Open `#/home` locally.
- Verify video loads and loops.
- Verify there are no console errors.
- Verify text remains readable over/near the video.
- Verify mobile layout does not crop critical visual content badly.
- Verify reduced-motion behavior remains acceptable.
- Verify deployed GitHub Pages asset paths include `/death-alliance/assets/...`.

## Performance notes

Vite will fingerprint imported media in the production build. Large media files increase GitHub Pages load time. Prefer short optimized clips over high-bitrate exports.

Suggested ffmpeg optimization for a clean asset you own or have rights to process:

```bash
ffmpeg -i input-clean.mp4 \
  -vf "scale='min(1080,iw)':-2" \
  -c:v libx264 -preset slow -crf 24 \
  -an -movflags +faststart \
  vid/homepage-hero-clean.mp4
```

Only run transformations on assets you own, have permission to modify, or generated without restrictions/watermarks.
