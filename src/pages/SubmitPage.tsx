import { FileWarning, KeyRound } from 'lucide-react';
import { StatusTracker } from '../components/StatusTracker';
import { PageHeader } from '../components/PageHeader';
import { caseCategories, contentModes } from '../safety';
import type { DraftCase } from '../types';

export type SubmitPageProps = {
  draft: DraftCase;
  submittedCaseId: string | null;
  generating: boolean;
  hiddenKeyWarning: boolean;
  formSafe: boolean;
  canSubmit: boolean;
  onUpdate: <K extends keyof DraftCase>(key: K, value: DraftCase[K]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const DESC_MIN = 30;
const DESC_WARN = 500;

export function SubmitPage({ draft, submittedCaseId, generating, hiddenKeyWarning, formSafe, canSubmit, onUpdate, onSubmit }: SubmitPageProps) {
  const descLen = draft.description.length;
  const descClass = descLen === 0 ? '' : descLen < DESC_MIN ? 'char-count--warn' : 'char-count--ok';

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
            {descLen > 0 && (
              <span className={`char-count ${descClass}`} aria-live="polite">
                {descLen < DESC_MIN ? `${DESC_MIN - descLen} more chars needed` : descLen >= DESC_WARN ? `${descLen} chars` : `${descLen} chars — minimum met`}
              </span>
            )}
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

          <button className="glow-button submit-button" disabled={!canSubmit || generating}>
            {generating ? <><span className="btn-spinner" aria-hidden="true" />Generating…</> : 'Generate Safe Draft Case'}
          </button>
          {submittedCaseId && <p className="success-text">Safe draft created: {submittedCaseId}-v1 · Status: Safety Cleanup Required</p>}
        </form>

        <StatusTracker />
      </div>
    </section>
  );
}
