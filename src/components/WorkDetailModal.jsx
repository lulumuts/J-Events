import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { assetUrl } from '../utils/assetUrl';

function ModalTitle({ project }) {
  if (project.titleLines?.length) {
    return (
      <h2 id="work-modal-title" className="bm-work-title bm-work-modal__title">
        {project.titleLines.map((line) => (
          <span key={line} className="bm-work-title-line">
            {line}
          </span>
        ))}
      </h2>
    );
  }

  return (
    <h2 id="work-modal-title" className="bm-work-title bm-work-modal__title">
      {project.title}
    </h2>
  );
}

export default function WorkDetailModal({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div className="bm-work-modal">
      <button
        type="button"
        className="bm-work-modal__backdrop"
        onClick={onClose}
        aria-label="Close project details"
      />
      <div
        ref={panelRef}
        className="bm-work-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
        tabIndex={-1}
      >
        <button
          type="button"
          className="bm-work-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="bm-work-modal__media">
          {project.image ? (
            <img
              src={assetUrl(project.image)}
              alt={project.imageAlt ?? project.title}
            />
          ) : (
            <div className="bm-work-detail-placeholder">No image yet</div>
          )}
        </div>
        <div className="bm-work-modal__copy">
          <ModalTitle project={project} />
          <p className="bm-work-meta bm-work-modal__meta">{project.meta}</p>
          {project.description ? (
            <p className="bm-work-detail-desc bm-work-modal__desc">{project.description}</p>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
