import { motion, useReducedMotion } from 'framer-motion';

type Node = {
  label: string;
  icon: string;
  href: string;
  theme: string;
};

interface Props {
  nodes: readonly Node[];
  words: readonly string[];
}

const POSITIONS = [
  { x: '50%', y: '4%', tx: '-50%', ty: '0' },
  { x: '88%', y: '18%', tx: '-50%', ty: '0' },
  { x: '96%', y: '50%', tx: '-50%', ty: '-50%' },
  { x: '82%', y: '82%', tx: '-50%', ty: '-50%' },
  { x: '50%', y: '94%', tx: '-50%', ty: '-100%' },
  { x: '18%', y: '82%', tx: '-50%', ty: '-50%' },
  { x: '4%', y: '50%', tx: '-50%', ty: '-50%' },
  { x: '12%', y: '18%', tx: '-50%', ty: '0' },
];

function nodeStyle(pos: (typeof POSITIONS)[number], index: number): React.CSSProperties {
  return {
    left: pos.x,
    top: pos.y,
    '--tx': pos.tx,
    '--ty': pos.ty,
    '--node-i': index,
  } as React.CSSProperties;
}

export default function HeroMindMap({ nodes, words }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mind-map">
      <svg className="mind-map__lines" viewBox="0 0 400 400" aria-hidden="true">
        {nodes.map((_, i) => {
          const pos = POSITIONS[i];
          if (!pos) return null;
          const cx = (parseFloat(pos.x) / 100) * 400;
          const cy = (parseFloat(pos.y) / 100) * 400;
          return (
            <line
              key={i}
              x1="200"
              y1="200"
              x2={cx}
              y2={cy}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.2"
            />
          );
        })}
      </svg>

      <div className="mind-map__center">
        <p className="mind-map__brand">Insidert</p>
        <h1 className="mind-map__title">
          Inside <span className="gradient-text">Ravi Teja</span>
        </h1>
        <p className="mind-map__dek">
          Where ideas become products, experiments become businesses,
          and curiosity becomes action.
        </p>
      </div>

      {nodes.map((node, i) => {
        const pos = POSITIONS[i];
        if (!pos) return null;
        const delay = i * 0.08;
        const className = [
          'mind-map__node',
          `mind-map__node--${node.theme}`,
          prefersReducedMotion ? '' : 'mind-map__node--float',
        ]
          .filter(Boolean)
          .join(' ');

        if (prefersReducedMotion) {
          return (
            <a
              key={node.label}
              href={node.href}
              className={className}
              style={nodeStyle(pos, i)}
            >
              <span className="mind-map__node-icon" aria-hidden="true">{node.icon}</span>
              <span className="mind-map__node-label">{node.label}</span>
            </a>
          );
        }

        return (
          <motion.a
            key={node.label}
            href={node.href}
            className={className}
            style={nodeStyle(pos, i)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
          >
            <span className="mind-map__node-icon" aria-hidden="true">{node.icon}</span>
            <span className="mind-map__node-label">{node.label}</span>
          </motion.a>
        );
      })}

      <div className="mind-map__words" aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={word}
            className="mind-map__word"
            style={{ '--word-i': i } as React.CSSProperties}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
