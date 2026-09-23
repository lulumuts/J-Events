# J Events — Full codebase export for Claude

## Prompt to paste above this file
```
Fix the homepage stacking scroll flow on desktop (768px+). Stack: Hero, Stats, Services, Work, Testimonials, Contact. Keep existing section styling, rounded corners, natural content. Problem: scroll feels jerky, gaps between sections, tall sections (Services/Work) scroll inside pinned cards. Reference pattern: each panel 200vh, sticky 100vh section, coveredBy = (scrolled - i*vh)/vh.
```

## Stack
- Vite + React 19 + React Router
- Stacking: StackingSections.jsx + StackingSections.css
- Design tokens: cream #fef6ef, orange #ff6a00, dark orange #c75a12


---
## FILE: package.json
```
{
  "name": "j-events",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "concurrently \"vite\" \"node server/index.mjs\"",
    "dev:client": "vite",
    "dev:api": "node server/index.mjs",
    "build": "vite build",
    "build:gh-pages": "GH_PAGES=true vite build && cp dist/index.html dist/404.html",
    "deploy": "npm run build:gh-pages && gh-pages -d dist -t",
    "lint": "eslint .",
    "preview": "vite preview",
    "optimize:video": "node scripts/optimize-hero-video.mjs"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-router-dom": "^7.15.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "concurrently": "^9.2.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "ffmpeg-static": "^5.2.0",
    "gh-pages": "^6.3.0",
    "globals": "^17.6.0",
    "vite": "^8.0.12"
  }
}
```

---
## FILE: vite.config.js
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GH_PAGES === 'true' ? '/J-Events/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
```

---
## FILE: src/main.jsx
```
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---
## FILE: src/App.jsx
```
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Book from './pages/Book';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---
## FILE: src/pages/Home.jsx
```
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Section from '../components/Section';
import StackingSections from '../components/StackingSections';

export default function Home() {
  return (
    <div className="bm">
      <StackingSections>
        <Section className="bm-section--hero" id="hero">
          <Nav />
          <Hero />
        </Section>
        <Section className="bm-section--stats" id="stats">
          <Stats />
        </Section>
        <Section className="bm-section--white" id="services">
          <Services />
        </Section>
        <Section className="bm-section--light" id="work">
          <Portfolio />
        </Section>
        <Section className="bm-section--quote" id="testimonials">
          <Testimonials />
        </Section>
        <Section className="bm-section--white" id="contact">
          <Contact />
        </Section>
      </StackingSections>
      <Section className="bm-section--footer">
        <Footer />
      </Section>
    </div>
  );
}
```

---
## FILE: src/components/StackingSections.jsx
```
import { useEffect, useRef, useState } from 'react';
import './StackingSections.css';

