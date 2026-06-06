# Death Alliance UI Video Loading Improvements Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Improve the current dark CloudScope-style Death Alliance UI with a cinematic Clip 1 loading screen, better video usage, cleaner responsive layout, and stronger visual polish while keeping the project fictional/ARG-safe.

**Architecture:** Keep the app as a static React/Vite frontend. Add a dedicated intro/loading overlay component that plays `vid/clip 1.mp4` on first page load, then transitions into the dashboard/hero layout. Keep all video assets bundled with the project and decorative; no browser-saved identity state should be introduced.

**Tech Stack:** React, TypeScript, Vite, CSS modules/global CSS, Vitest + React Testing Library, existing local assets in `img/` and `vid/`.

---

## Current State

Project root:
`/home/npfernando/code/personal/github-projects/death-alliance`

Current key files:
- `src/App.tsx` — all UI markup and React state.
- `src/App.css` — current dark red/black dashboard styling.
- `src/App.test.tsx` — UI and safety tests.
- `src/safety.ts` — fictional safety rules/statuses/content validation.
- `img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png` — static Grim Reaper hero image.
- `img/ui design.png` — reference mockup.
- `vid/clip 1.mp4` — skull/reaper hoodie intro; best loading screen candidate.
- `vid/clip 2.mp4` — full Grim Reaper reveal.
- `vid/clip 3.mp4` — Death walks left, good hero transition/background candidate.
- `vid/clip 4.mp4` — text reveal beside Death, currently used as global background loop.
- `vid/clip 5.mp4` — UI portal animation, currently used in media panel.

Important safety constraints:
- Do not add real-world identity or location collection.
- Do not add vigilante or punishment workflows.
- Keep all copy fictional, ARG, anonymized, archive/community-review focused.
- Do not introduce browser-saved identity state or persistent client-side identity caches.

---

## Acceptance Criteria

- On first page load, Clip 1 displays as a full-screen cinematic loading overlay.
- Loading overlay can auto-fade after video readiness/time threshold and can be skipped with a visible button.
- Main UI remains visible and usable after loading transition.
- User preference for reduced motion is respected: loading overlay becomes short/static and background videos are visually subdued.
- Hero/background videos do not make text unreadable.
- Recent cases panel and form panels stay inside viewport without horizontal clipping at common desktop widths.
- Mobile/tablet layouts stack cleanly.
- Form flow still works: fill fictional fields, consent checkbox, generate safe draft case.
- `npm run validate` passes.
- Browser QA has no JS console errors.

---

## Task 1: Add a failing test for the Clip 1 loading overlay

**Objective:** Define expected behavior for a first-load cinematic loading screen.

**Files:**
- Modify: `src/App.test.tsx`

**Step 1: Add test**

Add this test after the existing landing-page render test:

```tsx
it('renders a skippable Clip 1 cinematic loading overlay before the archive UI', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();
  expect(screen.getByText(/initializing fictional archive/i)).toBeInTheDocument();

  const skip = screen.getByRole('button', { name: /skip intro/i });
  await user.click(skip);

  expect(screen.queryByLabelText(/death alliance cinematic loading screen/i)).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /welcome to the death alliance/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run:

```bash
npm run test -- src/App.test.tsx
```

Expected:
- FAIL because the loading overlay does not exist yet.

---

## Task 2: Create intro loading state and overlay markup

**Objective:** Implement the Clip 1 loading overlay with skip support.

**Files:**
- Modify: `src/App.tsx`

**Step 1: Import React effect hook**

Change:

```tsx
import { useMemo, useState } from 'react';
```

To:

```tsx
import { useEffect, useMemo, useState } from 'react';
```

**Step 2: Add Clip 1 asset URL**

Near the existing asset constants:

```tsx
const introLoop = new URL('../vid/clip 1.mp4', import.meta.url).href;
```

**Step 3: Add intro state in `App()`**

Inside `function App()` before draft state:

```tsx
const [introVisible, setIntroVisible] = useState(true);
```

**Step 4: Add auto-fade timer**

Inside `App()` after state declarations:

```tsx
useEffect(() => {
  const timer = window.setTimeout(() => setIntroVisible(false), 5200);
  return () => window.clearTimeout(timer);
}, []);
```

**Step 5: Add overlay JSX at top of `<main>`**

Inside `<main className="app-shell">`, before background video:

```tsx
{introVisible && (
  <section className="intro-loader" aria-label="Death Alliance cinematic loading screen">
    <video className="intro-video" autoPlay muted playsInline preload="auto" poster={heroImage}>
      <source src={introLoop} type="video/mp4" />
    </video>
    <div className="intro-shade" />
    <div className="intro-copy">
      <Skull size={54} />
      <p className="terminal-kicker">Initializing fictional archive</p>
      <h2>Death Alliance</h2>
      <span>Metadata-safe archive console loading...</span>
      <button type="button" className="ghost-button intro-skip" onClick={() => setIntroVisible(false)}>
        Skip intro
      </button>
    </div>
  </section>
)}
```

**Step 6: Run test**

```bash
npm run test -- src/App.test.tsx
```

Expected:
- New loading overlay test passes.
- Existing tests still pass.

---

## Task 3: Style the Clip 1 loading overlay

**Objective:** Make Clip 1 feel like a premium death-themed loading screen without blocking accessibility.

**Files:**
- Modify: `src/App.css`

**Step 1: Add overlay CSS near background-video styles**

```css
.intro-loader {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: #000;
  overflow: hidden;
  animation: introFadeOut .8s ease 4.7s both;
}

