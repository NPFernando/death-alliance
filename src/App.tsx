import { Archive, BadgeCheck, EyeOff, FileWarning, Gavel, KeyRound, ShieldAlert, Skull, Vote } from 'lucide-react';
import { useMemo, useState } from 'react';
import { caseCategories, contentModes, createCaseId, isSubmissionTextSafe, publishingSteps } from './safety';

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

const sampleCases = [
  { id: 'DA-000184-v1', title: 'The Stolen Engine', status: 'Strongly Supported', support: 120, dispute: 14 },
  { id: 'DA-000212-v2', title: 'The Silent Laboratory', status: 'Counter-Evidence Added', support: 77, dispute: 39 },
  { id: 'DA-000301-v1', title: 'Archive of the Broken Oath', status: 'Needs More Evidence', support: 31, dispute: 28 },
];

function App() {
  const [draft, setDraft] = useState<DraftCase>(initialDraft);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

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
      <section className="hero" aria-labelledby="hero-title">
        <div className="halo" />
        <div className="fog fog-one" />
        <div className="fog fog-two" />
        <div className="death-figure" aria-label="Animated Grim Reaper silhouette">
          <div className="skull"><Skull size={86} strokeWidth={1.3} /></div>
          <div className="hood" />
          <div className="robe" />
          <div className="scythe" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Fictional ARG archive · metadata-safe · signed · mirrorable</p>
          <h1 id="hero-title" className="typewriter" aria-label="Welcome to the Death Alliance.">
            <span className="hero-title-text" aria-hidden="true">Welcome to the Death Alliance.</span>
          </h1>
          <p className="hero-line">A fictional archive for hidden crimes, betrayed inventors, stolen futures, and buried truths.</p>
          <p className="hero-line muted">Submit a story-world case. Let the community support it, dispute it, or bury it in the archive record.</p>
          <div className="hero-actions">
            <a href="#submit" className="glow-button">Submit a Case</a>
            <a href="#archive" className="ghost-button">Browse Archive</a>
            <a href="#health" className="ghost-button">Archive Health</a>
          </div>
        </div>
      </section>

      <section className="notice-panel" aria-label="Fictional safety notice">
        <ShieldAlert />
        <div>
          <h2>Fictional / ARG / roleplay only</h2>
          <p>Do not submit real private information, threats, harassment, doxxing material, or accusations against identifiable real people. This website concept does not collect real-world identity details.</p>
        </div>
      </section>

      <section className="grid-section" id="submit">
        <form className="portal-card" onSubmit={handleSubmit}>
          <div className="section-title">
            <EyeOff />
            <div>
              <p className="eyebrow">Anonymous clue portal</p>
              <h2>Submit a fictional case</h2>
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
              <p>Future uploads must enter a temporary sandbox, metadata scan, visible private-data check, cleanup confirmation, package generation, hash, and signature before public archive distribution.</p>
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={draft.consent} onChange={(event) => update('consent', event.target.checked)} />
            <span>I confirm this submission is fictional, anonymized, roleplay-based, or part of a created story universe, and contains no real private information or real-world accusations against identifiable people.</span>
          </label>

          <button className="glow-button submit-button" disabled={!canSubmit}>Generate Safe Draft Case</button>
          {submittedCaseId && <p className="success-text">Safe draft created: {submittedCaseId}-v1 · Status: Safety Cleanup Required</p>}
        </form>

        <aside className="portal-card flow-card">
          <div className="section-title">
            <BadgeCheck />
            <div>
              <p className="eyebrow">V4 publishing rule</p>
              <h2>Cleaned archive flow</h2>
            </div>
          </div>
          <ol className="timeline">
            {publishingSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="signature-box">
            <Archive />
            <p><strong>Public archive distribution system:</strong> signed manifests, IPFS CIDs, torrent snapshots, official mirrors, version registry, and CID blocklist.</p>
          </div>
        </aside>
      </section>

      <section className="archive-section" id="archive">
        <div className="section-title centered">
          <Gavel />
          <div>
            <p className="eyebrow">Community dispute layer</p>
            <h2>Published fictional archive</h2>
          </div>
        </div>
        <div className="case-grid">
          {sampleCases.map((item) => (
            <article className="case-card" key={item.id}>
              <p className="case-id">{item.id}</p>
              <h3>{item.title}</h3>
              <p>Status: <strong>{item.status}</strong></p>
              <p><Vote size={16} /> Support {item.support} · Dispute {item.dispute}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="health-panel" id="health">
        <div>
          <p className="eyebrow">Archive health</p>
          <h2>Latest signed manifest</h2>
          <p>Version v4-demo · signature valid · latest archive CID pending · torrent snapshot queued · known mirrors 0 · blocklisted CIDs 0.</p>
        </div>
        <div className="manifest-code">death-alliance-manifest.json<br />DA-OFFICIAL-KEY-01<br />Final cleaned submission → Direct IPFS/torrent publish</div>
      </section>
    </main>
  );
}

export default App;
