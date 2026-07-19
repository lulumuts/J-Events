import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WelcomeIntro from '../components/WelcomeIntro';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Section from '../components/Section';
import StackingSections from '../components/StackingSections';

export default function Home() {
  return (
    <div className="bm">
      <StackingSections>
        <Section className="bm-section--hero" id="hero">
          <Hero>
            <Nav />
          </Hero>
        </Section>
        <Section className="bm-section--orange" id="intro">
          <WelcomeIntro />
        </Section>
        <Section className="bm-section--stats" id="stats">
          <Stats />
        </Section>
        <Section className="bm-section--white" id="services">
          <Services />
        </Section>
        <Section className="bm-section--white" id="work">
          <Portfolio />
        </Section>
        <Section className="bm-section--quote" id="testimonials">
          <Testimonials />
        </Section>
        <Section className="bm-section--orange" id="contact">
          <Contact />
        </Section>
      </StackingSections>
    </div>
  );
}
