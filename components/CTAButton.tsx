import { Link } from '@/i18n/navigation';

interface CTAButtonProps {
  label: string;
  href: `/${string}`;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

export default function CTAButton({
  label,
  href,
  variant = 'primary',
  external = false,
}: CTAButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    padding: '0 16px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.9375rem',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap',
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'var(--color-amber-500)',
    color: 'var(--color-text-inverted)',
    border: '1.5px solid var(--color-amber-500)',
  };

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: 'var(--color-amber-400)',
    border: '1.5px solid var(--color-amber-500)',
  };

  const style = variant === 'primary' ? primaryStyle : outlineStyle;

  if (external) {
    return (
      <a
        href={href}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} ↗<span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} style={style}>
      {label}
    </Link>
  );
}
