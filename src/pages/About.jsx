import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import aboutPlaceholder from '../assets/vite.svg';

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
              <div className="bm-work-detail">
                <Reveal type="left">
                  <div className="bm-about-leftcol">
                    <h1 className="bm-h1 bm-about-title">About</h1>
                    <p className="bm-about-text">
                      I&apos;m Jordan — a freelance events and project manager based in Amsterdam,
                      with over a decade of experience bringing live and virtual experiences to life.
                      From intimate brand launches to flagship summits drawing thousands of registrants,
                      I handle everything from the first concept call to the final curtain.
                    </p>
                    <p className="bm-about-text">
                      My background spans conference production, community building, content strategy
                      and speaker management — so when I come on board, I bring a joined-up view of
                      what makes an event actually work. I care about the detail, the delegate
                      experience, and whether the whole thing lands the way you imagined it.
                    </p>
                    <p className="bm-about-text">
                      Whether you&apos;re launching something new or levelling up an existing event,
                      I&apos;d love to hear about it.
                    </p>
                  </div>
                </Reveal>

                <Reveal type="scale" delay={1}>
                  <div className="bm-work-detail-media bm-about-media">
                    <img src={aboutPlaceholder} alt="About placeholder" />
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
