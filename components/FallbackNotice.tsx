import { getTranslations } from 'next-intl/server';

interface FallbackNoticeProps {
  show: boolean;
}

export default async function FallbackNotice({ show }: FallbackNoticeProps) {
  if (!show) return null;
  const t = await getTranslations('fallbackNotice');
  return (
    <div
      role="note"
      aria-label="Fallback notice"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(245,158,11,0.12)',
        border: '1px solid var(--color-amber-700)',
        color: 'var(--color-amber-300)',
        fontSize: '0.8125rem',
        marginBottom: '16px',
      }}
    >
      <span aria-hidden="true">[EN]</span>
      {t('message')}
    </div>
  );
}
