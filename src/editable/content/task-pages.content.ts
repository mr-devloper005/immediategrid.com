import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-form stories presented with cleaner premium structure.',
    description: 'Articles should feel editorial, spacious, and easy to revisit through richer cards and stronger supporting detail pages.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Editorial pacing', 'Long reads', 'Featured stories'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Classified posts arranged for quick decisions and calmer scanning.',
    description: 'Classified content should remain practical and fast while still feeling considered and polished.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize urgency, short summaries, and direct browsing.',
    chips: ['Offers', 'Quick scan', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Social bookmarks arranged like a classic premium archive.',
    description: 'Bookmark pages should feel like curated shelves of useful links, tools, references, and source-ready collections.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated resources need grouping, calm metadata, and direct routes back to the source.',
    chips: ['Collections', 'Resources', 'Bookmark shelves'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles with identity, trust cues, and more graceful discovery.',
    description: 'Profile pages should foreground the person or entity first, then use supporting media and related content to deepen context.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Portrait cards'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'Documents and PDFs displayed like a refined resource library.',
    description: 'PDF pages should feel archival, clear, and immediately useful instead of blending into generic content grids.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear browsing.',
    chips: ['Documents', 'Downloads', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Business listings framed for trust, clarity, and comparison.',
    description: 'Listing pages should highlight identity, location, and direct actions within a premium but practical layout.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Compare', 'Local discovery'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image posts with a stronger gallery-first browsing rhythm.',
    description: 'Image pages should lead with media, softer framing, and layouts that let visuals carry the page.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
