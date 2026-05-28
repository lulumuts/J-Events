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
