import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getRubric } from '@/lib/content/rubric';
import PageHeader from '@/components/PageHeader';
import Prose from '@/components/Prose';
import RubricTable from '@/components/RubricTable';
import FallbackNotice from '@/components/FallbackNotice';

export default async function QcSpecPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'rubric' });
  const rubric = await getRubric(locale);

  return (
    <>
      <PageHeader
        title={rubric.title}
        breadcrumbs={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbMaterials'), href: '/materials' },
          { label: t('breadcrumbSelf') },
        ]}
      />

      <FallbackNotice show={rubric.isFallback} />

      {rubric.intro && (
        <div
          lang={rubric.isFallback ? 'en' : undefined}
          style={{ marginBottom: '24px' }}
        >
          <Prose html={rubric.intro} />
        </div>
      )}

      <div
        lang={rubric.isFallback ? 'en' : undefined}
        style={{ paddingBottom: '48px' }}
      >
        <RubricTable rows={rubric.rows} dimensions={rubric.dimensions} />
      </div>
    </>
  );
}
