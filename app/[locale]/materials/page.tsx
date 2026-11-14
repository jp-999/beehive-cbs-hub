import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getInstructions } from '@/lib/content/instructions';
import PageHeader from '@/components/PageHeader';
import Toc from '@/components/Toc';
import Prose from '@/components/Prose';
import FallbackNotice from '@/components/FallbackNotice';
import type { TocItem } from '@/lib/content/types';

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'materials' });
  const instructions = await getInstructions(locale);

  // Build full toc: interleave each section's H3s under their parent H2
  const toc: TocItem[] = instructions.sections.flatMap((s) => [
    { id: s.id, text: s.title, depth: 2 as const },
    ...s.toc,
  ]);

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

      {/* Sub-section card links */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <Link
          href="/materials/qc-spec"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            color: 'var(--color-amber-400)',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          📊 {t('rubricLink')}
        </Link>
        <Link
          href="/materials/memory-guide"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            color: 'var(--color-amber-400)',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          🧠 {t('memoryGuideLink')}
        </Link>
      </div>

      <FallbackNotice show={instructions.isFallback} />

      {/* Two-panel layout */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          paddingBottom: '48px',
        }}
      >
        {/* Sidebar Toc */}
        <div
          className="materials-toc"
          style={{ width: '240px', flexShrink: 0 }}
        >
          <Toc items={toc} label={t('tocLabel')} />
        </div>

        {/* Content */}
        <div
          lang={instructions.isFallback ? 'en' : undefined}
          style={{ flex: 1, minWidth: 0 }}
        >
          {instructions.lead && (
            <div className="doc-card">
              <Prose html={instructions.lead} />
            </div>
          )}
          {instructions.sections.map((section) => (
            <section key={section.id} id={section.id} className="doc-card">
              <Prose html={section.html} />
            </section>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .materials-toc { display: none; }
        }
      `}</style>
    </>
  );
}
