/** A value the human hasn't supplied yet. A 'placeholder' can never yield an href. */
export type Placeholder<T> =
  | { status: 'placeholder'; note: string; preview?: T }
  | { status: 'ready'; value: T };

interface Contact {
  role: string;
  name: string;
  channel: Placeholder<string>;
}

interface SiteConfig {
  name: 'Beehive CBs Hub';
  locales: readonly { code: string; label: string }[];
  defaultLocale: 'en';
  mascot: { name: Placeholder<string> };
  onboardingVideos: {
    id: 'task-row' | 'setup' | 'submission';
    title: Placeholder<string>;
    url: Placeholder<string>;
  }[];
  links: {
    outlierCommunity: Placeholder<string>;
    warRoom: Placeholder<string>;
    dashboard: Placeholder<string>;
  };
  qms: Placeholder<Contact[]>;
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
  mascot: {
    name: { status: 'ready', value: 'Buzz' },
  },
  // Onboarding tab is dropped for now; these stay for easy re-enable later.
  onboardingVideos: [
    {
      id: 'task-row',
      title: { status: 'placeholder', preview: 'Reading your task row', note: 'Onboarding video title — human to confirm' },
      url: { status: 'placeholder', note: 'Onboarding video URL for task-row — human to provide' },
    },
    {
      id: 'setup',
      title: { status: 'placeholder', preview: 'Setup', note: 'Onboarding video title — human to confirm' },
      url: { status: 'placeholder', note: 'Onboarding video URL for setup — human to provide' },
    },
    {
      id: 'submission',
      title: { status: 'placeholder', preview: 'Submission flow', note: 'Onboarding video title — human to confirm' },
      url: { status: 'placeholder', note: 'Onboarding video URL for submission — human to provide' },
    },
  ],
  links: {
    outlierCommunity: {
      status: 'ready',
      value: 'https://community.outlier.ai/c/beehive-channel/18721',
    },
    warRoom: {
      status: 'ready',
      value: 'https://meet.google.com/nmj-vgss-ohb',
    },
    dashboard: {
      status: 'placeholder',
      note: 'Dashboard URL — same as Nectarbloom; human to paste (that repo was private/inaccessible).',
    },
  },
  qms: {
    status: 'placeholder',
    note: 'QMs are the same team, reached via the War Room. A named list is optional.',
  },
};
