import {
  Archive,
  BadgeCheck,
  Copy,
  Eye,
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

type DraftCase = {
  anonymousName: string;
  hiddenKey: string;
  contentMode: string;
  title: string;
  category: string;
  description: string;
  consent: boolean;
};

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

const statusSteps = [
  { label: 'Safety Cleanup Required', body: 'Draft is scanned for hidden metadata and visible private-data risks.', icon: ShieldAlert },
  { label: 'Cleaned Package Generated', body: 'Only cleaned fictional files become part of a signed public package.', icon: BadgeCheck },
  { label: 'Published + Community Review', body: 'Community support, dispute, evidence updates, and status changes begin.', icon: Vote },
];

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [draft, setDraft] = useState<DraftCase>(initialDraft);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  useEffect(() => {
    if (!introVisible) return undefined;

    const timer = window.setTimeout(() => setIntroVisible(false), 5200);
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
      {introVisible && (
        <section className="intro-loader" aria-label="Death Alliance cinematic loading screen">
          <video
            className="intro-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={heroImage}
            onError={() => setIntroVisible(false)}
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
            <button type="button" className="ghost-button intro-skip" onClick={() => setIntroVisible(false)}>
              Skip intro
            </button>
          </div>
        </section>
      )}

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

      <aside className="side-rail">
        <div className="brand-lockup">
          <Skull size={42} />
          <div>
            <strong>DEATH ALLIANCE</strong>
            <span>fictional archive network</span>
          </div>
        </div>

        <nav aria-label="Death Alliance sections" className="rail-nav">
          <a className="active" href="#home">&gt;_ Home</a>
          <a href="#submit">/ Submit clue</a>
          <a href="#archive">/ Archive</a>
          <a href="#manifest">/ Manifest</a>
          <a href="#rules">/ Rules</a>
          <a href="#health">/ Status</a>
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
          <a className="rail-button" href="#manifest">View Manifest</a>
        </section>
      </aside>

      <div className="main-stage" id="home">
        <header className="top-bar">
          <span>DAEMON NET // P2P ENABLED // ENCRYPTED</span>
          <div className="top-actions">
            <button type="button" className="top-link-button" onClick={() => setIntroVisible(true)}>
              Replay intro
            </button>
            <a className="join-button" href="#submit"><RadioTower size={15} /> Join the Alliance</a>
          </div>
        </header>

        <section className="hero-console" aria-labelledby="hero-title">
          <div className="reaper-frame" aria-label="Death Alliance Grim Reaper artwork">
            <img src={heroImage} alt="Fictional Grim Reaper with scythe and white halo" />
            <div className="scan-line" />
          </div>

          <div className="hero-copy">
            <p className="terminal-kicker">CINEMATIC FICTIONAL ARCHIVE</p>
            <h1 id="hero-title">WELCOME TO THE DEATH ALLIANCE</h1>
            <ul className="hero-bullets">
              <li><Swords size={18} /> Fictional archive for wronged inventors, hidden crimes, and buried truths.</li>
              <li><Eye size={18} /> Submit story-world clues only. The archive does not target real people.</li>
              <li><ShieldCheck size={18} /> After cleanup, the signed package enters public community review.</li>
            </ul>
            <div className="hero-actions">
              <a href="#submit" className="glow-button">Submit a Fictional Clue</a>
              <a href="#archive" className="ghost-button">Browse Archive</a>
              <a href="#health" className="ghost-button">Archive Health</a>
            </div>
          </div>
        </section>

        <section className="notice-panel" id="rules" aria-label="Fictional safety notice">
          <ShieldAlert />
          <div>
            <h2>Fictional / ARG / roleplay only</h2>
            <p>Do not submit real private information, threats, harassment, doxxing material, or accusations against identifiable real people. This site concept collects fictional archive clues only.</p>
          </div>
        </section>

        <section className="operations-grid" id="submit">
          <form className="portal-card submit-panel" onSubmit={handleSubmit}>
            <div className="panel-head">
              <span className="panel-caret">›_</span>
              <div>
                <p className="eyebrow">Anonymous clue portal</p>
                <h2>Submit fictional clue</h2>
              </div>
            </div>

            <label>Anonymous Name
              <input value={draft.anonymousName} onChange={(event) => update('anonymousName', event.target.value)} placeholder="Silent Witness" />
            </label>

            <label>Hidden Key <span className="optional">optional but recommended</span>
              <input type="password" value={draft.hiddenKey} onChange={(event) => update('hiddenKey', event.target.value)} placeholder="Retype on each visit; never reused elsewhere" />
            </label>
            <p className="micro-warning"><KeyRound size={16} /> Your hidden key cannot be recovered. Do not use a real password from another website.</p>
            {hiddenKeyWarning && <p className="error-text">Use at least 12 characters for a hidden key, or leave it blank for a one-time submission.</p>}

            <div className="form-row">
              <label>Content Mode
                <select value={draft.contentMode} onChange={(event) => update('contentMode', event.target.value)}>
                  {contentModes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>

              <label>Case Category
                <select value={draft.category} onChange={(event) => update('category', event.target.value)}>
                  {caseCategories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
            </div>

            <label>Case Title
              <input value={draft.title} onChange={(event) => update('title', event.target.value)} placeholder="The Stolen Engine" />
            </label>

            <label>Case Description
              <textarea value={draft.description} onChange={(event) => update('description', event.target.value)} placeholder="Write fictional, anonymized, story-world details only." />
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
              <input type="checkbox" checked={draft.consent} onChange={(event) => update('consent', event.target.checked)} />
              <span>I confirm this submission is fictional, anonymized, roleplay-based, or part of a created story universe, and contains no real private information or real-world accusations against identifiable people.</span>
            </label>

            <button className="glow-button submit-button" disabled={!canSubmit}>Generate Safe Draft Case</button>
            {submittedCaseId && <p className="success-text">Safe draft created: {submittedCaseId}-v1 · Status: Safety Cleanup Required</p>}
          </form>

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

          <section className="portal-card recent-panel" id="archive">
            <div className="panel-head">
              <span className="panel-caret">›_</span>
              <div>
                <p className="eyebrow">Community dispute layer</p>
                <h2>Recent fictional cases</h2>
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

        <section className="manifest-grid" id="manifest">
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
                <h2>Cleaned archive flow</h2>
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

        <section className="health-panel" id="health">
          <div>
            <p className="eyebrow">Archive health</p>
            <h2>Latest signed manifest</h2>
            <p>Version v4-demo · signature valid · latest archive CID pending · torrent snapshot queued · known mirrors 0 · blocklisted CIDs 0.</p>
          </div>
          <div className="manifest-code">death-alliance-manifest.json<br />DA-OFFICIAL-KEY-01<br />Final cleaned submission → Direct IPFS/torrent publish</div>
        </section>

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
