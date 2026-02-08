import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const guidesDirectory = path.join(process.cwd(), 'app/guides/content')

export interface Guide {
  slug: string
  title: string
  description: string
  content: string
  image?: string
  published: string
  keywords: string[]
  topic?: string  // Links to parent topic hub
  relatedConcepts: string[]  // Related guide slugs
  url: string
}

/**
 * Get all guides
 */
export async function getAllGuides(): Promise<Guide[]> {
  if (!fs.existsSync(guidesDirectory)) {
    fs.mkdirSync(guidesDirectory, { recursive: true })
    return []
  }

  const files = fs.readdirSync(guidesDirectory).filter(file => file.endsWith('.md'))

  const guides = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '')
      return await getGuide(slug)
    })
  )

  return guides.filter(guide => guide !== null) as Guide[]
}

/**
 * Get a single guide by slug
 */
export async function getGuide(slug: string): Promise<Guide | null> {
  try {
    const filePath = path.join(guidesDirectory, `${slug}.md`)

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

    const guide: Guide = {
      slug,
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      content: processedContent.toString(),
      image: matterResult.data.image,
      published: matterResult.data.published || new Date().toISOString(),
      keywords: matterResult.data.keywords || [],
      topic: matterResult.data.topic,  // Parent topic hub slug
      relatedConcepts: matterResult.data.relatedConcepts || [],
      url: `/guides/${slug}`,
    }

    return guide
  } catch (error) {
    console.error('Error reading guide:', error)
    return null
  }
}

/**
 * Get guides for a specific topic
 */
export async function getGuidesByTopic(topicSlug: string): Promise<Guide[]> {
  const allGuides = await getAllGuides()
  return allGuides.filter(guide => guide.topic === topicSlug)
}

/**
 * Get related guides by concept
 */
export async function getRelatedGuides(currentSlug: string): Promise<Guide[]> {
  const currentGuide = await getGuide(currentSlug)

  if (!currentGuide) {
    return []
  }

  const allGuides = await getAllGuides()

  // Get guides listed in relatedConcepts
  const relatedByIds = allGuides.filter(guide =>
    currentGuide.relatedConcepts.includes(guide.slug) && guide.slug !== currentSlug
  )

  // Also find guides that mention this guide in their relatedConcepts (bidirectional)
  const relatedByReference = allGuides.filter(guide =>
    guide.relatedConcepts.includes(currentSlug) && guide.slug !== currentSlug
  )

  // Combine and deduplicate
  const allRelated = [...relatedByIds, ...relatedByReference]
  const uniqueRelated = Array.from(new Map(allRelated.map(guide => [guide.slug, guide])).values())

  return uniqueRelated
}

/**
 * Get all guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) {
    return []
  }

  return fs.readdirSync(guidesDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}
