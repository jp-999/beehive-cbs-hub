import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import PageHeader from '@/components/PageHeader';
import Callout from '@/components/Callout';
import LinkOrPlaceholder from '@/components/LinkOrPlaceholder';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '48px' }}>
        {/* QMs — same team, reached via the War Room */}
        <Callout tone="info" title={t('yourQMs')}>
          <p style={{ margin: 0 }}>{t('qmsBody')}</p>
        </Callout>

        {/* War Room */}
        <Callout tone="info" title={t('warRoom')}>
          <LinkOrPlaceholder link={siteConfig.links.warRoom} external>
            {t('warRoomLink')}
          </LinkOrPlaceholder>
        </Callout>

        {/* Dashboard */}
        <Callout tone="info" title={t('dashboard')}>
          <LinkOrPlaceholder link={siteConfig.links.dashboard} external>
            {t('dashboardLink')}
          </LinkOrPlaceholder>
        </Callout>

        {/* Outlier Community */}
        <Callout tone="info" title={t('community')}>
          <LinkOrPlaceholder link={siteConfig.links.outlierCommunity} external>
            {t('communityLink')}
          </LinkOrPlaceholder>
        </Callout>
      </div>
    </>
  );
}
