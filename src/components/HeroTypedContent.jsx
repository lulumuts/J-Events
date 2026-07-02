import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HEADLINE_1 = 'J Events';
const HEADLINE_2 = '& Management';
const PILLS = ['Event planner', 'Project manager', 'Content producer'];

const CHAR_MS = 42;
const LINE_PAUSE_MS = 140;
const PILL_STAGGER_MS = 280;
const PILL_DONE_PAUSE_MS = 180;

export default function HeroTypedContent({ start, onTypingComplete }) {
  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [visiblePillCount, setVisiblePillCount] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [btnsVisible, setBtnsVisible] = useState(false);

  useEffect(() => {
    if (!start) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setLine1Count(HEADLINE_1.length);
      setLine2Count(HEADLINE_2.length);
      setVisiblePillCount(PILLS.length);
      setPhase('done');
      setBtnsVisible(true);
      return undefined;
    }

    setLine1Count(0);
    setLine2Count(0);
    setVisiblePillCount(0);
    setPhase('line1');
    setBtnsVisible(false);
    return undefined;
  }, [start, onTypingComplete]);

  useEffect(() => {
    if (phase !== 'done') return undefined;
    onTypingComplete?.();
    return undefined;
  }, [phase, onTypingComplete]);

  useEffect(() => {
    if (phase !== 'line1') return undefined;

    if (line1Count >= HEADLINE_1.length) {
      const pause = window.setTimeout(() => setPhase('line2'), LINE_PAUSE_MS);
      return () => window.clearTimeout(pause);
    }

    const timer = window.setTimeout(() => {
      setLine1Count((count) => count + 1);
    }, CHAR_MS);

    return () => window.clearTimeout(timer);
  }, [phase, line1Count]);

  useEffect(() => {
    if (phase !== 'line2') return undefined;

    if (line2Count >= HEADLINE_2.length) {
      const pause = window.setTimeout(() => {
        setVisiblePillCount(0);
        setPhase('pills');
      }, LINE_PAUSE_MS);
      return () => window.clearTimeout(pause);
    }

    const timer = window.setTimeout(() => {
      setLine2Count((count) => count + 1);
    }, CHAR_MS);

    return () => window.clearTimeout(timer);
  }, [phase, line2Count]);

  useEffect(() => {
    if (phase !== 'pills') return undefined;

    if (visiblePillCount >= PILLS.length) {
      const pause = window.setTimeout(() => {
        setPhase('done');
        setBtnsVisible(true);
      }, PILL_DONE_PAUSE_MS);
      return () => window.clearTimeout(pause);
    }

    const timer = window.setTimeout(() => {
      setVisiblePillCount((count) => count + 1);
    }, PILL_STAGGER_MS);

    return () => window.clearTimeout(timer);
  }, [phase, visiblePillCount]);

  const showAccent = phase === 'line2' || phase === 'pills' || phase === 'done' || line2Count > 0;
  const showHeadlineCursor = phase === 'line1' || phase === 'line2';
  const cursorInAccent = phase === 'line2';

  return (
    <>
      <div className="bm-hero-head">
        <h1 className="bm-h1">
          {HEADLINE_1.slice(0, line1Count)}
          {showAccent ? (
            <span className="accent">
              {HEADLINE_2.slice(0, line2Count)}
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
          {PILLS.map((label, index) => {
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
        <Link to="/book" className="bm-btn1">Book a consultation</Link>
      </div>
    </>
  );
}
