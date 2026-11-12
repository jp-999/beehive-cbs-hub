import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

type Messages = Record<string, unknown>;

function mergeDeep(target: Messages, source: Messages): Messages {
  const result: Messages = { ...target };
  for (const key in source) {
    const sv = source[key];
    const tv = target[key];
    if (
      sv !== null &&
      typeof sv === 'object' &&
      !Array.isArray(sv) &&
      typeof tv === 'object' &&
      tv !== null
    ) {
      result[key] = mergeDeep(tv as Messages, sv as Messages);
    } else {
      result[key] = sv;
    }
  }
  return result;
}

// English is the complete base. Locale catalogs (fr-FR, de-DE, ja-JP, ko-KR, pt-BR)
// are registered here as they are authored; until a locale has a catalog it renders
// English chrome via the deep-merge fallback below.
const messageLoaders: Record<string, () => Promise<Messages>> = {
  en: () => import('../messages/en.json').then((m) => m.default as unknown as Messages),
  'fr-FR': () => import('../messages/fr-FR.json').then((m) => m.default as unknown as Messages),
  'de-DE': () => import('../messages/de-DE.json').then((m) => m.default as unknown as Messages),
  'ja-JP': () => import('../messages/ja-JP.json').then((m) => m.default as unknown as Messages),
  'ko-KR': () => import('../messages/ko-KR.json').then((m) => m.default as unknown as Messages),
  'pt-BR': () => import('../messages/pt-BR.json').then((m) => m.default as unknown as Messages),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const enMessages = await messageLoaders['en']();

  let localeMessages: Messages = {};
  if (locale !== 'en' && messageLoaders[locale]) {
    try {
      localeMessages = await messageLoaders[locale]();
    } catch {
      // fall back to English
    }
  }

  const messages = mergeDeep(enMessages, localeMessages);

  return { locale, messages };
});
