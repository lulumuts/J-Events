import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function WelcomeIntro() {
  return (
    <div className="bm-intro-section">
      <div className="bm-intro-inner">
        <Reveal>
          <div className="bm-intro">
            <p className="bm-intro-lead">
              Welcome to J Ideas &amp; Management, where I specialise in orchestrating
              unforgettable experiences and seamlessly executing projects through a unique
              skillset providing a holistic, 360 view events &amp; projects.
            </p>
            <p className="bm-intro-body">
              In the realm of event management, I excel in curating impactful gatherings
              that inspire, educate, and connect. Whether it&apos;s a corporate summit,
              industry conference or fashion pop up, I&apos;m able to take your vision to
              execution with creative project plans covering content, venue &amp; logistics
              while focusing on <span className="bm-emph">the</span> experience of your guest.
            </p>
            <Link className="bm-learn-more" to="/about">Learn more</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
