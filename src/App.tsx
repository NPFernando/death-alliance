import {
  Archive,
  BadgeCheck,
  Copy,
  Eye,
  ExternalLink,
  FileWarning,
  Fingerprint,
  Flag,
  KeyRound,
  LockKeyhole,
  Network,
  RadioTower,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Swords,
  Vote,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { caseCategories, contentModes, createCaseId, isSubmissionTextSafe, publishingSteps } from './safety';

const heroImage = new URL('../img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png', import.meta.url).href;
const introLoop = new URL('../vid/clip 1.mp4', import.meta.url).href;
const heroLoop = new URL('../vid/clip 3.mp4', import.meta.url).href;
const portalLoop = new URL('../vid/clip 5.mp4', import.meta.url).href;
const introSafetyTimeoutMs = 12000;

type PageKey = 'home' | 'submit' | 'archive' | 'manifest' | 'rules' | 'health';

type NavItem = {
  key: PageKey;
  label: string;
  marker: string;
};

type DraftCase = {
  anonymousName: string;
  hiddenKey: string;
  contentMode: string;
  title: string;
  category: string;
  description: string;
  consent: boolean;
};

const navItems: NavItem[] = [
  { key: 'home', label: 'Home', marker: '>_' },
  { key: 'submit', label: 'Submit clue', marker: '/' },
  { key: 'archive', label: 'Archive', marker: '/' },
  { key: 'manifest', label: 'Manifest', marker: '/' },
  { key: 'rules', label: 'Rules', marker: '/' },
  { key: 'health', label: 'Status', marker: '/' },
];

const initialDraft: DraftCase = {
  anonymousName: '',
  hiddenKey: '',
  contentMode: contentModes[0],
  title: '',
  category: caseCategories[3],
  description: '',
  consent: false,
};

const recentCases = [
  { id: 'DA-000184', title: 'The Stolen Engine', status: 'Strongly Supported', updated: 'v1 · 120/14' },
  { id: 'DA-000212', title: 'The Silent Laboratory', status: 'Counter-Evidence Added', updated: 'v2 · 77/39' },
  { id: 'DA-000301', title: 'Archive of the Broken Oath', status: 'Needs More Evidence', updated: 'v1 · 31/28' },
  { id: 'DA-000447', title: 'The Redacted Blueprint', status: 'Disputed', updated: 'v3 · 54/51' },
];

const exampleReports = [
  {
    id: 'DA-DRACULA-001',
    title: 'The Crimson Castle Ledger',
    villain: 'Count Dracula-inspired antagonist',
    category: 'Abuse of Authority',
    status: 'Heavily Disputed',
    summary: 'A fictional village archive claims a nocturnal noble used fear, forged medical notes, and sealed castle records to control witnesses.',
    votes: { up: 248, down: 91 },
    comments: 37,
    evidence: ['Cleaned castle map', 'Witness-lore timeline', 'Counter-evidence diary note'],
  },
  {
    id: 'DA-MORIARTY-014',
    title: 'The Clockwork Patent Theft',
    villain: 'Professor Moriarty-inspired strategist',
    category: 'Invention Theft',
    status: 'Strongly Supported',
    summary: 'A fictional inventor report alleges a criminal mastermind redirected a public-good engine patent through shell academies.',
    votes: { up: 412, down: 38 },
    comments: 64,
    evidence: ['Signed blueprint hash', 'Cleaned lab notebook', 'Archive manifest link'],
  },
  {
    id: 'DA-HOOK-022',
    title: 'The Stolen Star Compass',
    villain: 'Captain Hook-inspired pirate lord',
    category: 'Technology Theft',
    status: 'Counter-Evidence Added',
    summary: 'A fictional maritime case where rival crews debate whether a navigation device was stolen, inherited, or planted as bait.',
    votes: { up: 173, down: 84 },
    comments: 29,
    evidence: ['Cleaned port manifest', 'Dispute comment thread', 'Replica compass photos'],
  },
];

const statusSteps = [
  { label: 'Safety Cleanup Required', body: 'Draft is scanned for hidden metadata and visible private-data risks.', icon: ShieldAlert },
  { label: 'Cleaned Package Generated', body: 'Only cleaned fictional files become part of a signed public package.', icon: BadgeCheck },
  { label: 'Published + Community Review', body: 'Community support, dispute, evidence updates, and status changes begin.', icon: Vote },
];

function routeFromHash(hash: string): PageKey {
  const normalized = hash.replace(/^#\/?/, '').trim();
  return navItems.some((item) => item.key === normalized) ? (normalized as PageKey) : 'home';
}

function routeHref(page: PageKey) {
  return `#/${page}`;
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [activePage, setActivePage] = useState<PageKey>(() => routeFromHash(window.location.hash));
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
          <span>DAEMON NET // P2P ENABLED // ENCRYPTED</span>
          <div className="top-actions">
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

function IntroLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <section className="intro-loader" aria-label="Death Alliance cinematic loading screen">
      <video
        className="intro-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={heroImage}
        onEnded={onComplete}
        onError={onComplete}
      >
        <source src={introLoop} type="video/mp4" />
        Your browser does not support decorative MP4 background video.
      </video>
      <div className="intro-shade" />
      <div className="intro-copy">
        <Skull size={54} />
        <p className="terminal-kicker">Initializing fictional archive</p>
        <h2>Death Alliance</h2>
        <span>Metadata-safe archive console loading...</span>
        <button type="button" className="ghost-button intro-skip" onClick={onComplete}>
          Skip intro
        </button>
      </div>
    </section>
  );
}

function SideRail({ activePage }: { activePage: PageKey }) {
  return (
    <aside className="side-rail">
      <div className="brand-lockup">
        <Skull size={42} />
        <div>
          <strong>DEATH ALLIANCE</strong>
          <span>fictional archive network</span>
        </div>
      </div>

      <nav aria-label="Death Alliance sections" className="rail-nav">
        {navItems.map((item) => (
          <a key={item.key} className={activePage === item.key ? 'active' : undefined} href={routeHref(item.key)}>
            {item.marker} {item.label}
          </a>
        ))}
      </nav>

      <section className="rail-card">
        <h2>System Status</h2>
        <dl>
          <div><dt>Network</dt><dd className="online">online</dd></div>
          <div><dt>Archive</dt><dd>synced</dd></div>
          <div><dt>Nodes</dt><dd>42</dd></div>
          <div><dt>Version</dt><dd>v4.demo</dd></div>
        </dl>
      </section>

      <section className="rail-card">
        <h2>Latest Archive</h2>
        <p className="cid-row">bafy-demo-root <Copy size={14} /></p>
        <a className="rail-button" href={routeHref('manifest')}>View Manifest</a>
      </section>
    </aside>
  );
}

function HomePage() {
  return (
    <section className="page-section home-page" aria-labelledby="hero-title">
      <div className="hero-console">
        <div className="reaper-frame" aria-label="Death Alliance Grim Reaper artwork">
          <img src={heroImage} alt="Fictional Grim Reaper with scythe and white halo" />
          <div className="scan-line" />
        </div>

        <div className="hero-copy">
          <p className="terminal-kicker">CINEMATIC FICTIONAL ARCHIVE</p>
          <h1 id="hero-title">WELCOME TO THE DEATH ALLIANCE</h1>
          <div className="hero-oath" aria-label="Death Alliance fictional cinematic motto">
            <p>Welcome to the Death Alliance.</p>
            <p>We speak for the powerless and wield the sword for the wronged.</p>
            <p>If you witness evil, please submit it here.</p>
            <p>After verification, death will come to deliver judgment.</p>
          </div>
          <div className="hero-actions">
            <a href={routeHref('submit')} className="glow-button">Submit a Fictional Clue</a>
            <a href={routeHref('archive')} className="ghost-button">Browse Archive</a>
            <a href={routeHref('health')} className="ghost-button">Archive Health</a>
          </div>
        </div>
      </div>

      <section className="notice-panel" aria-label="Fictional safety notice">
        <ShieldAlert />
        <div>
          <h2>Fictional / ARG / roleplay only</h2>
          <ul className="hero-bullets warning-bullets">
            <li><Swords size={18} /> Fictional archive for wronged inventors, hidden crimes, and buried truths.</li>
            <li><Eye size={18} /> Submit story-world clues only. The archive does not target real people.</li>
            <li><ShieldCheck size={18} /> After cleanup, the signed package enters public community review.</li>
          </ul>
          <p>Do not submit real private information, threats, harassment, doxxing material, or accusations against identifiable real people. This site concept collects fictional archive clues only.</p>
        </div>
      </section>
    </section>
  );
}

type SubmitPageProps = {
  draft: DraftCase;
  submittedCaseId: string | null;
  hiddenKeyWarning: boolean;
  formSafe: boolean;
  canSubmit: boolean;
  onUpdate: <K extends keyof DraftCase>(key: K, value: DraftCase[K]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function SubmitPage({ draft, submittedCaseId, hiddenKeyWarning, formSafe, canSubmit, onUpdate, onSubmit }: SubmitPageProps) {
  return (
    <section className="page-section" aria-labelledby="submit-title">
      <PageHeader eyebrow="Anonymous clue portal" title="Submit fictional clue" body="This page can now evolve independently with its own animations, scan states, cleanup warnings, upload flow, and package preview." />

      <div className="operations-grid submit-layout">
        <form className="portal-card submit-panel" onSubmit={onSubmit}>
          <div className="panel-head">
            <span className="panel-caret">›_</span>
            <div>
              <p className="eyebrow">Intake form</p>
              <h2 id="submit-title">Safe draft case</h2>
            </div>
          </div>

          <label>Anonymous Name
            <input value={draft.anonymousName} onChange={(event) => onUpdate('anonymousName', event.target.value)} placeholder="Silent Witness" />
          </label>

          <label>Hidden Key <span className="optional">optional but recommended</span>
            <input type="password" value={draft.hiddenKey} onChange={(event) => onUpdate('hiddenKey', event.target.value)} placeholder="Retype on each visit; never reused elsewhere" />
          </label>
          <p className="micro-warning"><KeyRound size={16} /> Your hidden key cannot be recovered. Do not use a real password from another website.</p>
          {hiddenKeyWarning && <p className="error-text">Use at least 12 characters for a hidden key, or leave it blank for a one-time submission.</p>}

          <div className="form-row">
            <label>Content Mode
              <select value={draft.contentMode} onChange={(event) => onUpdate('contentMode', event.target.value)}>
                {contentModes.map((mode) => <option key={mode}>{mode}</option>)}
              </select>
            </label>

            <label>Case Category
              <select value={draft.category} onChange={(event) => onUpdate('category', event.target.value)}>
                {caseCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
          </div>

          <label>Case Title
            <input value={draft.title} onChange={(event) => onUpdate('title', event.target.value)} placeholder="The Stolen Engine" />
          </label>

          <label>Case Description
            <textarea value={draft.description} onChange={(event) => onUpdate('description', event.target.value)} placeholder="Write fictional, anonymized, story-world details only." />
          </label>
          {!formSafe && <p className="error-text">This draft appears to reference unsafe private-data or real-world targeting terms. Rewrite it as fictional/anonymized story content.</p>}

          <div className="upload-box">
            <FileWarning />
            <div>
              <strong>Upload processing placeholder</strong>
              <p>Future evidence uploads must pass sandboxing, metadata cleanup, visible private-data checks, package hashing, and signing before archive distribution.</p>
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={draft.consent} onChange={(event) => onUpdate('consent', event.target.checked)} />
            <span>I confirm this submission is fictional, anonymized, roleplay-based, or part of a created story universe, and contains no real private information or real-world accusations against identifiable people.</span>
          </label>

          <button className="glow-button submit-button" disabled={!canSubmit}>Generate Safe Draft Case</button>
          {submittedCaseId && <p className="success-text">Safe draft created: {submittedCaseId}-v1 · Status: Safety Cleanup Required</p>}
        </form>

        <StatusTracker />
      </div>
    </section>
  );
}

function StatusTracker() {
  return (
    <section className="portal-card tracker-panel">
      <div className="panel-head">
        <span className="panel-caret">›_</span>
        <div>
          <p className="eyebrow">Status flow</p>
          <h2>Track archive status</h2>
        </div>
      </div>
      <label>Submission ID
        <div className="track-row">
          <input placeholder="DA-000302" />
          <button type="button" className="ghost-button small">Track</button>
        </div>
      </label>
      <div className="status-flow">
        {statusSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.label}>
              <Icon size={22} />
              <div>
                <strong>{step.label}</strong>
                <p>{step.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ArchivePage() {
  return (
    <section className="page-section" aria-labelledby="archive-title">
      <PageHeader eyebrow="Community dispute layer" title="Recent fictional cases" body="Archive browsing is separated from submission so case cards, filters, voting signals, and dispute animations can be designed as their own experience." />

      <section className="example-report-grid" aria-label="Example fictional archive reports">
        {exampleReports.map((report) => (
          <article className="portal-card example-report" key={report.id}>
            <div className="report-topline">
              <span className="case-id">{report.id}</span>
              <span className="status-pill">{report.status}</span>
            </div>
            <h2>{report.title}</h2>
            <p className="report-villain">{report.villain} · {report.category}</p>
            <p>{report.summary}</p>
            <div className="report-signals" aria-label={`${report.title} community signals`}>
              <span>▲ {report.votes.up} upvotes</span>
              <span>▼ {report.votes.down} downvotes</span>
              <span>{report.comments} comments</span>
            </div>
            <div className="evidence-links" aria-label={`${report.title} evidence links`}>
              {report.evidence.map((item) => (
                <a href={routeHref('manifest')} key={item}><ExternalLink size={14} /> {item}</a>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="portal-card recent-panel archive-page-card">
        <div className="panel-head">
          <span className="panel-caret">›_</span>
          <div>
            <p className="eyebrow">Compact archive index</p>
            <h2>Live-style archive table</h2>
          </div>
        </div>
        <div className="case-table" role="table" aria-label="Recent fictional cases">
          <div className="case-row table-head" role="row">
            <span>ID</span><span>Title</span><span>Status</span><span>Signals</span>
          </div>
          {recentCases.map((item) => (
            <div className="case-row" role="row" key={item.id}>
              <span className="case-id">{item.id}</span>
              <strong>{item.title}</strong>
              <span className="status-pill">{item.status}</span>
              <span>{item.updated}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function ManifestPage() {
  return (
    <section className="page-section" aria-labelledby="manifest-title">
      <PageHeader eyebrow="Signed public archive" title="Manifest and archive flow" body="Manifest verification, package signatures, and static export previews now live on a dedicated design surface." />

      <section className="manifest-grid">
        <article className="portal-card video-card">
          <video className="portal-loop" autoPlay muted loop playsInline poster={heroImage}>
            <source src={portalLoop} type="video/mp4" />
            Your browser does not support decorative MP4 background video.
          </video>
          <div>
            <p className="eyebrow">Archive ritual UI</p>
            <h2>Media-backed loading background</h2>
            <p>The supplied AI clips are wired as local MP4 loops for the hero and portal panels. They remain decorative and do not affect submission safety.</p>
          </div>
        </article>

        <article className="portal-card flow-card">
          <div className="panel-head">
            <Archive />
            <div>
              <p className="eyebrow">V4 publishing rule</p>
              <h2 id="manifest-title">Cleaned archive flow</h2>
            </div>
          </div>
          <ol className="timeline">
            {publishingSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="signature-box">
            <LockKeyhole />
            <p><strong>Public archive distribution system:</strong> signed manifests, IPFS CIDs, torrent snapshots, official mirrors, version registry, and CID blocklist.</p>
          </div>
        </article>
      </section>
    </section>
  );
}

function RulesPage() {
  return (
    <section className="page-section" aria-labelledby="rules-title">
      <PageHeader eyebrow="Submission rules" title="Fictional / ARG / roleplay only" body="Rules are isolated so future warning screens, consent animations, and safety-copy experiments do not clutter the landing page." />

      <section className="notice-panel rules-card" aria-label="Fictional safety notice">
        <ShieldAlert />
        <div>
          <h2 id="rules-title">Safety boundary</h2>
          <p>Do not submit real private information, threats, harassment, doxxing material, or accusations against identifiable real people. This site concept collects fictional archive clues only.</p>
        </div>
      </section>

      <section className="portal-card rules-grid">
        <article>
          <h2>Allowed story content</h2>
          <p>Fictional clues, roleplay cases, ARG-style evidence, mystery reports, worldbuilding content, novel-inspired injustice cases, fictional technology theft cases, and fictional dispute comments.</p>
        </article>
        <article>
          <h2>Blocked content</h2>
          <p>Real-world targeting, private media, threats, harassment, revenge content, doxxing material, unsafe metadata, or content aimed at an identifiable real person.</p>
        </article>
      </section>
    </section>
  );
}

function HealthPage() {
  return (
    <section className="page-section" aria-labelledby="health-title">
      <PageHeader eyebrow="Archive health" title="Status and mirror verification" body="Health checks now have their own page for future mirror cards, CID blocklist state, signature checks, and animated network diagrams." />

      <section className="health-panel">
        <div>
          <p className="eyebrow">Archive health</p>
          <h2 id="health-title">Latest signed manifest</h2>
          <p>Version v4-demo · signature valid · latest archive CID pending · torrent snapshot queued · known mirrors 0 · blocklisted CIDs 0.</p>
        </div>
        <div className="manifest-code">death-alliance-manifest.json<br />DA-OFFICIAL-KEY-01<br />Final cleaned submission → Direct IPFS/torrent publish</div>
      </section>
    </section>
  );
}

function PageHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="page-header">
      <p className="terminal-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </header>
  );
}

export default App;
