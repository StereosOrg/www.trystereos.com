import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getAllIndustryGuides } from '@/lib/industries'
import { getAllTopicHubs } from '@/lib/topic-hubs'
import { getAllGuideSlugs } from '@/lib/guides'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.trystereos.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/webinars`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/government`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/startups`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/monthly-retainer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dpa`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic blog posts
  const posts = await getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(post.published),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic industry guides
  const industries = await getAllIndustryGuides()
  const industryPages: MetadataRoute.Sitemap = industries.map((guide) => ({
    url: `${baseUrl}${guide.url}`,
    lastModified: new Date(guide.published),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Topic hubs (pillar pages)
  const topicHubs = await getAllTopicHubs()
  const hubPages: MetadataRoute.Sitemap = topicHubs.map((hub) => ({
    url: `${baseUrl}${hub.url}`,
    lastModified: new Date(hub.published),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Topic hub subpages
  const subpages: MetadataRoute.Sitemap = topicHubs.flatMap((hub) =>
    hub.subpages.map((subpage) => ({
      url: `${baseUrl}${subpage.url}`,
      lastModified: new Date(subpage.published),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  )

  // All guides
  const guideSlugs = getAllGuideSlugs()
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...industryPages, ...hubPages, ...subpages, ...guidePages]
}