.intro-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.12) brightness(.72) saturate(1.1);
}

.intro-shade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 34%, transparent 0 26%, rgba(0, 0, 0, .42) 55%, rgba(0, 0, 0, .92) 100%),
    linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.72));
}

.intro-copy {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 10px;
  max-width: 680px;
  padding: 32px;
  text-align: center;
  color: #fff3e2;
  text-shadow: 0 0 28px rgba(255, 43, 43, .55);
}

.intro-copy svg {
  color: #fff3e2;
  filter: drop-shadow(0 0 18px rgba(255, 43, 43, .80));
}

.intro-copy h2 {
  margin: 0;
  color: #fff3e2;
  font-size: clamp(42px, 8vw, 92px);
  text-transform: uppercase;
  letter-spacing: -.05em;
}

.intro-copy span {
  color: var(--muted);
}

.intro-skip {
  margin-top: 18px;
}

@keyframes introFadeOut {
  to {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
```

**Step 2: Add reduced motion behavior**

At the bottom of `src/App.css` before responsive media queries or after them:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }

  .intro-loader {
    animation-delay: 1.2s;
  }

  .bg-video,
  .portal-loop,
  .intro-video {
    filter: grayscale(.55) brightness(.48) contrast(1.05);
  }
}
```

**Step 3: Run tests/build**

```bash
npm run validate
```

Expected:
- Safety check passes.
- Tests pass.
- Build passes.

---

## Task 4: Improve video orchestration and fallback behavior

**Objective:** Use supplied videos intentionally instead of overloading the page.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Recommended video roles:**
- `clip 1.mp4` — first-load intro screen.
- `clip 3.mp4` or `clip 4.mp4` — global subtle background loop.
- `clip 5.mp4` — portal/media panel loop.
- `clip 2.mp4` — reserve for future route/section transition, do not add yet unless needed.

**Step 1: Prefer Clip 3 for global background if Clip 4 text conflicts**

In `src/App.tsx`, optionally change:

```tsx
const heroLoop = new URL('../vid/clip 4.mp4', import.meta.url).href;
```

To:

```tsx
const heroLoop = new URL('../vid/clip 3.mp4', import.meta.url).href;
```

Use Clip 3 if Clip 4’s embedded text competes with real HTML text.

**Step 2: Add explicit video fallback text**

For each video element, add accessible fallback text inside the `<video>` tag after `<source>`:

```tsx
Your browser does not support decorative MP4 background video.
```

**Step 3: Verify manually**

Run:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Open:
`http://127.0.0.1:5173/`

Expected:
- Intro uses Clip 1.
- Main page background remains atmospheric but text stays readable.
- Portal media panel uses Clip 5.

---

## Task 5: Polish dashboard panel layout and spacing

**Objective:** Reduce cramped areas and improve readability on desktop.

**Files:**
- Modify: `src/App.css`

**Step 1: Cap main content width**

Update `.main-stage`:

```css
.main-stage {
  position: relative;
  z-index: 2;
  min-width: 0;
  width: min(100%, 1480px);
  padding: 14px 24px 28px;
}
```

**Step 2: Improve operations grid at medium desktop widths**

Replace current `@media (max-width: 1240px)` with:

```css
@media (max-width: 1320px) {
  .operations-grid {
    grid-template-columns: minmax(320px, 1fr) minmax(320px, 1fr);
  }

  .recent-panel {
    grid-column: 1 / -1;
  }
}
```

**Step 3: Improve right cases table on small widths**

Ensure this exists:

```css
@media (max-width: 920px) {
  .case-row {
    grid-template-columns: 1fr;
  }

  .recent-panel .case-row span:nth-child(4) {
    display: inline;
  }
}
```

**Step 4: Browser QA**

Use browser screenshot/vision at:
- Desktop width default.
- Narrow/mobile if browser tool supports resizing, or manually inspect responsive stacking by reducing viewport if available.

Expected:
- No horizontal clipping.
- Recent cases status pills remain inside border.
- Hero title remains legible.

---

## Task 6: Make loading overlay non-blocking after failures

**Objective:** If video fails to load, user must still reach the site.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Add video error handler**

In intro video element:

```tsx
<video
  className="intro-video"
  autoPlay
  muted
  playsInline
  preload="auto"
  poster={heroImage}
  onError={() => setIntroVisible(false)}
>
```

**Step 2: Add a conservative maximum timeout**

Keep the existing timer from Task 2. It already prevents permanent blocking.

**Step 3: Add test for skip path only**

No need to simulate media errors unless worth the complexity. The manual review plus timeout is sufficient for this static portfolio project.

**Step 4: Validate**

```bash
npm run validate
```

Expected:
- Full validation passes.

---

## Task 7: Add optional intro replay control

**Objective:** Let reviewers re-watch Clip 1 without requiring page reload.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`
- Modify: `src/App.test.tsx`

**Step 1: Add button in top bar**

In `.top-bar`, before Join link:

```tsx
<button type="button" className="top-link-button" onClick={() => setIntroVisible(true)}>
  Replay intro
</button>
```

**Step 2: Style button**

```css
.top-link-button {
  border: 1px solid rgba(255, 43, 43, .34);
  background: rgba(0, 0, 0, .28);
  color: var(--muted);
  padding: 7px 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.top-link-button:hover {
  color: var(--fg);
  border-color: var(--red);
}
```

**Step 3: Add test**

```tsx
it('can replay the cinematic intro from the top bar', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /skip intro/i }));
  expect(screen.queryByLabelText(/death alliance cinematic loading screen/i)).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /replay intro/i }));
  expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();
});
```

**Step 4: Validate**

```bash
npm run validate
```

Expected:
- Test suite passes.

---

## Task 8: Improve README with media asset notes

**Objective:** Document how the local video/image assets are used.

**Files:**
- Modify: `README.md`

**Step 1: Add section**

```md
## Cinematic UI Assets

