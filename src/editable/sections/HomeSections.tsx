import Link from 'next/link'
import { ArrowRight, Bookmark, Compass, Layers3, Search, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import {
  ArticleListCard,
  BookmarkEditorialCard,
  CompactIndexCard,
  EditorialFeatureCard,
  RailPostCard,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function HeroVisual({
  post,
  href,
  label,
}: {
  post?: SitePost
  href: string
  label: string
}) {
  const image = getEditablePostImage(post)
  return (
    <div className="relative min-h-[420px] lg:min-h-[620px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[92%] w-[92%] rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(125,170,203,0.26)_0%,rgba(125,170,203,0.08)_38%,transparent_68%)]" />
      </div>
      <div className="absolute right-[9%] top-[7%] h-24 w-24 rounded-full border border-[var(--slot4-border)] bg-white/55 blur-sm" />
      <div className="absolute left-[10%] top-[18%] h-36 w-36 rounded-full border border-[var(--slot4-border)] bg-[rgba(125,170,203,0.14)] blur-sm" />
      <Link href={href} className="absolute inset-x-[8%] bottom-0 top-[8%] overflow-hidden rounded-[2.4rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(125,170,203,0.18)]">
        <div className="ig-wave-lines absolute inset-[13%] rounded-full opacity-70" />
        <img src={image} alt={post?.title || label} className="absolute bottom-0 right-0 h-[92%] w-auto max-w-[88%] object-contain" />
      </Link>
      <div className="absolute left-0 top-[10%] max-w-[240px] rounded-[1.7rem] border border-[var(--slot4-border)] bg-white/90 p-4 shadow-[0_16px_46px_rgba(24,50,74,0.12)]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Featured today</p>
        <p className="mt-2 font-[family:var(--slot4-font-display)] text-2xl font-bold leading-tight text-[var(--slot4-page-text)]">
          {post?.title || label}
        </p>
      </div>
      <div className="absolute bottom-[10%] right-0 max-w-[260px] rounded-[1.7rem] border border-[var(--slot4-border)] bg-white/90 p-4 shadow-[0_16px_46px_rgba(24,50,74,0.12)]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Discovery note</p>
        <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
          Thoughtful saves, polished presentation, and direct paths back to useful links.
        </p>
      </div>
    </div>
  )
}

function OverlapShowcase({ posts, primaryRoute, primaryTask }: HomeSectionProps) {
  const top = posts[1] || posts[0]
  const bottom = posts[2] || posts[1] || posts[0]
  const featurePoints = [
    { icon: ShieldCheck, title: 'Trusted shelves', body: 'Save links with clearer metadata, dependable categories, and a calmer visual rhythm.' },
    { icon: Layers3, title: 'Elegant organization', body: 'Move from one collection to the next without clutter or dead-end pages.' },
    { icon: Compass, title: 'Faster rediscovery', body: 'Return to previously saved resources through clear sections, chips, and related routes.' },
  ]

  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY} grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center`}>
        <div className="relative min-h-[420px]">
          <div className="absolute left-[-20%] top-[28%] hidden h-48 w-[60%] rounded-r-full bg-[linear-gradient(90deg,rgba(125,170,203,0.28),transparent)] lg:block" />
          <div className="absolute left-0 top-0 h-[57%] w-[68%] overflow-hidden rounded-[2rem] border border-[var(--slot4-border)] bg-[var(--slot4-media-bg)] shadow-[0_18px_50px_rgba(24,50,74,0.12)]">
            <img src={getEditablePostImage(top)} alt={top?.title || 'Featured resource'} className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-[18%] h-[60%] w-[64%] overflow-hidden rounded-[2rem] border border-[var(--slot4-border)] bg-[var(--slot4-media-bg)] shadow-[0_22px_60px_rgba(24,50,74,0.14)]">
            <img src={getEditablePostImage(bottom)} alt={bottom?.title || 'Saved collection'} className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-0 top-[26%] max-w-[210px] rounded-[1.8rem] bg-white p-6 shadow-[0_22px_50px_rgba(24,50,74,0.14)]">
            <p className="font-[family:var(--slot4-font-display)] text-4xl font-bold text-[var(--slot4-page-text)]">45+</p>
            <p className="mt-2 text-base font-bold text-[var(--slot4-page-text)]">Collections styled for clear, premium browsing</p>
          </div>
        </div>

        <div>
          <span className="ig-section-kicker">Refined bookmarking</span>
          <h2 className="mt-6 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
            We turn saved links into a polished reading and discovery experience.
          </h2>
          <p className={`mt-6 max-w-2xl text-base leading-8 ${pal.mutedText}`}>
            Instead of feeling like a pile of bookmarks, the archive now behaves like a curated publication. Visitors can scan faster, trust what they open, and keep moving through related saves without friction.
          </p>
          <div className="mt-8 grid gap-5">
            {featurePoints.map((item) => (
              <div key={item.title} className="grid gap-3 sm:grid-cols-[54px_minmax(0,1fr)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{item.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${pal.mutedText}`}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href={primaryRoute} className={dc.button.secondary}>
              Browse {taskLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitCard({
  title,
  body,
  icon: Icon,
  strong = false,
}: {
  title: string
  body: string
  icon: typeof Sparkles
  strong?: boolean
}) {
  return (
    <article
      className={`rounded-[2rem] border border-[var(--slot4-border)] p-7 shadow-[0_18px_54px_rgba(24,50,74,0.08)] transition hover:-translate-y-1 ${
        strong ? 'bg-[linear-gradient(145deg,#3f4fc0_0%,#7b45c6_28%,#ce4b8b_100%)] text-white' : 'bg-white'
      }`}
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-[1.5rem] ${strong ? 'bg-white/12' : 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]'}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className={`mt-7 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-[1.02] tracking-[-0.03em] ${strong ? 'text-white' : 'text-[var(--slot4-page-text)]'}`}>
        {title}
      </h3>
      <p className={`mt-4 text-sm leading-8 ${strong ? 'text-white/84' : 'text-[var(--slot4-muted-text)]'}`}>{body}</p>
    </article>
  )
}

function ProcessCard({
  step,
  title,
  body,
  icon: Icon,
}: {
  step: string
  title: string
  body: string
  icon: typeof Bookmark
}) {
  return (
    <article className="relative overflow-hidden rounded-[1.9rem] border border-[var(--slot4-border)] bg-white p-7 shadow-[0_16px_40px_rgba(24,50,74,0.08)]">
      <span className="absolute right-4 top-4 font-[family:var(--slot4-font-display)] text-7xl font-bold text-[rgba(24,50,74,0.06)]">
        {step}
      </span>
      <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-[var(--slot4-border)] bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="relative mt-6 font-[family:var(--slot4-font-display)] text-3xl font-bold leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">
        {title}
      </h3>
      <p className="relative mt-4 text-sm leading-8 text-[var(--slot4-muted-text)]">{body}</p>
    </article>
  )
}

function FaqItem({ title, body, open = false }: { title: string; body: string; open?: boolean }) {
  return (
    <details
      open={open}
      className="rounded-[1.6rem] border border-[var(--slot4-border)] bg-white/86 p-5 shadow-[0_14px_34px_rgba(24,50,74,0.06)]"
    >
      <summary className="cursor-pointer list-none pr-8 font-[family:var(--slot4-font-body)] text-lg font-extrabold text-[var(--slot4-page-text)] marker:hidden">
        {title}
      </summary>
      <p className="mt-4 text-sm leading-8 text-[var(--slot4-muted-text)]">{body}</p>
    </details>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const lead = posts[0]
  return (
    <section className="ig-shell-gradient relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 top-[32%] ig-grid-fade opacity-35" />
      <div className={`${dc.shell.section} relative grid gap-14 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20`}>
        <div>
          <span className="ig-section-kicker">{pagesContent.home.hero.badge}</span>
          <h1 className={`${dc.type.heroTitle} mt-6 max-w-2xl`}>
            Curated discovery for <span className="text-[var(--slot4-accent)]">future-ready</span> reading lists.
          </h1>
          <p className={`mt-6 max-w-xl text-lg leading-9 ${pal.mutedText}`}>
            {heroTitle}. Explore saved resources, elegant archives, and source-ready collections through a cleaner premium interface built for repeat visits.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>
              Browse {taskLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className={dc.button.secondary}>
              Schedule a discovery note
            </Link>
          </div>
        </div>

        <HeroVisual post={lead} href={lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute} label={taskLabel(primaryTask)} />
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  if (!railPosts.length) return null

  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-16 sm:py-18`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="ig-section-kicker">Featured saves</span>
            <h2 className="mt-4 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
              Daily bookmark highlights
            </h2>
          </div>
          <Link href={primaryRoute} className="ig-outline-button hidden sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {railPosts.map((post, index) => (
            <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit(props: HomeSectionProps) {
  const { primaryTask, primaryRoute, posts } = props
  const feature = posts[0]
  const picks = posts.slice(1, 5)
  return (
    <>
      <OverlapShowcase {...props} />

      <section className="bg-[var(--slot4-lavender)]">
        <div className={`${dc.shell.section} ${dc.shell.sectionY} grid gap-10 lg:grid-cols-[0.92fr_1.08fr]`}>
          <div>
            <span className="ig-section-kicker">Why choose this layout</span>
            <h2 className="mt-6 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
              A classic premium edition of social bookmarking.
            </h2>
            <p className={`mt-6 max-w-xl text-base leading-8 ${pal.mutedText}`}>
              Designed to feel trustworthy and elevated, this structure balances generous space, elegant typography, and strong browsing cues without sacrificing speed or post compatibility.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href={primaryRoute} className={dc.button.primary}>
                Open the archive
              </Link>
              <Link href="/search" className="ig-outline-button">
                Search the site
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <BenefitCard title="Curated reading lanes" body="Readers can move from one saved resource to the next through clear, premium card groupings." icon={Bookmark} strong />
            <BenefitCard title="Search-first browsing" body="The archive favors quick scanning, clearer metadata, and softer visual noise." icon={Search} />
            <BenefitCard title="Collection trust cues" body="Category labels, related links, and route-safe actions keep discovery grounded." icon={ShieldCheck} />
            <BenefitCard title="Faster repeat visits" body="Visitors can rediscover useful links without relearning the interface each time." icon={Zap} strong />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="ig-section-kicker justify-center">Process</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
              How discovery works here
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <ProcessCard step="1" title="Pick a lane" body="Start with a category, archive, or featured rail that matches what you want to revisit." icon={Compass} />
            <ProcessCard step="2" title="Review the save" body="Open a richer card with summary, context, and safer navigation to the original source." icon={Bookmark} />
            <ProcessCard step="3" title="Refine by topic" body="Use chips, search, and archive filters to keep tightening the result set." icon={Layers3} />
            <ProcessCard step="4" title="Keep exploring" body="Related posts and varied cards guide readers deeper without overwhelming the page." icon={Star} />
          </div>
        </div>
      </section>

      {feature ? (
        <section className="bg-[var(--slot4-gray)]">
          <div className={`${dc.shell.section} ${dc.shell.sectionY} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
            <div>
              <span className="ig-section-kicker">Latest spotlight</span>
              <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
                Saved pages that feel worth returning to
              </h2>
              <p className={`mt-6 max-w-xl text-base leading-8 ${pal.mutedText}`}>
                The front page keeps a high-value featured resource in view, then supports it with varied compact and horizontal formats for faster scanning.
              </p>
              <div className="mt-8 grid gap-4">
                {picks.slice(0, 2).map((post, index) => (
                  <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>

            <div className="relative">
              <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Lead collection" />
              <div className="absolute -bottom-6 left-6 rounded-[1.6rem] bg-white px-6 py-5 shadow-[0_20px_44px_rgba(24,50,74,0.14)]">
                <p className="font-[family:var(--slot4-font-display)] text-5xl font-bold text-[var(--slot4-page-text)]">76</p>
                <p className="text-sm font-bold text-[var(--slot4-muted-text)]">ready-to-open resources</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const stream = timeSections.flatMap((section) => section.posts).filter(Boolean)
  const working = stream.length ? stream : posts
  const storyRows = working.slice(0, 3)
  const compactRows = working.slice(3, 9)
  const faqItems = [
    {
      title: 'What kinds of links and resources fit here best?',
      body: 'Useful references, explainers, tools, and source pages work especially well because the layout gives them summary, structure, and related discovery.',
    },
    {
      title: 'Can visitors browse even when a post has little media?',
      body: 'Yes. The card system is built to remain strong with text-first posts, missing thumbnails, or limited summaries.',
    },
    {
      title: 'Does the archive still keep the original routes working?',
      body: 'Yes. The visual redesign keeps the existing route structure, task support, and dynamic post linking intact.',
    },
    {
      title: 'Is the interface still usable on mobile?',
      body: 'Yes. The layout compresses into stacked sections, scrollable rails, and cleaner action spacing for phones and tablets.',
    },
  ]

  return (
    <>
      <section className="bg-white">
        <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="ig-section-kicker justify-center">Case studies</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
              Success stories from the archive
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {storyRows.map((post) => (
              <BookmarkEditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--slot4-lavender)]">
        <div className={`${dc.shell.section} ${dc.shell.sectionY} grid gap-10 lg:grid-cols-[0.78fr_1.22fr]`}>
          <div>
            <span className="ig-section-kicker">FAQ</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
              Common questions about this discovery flow
            </h2>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item, index) => (
              <FaqItem key={item.title} title={item.title} body={item.body} open={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-16 sm:py-20`}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="ig-section-kicker justify-center">Popular updates</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
              Latest from our bookmark journal
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {compactRows.slice(0, 3).map((post, index) => (
              <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-panel-bg)]">
      <div className={`${dc.shell.section} py-18 sm:py-20`}>
        <div className="relative overflow-hidden rounded-[2.4rem] border border-[var(--slot4-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.86)_0%,rgba(232,219,179,0.72)_100%)] p-8 text-center shadow-[0_22px_60px_rgba(24,50,74,0.10)] sm:p-12">
          <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-[rgba(125,170,203,0.16)] blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(206,38,38,0.10)] blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="ig-section-kicker justify-center">Start exploring</span>
            <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl">
              Save-worthy resources deserve a front page with real presence.
            </h2>
            <p className={`mt-5 text-lg leading-9 ${pal.mutedText}`}>
              Explore clean collections, stronger archive pages, and route-safe discovery across the whole site.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={dc.button.primary}>
                Contact us
              </Link>
              <Link href="/search" className={dc.button.secondary}>
                Search the archive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
