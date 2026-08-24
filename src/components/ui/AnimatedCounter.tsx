import React, { useRef, useState, useEffect } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

export interface AnimatedCounterProps {
  /** The target numerical value to count up to */
  value: number;
  /** Duration of the counting animation in milliseconds (default: 900) */
  duration?: number;
  /** Decimal places to display (default: 0) */
  decimals?: number;
  /** Text or symbol prefix (e.g., "₱", "+") */
  prefix?: string;
  /** Text or symbol suffix (e.g., "M", "B", "%", " km²") */
  suffix?: string;
  /** Custom formatter function for specific representation */
  format?: (val: number) => string;
  /** Whether to format numbers with comma grouping, e.g. 121,194 (default: true) */
  useGrouping?: boolean;
  /** Custom CSS classes for the container span */
  className?: string;
  /** Trigger animation only when scrolled into the viewport (default: true) */
  animateOnView?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  format,
  useGrouping = true,
  className = '',
  animateOnView = true,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(!animateOnView);

  useEffect(() => {
    if (!animateOnView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [animateOnView]);

  const animatedValue = useCountUp(value, duration, decimals, isVisible);

  let formattedValue: string;

  if (format) {
    formattedValue = format(animatedValue);
  } else if (useGrouping) {
    if (decimals > 0) {
      formattedValue = animatedValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else {
      formattedValue = animatedValue.toLocaleString();
    }
  } else {
    formattedValue =
      decimals > 0 ? animatedValue.toFixed(decimals) : animatedValue.toString();
  }

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
