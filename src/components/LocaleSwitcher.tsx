'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  // تحديد اللغة المستهدفة والتسمية
  const targetLocale = currentLocale === 'ar' ? 'en' : 'ar'
  const targetLabel = currentLocale === 'ar' ? 'English' : 'العربية'

  const handleSwitch = () => {
    if (!pathname) return

    // استبدال كود اللغة الحالية باللغة المستهدفة في المسار الحالي
    const segments = pathname.split('/')
    segments[1] = targetLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <button
      onClick={handleSwitch}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all duration-200 shadow-sm hover:border-emerald-500"
      title={currentLocale === 'ar' ? 'Switch Language' : 'تغيير اللغة'}
    >
      <Globe className="w-4 h-4 text-emerald-600" />
      <span>{targetLabel}</span>
    </button>
  )
}
