import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import Reveal from './Reveal';

export default function Services() {
  const { content } = useSiteContent();
  const {
    servicesTitle,
    servicesIntroLead,
    servicesIntroRest,
    servicesCtaLabel,
    services,
  } = content.homePage;

  const renderServiceName = (name) => {
    const parts = name.split(' ');
    if (parts.length < 2) return name;

    return parts.map((part, index) => (
      <span className="bm-svc-name-line" key={`${part}-${index}`}>
        {part}
      </span>
    ));
  };

  return (
    <div className="bm-services">
      <div className="bm-services-inner">
        <div className="bm-services-layout">
          <div className="bm-services-copy">
            <Reveal>
              <div className="bm-sec-header">
                <div className="bm-sec-title">{servicesTitle}</div>
                <div className="bm-services-intro-block">
                  <p className="bm-services-intro">
                    {servicesIntroLead}
                    <span className="bm-services-intro-rest">
                      {servicesIntroRest}
                    </span>
                  </p>
                  <div className="bm-services-cta">
                    <Link className="bm-learn-more" to="/book">{servicesCtaLabel}</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="bm-svc-grid">
            {services.map((s, i) => (
              <Reveal key={s.name} type="scale" delay={(i % 4) + 1}>
                <div className="bm-svc">
                  <div className="bm-svc-content">
                    <div className="bm-svc-num">{s.num}</div>
                    <div className="bm-svc-name">{renderServiceName(s.name)}</div>
                    <p className="bm-svc-desc">{s.intro}</p>
                    <ul className="bm-svc-list">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
