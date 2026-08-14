import { useRef, useState } from 'react';
import nowYouKnowLogo from '../assets/logos/now-you-know-logo.png';
import roundhouseLogo from '../assets/logos/roundhouse-logo.png';
import constructionCfoLogo from '../assets/logos/construction-cfo-summit-logo.png';
import juliesTop5Logo from '../assets/logos/julies-top-5-logo.png';
import powerWithinYouLogo from '../assets/logos/power-within-you-logo.png';
import mainStreetEventsLogo from '../assets/logos/main-street-events-logo.png';
import e3gLogo from '../assets/logos/e3g-logo.png';
import collectionsLogo from '../assets/logos/collections-logo.png';
import discomLogo from '../assets/logos/discom-logo.png';
import climateFoundersWeekLogo from '../assets/logos/climate-founders-week-logo.png';
import braveLeadershipSummitLogo from '../assets/logos/brave-leadership-summit-logo.png';

const MARQUEE_DURATION_MS = 32000;
const LOGO_LOOP_COPIES = 2;

const clientLogos = [
  { src: juliesTop5Logo, alt: "Julie's Top 5 Live" },
  { src: roundhouseLogo, alt: 'Roundhouse' },
  { src: constructionCfoLogo, alt: 'Construction CFO Summit' },
  { src: nowYouKnowLogo, alt: 'Now You Know' },
  { src: powerWithinYouLogo, alt: 'The Power Within You with Mamta Gera' },
  { src: mainStreetEventsLogo, alt: 'Main Street Events Limited' },
  { src: collectionsLogo, alt: 'Collections' },
  { src: e3gLogo, alt: 'E3G' },
  { src: discomLogo, alt: 'DisCom' },
  { src: climateFoundersWeekLogo, alt: 'Climate Founders Week' },
  { src: braveLeadershipSummitLogo, alt: 'BRAVE Leadership Summit' },
];

const carouselLogos = Array.from({ length: LOGO_LOOP_COPIES }, () => clientLogos).flat();

const eventCities = ['London', 'Amsterdam', 'Paris', 'San Francisco', 'New York'];

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

clientLogos.forEach(({ src }) => {
  const img = new Image();
  img.src = src;
});

export default function Stats() {
  const innerRef = useRef(null);
  const [paused, setPaused] = useState(false);

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
    <div className="bm-stats-wrap">
      <header className="bm-stats-header">
        <h3 className="bm-stats-section-label bm-stats-worked-with-label">Worked With</h3>
      </header>
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
                  <img
                    className="bm-stat-logo-img"
                    src={logo.src}
                    alt={index < clientLogos.length ? logo.alt : ''}
                    loading="eager"
                    decoding="async"
                  />
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
      <div className="bm-stats-cities bm-stats-cities--bottom">
        <h3 className="bm-stats-section-label">Global events across</h3>
        <ul className="bm-stats-cities-row">
          {eventCities.map((city) => (
            <li key={city} className="bm-stats-cities-item">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
