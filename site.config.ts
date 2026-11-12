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
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ],
  defaultLocale: 'en',
  mascot: {
    name: {
      status: 'placeholder',
      preview: 'Bea',
      note: 'Mascot name TBD — human to confirm',
    },
  },
  onboardingVideos: [
    {
      id: 'task-row',
      title: {
        status: 'placeholder',
        preview: 'Reading your task row',
        note: 'Onboarding video title — human to confirm',
      },
      url: {
        status: 'placeholder',
        note: 'Onboarding video URL for task-row — human to provide',
      },
    },
    {
      id: 'setup',
      title: {
        status: 'placeholder',
        preview: 'Setup',
        note: 'Onboarding video title — human to confirm',
      },
      url: {
        status: 'placeholder',
        note: 'Onboarding video URL for setup — human to provide',
      },
    },
    {
      id: 'submission',
      title: {
        status: 'placeholder',
        preview: 'Submission flow',
        note: 'Onboarding video title — human to confirm',
      },
      url: {
        status: 'placeholder',
        note: 'Onboarding video URL for submission — human to provide',
      },
    },
  ],
  links: {
    outlierCommunity: {
      status: 'placeholder',
      note: 'Outlier Community channel URL — human to provide',
    },
    warRoom: {
      status: 'placeholder',
      note: 'War Room link — human to provide',
    },
    dashboard: {
      status: 'placeholder',
      note: 'Dashboard URL — human to provide',
    },
  },
  qms: {
    status: 'placeholder',
    note: 'QM names and contact details — human to provide',
  },
};
