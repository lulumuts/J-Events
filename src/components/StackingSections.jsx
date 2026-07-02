import { useEffect, useRef, useState } from 'react';
import './StackingSections.css';

const SECTION_META = [
  { id: 'hero',         label: 'Hero' },
  { id: 'stats',        label: 'Stats' },
  { id: 'intro',        label: 'Intro' },
  { id: 'services',     label: 'Services' },
  { id: 'work',         label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact' },
];

const SCALE_AMOUNT = 0.032;
const NUDGE_Y      = 12;
const RADIUS_MAX   = 14;
const TRAVEL = 600;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

export default function StackingSections({ children }) {
  const panelRefs   = useRef([]);
  const sectionRefs = useRef([]);
  const rafRef        = useRef(0);
  const activeRef     = useRef(0);
  const rootTopRef    = useRef(0);
  const lastStylesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > 767,
  );

  const childArray = Array.isArray(children) ? children : [children];
  const count      = childArray.length;

  useEffect(() => {
    const onResize = () => setEnabled(window.innerWidth > 767);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!enabled) {
      sectionRefs.current.forEach((sec) => {
        if (!sec) return;
        sec.style.transform = '';
        sec.style.borderRadius = '';
        sec.style.opacity = '';
        sec.style.pointerEvents = '';
      });
      return undefined;
    }

    const measureRootTop = () => {
      const firstPanel = panelRefs.current[0];
      if (!firstPanel) return;
      rootTopRef.current = firstPanel.getBoundingClientRect().top + window.scrollY;
    };

    const applyScroll = () => {
      rafRef.current = 0;

      const scrolled = window.scrollY - rootTopRef.current;

      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return;

        const raw = Math.max(0, Math.min(1, (scrolled - i * TRAVEL) / TRAVEL));
        const coveredBy = easeOutCubic(raw);
        const scale  = 1 - coveredBy * SCALE_AMOUNT;
        const nudge  = coveredBy * -NUDGE_Y;
        const radius = coveredBy * RADIUS_MAX;

        const transform = `translate3d(0, ${nudge.toFixed(2)}px, 0) scale(${scale.toFixed(5)})`;
        const borderRadius = `${radius.toFixed(2)}px`;
        const inPanel =
          scrolled >= i * TRAVEL && (i === count - 1 || scrolled < (i + 1) * TRAVEL);
        const pointerEvents = inPanel ? 'auto' : 'none';
        const prev = lastStylesRef.current[i];

        if (!prev || prev.transform !== transform) {
          sec.style.transform = transform;
        }
        if (!prev || prev.borderRadius !== borderRadius) {
          sec.style.borderRadius = borderRadius;
        }
        if (!prev || prev.pointerEvents !== pointerEvents) {
          sec.style.pointerEvents = pointerEvents;
        }

        lastStylesRef.current[i] = { transform, borderRadius, pointerEvents };
      });

      let current = 0;
      for (let i = 0; i < count; i += 1) {
        if ((scrolled - i * TRAVEL) / TRAVEL >= 0.45) {
          current = i;
        }
      }
      current = Math.min(current, count - 1);

      if (current !== activeRef.current) {
        activeRef.current = current;
        setActiveIndex(current);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(applyScroll);
    };

    measureRootTop();

    const rootObserver = new ResizeObserver(measureRootTop);
    const firstPanel = panelRefs.current[0];
    if (firstPanel) rootObserver.observe(firstPanel);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureRootTop, { passive: true });
    applyScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureRootTop);
      rootObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastStylesRef.current = [];
    };
  }, [enabled, count]);

  const scrollToSection = (index) => {
    const firstPanel = panelRefs.current[0];
    if (!firstPanel) return;
    const rootTop = firstPanel.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: rootTop + index * TRAVEL, behavior: 'smooth' });
  };

  if (!enabled) {
    return <main className="bm-main">{childArray}</main>;
  }

  return (
    <>
      <nav className="stacking-dots" aria-label="Page sections">
        {SECTION_META.slice(0, count).map((sec, i) => (
          <button
            key={sec.id}
            type="button"
            className={`stacking-dot${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${sec.label}`}
          />
        ))}
      </nav>

      <div className="stacking-root">
        {childArray.map((child, i) => (
          <div
            key={SECTION_META[i]?.id ?? i}
            className={`stacking-panel${i === count - 1 ? ' stacking-panel--last' : ''}`}
            ref={(el) => { panelRefs.current[i] = el; }}
          >
            <div
              className={`stacking-section${activeIndex === i ? ' stacking-section--active' : ''}`}
              ref={(el) => { sectionRefs.current[i] = el; }}
              style={{ zIndex: 10 + i * 10 }}
            >
              {child}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
