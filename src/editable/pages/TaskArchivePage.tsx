import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Camera,
  Download,
  FileText,
  Filter,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Search,
  UserRound,
} from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import {
  ArticleListCard,
  BookmarkEditorialCard,
  CompactIndexCard,
  EditorialFeatureCard,
  RailPostCard,
  getEditableCategory,
  getEditableExcerpt,
  getEditableWebsite,
} from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media)
    ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url))
    : []
  const images = Array.isArray(content.images)
    ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url))
    : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
const getSummary = (post: SitePost) =>
  stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<
  TaskKey,
  { icon: typeof FileText; badge: string; intro: string; promise: string; tone: string }
> = {
  article: {
    icon: FileText,
    badge: 'Journal',
    intro: 'Editorial stories deserve strong spacing, calm hierarchy, and image-led pacing.',
    promise: 'Long-form reading cards, horizontal story rows, and refined supporting tiles.',
    tone: 'bg-[linear-gradient(145deg,#11314b_0%,#305a7e_100%)] text-white',
  },
  listing: {
    icon: Building2,
    badge: 'Directory',
    intro: 'Business discovery works best when identity, location, and proof points are visible immediately.',
    promise: 'Practical comparison cards with softer luxury framing.',
    tone: 'bg-[linear-gradient(145deg,#14324b_0%,#6f96b5_100%)] text-white',
  },
  classified: {
    icon: Megaphone,
    badge: 'Notice',
    intro: 'Classified posts should stay fast to scan while still feeling polished.',
    promise: 'Offer-led cards with pricing, location, and quick action cues.',
    tone: 'bg-[linear-gradient(145deg,#18324a_0%,#ce2626_100%)] text-white',
  },
  image: {
    icon: Camera,
    badge: 'Visual',
    intro: 'Image browsing should feel like a gallery with stronger media presence and cleaner captions.',
    promise: 'Masonry-inspired image cards and premium visual framing.',
    tone: 'bg-[linear-gradient(145deg,#18324a_0%,#7daacb_100%)] text-white',
  },
  sbm: {
    icon: Bookmark,
    badge: 'Bookmark',
    intro: 'Saved resources feel more valuable when organized like a refined collection instead of a generic list.',
    promise: 'Shelf-style bookmarks, featured saves, and elegant utility-focused cards.',
    tone: 'bg-[linear-gradient(145deg,#18324a_0%,#547895_100%)] text-white',
  },
  pdf: {
    icon: Download,
    badge: 'Library',
    intro: 'Document archives need clear file cues, quick entry points, and graceful summaries.',
    promise: 'Document-forward cards with archive clarity and dependable navigation.',
    tone: 'bg-[linear-gradient(145deg,#18324a_0%,#7d95ad_100%)] text-white',
  },
  profile: {
    icon: UserRound,
    badge: 'Profile',
    intro: 'Identity pages should feel composed, trusted, and easy to browse.',
    promise: 'Portrait-led layouts with cleaner role and summary treatment.',
    tone: 'bg-[linear-gradient(145deg,#18324a_0%,#7daacb_100%)] text-white',
  },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return (
    <TaskArchiveView
      task={task}
      posts={posts}
      pagination={pagination}
      category={category}
      basePath={basePath || taskConfig?.route || `/${task}`}
    />
  )
}

