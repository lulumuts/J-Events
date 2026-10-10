import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';

const CHAR_MS = 42;
const LINE_PAUSE_MS = 140;
const PILL_STAGGER_MS = 280;
const PILL_DONE_PAUSE_MS = 180;

export default function HeroTypedContent({ start, onTypingComplete }) {
  const { content } = useSiteContent();
  const { heroHeadline1, heroHeadline2, heroPills, heroCtaLabel } = content.homePage;

  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [visiblePillCount, setVisiblePillCount] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [btnsVisible, setBtnsVisible] = useState(false);

  useEffect(() => {
    if (!start) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      queueMicrotask(() => {
        setLine1Count(heroHeadline1.length);
        setLine2Count(heroHeadline2.length);
        setVisiblePillCount(heroPills.length);
        setPhase('done');
        setBtnsVisible(true);
      });
      return undefined;
    }

    queueMicrotask(() => {
      setLine1Count(0);
      setLine2Count(0);
      setVisiblePillCount(0);
      setPhase('line1');
      setBtnsVisible(false);
    });
    return undefined;
  }, [start, onTypingComplete, heroHeadline1, heroHeadline2, heroPills.length]);

  useEffect(() => {
    if (phase !== 'done') return undefined;
    onTypingComplete?.();
    return undefined;
  }, [phase, onTypingComplete]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return undefined;

    if (phase === 'line1') {
      if (line1Count >= heroHeadline1.length) {
        const t = window.setTimeout(() => setPhase('line2'), LINE_PAUSE_MS);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setLine1Count((c) => c + 1), CHAR_MS);
      return () => window.clearTimeout(t);
    }

    if (phase === 'line2') {
      if (line2Count >= heroHeadline2.length) {
        const t = window.setTimeout(() => setPhase('pills'), LINE_PAUSE_MS);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setLine2Count((c) => c + 1), CHAR_MS);
      return () => window.clearTimeout(t);
    }

    if (phase === 'pills') {
      if (visiblePillCount >= heroPills.length) {
        const t = window.setTimeout(() => {
          setPhase('done');
          setBtnsVisible(true);
        }, PILL_DONE_PAUSE_MS);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setVisiblePillCount((c) => c + 1), PILL_STAGGER_MS);
      return () => window.clearTimeout(t);
    }

    return undefined;
  }, [
    phase,
    line1Count,
    line2Count,
    visiblePillCount,
    heroHeadline1.length,
    heroHeadline2.length,
    heroPills.length,
  ]);

  const showAccent = phase === 'line2' || phase === 'pills' || phase === 'done' || line2Count > 0;
  const showHeadlineCursor = phase === 'line1' || phase === 'line2';
  const cursorInAccent = phase === 'line2';

  return (
    <>
      <div className="bm-hero-head">
        <h1 className="bm-h1">
          {heroHeadline1.slice(0, line1Count)}
          {showAccent ? (
            <span className="accent">
              {heroHeadline2.slice(0, line2Count)}
              {showHeadlineCursor && cursorInAccent ? (
                <span className="bm-typewriter-cursor" aria-hidden="true">|</span>
              ) : null}
            </span>
          ) : null}
          {showHeadlineCursor && !cursorInAccent ? (
            <span className="bm-typewriter-cursor" aria-hidden="true">|</span>
          ) : null}
        </h1>
        <div className="bm-hero-pills" aria-label="Roles">
          {heroPills.map((label, index) => {
            if (index >= visiblePillCount) return null;

            return (
              <span className="bm-pill bm-pill--fade-in" key={label}>
                {label}
              </span>
            );
          })}
        </div>
      </div>
      <div className={`bm-btns${btnsVisible ? ' bm-btns--visible' : ''}`}>
        <Link to="/book" className="bm-btn1">{heroCtaLabel}</Link>
      </div>
    </>
  );
}
