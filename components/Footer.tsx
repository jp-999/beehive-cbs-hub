import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer
      style={{
        background: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border-default)',
        padding: '24px var(--spacing-4)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {t('brand')}
          </span>
          <span
            style={{
              marginLeft: '16px',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {t('copyright')}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>{t('languageHint')}</span>
          <Link
            href="/contact"
            style={{
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
            }}
          >
            {t('contactLink')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
