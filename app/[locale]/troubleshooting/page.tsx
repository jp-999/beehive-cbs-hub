import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/site.config';
import PageHeader from '@/components/PageHeader';

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
  const { warRoom, dashboard, outlierCommunity, demoAccountClaim } = siteConfig.links;

  const topics = [
    {
      icon: '🧪',
      title: t('demo.title'),
      body: t('demo.body'),
      cta: demoAccountClaim.status === 'ready' ? { href: demoAccountClaim.value, label: t('demo.cta') } : undefined,
    },
    { icon: '💳', title: t('payment.title'), body: t('payment.body') },
    { icon: '🎓', title: t('courses.title'), body: t('courses.body') },
  ];

  const detailsSoon = (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', marginTop: '14px',
        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
        color: 'var(--color-amber-400)', border: '1px solid var(--color-amber-700)',
        borderRadius: 'var(--radius-full)', padding: '2px 10px',
      }}
    >
      {t('detailsSoon')}
    </span>
  );

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
        <div
          style={{
            borderLeft: '3px solid var(--color-amber-700)',
            background: 'var(--color-bg-callout-info)',
            padding: '12px 16px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            marginBottom: '28px',
          }}
        >
          {t('comingSoonNote')}
        </div>

        {topics.map((topic) => (
          <section key={topic.title} style={cardStyle}>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              <span aria-hidden="true" style={{ marginRight: '8px' }}>{topic.icon}</span>
              {topic.title}
            </h2>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{topic.body}</p>
            {topic.cta && (
              <p style={{ margin: '14px 0 0' }}>
                <a
                  href={topic.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', background: 'var(--color-amber-500)', color: '#1A1205',
                    fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px',
                    borderRadius: 'var(--radius-md)', textDecoration: 'none',
                  }}
                >
                  {topic.cta.label} <span aria-hidden="true">↗</span>
                </a>
              </p>
            )}
            <div>{detailsSoon}</div>
          </section>
        ))}

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
