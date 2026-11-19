import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import { SECTIONS } from '@/lib/sections';
import type { SectionId } from '@/lib/sections';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BeeLoader from '@/components/BeeLoader';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Map section IDs to nav message keys
const sectionNavKeys: Record<SectionId, string> = {
  onboarding: 'onboarding',
  materials: 'materials',
  accounts: 'onboarding', // not inNav, won't be used
  'common-errors': 'commonErrors',
  examples: 'examples',
  troubleshooting: 'troubleshooting',
  'outlier-community': 'outlierCommunity',
  contact: 'contact',
};

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

  // Build nav items: Home + inNav sections
  const homeItem = {
    id: 'home' as const,
    label: tNav('home'),
    target: { kind: 'internal' as const, href: '/' as `/${string}` },
  };

  const sectionItems = SECTIONS.filter((s) => s.inNav).map((s) => ({
    id: s.id,
    label: tNav(sectionNavKeys[s.id] as Parameters<typeof tNav>[0]),
    target: s.target,
  }));

  const navItems = [homeItem, ...sectionItems];

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
            items={navItems}
            brand={{ label: '🐝 Beehive CBs Hub', href: '/' }}
            locales={siteConfig.locales}
            currentLocale={locale}
            languageSwitcherLabel={languageSwitcherLabel}
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
