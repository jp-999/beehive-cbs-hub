import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { EXAMPLES } from '@/lib/examples-data';

export interface SearchEntry {
  title: string;
  group: string; // where it lives, e.g. "Materials", "Troubleshooting"
  href: string; // locale-agnostic internal path, e.g. "/materials#slug"
  snippet?: string;
}

const SRC = path.join(process.cwd(), 'content', 'source');

/**
 * Extract H2–H4 headings from a content markdown file and turn them into
 * search entries pointing at `<basePath>#<slug>`. Slugs are generated with the
 * same library (github-slugger) rehype-slug uses, so the anchors match.
 */
function headingsFrom(file: string, basePath: string, group: string): SearchEntry[] {
  try {
    const text = fs.readFileSync(path.join(SRC, file), 'utf8');
    const slugger = new GithubSlugger();
    const out: SearchEntry[] = [];
    let inFence = false;
    for (const raw of text.split('\n')) {
      if (/^```/.test(raw)) { inFence = !inFence; continue; }
      if (inFence) continue;
      const m = raw.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (!m) continue;
      const clean = m[2].replace(/[*_`]/g, '').trim();
      const slug = slugger.slug(clean); // always advance (matches per-doc dedup)
      if (m[1].length < 2 || m[1].length > 4) continue; // skip H1 (page title) and deep headings
      out.push({ title: clean, group, href: `${basePath}#${slug}` });
    }
    return out;
  } catch {
    return [];
  }
}

export function buildSearchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { title: 'Onboarding', group: 'Page', href: '/onboarding', snippet: 'webinar video, getting started' },
    { title: 'Materials — Beehive Instructions', group: 'Page', href: '/materials', snippet: 'guidelines, rating template, task types' },
    { title: 'QC Spec Rubric', group: 'Page', href: '/materials/qc-spec', snippet: 'rubric dimensions, bands, scoring' },
    { title: 'Turn off memory', group: 'Page', href: '/materials/memory-guide', snippet: 'ChatGPT Claude Gemini memory off' },
    { title: 'Accounts & Setup', group: 'Page', href: '/accounts', snippet: 'email, Claude Max, ChatGPT Plus, demo account, task types, AI Mode' },
    { title: 'Common Errors', group: 'Page', href: '/common-errors', snippet: 'send-backs, quick reference, quiz' },
    { title: 'Examples', group: 'Page', href: '/examples', snippet: 'worked tasks, clean passes, common failures' },
    { title: 'Troubleshooting', group: 'Page', href: '/troubleshooting', snippet: 'demo account, credit card, courses, AI Mode, SafeSearch, Workspace' },
    { title: 'Who to Contact', group: 'Page', href: '/contact', snippet: 'QMs, War Room, dashboard, community' },
  ];

  const headings = [
    ...headingsFrom('instructions.md', '/materials', 'Materials'),
    ...headingsFrom('common-errors-quickref.md', '/common-errors', 'Common Errors'),
    ...headingsFrom('task-types.md', '/accounts', 'Accounts & Setup'),
    ...headingsFrom('troubleshooting.md', '/troubleshooting', 'Troubleshooting'),
    ...headingsFrom('memory-guide.md', '/materials/memory-guide', 'Materials'),
  ];

  const examples: SearchEntry[] = EXAMPLES.map((e) => ({
    title: e.title,
    group: 'Examples',
    href: `/examples/${e.slug}`,
    snippet: e.finding,
  }));

  return [...pages, ...headings, ...examples];
}
