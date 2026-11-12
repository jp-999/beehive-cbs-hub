import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPlaybooks, getPlaybook } from '@/lib/content/playbooks';
import PageHeader from '@/components/PageHeader';
import Toc from '@/components/Toc';
import Prose from '@/components/Prose';
import FallbackNotice from '@/components/FallbackNotice';
import type { TocItem } from '@/lib/content/types';

export const dynamicParams = false;

export function generateStaticParams() {
  const playbooks = listPlaybooks();
  return routing.locales.flatMap((locale) =>
    playbooks.map((pb) => ({ locale, slug: pb.slug })),
  );
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'materials' });
  let playbook;
  try {
    playbook = await getPlaybook(locale, slug);
  } catch {
    notFound();
  }

  const toc: TocItem[] = playbook.sections.flatMap((s) => [
    { id: s.id, text: s.title, depth: 2 as const },
    ...s.toc,
  ]);

  return (
    <>
      <PageHeader
        title={playbook.title}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbSelf'), href: '/materials' },
          { label: t('playbooksLink'), href: '/materials/playbooks' },
          { label: playbook.title },
        ]}
      />

      <FallbackNotice show={playbook.isFallback} />

      <div
        style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', paddingBottom: '48px' }}
      >
        <div className="playbook-toc" style={{ width: '240px', flexShrink: 0 }}>
          <Toc items={toc} label={t('tocLabel')} />
        </div>
        <div
          lang={playbook.isFallback ? 'en' : undefined}
          style={{ flex: 1, minWidth: 0 }}
        >
          {playbook.lead && <Prose html={playbook.lead} />}
          {playbook.sections.map((s) => (
            <Prose key={s.id} html={s.html} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .playbook-toc { display: none; } }
      `}</style>
    </>
  );
}
