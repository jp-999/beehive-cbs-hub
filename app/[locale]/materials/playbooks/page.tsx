import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPlaybooks } from '@/lib/content/playbooks';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/PageHeader';

export default async function PlaybooksIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'materials' });
  const playbooks = listPlaybooks();

  return (
    <>
      <PageHeader
        title={t('playbooksLink')}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbSelf'), href: '/materials' },
          { label: t('playbooksLink') },
        ]}
      />
      <div style={{ paddingBottom: '48px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {playbooks.map((pb) => (
            <li key={pb.slug}>
              <Link
                href={`/materials/playbooks/${pb.slug}` as `/${string}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-default)',
                  textDecoration: 'none',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {pb.title}
                <span style={{ color: 'var(--color-amber-400)', marginLeft: '12px' }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
