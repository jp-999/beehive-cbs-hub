// Root "/" — meta-refresh + visible link to the default locale.
// GitHub Pages has no server redirects, so this static page performs the hop.
// PAGES_BASE_PATH is baked in at build time so the redirect works under /<repo>.
const base = process.env.PAGES_BASE_PATH || '';

export default function RootPage() {
  const target = `${base}/en/`;
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <title>Beehive CBs Hub</title>
      </head>
      <body
        style={{
          background: '#0C0A08',
          color: '#F5EED6',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin: 0,
        }}
      >
        <a
          href={target}
          style={{ color: '#FBBF24', fontSize: '1rem', textDecoration: 'underline' }}
        >
          Go to the hub
        </a>
      </body>
    </html>
  );
}
