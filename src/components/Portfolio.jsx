import { useEffect, useRef, useState } from 'react';
import WorkDetailModal from './WorkDetailModal';
import { categories, projects } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

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

function WorkCardTitle({ item }) {
  if (item.titleLines?.length) {
    return (
      <div className="bm-work-title">
        {item.titleLines.map((line) => (
          <span key={line} className="bm-work-title-line">
            {line}
          </span>
        ))}
      </div>
    );
  }

  return <div className="bm-work-title">{item.title}</div>;
}

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    gridRef.current?.scrollTo({ top: 0 });
  }, [active]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const onWheel = (event) => {
      if (event.target.closest('.bm-work-toolbar, .bm-filter-btn, .bm-work-arrow')) {
        return;
      }

      const maxScroll = grid.scrollHeight - grid.clientHeight;
      if (maxScroll <= 0) return;

      const { scrollTop } = grid;
      const { deltaY } = event;
      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        event.preventDefault();
        grid.scrollTop += deltaY;
      }
    };

    grid.addEventListener('wheel', onWheel, { passive: false });
    return () => grid.removeEventListener('wheel', onWheel);
  }, [filtered.length]);

  return (
    <div className="bm-work bm-work--scrollable">
      <div className="bm-work-inner">
        <div className="bm-work-toolbar">
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
        </div>
        <div className="bm-work-grid" ref={gridRef}>
          {filtered.map((item) => (
            <article key={item.slug} className="bm-work-item bm-work-link">
              <div className="bm-work-img">
                {item.image ? (
                  <img src={assetUrl(item.image)} alt={item.imageAlt ?? item.title} />
                ) : null}
              </div>
              <div className="bm-work-info">
                <div className="bm-work-info-copy">
                  <WorkCardTitle item={item} />
                  <div className="bm-work-meta">{item.meta}</div>
                </div>
              </div>
              <button
                type="button"
                className="bm-work-arrow"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedProject(item);
                }}
                aria-label={`View ${item.title} details`}
              >
                <ArrowIcon />
              </button>
            </article>
          ))}
        </div>
      </div>
      {selectedProject ? (
        <WorkDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </div>
  );
}
