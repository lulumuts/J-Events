import { Link } from 'react-router-dom';
import AboutTimeline from '../components/AboutTimeline';
import ClientLogosCarousel from '../components/ClientLogosCarousel';
import FeaturedQuote from '../components/FeaturedQuote';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import { assetUrl } from '../utils/assetUrl';

export default function About() {
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
                    <h1 className="bm-h1 bm-about-title">About</h1>
                    <div className="bm-about-intro-row">
                      <p className="bm-about-text bm-about-text--intro">
                        I&apos;m Jordan, a freelance events and project manager based in Amsterdam,
                        with over a decade of experience bringing live and virtual experiences to life.
                        From intimate brand launches to flagship summits drawing thousands of registrants,
                        I handle everything from the first concept call to the final curtain.
                      </p>
                      <div className="bm-about-media">
                        <img
                          src={assetUrl('about-jordan.png')}
                          alt="Jordan Graham at an event"
                          className="bm-about-media__photo"
                        />
                      </div>
                    </div>
                    <p className="bm-about-text">
                      My background spans conference production, community building, content strategy
                      and speaker management, so when I come on board, I bring a joined-up view of
                      what makes an event actually work. I care about the detail, the delegate
                      experience, and whether the whole thing lands the way you imagined it.
                    </p>
                    <p className="bm-about-text">
                      Whether you&apos;re launching something new or levelling up an existing event,
                      I&apos;d love to hear about it.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={2} className="bm-about-timeline-reveal">
                  <div className="bm-about-quote-wrap">
                    <div className="bm-about-quote-section">
                      <FeaturedQuote
                        text="Jordan brings a clarity to event production that is a complete lifeline for me."
                        author="Elizabeth Corse, Founder, DisCom"
                      />
                    </div>
                  </div>
                  <div className="bm-about-timeline-row">
                    <AboutTimeline />
                  </div>
                  <div className="bm-about-clients-row">
                    <ClientLogosCarousel />
                  </div>
                  <div className="bm-about-quote-wrap bm-about-quote-wrap--after-timeline">
                    <div className="bm-about-quote-section">
                      <FeaturedQuote
                        text="She takes on all directions, gives great suggestions, is a fantastic mediator within small & larger teams and welcomes feedback with open arms. She. Is. The. Best."
                        author="Julie Adenuga"
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
