'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Sprout, Search } from 'lucide-react'
import { LocaleSwitcher } from './LocaleSwitcher'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const pathname = usePathname()
  const router = useRouter()
  const isAr = locale === 'ar'

  // قائمة الروابط الرئيسية
  const navLinks = [
    { href: `/${locale}`, label: isAr ? 'الرئيسية' : 'Home' },
    { href: `/${locale}/posts`, label: isAr ? 'الأخبار والمقالات' : 'News & Posts' },
    { href: `/${locale}/tags`, label: isAr ? 'الوسوم' : 'Tags' },
    { href: `/${locale}/about`, label: isAr ? 'عن المجلس' : 'About Us' },
    { href: `/${locale}/contact`, label: isAr ? 'اتصل بنا' : 'Contact Us' },
    { href: `/${locale}/services`, label: locale === 'ar' ? 'الخدمات الإلكترونية' : 'Services' },
  ]

  // دالة تنفيذ البحث والتوجيه لصفحة نتائج البحث/الأرشيف
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // التوجيه لصفحة الأخبار مع تمرير كلمة البحث كـ Query Parameter
    router.push(`/${locale}/posts?search=${encodeURIComponent(searchQuery.trim())}`)
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* الشعار والهوية */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group shrink-0">
              <div className="p-2.5 bg-emerald-600 rounded-2xl text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm md:text-base lg:text-lg text-slate-900 leading-tight">
                  {isAr ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council'}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {isAr ? 'البوابة الرسمية' : 'Official Portal'}
                </span>
              </div>
            </Link>

            {/* الروابط الرئيسية (Desktop Menu) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* البحث وحساب اللغة والأزرار (Desktop Right Actions) */}
            <div className="hidden md:flex items-center gap-3">
              {/* شريط البحث المباشر في الشاشات الكبيرة */}
              <form onSubmit={handleSearchSubmit} className="relative w-48 xl:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'ابحث عن خبر أو كلمة...' : 'Search news...'}
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  aria-label="بحث"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              <LocaleSwitcher currentLocale={locale} />
            </div>

            {/* أزرار الشاشات الصغيرة والهواتف (Mobile Right Actions) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* زر فتح مودال البحث على الهواتف */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              <LocaleSwitcher currentLocale={locale} />

              {/* زر القائمة المنسدلة */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                aria-label="القائمة الرئيسية"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* القائمة المنسدلة للهواتف (Mobile Menu) */}
          {isOpen && (
            <nav className="lg:hidden py-4 border-t border-slate-100 flex flex-col gap-1 pb-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
      </header>

      {/* نافذة البحث المنسدلة للهواتف الذكية (Search Modal) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                {isAr ? 'البحث في الأخبار والمقالات' : 'Search News & Articles'}
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'اكتب الكلمة المفتاحية للبحث...' : 'Type keyword to search...'}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
