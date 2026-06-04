import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium bookmark discovery and curated saves',
      description: 'Explore curated saves, elegant archives, and polished resource discovery through a premium social bookmarking experience.',
      openGraphTitle: 'Premium bookmark discovery and curated saves',
      openGraphDescription: 'Browse curated saves and refined discovery pages built for social bookmarking.',
      keywords: ['social bookmarking', 'curated links', 'resource discovery', 'saved resources'],
    },
    hero: {
      badge: 'Curated bookmarks and polished discovery',
      title: ['A premium home for', 'saved links, reference pages, and elegant discovery.'],
      description:
        'Explore bookmark collections, supporting visuals, and route-safe content through a classic editorial interface designed for calm, repeatable browsing.',
      primaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Search resources', href: '/search' },
      searchPlaceholder: 'Search saved links, topics, and resource pages',
      focusLabel: 'Focus',
      featureCardBadge: 'curated bookmark spotlight',
      featureCardTitle: 'Featured saves shape the tone of the homepage.',
      featureCardDescription: 'Recent resources stay visible without breaking the original feed or routing behavior.',
    },
    intro: {
      badge: 'About the archive',
      title: 'Built for people who want their saved resources to feel organized, trustworthy, and easy to revisit.',
      paragraphs: [
        'This site brings together bookmarks, supporting content types, and archive pages in one connected visual system.',
        'Instead of scattering saved resources across flat grids, the interface introduces stronger hierarchy, clearer chips, and richer supporting layouts.',
        'Visitors can start from a featured save, a category archive, or a search query and keep discovering useful links without losing context.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Feature-led homepage with a stronger editorial rhythm.',
        'Bookmark cards in multiple silhouettes instead of one repeated grid.',
        'Archive pages built for quick scanning and repeat discovery.',
        'Detail pages that keep original post data working with better framing.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryLink: { label: 'Search resources', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Move through curated saves, search lanes, and detailed bookmark pages from one premium surface.',
      description: 'Explore route-safe archives and bookmark collections without losing the original content flow.',
      primaryCta: { label: 'Browse Bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the collection',
    title: 'A calmer, more refined way to return to useful links.',
    description: `${slot4BrandConfig.siteName} is built to make social bookmarking feel polished, readable, and worth revisiting.`,
    paragraphs: [
      'The platform brings saved links, supporting content types, and archive routes into one connected discovery system.',
      'Visitors can browse by category, explore related saves, and open detail pages that feel intentional instead of improvised.',
      'The design stays premium without losing the practical clarity that a bookmarking site needs.',
    ],
    values: [
      {
        title: 'Curated by design',
        description: 'Strong hierarchy, elegant typography, and varied cards make saved resources easier to trust and revisit.',
      },
      {
        title: 'Connected discovery',
        description: 'Bookmarks, visuals, listings, documents, and profiles remain linked through one consistent visual language.',
      },
      {
        title: 'Built for repeat visits',
        description: 'Search, archive filters, and detail pages are shaped to support ongoing discovery rather than one-time browsing.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Talk to the discovery desk behind the archive.',
    description:
      'Reach out about collections, publishing lanes, browsing questions, or ideas for improving how the archive surfaces useful resources.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find saved resources, visuals, and supporting posts faster.',
      description: 'Use keywords, categories, and content types to move through every active section with less noise.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and prepare content for the active sections on this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create polished content for every active section.',
      description: 'Choose a content type, add the details, and save a draft through the redesigned submission surface.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Return to your bookmark publishing workspace.',
      description: 'Login to continue browsing, managing submissions, and creating new posts from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create an account and start building new collections.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
