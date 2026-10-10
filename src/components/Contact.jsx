import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import Reveal from './Reveal';

export default function Contact() {
  const { content } = useSiteContent();
  const { siteSettings, homePage } = content;
  const {
    contactEmail,
    contactPhoneDisplay,
    contactPhoneTel,
    footerLogoText,
    footerCopyright,
  } = siteSettings;

  return (
    <div className="bm-contact bm-contact--summary">
      <div className="bm-contact-inner">
        <div className="bm-contact-layout">
          <Reveal type="left">
            <div className="bm-contact-media">
              <img
                src={homePage.contactPhotoSrc}
                alt={homePage.contactPhotoAlt}
                className="bm-contact-media__photo"
              />
            </div>
          </Reveal>

          <div className="bm-contact-content">
            <Reveal>
              <div className="bm-sec-header">
                <div className="bm-sec-title">{homePage.contactTitle}</div>
              </div>
              <p className="bm-contact-sub">
                {homePage.contactSubcopy}
              </p>
            </Reveal>

            <Reveal type="right" delay={1}>
              <div className="bm-contact-info">
                <dl className="bm-work-detail-facts bm-contact-facts">
                  <div className="bm-work-detail-fact">
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </dd>
                  </div>
                  <div className="bm-work-detail-fact">
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${contactPhoneTel}`}>{contactPhoneDisplay}</a>
                    </dd>
                  </div>
                </dl>
                <Link to="/book" className="bm-contact-cta">
                  {homePage.contactCtaLabel}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bm-contact-footer">
        <div>
          <div className="bm-contact-footer-logo">{footerLogoText}</div>
          <div className="bm-contact-footer-copy">{footerCopyright}</div>
        </div>
      </div>
    </div>
  );
}
