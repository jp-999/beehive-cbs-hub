import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getInstructionSection, SECTION_IDS } from '@/lib/content/instructions';
import { siteConfig } from '@/site.config';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import PlaceholderBadge from '@/components/PlaceholderBadge';
import FallbackNotice from '@/components/FallbackNotice';

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
  const taskRowSection = await getInstructionSection(locale, SECTION_IDS.taskRow);

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

      {/* Video placeholder slots */}
      <section
        aria-label="Onboarding videos"
        style={{ marginBottom: '40px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {siteConfig.onboardingVideos.map((video) => {
            const title =
              video.title.status === 'ready' ? video.title.value : (video.title.preview ?? video.id);
            return (
              <div
                key={video.id}
                aria-label={`Onboarding video — coming soon`}
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9
                  background: 'var(--color-bg-surface)',
                  border: '2px dashed var(--color-amber-700)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>▶</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{title}</span>
                  <span style={{ fontSize: '0.8125rem' }}>
                    {video.url.status === 'placeholder' ? t('videoComingSoon') : ''}
                    {video.url.status === 'placeholder' && (
                      <PlaceholderBadge note={video.url.note} />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FallbackNotice show={taskRowSection.isFallback} />

      {/* Task row section from Instructions */}
      <div
        lang={taskRowSection.isFallback ? 'en' : undefined}
        style={{ paddingBottom: '48px' }}
      >
        <Prose html={taskRowSection.html} />
      </div>
    </>
  );
}
