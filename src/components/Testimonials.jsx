const featured = {
  text: "Jordan brings a clarity to event production that is a complete lifeline for me. We worked really well together because she was ALL over the logistics of the events, freeing me up to do what I do best which is manage our stakeholders. She's as comfortable with the details (her behind-the-scenes production schedule has clients in AWE) as she is supporting me to build up my business. She's also lightning fast, and nothing is ever a problem. She is calm, reassuring and great fun to work with.",
  author: 'Elizabeth Corse',
  role: 'Founder, DisCom',
};

export default function Testimonials() {
  return (
    <blockquote className="bm-quote-strip">
      <div className="bm-quote-inner">
        <div className="bm-quote-mark" aria-hidden="true">"</div>
        <div>
          <p className="bm-quote-text">{featured.text}</p>
          <footer className="bm-quote-attr">
            {featured.author} · {featured.role}
          </footer>
        </div>
      </div>
    </blockquote>
  );
}
