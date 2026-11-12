interface PlaceholderBadgeProps {
  note?: string;
}

export default function PlaceholderBadge({ note }: PlaceholderBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid var(--color-border-placeholder)',
        color: 'var(--color-amber-400)',
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.4,
        verticalAlign: 'middle',
        marginLeft: '6px',
      }}
      title={note}
      aria-label="This is a placeholder — content will be added by the team"
    >
      Placeholder
    </span>
  );
}
