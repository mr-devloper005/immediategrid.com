'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass =
  'ig-input text-sm font-bold text-[var(--slot4-page-text)] placeholder:text-[var(--slot4-soft-muted-text)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="ig-shell-gradient min-h-screen px-4 py-16 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2.8rem] border border-[var(--slot4-border)] bg-white/78 p-7 shadow-[0_30px_90px_rgba(24,50,74,0.10)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[2rem] bg-[var(--slot4-page-text)] text-[var(--slot4-dark-text)]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <span className="ig-section-kicker">{pagesContent.create.locked.badge}</span>
              <h1 className="mt-5 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-dark-text)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="ig-outline-button">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="ig-shell-gradient min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1380px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2.8rem] border border-[var(--slot4-border)] bg-white/78 p-6 shadow-[0_30px_90px_rgba(24,50,74,0.10)] backdrop-blur lg:grid-cols-[0.86fr_1.14fr] lg:p-10">
            <aside>
              <span className="ig-section-kicker">{pagesContent.create.hero.badge}</span>
              <h1 className="mt-5 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-transparent bg-[var(--slot4-page-text)] text-[var(--slot4-dark-text)] shadow-[0_18px_40px_rgba(24,50,74,0.18)]' : 'border-[var(--slot4-border)] bg-white hover:-translate-y-0.5'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className={`mt-1 block text-xs font-semibold ${active ? 'text-white/70' : 'text-[var(--slot4-soft-muted-text)]'}`}>{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[2.2rem] border border-[var(--slot4-border)] bg-[var(--slot4-panel-bg)] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24 py-4`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48 py-4`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[1.1rem] bg-[var(--slot4-page-text)] px-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-dark-text)] transition hover:-translate-y-0.5">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
