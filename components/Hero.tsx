import type { Placeholder } from '@/site.config';
import CTAButton from './CTAButton';
import PlaceholderBadge from './PlaceholderBadge';

interface CtaItem {
  label: string;
  href: `/${string}`;
}

interface HeroProps {
  title: string;
  mascotName: Placeholder<string>;
  intro: string;
  ctas: CtaItem[];
}

export default function Hero({ title, mascotName, intro, ctas }: HeroProps) {
  const displayName =
    mascotName.status === 'ready' ? mascotName.value : (mascotName.preview ?? 'Bea');
  const isPlaceholder = mascotName.status === 'placeholder';

  return (
    <section
      aria-label="Hero"
      style={{
        background: 'linear-gradient(135deg, #3D2A08 0%, #241A08 60%, #1A1509 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(32px, 5vw, 48px)',
        minHeight: 'clamp(320px, 40vh, 420px)',
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hex decorations */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 140"
        style={{
          position: 'absolute',
          top: '-10px',
          right: '200px',
          width: '120px',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <polygon
          points="60,10 110,35 110,85 60,110 10,85 10,35"
          fill="none"
          stroke="#B45309"
          strokeWidth="2"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 80 92"
        style={{
          position: 'absolute',
          top: '20px',
          right: '60px',
          width: '80px',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      >
        <polygon
          points="40,6 73,24 73,60 40,78 7,60 7,24"
          fill="none"
          stroke="#B45309"
          strokeWidth="2"
        />
      </svg>

      {/* Left column */}
      <div style={{ flex: '1', maxWidth: '680px', position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-amber-500)',
            marginBottom: '8px',
          }}
        >
          Welcome
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-text-primary)',
            margin: '0 0 16px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            margin: '0 0 24px',
          }}
        >
          {intro}
          {isPlaceholder && <PlaceholderBadge note={mascotName.note} />}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {ctas.map((cta, i) => (
            <CTAButton
              key={cta.href}
              label={cta.label}
              href={cta.href}
              variant={i === 0 ? 'primary' : 'outline'}
            />
          ))}
        </div>
      </div>

      {/* Right column: mascot art (decorative) */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-art"
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid var(--color-amber-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            background: 'rgba(245,158,11,0.1)',
          }}
        >
          🐝
        </div>
        <span
          style={{
            fontSize: '1.25rem',
            display: 'flex',
            gap: '4px',
          }}
        >
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
        </span>
      </div>
    </section>
  );
}
