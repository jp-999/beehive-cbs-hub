'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/content/types';

interface TocProps {
  items: TocItem[];
  label: string;
}

export default function Toc({ items, label }: TocProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const list = (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id} style={{ paddingLeft: item.depth === 3 ? '16px' : '0' }}>
            <a
              href={`#${item.id}`}
              aria-current={active ? 'location' : undefined}
              style={{
                display: 'block',
                padding: '4px 8px',
                color: active ? 'var(--color-amber-400)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontSize: item.depth === 3 ? '0.8125rem' : '0.875rem',
                borderLeft: `2px solid ${active ? 'var(--color-amber-500)' : 'transparent'}`,
                lineHeight: 1.4,
              }}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar – CSS hides on mobile */}
      <nav
        aria-label={label}
        className="toc-sidebar"
        style={{
          position: 'sticky',
          top: '80px',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
            marginTop: 0,
          }}
        >
          {label}
        </p>
        {list}
      </nav>

      {/* Mobile: <details> disclosure — distinct aria-label avoids duplicate landmarks */}
      <details className="toc-mobile" style={{ marginBottom: '24px' }}>
        <summary
          style={{
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-amber-400)',
            userSelect: 'none',
            padding: '8px 0',
          }}
        >
          {label} ↕
        </summary>
        <nav aria-label={`${label} (compact)`} style={{ paddingTop: '8px' }}>
          {list}
        </nav>
      </details>

      <style>{`
        @media (min-width: 1024px) {
          .toc-mobile { display: none; }
        }
        @media (max-width: 1023px) {
          .toc-sidebar { display: none; }
        }
      `}</style>
    </>
  );
}
