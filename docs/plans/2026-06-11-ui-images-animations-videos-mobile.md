# UI Improvements Plan — Images, Animations, Videos, Mobile

**Created:** 2026-06-11
**Scope:** Visual polish, animation richness, video strategy, and mobile/phone UI design

---

## Current State Summary

| Area | Status |
|---|---|
| Animations | 2 keyframes (scan + page-enter), basic hover transitions only |
| Videos | 5 clips compressed to 9.2 MB; clips 2 & 4 unused; no mobile variants |
| Images | 1 hero image (2.3 MB PNG); ui design.png unused (1.4 MB) |
| Mobile | 3 breakpoints (1320/920/560px); side rail collapses; no tablet layout |
| PWA/meta | Viewport tag present; no theme-color, no og:image, no touch icons |

---

## Phase 1 — Quick Wins (1–2 hours)

### 1.1 Remove unused assets
- Delete `vid/clip 2.mp4` and `vid/clip 4.mp4` (4.2 MB total, nothing imports them)
- Delete `img/ui design.png` (1.4 MB, nothing imports it)
- **Files:** `vid/`, `img/`

### 1.2 Add missing head meta tags (`index.html`)
```html
<meta name="theme-color" content="#030000" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta property="og:title" content="Death Alliance — Fictional Archive Network" />
<meta property="og:description" content="A metadata-safe anonymous clue archive for fictional ARG storytelling." />
<meta property="og:image" content="/death-alliance/og-cover.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```
- Also create `og-cover.jpg` (1200×630) — export a cropped version of the reaper artwork with text overlay

### 1.3 Convert hero image to WebP
- Convert `img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png` (2.3 MB) → `img/reaper-hero.webp` (~400–600 KB)
- Add `<source type="image/webp" srcset="...">` in `HomePage.tsx`
- Estimated saving: ~1.7 MB per page load

### 1.4 Add `loading="lazy"` to below-fold images
- ManifestPage portal video poster
- Any image not visible on first screen

---

## Phase 2 — Mobile / Phone UI (2–3 hours)

### 2.1 Add tablet breakpoint (768px)
Currently: side rail collapses at 920px into a stacked layout. At 768px–920px the layout is awkward.

Add `@media (max-width: 768px)` in `src/styles/animations.css`:
```css
@media (max-width: 768px) {
  .side-rail { padding: 12px 10px; }
  .brand-lockup strong { font-size: 15px; }
  .rail-nav a { padding: 9px 10px; font-size: 13px; }
  .case-row { grid-template-columns: 80px 1fr; }
  .hero-copy { padding: 18px; }
  .page-header { padding: 18px; }
  .architecture-grid { grid-template-columns: 1fr; }
}
```

### 2.2 Touch-friendly tap targets
All interactive elements should be ≥48px tall on mobile. Update `src/styles/components.css`:
```css
@media (max-width: 920px) {
  .glow-button, .ghost-button { min-height: 48px; padding-inline: 22px; }
  .vote-actions button, .comment-actions button { min-height: 44px; padding: 10px 14px; }
  input, select, textarea { padding: 13px 14px; font-size: 16px; } /* 16px prevents iOS zoom */
  .rail-nav a { min-height: 48px; display: flex; align-items: center; }
}
```
- Setting `font-size: 16px` on inputs prevents iOS Safari from auto-zooming on focus.

### 2.3 Side rail → bottom nav on mobile
At ≤560px the current stacked side rail takes up too much vertical space.

Replace with a fixed bottom navigation bar on small screens (`src/styles/shell.css`):
```css
@media (max-width: 560px) {
  .side-rail {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: auto;
    z-index: 10;
    flex-direction: row;
    padding: 8px 6px;
    border-right: none;
    border-top: 1px solid rgba(255, 43, 43, .30);
    overflow-x: auto;
  }
  .brand-lockup, .rail-card { display: none; }
  .rail-nav { flex-direction: row; gap: 4px; }
  .rail-nav a { white-space: nowrap; font-size: 11px; padding: 8px 10px; }
  .main-stage { padding-bottom: 72px; } /* clear bottom nav */
}
```

### 2.4 Mobile typography polish
Update `src/styles/animations.css` (560px block):
```css
@media (max-width: 560px) {
  h1 { font-size: clamp(30px, 9vw, 42px); letter-spacing: -.04em; }
  h2 { font-size: 18px; }
  .hero-oath p { font-size: 15px; }
  .terminal-kicker, .eyebrow { letter-spacing: .10em; font-size: 11px; }
  .page-header { padding: 14px; }
  .hero-copy { padding: 16px; }
  .manifest-grid { grid-template-columns: 1fr; }
}
```

