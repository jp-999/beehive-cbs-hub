import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import PageHeader from '@/components/PageHeader';

const cardStyle: React.CSSProperties = {
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
  padding: '18px 20px',
  boxShadow: 'var(--shadow-card)',
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

  const war = siteConfig.links.warRoom;
  const dash = siteConfig.links.dashboard;
  const oc = siteConfig.links.outlierCommunity;
  const channels = [
    { icon: '🎥', title: t('warRoom'), desc: t('warRoomLink'), href: war.status === 'ready' ? war.value : undefined },
    { icon: '📊', title: t('dashboard'), desc: t('dashboardLink'), href: dash.status === 'ready' ? dash.value : undefined },
    { icon: '🌐', title: t('community'), desc: t('communityLink'), href: oc.status === 'ready' ? oc.value : undefined },
  ];

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

      {/* Channels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        {channels.map((c) => {
          const inner = (
            <>
              <div aria-hidden="true" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{c.icon}</div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {c.title}{c.href ? ' ↗' : ''}
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{c.desc}</p>
            </>
          );
          return c.href ? (
            <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" style={{ ...cardStyle, textDecoration: 'none', display: 'block' }}>
              {inner}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <div key={c.title} style={cardStyle}>{inner}</div>
          );
        })}
      </div>

      {/* QMs */}
      <h2
        style={{
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: 'var(--color-amber-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          margin: '0 0 4px',
        }}
      >
        🙋 {t('yourQMs')}
      </h2>
      <p style={{ margin: '0 0 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('qmsNote')}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          paddingBottom: '48px',
        }}
      >
        {siteConfig.qms.map((qm) => {
          const initials = qm.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
          return (
            <div key={qm.name} style={cardStyle}>
              <div
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-icon-tile)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'var(--color-amber-400)',
                  marginBottom: '10px',
                }}
              >
                {initials}
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{qm.name}</h3>
              {qm.role && <p style={{ margin: '2px 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{qm.role}</p>}
              {qm.languages && <p style={{ margin: '2px 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>🌍 {qm.languages}</p>}
              {qm.hours && <p style={{ margin: '2px 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>🕒 {qm.hours}</p>}
              <p style={{ margin: '10px 0 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                🗣️ OC:{' '}
                <a href={`https://community.outlier.ai/u/${qm.oc}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-amber-400)' }}>
                  @{qm.oc}
                </a>
                {' · '}
                <a href={`https://community.outlier.ai/new-message?username=${qm.oc}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-amber-400)' }}>
                  {t('sendMessage')} ↗
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