const SECTION_META = [
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Stats' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const SCALE_AMOUNT = 0.08;
const NUDGE_Y = 24;

export default function StackingSections({ children }) {
  const panelRefs = useRef([]);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > 767,
  );

  const childArray = Array.isArray(children) ? children : [children];
  const count = childArray.length;

  useEffect(() => {
    const onResize = () => setEnabled(window.innerWidth > 767);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!enabled) {
      sectionRefs.current.forEach((sec) => {
        if (!sec) return;
        sec.style.transform = '';
      });
      return undefined;
    }

    let travel = window.innerHeight;

    const onResize = () => {
      travel = window.innerHeight;
    };

    const onScroll = () => {
      const firstPanel = panelRefs.current[0];
      if (!firstPanel) return;

      const rootTop = firstPanel.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - rootTop;

      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return;

        const coveredBy = Math.max(0, Math.min(1, (scrolled - i * travel) / travel));
        const scale = 1 - coveredBy * SCALE_AMOUNT;
        const nudge = coveredBy * -NUDGE_Y;

        sec.style.transform = `scale(${scale.toFixed(5)}) translateY(${nudge.toFixed(2)}px)`;
      });

      let current = 0;
      for (let i = 0; i < count; i += 1) {
        if ((scrolled - i * travel) / travel >= 0.5) {
          current = i;
        }
      }
      setActiveIndex(Math.min(current, count - 1));
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled, count]);

  const scrollToSection = (index) => {
    const firstPanel = panelRefs.current[0];
    if (!firstPanel) return;
    const rootTop = firstPanel.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: rootTop + index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  if (!enabled) {
    return <main className="bm-main">{childArray}</main>;
  }

  return (
    <>
      <nav className="stacking-dots" aria-label="Page sections">
        {SECTION_META.slice(0, count).map((sec, i) => (
          <button
            key={sec.id}
            type="button"
            className={`stacking-dot${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${sec.label}`}
          />
        ))}
      </nav>

      <div className="stacking-root">
        {childArray.map((child, i) => (
          <div
            key={SECTION_META[i]?.id ?? i}
            className={`stacking-panel${i === count - 1 ? ' stacking-panel--last' : ''}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <div
              className="stacking-section"
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              style={{ zIndex: 10 + i * 10 }}
            >
              {child}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
```

---
## FILE: src/components/StackingSections.css
```
/* Stacking scroll layout (from j-events StackingSections) — works with existing .bm-section children */

.stacking-root {
  width: 100%;
  padding: var(--bm-section-gap) var(--bm-pad-x) 0;
}

.stacking-panel {
  height: 200vh;
  position: relative;
}

.stacking-panel--last {
  height: 100vh;
}

.stacking-section {
  position: sticky;
  top: var(--bm-stack-top);
  height: calc(100vh - var(--bm-stack-top));
  width: 100%;
  max-width: var(--bm-content-max);
  margin-inline: auto;
  overflow: hidden;
  transform-origin: top center;
  will-change: transform;
}

.stacking-section > .bm-section {
  width: 100%;
  max-width: none;
  margin: 0;
  height: 100%;
  min-height: 100%;
  border-radius: var(--bm-radius-section);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.stacking-section > .bm-section--hero {
  min-height: 100%;
}

.stacking-dots {
  position: fixed;
  right: clamp(0.75rem, 2vw, 1.75rem);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 9px;
  z-index: 9999;
  padding: 0.5rem;
}

.stacking-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 0 0 1px rgba(17, 17, 17, 0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.25s ease, background 0.25s ease;
}

.stacking-dot:hover {
  transform: scale(1.2);
}

.stacking-dot.active {
  background: var(--bm-btn-orange);
  transform: scale(1.5);
  box-shadow: none;
}

.stacking-root .bm-section.reveal-section,
.stacking-root .bm-section.reveal-section-left,
.stacking-root .bm-section.reveal-section-right,
.stacking-root .bm-section.reveal-section-scale {
  opacity: 1;
  transform: none;
  transition: none;
}

@media (max-width: 767px) {
  .stacking-dots {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stacking-section {
    transform: none !important;
  }
}
```

---
## FILE: src/components/Section.jsx
```
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Section({
  children,
  className = '',
  id,
  type = 'up',
  as: Tag = 'div',
}) {
  const [ref, isVisible] = useScrollReveal({
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px',
  });

  const typeClass = {
    up: 'reveal-section',
    left: 'reveal-section-left',
    right: 'reveal-section-right',
    scale: 'reveal-section-scale',
  }[type] || 'reveal-section';

  return (
    <Tag
      ref={ref}
      id={id}
      className={`bm-section ${typeClass} ${isVisible ? 'in' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
```

---
## FILE: src/components/Hero.jsx
```
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { assetUrl } from '../utils/assetUrl';
import heroPoster from '../assets/hero.png';

const HERO_MP4 = assetUrl('hero/hero.mp4');
const HERO_WEBM = assetUrl('hero/hero.webm');

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const startLoading = () => setLoadVideo(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(startLoading, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(startLoading, 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video) return undefined;

    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      play();
      return undefined;
    }

    video.addEventListener('loadeddata', play, { once: true });
    return () => video.removeEventListener('loadeddata', play);
  }, [loadVideo]);

  return (
    <div className="bm-hero" ref={heroRef}>
      <video
        ref={videoRef}
        className="bm-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload={loadVideo ? 'auto' : 'none'}
        poster={heroPoster}
        aria-hidden="true"
      >
        {loadVideo ? (
          <>
            <source src={HERO_WEBM} type="video/webm" />
            <source src={HERO_MP4} type="video/mp4" />
          </>
        ) : null}
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
```

---
## FILE: src/components/Stats.jsx
```
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import Reveal from './Reveal';

function AnimatedStat({ target, suffix, label, delay }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  const count = useCountUp(target, isVisible);

  return (
    <Reveal delay={delay} className="bm-stat-reveal">
      <div className="bm-stat" ref={ref}>
        <div className="bm-stat-num">{count}{suffix}</div>
        <div className="bm-stat-lbl">{label}</div>
      </div>
    </Reveal>
  );
}

function StaticStat({ value, label, delay }) {
  return (
    <Reveal delay={delay} className="bm-stat-reveal">
      <div className="bm-stat">
        <div className="bm-stat-num">{value}</div>
        <div className="bm-stat-lbl">{label}</div>
      </div>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <div className="bm-stats">
      <AnimatedStat target={120} suffix="+" label="Events done" delay={1} />
      <StaticStat value="6 yrs" label="Experience" delay={2} />
      <AnimatedStat target={98} suffix="%" label="Satisfaction" delay={3} />
    </div>
  );
}
```

---
## FILE: src/components/Services.jsx
```
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
```

---
## FILE: src/components/Portfolio.jsx
```
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { categories, projects } from '../data/projects';
import { assetUrl } from '../utils/assetUrl';

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bm-work">
      <div className="bm-work-inner">
        <Reveal>
          <div className="bm-sec-header">
            <div className="bm-sec-title">Work</div>
          </div>
          <div className="bm-filter-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`bm-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="bm-work-grid">
          {filtered.map((item, i) => (
            <Reveal key={item.title} type="scale" delay={(i % 4) + 1}>
              <Link className="bm-work-item bm-work-link" to={`/work/${item.slug}`}>
                <div className="bm-work-img">
                  {item.image ? (
                    <img src={assetUrl(item.image)} alt={item.imageAlt ?? item.title} />
                  ) : (
                    <CameraIcon />
                  )}
                </div>
                <div className="bm-work-info">
                  <div className="bm-work-title">{item.title}</div>
                  <div className="bm-work-meta">{item.meta}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---
## FILE: src/components/Testimonials.jsx
```
import Reveal from './Reveal';

const featured = {
  text: 'She understood the brief immediately and delivered something beyond what we imagined.',
  author: 'Wanjiru M.',
  role: 'Bride, March 2024',
};

export default function Testimonials() {
  return (
    <blockquote className="bm-quote-strip">
      <div className="bm-quote-inner">
        <Reveal type="scale">
          <div className="bm-quote-mark" aria-hidden="true">"</div>
        </Reveal>
        <Reveal type="right" delay={1}>
          <div>
            <p className="bm-quote-text">{featured.text}</p>
            <footer className="bm-quote-attr">
              {featured.author} · {featured.role}
            </footer>
          </div>
        </Reveal>
      </div>
    </blockquote>
  );
}
```

---
## FILE: src/components/Contact.jsx
```
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <div className="bm-contact bm-contact--summary">
      <div className="bm-contact-inner">
        <Reveal>
          <div className="bm-sec-header">
            <div className="bm-sec-title">Contact</div>
          </div>
          <p className="bm-contact-sub">
            Reach out directly, or share your event details and I&apos;ll be in touch within 24 hours.
          </p>
        </Reveal>

        <div className="bm-contact-grid">
          <Reveal type="left" delay={1}>
            <div className="bm-contact-info">
              <p className="bm-contact-label">Email</p>
              <a className="bm-contact-detail" href="mailto:hello@jevents.co.ke">
                hello@jevents.co.ke
              </a>
              <p className="bm-contact-label">Phone</p>
              <a className="bm-contact-detail" href="tel:+254700000000">
                +254 700 000 000
              </a>
              <Link to="/book" className="bm-contact-cta">
                Tell me about your event
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
```

---
## FILE: src/components/Footer.jsx
```
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bm-footer">
      <div className="bm-footer-inner">
        <div>
          <div className="bm-footer-logo">J EVENTS</div>
          <div className="bm-footer-copy">© 2025 · All rights reserved</div>
        </div>
        <div className="bm-footer-links">
          <Link to="/#services">Services</Link>
          <Link to="/#work">Work</Link>
          <Link to="/#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
```

---
## FILE: src/components/Nav.jsx
```
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bm-nav">
      <Link to="/" className="bm-logo">J EVENTS</Link>
      <ul className="bm-navlinks">
        <li><Link to="/#services">Services</Link></li>
        <li><Link to="/#work">Work</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>
      <Link to="/book" className="bm-cta">Book now</Link>
    </nav>
  );
}
```

---
## FILE: src/components/Reveal.jsx
```
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Reveal({
  children,
  type = 'up',
  delay = 0,
  className = '',
}) {
  const [ref, isVisible] = useScrollReveal({
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  });

  const typeClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[type] || 'reveal';

  const delayClass = delay ? `d${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${typeClass} ${delayClass} ${isVisible ? 'in' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
```

---
## FILE: src/hooks/useScrollReveal.js
```
import { useEffect, useRef, useState } from 'react';

const defaultOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -8% 0px',
};

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold, rootMargin } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const merged = { ...defaultOptions, threshold, rootMargin };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      merged,
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export function useCountUp(target, isVisible) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return count;
}
```

---
## FILE: src/utils/assetUrl.js
```
/** Public folder paths with correct Vite base (e.g. /J-Events/ on GitHub Pages). */
export function assetUrl(path) {
  if (!path) return path;
  const file = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${file}`;
}
```

---
## FILE: src/index.css
```
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bm-bg: #fef6ef;
  --bm-dark: #111;
  --bm-dark-2: #1e1e1e;
  --bm-dark-border: #2a2a2a;
  --bm-cream: #f0ece4;
  --bm-accent: #e8ff57;
  --bm-btn-orange: #ff6a00;
  /* --bm-hero-bg: #c75a12; */
  --bm-hero-bg: transparent;
  --bm-hero-text: var(--bm-btn-orange);
  --bm-font-display: 'Syne', system-ui, sans-serif;
  --bm-font-body: 'DM Sans', system-ui, sans-serif;
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --bm-pad-x: clamp(1.25rem, 5vw, 5rem);
  --bm-hero-pad-x: clamp(0.5rem, 1.5vw, 1rem);
  --bm-pad-y: clamp(2.5rem, 5vw, 4.5rem);
  --bm-section-gap: clamp(2rem, 4vw, 3.5rem);
  --bm-content-max: 1400px;
  --bm-radius-section: 14px;
  --bm-stack-top: clamp(0.75rem, 2.5vw, 1.25rem);
  --bm-stack-step: clamp(0.65rem, 1.4vw, 1rem);
  --bm-stack-scroll: clamp(4rem, 18vh, 9rem);
  --bm-stack-runway: clamp(10rem, 32vh, 18rem);
  --bm-dark-orange: #c75a12;

  /* Responsive type scale */
  --bm-text-xs: clamp(0.625rem, 0.58rem + 0.22vw, 0.6875rem);
  --bm-text-sm: clamp(0.6875rem, 0.64rem + 0.28vw, 0.8125rem);
  --bm-text-base: clamp(0.8125rem, 0.76rem + 0.32vw, 0.9375rem);
  --bm-text-md: clamp(0.875rem, 0.8rem + 0.45vw, 1rem);
  --bm-text-lg: clamp(1.25rem, 1rem + 1.4vw, 1.75rem);
  --bm-text-xl: clamp(1.5rem, 1.1rem + 2vw, 2.5rem);
  --bm-text-display: clamp(2.625rem, 1.4rem + 5.5vw, 5rem);
  --bm-text-stat: clamp(1.625rem, 1.1rem + 2.2vw, 3rem);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  scroll-behavior: smooth;
  font-size: clamp(15px, 0.9rem + 0.35vw, 18px);
}

body {
  font-family: var(--bm-font-body);
  font-size: var(--bm-text-base);
  line-height: 1.6;
  background: var(--bm-bg);
  color: var(--bm-dark);
  -webkit-font-smoothing: antialiased;
  min-height: 100%;
  overflow-wrap: break-word;
}

/* Reveal animations — in-section elements */
.reveal,
.reveal-left,
.reveal-right,
.reveal-scale {
  will-change: opacity, transform;
}

.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition:
    opacity 0.8s var(--ease-spring),
    transform 0.8s var(--ease-spring);
}
.reveal.in { opacity: 1; transform: translateY(0); }

.reveal-left {
  opacity: 0;
  transform: translateX(-36px);
  transition:
    opacity 0.8s var(--ease-spring),
    transform 0.8s var(--ease-spring);
}
.reveal-left.in { opacity: 1; transform: translateX(0); }

.reveal-right {
  opacity: 0;
  transform: translateX(36px);
  transition:
    opacity 0.8s var(--ease-spring),
    transform 0.8s var(--ease-spring);
}
.reveal-right.in { opacity: 1; transform: translateX(0); }

.reveal-scale {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
  transition:
    opacity 0.75s var(--ease-spring),
    transform 0.75s var(--ease-spring);
}
.reveal-scale.in { opacity: 1; transform: scale(1) translateY(0); }

/* Section-level scroll transitions */
.reveal-section,
.reveal-section-left,
.reveal-section-right,
.reveal-section-scale {
  will-change: opacity, transform;
}

.reveal-section {
  opacity: 0;
  transform: translateY(56px);
  transition:
    opacity 1s var(--ease-spring),
    transform 1s var(--ease-spring);
}
.reveal-section.in { opacity: 1; transform: translateY(0); }

.reveal-section-left {
  opacity: 0;
  transform: translateX(-48px);
  transition:
    opacity 1s var(--ease-spring),
    transform 1s var(--ease-spring);
}
.reveal-section-left.in { opacity: 1; transform: translateX(0); }

.reveal-section-right {
  opacity: 0;
  transform: translateX(48px);
  transition:
    opacity 1s var(--ease-spring),
    transform 1s var(--ease-spring);
}
.reveal-section-right.in { opacity: 1; transform: translateX(0); }

.reveal-section-scale {
  opacity: 0;
  transform: scale(0.96) translateY(32px);
  transition:
    opacity 0.95s var(--ease-spring),
    transform 0.95s var(--ease-spring);
}
.reveal-section-scale.in { opacity: 1; transform: scale(1) translateY(0); }

.d1 { transition-delay: 0.08s; }
.d2 { transition-delay: 0.16s; }
.d3 { transition-delay: 0.24s; }
.d4 { transition-delay: 0.32s; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  .reveal,
  .reveal-left,
  .reveal-right,
  .reveal-scale,
  .reveal-section,
  .reveal-section-left,
  .reveal-section-right,
  .reveal-section-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Shell */
.bm {
  font-family: var(--bm-font-body);
  background: var(--bm-bg);
  color: var(--bm-dark);
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.bm > * {
  width: 100%;
}

.bm-main {
  display: flex;
  flex-direction: column;
  gap: var(--bm-section-gap);
  padding: var(--bm-section-gap) var(--bm-pad-x) calc(var(--bm-section-gap) * 1.25);
  flex: 1;
  width: 100%;
}

.bm-section {
  width: 100%;
  max-width: var(--bm-content-max);
  margin-inline: auto;
  border-radius: var(--bm-radius-section);
  overflow: hidden;
  box-shadow:
    0 1px 0 rgba(17, 17, 17, 0.04),
    0 24px 48px -32px rgba(17, 17, 17, 0.18);
}

.bm-section--hero {
  background: var(--bm-hero-bg);
  min-height: clamp(640px, 88vh, 980px);
  position: relative;
  display: flex;
  flex-direction: column;
}

.bm-section--stats {
  background: var(--bm-btn-orange);
  display: flex;
  align-items: center;
  min-height: clamp(180px, 22vh, 280px);
}

.bm-section--light {
  background: var(--bm-bg);
  border: 1px solid rgba(17, 17, 17, 0.06);
}

#work.bm-section {
  border: 1px solid var(--bm-btn-orange);
}

#work .bm-sec-header {
  justify-content: flex-start;
  padding-block: clamp(1.25rem, 4vw, 2.25rem);
  margin-bottom: clamp(0.75rem, 2.5vw, 1.25rem);
}

#work .bm-sec-title {
  color: var(--bm-btn-orange);
}

.bm-section--white {
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.bm-section--quote {
  background: var(--bm-btn-orange);
}

.bm-section--dark {
  background: var(--bm-dark);
}

.bm-section--orange {
  background: var(--bm-btn-orange);
}

.bm-section--footer {
  background: var(--bm-dark-2);
  box-shadow: none;
}

/* Nav */
.bm-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px var(--bm-hero-pad-x);
  background: transparent;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.bm-logo {
  font-family: var(--bm-font-display);
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--bm-btn-orange);
  text-decoration: none;
}
.bm-navlinks {
  display: flex;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  list-style: none;
}
.bm-navlinks a {
  font-size: var(--bm-text-sm);
  font-weight: 400;
  color: rgba(199, 90, 18, 0.75);
  text-decoration: none;
  transition: color 0.2s;
}
.bm-navlinks a:hover {
  color: #c75a12;
}
.bm-cta {
  font-size: var(--bm-text-sm);
  font-weight: 700;
  background: var(--bm-btn-orange);
  color: var(--bm-dark);
  padding: clamp(0.5rem, 1.5vw, 0.55rem) clamp(0.875rem, 2vw, 1.125rem);
  border-radius: 4px;
  border: none;
  font-family: var(--bm-font-display);
  letter-spacing: -0.01em;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s, filter 0.2s;
}
.bm-cta:hover { opacity: 0.98; filter: saturate(1.25) brightness(1.03); }

/* Hero / jumbotron */
.bm-hero {
  flex: 1;
  width: 100%;
  min-height: 100%;
  padding: clamp(4.5rem, 10vh, 5.5rem) var(--bm-hero-pad-x) 0;
  background: var(--bm-hero-bg);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.bm-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.bm-hero-video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(60% 80% at 65% 40%, rgba(199, 90, 18, 0.3), rgba(0, 0, 0, 0.66)),
    linear-gradient(0deg, rgba(199, 90, 18, 0.5), rgba(199, 90, 18, 0.5));
  pointer-events: none;
}

.bm-hero-inner {
  max-width: none;
  margin-inline: 0;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  min-height: 0;
  position: relative;
  z-index: 2;
}

.bm-hero-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(1.25rem, 3vw, 2rem);
  min-height: 100%;
}
.bm-h1 {
  font-family: var(--bm-font-display);
  font-size: clamp(1.75rem, 1.05rem + 3vw, 3.1rem);
  font-weight: 800;
  line-height: 0.95;
  color: var(--bm-cream);
  letter-spacing: -0.03em;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  text-wrap: balance;
}
.bm-h1 .accent {
  color: var(--bm-accent);
  display: block;
}
.bm-body {
  font-size: clamp(0.8rem, 0.72rem + 0.42vw, 1rem);
  font-weight: 300;
  line-height: 1.6;
  color: rgba(240, 236, 228, 0.5);
  max-width: 42ch;
  margin-bottom: clamp(1rem, 2.5vw, 1.25rem);
  letter-spacing: 0.02em;
}

/* Jumbotron text color */
.bm-section--hero .bm-h1,
.bm-section--hero .bm-h1 .accent {
  color: var(--bm-hero-text);
  font-size: clamp(1.75rem, 1.05rem + 2.8vw, 2.85rem);
}

.bm-section--hero .bm-body {
  color: rgba(255, 106, 0, 0.95);
  font-size: clamp(0.72rem, 0.66rem + 0.32vw, 0.875rem);
  max-width: none;
}

/* Hero pills */
.bm-hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(1rem, 2.5vw, 1.25rem);
}

.bm-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 2px solid var(--bm-btn-orange);
  color: var(--bm-btn-orange);
  background: rgba(255, 106, 0, 0.08);
  font-family: var(--bm-font-display);
  font-size: clamp(0.68rem, 0.62rem + 0.22vw, 0.8125rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;
  line-height: 1;
  white-space: nowrap;
}

.bm-section--hero .bm-body {
  opacity: 0.95;
}
.bm-btns {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.bm-section--hero .bm-btns {
  width: 100%;
  align-items: center;
  margin-top: 0;
}

.bm-section--hero .bm-hero-copy {
  align-items: center;
}

.bm-section--hero .bm-hero-head {
  align-items: center;
  text-align: center;
}

.bm-section--hero .bm-h1 {
  text-align: center;
}

.bm-section--hero .bm-hero-pills {
  justify-content: center;
}

.bm-hero-copy > .reveal-right .bm-btns {
  margin-top: auto;
  padding-bottom: clamp(1rem, 3vh, 1.75rem);
  align-self: center;
}

.bm-hero-head {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bm-hero-media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 0;
  padding-left: clamp(0.9rem, 2.4vw, 1.75rem);
}

.bm-hero-img {
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: min(100%, 440px);
  height: auto;
  aspect-ratio: 3 / 4;
  min-height: 0;
  background: var(--bm-dark-2);
  border-radius: 6px;
  padding: 10px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.bm-hero-img:hover {
  opacity: 0.9;
}

.bm-hero-img-label {
  font-size: var(--bm-text-xs);
  color: rgba(240, 236, 228, 0.2);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* removed "See the work" button */

.bm-btn1,
.bm-btn2 {
  text-decoration: none;
  display: inline-block;
}
.bm-btn1 {
  background: var(--bm-btn-orange);
  color: #fff;
  padding: clamp(0.65rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  border: none;
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-sm);
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s, filter 0.2s;
}
.bm-btn1:hover { opacity: 0.98; filter: saturate(1.25) brightness(1.03); }

/* Hero: outline style for "Book a consultation" */
.bm-section--hero .bm-btn1 {
  background: transparent;
  border: 2px solid var(--bm-btn-orange);
  color: var(--bm-btn-orange);
}
.bm-section--hero .bm-btn1:hover {
  opacity: 1;
  filter: none;
  background: rgba(255, 106, 0, 0.12);
}
.bm-btn2 {
  font-size: var(--bm-text-sm);
  font-weight: 300;
  color: rgba(240, 236, 228, 0.4);
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--bm-font-body);
  transition: color 0.2s;
}
.bm-btn2:hover { color: var(--bm-cream); }

.bm-btn2.bm-hero-see-work {
  color: #fff;
}

.bm-btn2.bm-hero-see-work:hover {
  color: rgba(255, 255, 255, 0.75);
}

/* Stats */
.bm-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  align-items: center;
}

.bm-stat-reveal {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.bm-stat-reveal .bm-stat {
  width: 100%;
}
.bm-stat {
  padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1rem, 4vw, 1.75rem);
  border-right: 1px solid rgba(17, 17, 17, 0.15);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
.bm-stat:last-child { border-right: none; }
.bm-stat-num {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-stat);
  font-weight: 800;
  color: var(--bm-dark);
  letter-spacing: -0.03em;
  line-height: 1;
}
.bm-stat-lbl {
  font-size: var(--bm-text-xs);
  font-weight: 400;
  color: rgba(17, 17, 17, 0.5);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.4;
}

/* Services */
.bm-services {
  padding: var(--bm-pad-y) 0;
}

.bm-services-inner,
.bm-work-inner,
.bm-contact-inner,
.bm-quote-inner {
  padding-inline: var(--bm-pad-x);
}

.bm-services-inner {
  max-width: 100%;
  margin-inline: auto;
}

.bm-intro {
  margin-top: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
  max-width: none;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0 clamp(1rem, 3vw, 2.25rem);
  box-shadow: none;
}

.bm-intro-lead {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-md);
  font-weight: 700;
  color: var(--bm-dark);
  line-height: 1.55;
  letter-spacing: -0.01em;
  margin-bottom: clamp(1rem, 2.5vw, 1.25rem);
}

.bm-intro-body {
  font-size: var(--bm-text-base);
  font-weight: 300;
  color: rgba(17, 17, 17, 0.65);
  line-height: 1.85;
}

/* Services section text color */
#services .bm-intro-lead,
#services .bm-intro-body,
#services .bm-sec-num {
  color: #c75a12;
}

#services .bm-intro {
  text-align: center;
}

#services .bm-intro-lead,
#services .bm-intro-body {
  margin-inline: auto;
}

#services .bm-learn-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  border: 2px solid #c75a12;
  color: #c75a12;
  background: transparent;
  text-decoration: none;
  font-family: var(--bm-font-body);
  font-size: var(--bm-text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: background 0.2s, filter 0.2s;
}

#services .bm-learn-more:hover {
  background: rgba(199, 90, 18, 0.12);
  filter: saturate(1.1) brightness(1.02);
}

#services .bm-intro-body {
  opacity: 0.9;
}

#services .bm-emph {
  font-family: var(--bm-font-display);
  font-weight: 800;
}

#services .bm-services-cta {
  display: flex;
  justify-content: center;
  padding-bottom: clamp(1rem, 3vw, 2rem);
}

#services .bm-sec-header {
  justify-content: center;
  padding-block: clamp(1.25rem, 4vw, 2.5rem);
}

#services .bm-services-inner {
  padding-inline: calc(var(--bm-pad-x) + clamp(1.25rem, 3vw, 2.5rem));
}

.bm-sec-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
}
.bm-sec-title {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-lg);
  font-weight: 800;
  color: #c75a12;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}
.bm-sec-num {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-sm);
  font-weight: 700;
  color: rgba(17, 17, 17, 0.25);
}
.bm-svc-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(10px, 1.6vw, 16px);
  padding: clamp(10px, 1.6vw, 16px);
  align-items: stretch;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
}

.bm-svc-grid > .reveal,
.bm-svc-grid > .reveal-scale,
.bm-work-grid > .reveal,
.bm-work-grid > .reveal-scale {
  display: flex;
  height: 100%;
  min-height: 0;
  width: 100%;
}

.bm-work-grid > .reveal,
.bm-work-grid > .reveal-scale {
  aspect-ratio: 1 / 1;
}

.bm-svc {
  background: var(--bm-dark-orange);
  border-radius: 18px;
  padding: clamp(0.75rem, 2vw, 1rem);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: clamp(260px, 34vh, 420px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bm-svc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.1rem, 3vw, 2rem);
  padding-top: calc(clamp(1.1rem, 3vw, 2rem) + clamp(1.75rem, 4vw, 2.5rem));
}
.bm-svc-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--bm-accent);
  color: var(--bm-dark);
  font-size: var(--bm-text-xs);
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  font-family: var(--bm-font-display);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.bm-svc-num {
  position: absolute;
  top: clamp(0.875rem, 2.5vw, 1.5rem);
  right: clamp(0.875rem, 2.5vw, 1.5rem);
  left: auto;
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-xl);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1;
  margin-bottom: 0;
  pointer-events: none;
  padding-bottom: clamp(1rem, 2.5vw, 1.5rem);
}
.bm-svc-name {
  font-family: var(--bm-font-display);
  font-size: clamp(1.125rem, 0.95rem + 1vw, 1.65rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
  letter-spacing: -0.01em;
  line-height: 1.15;
  text-wrap: balance;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(2 * 1.15em);
}

.bm-svc-desc {
  font-size: clamp(0.8125rem, 0.76rem + 0.32vw, 0.95rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.55;
  margin-bottom: clamp(0.5rem, 1.5vw, 0.65rem);
}

.bm-svc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bm-svc-list li {
  position: relative;
  padding: 0.25rem 0 0.25rem 1.15rem;
  font-size: clamp(0.75rem, 0.72rem + 0.22vw, 0.875rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
  margin-bottom: 0.35rem;
}

.bm-svc-list li:last-child {
  margin-bottom: 0;
}

.bm-svc-list li::before {
  content: '';
  position: absolute;
  left: 0.1rem;
  top: 0.85em;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #fff;
  transform: translateY(-50%);
}

.bm-svc-price {
  font-size: var(--bm-text-sm);
  font-weight: 300;
  color: rgba(240, 236, 228, 0.35);
  margin-top: auto;
  padding-top: 14px;
  line-height: 1.5;
}

/* Work / portfolio */
.bm-work {
  padding: var(--bm-pad-y) 0;
}

.bm-work-inner {
  max-width: 100%;
  margin-inline: auto;
}
.bm-work-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(12px, 2vw, 20px);
  align-items: stretch;
}

.bm-work-item {
  background: var(--bm-dark-2);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1;
}

.bm-work-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s var(--ease-spring);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
}

.bm-work-link:hover {
  transform: translateY(-2px);
}

.bm-work-img {
  flex: 1;
  min-height: 0;
  background: var(--bm-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(240, 236, 228, 0.15);
  overflow: hidden;
}

.bm-work-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.bm-work-info {
  padding: clamp(1rem, 2.5vw, 1.25rem) clamp(1rem, 3vw, 1.375rem);
  background: var(--bm-dark);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bm-work-detail {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 4vw, 2.5rem);
  align-items: start;
}

.bm-work-detail-desc {
  font-size: var(--bm-text-base);
  font-weight: 300;
  line-height: 1.75;
  color: rgba(240, 236, 228, 0.6);
  max-width: 60ch;
  margin-top: 0.75rem;
}

.bm-work-detail-media {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bm-dark-2);
  aspect-ratio: 4 / 5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bm-about-media {
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  aspect-ratio: 1 / 1;
  background: rgba(17, 17, 17, 0.04);
}

.bm-about-media img {
  width: 66%;
  height: 66%;
  object-fit: contain;
  object-position: center;
}

.bm-work-detail-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.bm-work-detail-placeholder {
  font-size: var(--bm-text-sm);
  color: rgba(240, 236, 228, 0.35);
}

.bm-backlink {
  display: inline-block;
  margin-top: -0.75rem;
  margin-bottom: 1.75rem;
  font-size: var(--bm-text-sm);
  text-decoration: none;
  color: rgba(240, 236, 228, 0.6);
  transition: color 0.2s;
}

.bm-backlink:hover {
  color: rgba(240, 236, 228, 0.9);
}

/* Work detail backlink on light hero background */
.bm-section--hero .bm-backlink {
  color: rgba(255, 106, 0, 0.9);
}
.bm-section--hero .bm-backlink:hover {
  color: rgba(255, 106, 0, 1);
}

/* Work detail page on white background */
.bm-project-detail-page.bm-section {
  min-height: clamp(620px, 78vh, 880px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.bm-project-detail-page .bm-hero {
  flex: 1;
  justify-content: center;
  padding-top: clamp(3.75rem, 9vh, 5rem);
  padding-bottom: clamp(3.75rem, 9vh, 5rem);
  padding-inline: calc(var(--bm-hero-pad-x) + clamp(1rem, 3vw, 2.5rem));
}

.bm-project-detail-page .bm-hero-inner {
  flex: 1;
  justify-content: center;
  position: relative;
  padding-bottom: 0;
  padding-right: 0;
}

.bm-work-detail-copy {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.bm-work-detail-page .bm-work-detail-heading {
  font-size: clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem);
  color: #c75a12;
  margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
}

.bm-work-detail-page .bm-work-detail-sub {
  font-size: var(--bm-text-md);
  color: rgba(199, 90, 18, 0.75);
  margin-top: 0;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
}

.bm-work-detail-page .bm-work-detail-desc {
  color: rgba(17, 17, 17, 0.75);
  max-width: 42ch;
  margin-top: 0;
}

.bm-work-detail-card {
  width: 100%;
  max-width: min(100%, 420px);
  margin-inline: auto;
  box-shadow:
    0 1px 0 rgba(17, 17, 17, 0.06),
    0 20px 40px -24px rgba(17, 17, 17, 0.35);
}

.bm-work-detail-card .bm-work-detail-placeholder {
  color: rgba(240, 236, 228, 0.35);
}

.bm-work-detail-fablink {
  position: absolute;
  right: clamp(1rem, 3vh, 1.75rem);
  bottom: clamp(1rem, 3vh, 1.75rem);
  margin: 0;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  border: 2px solid #c75a12;
  color: #c75a12;
  background: rgba(255, 255, 255, 0.85);
  font-family: var(--bm-font-body);
  font-weight: 500;
  font-size: var(--bm-text-sm);
  text-decoration: none;
}

.bm-work-detail-fablink:hover {
  background: #fff;
}

.bm-about-backrow {
  display: flex;
  justify-content: flex-end;
}

.bm-about-title {
  padding-top: clamp(0.75rem, 2vw, 1.5rem);
  margin-bottom: clamp(1.25rem, 3vw, 2rem);
}

.bm-about-leftcol {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.bm-about-page.bm-section {
  min-height: clamp(620px, 78vh, 880px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.bm-about-page .bm-hero {
  flex: 1;
  justify-content: center;
  padding-top: clamp(3.75rem, 9vh, 5rem);
  padding-bottom: clamp(3.75rem, 9vh, 5rem);
  padding-inline: calc(var(--bm-hero-pad-x) + clamp(1rem, 3vw, 2.5rem));
}

.bm-about-page .bm-hero-inner {
  flex: 1;
  justify-content: center;
  position: relative;
  padding-bottom: 0;
  padding-right: 0;
}

.bm-about-fablink {
  position: absolute;
  right: clamp(1rem, 3vh, 1.75rem);
  bottom: clamp(1rem, 3vh, 1.75rem);
  margin: 0;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  border: 2px solid #c75a12;
  color: #c75a12;
  background: rgba(255, 255, 255, 0.85);
  font-family: var(--bm-font-body);
  font-weight: 500;
  text-decoration: none;
}

.bm-about-fablink:hover {
  background: #fff;
}

@media (min-width: 900px) {
  .bm-work-detail {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
.bm-work-title {
  font-family: var(--bm-font-display);
  font-size: clamp(0.875rem, 0.8rem + 0.5vw, 1.125rem);
  font-weight: 700;
  color: var(--bm-cream);
  letter-spacing: -0.01em;
  line-height: 1.35;
  text-wrap: balance;
}
.bm-work-meta {
  font-size: clamp(0.6875rem, 0.64rem + 0.25vw, 0.8125rem);
  font-weight: 300;
  color: rgba(240, 236, 228, 0.35);
  margin-top: 4px;
  line-height: 1.5;
}
.bm-filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
}
.bm-filter-btn {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-xs);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: clamp(0.35rem, 1.5vw, 0.4rem) clamp(0.65rem, 2vw, 0.75rem);
  border-radius: 4px;
  border: 1px solid rgba(17, 17, 17, 0.15);
  background: transparent;
  color: rgba(17, 17, 17, 0.45);
  cursor: pointer;
  transition: all 0.2s;
}
.bm-filter-btn.active,
.bm-filter-btn:hover {
  background: var(--bm-dark);
  color: var(--bm-cream);
  border-color: var(--bm-dark);
}

/* Quote */
.bm-quote-strip {
  padding: var(--bm-pad-y) 0;
  display: block;
  border: none;
  margin: 0;
}

.bm-quote-inner {
  max-width: var(--bm-content-max);
  margin-inline: auto;
  display: flex;
  gap: 16px;
  align-items: start;
  width: 100%;
}
.bm-quote-mark {
  font-family: var(--bm-font-display);
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 800;
  color: rgba(17, 17, 17, 0.15);
  line-height: 0.8;
  flex-shrink: 0;
}
.bm-quote-text {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-md);
  font-weight: 700;
  color: var(--bm-dark);
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  text-wrap: pretty;
}
.bm-quote-attr {
  font-size: var(--bm-text-sm);
  font-weight: 300;
  color: rgba(17, 17, 17, 0.5);
  line-height: 1.5;
}

/* Contact */
.bm-contact {
  padding: var(--bm-pad-y) 0;
}

.bm-contact-inner {
  max-width: 100%;
  margin-inline: auto;
}
.bm-contact .bm-sec-title,
.bm-contact .bm-sec-num {
  color: var(--bm-cream);
}
.bm-contact .bm-sec-num {
  color: rgba(240, 236, 228, 0.25);
}
.bm-contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 20px;
}

.bm-contact-sub {
  margin-top: 10px;
  font-size: var(--bm-text-base);
  font-weight: 300;
  line-height: 1.7;
  color: rgba(240, 236, 228, 0.6);
  max-width: 60ch;
}

.bm-contact--form .bm-contact-sub {
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

@media (min-width: 768px) {
  .bm-contact-grid {
    grid-template-columns: 1fr 1.2fr;
    align-items: start;
  }

  .bm-contact--summary .bm-contact-grid {
    grid-template-columns: 1fr;
    max-width: 36rem;
  }

  .bm-contact--form .bm-contact-grid {
    grid-template-columns: 1fr;
  }
}

.bm-contact-label {
  font-size: var(--bm-text-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 4px;
  margin-top: 1rem;
}

.bm-contact-label:first-child {
  margin-top: 0;
}


.bm-contact-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(1.25rem, 3vw, 1.75rem);
  padding: 0.7rem 1.25rem;
  border-radius: 999px;
  border: 2px solid #c75a12;
  color: #c75a12;
  background: transparent;
  text-decoration: none;
  font-family: var(--bm-font-body);
  font-size: var(--bm-text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: background 0.2s, filter 0.2s;
}

.bm-contact-cta:hover {
  background: rgba(199, 90, 18, 0.12);
  filter: saturate(1.1) brightness(1.02);
}

.bm-book-page {
  position: relative;
  padding-bottom: clamp(3.5rem, 8vw, 5rem);
}

.bm-book-page .bm-contact--form {
  padding-top: clamp(6rem, 16vh, 8.5rem);
}

.bm-book-intro {
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.bm-book-back {
  display: inline-flex;
  align-self: flex-start;
  font-size: var(--bm-text-sm);
  font-weight: 500;
  color: #c75a12;
  text-decoration: none;
  transition: opacity 0.2s;
}

.bm-book-back:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.bm-book-intro .bm-sec-header {
  margin-bottom: 0;
}

.bm-contact-info p {
  font-size: var(--bm-text-base);
  font-weight: 300;
  color: rgba(240, 236, 228, 0.5);
  line-height: 1.8;
  margin-bottom: 16px;
}
.bm-contact-detail {
  display: block;
  font-size: var(--bm-text-base);
  color: rgba(240, 236, 228, 0.7);
  margin-bottom: 8px;
  line-height: 1.5;
  text-decoration: none;
}

.bm-contact-detail:hover {
  text-decoration: underline;
}
.bm-form-group {
  margin-bottom: 12px;
}
.bm-form-group label {
  display: block;
  font-size: var(--bm-text-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(240, 236, 228, 0.4);
  margin-bottom: 6px;
}
.bm-form-group input,
.bm-form-group select,
.bm-form-group textarea {
  width: 100%;
  font-family: var(--bm-font-body);
  font-size: var(--bm-text-base);
  padding: clamp(0.55rem, 2vw, 0.65rem) clamp(0.65rem, 2vw, 0.75rem);
  border-radius: 4px;
  border: 1px solid var(--bm-dark-border);
  background: var(--bm-dark-2);
  color: var(--bm-cream);
  outline: none;
}
.bm-form-group input:focus,
.bm-form-group select:focus,
.bm-form-group textarea:focus {
  border-color: var(--bm-accent);
}
.bm-form-group textarea {
  height: 80px;
  resize: vertical;
}

.bm-form-group select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: clamp(2.25rem, 5vw, 2.75rem);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23c75a12' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right clamp(0.75rem, 2vw, 1rem) center;
  background-size: 12px 8px;
}

.bm-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.bm-submit {
  width: 100%;
  margin-top: 8px;
  background: var(--bm-btn-orange);
  color: var(--bm-dark);
  border: none;
  padding: clamp(0.7rem, 2vw, 0.8125rem);
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-sm);
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s, filter 0.2s;
}
.bm-submit:hover { opacity: 0.98; filter: saturate(1.25) brightness(1.03); }

/* Booking form */
.bm-booking-form {
  width: 100%;
}

.bm-form-section {
  border: none;
  margin: 0 0 clamp(1.25rem, 3vw, 1.75rem);
  padding: clamp(1rem, 2.5vw, 1.35rem);
  min-width: 0;
  border-radius: 12px;
  background: rgba(255, 106, 0, 0.1);
  overflow: visible;
}

.bm-form-legend {
  font-family: var(--bm-font-display);
  font-size: var(--bm-text-sm);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: block;
  width: 100%;
  margin: 0 0 0.85rem;
  padding: 0;
  line-height: 1.25;
}

#contact.bm-section {
  overflow: visible;
}

.bm-field-hint {
  display: block;
  font-size: var(--bm-text-xs);
  font-weight: 300;
  margin-top: 0.35rem;
  opacity: 0.75;
}

.bm-field-hint-block {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.bm-service-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bm-service-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(17, 17, 17, 0.15);
  cursor: pointer;
}

.bm-service-option input {
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.bm-service-option-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bm-service-option-label {
  font-size: var(--bm-text-sm);
  font-weight: 500;
}

.bm-service-option-note {
  font-size: var(--bm-text-xs);
  opacity: 0.7;
}

.bm-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bm-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--bm-text-sm);
  cursor: pointer;
}

.bm-checkbox input {
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.bm-contact-privacy {
  margin-top: 1rem;
  font-size: var(--bm-text-xs);
  line-height: 1.6;
  opacity: 0.75;
}

.bm-form-success {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: rgba(255, 106, 0, 0.12);
  color: #c75a12;
  font-size: var(--bm-text-sm);
}

.bm-form-error {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: rgba(180, 40, 40, 0.1);
  color: #8b2020;
  font-size: var(--bm-text-sm);
}

.bm-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Contact on orange section */
.bm-section--orange .bm-contact .bm-sec-title,
.bm-section--orange .bm-contact .bm-sec-num {
  color: var(--bm-dark);
}
.bm-section--orange .bm-contact .bm-sec-num {
  color: rgba(17, 17, 17, 0.45);
}
.bm-section--orange .bm-contact-info p {
  color: rgba(17, 17, 17, 0.75);
}
.bm-section--orange .bm-contact-detail {
  color: rgba(17, 17, 17, 0.9);
}
.bm-section--orange .bm-form-group label {
  color: rgba(17, 17, 17, 0.55);
}
.bm-section--orange .bm-form-group input,
.bm-section--orange .bm-form-group textarea {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(17, 17, 17, 0.25);
  color: var(--bm-dark);
}
.bm-section--orange .bm-form-group select {
  background-color: rgba(255, 255, 255, 0.5);
  border-color: rgba(17, 17, 17, 0.25);
  color: var(--bm-dark);
}
.bm-section--orange .bm-form-group input::placeholder,
.bm-section--orange .bm-form-group textarea::placeholder {
  color: rgba(17, 17, 17, 0.45);
}
.bm-section--orange .bm-form-group input:focus,
.bm-section--orange .bm-form-group select:focus,
.bm-section--orange .bm-form-group textarea:focus {
  border-color: rgba(17, 17, 17, 0.6);
}

/* Contact on white section */
.bm-section--white .bm-contact .bm-sec-title,
.bm-section--white .bm-contact .bm-sec-num {
  color: #c75a12;
}
.bm-section--white .bm-contact .bm-sec-num {
  color: rgba(199, 90, 18, 0.55);
}
.bm-section--white .bm-contact-info p {
  color: rgba(199, 90, 18, 0.85);
}
.bm-section--white .bm-contact-detail,
.bm-section--white .bm-contact-label {
  color: rgba(199, 90, 18, 0.95);
}
.bm-section--white .bm-contact-sub,
.bm-section--white .bm-contact-privacy {
  color: rgba(199, 90, 18, 0.75);
}

.bm-section--white .bm-form-section .bm-form-legend,
.bm-section--white .bm-form-section .bm-form-group label,
.bm-section--white .bm-form-section .bm-field-hint,
.bm-section--white .bm-form-section .bm-checkbox,
.bm-section--white .bm-form-section .bm-service-option-label {
  color: #c75a12;
}

.bm-section--white .bm-form-section .bm-service-option-note {
  color: rgba(199, 90, 18, 0.75);
}

.bm-section--white .bm-form-section .bm-service-option {
  border-color: rgba(199, 90, 18, 0.35);
  background: rgba(255, 255, 255, 0.55);
  color: #c75a12;
}

.bm-section--white .bm-form-section .bm-form-group input,
.bm-section--white .bm-form-section .bm-form-group select,
.bm-section--white .bm-form-section .bm-form-group textarea {
  color: #c75a12;
}

.bm-section--white .bm-form-section .bm-form-group input::placeholder,
.bm-section--white .bm-form-section .bm-form-group textarea::placeholder {
  color: rgba(199, 90, 18, 0.5);
}

.bm-section--white .bm-form-group label {
  color: rgba(199, 90, 18, 0.75);
}
.bm-section--white .bm-form-group input,
.bm-section--white .bm-form-group textarea {
  background: #fff;
  border-color: rgba(17, 17, 17, 0.25);
  color: var(--bm-dark);
}
.bm-section--white .bm-form-group select {
  background-color: #fff;
  border-color: rgba(17, 17, 17, 0.25);
  color: var(--bm-dark);
}
.bm-section--white .bm-form-group input::placeholder,
.bm-section--white .bm-form-group textarea::placeholder {
  color: rgba(17, 17, 17, 0.45);
}
.bm-section--white .bm-form-group input:focus,
.bm-section--white .bm-form-group select:focus,
.bm-section--white .bm-form-group textarea:focus {
  border-color: rgba(17, 17, 17, 0.6);
}

/* Footer */
.bm-footer {
  padding: 24px var(--bm-pad-x);
  border-top: 1px solid var(--bm-dark-border);
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.bm-footer-inner {
  max-width: var(--bm-content-max);
  margin-inline: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.bm-footer-logo {
  font-family: var(--bm-font-display);
  font-size: clamp(0.8125rem, 0.75rem + 0.35vw, 0.875rem);
  font-weight: 800;
  color: var(--bm-cream);
}
.bm-footer-copy {
  font-size: var(--bm-text-xs);
  color: rgba(240, 236, 228, 0.3);
  margin-top: 4px;
  line-height: 1.5;
}
.bm-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.75rem, 2vw, 1rem);
}
.bm-footer-links a {
  font-size: var(--bm-text-xs);
  color: rgba(240, 236, 228, 0.4);
  text-decoration: none;
  transition: color 0.2s;
}
.bm-footer-links a:hover {
  color: var(--bm-cream);
}

.bm-hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  min-height: 100%;
}

.bm-section--hero .bm-hero-copy > .reveal-right {
  align-items: center;
}

.bm-hero-media > .reveal,
.bm-hero-media > .reveal-scale,
.bm-hero-copy > .reveal,
.bm-hero-copy > .reveal-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.bm-hero-copy > .reveal-right {
  flex: 1;
}

.bm-hero-media > .reveal,
.bm-hero-media > .reveal-scale {
  align-items: center;
}

@media (min-width: 600px) {
  .bm-svc-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .bm-hero-main {
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, 3vw, 2rem);
  }

  .bm-hero-pills {
    flex-wrap: nowrap;
  }

  .bm-svc-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .bm-navlinks { display: none; }
  .bm-form-row { grid-template-columns: 1fr; }
  .bm-h1 { line-height: 1; }
  .bm-svc-grid {
    grid-template-columns: 1fr;
  }
  .bm-svc {
    min-height: auto;
  }
  .bm-stats {
    grid-template-columns: 1fr;
  }
  .bm-stat {
    border-right: none;
    border-bottom: 1px solid rgba(17, 17, 17, 0.15);
  }
  .bm-stat:last-child {
    border-bottom: none;
  }
}
```
