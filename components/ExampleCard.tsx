import type { RatedExample, FieldKey } from '@/lib/content/types';
import Prose from './Prose';

interface ExampleCardProps {
  example: RatedExample;
}

// Field display order from Instructions §3 template
const FIELD_ORDER: { key: FieldKey; label: string }[] = [
  { key: 'conversationLink', label: 'Conversation link' },
  { key: 'overallSatisfaction', label: 'Overall satisfaction' },
  { key: 'issues', label: 'Issues' },
  { key: 'detailOfIssues', label: 'Detail of issues' },
  { key: 'turns', label: 'Turns (issues)' },
  { key: 'rubric', label: 'Rubric' },
  { key: 'rubricJustification', label: 'Justification (rubric)' },
  { key: 'countryFit', label: 'Country fit' },
  { key: 'especiallyGood', label: 'Especially good' },
  { key: 'especiallyBad', label: 'Especially bad' },
];

const SCORE_COLORS: Record<number, string> = {
  5: '#86EFAC',
  4: '#6EE7B7',
  3: '#FDE68A',
  2: '#FCA5A5',
  1: '#F87171',
};

export default function ExampleCard({ example }: ExampleCardProps) {
  const headingId = `example-${example.number}-title`;
  const scoreColor = SCORE_COLORS[example.satisfaction.score] ?? 'var(--color-text-secondary)';

  return (
    <article
      aria-labelledby={headingId}
      style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-default)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
          <h3
            id={headingId}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
              flex: 1,
            }}
          >
            Example {example.number}: {example.title}
          </h3>
          {/* Satisfaction badge — text label + score, not colour-only */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid var(--color-border-default)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: scoreColor,
              whiteSpace: 'nowrap',
            }}
          >
            {example.satisfaction.label} ({example.satisfaction.score}/5)
          </span>
        </div>
      </div>

      {/* Predefined rubric */}
      {example.predefinedRubric.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--color-text-muted)',
              margin: '0 0 6px',
            }}
          >
            Predefined rubric:
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {example.predefinedRubric.map((item, i) => (
              <Prose key={i} as="li" plain html={item} />
            ))}
          </ul>
        </div>
      )}

      {/* Fields */}
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(160px, auto) 1fr',
          gap: '0',
          margin: 0,
          borderTop: '1px solid var(--color-border-default)',
        }}
      >
        {FIELD_ORDER.map(({ key, label }) => {
          const value = example.fields[key];
          return (
            <div
              key={key}
              style={{
                display: 'contents',
              }}
            >
              <dt
                style={{
                  padding: '8px 12px 8px 0',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  borderBottom: '1px solid var(--color-border-default)',
                  verticalAlign: 'top',
                }}
              >
                {label}
              </dt>
              <dd
                style={{
                  padding: '8px 0',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  borderBottom: '1px solid var(--color-border-default)',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.5,
                }}
              >
                {key === 'conversationLink' ? (
                  /* conversationLink is PLAIN TEXT, never a link */
                  <code
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '0.8125rem',
                      wordBreak: 'break-all',
                    }}
                  >
                    {value || '—'}
                  </code>
                ) : (
                  <Prose as="span" plain html={value || '—'} />
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}
