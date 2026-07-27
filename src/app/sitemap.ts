import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://agricouncil.gov.sd'
  const payload = await getPayload({ config: configPromise })

  // جلب كافة المقالات لتقديمها للمحركات
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  const postUrls = posts.docs.flatMap((post) => [
    {
      url: `${baseUrl}/ar/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    },
    {
      url: `${baseUrl}/en/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    },
  ])

  return [
    { url: `${baseUrl}/ar`, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    ...postUrls,
  ]
}
