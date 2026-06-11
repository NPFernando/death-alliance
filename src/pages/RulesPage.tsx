import { ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export function RulesPage() {
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
