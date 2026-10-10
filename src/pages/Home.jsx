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
import { useSiteContent } from '../hooks/useSiteContent';

export default function Home() {
  const { content } = useSiteContent();
  const [quoteMid, quotePreWork, quotePostWork] = content.homePage.homeQuotes;

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
            text={quoteMid?.text ?? ''}
            author={quoteMid?.author ?? ''}
          />
        </Section>
        <Section className="bm-section--white" id="services">
          <Services />
        </Section>
        <Section className="bm-featured-quote-section" id="pre-work-quote">
          <FeaturedQuote
            text={quotePreWork?.text ?? ''}
            author={quotePreWork?.author ?? ''}
          />
        </Section>
        <Section className="bm-section--white" id="work">
          <Portfolio />
        </Section>
        <Section className="bm-featured-quote-section" id="post-work-quote">
          <FeaturedQuote
            text={quotePostWork?.text ?? ''}
            author={quotePostWork?.author ?? ''}
          />
        </Section>
        <Section className="bm-section--white" id="contact">
          <Contact />
        </Section>
      </StackingSections>
    </div>
  );
}
