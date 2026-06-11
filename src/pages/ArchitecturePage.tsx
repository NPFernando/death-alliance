import { LockKeyhole, Network, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const layers = [
  {
    title: 'Layer 1 — Public Experience',
    body: 'Static React UI, public archive browsing, case pages, comments, vote summaries, manifest viewer, mirror verification, and archive-health dashboards.',
  },
  {
    title: 'Layer 2 — Submission and Safety',
    body: 'Private backend services for anonymous intake, temporary upload sandboxing, metadata scanning, visible private-data checks, malware scanning, package building, and signing.',
  },
  {
    title: 'Layer 3 — Distributed Archive',
    body: 'Signed case packages, static archive exports, official manifests, IPFS CIDs, torrent-style snapshots, mirror registry, version registry, and CID blocklist.',
  },
];

const productionGates = [
  'Temporary sandbox upload',
  'Metadata scan and uploader warning',
  'Visible private-data check',
  'User cleanup confirmation',
  'Cleaned package generation',
  'Package hash and signature',
  'Final cleaned submission → Direct IPFS/torrent publish',
];

export function ArchitecturePage() {
  return (
    <section className="page-section" aria-labelledby="architecture-title">
      <PageHeader eyebrow="Developer architecture" title="Demo boundary and V4 system design" body="This page separates what the public GitHub Pages demo shows from the backend and archive services required for a real V4 implementation." />

      <section className="notice-panel demo-boundary" aria-label="Static demo boundary">
        <ShieldCheck />
        <div>
          <h2 id="architecture-title">Static demo only</h2>
          <p>The GitHub Pages site is a portfolio/demo preview. It does not process real uploads, store identities, scan files, sign packages, publish IPFS content, create torrents, moderate abuse reports, or operate a CID blocklist.</p>
        </div>
      </section>

      <section className="architecture-grid" aria-label="Death Alliance V4 architecture layers">
        {layers.map((layer, index) => (
          <article className="portal-card architecture-card" key={layer.title}>
            <span className="architecture-index">0{index + 1}</span>
            <h2>{layer.title}</h2>
            <p>{layer.body}</p>
          </article>
        ))}
      </section>

      <section className="portal-card architecture-flow">
        <div className="panel-head">
          <Network />
          <div>
            <p className="eyebrow">Production publishing gate</p>
            <h2>Cleaned package pipeline</h2>
          </div>
        </div>
        <ol className="timeline">
          {productionGates.map((gate) => <li key={gate}>{gate}</li>)}
        </ol>
        <div className="signature-box">
          <LockKeyhole />
          <p><strong>Developer reference:</strong> see `docs/architecture.md` plus `examples/case-package/DA-000184-v1/` and `examples/archive/death-alliance-manifest.json` for concrete package shapes.</p>
        </div>
      </section>
    </section>
  );
}
