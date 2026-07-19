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
    if (!isVisible) return undefined;

    const steps = 50;
    const step = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(current));
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return count;
}
