import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, Tag, ArrowLeft, ChevronLeft } from 'lucide-react'

// دالة معالجة روابط الصور
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
  params: Promise<{
    locale: string
  }>
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // جلب كافة المنشورات من Payload CMS
  const postsResponse = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    sort: '-createdAt',
  })

  const posts = postsResponse.docs || []

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* الهيدر والعنوان الرئيسي */}
        <div className="mb-12 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>المركز الإعلامي</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            أخبار وإصدارات المجلس
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm md:text-base leading-relaxed">
            متابعة لآخر الفعاليات، التحديثات المهنية، والقرارات التنظيمية الصادرة عن المجلس الزراعي
            السوداني.
          </p>
        </div>

        {/* شبكة عرض المقالات (Posts Grid) */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const rawImage =
                post.featuredImage || post.heroImage || post.image || post.meta?.image
              const imageUrl =
                getMediaUrl(rawImage) ||
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'

              const formattedDate = post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('ar-SD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* صورة المنشور */}
                  <Link
                    href={`/${locale}/posts/${post.slug}`}
                    className="relative w-full h-52 bg-slate-100 overflow-hidden block"
                  >
                    {/* <Image
                      src={imageUrl}
                      alt={post.title || 'صورة الخبر'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    /> */}
                    <Image
                      src={imageUrl}
                      alt={post.title || 'صورة الخبر'}
                      fill
                      unoptimized={imageUrl.includes('localhost') || imageUrl.startsWith('/')}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* تفاصيل المنشور */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* التاريخ */}
                      {formattedDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <time>{formattedDate}</time>
                        </div>
                      )}

                      {/* العنوان */}
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-3 leading-snug">
                        <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {/* المقتطف/الوصف المختصر */}
                      {post.excerpt && (
                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    {/* رابط القراءة */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                      <Link
                        href={`/${locale}/posts/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        <span>اقرأ المزيد</span>
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* حالة عدم وجود منشورات */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد منشورات حالياً</h3>
            <p className="text-slate-500 text-sm mb-6">
              لم يتم إضافة أي أخبار أو مقالات في الوقت الحالي.
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
