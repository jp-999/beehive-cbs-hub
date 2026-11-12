import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getInstructionSection, SECTION_IDS } from '@/lib/content/instructions';
import { getCommonErrors } from '@/lib/content/common-errors';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import FallbackNotice from '@/components/FallbackNotice';

export default async function AccountsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'accounts' });
  const accountsSection = await getInstructionSection(locale, SECTION_IDS.accounts);
  const errors = await getCommonErrors(locale);

  // Model/mode (#7) slides: redo slides with errorNumbers containing 7
  const modelSlides = errors.redo.filter((s) => s.errorNumbers.includes(7));

  const isFallback = accountsSection.isFallback;

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

      <FallbackNotice show={isFallback} />

      <div
        lang={isFallback ? 'en' : undefined}
        style={{ paddingBottom: '48px' }}
      >
        {/* Accounts section from Instructions */}
        <Prose html={accountsSection.html} />

        {/* Model/mode slides from common errors */}
        {modelSlides.length > 0 && (
          <section style={{ marginTop: '40px' }}>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
              }}
            >
              Model and mode setup
            </h2>
            {modelSlides.map((slide) => (
              <div
                key={slide.id}
                id={slide.id}
                style={{ marginBottom: '24px' }}
              >
                <Prose html={slide.html} />
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
