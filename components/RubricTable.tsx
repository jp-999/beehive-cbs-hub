'use client';

import { useState, useMemo } from 'react';
import type { RubricRow } from '@/lib/content/types';

interface RubricTableProps {
  rows: RubricRow[];
  dimensions: { name: string; slug: string }[];
}

const BAND_STYLES = {
  fail: {
    bg: '#3B0D0D',
    text: '#FCA5A5',
    header: '#7F1D1D',
  },
  nonfail: {
    bg: '#3D2A08',
    text: '#FDE68A',
    header: '#78350F',
  },
  noissues: {
    bg: '#0D2B1A',
    text: '#86EFAC',
    header: '#14532D',
  },
};

function BandCell({ band, style }: {
  band: RubricRow['band1_2'] | null;
  style: (typeof BAND_STYLES)['fail'];
}) {
  if (!band) {
    return (
      <td
        style={{
          background: 'var(--color-bg-surface)',
          color: 'var(--color-text-muted)',
          padding: '12px',
          fontSize: '0.8125rem',
          verticalAlign: 'top',
          whiteSpace: 'pre-line',
        }}
      >
        —<span className="sr-only">Not applicable</span>
      </td>
    );
  }
  return (
    <td
      style={{
        background: style.bg,
        color: style.text,
        padding: '12px',
        fontSize: '0.8125rem',
        verticalAlign: 'top',
        whiteSpace: 'pre-line',
      }}
    >
      {band.label && (
        <span style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>
          {band.label}
        </span>
      )}
      {band.text}
    </td>
  );
}

export default function RubricTable({ rows, dimensions }: RubricTableProps) {
  const [query, setQuery] = useState('');
  const [activeDim, setActiveDim] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return rows.filter((row) => {
      const dimMatch = activeDim === 'all' || row.dimensionSlug === activeDim;
      const textMatch = !q || row.searchText.includes(q);
      return dimMatch && textMatch;
    });
  }, [rows, query, activeDim]);

  const filteredIds = new Set(filtered.map((r) => r.id));
  const shown = filtered.length;
  const total = rows.length;

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}
      >
        <div style={{ flex: '1', minWidth: '200px', maxWidth: '400px' }}>
          <label htmlFor="rubric-search" className="sr-only">
            Search rubric dimensions
          </label>
          <input
            id="rubric-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dimensions…"
            aria-label="Search rubric dimensions"
            style={{
              width: '100%',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              padding: '8px 12px',
              fontSize: '0.875rem',
            }}
          />
        </div>

        {/* Dimension filter chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            aria-pressed={activeDim === 'all'}
            onClick={() => setActiveDim('all')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${activeDim === 'all' ? 'var(--color-amber-500)' : 'var(--color-border-default)'}`,
              background: activeDim === 'all' ? 'rgba(245,158,11,0.12)' : 'transparent',
              color: activeDim === 'all' ? 'var(--color-amber-400)' : 'var(--color-text-muted)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontWeight: activeDim === 'all' ? 600 : 400,
            }}
          >
            All
          </button>
          {dimensions.map((dim) => (
            <button
              key={dim.slug}
              type="button"
              aria-pressed={activeDim === dim.slug}
              onClick={() => setActiveDim(dim.slug)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${activeDim === dim.slug ? 'var(--color-amber-500)' : 'var(--color-border-default)'}`,
                background: activeDim === dim.slug ? 'rgba(245,158,11,0.12)' : 'transparent',
                color: activeDim === dim.slug ? 'var(--color-amber-400)' : 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                fontWeight: activeDim === dim.slug ? 600 : 400,
              }}
            >
              {dim.name}
            </button>
          ))}
        </div>
      </div>

      {/* Band legend */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
        aria-label="Band colour legend"
      >
        {[
          { label: '1–2 — Fail', bg: BAND_STYLES.fail.bg, text: BAND_STYLES.fail.text },
          { label: '3–4 — Non-Fail', bg: BAND_STYLES.nonfail.bg, text: BAND_STYLES.nonfail.text },
          { label: '5 — No Issues', bg: BAND_STYLES.noissues.bg, text: BAND_STYLES.noissues.text },
        ].map((item) => (
          <span
            key={item.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-sm)',
              background: item.bg,
              color: item.text,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Live count */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)',
          marginBottom: '12px',
        }}
      >
        Showing {shown} of {total}
      </div>

      {/* Empty state */}
      {shown === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          No dimensions match your search. Try a different term.
        </p>
      )}

      {/* Table */}
      {shown > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <thead>
              <tr>
                {([
                  { label: 'Dimension', width: '120px', col: 'dimension', header: null as string|null, text: null as string|null },
                  { label: 'Sub-Dimension', width: '160px', col: 'sub', header: null as string|null, text: null as string|null },
                  { label: 'Notes for Auditors', width: '240px', col: 'notes', header: null as string|null, text: null as string|null },
                  { label: '1–2', width: '200px', col: '1-2', header: BAND_STYLES.fail.header, text: BAND_STYLES.fail.text },
                  { label: '3–4', width: '200px', col: '3-4', header: BAND_STYLES.nonfail.header, text: BAND_STYLES.nonfail.text },
                  { label: '5', width: '200px', col: '5', header: BAND_STYLES.noissues.header, text: BAND_STYLES.noissues.text },
                ] as const).map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    style={{
                      background: col.header ?? 'var(--color-bg-surface)',
                      color: col.text ?? 'var(--color-text-primary)',
                      padding: '10px 12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      minWidth: col.width,
                      position: 'sticky',
                      top: '64px',
                      zIndex: 1,
                      borderBottom: '1px solid var(--color-border-default)',
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    display: filteredIds.has(row.id) ? undefined : 'none',
                    borderBottom: '1px solid var(--color-border-default)',
                  }}
                >
                  <td
                    style={{
                      padding: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      verticalAlign: 'top',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {row.dimension}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: 'var(--color-text-secondary)',
                      verticalAlign: 'top',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {row.subDimension}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: 'var(--color-text-secondary)',
                      verticalAlign: 'top',
                      fontSize: '0.8125rem',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {row.notes ?? '—'}
                  </td>
                  <BandCell band={row.band1_2} style={BAND_STYLES.fail} />
                  <BandCell band={row.band3_4} style={BAND_STYLES.nonfail} />
                  <BandCell band={row.band5} style={BAND_STYLES.noissues} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
