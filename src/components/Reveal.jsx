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
