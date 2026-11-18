import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/site.config';
import { getPageMd } from '@/lib/content/page-md';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';

const cardStyle: React.CSSProperties = {
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
  padding: '20px 24px',
  boxShadow: 'var(--shadow-card)',
  marginBottom: '16px',
};

const linkStyle: React.CSSProperties = { color: 'var(--color-amber-400)', fontWeight: 600 };

export default async function TroubleshootingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'troubleshooting' });
  const body = getPageMd(locale, 'troubleshooting.md');
  const replacement = getPageMd(locale, 'replacement-account.md');
  const { warRoom, dashboard, outlierCommunity, demoAccountClaim } = siteConfig.links;

  return (
    <>
      <PageHeader
        title={t('title')}
        lead={t('description')}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbSelf') },
        ]}
      />

      <div style={{ paddingBottom: '48px', maxWidth: '820px' }}>
        {demoAccountClaim.status === 'ready' && (
          <p style={{ margin: '0 0 24px' }}>
            <a
              href={demoAccountClaim.value}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: 'var(--color-amber-500)', color: '#1A1205',
                fontWeight: 700, fontSize: '0.875rem', padding: '9px 18px',
                borderRadius: 'var(--radius-md)', textDecoration: 'none',
              }}
            >
              {t('demo.cta')} <span aria-hidden="true">↗</span>
            </a>
          </p>
        )}

        {replacement && (
          <section style={{ ...cardStyle, borderLeft: '4px solid var(--color-amber-500)' }}>
            <Prose html={replacement} />
          </section>
        )}

        {body && (
          <article>
            <Prose html={body} />
          </article>
        )}

        {/* Still stuck? — all live channels */}
        <section style={{ ...cardStyle, marginTop: '32px', border: '1px solid var(--color-amber-700)' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{t('helpTitle')}</h2>
          <p style={{ margin: '0 0 14px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('helpBody')}</p>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            {warRoom.status === 'ready' && (
              <li><a href={warRoom.value} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('warRoom')} <span aria-hidden="true">↗</span></a></li>
            )}
            <li><Link href="/contact" style={linkStyle}>{t('contactQMs')}</Link></li>
            {outlierCommunity.status === 'ready' && (
              <li><a href={outlierCommunity.value} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('community')} <span aria-hidden="true">↗</span></a></li>
            )}
            {dashboard.status === 'ready' && (
              <li><a href={dashboard.value} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('dashboard')} <span aria-hidden="true">↗</span></a></li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}
