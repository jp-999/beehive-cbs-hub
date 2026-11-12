import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SECTIONS, HERO_CTAS } from '@/lib/sections';
import { siteConfig } from '@/site.config';
import Hero from '@/components/Hero';
import CardGrid from '@/components/CardGrid';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);

  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tSections = await getTranslations({ locale, namespace: 'sections' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  // Build hero CTAs from HERO_CTAS
  const ctaLabels = [tHero('ctaOnboarding'), tHero('ctaMaterials'), tHero('ctaCommonErrors')];
  const ctas = HERO_CTAS.map((id, i) => {
    const section = SECTIONS.find((s) => s.id === id)!;
    return {
      label: ctaLabels[i],
      href: (section.target.kind === 'internal' ? section.target.href : '/') as `/${string}`,
    };
  });

  // Build card data from SECTIONS
  const cards = SECTIONS.map((s) => ({
    id: s.id,
    title: tSections(`${s.id}.title` as Parameters<typeof tSections>[0]),
    description: tSections(`${s.id}.description` as Parameters<typeof tSections>[0]),
    icon: s.icon,
    target: s.target,
  }));

  return (
    <div style={{ padding: '32px 0' }}>
      <Hero
        title={tHero('title')}
        mascotName={siteConfig.mascot.name}
        intro={tHero('intro')}
        ctas={ctas}
      />
      <section
        aria-labelledby="cards-heading"
        style={{ marginTop: '48px', paddingBottom: '48px' }}
      >
        <h2
          id="cards-heading"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-secondary)',
            marginBottom: '24px',
            marginTop: 0,
          }}
        >
          {tHome('cardGridLabel')}
        </h2>
        <CardGrid cards={cards} headingId="cards-heading" />
      </section>
    </div>
  );
}
