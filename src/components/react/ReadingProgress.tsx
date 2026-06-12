import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ReadingProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
        zIndex: 110,
      }}
    />
  );
}
