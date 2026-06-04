import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#eef3fb',
  '--slot4-page-text': '#18324a',
  '--slot4-panel-bg': '#fffdeb',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5f7386',
  '--slot4-soft-muted-text': '#7f8f9f',
  '--slot4-accent': '#ce2626',
  '--slot4-accent-fill': '#7daacb',
  '--slot4-accent-soft': '#e8dbb3',
  '--slot4-accent-strong': '#18324a',
  '--slot4-dark-bg': '#16324b',
  '--slot4-dark-text': '#fffdeb',
  '--slot4-media-bg': '#dbe7f3',
  '--slot4-cream': '#fffdeb',
  '--slot4-warm': '#f7f2de',
  '--slot4-lavender': '#edf4fb',
  '--slot4-gray': '#f5f7fb',
  '--slot4-border': 'rgba(24, 50, 74, 0.11)',
  '--slot4-border-strong': 'rgba(24, 50, 74, 0.2)',
  '--slot4-body-gradient':
    'radial-gradient(circle at top left, rgba(232,219,179,0.48), transparent 26%), radial-gradient(circle at top right, rgba(125,170,203,0.26), transparent 30%), linear-gradient(180deg, #f9fbff 0%, #eef3fb 42%, #fffdeb 100%)',
  '--slot4-font-display': '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
  '--slot4-font-body': '"Avenir Next", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--slot4-border)]',
  darkBorder: 'border-white/12',
  shadow: 'shadow-[0_20px_60px_rgba(24,50,74,0.10)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(24,50,74,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(24,50,74,0.04),rgba(24,50,74,0.68))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start sm:w-[290px]',
  },
  type: {
    eyebrow:
      'font-[family:var(--slot4-font-body)] text-[11px] font-extrabold uppercase tracking-[0.28em]',
    heroTitle:
      'font-[family:var(--slot4-font-display)] text-5xl font-bold leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[4.9rem]',
    sectionTitle:
      'font-[family:var(--slot4-font-display)] text-4xl font-bold leading-[0.98] tracking-[-0.03em] sm:text-5xl',
    body: 'font-[family:var(--slot4-font-body)] text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} bg-white/72 backdrop-blur`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-strong)] px-8 py-3.5 font-[family:var(--slot4-font-body)] text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--slot4-dark-text)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(24,50,74,0.16)]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--slot4-border)] bg-white/82 px-8 py-3.5 font-[family:var(--slot4-font-body)] text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:bg-white',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-8 py-3.5 font-[family:var(--slot4-font-body)] text-sm font-extrabold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(125,170,203,0.28)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.6rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift:
      'transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,50,74,0.16)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the blue, cream, and ivory luxury palette anchored in editableRootStyle so the whole shell stays coherent.',
  'Preserve dynamic post rendering from existing props and fetchers; never replace the feed with mock content.',
  'Use multiple card silhouettes across home, archive, and detail surfaces to avoid a template look.',
  'Keep homepage storytelling in src/editable/sections/HomeSections.tsx and archive/detail behavior in their route files.',
  'Use postHref() or buildPostUrl() for post links so every supported route continues to work.',
  'Every post surface must survive missing images, missing summaries, and missing categories with graceful fallbacks.',
] as const
