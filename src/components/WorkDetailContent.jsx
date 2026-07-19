export function formatModalText(text) {
  if (!text) return text;
  return text.replace(/\s*[—–]\s*/g, ': ');
}

export default function WorkDetailContent({ project, className = '', forModal = false }) {
  const { details, description } = project;
  const fmt = forModal ? formatModalText : (text) => text;

  if (!details) {
    if (!description) return null;
    return <p className={`bm-work-detail-desc ${className}`.trim()}>{fmt(description)}</p>;
  }

  return (
    <div className={`bm-work-detail-body ${className}`.trim()}>
      <dl className="bm-work-detail-facts">
        <div className="bm-work-detail-fact">
          <dt>Role</dt>
          <dd>{fmt(details.role)}</dd>
        </div>
        {!forModal ? (
          <div className="bm-work-detail-fact">
            <dt>Location</dt>
            <dd>{fmt(details.location)}</dd>
          </div>
        ) : null}
      </dl>

      <div className="bm-work-detail-scope">
        <h3 className="bm-work-detail-label">Scope</h3>
        <p>{fmt(details.scope)}</p>
      </div>

      {details.achievements?.length ? (
        <div className="bm-work-detail-achievements">
          <h3 className="bm-work-detail-label">Key Achievements</h3>
          <ul>
            {details.achievements.map((item) => (
              <li key={item.title}>
                <strong>{fmt(item.title)}</strong>
                {forModal ? ': ' : ' — '}
                <span className="bm-work-detail-achievement-detail">{fmt(item.detail)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
