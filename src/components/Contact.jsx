import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { assetUrl } from '../utils/assetUrl';

export default function Contact() {
  return (
    <div className="bm-contact bm-contact--summary">
      <div className="bm-contact-inner">
        <div className="bm-contact-layout">
          <Reveal type="left">
            <div className="bm-contact-media">
              <img
                src={assetUrl('about-jordan.png')}
                alt="Jordan Graham at an event"
                className="bm-contact-media__photo"
              />
            </div>
          </Reveal>

          <div className="bm-contact-content">
            <Reveal>
              <div className="bm-sec-header">
                <div className="bm-sec-title">Contact</div>
              </div>
              <p className="bm-contact-sub">
                Reach out directly, or share your event details and I&apos;ll be in touch within 24 hours.
              </p>
            </Reveal>

            <Reveal type="right" delay={1}>
              <div className="bm-contact-info">
                <dl className="bm-work-detail-facts bm-contact-facts">
                  <div className="bm-work-detail-fact">
                    <dt>Email</dt>
                    <dd>
                      <a href="mailto:hello@jevents.co.ke">hello@jevents.co.ke</a>
                    </dd>
                  </div>
                  <div className="bm-work-detail-fact">
                    <dt>Phone</dt>
                    <dd>
                      <a href="tel:+254700000000">+254 700 000 000</a>
                    </dd>
                  </div>
                </dl>
                <Link to="/book" className="bm-contact-cta">
                  Tell me about your event
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bm-contact-footer">
        <div>
          <div className="bm-contact-footer-logo">J EVENTS</div>
          <div className="bm-contact-footer-copy">© 2025 · All rights reserved</div>
        </div>
      </div>
    </div>
  );
}
