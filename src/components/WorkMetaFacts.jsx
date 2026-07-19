export default function WorkMetaFacts({ category, location, className = '' }) {
  return (
    <dl className={`bm-work-detail-facts bm-work-meta-facts ${className}`.trim()}>
      <div className="bm-work-detail-fact">
        <dt>Category</dt>
        <dd>{category}</dd>
      </div>
      {location ? (
        <div className="bm-work-detail-fact">
          <dt>Location</dt>
          <dd>{location}</dd>
        </div>
      ) : null}
    </dl>
  );
}
