'use client'
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ padding: '60px 40px', fontFamily: 'sans-serif', background: '#FBF7F0', minHeight: '100vh' }}>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#1C1209', marginBottom: 12 }}>
        Something went wrong loading this page.
      </h2>
      <p style={{ color: '#7C5C2E', marginBottom: 24 }}>We're working on it. Try again in a moment.</p>
      <button onClick={reset} style={{ padding: '10px 24px', background: '#1B4332', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
        Try again
      </button>
    </div>
  )
}
