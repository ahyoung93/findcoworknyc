import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getArticleSlugs(): string[] {
  const articlesDir = path.join(process.cwd(), 'src/app/articles')

  try {
    const entries = fs.readdirSync(articlesDir, { withFileTypes: true })
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
  } catch (error) {
    console.error('Error reading articles directory:', error)
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://findcoworknyc.com'
  const currentDate = new Date()

  // Static pages
  const staticPages = [
    // Main pages
    {
      url: `${baseUrl}/brands`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    // SEO landing pages
    {
      url: `${baseUrl}/best-coworking-spaces-nyc`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic article pages
  const articleSlugs = getArticleSlugs()
  const articlePages = articleSlugs.map(slug => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...articlePages]
}
