'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Search, UserPlus, LogIn } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': 'rgba(255,255,255,0.88)',
    '--editable-nav-text': 'var(--slot4-page-text)',
    '--editable-nav-active': 'var(--slot4-page-text)',
    '--editable-nav-active-text': 'var(--slot4-dark-text)',
    '--editable-cta-bg': 'var(--slot4-page-text)',
    '--editable-cta-text': 'var(--slot4-dark-text)',
    '--editable-search-bg': 'rgba(255,255,255,0.78)',
    '--editable-border': 'var(--slot4-border)',
    '--editable-container': '1380px',
  } as CSSProperties

  return (
    <header
      style={navVars}
      className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-2xl"
    >
      <nav className="mx-auto flex min-h-[94px] w-full max-w-[var(--editable-container)] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-12 w-12 object-contain" />
          <span className="hidden min-w-0 sm:block">
            <span className="block font-[family:var(--slot4-font-display)] text-[2rem] font-bold leading-none tracking-[-0.04em]">
              {SITE_CONFIG.name}
            </span>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.24em] opacity-60">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="mx-auto min-w-0 flex-1 max-w-[760px]">
          <form action="/search">
            <label className="flex w-full items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 opacity-55" />
              <input
                name="q"
                type="search"
                placeholder="Search resources"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-current/38"
              />
            </label>
          </form>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {session ? (
            <>
              <Link href="/create" className="rounded-full bg-[var(--editable-cta-bg)] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--editable-cta-text)]">
                Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-[var(--editable-border)] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em]">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--editable-cta-text)]">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  )
}
