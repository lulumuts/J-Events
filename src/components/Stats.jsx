import { useSiteContent } from '../hooks/useSiteContent';
import ClientLogosCarousel from './ClientLogosCarousel';

export default function Stats() {
  const { content } = useSiteContent();
  const { statsCitiesHeading, statsCities, clientLogosLabel } = content.homePage;

  return (
    <div className="bm-stats-wrap">
      <div className="bm-stats-cities bm-stats-cities--top">
        <h3 className="bm-stats-section-label">{statsCitiesHeading}</h3>
        <ul className="bm-stats-cities-row">
          {statsCities.map((city) => (
            <li key={city} className="bm-stats-cities-item">
              {city}
            </li>
          ))}
        </ul>
      </div>
      <ClientLogosCarousel label={clientLogosLabel} />
    </div>
  );
}
