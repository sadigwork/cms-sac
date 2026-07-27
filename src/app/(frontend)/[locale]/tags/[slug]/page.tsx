import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Tag, Calendar, ChevronLeft, ArrowRight } from 'lucide-react'

function getMediaUrl(imageField: any): string {
  if (!imageField) return ''
  let rawUrl =
    typeof imageField === 'object' && imageField?.url
      ? imageField.url
      : typeof imageField === 'string'
        ? imageField
        : ''
  if (!rawUrl) return ''
  if (rawUrl.startsWith('/')) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return `${serverUrl}${rawUrl}`
  }
  return rawUrl
}

interface TagDetailProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function TagDetailPage({ params }: TagDetailProps) {
  const { locale, slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. البحث عن الوسم بواسطة slug أو id
  const tagQuery = await payload.find({
    collection: 'tags',
    where: {
      or: [{ slug: { equals: slug } }, { id: { equals: slug } }],
    },
    limit: 1,
  })

  const tag = tagQuery.docs[0]

  if (!tag) {
    notFound()
  }

  // 2. جلب المقالات المربوطة بهذا الوسم
  const postsResponse = await payload.find({
    collection: 'posts',
    where: {
      tags: {
        contains: tag.id,
      },
    },
    depth: 2,
    sort: '-createdAt',
  })

  const posts = postsResponse.docs || []

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* زر العودة للوسوم */}
        <Link
          href={`/${locale}/tags`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors mb-6"
        >
          <ArrowRight className="w-4 h-4" />
          <span>عرض كافة الوسوم</span>
        </Link>

        {/* الهيدر مع اسم الوسم المحدد */}
        <div className="mb-10 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
              الوسم المحدد
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
              #{tag.name || tag.title}
            </h1>
          </div>
        </div>

        {/* شبكة المقالات التابعة للوسم */}
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
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
                >
                  <Link
                    href={`/${locale}/posts/${post.slug}`}
                    className="relative w-full h-48 bg-slate-100 overflow-hidden block"
                  >
                    <Image
                      src={imageUrl}
                      alt={post.title || 'صورة الخبر'}
                      fill
                      unoptimized={imageUrl.includes('localhost') || imageUrl.startsWith('/')}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {formattedDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <time>{formattedDate}</time>
                        </div>
                      )}
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
                        <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
                      </h2>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                      <Link
                        href={`/${locale}/posts/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        <span>اقرأ المقال</span>
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-12">
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد مقالات مرتبطة</h3>
            <p className="text-slate-500 text-sm">لم يتم نشر مقالات تحت هذا الوسم حتى الآن.</p>
          </div>
        )}
      </div>
    </div>
  )
}
