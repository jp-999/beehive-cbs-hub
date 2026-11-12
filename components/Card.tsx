import type { SectionId, SectionTarget } from '@/lib/sections';
import { Link } from '@/i18n/navigation';
import PlaceholderBadge from './PlaceholderBadge';

interface CardProps {
  id: SectionId;
  title: string;
  description: string;
  icon: string;
  target: SectionTarget;
  placeholderNote?: string;
}

const cardStyle: React.CSSProperties = {
  display: 'block',
  background: 'var(--color-bg-surface)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border-default)',
  padding: '20px',
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: 'var(--shadow-card)',
  transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
  cursor: 'pointer',
};

const iconTileStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-bg-icon-tile)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  flexShrink: 0,
  marginBottom: '12px',
};

function CardContent({
  icon,
  title,
  description,
  isExternal,
  placeholderNote,
}: {
  icon: string;
  title: string;
  description: string;
  isExternal: boolean;
  placeholderNote?: string;
}) {
  return (
    <>
      <div style={iconTileStyle} aria-hidden="true">
        {icon}
      </div>
      <h3
        style={{
          fontSize: '1.0625rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {title}
        {isExternal && <span aria-hidden="true"> ↗</span>}
      </h3>
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          margin: '0',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
      {placeholderNote && (
        <div style={{ marginTop: '8px' }}>
          <PlaceholderBadge note={placeholderNote} />
        </div>
      )}
    </>
  );
}

export default function Card({
  id,
  title,
  description,
  icon,
  target,
  placeholderNote,
}: CardProps) {
  if (target.kind === 'internal') {
    return (
      <Link
        href={target.href}
        style={cardStyle}
        aria-label={title}
      >
        <CardContent
          icon={icon}
          title={title}
          description={description}
          isExternal={false}
          placeholderNote={placeholderNote}
        />
      </Link>
    );
  }

  // External target
  if (target.link.status === 'ready') {
    return (
      <a
        href={target.link.value}
        style={cardStyle}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} (opens in a new tab)`}
      >
        <CardContent
          icon={icon}
          title={title}
          description={description}
          isExternal={true}
          placeholderNote={placeholderNote}
        />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  // External placeholder — render as non-link div
  return (
    <div style={{ ...cardStyle, cursor: 'default' }}>
      <CardContent
        icon={icon}
        title={title}
        description={description}
        isExternal={true}
        placeholderNote={target.link.note}
      />
    </div>
  );
}
