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
  marginBottom: '20px',
};
const linkStyle: React.CSSProperties = { color: 'var(--color-amber-400)', fontWeight: 600 };

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'onboarding' });

  const video = siteConfig.onboardingVideoByLocale[locale];
  const hasVideo = video?.status === 'ready';

  // Other languages that already have a recording (offered as a fallback).
  const others = siteConfig.locales
    .filter((l) => l.code !== locale && siteConfig.onboardingVideoByLocale[l.code]?.status === 'ready')
    .map((l) => {
      const v = siteConfig.onboardingVideoByLocale[l.code];
      return { label: l.label, url: v.status === 'ready' ? v.value : '' };
    });

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

      <div style={{ paddingBottom: '48px', maxWidth: '860px' }}>
        {hasVideo && video.status === 'ready' ? (
          <figure style={{ margin: '0 0 28px' }}>
            <video
              controls
              preload="metadata"
              playsInline
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-default)', background: '#000', display: 'block' }}
            >
              <source src={video.value} type="video/mp4" />
              <a href={video.value} style={linkStyle}>{t('download')}</a>
            </video>
            <figcaption style={{ marginTop: '8px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              🎬 {t('webinarLabel')}
            </figcaption>
          </figure>
        ) : (
          <div className="doc-card">
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('videoComingSoonLocale')}</p>
            {others.length > 0 && (
              <>
                <p style={{ margin: '14px 0 6px', color: 'var(--color-text-muted)', fontSize: '0.8125rem', fontWeight: 700 }}>{t('availableNow')}</p>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  {others.map((o) => (
                    <li key={o.url}>
                      <a href={o.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('watchRecording', { language: o.label })} <span aria-hidden="true">↗</span></a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* After the webinar */}
        <section style={cardStyle}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{t('nextStepsTitle')}</h2>
          <p style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('nextStepsBody')}</p>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            <li><Link href="/accounts" style={linkStyle}>{t('stepAccounts')}</Link></li>
            <li><Link href="/materials" style={linkStyle}>{t('stepMaterials')}</Link></li>
            <li><Link href="/common-errors" style={linkStyle}>{t('stepCommonErrors')}</Link></li>
          </ul>
        </section>
      </div>
    </>
  );
}
