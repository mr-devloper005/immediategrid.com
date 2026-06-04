'use client'

import { Bookmark, Compass, Mail, Search, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Bookmark, title: 'Collection ideas', body: 'Share resource bundles, archive ideas, or collection concepts that deserve a clearer home.' },
  { icon: Search, title: 'Discovery feedback', body: 'Tell us where browsing can become faster, clearer, or more useful for repeat visitors.' },
  { icon: Compass, title: 'Navigation questions', body: 'Ask about routes, archive pages, and how visitors move through the site more effectively.' },
  { icon: Sparkles, title: 'Design requests', body: 'Reach out about visual refinement, premium framing, or presentation updates for public-facing pages.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="ig-shell-gradient px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="ig-section-kicker">{pagesContent.contact.eyebrow}</span>
            <h1 className="mt-6 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">
              {pagesContent.contact.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.8rem] border border-[var(--slot4-border)] bg-white/76 p-5 shadow-[0_18px_50px_rgba(24,50,74,0.08)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-[family:var(--slot4-font-display)] text-2xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">
                    {lane.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[var(--slot4-border)] bg-white/78 p-6 shadow-[0_24px_70px_rgba(24,50,74,0.10)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-dark-text)]">
                <Mail className="h-6 w-6" />
              </div>Contact desk
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]"></p>
                <h2 className="mt-1 font-[family:var(--slot4-font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">
                  {pagesContent.contact.formTitle}
                </h2>
              </div>
            </div>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
