import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, Tag, ArrowRight, Share2, Clock, ChevronLeft } from 'lucide-react'
import { RichText } from '@/components/RichText'

// دالة معالجة روابط الصور المرفوعة محلياً
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

interface PostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. جلب تفاصيل المقال من Payload CMS مع depth: 2 للجلب الكامل للوسوم والميديا
  const postsResponse = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const post = postsResponse.docs?.[0]

  if (!post) {
    notFound()
  }

  // معالجة بيانات الصورة الرئيسية
  const rawImage = post.featuredImage || post.heroImage || post.image || post.meta?.image
  const featuredImageUrl =
    getMediaUrl(rawImage) ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'

  // تنسيق تاريخ النشر
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ar-SD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  // 2. جلب المقالات ذات الصلة (آخر 3 مقالات)
  const relatedPostsResponse = await payload.find({
    collection: 'posts',
    where: {
      id: {
        not_equals: post.id,
      },
    },
    limit: 3,
    depth: 1,
    sort: '-createdAt',
  })

  const relatedPosts = relatedPostsResponse.docs || []

  return (
    <article className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* زر العودة لأرشيف الأخبار */}
        <div className="mb-6">
          <Link
            href={`/${locale}/posts`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمركز الأخبار</span>
          </Link>
        </div>

        {/* كارت تفاصيل الخبر الرئيسي */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden p-6 md:p-10 mb-12">
          {/* الهيدر والعنوان */}
          <header className="mb-8 border-b border-slate-100 pb-8">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mb-4">
              {formattedDate && (
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <time>{formattedDate}</time>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>3 دقائق قراءة</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* الصورة الرئيسية للمقال */}
          {featuredImageUrl && (
            <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden mb-10 bg-slate-100 border border-slate-200/60 shadow-inner">
              <Image
                src={featuredImageUrl}
                alt={post.title || 'صورة الخبر'}
                fill
                priority
                unoptimized={
                  featuredImageUrl.includes('localhost') || featuredImageUrl.startsWith('/')
                }
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
            </div>
          )}

          {/* محتوى الخبر المكتوب (RichText) */}
          <div className="my-8">
            <RichText content={post.content} />
          </div>

          {/* قسم الوسوم والكلمات المفتاحية التفاعلية */}
          {/* قسم الوسوم والكلمات المفتاحية */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <footer className="mt-10 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>الكلمات المفتاحية والوسوم:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tagItem: any, index: number) => {
                  // 1. استخراج اسم الوسم بغض النظر عن اسم الحقل في Schema
                  const isObject = typeof tagItem === 'object' && tagItem !== null
                  const tagName = isObject
                    ? tagItem.name || tagItem.title || tagItem.label || 'وسم'
                    : `وسم ${index + 1}`

                  // 2. استخراج الـ slug للرابط
                  const tagSlug = isObject ? tagItem.slug || tagItem.id : tagItem

                  if (!tagSlug) return null

                  return (
                    <Link
                      key={isObject ? tagItem.id || index : index}
                      href={`/${locale}/tags/${tagSlug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80 hover:border-emerald-300 text-slate-700 text-xs font-semibold transition-all duration-200 group"
                    >
                      <span className="text-emerald-600 group-hover:scale-110 transition-transform font-bold">
                        #
                      </span>
                      <span>{tagName}</span>
                    </Link>
                  )
                })}
              </div>
            </footer>
          )}
        </div>

        {/* قسم الأخبار ذات الصلة */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full inline-block" />
              <span>أخبار قد تهمك</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost: any) => {
                const relImage =
                  getMediaUrl(
                    relPost.featuredImage ||
                      relPost.heroImage ||
                      relPost.image ||
                      relPost.meta?.image,
                  ) ||
                  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'

                return (
                  <div
                    key={relPost.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <Link
                        href={`/${locale}/posts/${relPost.slug}`}
                        className="relative w-full h-36 rounded-xl overflow-hidden block mb-3 bg-slate-100"
                      >
                        <Image
                          src={relImage}
                          alt={relPost.title}
                          fill
                          unoptimized={relImage.includes('localhost') || relImage.startsWith('/')}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={`/${locale}/posts/${relPost.slug}`}>{relPost.title}</Link>
                      </h3>
                    </div>

                    <Link
                      href={`/${locale}/posts/${relPost.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
                    >
                      <span>قراءة الخبر</span>
                      <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
