import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getInstructionSection, SECTION_IDS } from '@/lib/content/instructions';
import { getCommonErrors } from '@/lib/content/common-errors';
import { getPageMd } from '@/lib/content/page-md';
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
  const replacement = getPageMd(locale, 'replacement-account.md');
  const taskTypes = getPageMd(locale, 'task-types.md');

  // Model/mode (#7) slides: redo slides whose error numbers include 7
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

      <div lang={isFallback ? 'en' : undefined} style={{ paddingBottom: '48px' }}>
        {/* Accounts & subscriptions section from the Instructions */}
        <div className="doc-card">
          <Prose html={accountsSection.html} />
        </div>

        {/* Two task types: comparison vs single-model (AI Mode) */}
        {taskTypes && (
          <section
            style={{
              marginTop: '24px',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderLeft: '4px solid var(--color-amber-500)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <Prose html={taskTypes} />
          </section>
        )}

        {/* Replacement demo account (new feature) */}
        {replacement && (
          <section
            style={{
              marginTop: '24px',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderLeft: '4px solid var(--color-amber-500)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <Prose html={replacement} />
          </section>
        )}

        {/* Model / mode setup (#7) from the common-errors deck */}
        {modelSlides.length > 0 && (
          <section style={{ marginTop: '32px' }}>
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
              <section key={slide.id} id={slide.id} className="doc-card">
                <Prose html={slide.html} />
              </section>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
