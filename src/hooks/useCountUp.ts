import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that animates a numeric value from 0 (or previous target) to target
 * on mount or when target changes.
 * Uses cubic ease-out for a smooth, natural deceleration effect.
 *
 * @param target The target number to count up to
 * @param duration Duration in milliseconds (default: 900ms)
 * @param decimals Number of decimal places (default: 0)
 * @param enabled Whether the animation is active (default: true)
 * @returns The animated current number
 */
export function useCountUp(
  target: number,
  duration: number = 900,
  decimals: number = 0,
  enabled: boolean = true
): number {
  const [count, setCount] = useState<number>(() => {
    // If not enabled or target is 0, start directly
    return enabled ? 0 : target;
  });

  const prevTargetRef = useRef<number>(0);
  const isFirstMountRef = useRef<boolean>(true);

  useEffect(() => {
    // Check for user preference of reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (!enabled || prefersReducedMotion) {
      setCount(target);
      prevTargetRef.current = target;
      return;
    }

    if (isNaN(target)) {
      setCount(0);
      return;
    }

    // On initial mount, start from 0; on subsequent target changes, start from previous target
    const startValue = isFirstMountRef.current ? 0 : prevTargetRef.current;
    isFirstMountRef.current = false;
    prevTargetRef.current = target;

    // If start and target are equal, set directly
    if (startValue === target) {
      setCount(target);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const diff = target - startValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / Math.max(duration, 1), 1);

      // Cubic ease-out curve: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + diff * easeOut;

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, enabled]);

  if (decimals > 0) {
    return parseFloat(count.toFixed(decimals));
  }

  return Math.round(count);
}
