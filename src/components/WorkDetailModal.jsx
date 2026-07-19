import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getProjectLocation } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';
import WorkDetailContent from './WorkDetailContent';
import WorkMetaFacts from './WorkMetaFacts';

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

function ModalDetails({ project }) {
  return (
    <WorkMetaFacts
      category={project.category}
      location={getProjectLocation(project)}
      className="bm-work-modal__meta-facts"
    />
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
          <div className="bm-work-modal__media-overlay" aria-hidden="true" />
          <div className="bm-work-modal__media-header">
            <ModalTitle project={project} />
          </div>
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
          <ModalDetails project={project} />
          <WorkDetailContent project={project} className="bm-work-modal__desc" forModal />
        </div>
      </div>
    </div>,
    document.body,
  );
}
