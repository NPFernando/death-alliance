import { statusSteps } from '../data';

export function StatusTracker() {
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
