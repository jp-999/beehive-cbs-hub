'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import type { SectionId, SectionTarget } from '@/lib/sections';

interface NavItem {
  id: SectionId | 'home';
  label: string;
  target: SectionTarget;
}

interface NavProps {
  items: NavItem[];
  brand: { label: string; href: '/' };
  locales: readonly { code: string; label: string }[];
  currentLocale: string;
  languageSwitcherLabel: string;
}

export default function Nav({
  items,
  brand,
  locales,
  currentLocale,
  languageSwitcherLabel,
}: NavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap for the mobile drawer (WCAG 2.1.2 No Keyboard Trap / focus management)
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    // Move focus into the drawer
    getFocusable()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  function isActive(target: SectionTarget): boolean {
    if (target.kind === 'internal') {
      if (target.href === '/') return pathname === '/';
      return pathname.startsWith(target.href);
    }
    return false;
  }

  const linkStyle = (active: boolean): React.CSSProperties => ({
    color: active ? 'var(--color-amber-400)' : 'var(--color-text-secondary)',
    textDecoration: active ? 'underline' : 'none',
    textUnderlineOffset: '3px',
    fontSize: '0.9375rem',
    fontWeight: active ? 600 : 400,
    padding: '4px 2px',
    whiteSpace: 'nowrap',
  });

  const placeholderBadgeStyle: React.CSSProperties = {
    marginLeft: '6px',
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: 'var(--color-amber-400)',
    border: '1px solid var(--color-amber-700)',
    borderRadius: 'var(--radius-full)',
    padding: '0 6px',
  };

  function renderNavLink(item: NavItem, inDrawer = false) {
    const active =
      item.id === 'home'
        ? pathname === '/'
        : item.target.kind === 'internal' && isActive(item.target);

    if (item.target.kind === 'internal') {
      return (
        <Link
          key={item.id}
          href={item.id === 'home' ? '/' : item.target.href}
          aria-current={active ? 'page' : undefined}
          onClick={inDrawer ? () => setDrawerOpen(false) : undefined}
          style={{
            ...linkStyle(active),
            ...(inDrawer ? { fontSize: '1rem', padding: '10px 0', display: 'block' } : {}),
          }}
        >
          {item.label}
        </Link>
      );
    }

    // External (Outlier Community) — ready
    if (item.target.link.status === 'ready') {
      return (
        <a
          key={item.id}
          href={item.target.link.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...linkStyle(false),
            ...(inDrawer ? { fontSize: '1rem', padding: '10px 0', display: 'block' } : {}),
          }}
          onClick={inDrawer ? () => setDrawerOpen(false) : undefined}
        >
          {item.label}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }

    // External placeholder — not yet a link; show a visible "soon" affordance
    return (
      <span
        key={item.id}
        style={{
          ...linkStyle(false),
          cursor: 'default',
          opacity: 0.8,
          display: 'inline-flex',
          alignItems: 'center',
          ...(inDrawer ? { fontSize: '1rem', padding: '10px 0' } : {}),
        }}
        title={item.target.link.note}
      >
        {item.label}
        <span aria-hidden="true"> ↗</span>
        <span style={placeholderBadgeStyle} aria-hidden="true">
          soon
        </span>
        <span className="sr-only"> (link coming soon)</span>
      </span>
    );
  }

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '64px',
        background: 'var(--color-bg-nav)',
        borderBottom: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-nav)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-4)',
      }}
    >
      {/* Inner constraint */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            flexShrink: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {brand.label}
        </Link>

        {/* Desktop links */}
        <div
          className="nav-links-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1,
          }}
        >
          {items.map((item) => renderNavLink(item))}
        </div>

        {/* Language switcher (desktop) */}
        <div className="nav-lang-desktop" style={{ marginLeft: 'auto' }}>
          <LanguageSwitcher
            locales={locales}
            current={currentLocale}
            label={languageSwitcherLabel}
          />
        </div>

        {/* Hamburger (mobile) */}
        <button
          ref={hamburgerRef}
          type="button"
          className="nav-hamburger"
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            padding: '4px',
            marginLeft: 'auto',
          }}
        >
          {drawerOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          ref={drawerRef}
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            background: 'var(--color-bg-surface)',
            zIndex: 49,
            padding: '24px var(--spacing-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderTop: '1px solid var(--color-border-default)',
          }}
        >
          {items.map((item) => renderNavLink(item, true))}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border-default)',
            }}
          >
            <LanguageSwitcher
              locales={locales}
              current={currentLocale}
              label={languageSwitcherLabel}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
          .nav-lang-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
