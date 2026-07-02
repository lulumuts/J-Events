import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import WorkDetailModal from './WorkDetailModal';
import { categories, projects } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

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
  const workRef = useRef(null);
  const gridRef = useRef(null);
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);
  const isCompact = active === 'Climate' || active === 'Corporate';

  useEffect(() => {
    gridRef.current?.scrollTo({ top: 0 });
  }, [active]);

  useEffect(() => {
    const workRoot = workRef.current;
    const grid = gridRef.current;
    if (!workRoot || !grid) return undefined;

    const onWheel = (event) => {
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

    workRoot.addEventListener('wheel', onWheel, { passive: false });
    return () => workRoot.removeEventListener('wheel', onWheel);
  }, [filtered.length]);

  return (
    <div
      ref={workRef}
      className={`bm-work bm-work--scrollable${isCompact ? ' bm-work--compact-cards' : ''}`}
    >
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
          {filtered.map((item, i) => (
            <Reveal key={item.slug} type="scale" delay={(i % 4) + 1}>
              <article className="bm-work-item bm-work-link">
                <div className="bm-work-img">
                  {item.image ? (
                    <img src={assetUrl(item.image)} alt={item.imageAlt ?? item.title} />
                  ) : (
                    <CameraIcon />
                  )}
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
                  onClick={() => setSelectedProject(item)}
                  aria-label={`View ${item.title} details`}
                >
                  <ArrowIcon />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      {selectedProject ? (
        <WorkDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </div>
  );
}
