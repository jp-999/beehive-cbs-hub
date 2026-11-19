'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * A lightweight top progress bar with a flying bee, shown during client-side
 * page transitions. Starts on an internal link click and clears once the route
 * changes (kept visible for a short minimum so the transition feels smooth).
 */
export default function BeeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const startRef = useRef(0);

  // Start on internal link clicks.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;
      const target = anchor.getAttribute('target');
      if (target && target !== '_self') return;
      const href = anchor.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      startRef.current = Date.now();
      setLoading(true);
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Clear shortly after the route changes (minimum visible time keeps it smooth).
  useEffect(() => {
    if (!loading) return;
    const elapsed = Date.now() - startRef.current;
    const id = setTimeout(() => setLoading(false), Math.max(0, 550 - elapsed));
    return () => clearTimeout(id);
  }, [loading, pathname]);

  // Safety: never stick for more than 4s (e.g. same-page or blocked clicks).
  useEffect(() => {
    if (!loading) return;
    const id = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(id);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="bee-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="bee-loader__bar">
        <span className="bee-loader__bee" aria-hidden="true">🐝</span>
      </div>
    </div>
  );
}
