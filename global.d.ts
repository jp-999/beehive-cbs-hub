import en from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: 'en' | 'fr-FR' | 'de-DE' | 'ja-JP' | 'ko-KR' | 'pt-BR';
    Messages: typeof en;
  }
}
