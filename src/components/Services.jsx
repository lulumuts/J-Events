import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const services = [
  {
    num: '01',
    name: 'Event Management',
    intro: 'Curating, planning & executing your event idea with:',
    items: [
      'Strategic & actionable planning',
      'Logistical mastery',
      'Team management',
    ],
  },
  {
    num: '02',
    name: 'Project Management',
    intro: 'Guiding your projects with your commitment & creativity and:',
    items: [
      'Creative project planning',
      'Team support',
      'Confident, clear communication',
    ],
  },
  {
    num: '03',
    name: 'Speaker Management',
    intro: 'Confidently guiding & preparing your speakers with:',
    items: [
      'Clear, consistent communication',
      'Practical speaker briefings',
      'A seamless on site experience',
    ],
  },
  {
    num: '04',
    name: 'Event Consultancy',
    intro: 'Planting the seed of your vision with a clear outline of what\'s possible with:',
    items: [
      'Insightful research',
      'Creative action plans',
      'The Journey to reality',
    ],
  },
];

export default function Services() {
  const renderServiceName = (name) => {
    const parts = name.split(' ');
    if (parts.length < 2) return name;
    return (
      <>
        <span className="bm-svc-name-line">{parts[0]}</span>
        <span className="bm-svc-name-line">{parts.slice(1).join(' ')}</span>
      </>
    );
  };

  return (
    <div className="bm-services">
      <div className="bm-services-inner">
        <div className="bm-services-content">
          <Reveal>
            <div className="bm-sec-header">
              <div className="bm-sec-title">Services</div>
              <p className="bm-services-intro">
                People are the real formula for success, and that&apos;s where I come in.
                With experience spanning event planning, content creation, and project
                management, I help turn your ideas into events that resonate, while keeping
                a genuine pulse on your community.
              </p>
            </div>
          </Reveal>
          <div className="bm-svc-grid">
            {services.map((s, i) => (
              <Reveal key={s.name} type="scale" delay={(i % 4) + 1}>
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
        </div>

        <div className="bm-services-cta">
          <Link className="bm-learn-more" to="/book">Book a consultation</Link>
        </div>
      </div>
    </div>
  );
}
