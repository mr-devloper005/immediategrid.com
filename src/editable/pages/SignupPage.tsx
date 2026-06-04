import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="ig-shell-gradient min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1380px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="relative overflow-hidden rounded-[2.6rem] border border-[var(--slot4-border)] bg-white/84 p-7 shadow-[0_24px_70px_rgba(24,50,74,0.10)] sm:p-10 lg:p-12">
            <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-[rgba(125,170,203,0.16)] blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(232,219,179,0.34)] blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="ig-section-kicker">{pagesContent.auth.signup.badge}</span>
              <h1 className="mt-6 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-[4.8rem]">
                {pagesContent.auth.signup.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--slot4-muted-text)]">
                {pagesContent.auth.signup.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: CheckCircle2, title: 'Simple access', body: 'Create your account in a few fields.' },
                  { icon: ShieldCheck, title: 'Private login', body: 'Your session stays local to this browser.' },
                  { icon: Sparkles, title: 'Premium view', body: 'A cleaner layout that matches the site.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.8rem] border border-[var(--slot4-border)] bg-[var(--slot4-panel-bg)] p-5">
                    <item.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <h2 className="mt-4 text-lg font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{item.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="ig-outline-button">
                  Already have an account
                </Link>
                <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-dark-text)]">
                  Browse bookmarks <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[var(--slot4-border)] bg-white/88 p-6 shadow-[0_24px_70px_rgba(24,50,74,0.10)] backdrop-blur sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-dark-text)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Site access</p>
                <h2 className="mt-1 font-[family:var(--slot4-font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">
                  {pagesContent.auth.signup.formTitle}
                </h2>
              </div>
            </div>

            <EditableLocalSignupForm />

            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">
              Already have an account?{' '}
              <Link href="/login" className="font-black underline-offset-4 hover:underline">
                {pagesContent.auth.signup.loginCta}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
