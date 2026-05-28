import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Section from '../components/Section';

export default function Home() {
  return (
    <div className="bm">
      <main className="bm-main">
        <Section className="bm-section--hero">
          <Nav />
          <Hero />
        </Section>
        <Section className="bm-section--stats">
          <Stats />
        </Section>
        <Section className="bm-section--white" id="services">
          <Services />
        </Section>
        <Section className="bm-section--light" id="work">
          <Portfolio />
        </Section>
        <Section className="bm-section--quote">
          <Testimonials />
        </Section>
        <Section className="bm-section--white" id="contact">
          <Contact />
        </Section>
        <Section className="bm-section--footer">
          <Footer />
        </Section>
      </main>
    </div>
  );
}

