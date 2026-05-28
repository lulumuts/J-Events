import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { categories, projects } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bm-work">
      <div className="bm-work-inner">
        <Reveal>
          <div className="bm-sec-header">
            <div className="bm-sec-title">Work</div>
          </div>
          <div className="bm-filter-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`bm-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="bm-work-grid">
          {filtered.map((item, i) => (
            <Reveal key={item.title} type="scale" delay={(i % 4) + 1}>
              <Link className="bm-work-item bm-work-link" to={`/work/${item.slug}`}>
                <div className="bm-work-img">
                  {item.image ? (
                    <img src={assetUrl(item.image)} alt={item.imageAlt ?? item.title} />
                  ) : (
                    <CameraIcon />
                  )}
                </div>
                <div className="bm-work-info">
                  <div className="bm-work-title">{item.title}</div>
                  <div className="bm-work-meta">{item.meta}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
