import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || '',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Bookmarks', href: '/sbm' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/sbm' },
      secondary: { label: 'Contact desk', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Premium social bookmarking',
    description:
      'A polished discovery surface for saved resources, related archives, supporting visuals, and useful public links.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Search', href: '/search' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'Comments', href: '/comments' },
          { label: 'Create', href: '/create' },
        ],
      },
    ],
    bottomNote: 'Designed for graceful discovery and repeat visits.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
