import { useState, type FormEvent } from 'react'
import { KeyRound, Loader2, Mail, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [usePassword, setUsePassword] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSending(true)
    if (usePassword) {
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      setSending(false)
      if (err) setError(err.message)
      return
    }
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })
    setSending(false)
    if (err) setError(err.message)
    else setSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold leading-tight">DM Finisher</h1>
            <p className="text-xs text-neutral-500">Upscale · remove background · finish</p>
          </div>
        </div>

        {sent ? (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              Check your inbox. We sent a magic link to <strong>{email}</strong>.
            </div>
            <button
              onClick={() => setSent(false)}
              className="text-neutral-500 underline-offset-2 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-neutral-900/10 focus:ring-4 dark:border-neutral-700 dark:bg-neutral-950 dark:ring-white/10"
                />
              </div>
            </label>
            {usePassword && (
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Password</span>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-neutral-900/10 focus:ring-4 dark:border-neutral-700 dark:bg-neutral-950 dark:ring-white/10"
                  />
                </div>
              </label>
            )}
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={sending || !email}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {sending && <Loader2 className="h-4 w-4 animate-spin" />}
              {usePassword ? 'Sign in' : 'Send magic link'}
            </button>
            <p className="text-center text-xs text-neutral-500">
              {usePassword ? 'Team accounts with a password.' : "No password needed. We'll email you a sign-in link."}{' '}
              <button type="button" onClick={() => setUsePassword((v) => !v)} className="underline-offset-2 hover:underline">
                {usePassword ? 'Use magic link' : 'Use password'}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
