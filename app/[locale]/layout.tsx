import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import { buildSearchIndex } from '@/lib/search-index';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BeeLoader from '@/components/BeeLoader';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);

  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tSkip = await getTranslations({ locale, namespace: 'skipLink' });
  const tLang = await getTranslations({ locale, namespace: 'languageSwitcher' });

  // Grouped nav + search
  const groups = [
    {
      id: 'start',
      label: tNav('groupStart'),
      items: [
        { label: tNav('onboarding'), href: '/onboarding' as const },
        { label: tNav('accounts'), href: '/accounts' as const },
      ],
    },
    {
      id: 'guidelines',
      label: tNav('groupGuidelines'),
      items: [
        { label: tNav('materials'), href: '/materials' as const },
        { label: tNav('qcSpec'), href: '/materials/qc-spec' as const },
        { label: tNav('commonErrors'), href: '/common-errors' as const },
        { label: tNav('examples'), href: '/examples' as const },
        { label: tNav('memoryGuide'), href: '/materials/memory-guide' as const },
      ],
    },
    {
      id: 'help',
      label: tNav('groupHelp'),
      items: [
        { label: tNav('troubleshooting'), href: '/troubleshooting' as const },
        { label: tNav('contact'), href: '/contact' as const },
      ],
    },
  ];

  const oc = siteConfig.links.outlierCommunity;
  const community = oc.status === 'ready' ? { label: tNav('outlierCommunity'), href: oc.value } : null;

  const searchEntries = buildSearchIndex();
  const searchStrings = {
    triggerLabel: tNav('searchLabel'),
    placeholder: tNav('searchPlaceholder'),
    hint: tNav('searchHint'),
    noResults: tNav('searchNoResults'),
  };

  const currentLocaleName =
    siteConfig.locales.find((l) => l.code === locale)?.label ?? locale;

  const languageSwitcherLabel = tLang('label', { locale: currentLocaleName });

  return (
    <html lang={locale}>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-base)',
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <BeeLoader />
          <a href="#main" className="skip-link">
            {tSkip('label')}
          </a>
          <Nav
            brand={{ label: '🐝 Beehive CBs Hub', href: '/' }}
            homeLabel={tNav('home')}
            groups={groups}
            community={community}
            locales={siteConfig.locales}
            currentLocale={locale}
            languageSwitcherLabel={languageSwitcherLabel}
            searchEntries={searchEntries}
            searchStrings={searchStrings}
          />
          <main
            id="main"
            style={{
              flex: 1,
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%',
              padding: '0 var(--spacing-4)',
            }}
          >
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
