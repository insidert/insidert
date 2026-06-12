import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ReactNode, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  type = 'button',
  onClick,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const style = prefersReducedMotion
    ? undefined
    : { x: springX, y: springY };

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        style={style}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={className}
      style={style}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
