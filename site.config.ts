/** A value the human hasn't supplied yet. A 'placeholder' can never yield an href. */
export type Placeholder<T> =
  | { status: 'placeholder'; note: string; preview?: T }
  | { status: 'ready'; value: T };

export interface QM {
  name: string;
  role?: string;
  languages?: string;
  hours?: string;
  /** Outlier Community handle, without the leading @. */
  oc: string;
}

interface SiteConfig {
  name: 'Beehive CBs Hub';
  locales: readonly { code: string; label: string }[];
  defaultLocale: 'en';
  mascot: { name: Placeholder<string> };
  /** One onboarding webinar recording per locale code. */
  onboardingVideoByLocale: Record<string, Placeholder<string>>;
  links: {
    outlierCommunity: Placeholder<string>;
    warRoom: Placeholder<string>;
    dashboard: Placeholder<string>;
    demoAccountClaim: Placeholder<string>;
  };
  qms: QM[];
}

export const siteConfig: SiteConfig = {
  name: 'Beehive CBs Hub',
  locales: [
    { code: 'en', label: 'English (UK)' },
    { code: 'fr-FR', label: 'Français' },
    { code: 'de-DE', label: 'Deutsch' },
    { code: 'ja-JP', label: '日本語' },
    { code: 'ko-KR', label: '한국어' },
    { code: 'pt-BR', label: 'Português (BR)' },
  ],
  defaultLocale: 'en',
  mascot: { name: { status: 'ready', value: 'Buzz' } },
  // Onboarding webinar recording per language. Add a locale's URL to go live.
  onboardingVideoByLocale: {
    en: { status: 'placeholder', note: 'English webinar recording TBD' },
    'fr-FR': { status: 'ready', value: 'https://static.remotasks.com/uploads/6ae1115bd103bdba12c06461/NEW171126FRWebinar.mp4' },
    'de-DE': { status: 'ready', value: 'https://static.remotasks.com/uploads/6ae1115bd103bdba12c06461/video1644506591.mp4' },
    'ja-JP': { status: 'placeholder', note: 'Japanese webinar recording TBD' },
    'ko-KR': { status: 'placeholder', note: 'Korean webinar recording TBD' },
    'pt-BR': { status: 'placeholder', note: 'Portuguese webinar recording TBD' },
  },
  links: {
    outlierCommunity: { status: 'ready', value: 'https://community.outlier.ai/c/beehive-channel/18721' },
    warRoom: { status: 'ready', value: 'https://meet.google.com/nmj-vgss-ohb' },
    dashboard: { status: 'ready', value: 'https://app.outlier.ai/' },
    demoAccountClaim: { status: 'ready', value: 'https://app.outlier.ai/demo-account-claim' },
  },
  qms: [
    { name: 'Huan Francischinelli', role: 'QM', hours: '7 AM – 3 PM PST', oc: 'Huan_QM' },
    { name: 'Yash Attri', role: 'QM · Usually helps with UK tasks', languages: 'English (UK)', hours: '2:30 AM – 10:30 AM PST (3 PM – 11 PM IST)', oc: 'yash_attri_qmo_code' },
    { name: 'Jayanth Peddi', role: 'QM', hours: '12 PM – 8 PM IST', oc: 'Jayanth_Peddi_QM' },
    { name: 'Davide Sell', role: 'QM · Usually helps with Korean tasks', languages: 'Korean', hours: 'Mon–Fri 10 AM – 7 PM KST (6 PM – 3 AM PST), some weekend hours', oc: 'Davide_QMO_IT' },
    { name: 'Hiro Yoshioka', role: 'QM · Japanese contributors', languages: 'Japanese', hours: 'Mon 04:00-09:00 JST · Tue 17:30-22:30 CST (UTC-06:00, not CDT) · Wed onwards 04:00-07:00 and 17:30-22:30 CST', oc: 'Hiro_QMO_JP' },
  ],
};
