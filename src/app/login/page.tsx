'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-headline font-bold text-ink mb-2">Sign In</h1>
        <p className="text-muted text-sm mb-8">
          Enter your email to receive a magic link.
        </p>

        {sent ? (
          <div className="bg-white border-2 border-ink p-6">
            <p className="text-ink font-medium">Check your email</p>
            <p className="text-muted text-sm mt-2">
              We sent a sign-in link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border-2 border-ink bg-white text-ink placeholder:text-faint text-sm focus:outline-none focus:border-blue"
            />
            {error && (
              <p className="text-civic text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-ink text-white py-3 font-semibold text-sm hover:bg-blue transition-colors"
            >
              Send Magic Link
            </button>
          </form>
        )}

        <a href="/" className="block mt-6 text-sm text-muted hover:text-ink transition-colors">
          &larr; Back home
        </a>
      </div>
    </div>
  )
}
