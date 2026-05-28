import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import heroVideo from '../assets/CC_FINAL TRAIELR V2.mov';
import heroPoster from '../assets/hero.png';

export default function Hero() {
  return (
    <div className="bm-hero">
      <video
        className="bm-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroPoster}
      >
        <source src={heroVideo} />
      </video>
      <div className="bm-hero-video-overlay" aria-hidden="true" />
      <div className="bm-hero-inner">
        <div className="bm-hero-main">
          <div className="bm-hero-copy">
            <Reveal type="right">
              <div className="bm-hero-head">
                <h1 className="bm-h1">
                  J events
                  <span className="accent">&amp; management</span>
                </h1>
                <div className="bm-hero-pills" aria-label="Roles">
                  <span className="bm-pill">Event planner</span>
                  <span className="bm-pill">Project manager</span>
                  <span className="bm-pill">Content producer</span>
                </div>
              </div>
              <div className="bm-btns">
                <Link to="/book" className="bm-btn1">Book a consultation</Link>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}
