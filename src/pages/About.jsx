import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import aboutPlaceholder from '../assets/vite.svg';

export default function About() {
  return (
    <div className="bm">
      <main className="bm-main">
        <Section className="bm-section--white bm-work-detail-page bm-about-page">
          <Nav />
          <div className="bm-hero">
            <div className="bm-hero-inner">
              <div className="bm-work-detail">
                <Reveal type="left">
                  <div className="bm-about-leftcol">
                    <h1 className="bm-h1 bm-about-title">About</h1>
                    <p className="bm-body">
                      J Ideas &amp; Management is built on thoughtful planning, creative direction,
                      and seamless execution — focused on the experience from start to finish.
                    </p>
                    <p className="bm-work-detail-desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="bm-work-detail-desc">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
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

          <Link to="/" className="bm-backlink bm-about-fablink">
            ← Back to home
          </Link>
        </Section>

        <Section className="bm-section--footer">
          <Footer />
        </Section>
      </main>
    </div>
  );
}

