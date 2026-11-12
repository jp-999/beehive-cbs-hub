/**
 * InlineHtml — thin wrapper for injecting trusted repo-controlled HTML inline.
 * Architecture D4: all raw HTML injection is repo-controlled and trusted. This is
 * the ONLY place besides Prose.tsx where dangerouslySetInnerHTML is allowed.
 * If content ever becomes user-supplied, add rehype-sanitize to the pipeline and
 * remove this component.
 */
interface InlineHtmlProps {
  html: string;
  /** Render as block-level element instead of inline span. */
  block?: boolean;
}

export default function InlineHtml({ html, block }: InlineHtmlProps) {
  if (block) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
