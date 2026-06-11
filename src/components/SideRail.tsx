import { Copy, Skull } from 'lucide-react';
import { navItems } from '../data';
import { routeHref } from '../routes';
import type { PageKey } from '../types';

export function SideRail({ activePage }: { activePage: PageKey }) {
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
