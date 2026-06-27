import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('.prose');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: Heading[] = [];

    elements.forEach((el) => {
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ?? '';
      }
      items.push({
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc__label">On this page</p>
      <ul className="toc__list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc__item toc__item--h${h.level} ${activeId === h.id ? 'toc__item--active' : ''}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
      <style>{`
        .toc {
          position: sticky;
          top: calc(var(--header-height) + 2rem);
          max-height: calc(100vh - var(--header-height) - 4rem);
          overflow-y: auto;
          padding-left: var(--space-4);
          border-left: 1px solid var(--color-border);
        }
        .toc__label {
          font-family: var(--font-accent);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin: 0 0 var(--space-4);
        }
        .toc__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .toc__item a {
          display: block;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          text-decoration: none;
          line-height: var(--leading-snug);
          transition: color var(--duration-normal) var(--ease-out);
          border-left: 2px solid transparent;
          margin-left: calc(-1 * var(--space-4) - 1px);
          padding-left: var(--space-4);
        }
        .toc__item--h3 a {
          padding-left: calc(var(--space-4) + var(--space-3));
        }
        .toc__item a:hover,
        .toc__item--active a {
          color: var(--color-text);
        }
        .toc__item--active a {
          border-left-color: var(--color-accent);
        }
      `}</style>
    </nav>
  );
}
