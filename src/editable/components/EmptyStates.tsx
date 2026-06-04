import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-[2rem] border border-[var(--slot4-border)] bg-white/76 p-8 text-center shadow-[0_20px_56px_rgba(24,50,74,0.08)]', className)}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-[family:var(--slot4-font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-[var(--slot4-muted-text)]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--slot4-border)] bg-white px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(24,50,74,0.12)]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} from the master panel will appear here automatically. The page layout stays ready even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
