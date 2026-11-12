import type { ErrorSlide } from '@/lib/content/types';
import Prose from './Prose';

interface ErrorAccordionProps {
  kind: 'redo' | 'form';
  heading: string;
  description: string;
  slides: ErrorSlide[];
  /** React nodes keyed by slide number — rendered verbatim (no HTML injection). */
  notes?: Partial<Record<number, React.ReactNode>>;
}

const kindStyles = {
  redo: { borderColor: '#EF4444', label: 'Redo' },
  form: { borderColor: '#F59E0B', label: 'Form Error' },
};

export default function ErrorAccordion({
  kind,
  heading,
  description,
  slides,
  notes,
}: ErrorAccordionProps) {
  const styles = kindStyles[kind];

  return (
    <section
      aria-labelledby={`${kind}-group-heading`}
      style={{
        borderLeft: `4px solid ${styles.borderColor}`,
        borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
        background: 'var(--color-bg-surface)',
        marginBottom: '32px',
        overflow: 'hidden',
      }}
    >
      {/* Group header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-default)' }}>
        <h2
          id={`${kind}-group-heading`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 4px',
          }}
        >
          {heading}
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          {description}
        </p>
      </div>

      {/* Accordion items */}
      {slides.map((slide) => (
        <details
          key={slide.id}
          id={slide.id}
          style={{ borderBottom: '1px solid var(--color-border-default)' }}
        >
          <summary
            aria-label={`${slide.title} — expand for details`}
            style={{
              cursor: 'pointer',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              flexWrap: 'wrap',
              userSelect: 'none',
              listStyle: 'none',
            }}
          >
            {/* Error number chips */}
            <span style={{ display: 'flex', gap: '6px', flexShrink: 0, flexWrap: 'wrap' }}>
              {slide.errorNumbers.map((n) => (
                <span
                  key={n}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '1px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: kind === 'redo' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                    border: `1px solid ${kind === 'redo' ? '#EF4444' : 'var(--color-amber-500)'}`,
                    color: kind === 'redo' ? '#FCA5A5' : 'var(--color-amber-300)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  #{n}
                </span>
              ))}
            </span>

            {/* Title */}
            <span
              style={{
                flex: 1,
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              {slide.title}
            </span>

            {/* Counts */}
            {slide.counts.length > 0 && (
              <span style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {slide.counts.map((count, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      background: 'var(--color-bg-icon-tile)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {count}
                  </span>
                ))}
              </span>
            )}
          </summary>

          <div style={{ padding: '0 20px 16px' }}>
            <Prose html={slide.html} />
            {notes?.[slide.slide] !== undefined && (
              <div
                role="note"
                style={{
                  marginTop: '12px',
                  padding: '12px 16px',
                  borderLeft: '3px solid var(--color-amber-700)',
                  background: 'var(--color-bg-callout-info)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {notes[slide.slide]}
              </div>
            )}
          </div>
        </details>
      ))}
    </section>
  );
}
