import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr-FR', 'de-DE', 'ja-JP', 'ko-KR', 'pt-BR'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