This project uses local decorative media assets:

- `vid/clip 1.mp4` — first-load cinematic intro/loading overlay.
- `vid/clip 3.mp4` or `vid/clip 4.mp4` — subtle global background loop.
- `vid/clip 5.mp4` — portal panel background loop.
- `img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png` — Grim Reaper hero artwork.
- `img/ui design.png` — UI reference mockup.

The videos are decorative only. The site must remain readable and usable if videos fail to load or if reduced-motion preferences are enabled.
```

**Step 2: Validate docs-only change**

```bash
npm run validate
```

Expected:
- Full validation still passes.

---

## Task 9: Browser QA checklist

**Objective:** Verify the actual visual result, not just tests.

**Files:**
- No source change unless issues are found.

**Step 1: Start server**

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Expected:
- Vite starts at `http://127.0.0.1:5173/`.

**Step 2: Desktop review**

Open:
`http://127.0.0.1:5173/`

Check:
- Clip 1 loading overlay appears first.
- Skip intro works.
- Overlay auto-fades after ~5.2 seconds.
- Sidebar remains fixed/sticky and readable.
- Hero reaper image/video does not obscure text.
- Submit/tracker/recent cases panels align cleanly.
- Recent cases panel is not clipped.

**Step 3: Form flow review**

Use sample:
- Anonymous Name: `Silent Witness`
- Case Title: `The Stolen Engine`
- Case Description: `A fictional case about a betrayed inventor, hidden laboratory, and stolen engine inside a created story universe.`
- Consent: checked

Expected:
- Submit button enables.
- Click creates: `Safe draft created: DA-000302-v1 · Status: Safety Cleanup Required`.

**Step 4: Console review**

Open browser console or use Hermes browser console tool.

Expected:
- No JS errors.
- No failed local asset loads.

---

## Task 10: Final commit and push

**Objective:** Ship the improvement branch to GitHub.

**Files:**
- All modified files from tasks above.

**Step 1: Run final validation**

```bash
npm run validate
```

Expected:
- Safety check passed.
- Tests passed.
- Production build passed.

**Step 2: Check git status**

```bash
git status --short
```

Expected:
- Only intended files modified.

**Step 3: Commit**

```bash
git add src/App.tsx src/App.css src/App.test.tsx README.md docs/plans/2026-06-06-ui-video-loading-improvements.md
git commit -m "Improve cinematic loading and video UI"
```

**Step 4: Push**

```bash
git push
```

Expected:
- Push succeeds to `origin/main`.

---

## Notes / Design Decisions

- Clip 1 should be the loading screen because it is the most focused intro: skull, dark smoke, halo, crimson effects.
- Do not force users to watch the full intro every time. Provide Skip and timeout.
- Do not store “intro already seen” in browser storage because project rules prohibit persistent client-side identity or preference caches.
- Keep videos decorative; the semantic page content must be real HTML text.
- Avoid real-world vengeance copy. Use fictional archive, cleanup, signed package, and community-review language.
- Keep `clip 2.mp4` unused for now unless a future route transition needs it. This avoids overloading bandwidth and visual noise.

---

## Recommended Build Order

1. Task 1 — Add failing test.
2. Task 2 — Implement intro overlay behavior.
3. Task 3 — Style intro overlay and reduced motion.
4. Task 4 — Tune video roles/fallbacks.
5. Task 5 — Polish layout spacing.
6. Task 6 — Add media failure safety.
7. Task 7 — Optional replay intro button.
8. Task 8 — README docs.
9. Task 9 — Browser QA.
10. Task 10 — Commit and push.
