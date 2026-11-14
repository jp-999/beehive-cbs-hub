import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { EXAMPLES, getExample } from '@/lib/examples-data';
import { renderFull } from '@/lib/content/markdown';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';

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

function getRichDoc(slug: string): string | null {
  try {
    const p = path.join(process.cwd(), 'content', 'examples', `${slug}.md`);
    if (!fs.existsSync(p)) return null;
    return renderFull(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function badge(tone: 'red' | 'green' | 'muted'): React.CSSProperties {
  const tones = {
    red: { background: '#3B0D0D', color: '#FCA5A5', border: '1px solid #7F1D1D' },
    green: { background: '#0D2B1A', color: '#86EFAC', border: '1px solid #14532D' },
    muted: { background: 'var(--color-bg-icon-tile)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-default)' },
  } as const;
  return { ...tones[tone], padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 };
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
  const rich = example.detail ? getRichDoc(slug) : null;
  const isPass = example.group !== 'fail';

  // Rich walkthrough (full task anatomy) when a task file exists
  if (rich) {
    return (
      <>
        <nav
          aria-label="Breadcrumb"
          style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', gap: '6px', alignItems: 'center', padding: '24px 0 4px' }}
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>{t('breadcrumbHome')}</Link>
          <span aria-hidden="true">›</span>
          <Link href="/examples" style={{ color: 'inherit', textDecoration: 'none' }}>{t('breadcrumbSelf')}</Link>
        </nav>
        <article style={{ maxWidth: '840px', paddingBottom: '48px' }}>
          <Prose html={rich} />
          <p style={{ marginTop: '32px' }}>
            <Link href="/examples" style={{ color: 'var(--color-amber-400)', fontSize: '0.875rem' }}>{t('back')}</Link>
          </p>
        </article>
      </>
    );
  }

  // Self-contained finding page (not a redirect to Common Errors)
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
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {example.errorCode && <span style={badge('red')}>{example.errorCode}</span>}
          {example.result && <span style={badge('green')}>{example.result}</span>}
          <span style={badge('muted')}>{example.locale}</span>
        </div>

        <div className="doc-card">
          <h2 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: isPass ? '#86EFAC' : 'var(--color-amber-400)' }}>
            {isPass ? t('whyExample') : t('whatQcFound')}
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>{example.finding}</p>
        </div>

        <p style={{ margin: '16px 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {t('mapsTo')}: <strong style={{ color: 'var(--color-text-secondary)' }}>{example.stage}</strong>{' · '}
          <Link href="/common-errors" style={{ color: 'var(--color-amber-400)' }}>Common Errors</Link>
        </p>

        <p style={{ marginTop: '28px' }}>
          <Link href="/examples" style={{ color: 'var(--color-amber-400)', fontSize: '0.875rem' }}>{t('back')}</Link>
        </p>
      </div>
    </>
  );
}
