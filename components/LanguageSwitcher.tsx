'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import type { routing } from '@/i18n/routing';

type AppLocale = (typeof routing.locales)[number];

interface LanguageSwitcherProps {
  locales: readonly { code: string; label: string }[];
  current: string;
  label: string;
}

export default function LanguageSwitcher({
  locales,
  current,
  label,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
  }

  const currentLocale = locales.find((l) => l.code === current);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-text-secondary)',
          padding: '4px 10px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}
      >
        🌐 {currentLocale?.code.toUpperCase() ?? current.toUpperCase()}
        <span aria-hidden="true" style={{ fontSize: '0.625rem' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose your language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '140px',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-dropdown)',
            padding: '4px 0',
            zIndex: 100,
          }}
        >
          {locales.map((loc) => (
            <Link
              key={loc.code}
              role="menuitem"
              href={pathname}
              locale={loc.code as AppLocale}
              hrefLang={loc.code}
              lang={loc.code}
              onClick={() => setOpen(false)}
              aria-current={loc.code === current ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                color:
                  loc.code === current
                    ? 'var(--color-amber-400)'
                    : 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: loc.code === current ? 600 : 400,
              }}
            >
              {loc.code === current && (
                <span aria-hidden="true" style={{ color: 'var(--color-amber-500)' }}>
                  ✓
                </span>
              )}
              {loc.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
