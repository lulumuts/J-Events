import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WelcomeIntro from '../components/WelcomeIntro';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import FeaturedQuote from '../components/FeaturedQuote';
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
        <Section className="bm-featured-quote-section" id="mid-quote">
          <FeaturedQuote
            text="Her gift of distilling & summarising information into useful action points is unmatched"
            author="Julie Adenuga"
          />
        </Section>
        <Section className="bm-section--white" id="services">
          <Services />
        </Section>
        <Section className="bm-featured-quote-section" id="pre-work-quote">
          <FeaturedQuote
            text="Jordan brings a clarity to event production that is a complete lifeline for me."
            author="Elizabeth Corse, Founder, DisCom"
          />
        </Section>
        <Section className="bm-section--white" id="work">
          <Portfolio />
        </Section>
        <Section className="bm-featured-quote-section" id="post-work-quote">
          <FeaturedQuote
            text="She helped me turn around a 14 hour shoot, with a video, wardrobe and make up crew plus 12 talent bookings in less than three weeks."
            author="Julie Adenuga"
          />
        </Section>
        <Section className="bm-section--white" id="contact">
          <Contact />
        </Section>
      </StackingSections>
    </div>
  );
}
