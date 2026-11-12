// Global 404 — shown for routes outside the [locale] tree.
// PAGES_BASE_PATH is baked in so "Go to home" works under /<repo> on GitHub Pages.
const base = process.env.PAGES_BASE_PATH || '';

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page not found — Beehive CBs Hub</title>
      </head>
      <body
        style={{
          background: '#0C0A08',
          color: '#F5EED6',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin: 0,
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '3rem' }}>🍯</span>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
          Page not found
        </h1>
        <p style={{ margin: 0, color: '#B8A878' }}>
          This page doesn&apos;t exist or was moved.
        </p>
        <a
          href={`${base}/en/`}
          style={{
            background: '#F59E0B',
            color: '#0C0A08',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9375rem',
          }}
        >
          Go to home
        </a>
      </body>
    </html>
  );
}
