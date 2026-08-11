'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const year = new Date().getFullYear()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const footerVars = {
    '--editable-footer-bg': '#102b43',
    '--editable-footer-text': '#fffdeb',
    '--editable-footer-muted': 'rgba(255,253,235,0.7)',
    '--editable-border': 'rgba(255,255,255,0.1)',
    '--editable-container': '1380px',
  } as CSSProperties

  return (
    <footer
      style={footerVars}
      className="mt-auto border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]"
    >
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:px-8">
        <div className="rounded-[1.9rem] border border-[var(--editable-border)] bg-white/[0.03] p-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
            <span className="font-[family:var(--slot4-font-display)] text-3xl font-bold leading-none tracking-[-0.04em]">
              {SITE_CONFIG.name}
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--editable-footer-muted)]">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
          
        </div>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/55">Browse</h3>
          <div className="mt-5 grid gap-3">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/78 transition hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/55">Pages</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Search', '/search'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/78 transition hover:text-white">
                {label}
              </Link>
            ))}
            {!session ? (
              <>
                <Link href="/login" className="text-sm font-bold text-white/78 transition hover:text-white">
                  Login
                </Link>
                <Link href="/signup" className="text-sm font-bold text-white/78 transition hover:text-white">
                  Sign up
                </Link>
              </>
            ) : null}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/78 transition hover:text-white">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)] px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
