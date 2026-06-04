import { Bookmark, Compass, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const icons = [Bookmark, Compass, ShieldCheck]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="ig-shell-gradient px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="rounded-[2.5rem] border border-[var(--slot4-border)] bg-white/82 p-8 shadow-[0_24px_70px_rgba(24,50,74,0.10)] lg:p-12">
            <span className="ig-section-kicker">{pagesContent.about.badge}</span>
            <h1 className="mt-6 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value, index) => {
              const Icon = icons[index % icons.length]
              return (
                <div key={value.title} className="rounded-[2rem] border border-[var(--slot4-border)] bg-white/76 p-6 shadow-[0_20px_56px_rgba(24,50,74,0.08)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{value.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              )
            })}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
