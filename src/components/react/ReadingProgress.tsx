import { useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';

const MILESTONES = [0.25, 0.5, 0.75];

export default function ReadingProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [passed, setPassed] = useState([false, false, false]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setPassed(MILESTONES.map((m) => v >= m));
  });

  if (prefersReducedMotion) return null;

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress__track" />
      <motion.div
        className="reading-progress__bar"
        style={{ scaleX, transformOrigin: '0%' }}
      />
      <div className="reading-progress__milestones">
        {MILESTONES.map((pct, i) => (
          <span
            key={pct}
            className={`reading-progress__dot${passed[i] ? ' reading-progress__dot--passed' : ''}`}
            style={{ left: `${pct * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
