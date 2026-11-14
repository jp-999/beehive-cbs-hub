import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getCommonErrors } from '@/lib/content/common-errors';
import { renderFull } from '@/lib/content/markdown';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import ErrorAccordion from '@/components/ErrorAccordion';
import FallbackNotice from '@/components/FallbackNotice';
import CommonErrorsQuiz from '@/components/CommonErrorsQuiz';

const slideHeadingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  margin: '0 0 8px',
};

function getQuickRef(locale: string): string {
  const paths =
    locale !== 'en'
      ? [
          path.join(process.cwd(), 'content', 'translations', locale, 'common-errors-quickref.md'),
          path.join(process.cwd(), 'content', 'source', 'common-errors-quickref.md'),
        ]
      : [path.join(process.cwd(), 'content', 'source', 'common-errors-quickref.md')];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return renderFull(fs.readFileSync(p, 'utf8'));
    } catch {
      /* try next candidate */
    }
  }
  return '';
}

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
  const quickRefHtml = getQuickRef(locale);

  // Divergence note for slide 13: the deck lists Country fit as tie-breaker 1,
  // but the Instructions are canonical. Link straight to §11 in the QC spec.
  const slide13Note = (
    <>
      {t('slide13Note')}{' '}
      <Link
        href={`/materials#${t('slide13LinkHash')}` as `/${string}`}
        style={{ color: 'var(--color-amber-400)', fontWeight: 600 }}
      >
        {t('slide13LinkText')}
      </Link>
    </>
  );
  const notes: Partial<Record<number, React.ReactNode>> = { 13: slide13Note };

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

      {/* Quick reference — scan this before the detailed slides */}
      {quickRefHtml && (
        <section aria-labelledby="quickref-heading" style={{ marginBottom: '40px' }}>
          <h2 id="quickref-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 14px' }}>
            {t('quickRefHeading')}
          </h2>
          <div className="doc-card">
            <Prose html={quickRefHtml} />
          </div>
        </section>
      )}

      <div
        lang={errors.isFallback ? 'en' : undefined}
        style={{ paddingBottom: '8px' }}
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
          <section key={slide.id} id={slide.id} className="doc-card">
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
          <section key={slide.id} id={slide.id} className="doc-card">
            <h2 style={slideHeadingStyle}>{slide.heading}</h2>
            <Prose html={slide.html} />
          </section>
        ))}
      </div>

      {/* Self-check quiz */}
      <CommonErrorsQuiz
        heading={t('quiz.heading')}
        intro={t('quiz.intro')}
        scoreLabel={t('quiz.score')}
        resetLabel={t('quiz.reset')}
        correctLabel={t('quiz.correct')}
        wrongLabel={t('quiz.wrong')}
        exampleLabel={t('quiz.seeExample')}
      />
    </>
  );
}
