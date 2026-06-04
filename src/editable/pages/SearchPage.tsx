import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => (typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : '')
const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const compactRaw = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const summaryOf = (post: SitePost) =>
  post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getEditablePostImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border border-[var(--slot4-border)] bg-white shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)] ${strong ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(24,50,74,0.7)] via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">{taskLabel}</span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="ig-pill bg-[var(--slot4-panel-bg)]">{getEditableCategory(post)}</span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">Result {index + 1}</span>
        </div>
        <h2 className="mt-4 line-clamp-3 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="ig-shell-gradient min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1380px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2.5rem] border border-[var(--slot4-border)] bg-white/78 p-6 shadow-[0_30px_90px_rgba(24,50,74,0.10)] backdrop-blur md:grid-cols-[0.84fr_1.16fr] lg:p-10">
            <div>
              <span className="ig-section-kicker">{pagesContent.search.hero.badge}</span>
              <h1 className="mt-5 font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-end rounded-[2rem] border border-[var(--slot4-border)] bg-[var(--slot4-panel-bg)] p-4 sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--slot4-border)] bg-white px-4 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-[1.2rem] border border-[var(--slot4-border)] bg-white px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="ig-select text-sm font-black">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-[1.1rem] bg-[var(--slot4-page-text)] px-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-dark-text)] transition hover:-translate-y-0.5" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="mt-2 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/sbm" className="ig-outline-button">Browse bookmarks <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--slot4-border)] bg-white/70 p-10 text-center">
              <p className="font-[family:var(--slot4-font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">No matching posts found.</p>
              <p className="mt-3 text-sm leading-8 text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
