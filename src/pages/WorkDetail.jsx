import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="bm">
        <main className="bm-main">
          <Section className="bm-section--hero">
            <Nav />
            <div className="bm-hero">
              <div className="bm-hero-inner">
                <Reveal>
                  <h1 className="bm-h1">
                    Work not found
                    <span className="accent">Try another project</span>
                  </h1>
                  <Link className="bm-btn1" to="/">
                    Back home
                  </Link>
                </Reveal>
              </div>
            </div>
          </Section>
          <Section className="bm-section--footer">
            <Footer />
          </Section>
        </main>
      </div>
    );
  }

  return (
    <div className="bm">
      <main className="bm-main">
        <Section className="bm-section--white bm-work-detail-page bm-project-detail-page">
          <Nav />
          <div className="bm-hero">
            <div className="bm-hero-inner">
              <div className="bm-work-detail">
                <Reveal type="left">
                  <div className="bm-work-detail-copy">
                    <h1 className="bm-work-title bm-work-detail-heading">{project.title}</h1>
                    <p className="bm-work-meta bm-work-detail-sub">{project.meta}</p>
                    {project.description ? (
                      <p className="bm-work-detail-desc">{project.description}</p>
                    ) : null}
                  </div>
                </Reveal>

                <Reveal type="scale" delay={1}>
                  <article className="bm-work-item bm-work-detail-card" aria-label={project.title}>
                    <div className="bm-work-img">
                      {project.image ? (
                        <img
                          src={assetUrl(project.image)}
                          alt={project.imageAlt ?? project.title}
                        />
                      ) : (
                        <div className="bm-work-detail-placeholder">No image yet</div>
                      )}
                    </div>
                    <div className="bm-work-info">
                      <div className="bm-work-title">{project.title}</div>
                      <div className="bm-work-meta">{project.meta}</div>
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          </div>

          <Link to="/#work" className="bm-work-detail-fablink">
            ← Back to work
          </Link>
        </Section>

        <Section className="bm-section--footer">
          <Footer />
        </Section>
      </main>
    </div>
  );
}
