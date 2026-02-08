import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const topicsDirectory = path.join(process.cwd(), 'app/topics/content')

export interface TopicSubpage {
  id: string
  slug: string
  title: string
  description: string
  content: string
  relatedConcepts: string[] // IDs of related subpages for aggressive interlinking
  keywords: string[]
  published: string
  image?: string
  url: string
  hubSlug: string
}

export interface TopicHub {
  id: string
  slug: string
  title: string
  description: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  image: string
  published: string

  // Main pillar content sections
  overview: string
  keyBenefits: string
  howItWorks: string
  bestPractices: string

  // SEO
  keywords: string[]

  // All subpages in this hub
  subpages: TopicSubpage[]

  url: string
}

/**
 * Get all topic hubs
 */
export async function getAllTopicHubs(): Promise<TopicHub[]> {
  if (!fs.existsSync(topicsDirectory)) {
    fs.mkdirSync(topicsDirectory, { recursive: true })
    return []
  }

  const hubDirs = fs.readdirSync(topicsDirectory).filter(item => {
    const fullPath = path.join(topicsDirectory, item)
    return fs.statSync(fullPath).isDirectory()
  })

  const allHubs = await Promise.all(
    hubDirs.map(async (hubDir) => {
      return await getTopicHub(hubDir)
    })
  )

  return allHubs.filter(hub => hub !== null) as TopicHub[]
}

/**
 * Get a single topic hub with all its subpages
 */
export async function getTopicHub(slug: string): Promise<TopicHub | null> {
  try {
    const hubPath = path.join(topicsDirectory, slug, 'pillar.md')

    if (!fs.existsSync(hubPath)) {
      return null
    }

    const fileContents = fs.readFileSync(hubPath, 'utf8')
    const matterResult = matter(fileContents)

    // Process pillar content sections
    const sections = ['overview', 'keyBenefits', 'howItWorks', 'bestPractices']
    const processedSections: Record<string, string> = {}

    for (const section of sections) {
      const sectionContent = matterResult.data[section] || ''
      const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(sectionContent)
      processedSections[section] = processedContent.toString()
    }

    // Load all subpages for this hub
    const subpages = await getHubSubpages(slug)

    const hub: TopicHub = {
      id: slug,
      slug,
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      metaDescription: matterResult.data.metaDescription || '',
      heroTitle: matterResult.data.heroTitle || matterResult.data.title || '',
      heroSubtitle: matterResult.data.heroSubtitle || '',
      image: matterResult.data.image || '/images/block/placeholder-dark-1.svg',
      published: matterResult.data.published || new Date().toISOString(),

      overview: processedSections.overview,
      keyBenefits: processedSections.keyBenefits,
      howItWorks: processedSections.howItWorks,
      bestPractices: processedSections.bestPractices,

      keywords: matterResult.data.keywords || [],
      subpages,
      url: `/topics/${slug}`,
    }

    return hub
  } catch (error) {
    console.error('Error reading topic hub:', error)
    return null
  }
}

/**
 * Get all subpages for a hub
 */
async function getHubSubpages(hubSlug: string): Promise<TopicSubpage[]> {
  const hubDir = path.join(topicsDirectory, hubSlug)

  if (!fs.existsSync(hubDir)) {
    return []
  }

  const files = fs.readdirSync(hubDir).filter(
    file => file.endsWith('.md') && file !== 'pillar.md'
  )

  const subpages = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '')
      return await getSubpage(hubSlug, slug)
    })
  )

  return subpages.filter(page => page !== null) as TopicSubpage[]
}

/**
 * Get a single subpage
 */
export async function getSubpage(hubSlug: string, subpageSlug: string): Promise<TopicSubpage | null> {
  try {
    const filePath = path.join(topicsDirectory, hubSlug, `${subpageSlug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    // Process content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(matterResult.content)

    const subpage: TopicSubpage = {
      id: subpageSlug,
      slug: subpageSlug,
      hubSlug,
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      content: processedContent.toString(),
      relatedConcepts: matterResult.data.relatedConcepts || [],
      keywords: matterResult.data.keywords || [],
      published: matterResult.data.published || new Date().toISOString(),
      image: matterResult.data.image,
      url: `/topics/${hubSlug}/${subpageSlug}`,
    }

    return subpage
  } catch (error) {
    console.error('Error reading subpage:', error)
    return null
  }
}

/**
 * Get related subpages by concept (for aggressive interlinking)
 */
export async function getRelatedSubpages(
  hubSlug: string,
  currentSubpageId: string
): Promise<TopicSubpage[]> {
  const currentSubpage = await getSubpage(hubSlug, currentSubpageId)

  if (!currentSubpage) {
    return []
  }

  const allSubpages = await getHubSubpages(hubSlug)

  // Get subpages listed in relatedConcepts
  const relatedByIds = allSubpages.filter(page =>
    currentSubpage.relatedConcepts.includes(page.id) && page.id !== currentSubpageId
  )

  // Also find subpages that mention this page in their relatedConcepts (bidirectional linking)
  const relatedByReference = allSubpages.filter(page =>
    page.relatedConcepts.includes(currentSubpageId) && page.id !== currentSubpageId
  )

  // Combine and deduplicate
  const allRelated = [...relatedByIds, ...relatedByReference]
  const uniqueRelated = Array.from(new Map(allRelated.map(page => [page.id, page])).values())

  return uniqueRelated
}

/**
 * Get all hub slugs for static generation
 */
export function getAllHubSlugs(): string[] {
  if (!fs.existsSync(topicsDirectory)) {
    return []
  }

  return fs.readdirSync(topicsDirectory).filter(item => {
    const fullPath = path.join(topicsDirectory, item)
    return fs.statSync(fullPath).isDirectory()
  })
}

/**
 * Get all subpage paths for static generation
 */
export function getAllSubpagePaths(): { hub: string; subpage: string }[] {
  if (!fs.existsSync(topicsDirectory)) {
    return []
  }

  const hubSlugs = getAllHubSlugs()
  const paths: { hub: string; subpage: string }[] = []

  hubSlugs.forEach(hubSlug => {
    const subpageSlugs = getHubSubpageSlugs(hubSlug)
    subpageSlugs.forEach(subpageSlug => {
      paths.push({ hub: hubSlug, subpage: subpageSlug })
    })
  })

  return paths
}

/**
 * Get all subpage slugs for a hub
 */
export function getHubSubpageSlugs(hubSlug: string): string[] {
  const hubDir = path.join(topicsDirectory, hubSlug)

  if (!fs.existsSync(hubDir)) {
    return []
  }

  return fs.readdirSync(hubDir)
    .filter(file => file.endsWith('.md') && file !== 'pillar.md')
    .map(file => file.replace(/\.md$/, ''))
}
