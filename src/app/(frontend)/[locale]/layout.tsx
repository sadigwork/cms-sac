import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import { Navbar } from '@/components/Navbar'

// 1. تعريف المسارات اللغوية المدعومة بناءً للإنتاج
export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }]
}

// export const metadata = {
//   description: 'A blank template using Payload in a Next.js app.',
//   title: 'Payload Blank Template',
// }

// 2. توليد الميتاداتا العامة للموقع بناءً على اللغة الحالية
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
          url: '/og-image.jpg', // ضع صورة رسمية للمجلس بدقة 1200x630 داخل مجلد public
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
  const { locale } = await params
  const isRtl = locale === 'ar'

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200 min-h-screen flex flex-col justify-between">
        <Navbar locale={locale} />
        <main className="flex-grow">{children}</main>

        {/* Footer بسيط وموحد */}
        <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-16 text-xs text-center">
          <div className="max-w-7xl mx-auto px-6 space-y-2">
            <p>
              {isRtl
                ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة - المجلس الزراعي السوداني`
                : `© ${new Date().getFullYear()} All rights reserved - Sudanese Agricultural Council`}
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
