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

const SCALE_AMOUNT = 0.022;
const NUDGE_Y      = 6;
const RADIUS_MAX   = 14;
const OPACITY_FADE = 0.06;
const DEFAULT_TRAVEL = 820;
const ACTIVE_Z_BASE = 1000;

const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);

const readTravel = (rootEl) => {
  if (!rootEl) return DEFAULT_TRAVEL;
  const raw = getComputedStyle(rootEl).getPropertyValue('--stack-travel').trim();
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TRAVEL;
};

const getPanelDocTop = (panel) => {
  if (!panel) return 0;
  return panel.getBoundingClientRect().top + window.scrollY;
};

const getActivePanel = (scrollY, panelRefs) => {
  let current = 0;
  panelRefs.current.forEach((panel, i) => {
    if (!panel) return;
    if (scrollY >= getPanelDocTop(panel) - 1) {
      current = i;
    }
  });
  return current;
};

export default function StackingSections({ children }) {
  const rootRef       = useRef(null);
  const panelRefs     = useRef([]);
  const sectionRefs   = useRef([]);
  const rafRef        = useRef(0);
  const activeRef     = useRef(0);
  const travelRef     = useRef(DEFAULT_TRAVEL);
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
        sec.style.zIndex = '';
      });
      return undefined;
    }

    const measure = () => {
      travelRef.current = readTravel(rootRef.current);
    };

    const applyScroll = () => {
      rafRef.current = 0;

      const travel = travelRef.current;
      const scrollY = window.scrollY;
      const current = getActivePanel(scrollY, panelRefs);

      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return;

        const panel = panelRefs.current[i];
        const panelTop = getPanelDocTop(panel);
        const raw = Math.max(0, Math.min(1, (scrollY - panelTop) / travel));
        const coveredBy = smootherstep(raw);
        const scale  = 1 - coveredBy * SCALE_AMOUNT;
        const nudge  = coveredBy * -NUDGE_Y;
        const radius = coveredBy * RADIUS_MAX;
        const opacity = 1 - coveredBy * OPACITY_FADE;

        const transform = `translate3d(0, ${nudge.toFixed(2)}px, 0) scale(${scale.toFixed(5)})`;
        const borderRadius = `${radius.toFixed(2)}px`;
        const opacityValue = opacity.toFixed(4);
        const isActive = i === current;
        const pointerEvents = isActive ? 'auto' : 'none';
        const zIndex = isActive ? String(ACTIVE_Z_BASE + i) : String(10 + i);
        const prev = lastStylesRef.current[i];

        if (!prev || prev.transform !== transform) {
          sec.style.transform = transform;
        }
        if (!prev || prev.borderRadius !== borderRadius) {
          sec.style.borderRadius = borderRadius;
        }
        if (!prev || prev.opacity !== opacityValue) {
          sec.style.opacity = opacityValue;
        }
        if (!prev || prev.pointerEvents !== pointerEvents) {
          sec.style.pointerEvents = pointerEvents;
        }
        if (!prev || prev.zIndex !== zIndex) {
          sec.style.zIndex = zIndex;
        }

        lastStylesRef.current[i] = {
          transform,
          borderRadius,
          opacity: opacityValue,
          pointerEvents,
          zIndex,
        };
      });

      if (current !== activeRef.current) {
        activeRef.current = current;
        setActiveIndex(current);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(applyScroll);
    };

    measure();

    const rootObserver = new ResizeObserver(() => {
      measure();
      applyScroll();
    });

    if (rootRef.current) rootObserver.observe(rootRef.current);
    panelRefs.current.forEach((panel) => {
      if (panel) rootObserver.observe(panel);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      applyScroll();
    }, { passive: true });
    applyScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      rootObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastStylesRef.current = [];
    };
  }, [enabled, count]);

  const scrollToSection = (index) => {
    const panel = panelRefs.current[index];
    if (!panel) return;
    const top = getPanelDocTop(panel);
    window.scrollTo({ top, behavior: 'smooth' });
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

      <div className="stacking-root" ref={rootRef}>
        {childArray.map((child, i) => (
          <div
            key={SECTION_META[i]?.id ?? i}
            className={`stacking-panel${i === count - 1 ? ' stacking-panel--last' : ''}`}
            ref={(el) => { panelRefs.current[i] = el; }}
          >
            <div
              className={`stacking-section${activeIndex === i ? ' stacking-section--active' : ''}`}
              ref={(el) => { sectionRefs.current[i] = el; }}
            >
              {child}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
