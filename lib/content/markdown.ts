import 'server-only';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString as hastToString } from 'hast-util-to-string';
import type { Root as MdastRoot, TableCell } from 'mdast';
import type { Root as HastRoot, Element } from 'hast';
import type { TocItem, HtmlSection } from './types';

// ── Rehype plugin: root-relative media src (+ GitHub Pages basePath), loading=lazy ──
function rehypeImages() {
  const base = process.env.PAGES_BASE_PATH || '';
  const isLocal = (v: unknown): v is string =>
    typeof v === 'string' && v.length > 0 && !v.startsWith('http') && !v.startsWith('data:') && !v.startsWith('#');
  const rootify = (v: string) => base + (v.startsWith('/') ? v : '/' + v);
  return function (tree: HastRoot) {
    visit(tree, 'element', (node: Element) => {
      const tag = node.tagName;
      if (tag === 'img' || tag === 'source' || tag === 'video' || tag === 'audio') {
        const src = node.properties?.src;
        if (isLocal(src)) node.properties!.src = rootify(src);
        const poster = node.properties?.poster;
        if (isLocal(poster)) node.properties!.poster = rootify(poster);
        if (tag === 'img') node.properties!.loading = 'lazy';
      } else if (tag === 'a') {
        // Rewrite local media download links so they resolve under basePath.
        const href = node.properties?.href;
        if (isLocal(href) && (href.startsWith('media/') || href.startsWith('/media/'))) {
          node.properties!.href = rootify(href);
        }
      }
    });
  };
}

// ── Utility type for hast node collections ────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyNode = any;

// ── Build the full hast tree (without stringify) ──────────────────────
function buildHast(md: string): HastRoot {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeImages);

  const mdast = processor.parse(md);
  return processor.runSync(mdast) as unknown as HastRoot;
}

// ── Stringify a slice of hast nodes to HTML ───────────────────────────
function stringifyNodes(nodes: AnyNode[]): string {
  const root: HastRoot = { type: 'root', children: nodes as any };
  return unified().use(rehypeStringify).stringify(root);
}

// ── Extract plain text from a hast element ────────────────────────────
function hastNodeText(node: Element): string {
  return hastToString(node);
}

// ── Extract TocItems (depth) from a list of hast nodes ───────────────
function extractSubToc(nodes: AnyNode[], depth: number): TocItem[] {
  const items: TocItem[] = [];
  for (const node of nodes) {
    if (
      node.type === 'element' &&
      node.tagName === `h${depth}` &&
      (depth === 2 || depth === 3)
    ) {
      items.push({
        id: (node.properties?.id as string) ?? '',
        text: hastNodeText(node),
        depth: depth as 2 | 3,
      });
    }
  }
  return items;
}

// ── renderSections ────────────────────────────────────────────────────
/**
 * Renders the whole doc to hast (slug IDs unique doc-wide), then splits
 * at each heading of `splitDepth`. Nodes before the first heading → preamble.
 */
export function renderSections(
  md: string,
  splitDepth: 2 | 3 = 2,
): { preamble: string; sections: HtmlSection[] } {
  const hast = buildHast(md);

  const preambleNodes: AnyNode[] = [];
  const sections: HtmlSection[] = [];
  let currentId = '';
  let currentTitle = '';
  let currentNodes: AnyNode[] = [];
  let inSection = false;

  const subDepth = splitDepth === 2 ? 3 : 2;

  for (const node of hast.children) {
    if (
      node.type === 'element' &&
      node.tagName === `h${splitDepth}`
    ) {
      if (inSection) {
        sections.push({
          id: currentId,
          title: currentTitle,
          html: stringifyNodes(currentNodes),
          toc: extractSubToc(currentNodes, subDepth),
        });
      }
      currentId = (node.properties?.id as string) ?? '';
      currentTitle = hastNodeText(node);
      currentNodes = [node]; // include heading in section html so anchors work
      inSection = true;
    } else if (inSection) {
      currentNodes.push(node);
    } else {
      preambleNodes.push(node);
    }
  }

  if (inSection) {
    sections.push({
      id: currentId,
      title: currentTitle,
      html: stringifyNodes(currentNodes),
      toc: extractSubToc(currentNodes, subDepth),
    });
  }

  return {
    preamble: stringifyNodes(preambleNodes),
    sections,
  };
}

// ── renderFragment ────────────────────────────────────────────────────
/** Render a block/inline markdown string to HTML (no outer wrapper). */
export function renderFragment(md: string): string {
  const hast = buildHast(md);
  return stringifyNodes(hast.children);
}

// ── parseMdast ────────────────────────────────────────────────────────
/** Parse markdown to mdast (remark-parse + remark-gfm). */
export function parseMdast(md: string): MdastRoot {
  return unified().use(remarkParse).use(remarkGfm).parse(md) as MdastRoot;
}

// ── cellText ──────────────────────────────────────────────────────────
/** Plain text of a TableCell; raw `<br>` → '\n'. */
export function cellText(cell: TableCell): string {
  const parts: string[] = [];
  function walk(node: any): void {
    if (node.type === 'text') {
      parts.push(node.value as string);
    } else if (
      node.type === 'html' &&
      /^<br\s*\/?>$/i.test((node.value as string).trim())
    ) {
      parts.push('\n');
    } else if (node.type === 'inlineCode') {
      parts.push(node.value as string);
    } else if (node.children) {
      (node.children as any[]).forEach(walk);
    }
  }
  cell.children.forEach(walk);
  return parts.join('').trim();
}

// ── cellHtml ──────────────────────────────────────────────────────────
/** HTML of a TableCell's inline content; keeps **bold**, <br>, etc. */
export function cellHtml(cell: TableCell): string {
  function escape(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function walk(node: any): string {
    switch (node.type) {
      case 'text':
        return escape(node.value as string);
      case 'html':
        return node.value as string; // raw html (<br>, etc.)
      case 'strong':
        return `<strong>${(node.children as any[]).map(walk).join('')}</strong>`;
      case 'em':
        return `<em>${(node.children as any[]).map(walk).join('')}</em>`;
      case 'inlineCode':
        return `<code>${escape(node.value as string)}</code>`;
      case 'link':
        return `<a href="${escape(node.url as string)}">${(node.children as any[]).map(walk).join('')}</a>`;
      case 'paragraph':
        return (node.children as any[]).map(walk).join('');
      case 'break':
        return '<br>';
      default:
        if (node.children) return (node.children as any[]).map(walk).join('');
        return '';
    }
  }

  return cell.children.map(walk).join('');
}

// ── Full render ───────────────────────────────────────────────────────
/** Render a full markdown doc to HTML. */
export function renderFull(md: string): string {
  const hast = buildHast(md);
  return stringifyNodes(hast.children);
}
