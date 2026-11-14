import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { renderFull } from '@/lib/content/markdown';
import Prose from '@/components/Prose';

export const metadata: Metadata = { title: 'Turn off memory · Beehive materials' };

function getGuide(locale: string): string {
  const paths =
    locale !== 'en'
      ? [
          path.join(process.cwd(), 'content', 'translations', locale, 'memory-guide.md'),
          path.join(process.cwd(), 'content', 'source', 'memory-guide.md'),
        ]
      : [path.join(process.cwd(), 'content', 'source', 'memory-guide.md')];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return renderFull(fs.readFileSync(p, 'utf8'));
    } catch {
      /* try next candidate */
    }
  }
  return '';
}

export default async function MemoryGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'materials' });
  const html = getGuide(locale);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', gap: '6px', alignItems: 'center', padding: '24px 0 4px' }}
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>{t('breadcrumbHome')}</Link>
        <span aria-hidden="true">›</span>
        <Link href="/materials" style={{ color: 'inherit', textDecoration: 'none' }}>{t('breadcrumbSelf')}</Link>
        <span aria-hidden="true">›</span>
        <span>{t('memoryGuideBreadcrumb')}</span>
      </nav>
      <article style={{ maxWidth: '760px', paddingBottom: '48px' }}>
        <Prose html={html} />
        <p style={{ marginTop: '32px' }}>
          <Link href="/materials" style={{ color: 'var(--color-amber-400)', fontSize: '0.875rem' }}>← {t('breadcrumbSelf')}</Link>
        </p>
      </article>
    </>
  );
}
