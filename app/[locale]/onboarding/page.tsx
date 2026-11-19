import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig, type Placeholder } from '@/site.config';
import PageHeader from '@/components/PageHeader';

const cardStyle: React.CSSProperties = {
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
  padding: '20px 24px',
  boxShadow: 'var(--shadow-card)',
  marginBottom: '20px',
};
const cardTitle: React.CSSProperties = {
  margin: '0 0 12px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--color-border-default)',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
};
const linkStyle: React.CSSProperties = { color: 'var(--color-amber-400)', fontWeight: 600 };

interface Recording {
  code: string;
  label: string;
  url: string;
  recordedOn?: string;
}
type VideoMap = Record<string, { url: Placeholder<string>; recordedOn?: string }>;

function pickVideo(map: VideoMap, locale: string) {
  const available: Recording[] = siteConfig.locales.flatMap((l) => {
    const v = map[l.code]?.url;
    return v && v.status === 'ready'
      ? [{ code: l.code, label: l.label, url: v.value, recordedOn: map[l.code]?.recordedOn }]
      : [];
  });
  const own = available.find((a) => a.code === locale);
  const primary = own ?? available[0] ?? null;
  return { primary, isOwn: !!own, others: available.filter((a) => a.code !== primary?.code) };
}

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

  const rec = pickVideo(siteConfig.onboardingVideoByLocale, locale);
  const walk = pickVideo(siteConfig.taskWalkthroughByLocale, locale);

  const renderCard = (pick: ReturnType<typeof pickVideo>, title: string, blurb: string) => {
    if (!pick.primary) {
      return (
        <section style={cardStyle}>
          <h2 style={cardTitle}>{title}</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('videoComingSoonLocale')}</p>
        </section>
      );
    }
    const { primary, isOwn, others } = pick;
    return (
      <section style={cardStyle}>
        <h2 style={cardTitle}>
          {title}{primary.recordedOn ? ` (${primary.recordedOn})` : ''}
        </h2>
        {!isOwn && (
          <p style={{ margin: '0 0 10px', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            🌐 {t('shownInLanguage', { language: primary.label })}
          </p>
        )}
        <p style={{ margin: '0 0 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{blurb}</p>
        <video
          controls
          preload="metadata"
          playsInline
          style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', background: '#000', display: 'block' }}
        >
          <source src={primary.url} type="video/mp4" />
          <a href={primary.url} style={linkStyle}>{t('download')}</a>
        </video>
        {others.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <p style={{ margin: '0 0 6px', color: 'var(--color-text-muted)', fontSize: '0.8125rem', fontWeight: 700 }}>{t('availableNow')}</p>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {others.map((o) => (
                <li key={o.code}>
                  <a href={o.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('watchRecording', { language: o.label })} <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  };

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
        {renderCard(rec, t('recordingTitle'), t('recordingBlurb'))}
        {renderCard(walk, t('walkthroughTitle'), t('walkthroughBlurb'))}

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
