import { useEffect, useState } from 'react';

const testimonials = [
  {
    text: 'Jordan brings a clarity to event production that is a complete lifeline for me.',
    author: 'Elizabeth Corse, Founder, DisCom',
  },
  {
    text: 'She takes on all directions, gives great suggestions, is a fantastic mediator within small & larger teams and welcomes feedback with open arms. She. Is. The. Best.',
    author: 'Julie Adenuga',
  },
];

const ROTATE_MS = 9000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const count = testimonials.length;
  const testimonial = testimonials[active];

  useEffect(() => {
    if (count <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % count);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [count]);

  const goTo = (index) => {
    setActive((index + count) % count);
  };

  return (
    <div className="bm-quote-carousel">
      <blockquote key={testimonial.author} className="bm-quote-strip">
        <div className="bm-quote-inner">
          <div className="bm-quote-mark" aria-hidden="true">"</div>
          <div>
            <p className="bm-quote-text">{testimonial.text}</p>
            <footer className="bm-quote-attr">
              {testimonial.author}
              {testimonial.role ? ` · ${testimonial.role}` : ''}
            </footer>
          </div>
        </div>
      </blockquote>

      {count > 1 && (
        <div className="bm-quote-controls">
          <button
            type="button"
            className="bm-quote-control"
            onClick={() => goTo(active - 1)}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <div className="bm-quote-dots" role="tablist" aria-label="Testimonials">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                type="button"
                role="tab"
                className={`bm-quote-dot${index === active ? ' is-active' : ''}`}
                aria-label={`Show testimonial from ${item.author}`}
                aria-selected={index === active}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="bm-quote-control"
            onClick={() => goTo(active + 1)}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
