import { motion, useReducedMotion } from 'framer-motion';

export default function HeroGradient() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="hero-gradient hero-gradient--static" aria-hidden="true" />;
  }

  return (
    <div className="hero-gradient" aria-hidden="true">
      <motion.div
        className="hero-gradient__orb hero-gradient__orb--1"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-gradient__orb hero-gradient__orb--2"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-gradient__orb hero-gradient__orb--3"
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <style>{`
        .hero-gradient {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hero-gradient--static {
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 107, 107, 0.1), transparent 70%);
        }
        .hero-gradient__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(var(--hero-orb-blur, 100px));
          opacity: var(--hero-orb-opacity, 0.2);
        }
        .hero-gradient__orb--1 {
          width: 600px;
          height: 600px;
          top: -200px;
          left: 10%;
          background: #ff6b6b;
        }
        .hero-gradient__orb--2 {
          width: 500px;
          height: 500px;
          top: -100px;
          right: 5%;
          background: #ffb347;
        }
        .hero-gradient__orb--3 {
          width: 400px;
          height: 400px;
          top: 50px;
          left: 40%;
          background: #f472b6;
          opacity: 0.35;
        }
      `}</style>
    </div>
  );
}
