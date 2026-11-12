import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCommonErrors } from '@/lib/content/common-errors';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import ErrorAccordion from '@/components/ErrorAccordion';
import FallbackNotice from '@/components/FallbackNotice';

const slideHeadingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  margin: '0 0 8px',
};

export default async function CommonErrorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'commonErrors' });
  const errors = await getCommonErrors(locale);

  // Divergence note for slide 13 (tie-breaker order)
  let slide13Note: string | undefined;
  try {
    // Only include if the key exists in messages (check via try)
    slide13Note = t('divergence.slide13' as Parameters<typeof t>[0]);
  } catch {
    slide13Note = undefined;
  }
  const notes = slide13Note ? { 13: slide13Note } : {};

  return (
    <>
      <PageHeader
        title={errors.title}
        lead={t('description')}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbSelf') },
        ]}
      />

      <FallbackNotice show={errors.isFallback} />

      <div
        lang={errors.isFallback ? 'en' : undefined}
        style={{ paddingBottom: '48px' }}
      >
        {/* Source note */}
        {errors.sourceNote && (
          <div
            style={{
              borderLeft: '3px solid var(--color-border-default)',
              paddingLeft: '16px',
              marginBottom: '24px',
              color: 'var(--color-text-muted)',
              fontSize: '0.8125rem',
            }}
          >
            <Prose html={errors.sourceNote} />
          </div>
        )}

        {/* Before slides (audit overview etc.) */}
        {errors.before.map((slide) => (
          <section key={slide.id} id={slide.id} style={{ marginBottom: '24px' }}>
            <h2 style={slideHeadingStyle}>{slide.heading}</h2>
            <Prose html={slide.html} />
          </section>
        ))}

        {/* Redo group */}
        {errors.redo.length > 0 && (
          <ErrorAccordion
            kind="redo"
            heading={t('redoGroup')}
            description={t('redoDescription')}
            slides={errors.redo}
          />
        )}

        {/* Form group */}
        {errors.form.length > 0 && (
          <ErrorAccordion
            kind="form"
            heading={t('formGroup')}
            description={t('formDescription')}
            slides={errors.form}
            notes={notes}
          />
        )}

        {/* After slides (evidence/integrity, pre-submit checklist) */}
        {errors.after.map((slide) => (
          <section key={slide.id} id={slide.id} style={{ marginBottom: '24px' }}>
            <h2 style={slideHeadingStyle}>{slide.heading}</h2>
            <Prose html={slide.html} />
          </section>
        ))}
      </div>
    </>
  );
}
