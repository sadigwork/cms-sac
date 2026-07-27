import { MetadataRoute } from 'next'
// للسماح لأنابيب الفهرسة بقراءة صفحات الواجهة وحجب لوحة التحكم
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://agricouncil.gov.sd'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
