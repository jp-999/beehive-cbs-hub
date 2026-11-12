import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import PageHeader from '@/components/PageHeader';
import Callout from '@/components/Callout';
import LinkOrPlaceholder from '@/components/LinkOrPlaceholder';
import PlaceholderBadge from '@/components/PlaceholderBadge';

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
  const tPlaceholder = await getTranslations({ locale, namespace: 'placeholder' });

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
        {/* QMs */}
        <Callout tone="info" title={t('yourQMs')}>
          {siteConfig.qms.status === 'placeholder' ? (
            <span>
              {tPlaceholder('contactDetails')}
              <PlaceholderBadge note={siteConfig.qms.note} />
            </span>
          ) : (
            <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
              {siteConfig.qms.value.map((qm) => (
                <li key={qm.name}>
                  <strong>{qm.role}:</strong> {qm.name}{' '}
                  <LinkOrPlaceholder link={qm.channel} external>
                    Contact
                  </LinkOrPlaceholder>
                </li>
              ))}
            </ul>
          )}
        </Callout>

        {/* War Room */}
        <Callout tone="info" title={t('warRoom')}>
          <LinkOrPlaceholder link={siteConfig.links.warRoom} external>
            {t('warRoom')}
          </LinkOrPlaceholder>
        </Callout>

        {/* Dashboard */}
        <Callout tone="info" title={t('dashboard')}>
          <LinkOrPlaceholder link={siteConfig.links.dashboard} external>
            {t('dashboard')}
          </LinkOrPlaceholder>
        </Callout>

        {/* Outlier Community */}
        <Callout tone="info" title={t('community')}>
          <LinkOrPlaceholder link={siteConfig.links.outlierCommunity} external>
            {t('community')}
          </LinkOrPlaceholder>
        </Callout>
      </div>
    </>
  );
}
