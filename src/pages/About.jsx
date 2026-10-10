import { Link } from 'react-router-dom';
import AboutTimeline from '../components/AboutTimeline';
import ClientLogosCarousel from '../components/ClientLogosCarousel';
import FeaturedQuote from '../components/FeaturedQuote';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import { useSiteContent } from '../hooks/useSiteContent';

export default function About() {
  const { content } = useSiteContent();
  const about = content.aboutPage;
  const { clientLogosLabel } = content.homePage;

  return (
    <div className="bm bm-about-root">
      <main className="bm-main bm-about-main">
        <Section className="bm-section--white bm-work-detail-page bm-about-page">
          <div className="bm-about-topbar">
            <Link to="/" className="bm-backlink bm-about-fablink" aria-label="Back to home">
              <span className="bm-about-fablink-stack" aria-hidden="true">
                <span className="bm-about-fablink-layer bm-about-fablink-layer--default">← Back to home</span>
                <span className="bm-about-fablink-layer bm-about-fablink-layer--title">← Back to home</span>
              </span>
            </Link>
          </div>
          <div className="bm-hero">
            <div className="bm-hero-inner">
              <div className="bm-about-layout">
                <Reveal type="left">
                  <div className="bm-about-copy">
                    <h1 className="bm-h1 bm-about-title">{about.pageTitle}</h1>
                    <div className="bm-about-intro-row">
                      <p className="bm-about-text bm-about-text--intro">
                        {about.introParagraph}
                      </p>
                      <div className="bm-about-media">
                        <img
                          src={about.photoSrc}
                          alt={about.photoAlt}
                          className="bm-about-media__photo"
                        />
                      </div>
                    </div>
                    {about.bodyParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className="bm-about-text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={2} className="bm-about-timeline-reveal">
                  <div className="bm-about-quote-wrap">
                    <div className="bm-about-quote-section">
                      <FeaturedQuote
                        text={about.quoteBeforeTimeline.text}
                        author={about.quoteBeforeTimeline.author}
                      />
                    </div>
                  </div>
                  <div className="bm-about-timeline-row">
                    <AboutTimeline />
                  </div>
                  <div className="bm-about-clients-row">
                    <ClientLogosCarousel label={clientLogosLabel} />
                  </div>
                  <div className="bm-about-quote-wrap bm-about-quote-wrap--after-timeline">
                    <div className="bm-about-quote-section">
                      <FeaturedQuote
                        text={about.quoteAfterTimeline.text}
                        author={about.quoteAfterTimeline.author}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
