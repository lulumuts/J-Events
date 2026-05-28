import Reveal from './Reveal';

const featured = {
  text: 'She understood the brief immediately and delivered something beyond what we imagined.',
  author: 'Wanjiru M.',
  role: 'Bride, March 2024',
};

export default function Testimonials() {
  return (
    <blockquote className="bm-quote-strip">
      <div className="bm-quote-inner">
        <Reveal type="scale">
          <div className="bm-quote-mark" aria-hidden="true">"</div>
        </Reveal>
        <Reveal type="right" delay={1}>
          <div>
            <p className="bm-quote-text">{featured.text}</p>
            <footer className="bm-quote-attr">
              {featured.author} · {featured.role}
            </footer>
          </div>
        </Reveal>
      </div>
    </blockquote>
  );
}
