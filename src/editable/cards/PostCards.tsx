import Link from 'next/link'
import { ArrowRight, Bookmark, Clock3, ExternalLink } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const featuredImage = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  const image = typeof content.image === 'string' ? content.image : ''
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || featuredImage || image || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function getEditableWebsite(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (
    (typeof content.website === 'string' && content.website) ||
    (typeof content.url === 'string' && content.url) ||
    (typeof content.link === 'string' && content.link) ||
    ''
  )
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({
  post,
  href,
  label = 'Featured collection',
}: {
  post: SitePost
  href: string
  label?: string
}) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="grid min-h-[420px] gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between p-7 sm:p-9">
          <div>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{label}</p>
            <h3 className="mt-4 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
              {post.title}
            </h3>
            <p className={`mt-5 max-w-xl text-sm leading-8 ${pal.mutedText}`}>{getEditableExcerpt(post, 210)}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="ig-pill">{getEditableCategory(post)}</span>
            <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
              Open collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img
            src={getEditablePostImage(post)}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,50,74,0.08),rgba(24,50,74,0.28))]" />
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} aspect-[5/4]`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
          Save {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-3 font-[family:var(--slot4-font-display)] text-[1.7rem] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-page-text)]">
          {post.title}
        </h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-xs font-black text-[var(--slot4-dark-text)]">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 font-[family:var(--slot4-font-display)] text-2xl font-bold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-page-text)]">
            {post.title}
          </h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getEditableWebsite(post)
  return (
    <Link
      href={href}
      className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[250px_minmax(0,1fr)]`}
    >
      <div className={`${dc.media.frame} aspect-[16/11] sm:aspect-auto sm:min-h-[220px]`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Editor pick {String(index + 1).padStart(2, '0')}</p>
          <span className="ig-pill bg-[var(--slot4-panel-bg)]">{getEditableCategory(post)}</span>
        </div>
        <h2 className="mt-4 line-clamp-3 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
          {post.title}
        </h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-8 ${pal.softMutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
            Read now <ArrowRight className="h-4 w-4" />
          </span>
          {website ? (
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">
              <ExternalLink className="h-3.5 w-3.5" /> Linked source
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export function BookmarkEditorialCard({ post, href }: { post: SitePost; href: string }) {
  const website = getEditableWebsite(post)
  return (
    <Link href={href} className={`group block rounded-[2rem] border ${pal.border} bg-white p-6 ${pal.shadow} ${dc.motion.lift}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="ig-pill bg-[var(--slot4-panel-bg)]">
          <Bookmark className="h-3.5 w-3.5" /> {getEditableCategory(post)}
        </span>
        {website ? <ExternalLink className="h-4 w-4 text-[var(--slot4-muted-text)]" /> : null}
      </div>
      <h3 className="mt-6 line-clamp-3 font-[family:var(--slot4-font-display)] text-[2rem] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)]">
        {post.title}
      </h3>
      <p className={`mt-4 line-clamp-4 text-sm leading-8 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
      {website ? (
        <p className="mt-5 truncate text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">
          {website.replace(/^https?:\/\//, '')}
        </p>
      ) : null}
    </Link>
  )
}
