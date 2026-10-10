import { useEffect, useRef, useState } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const MARQUEE_DURATION_MS = 32000;
const LOGO_LOOP_COPIES = 2;

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ClientLogosCarousel({ label, className = '' }) {
  const { content } = useSiteContent();
  const clientLogos = content.clientLogos;
  const carouselLogos = Array.from({ length: LOGO_LOOP_COPIES }, () => clientLogos).flat();

  const innerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    clientLogos.forEach(({ src }) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [clientLogos]);

  const nudgeForward = () => {
    const inner = innerRef.current;
    if (!inner) return;

    const animation = inner.getAnimations()[0];
    if (!animation) return;

    const item = inner.querySelector('.bm-stat');
    const gap = Number.parseFloat(getComputedStyle(inner).columnGap || getComputedStyle(inner).gap) || 0;
    const stepPx = (item?.offsetWidth ?? 0) + gap;
    const loopPx = inner.offsetWidth / LOGO_LOOP_COPIES;

    if (loopPx <= 0 || stepPx <= 0) return;

    const stepMs = (stepPx / loopPx) * MARQUEE_DURATION_MS;
    animation.currentTime = ((animation.currentTime ?? 0) + stepMs) % MARQUEE_DURATION_MS;
  };

  return (
    <div className={`bm-client-logos ${className}`.trim()}>
      {label ? (
        <header className="bm-stats-header">
          <h3 className="bm-stats-section-label bm-stats-worked-with-label">{label}</h3>
        </header>
      ) : null}
      <div className="bm-stats">
        <div
          className="bm-stats-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="bm-stats-track-wrap">
            <div
              ref={innerRef}
              className={`bm-stats-track-inner${paused ? ' is-paused' : ''}`}
            >
              {carouselLogos.map((logo, index) => (
                <div
                  className="bm-stat"
                  key={`${logo.alt}-${index}`}
                  aria-hidden={index >= clientLogos.length}
                >
                  {logo.src ? (
                    <img
                      className="bm-stat-logo-img"
                      src={logo.src}
                      alt={index < clientLogos.length ? logo.alt : ''}
                      loading="eager"
                      decoding="async"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="bm-stats-carousel-btn"
            onClick={nudgeForward}
            aria-label="Show more clients"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
