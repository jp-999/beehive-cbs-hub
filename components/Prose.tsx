import type { ElementType, CSSProperties } from 'react';

interface ProseProps {
  html: string;
  lang?: string;
  className?: string;
  style?: CSSProperties;
  /** Element to render. Defaults to a block <div>. */
  as?: ElementType;
  /** Omit the `.prose` block typography — for table cells / inline fragments. */
  plain?: boolean;
}

const blockStyle: CSSProperties = {
  color: 'var(--color-text-primary)',
  lineHeight: 1.7,
  fontSize: '0.9375rem',
};

/**
 * The single, controlled HTML-injection point for the whole app (architecture D4).
 * All repo-content HTML is rendered here and nowhere else, so sanitization — if ever
 * needed — has exactly one chokepoint.
 */
export default function Prose({
  html,
  lang,
  className,
  style,
  as,
  plain = false,
}: ProseProps) {
  const Tag = (as ?? 'div') as ElementType;
  const cls = plain ? className : `prose ${className ?? ''}`.trim();
  return (
    <Tag
      className={cls || undefined}
      lang={lang}
      style={plain ? style : { ...blockStyle, ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
