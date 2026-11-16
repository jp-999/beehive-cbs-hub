'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

/**
 * Initialises PostHog Web Analytics on the client.
 *
 * - Cookieless: persistence is localStorage (anonymous id, no cookie banner needed).
 * - Privacy-friendly: anonymous visitors aren't turned into person profiles, and
 *   session recording is off. We only need page views for unique-visitor counts.
 * - Skips localhost so local dev / `serve out` traffic isn't counted.
 * - The project token is a public client-side key, read from NEXT_PUBLIC_* env.
 */
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    if (!key) return;

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') return;

    // Avoid a second init on Fast Refresh / re-mount.
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

    posthog.init(key, {
      api_host: host,
      defaults: '2026-05-30',
      persistence: 'localStorage',
      person_profiles: 'identified_only',
      disable_session_recording: true,
    });
  }, []);

  return <>{children}</>;
}
