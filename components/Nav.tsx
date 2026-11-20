'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import type { SearchEntry } from '@/lib/search-index';

export interface NavLink {
  label: string;
  href: `/${string}`;
}
export interface NavGroup {
  id: string;
  label: string;
  items: NavLink[];
}
interface SearchStrings {
  triggerLabel: string;
  placeholder: string;
  hint: string;
  noResults: string;
}

interface NavProps {
  brand: { label: string; href: '/' };
  homeLabel: string;
  groups: NavGroup[];
  community: { label: string; href: string } | null;
  locales: readonly { code: string; label: string }[];
  currentLocale: string;
  languageSwitcherLabel: string;
  searchEntries: SearchEntry[];
  searchStrings: SearchStrings;
}

export default function Nav({
  brand,
  homeLabel,
  groups,
  community,
  locales,
  currentLocale,
  languageSwitcherLabel,
  searchEntries,
  searchStrings,
}: NavProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const isLinkActive = (href: string) => {
    const base = href.split('#')[0];
    return base === '/' ? pathname === '/' : pathname.startsWith(base);
  };
  const isGroupActive = (g: NavGroup) => g.items.some((it) => isLinkActive(it.href));

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t?.closest('[data-nav-group]')) setOpenGroup(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpenGroup(null); setDrawerOpen(false); }
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDocClick); document.removeEventListener('keydown', onKey); };
  }, []);

  // Close everything when the route changes.
  useEffect(() => { setOpenGroup(null); setDrawerOpen(false); }, [pathname]);

  const linkStyle = (active: boolean): React.CSSProperties => ({
    color: active ? 'var(--color-amber-400)' : 'var(--color-text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: active ? 600 : 400,
    whiteSpace: 'nowrap',
  });

  const groupBtnStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: active ? 'var(--color-amber-400)' : 'var(--color-text-secondary)',
    fontSize: '0.9375rem', fontWeight: active ? 600 : 400, padding: '4px 2px', whiteSpace: 'nowrap',
  });

  const dropdownPanel: React.CSSProperties = {
    position: 'absolute', top: 'calc(100% + 10px)', left: 0, minWidth: '220px',
    background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '6px', zIndex: 60,
    display: 'flex', flexDirection: 'column', gap: '2px',
  };
  const dropdownItemStyle = (active: boolean): React.CSSProperties => ({
    display: 'block', padding: '8px 12px', borderRadius: 'var(--radius-sm)', textDecoration: 'none',
    fontSize: '0.9rem', color: active ? 'var(--color-amber-400)' : 'var(--color-text-secondary)',
    fontWeight: active ? 600 : 400, background: active ? 'var(--color-bg-icon-tile)' : 'transparent',
  });

  const externalLink = (label: string, href: string, inDrawer = false) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={inDrawer ? () => setDrawerOpen(false) : undefined}
      style={{ ...linkStyle(false), ...(inDrawer ? { fontSize: '1rem', padding: '10px 0', display: 'block' } : {}) }}
    >
      {label}<span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      style={{
        position: 'sticky', top: 0, zIndex: 50, height: '64px',
        background: 'var(--color-bg-nav)', borderBottom: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-nav)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', padding: '0 var(--spacing-4)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link href="/" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', textDecoration: 'none', flexShrink: 0, letterSpacing: '-0.01em' }}>
          {brand.label}
        </Link>

        {/* Desktop grouped links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1 }}>
          <Link href="/" style={linkStyle(pathname === '/')}>{homeLabel}</Link>
          {groups.map((g) => (
            <div key={g.id} data-nav-group style={{ position: 'relative' }}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openGroup === g.id}
                onClick={() => setOpenGroup((cur) => (cur === g.id ? null : g.id))}
                style={groupBtnStyle(isGroupActive(g) || openGroup === g.id)}
              >
                {g.label}<span aria-hidden="true" style={{ fontSize: '0.7em', opacity: 0.8 }}>▾</span>
              </button>
              {openGroup === g.id && (
                <div role="menu" style={dropdownPanel}>
                  {g.items.map((it) => (
                    <Link key={it.href} href={it.href} role="menuitem" style={dropdownItemStyle(isLinkActive(it.href))}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {community && externalLink(community.label, community.href)}
        </div>

        {/* Right cluster: search + language (desktop) */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
          <div className="nav-search"><SearchBar entries={searchEntries} strings={searchStrings} /></div>
          <div className="nav-lang-desktop"><LanguageSwitcher locales={locales} current={currentLocale} label={languageSwitcherLabel} /></div>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="nav-hamburger"
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1.5rem', padding: '4px' }}
        >
          {drawerOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed', inset: 0, top: '64px', background: 'var(--color-bg-surface)', zIndex: 49,
            padding: '20px var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: '4px',
            borderTop: '1px solid var(--color-border-default)', overflowY: 'auto',
          }}
        >
          <Link href="/" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle(pathname === '/'), fontSize: '1rem', padding: '10px 0' }}>{homeLabel}</Link>
          {groups.map((g) => (
            <div key={g.id} style={{ marginTop: '10px' }}>
              <p style={{ margin: '0 0 2px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>{g.label}</p>
              {g.items.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setDrawerOpen(false)} style={{ ...linkStyle(isLinkActive(it.href)), fontSize: '1rem', padding: '9px 0 9px 10px', display: 'block' }}>
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
          {community && <div style={{ marginTop: '10px' }}>{externalLink(community.label, community.href, true)}</div>}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
            <LanguageSwitcher locales={locales} current={currentLocale} label={languageSwitcherLabel} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-lang-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .search-hint { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