### 2.5 Prevent double-tap zoom on buttons
Add to `src/styles/components.css`:
```css
.glow-button, .ghost-button,
.vote-actions button, .comment-actions button {
  touch-action: manipulation;
}
```

---

## Phase 3 — Animation Richness (2–3 hours)

### 3.1 Staggered card entrance
Archive cards and portal cards should stagger in instead of all fading together.
Add to `src/styles/pages.css`:
```css
.example-report-grid .example-report:nth-child(1) { animation-delay: 0ms; }
.example-report-grid .example-report:nth-child(2) { animation-delay: 80ms; }
.example-report-grid .example-report:nth-child(3) { animation-delay: 160ms; }

.architecture-grid .architecture-card:nth-child(1) { animation-delay: 0ms; }
.architecture-grid .architecture-card:nth-child(2) { animation-delay: 100ms; }
.architecture-grid .architecture-card:nth-child(3) { animation-delay: 200ms; }
```

### 3.2 Archive card hover lift
Add to `src/styles/pages.css`:
```css
.example-report {
  transition: transform .18s ease, box-shadow .18s ease;
}
.example-report:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 0 1px rgba(255,43,43,.28), 0 28px 80px rgba(0,0,0,.55), inset 0 0 42px rgba(255,43,43,.06);
}
```

### 3.3 Vote count pulse animation
When a vote fires, flash the count. Add a new keyframe and apply it via a CSS class toggled in React (`src/styles/animations.css`):
```css
@keyframes vote-pulse {
  0% { color: #fff3e2; transform: scale(1); }
  40% { color: var(--gold); transform: scale(1.18); }
  100% { color: #f3d7d0; transform: scale(1); }
}
.vote-bump { animation: vote-pulse .35s ease both; }
```
In `ArchivePage.tsx` and `CaseThread.tsx`, add/remove the `.vote-bump` class on vote click using `useState` + `setTimeout`.

### 3.4 Form field focus glow pulse
Add to `src/styles/base.css`:
```css
@keyframes input-focus-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 43, 43, .35); }
  60% { box-shadow: 0 0 0 5px rgba(255, 43, 43, .12); }
  100% { box-shadow: 0 0 0 2px rgba(255, 43, 43, .16); }
}
input:focus, select:focus, textarea:focus {
  border-color: var(--red);
  animation: input-focus-pulse .4s ease both;
}
```

### 3.5 Error state shake animation
Add to `src/styles/components.css`:
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.error-text { animation: shake .38s ease both; }
```

### 3.6 Navigation active link underline sweep
Replace static `border-left` with an animated left-bar reveal on active/hover state (`src/styles/shell.css`):
```css
.rail-nav a {
  position: relative;
  overflow: hidden;
}
.rail-nav a::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--red);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform .18s ease;
}
.rail-nav a:hover::before,
.rail-nav a.active::before {
  transform: scaleY(1);
}
```

### 3.7 Page transition: slide direction
Instead of blur+fade on every page, add directional slide based on nav order. This requires tracking the previous page index in `App.tsx` and applying `data-direction="left|right"` to `.page-frame`, then CSS:
```css
.page-frame[data-direction="forward"] .page-section {
  animation: slide-in-right .35s ease both;
}
.page-frame[data-direction="back"] .page-section {
  animation: slide-in-left .35s ease both;
}
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(18px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-18px); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

## Phase 4 — Video Strategy (1–2 hours)

### 4.1 Suppress background video on mobile
On small screens the background video burns battery with no visible benefit (opacity 0.22).
Update `App.tsx` or add a CSS rule:
```css
@media (max-width: 920px) {
  .bg-video { display: none; }
  .app-shell {
    background:
      radial-gradient(600px 400px at 48% 8%, rgba(143,11,15,.40), transparent 62%),
      radial-gradient(600px 400px at 88% 0%, rgba(255,43,43,.15), transparent 60%),
      #030000;
  }
}
```
This removes ~2 MB of streaming on mobile without any visible quality loss.

### 4.2 Add `<source>` media query for intro video
If a lower-bitrate mobile clip is generated, wire it:
```tsx
<source src={introLoopMobile} type="video/mp4" media="(max-width: 920px)" />
<source src={introLoop} type="video/mp4" />
```
Generate mobile variant: `ffmpeg -i "clip 1.mp4" -vf scale=720:-2 -crf 32 -preset fast "clip 1_mobile.mp4"`

### 4.3 Wire unused clips 2 and 4
Either:
- **Option A:** Use `clip 2.mp4` (Grim Reaper full reveal) as a looping background on the *Archive* page — more thematic than clip 3
- **Option B:** Use `clip 4.mp4` (text reveal) on the *About* page for cinematic feel
- **Option C:** Delete both to save 4.2 MB (simpler, matches current demo scope)

