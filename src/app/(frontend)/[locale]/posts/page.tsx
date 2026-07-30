import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, Tag, ChevronLeft, Search, Newspaper } from 'lucide-react'

// دالة معالجة روابط الصور المرفوعة
function getMediaUrl(imageField: any): string {
  if (!imageField) return ''
  let rawUrl = ''
  if (typeof imageField === 'object' && imageField !== null && imageField.url) {
    rawUrl = imageField.url
  } else if (typeof imageField === 'string') {
    rawUrl = imageField
  }
  if (!rawUrl) return ''
  if (rawUrl.startsWith('/')) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return `${serverUrl}${rawUrl}`
  }
  return rawUrl
}

interface PostsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ search?: string }>
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
  const { locale } = await params
  const { search } = await searchParams
  const isAr = locale === 'ar'

  const payload = await getPayload({ config: configPromise })

  // بناء شرط البحث لـ Payload CMS في حالة البحث بكلمة مفتاحية
  const whereCondition: any = {}
  if (search && search.trim() !== '') {
    whereCondition.or = [{ title: { like: search.trim() } }, { excerpt: { like: search.trim() } }]
  }

  // جلب المقالات المفلترة من Payload
  const postsResponse = await payload.find({
    collection: 'posts',
    where: whereCondition,
    depth: 2,
    limit: 12,
    sort: '-createdAt',
  })

  const posts = postsResponse.docs || []

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* العنونة والتصدير */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Newspaper className="w-4 h-4" />
            <span>{isAr ? 'المركز الإعلامي' : 'Media Center'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {isAr ? 'الأخبار والمقالات الرسمية' : 'Official News & Articles'}
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            {isAr
              ? 'متابعة لأحدث قرارات، فعاليات، وأخبار المجلس الزراعي السوداني'
              : 'Follow the latest decisions, events, and announcements of the Sudanese Agricultural Council'}
          </p>

          {/* تنبيه حالة البحث */}
          {search && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-semibold text-slate-700">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>
                {isAr
                  ? `نتائج البحث عن: "${search}" (${posts.length})`
                  : `Search results for: "${search}" (${posts.length})`}
              </span>
              <Link
                href={`/${locale}/posts`}
                className="text-emerald-700 hover:underline mr-2 font-bold"
              >
                {isAr ? 'إلغاء البحث' : 'Clear search'}
              </Link>
            </div>
          )}
        </div>

        {/* شبكة الأخبار */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const rawImage =
                post.featuredImage || post.heroImage || post.image || post.meta?.image
              const imageUrl =
                getMediaUrl(rawImage) ||
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'

              const formattedDate = post.createdAt
                ? new Date(post.createdAt).toLocaleDateString(isAr ? 'ar-SD' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : ''

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* صورة المقال */}
                    <Link
                      href={`/${locale}/posts/${post.slug}`}
                      className="relative w-full h-52 block overflow-hidden bg-slate-100"
                    >
                      <Image
                        src={imageUrl}
                        alt={post.title || 'صورة الخبر'}
                        fill
                        unoptimized={imageUrl.includes('localhost') || imageUrl.startsWith('/')}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* تفاصيل المقال */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <time>{formattedDate}</time>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3">
                        <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {post.excerpt && (
                        <p className="text-slate-600 text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* تذييل الكارت والوسوم */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(post.tags) &&
                        post.tags.slice(0, 2).map((tagItem: any, idx: number) => {
                          const isObj = typeof tagItem === 'object' && tagItem !== null
                          const tagName = isObj ? tagItem.name || tagItem.title : 'وسم'
                          const tagSlug = isObj ? tagItem.slug || tagItem.id : tagItem

                          if (!tagSlug) return null

                          return (
                            <Link
                              key={idx}
                              href={`/${locale}/tags/${tagSlug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >
                              <Tag className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{tagName}</span>
                            </Link>
                          )
                        })}
                    </div>

                    <Link
                      href={`/${locale}/posts/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0"
                    >
                      <span>{isAr ? 'قراءة المزيد' : 'Read more'}</span>
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {isAr ? 'لم نجد أي أخبار مطابقة' : 'No news found'}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              {isAr
                ? 'لم يتم العثور على أي نتائج مطابقة لخدمة البحث الحالية، يرجى المحاولة باستخدام كلمات أخرى.'
                : 'No results matched your search query. Please try searching with different keywords.'}
            </p>
            <Link
              href={`/${locale}/posts`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
            >
              {isAr ? 'عرض كافة الأخبار' : 'View all news'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
