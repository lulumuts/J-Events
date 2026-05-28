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
