interface CalloutProps {
  tone?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

const toneConfig = {
  info: {
    borderColor: 'var(--color-amber-500)',
    background: 'var(--color-bg-callout-info)',
    icon: 'ℹ️',
  },
  warning: {
    borderColor: 'var(--color-amber-600)',
    background: '#1A1200',
    icon: '⚠️',
  },
  error: {
    borderColor: 'var(--color-red-500)',
    background: '#1A0808',
    icon: '✕',
  },
  success: {
    borderColor: 'var(--color-green-300)',
    background: '#081A0E',
    icon: '✓',
  },
};

export default function Callout({ tone = 'info', title, children }: CalloutProps) {
  const config = toneConfig[tone];

  return (
    <div
      role="note"
      style={{
        borderLeft: `4px solid ${config.borderColor}`,
        background: config.background,
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        gap: '12px',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.125rem', flexShrink: 0, lineHeight: 1.5 }}>
        {config.icon}
      </span>
      <div>
        {title && (
          <p
            style={{
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 4px',
              fontSize: '0.9375rem',
            }}
          >
            {title}
          </p>
        )}
        <div
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
