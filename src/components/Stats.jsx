import ClientLogosCarousel from './ClientLogosCarousel';

const eventCities = ['London', 'Amsterdam', 'Paris', 'San Francisco', 'New York'];

export default function Stats() {
  return (
    <div className="bm-stats-wrap">
      <div className="bm-stats-cities bm-stats-cities--top">
        <h3 className="bm-stats-section-label">Global events across</h3>
        <ul className="bm-stats-cities-row">
          {eventCities.map((city) => (
            <li key={city} className="bm-stats-cities-item">
              {city}
            </li>
          ))}
        </ul>
      </div>
      <ClientLogosCarousel />
    </div>
  );
}
