import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getExamples } from '@/lib/content/examples';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import ExampleCard from '@/components/ExampleCard';
import FallbackNotice from '@/components/FallbackNotice';

export default async function ExamplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'examples' });
  const examples = await getExamples(locale);

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

      <FallbackNotice show={examples.isFallback} />

      <div
        lang={examples.isFallback ? 'en' : undefined}
        style={{ paddingBottom: '48px' }}
      >
        {examples.intro && (
          <div style={{ marginBottom: '24px' }}>
            <Prose html={examples.intro} />
          </div>
        )}

        {/* Template table (includes the two Ranking rows) */}
        {examples.template.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
              }}
            >
              {t('tableHeading')}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                }}
              >
                <thead>
                  <tr>
                    {['Col', 'Template', 'Example'].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        style={{
                          padding: '10px 12px',
                          background: 'var(--color-bg-surface)',
                          color: 'var(--color-text-secondary)',
                          fontWeight: 700,
                          textAlign: 'left',
                          borderBottom: '1px solid var(--color-border-default)',
                          minWidth: h === 'Col' ? '80px' : '200px',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {examples.template.map((row, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid var(--color-border-default)' }}
                    >
                      <Prose
                        as="td"
                        plain
                        style={{ padding: '10px 12px', verticalAlign: 'top', whiteSpace: 'pre-line' }}
                        html={row.col}
                      />
                      <Prose
                        as="td"
                        plain
                        style={{ padding: '10px 12px', verticalAlign: 'top', whiteSpace: 'pre-line', color: 'var(--color-text-secondary)' }}
                        html={row.template}
                      />
                      <Prose
                        as="td"
                        plain
                        style={{ padding: '10px 12px', verticalAlign: 'top', whiteSpace: 'pre-line', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}
                        html={row.example}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section note */}
        {examples.note && (
          <Prose
            as="div"
            plain
            style={{
              marginBottom: '32px',
              padding: '12px 16px',
              background: 'var(--color-bg-callout-info)',
              borderLeft: '3px solid var(--color-amber-600)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
            }}
            html={examples.note}
          />
        )}

        {/* Rated example cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {examples.examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      </div>
    </>
  );
}
