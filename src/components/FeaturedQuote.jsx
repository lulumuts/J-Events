export default function FeaturedQuote({ text, author }) {
  return (
    <blockquote className="bm-quote-strip bm-featured-quote">
      <div className="bm-quote-inner">
        <div className="bm-quote-mark" aria-hidden="true">{'\u201C'}</div>
        <div>
          <p className="bm-quote-text">{text}</p>
          <footer className="bm-quote-attr">{author}</footer>
        </div>
      </div>
    </blockquote>
  );
}
