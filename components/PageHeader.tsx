import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <header
      style={{
        paddingTop: 'var(--spacing-10)',
        paddingBottom: 'var(--spacing-8)',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px var(--spacing-4) 32px',
      }}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: '12px',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i > 0 && <span aria-hidden="true">›</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href as `/${string}`}
                  style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-amber-500)',
            marginBottom: '8px',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: 'var(--color-text-primary)',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h1>
      {lead && (
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            margin: '0',
            maxWidth: '680px',
          }}
        >
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}
