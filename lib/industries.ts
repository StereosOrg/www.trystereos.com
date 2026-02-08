import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const industriesDirectory = path.join(process.cwd(), 'app/industries/content')

export interface IndustryGuide {
  id: string
  slug: string
  title: string
  industry: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  image: string
  published: string
  author: string

  // Content sections - each requires substantial unique content
  overview: string
  challenges: string
  specDrivenApproach: string
  architecturePatterns: string
  caseStudy: string
  technicalDeepDive: string
  benefits: string
  callToAction: string

  // SEO and metadata
  keywords: string[]
  relatedIndustries: string[]

  // Quality metrics (enforced by validation)
  estimatedReadTime: number
  contentQualityScore?: number

  url: string
}

/**
 * Validates that an industry guide meets quality standards
 */
function validateGuideQuality(guide: IndustryGuide): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Minimum content length requirements (in characters)
  const minLengths = {
    overview: 300,
    challenges: 400,
    specDrivenApproach: 500,
    architecturePatterns: 600,
    caseStudy: 500,
    technicalDeepDive: 800,
    benefits: 300,
  }

  // Check each section meets minimum length
  Object.entries(minLengths).forEach(([field, minLength]) => {
    const content = guide[field as keyof IndustryGuide] as string
    const strippedContent = content.replace(/<[^>]*>/g, '').trim()

    if (strippedContent.length < minLength) {
      errors.push(
        `Section "${field}" is too short (${strippedContent.length} chars). ` +
        `Minimum: ${minLength} chars. Add more unique, valuable content.`
      )
    }
  })

  // Ensure we have substantial keywords
  if (guide.keywords.length < 5) {
    errors.push('Need at least 5 relevant keywords')
  }

  // Check for placeholder text (common in thin content)
  const placeholders = ['lorem ipsum', 'TODO', 'TBD', '[insert', 'placeholder']
  const allContent = [
    guide.overview,
    guide.challenges,
    guide.specDrivenApproach,
    guide.architecturePatterns,
    guide.caseStudy,
    guide.technicalDeepDive,
  ].join(' ').toLowerCase()

  placeholders.forEach(placeholder => {
    if (allContent.includes(placeholder.toLowerCase())) {
      errors.push(`Found placeholder text: "${placeholder}". Replace with real content.`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

export async function getAllIndustryGuides(): Promise<IndustryGuide[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(industriesDirectory)) {
    fs.mkdirSync(industriesDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(industriesDirectory)

  const allGuidesData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(industriesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        // Process each section separately
        const sections = [
          'overview',
          'challenges',
          'specDrivenApproach',
          'architecturePatterns',
          'caseStudy',
          'technicalDeepDive',
          'benefits',
          'callToAction',
        ]

        const processedSections: Record<string, string> = {}

        for (const section of sections) {
          const sectionContent = matterResult.data[section] || ''
          const processedContent = await remark()
            .use(html)
            .process(sectionContent)
          processedSections[section] = processedContent.toString()
        }

        const guide: IndustryGuide = {
          id,
          slug: matterResult.data.slug || id,
          title: matterResult.data.title || '',
          industry: matterResult.data.industry || '',
          metaDescription: matterResult.data.metaDescription || '',
          heroTitle: matterResult.data.heroTitle || matterResult.data.title || '',
          heroSubtitle: matterResult.data.heroSubtitle || '',
          image: matterResult.data.image || '/images/block/placeholder-dark-1.svg',
          published: matterResult.data.published || new Date().toISOString(),
          author: matterResult.data.author || 'Atelier Logos Team',

          overview: processedSections.overview,
          challenges: processedSections.challenges,
          specDrivenApproach: processedSections.specDrivenApproach,
          architecturePatterns: processedSections.architecturePatterns,
          caseStudy: processedSections.caseStudy,
          technicalDeepDive: processedSections.technicalDeepDive,
          benefits: processedSections.benefits,
          callToAction: processedSections.callToAction,

          keywords: matterResult.data.keywords || [],
          relatedIndustries: matterResult.data.relatedIndustries || [],
          estimatedReadTime: matterResult.data.estimatedReadTime || 10,

          url: `/industries/${matterResult.data.slug || id}`,
        }

        // Validate quality in development
        if (process.env.NODE_ENV === 'development') {
          const validation = validateGuideQuality(guide)
          if (!validation.valid) {
            console.warn(`⚠️  Quality issues in ${fileName}:`)
            validation.errors.forEach(error => console.warn(`   - ${error}`))
          }
        }

        return guide
      })
  )

  // Sort by date (most recent first)
  return allGuidesData.sort((a, b) => {
    const dateA = new Date(a.published)
    const dateB = new Date(b.published)
    return dateB.getTime() - dateA.getTime()
  })
}

export async function getIndustryGuide(slug: string): Promise<IndustryGuide | null> {
  try {
    const fullPath = path.join(industriesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    // Process each section separately
    const sections = [
      'overview',
      'challenges',
      'specDrivenApproach',
      'architecturePatterns',
      'caseStudy',
      'technicalDeepDive',
      'benefits',
      'callToAction',
    ]

    const processedSections: Record<string, string> = {}

    for (const section of sections) {
      const sectionContent = matterResult.data[section] || ''
      const processedContent = await remark()
        .use(html)
        .process(sectionContent)
      processedSections[section] = processedContent.toString()
    }

    const guide: IndustryGuide = {
      id: slug,
      slug: matterResult.data.slug || slug,
      title: matterResult.data.title || '',
      industry: matterResult.data.industry || '',
      metaDescription: matterResult.data.metaDescription || '',
      heroTitle: matterResult.data.heroTitle || matterResult.data.title || '',
      heroSubtitle: matterResult.data.heroSubtitle || '',
      image: matterResult.data.image || '/images/block/placeholder-dark-1.svg',
      published: matterResult.data.published || new Date().toISOString(),
      author: matterResult.data.author || 'Atelier Logos Team',

      overview: processedSections.overview,
      challenges: processedSections.challenges,
      specDrivenApproach: processedSections.specDrivenApproach,
      architecturePatterns: processedSections.architecturePatterns,
      caseStudy: processedSections.caseStudy,
      technicalDeepDive: processedSections.technicalDeepDive,
      benefits: processedSections.benefits,
      callToAction: processedSections.callToAction,

      keywords: matterResult.data.keywords || [],
      relatedIndustries: matterResult.data.relatedIndustries || [],
      estimatedReadTime: matterResult.data.estimatedReadTime || 10,

      url: `/industries/${matterResult.data.slug || slug}`,
    }

    return guide
  } catch (error) {
    console.error('Error reading industry guide:', error)
    return null
  }
}

export function getAllIndustrySlugs(): string[] {
  if (!fs.existsSync(industriesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(industriesDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}
