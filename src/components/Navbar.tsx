import React from 'react'
import Link from 'next/link'
import { Sprout, Globe, Menu } from 'lucide-react'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const isRtl = locale === 'ar'
  const targetLocale = isRtl ? 'en' : 'ar'

  const navLinks = [
    { label: isRtl ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { label: isRtl ? 'عن المجلس' : 'About', href: `/${locale}/about` },
    { label: isRtl ? 'الخدمات الإلكترونية' : 'Services', href: `/${locale}/services` },
    { label: isRtl ? 'الأخبار والمستجدات' : 'News', href: `/${locale}/posts` },
    { label: isRtl ? 'اتصل بنا' : 'Contact', href: `/${locale}/contact` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* الشعار - Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md group-hover:bg-emerald-800 transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-emerald-800 transition-colors">
                {isRtl ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isRtl ? 'البوابة الرسمية' : 'Official Portal'}
              </span>
            </div>
          </Link>

          {/* روابط التنقل - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* تحويل اللغة والزر الفرعي */}
          <div className="flex items-center gap-4">
            <Link
              href={`/${targetLocale}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 px-3 py-2 rounded-xl transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </Link>

            {/* زر القائمة للشاشات الصغيرة */}
            <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
