import type { Placeholder } from '@/site.config';

export type SectionId =
  | 'onboarding'
  | 'materials'
  | 'accounts'
  | 'common-errors'
  | 'examples'
  | 'outlier-community'
  | 'contact';

export type IconName = string; // emoji or identifier

export type SectionTarget =
  | { kind: 'internal'; href: `/${string}` }
  | { kind: 'external'; link: Placeholder<string> };

export interface Section {
  id: SectionId;
  target: SectionTarget;
  icon: IconName;
  inNav: boolean;
  inGrid: true;
}

import { siteConfig } from '@/site.config';

export const SECTIONS: Section[] = [
  {
    id: 'onboarding',
    target: { kind: 'internal', href: '/onboarding' },
    icon: '🎓',
    inNav: true,
    inGrid: true,
  },
  {
    id: 'materials',
    target: { kind: 'internal', href: '/materials' },
    icon: '📚',
    inNav: true,
    inGrid: true,
  },
  {
    id: 'accounts',
    target: { kind: 'internal', href: '/accounts' },
    icon: '💳',
    inNav: false,
    inGrid: true,
  },
  {
    id: 'common-errors',
    target: { kind: 'internal', href: '/common-errors' },
    icon: '⚠️',
    inNav: true,
    inGrid: true,
  },
  {
    id: 'examples',
    target: { kind: 'internal', href: '/examples' },
    icon: '📝',
    inNav: true,
    inGrid: true,
  },
  {
    id: 'outlier-community',
    target: { kind: 'external', link: siteConfig.links.outlierCommunity },
    icon: '🌐',
    inNav: true,
    inGrid: true,
  },
  {
    id: 'contact',
    target: { kind: 'internal', href: '/contact' },
    icon: '📬',
    inNav: true,
    inGrid: true,
  },
];

export const HERO_CTAS: SectionId[] = ['onboarding', 'materials', 'common-errors'];
