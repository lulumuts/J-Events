import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const services = [
  {
    num: '01',
    name: 'Event Management',
    intro: 'Curating, planning & Executing your event idea with:',
    items: [
      'Strategic & Actionable planning',
      'Logistical Mastery',
      'Team Management',
    ],
  },
  {
    num: '02',
    name: 'Project Management',
    intro: 'Guiding your projects with your commitment & creativity with:',
    items: [
      'Creative Project Planning',
      'Team Support',
      'Action Plans',
    ],
  },
  {
    num: '03',
    name: 'Event Consultancy',
    intro: 'Planting the seed of your vision with a clear outline of what\'s possible with:',
    items: [
      'Action Plans',
      'Initial Research',
      'Creative Community Planning',
    ],
  },
];

export default function Services() {
  const renderServiceName = (name) => {
    const parts = name.split(' ');
    if (parts.length < 2) return name;
    return (
      <>
        {parts[0]}
        <br />
        {parts.slice(1).join(' ')}
      </>
    );
  };

  return (
    <div className="bm-services">
      <div className="bm-services-inner">
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

        <Reveal delay={1}>
          <div className="bm-sec-header">
            <div className="bm-sec-title">Services</div>
          </div>
        </Reveal>
        <div className="bm-svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.name} type="scale" delay={(i % 3) + 1}>
              <div className="bm-svc">
                <div className="bm-svc-num">{s.num}</div>
                <div className="bm-svc-content">
                  <div className="bm-svc-name">{renderServiceName(s.name)}</div>
                  <p className="bm-svc-desc">{s.intro}</p>
                  <ul className="bm-svc-list">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="bm-services-cta">
          <Link className="bm-learn-more" to="/book">Book a consultation</Link>
        </div>
      </div>
    </div>
  );
}
