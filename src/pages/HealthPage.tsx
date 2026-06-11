import { PageHeader } from '../components/PageHeader';

export function HealthPage() {
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
