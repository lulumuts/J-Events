import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <div className="bm-contact bm-contact--summary">
      <div className="bm-contact-inner">
        <Reveal>
          <div className="bm-sec-header">
            <div className="bm-sec-title">Contact</div>
          </div>
          <p className="bm-contact-sub">
            Reach out directly, or share your event details and I&apos;ll be in touch within 24 hours.
          </p>
        </Reveal>

        <div className="bm-contact-grid">
          <Reveal type="left" delay={1}>
            <div className="bm-contact-info">
              <p className="bm-contact-label">Email</p>
              <a className="bm-contact-detail" href="mailto:hello@jevents.co.ke">
                hello@jevents.co.ke
              </a>
              <p className="bm-contact-label">Phone</p>
              <a className="bm-contact-detail" href="tel:+254700000000">
                +254 700 000 000
              </a>
              <Link to="/book" className="bm-contact-cta">
                Tell me about your event
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