Recommend **Option A + B** for visual variety across pages; delete them if staying minimal.

### 4.4 Preload strategy
- Keep `preload="auto"` on `clip 1.mp4` (intro, needs immediate play)
- Add `preload="none"` on `clip 3.mp4` (bg) and `clip 5.mp4` (manifest portal) — they're decorative and can load lazily
- This reduces initial page load bytes

### 4.5 Poster image for background video
Currently App.tsx uses the 2.3 MB PNG as the poster. Use a compressed JPEG instead:
- Generate: `ffmpeg -i "vid/clip 3.mp4" -vframes 1 -q:v 85 img/bg-poster.jpg`
- Replace hero PNG poster in App.tsx with the lightweight JPEG

---

## Phase 5 — Image Polish (1–2 hours)

### 5.1 WebP conversion + responsive srcset
Convert reaper artwork and add fallback:
```tsx
<picture>
  <source srcSet={reaperWebp} type="image/webp" />
  <img src={reaperPng} alt="Fictional Grim Reaper with scythe and white halo" ... />
</picture>
```
Generate: `cwebp -q 82 img/reaper.png -o img/reaper.webp`

### 5.2 Add a second artwork variant
The project currently has a single hero image. Options:
- **Variant A:** Generate a portrait-cropped version (800×1200) for mobile hero panel
- **Variant B:** Create an AI-generated alternate scene for the Archive header or case thread background
- Recommended: export a portrait crop of the existing PNG for mobile — no new AI generation needed

### 5.3 OG cover image
Create `img/og-cover.jpg` (1200×630) by compositing:
- Dark background (#030000)
- Reaper artwork centered with red glow
- "DEATH ALLIANCE" title text in the project font
- Used in `og:image` meta tag from Phase 1.2

### 5.4 Favicon update
Current favicon is likely the default Vite icon.
- Create `public/favicon.svg` with a skull icon in red (#ff2b2b) on black
- Add `<link rel="apple-touch-icon" href="/death-alliance/apple-touch-icon.png">` (180×180) in index.html

---

## Phase 6 — Submit Button & Form UX (1 hour)

### 6.1 Loading state on submit button
After `Generate Safe Draft Case` is clicked, show a spinner while "generating":
```tsx
const [generating, setGenerating] = useState(false);

function handleSubmit(event) {
  event.preventDefault();
  if (!canSubmit) return;
  setGenerating(true);
  setTimeout(() => {
    setSubmittedCaseId(createCaseId(302));
    setGenerating(false);
  }, 900); // simulate async
}
```
CSS spinner in `src/styles/components.css`:
```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.25);
  border-top-color: #fff3e2;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
```

### 6.2 Character count on description textarea
Show remaining characters approaching the 30-char minimum and a soft cap:
```tsx
<span className="char-count">
  {draft.description.length < 30
    ? `${30 - draft.description.length} more chars required`
    : `${draft.description.length} chars`}
</span>
```

---

## Implementation Order (Recommended)

| Priority | Phase | Time | Impact |
|---|---|---|---|
| 1 | 1.1 — Remove unused assets | 10 min | -5.6 MB repo |
| 2 | 1.2 — Head meta tags | 20 min | SEO + social |
| 3 | 2.3 — Bottom nav on mobile | 45 min | Big mobile UX win |
| 4 | 2.2 — Touch targets + iOS zoom fix | 30 min | Mobile usability |
| 5 | 4.1 — Suppress bg video on mobile | 15 min | Mobile performance |
| 6 | 3.1 — Staggered card entrance | 20 min | Visual richness |
| 7 | 3.2 — Archive card hover lift | 15 min | Desktop polish |
| 8 | 3.3 — Vote count pulse | 30 min | Micro-interaction |
| 9 | 1.3 — WebP hero image | 20 min | -1.7 MB load |
| 10 | 3.6 — Nav bar sweep animation | 20 min | Navigation polish |
| 11 | 3.4/3.5 — Input focus + error shake | 20 min | Form feedback |
| 12 | 2.1 + 2.4 — Tablet breakpoint + typography | 45 min | Tablet layout |
| 13 | 3.7 — Directional page transitions | 45 min | Advanced UX |
| 14 | 4.3 — Wire clips 2 & 4 to pages | 30 min | Visual variety |
| 15 | 6.1/6.2 — Submit loading + char count | 45 min | Form completeness |
| 16 | 5.4 — Skull favicon + OG cover | 30 min | Brand polish |
