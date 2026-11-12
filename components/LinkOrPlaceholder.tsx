import type { Placeholder } from '@/site.config';
import PlaceholderBadge from './PlaceholderBadge';

interface LinkOrPlaceholderProps {
  link: Placeholder<string>;
  children: React.ReactNode;
  external?: boolean;
}

export default function LinkOrPlaceholder({
  link,
  children,
  external = false,
}: LinkOrPlaceholderProps) {
  if (link.status === 'ready') {
    return (
      <a
        href={link.value}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
        {external && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
      </a>
    );
  }

  return (
    <span>
      {children}
      <PlaceholderBadge note={link.note} />
    </span>
  );
}
