import { Skull } from 'lucide-react';
import { useState } from 'react';

const introLoop = new URL('../../vid/clip 1.mp4', import.meta.url).href;

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="intro-loader" aria-label="Death Alliance cinematic loading screen">
      <video
        className={`intro-video${videoReady ? ' is-ready' : ''}`}
        data-testid="intro-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
        onEnded={onComplete}
        onError={onComplete}
      >
        <source src={introLoop} type="video/mp4" />
        Your browser does not support decorative MP4 background video.
      </video>
      <div className="intro-shade" />
      <div className="intro-copy">
        <Skull size={54} />
        <p className="terminal-kicker">Initializing fictional archive</p>
        <h2>Death Alliance</h2>
        <span>Metadata-safe archive console loading...</span>
        <button type="button" className="ghost-button intro-skip" onClick={onComplete}>
          Skip intro
        </button>
      </div>
    </section>
  );
}
