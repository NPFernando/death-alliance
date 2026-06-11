import { Archive, LockKeyhole } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { publishingSteps } from '../safety';

const heroImage = new URL('../../img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png', import.meta.url).href;
const portalLoop = new URL('../../vid/clip 5.mp4', import.meta.url).href;

export function ManifestPage() {
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