export function TaskArchiveView({
  task,
  posts,
  pagination,
  category,
  basePath,
}: {
  task: TaskKey
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  basePath: string
}) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const deck = taskDeck[task]
  const Icon = deck.icon
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const archiveVars = {
    '--archive-bg': 'var(--slot4-page-bg)',
    '--archive-text': 'var(--slot4-page-text)',
    '--archive-surface': 'rgba(255,255,255,0.78)',
    '--archive-accent': 'var(--slot4-accent)',
  } as CSSProperties
  const categoryLabel =
    category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts[0]
  const secondary = posts.slice(1, 4)
  const compact = posts.slice(4, 10)
  const remainder = posts.slice(10)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="ig-shell-gradient min-h-screen bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[1380px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-18">
          <div className={`overflow-hidden rounded-[2.5rem] border border-[var(--slot4-border)] p-7 shadow-[0_28px_70px_rgba(24,50,74,0.14)] sm:p-10 ${deck.tone}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em]">
              <Icon className="h-4 w-4" /> {deck.badge}
            </div>
            <h1 className="mt-6 max-w-4xl font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl">
              {voice?.headline || `Browse ${label}`}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82">
              {voice?.description || SITE_CONFIG.description}
            </p>
            <div className="mt-6 rounded-[1.6rem] border border-white/14 bg-white/8 p-5 text-sm leading-8 text-white/82">
              {deck.intro} {deck.promise}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="rounded-full bg-white px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
                Browse all
              </Link>
              <Link href="/search" className="rounded-full border border-white/16 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em]">
                Search posts
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <form action={basePath} className="ig-panel rounded-[2rem] p-5">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
                <Filter className="h-4 w-4" /> Filter archive
              </div>
              <div className="mt-4 grid gap-3">
                <select name="category" defaultValue={category} className="ig-select text-sm font-bold">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button className="inline-flex h-12 items-center justify-center rounded-[1.1rem] bg-[var(--slot4-page-text)] text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-dark-text)]">
                  Apply filter
                </button>
              </div>
              <p className="mt-3 text-xs font-bold text-[var(--slot4-soft-muted-text)]">Showing: {categoryLabel}</p>
            </form>

            <div className="ig-panel rounded-[2rem] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
                    Archive note
                  </p>
                  <h2 className="mt-2 font-[family:var(--slot4-font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">
                    {label} with calm structure
                  </h2>
                </div>
                <Search className="h-5 w-5 text-[var(--slot4-muted-text)]" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="ig-pill">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <>
              {featured ? (
                <div className="mb-6">
                  <ArchiveFeatureCard task={task} post={featured} href={`${basePath}/${featured.slug}`} />
                </div>
              ) : null}

              {secondary.length ? (
                <div className="grid gap-5 lg:grid-cols-3">
                  {secondary.map((post, index) => (
                    <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />
                  ))}
                </div>
              ) : null}

              {compact.length ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {compact.map((post, index) =>
                    task === 'sbm' ? (
                      <CompactIndexCard
                        key={post.id || post.slug}
                        post={post}
                        href={`${basePath}/${post.slug}`}
                        index={index}
                      />
                    ) : (
                      <ArchiveCompactCard
                        key={post.id || post.slug}
                        post={post}
                        task={task}
                        href={`${basePath}/${post.slug}`}
                        index={index}
                      />
                    )
                  )}
                </div>
              ) : null}

              {remainder.length ? (
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {remainder.map((post, index) => (
                    <ArchiveWideCard
                      key={post.id || post.slug}
                      post={post}
                      task={task}
                      href={`${basePath}/${post.slug}`}
                      index={index + 10}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--slot4-border)] bg-white/68 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
              <h2 className="mt-4 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">
                No posts found
              </h2>
              <p className="mt-3 text-sm leading-8 text-[var(--slot4-muted-text)]">
                Try another category or return when new content has been published.
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? (
              <Link href={pageHref(basePath, category, page - 1)} className="ig-outline-button">
                Previous
              </Link>
            ) : null}
            <span className="rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-dark-text)]">
              Page {page} of {pagination.totalPages || 1}
            </span>
            {pagination.hasNextPage ? (
              <Link href={pageHref(basePath, category, page + 1)} className="ig-outline-button">
                Next
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchiveFeatureCard({ task, post, href }: { task: TaskKey; post: SitePost; href: string }) {
  if (task === 'sbm') {
    return <EditorialFeatureCard post={post} href={href} label="Lead bookmark" />
  }
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2.3rem] border border-[var(--slot4-border)] bg-white shadow-[0_26px_70px_rgba(24,50,74,0.12)]">
      <div className="grid min-h-[380px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[260px] bg-[var(--slot4-media-bg)]">
          <img src={getImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-col justify-between p-7 sm:p-10">
          <div>
            <span className="ig-pill bg-[var(--slot4-panel-bg)]">{getEditableCategory(post)}</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 220)}</p>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
            Open detail <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArchiveCompactCard({
  post,
  task,
  href,
  index,
}: {
  post: SitePost
  task: TaskKey
  href: string
  index: number
}) {
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <CompactIndexCard post={post} href={href} index={index} />
}

function ArchiveWideCard({
  post,
  task,
  href,
  index,
}: {
  post: SitePost
  task: TaskKey
  href: string
  index: number
}) {
  if (task === 'sbm') return <BookmarkEditorialCard post={post} href={href} />
  if (task === 'article') return <ArticleListCard post={post} href={href} index={index} />
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleListCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return <RailPostCard post={post} href={href} index={index} />
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--slot4-border)] bg-white p-5 shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)] ring-1 ring-[var(--slot4-border)]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="ig-pill bg-[var(--slot4-panel-bg)]">Directory</span>
          {location ? (
            <span className="ig-pill">
              <MapPin className="h-3 w-3" /> {location}
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-soft-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--slot4-border)] bg-white shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[linear-gradient(145deg,#18324a_0%,#ce2626_100%)] p-5 text-[var(--slot4-dark-text)]">
          <span className="rounded-full bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[1] tracking-[-0.05em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold opacity-80">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">
            View listing <ArrowRight className="h-4 w-4" />
          </p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] border border-[var(--slot4-border)] bg-white shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
          <ImageIcon className="h-3 w-3" /> Visual
        </div>
        <h2 className="mt-4 line-clamp-3 font-[family:var(--slot4-font-display)] text-2xl font-bold leading-[1] tracking-[-0.04em] text-[var(--slot4-page-text)]">
          {post.title}
        </h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getEditableWebsite(post)
  return (
    <Link href={href} className="group block rounded-[1.8rem] border border-[var(--slot4-border)] bg-white p-6 shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-[var(--slot4-border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
          Save {String(index + 1).padStart(2, '0')}
        </span>
        <Bookmark className="h-5 w-5 text-[var(--slot4-accent)]" />
      </div>
      <h2 className="mt-8 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
        {post.title}
      </h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      {website ? (
        <p className="mt-5 truncate text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">
          {website.replace(/^https?:\/\//, '')}
        </p>
      ) : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="rounded-[2rem] border border-[var(--slot4-border)] bg-white p-6 shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-page-text)] p-5 text-[var(--slot4-dark-text)]">
          <FileText className="h-8 w-8" />
        </div>
        <span className="ig-pill bg-[var(--slot4-panel-bg)]">{getEditableCategory(post)}</span>
      </div>
      <h2 className="mt-8 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
        {post.title}
      </h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">
        Open document <Download className="h-4 w-4" />
      </p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="rounded-[2rem] border border-[var(--slot4-border)] bg-white p-6 text-center shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.14)]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-media-bg)] ring-1 ring-[var(--slot4-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-2xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
        {post.title}
      </h2>
      {role ? <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
    </Link>
  )
}
