import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { EXAMPLES, getExample } from '@/lib/examples-data';
import PageHeader from '@/components/PageHeader';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    EXAMPLES.map((e) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExample(slug);
  return { title: e ? `${e.title} · Beehive examples` : 'Beehive examples' };
}

export default async function ExampleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const example = getExample(slug);
  if (!example) notFound();

  const t = await getTranslations({ locale, namespace: 'examples' });
  const isPass = example.group === 'pass';

  return (
    <>
      <PageHeader
        title={example.title}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbSelf'), href: '/examples' },
          { label: example.title },
        ]}
      />

      <div style={{ paddingBottom: '48px', maxWidth: '760px' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {example.errorCode && (
            <span style={{ background: '#3B0D0D', color: '#FCA5A5', border: '1px solid #7F1D1D', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>{example.errorCode}</span>
          )}
          {example.result && (
            <span style={{ background: '#0D2B1A', color: '#86EFAC', border: '1px solid #14532D', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>{example.result}</span>
          )}
          <span style={{ background: 'var(--color-bg-icon-tile)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-default)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>{example.locale}</span>
        </div>

        {/* What QC found / why it's an example */}
        <div className="doc-card">
          <h2 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: isPass ? '#86EFAC' : 'var(--color-amber-400)' }}>
            {isPass ? t('whyExample') : t('whatQcFound')}
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>{example.finding}</p>
        </div>

        {/* Stage mapping */}
        <p style={{ margin: '16px 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {t('mapsTo')}: <strong style={{ color: 'var(--color-text-secondary)' }}>{example.stage}</strong> —{' '}
          <Link href="/common-errors" style={{ color: 'var(--color-amber-400)' }}>Common Errors</Link>
        </p>

        <p style={{ marginTop: '28px' }}>
          <Link href="/examples" style={{ color: 'var(--color-amber-400)', fontSize: '0.875rem' }}>{t('back')}</Link>
        </p>
      </div>
    </>
  );
}
