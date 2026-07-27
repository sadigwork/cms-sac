import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Tag, Hash, FileText, ArrowLeft } from 'lucide-react'

interface TagsPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. جلب كافة الوسوم من كولكشن 'tags'
  const tagsResponse = await payload.find({
    collection: 'tags',
    limit: 100,
    sort: 'name',
  })

  const tags = tagsResponse.docs || []

  // 2. جلب جميع المقالات بحساب عدد المقالات لكل وسم
  const postsResponse = await payload.find({
    collection: 'posts',
    limit: 500,
    depth: 1,
  })

  const posts = postsResponse.docs || []

  // خريطة لحساب التكرارات
  const tagCounts: Record<string, number> = {}
  posts.forEach((post: any) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((t: any) => {
        const tagId = typeof t === 'object' ? t.id : t
        if (tagId) {
          tagCounts[tagId] = (tagCounts[tagId] || 0) + 1
        }
      })
    }
  })

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* العنوان */}
        <div className="mb-10 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <Hash className="w-3.5 h-3.5 text-emerald-600" />
            <span>الدليل المالي والمعرفي</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            الكلمات المفتاحية والوسوم
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm md:text-base leading-relaxed">
            استكشف الموضوعات، القرارات التنظيمية، والإرشادات الموزعة حسب الوسوم والتخصصات الزراعية.
          </p>
        </div>

        {/* عرض الوسوم */}
        {tags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map((tag: any) => {
              const count = tagCounts[tag.id] || 0
              const tagSlug = tag.slug || tag.id

              return (
                <Link
                  key={tag.id}
                  href={`/${locale}/tags/${tagSlug}`}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 hover:border-emerald-500 hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm">
                        {tag.name || tag.title}
                      </h2>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <FileText className="w-3 h-3" />
                        {count} {count === 1 ? 'مقالة' : 'مقالات'}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <Tag className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">لا توجد وسوم حالياً</h3>
            <p className="text-slate-500 text-xs mb-6">لم يتم إضافة كلمات مفتاحية في النظام بعد.</p>
            <Link
              href={`/${locale}/posts`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للأخبار</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
