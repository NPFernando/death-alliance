import { ShieldAlert, Skull } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const clip4 = new URL('../../vid/clip 4.mp4', import.meta.url).href;

export function AboutPage() {
  return (
    <section className="page-section about-section" aria-labelledby="about-title">
      <video className="page-bg-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src={clip4} type="video/mp4" />
      </video>

      <PageHeader eyebrow="About the project" title="About Death Alliance" body="A fictional anonymous clue archive demo for storytelling, ARG, lore, community dispute, metadata-safe publishing design, and resilient public archive architecture." />

      <section className="notice-panel about-intro" aria-label="About Death Alliance introduction">
        <Skull />
        <div>
          <h2 id="about-title">Inspired by dark justice fiction</h2>
          <p>Death Alliance is inspired by the novel 蒙冤入狱，重生后我大开杀戒. It is not affiliated with the original author, publisher, or platform. This app is a fictional / ARG / roleplay demo, not a production reporting service.</p>
        </div>
      </section>

      <section className="portal-card rules-grid about-grid">
        <article>
          <h2>What the app demonstrates</h2>
          <p>Cinematic landing, anonymous-name demo intake, fictional archive cards, working in-memory support/dispute votes, connected case threads, comment voting, signed-manifest concepts, and archive-health UI.</p>
        </article>
        <article>
          <h2>Recommended production features</h2>
          <p>Backend upload sandbox, metadata scanner, visible private-data detector, malware scan, Argon2id hidden-key identities, append-only event log, signed packages, manifest verification, abuse reports, and CID blocklist workflow.</p>
        </article>
      </section>

      <section className="portal-card architecture-flow">
        <div className="panel-head">
          <ShieldAlert />
          <div>
            <p className="eyebrow">Safety boundary</p>
            <h2>Fictional use only</h2>
          </div>
        </div>
        <p>Do not use this project for real-world accusations, harassment, threats, doxxing, revenge, or exposing identifiable people. All cases, comments, evidence, and archive examples in this demo should remain fictional, anonymized, roleplay-based, or part of a created story universe.</p>
      </section>
    </section>
  );
}
