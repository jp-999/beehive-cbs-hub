'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import type { SearchEntry } from '@/lib/search-index';

interface SearchStrings {
  triggerLabel: string;
  placeholder: string;
  hint: string;
  noResults: string;
}

export default function SearchBar({
  entries,
  strings,
}: {
  entries: SearchEntry[];
  strings: SearchStrings;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" opens search anywhere; Escape closes it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName ?? '';
      if (!open && e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag)) {
        e.preventDefault();
        setOpen(true);
      } else if (open && e.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(id);
    }
    setQ('');
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const words = term.split(/\s+/);
    return entries
      .map((e) => {
        const hay = `${e.title} ${e.group} ${e.snippet ?? ''}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = e.title.toLowerCase().includes(term) ? 0 : 1;
        return { e, score };
      })
      .filter((x): x is { e: SearchEntry; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 24)
      .map((x) => x.e);
  }, [q, entries]);

  return (
    <>
      <button
        type="button"
        aria-label={strings.triggerLabel}
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--color-bg-icon-tile)', border: '1px solid var(--color-border-default)',
          color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-full)',
          padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap',
        }}
      >
        <span aria-hidden="true">🔍</span>
        <span className="search-hint" style={{ color: 'var(--color-text-muted)' }}>{strings.hint}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={strings.triggerLabel}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9995,
            background: 'rgba(5, 4, 2, 0.6)', backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '12vh 16px 16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '620px', background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '70vh',
            }}
          >
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={strings.placeholder}
              aria-label={strings.placeholder}
              style={{
                border: 'none', borderBottom: '1px solid var(--color-border-default)',
                background: 'transparent', color: 'var(--color-text-primary)',
                padding: '16px 18px', fontSize: '1rem', outline: 'none', width: '100%',
              }}
            />
            <div style={{ overflowY: 'auto', padding: '8px' }}>
              {q.trim() && results.length === 0 && (
                <p style={{ margin: 0, padding: '16px 12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{strings.noResults}</p>
              )}
              {results.map((r, i) => (
                <Link
                  key={`${r.href}-${i}`}
                  href={r.href as `/${string}`}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 12px',
                    borderRadius: 'var(--radius-md)', textDecoration: 'none',
                  }}
                  className="search-result"
                >
                  <span
                    style={{
                      flexShrink: 0, marginTop: '2px', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.04em', color: 'var(--color-amber-400)', border: '1px solid var(--color-amber-700)',
                      borderRadius: 'var(--radius-full)', padding: '1px 8px', whiteSpace: 'nowrap',
                    }}
                  >
                    {r.group}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.92rem' }}>{r.title}</span>
                    {r.snippet && (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.4, marginTop: '2px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {r.snippet}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
