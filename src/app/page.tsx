import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </h1>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <a href="/about" className="hover:text-ink transition-colors">About</a>
            <a href="/login" className="hover:text-ink transition-colors">Sign In</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="font-display text-display font-bold text-ink mb-6">
            Your community,<br />connected.
          </h2>
          <p className="text-lg text-muted mb-10 max-w-lg mx-auto">
            Resources, services, and civic opportunities — curated for
            the neighborhoods that matter to you.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/explore"
              className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 font-semibold text-sm hover:bg-blue transition-colors"
            >
              Explore <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-ink text-ink px-6 py-3 font-semibold text-sm hover:bg-ink hover:text-white transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-rule px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-faint">
          <p>Community Exchange — The Change Lab Inc.</p>
        </div>
      </footer>
    </div>
  )
}
