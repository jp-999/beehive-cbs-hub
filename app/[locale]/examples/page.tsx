import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { EXAMPLES, type ExampleItem } from '@/lib/examples-data';
import PageHeader from '@/components/PageHeader';

const cardStyle: React.CSSProperties = {
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
  padding: '18px 20px',
  boxShadow: 'var(--shadow-card)',
  textDecoration: 'none',
  display: 'block',
};

function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'muted' | 'green' | 'red' }) {
  const tones: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(245,158,11,0.14)', color: 'var(--color-amber-300)', border: '1px solid var(--color-amber-700)' },
    muted: { background: 'var(--color-bg-icon-tile)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-default)' },
    green: { background: '#0D2B1A', color: '#86EFAC', border: '1px solid #14532D' },
    red: { background: '#3B0D0D', color: '#FCA5A5', border: '1px solid #7F1D1D' },
  };
  return (
    <span style={{ ...tones[tone], display: 'inline-block', padding: '1px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function ExampleCardLink({ e, mapsTo }: { e: ExampleItem; mapsTo: string }) {
  return (
    <Link href={`/examples/${e.slug}` as `/${string}`} style={cardStyle}>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {e.errorCode && <Badge tone="red">{e.errorCode}</Badge>}
        {e.result && <Badge tone="green">{e.result}</Badge>}
        <Badge tone="muted">{e.locale}</Badge>
      </div>
      <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{e.title}</h3>
      <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{e.finding}</p>
      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{mapsTo}: {e.stage}</p>
    </Link>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
  marginBottom: '36px',
};

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
  const mapsTo = t('mapsTo');
  const passes = EXAMPLES.filter((e) => e.group === 'pass');
  const fails = EXAMPLES.filter((e) => e.group === 'fail');

  const sectionHeading: React.CSSProperties = { fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 2px' };
  const sectionNote: React.CSSProperties = { margin: '0 0 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' };

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

      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: 0, marginBottom: '28px' }}>
        {t('sourceNote')}
      </p>

      <h2 style={sectionHeading}>{t('cleanPasses')}</h2>
      <p style={sectionNote}>{t('cleanPassesNote')}</p>
      <div style={gridStyle}>
        {passes.map((e) => <ExampleCardLink key={e.slug} e={e} mapsTo={mapsTo} />)}
      </div>

      <h2 style={sectionHeading}>{t('commonFailures')}</h2>
      <p style={sectionNote}>{t('commonFailuresNote')}</p>
      <div style={{ ...gridStyle, paddingBottom: '48px' }}>
        {fails.map((e) => <ExampleCardLink key={e.slug} e={e} mapsTo={mapsTo} />)}
      </div>
    </>
  );
}
