import type { ReactNode } from 'react';
import PostHogProvider from '@/components/PostHogProvider';

// Pass-through root layout.
// Each [locale] layout renders its own <html> and <body>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
