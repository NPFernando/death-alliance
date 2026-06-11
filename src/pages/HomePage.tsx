import { Eye, ShieldAlert, ShieldCheck, Swords } from 'lucide-react';
import { routeHref } from '../routes';

const heroImage = new URL('../../img/ChatGPT Image Jun 6, 2026, 09_57_57 AM.png', import.meta.url).href;
const reaperWebp = new URL('../../img/reaper-hero.webp', import.meta.url).href;

export function HomePage() {
  return (
    <section className="page-section home-page" aria-labelledby="hero-title">
      <div className="hero-console">
        <div className="reaper-frame" aria-label="Death Alliance Grim Reaper artwork">
          <picture>
            <source srcSet={reaperWebp} type="image/webp" />
            <img src={heroImage} alt="Fictional Grim Reaper with scythe and white halo" />
          </picture>
          <div className="scan-line" />
        </div>

        <div className="hero-copy">
          <p className="terminal-kicker">CINEMATIC FICTIONAL ARCHIVE</p>
          <h1 id="hero-title">WELCOME TO THE DEATH ALLIANCE</h1>
          <div className="hero-oath" aria-label="Death Alliance fictional cinematic motto">
            <p>Welcome to the Death Alliance.</p>
            <p>We speak for the powerless and wield the sword for the wronged.</p>
            <p>If you witness evil, please submit it here.</p>
            <p>After verification, death will come to deliver judgment.</p>
          </div>
          <div className="hero-actions">
            <a href={routeHref('submit')} className="glow-button">Submit a Fictional Clue</a>
            <a href={routeHref('archive')} className="ghost-button">Browse Archive</a>
            <a href={routeHref('health')} className="ghost-button">Archive Health</a>
          </div>
        </div>
      </div>

      <section className="notice-panel" aria-label="Fictional safety notice">
        <ShieldAlert />
        <div>
          <h2>Fictional / ARG / roleplay only</h2>
          <ul className="hero-bullets warning-bullets">
            <li><Swords size={18} /> Fictional archive for wronged inventors, hidden crimes, and buried truths.</li>
            <li><Eye size={18} /> Submit story-world clues only. The archive does not target real people.</li>
            <li><ShieldCheck size={18} /> After cleanup, the signed package enters public community review.</li>
          </ul>
          <p>Do not submit real private information, threats, harassment, doxxing material, or accusations against identifiable real people. This site concept collects fictional archive clues only.</p>
        </div>
      </section>
    </section>
  );
}
