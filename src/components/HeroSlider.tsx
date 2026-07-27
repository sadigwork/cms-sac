'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface NewsItem {
  id: string
  title: string
  summary: string
  imageUrl: string
  slug: string
  category?: string
  date?: string
}

interface HeroSliderProps {
  news: NewsItem[]
  locale: string
}

export function HeroSlider({ news, locale }: HeroSliderProps) {
  const isRtl = locale === 'ar'

  // إعدادات Embla Carousel مع تشغيل تلقائي كل 5 ثوانٍ
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: isRtl ? 'rtl' : 'ltr' }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (!news || news.length === 0) return null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      {/* منطقة العرض (Viewport) */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {news.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] min-w-0 h-[480px] md:h-[560px]">
              {/* صورة الخبر الخلفية */}
              <Image src={item.imageUrl} alt={item.title} fill priority className="object-cover" />

              {/* طبقة التدرج الداكن لتوضيح النصوص فوق الصورة */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              {/* محتوى الخبر */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 max-w-4xl space-y-3 md:space-y-4">
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs md:text-sm font-semibold rounded-full shadow-sm">
                    {item.category}
                  </span>
                )}

                <h2 className="text-2xl md:text-4xl font-bold leading-tight line-clamp-2 hover:text-emerald-300 transition-colors">
                  <Link href={`/${locale}/posts/${item.slug}`}>{item.title}</Link>
                </h2>

                <p className="text-slate-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/posts/${item.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm md:text-base transition-colors"
                  >
                    <span>{isRtl ? 'اقرأ تفاصيل الخبر' : 'Read Full Story'}</span>
                    <span className={isRtl ? 'rotate-180' : ''}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* أزرار التنقل (السابق / التالي) */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 start-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-emerald-600 transition-all border border-white/10"
        aria-label="Previous slide"
      >
        {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 end-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-emerald-600 transition-all border border-white/10"
        aria-label="Next slide"
      >
        {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>
    </div>
  )
}
