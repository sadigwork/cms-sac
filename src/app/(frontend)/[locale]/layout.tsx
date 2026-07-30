import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// 1. تعريف المسارات اللغوية المدعومة بناءً للإنتاج
export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }]
}

// 2. توليد الميتاداتا العامة للموقع بناءً على اللغة الحالية (SEO + OpenGraph)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === 'ar'

  const siteName = isAr ? 'المجلس الزراعي السوداني' : 'Sudan Agricultural Council'
  const description = isAr
    ? 'البوابة الإعلامية والخدمية الرسمية للمجلس الزراعي السوداني - تنظيم الممارسة المهنية وتنفيذ الخدمات الإلكترونية للمهندسين والمهنيين الزراعيين.'
    : 'Official portal for the Sudanese Agricultural Council - Regulating professional practice and providing e-services for agricultural engineers and professionals.'

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://agricouncil.gov.sd'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      'المجلس الزراعي السوداني',
      'الهندسة الزراعية',
      'السجل المهني الزراعي',
      'Sudan Agricultural Council',
      'Agricultural Registration',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,

    // إعدادات مشاركة الرابط (Open Graph / Facebook)
    openGraph: {
      title: siteName,
      description,
      url: `${baseUrl}/${locale}`,
      siteName,
      locale: isAr ? 'ar_SD' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },

    // إعدادات Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: ['/og-image.jpg'],
    },

    // الأيقونات والتوجيهات
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    // روابط البدائل اللغوية محركات البحث (Canonical & Alternates)
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
      },
    },
  }
}

// 3. الهيكل الرئيسي لغلاف الصفحة
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolveParams = await params
  const locale = String(resolveParams.locale).toLowerCase()
  const isRtl = locale === 'ar'

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200 min-h-screen flex flex-col justify-between">
        {/* شريط الملاحة الرئيسي المحدث مع دعم زر تغيير اللغة */}
        <Navbar locale={locale} />

        {/* محتوى الصفحة الرئيسي */}
        <main className="flex-grow">{children}</main>

        {/* المكون الاحترافي للـ Footer */}
        <Footer locale={locale} />
      </body>
    </html>
  )
}
