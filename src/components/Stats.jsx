import { useStatsSectionReveal } from '../hooks/useScrollReveal';
import nowYouKnowLogo from '../assets/logos/now-you-know-logo.png';
import roundhouseLogo from '../assets/logos/roundhouse-logo.png';
import constructionCfoLogo from '../assets/logos/construction-cfo-summit-logo.png';
import juliesTop5Logo from '../assets/logos/julies-top-5-logo.png';
import powerWithinYouLogo from '../assets/logos/power-within-you-logo.png';
import mainStreetEventsLogo from '../assets/logos/main-street-events-logo.png';
import e3gLogo from '../assets/logos/e3g-logo.png';
import collectionsLogo from '../assets/logos/collections-logo.png';
import discomLogo from '../assets/logos/discom-logo.png';

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
];

const logoRows = [
  clientLogos.slice(0, 3),
  clientLogos.slice(3, 6),
  clientLogos.slice(6, 9),
];

clientLogos.forEach(({ src }) => {
  const img = new Image();
  img.src = src;
});

export default function Stats() {
  const [wrapRef, revealed] = useStatsSectionReveal();

  return (
    <div ref={wrapRef} className="bm-stats-wrap">
      <header className="bm-stats-header">
        <h2 className="bm-stats-title">Worked With</h2>
      </header>
      <div className="bm-stats">
        {logoRows.map((row, rowIndex) => (
          <div className="bm-stats-row" key={rowIndex}>
            {row.map((logo) => (
              <div
                className={`bm-stat bm-stat-reveal${revealed ? ' in' : ''}`}
                key={logo.alt}
              >
                <img
                  className="bm-stat-logo-img"
                  src={logo.src}
                  alt={logo.alt}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
