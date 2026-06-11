import { Fingerprint, Flag, Network, RadioTower } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { SideRail } from './components/SideRail';
import { initialDraft } from './data';
import { AboutPage } from './pages/AboutPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ArchivePage } from './pages/ArchivePage';
import { HealthPage } from './pages/HealthPage';
import { HomePage } from './pages/HomePage';
import { ManifestPage } from './pages/ManifestPage';
import { RulesPage } from './pages/RulesPage';
import { SubmitPage } from './pages/SubmitPage';
import { routeFromHash, routeHref } from './routes';
import { createCaseId, isSubmissionTextSafe } from './safety';
import type { DraftCase, PageKey } from './types';

const heroImage = new URL('../img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png', import.meta.url).href;
const heroLoop = new URL('../vid/clip 3.mp4', import.meta.url).href;
const introSafetyTimeoutMs = 12000;

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [activePage, setActivePage] = useState<PageKey>(() => routeFromHash(window.location.hash));
  // Demo-only form state: not persisted to any backend or browser storage
  const [draft, setDraft] = useState<DraftCase>(initialDraft);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  useEffect(() => {
    function syncRoute() {
      setActivePage(routeFromHash(window.location.hash));
    }

    window.addEventListener('hashchange', syncRoute);
    syncRoute();
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    if (!introVisible) return undefined;

    const timer = window.setTimeout(() => setIntroVisible(false), introSafetyTimeoutMs);
    return () => window.clearTimeout(timer);
  }, [introVisible]);

  const hiddenKeyWarning = draft.hiddenKey.length > 0 && draft.hiddenKey.length < 12;
  const formSafe = useMemo(() => isSubmissionTextSafe(`${draft.title}\n${draft.description}`), [draft.title, draft.description]);
  const canSubmit = draft.anonymousName.trim().length >= 2 && draft.title.trim().length >= 4 && draft.description.trim().length >= 30 && draft.consent && formSafe && !hiddenKeyWarning;

  function update<K extends keyof DraftCase>(key: K, value: DraftCase[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmittedCaseId(createCaseId(302));
  }

  return (
    <main className="app-shell">
      {introVisible && <IntroLoader onComplete={() => setIntroVisible(false)} />}

      <video
        aria-label="Cinematic Death Alliance background loop"
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        poster={heroImage}
      >
        <source src={heroLoop} type="video/mp4" />
        Your browser does not support decorative MP4 background video.
      </video>
      <div className="bg-grid" />
      <div className="red-vignette" />

      <SideRail activePage={activePage} />

      <div className="main-stage">
        <header className="top-bar">
          <span>DAEMON NET // STATIC DEMO // PORTFOLIO PREVIEW</span>
          <div className="top-actions">
            <a className="demo-badge" href={routeHref('architecture')} aria-label="Static demo mode details">
              Demo only · not production
            </a>
            <button type="button" className="top-link-button" onClick={() => setIntroVisible(true)}>
              Replay intro
            </button>
            <a className="join-button" href={routeHref('submit')}><RadioTower size={15} /> Join the Alliance</a>
          </div>
        </header>

        <div className="page-frame" data-page={activePage}>
          {activePage === 'home' && <HomePage />}
          {activePage === 'submit' && (
            <SubmitPage
              draft={draft}
              submittedCaseId={submittedCaseId}
              hiddenKeyWarning={hiddenKeyWarning}
              formSafe={formSafe}
              canSubmit={canSubmit}
              onUpdate={update}
              onSubmit={handleSubmit}
            />
          )}
          {activePage === 'archive' && <ArchivePage />}
          {activePage === 'manifest' && <ManifestPage />}
          {activePage === 'architecture' && <ArchitecturePage />}
          {activePage === 'about' && <AboutPage />}
          {activePage === 'rules' && <RulesPage />}
          {activePage === 'health' && <HealthPage />}
        </div>

        <footer className="footer-strip">
          <span><Fingerprint size={16} /> Anonymous identities only</span>
          <span><Network size={16} /> Mirror verification</span>
          <span><Flag size={16} /> Takedown + CID blocklist</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
