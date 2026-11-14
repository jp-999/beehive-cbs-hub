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

function getRichDoc(slug: string, locale: string): string | null {
  const paths =
    locale !== 'en'
      ? [
          path.join(process.cwd(), 'content', 'translations', locale, 'examples', `${slug}.md`),
          path.join(process.cwd(), 'content', 'examples', `${slug}.md`),
        ]
      : [path.join(process.cwd(), 'content', 'examples', `${slug}.md`)];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return renderFull(fs.readFileSync(p, 'utf8'));
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

function badge(tone: 'red' | 'green' | 'muted'): React.CSSProperties {
  const tones = {
    red: { background: '#3B0D0D', color: '#FCA5A5', border: '1px solid #7F1D1D' },
    green: { background: '#0D2B1A', color: '#86EFAC', border: '1px solid #14532D' },
    muted: { background: 'var(--color-bg-icon-tile)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-default)' },
  } as const;
  return { ...tones[tone], padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' };
}

const sectionLabel: React.CSSProperties = {
  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--color-amber-400)', margin: '0 0 8px',
};
const bodyText: React.CSSProperties = { color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 };

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
  const rich = example.detail ? getRichDoc(slug, locale) : null;
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

  // Detailed, self-contained walkthrough
  const labels = isPass
    ? { finding: t('whyExample'), why: t('whatItDoesRight'), fix: t('howToReplicate') }
    : { finding: t('whatQcFound'), why: t('whyItMatters'), fix: t('howToGetRight') };
  const accent = isPass ? '#86EFAC' : 'var(--color-amber-400)';

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
      <article style={{ paddingBottom: '48px', maxWidth: '760px' }}>
        {/* Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {example.errorCode && <span style={badge('red')}>{example.errorCode}</span>}
          {example.result && <span style={badge('green')}>{example.result}</span>}
          <span style={badge('muted')}>{example.locale}</span>
          <span style={badge('muted')}>{example.stage}</span>
        </div>

        {/* What happened */}
        {example.scenario && (
          <section style={{ marginBottom: '26px' }}>
            <h2 style={sectionLabel}>{t('whatHappened')}</h2>
            <p style={bodyText}>{example.scenario}</p>
          </section>
        )}

        {/* What QC found / Why it's an example — emphasised */}
        <section className="doc-card" style={{ marginBottom: '26px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: accent }}>{labels.finding}</h2>
          <p style={bodyText}>{example.finding}</p>
        </section>

        {/* Why it matters / What it does right */}
        {example.why && (
          <section style={{ marginBottom: '26px' }}>
            <h2 style={sectionLabel}>{labels.why}</h2>
            <p style={bodyText}>{example.why}</p>
          </section>
        )}

        {/* How to get it right / How to replicate */}
        {example.fix && (
          <section style={{ marginBottom: '26px' }}>
            <h2 style={sectionLabel}>{labels.fix}</h2>
            <p style={bodyText}>{example.fix}</p>
          </section>
        )}

        {/* The rule */}
        {example.rule && (
          <div
            role="note"
            style={{
              borderLeft: '3px solid var(--color-amber-700)',
              background: 'var(--color-bg-callout-info)',
              padding: '14px 18px',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            <span style={{ display: 'block', marginBottom: '4px', fontWeight: 700, color: accent, textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
              {t('theRule')}
            </span>
            {example.rule}
          </div>
        )}

        <p style={{ marginTop: '32px' }}>
          <Link href="/examples" style={{ color: 'var(--color-amber-400)', fontSize: '0.875rem' }}>{t('back')}</Link>
        </p>
      </article>
    </>
  );
}
