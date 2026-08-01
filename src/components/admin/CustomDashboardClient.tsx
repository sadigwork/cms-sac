'use client'

import React from 'react'
import Link from 'next/link'

interface CollectionItem {
  slug: string
  label: string
}

export const CustomDashboardClient: React.FC<{ collections: CollectionItem[] }> = ({ collections }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans dir-rtl" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة الإدارة 👋</h1>
        <p className="text-slate-400">إدارة الخدمات والمحتوى الخاص بالمجلس الزراعي السوداني.</p>
      </div>

      {/* عرض المجموعات المتاحة في النظام ديناميكياً */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link 
            key={col.slug}
            href={`/admin/collections/${col.slug}`}
            className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-2xl transition-all group"
          >
            <span className="text-slate-400 text-sm">المجموعة</span>
            <p className="text-xl font-bold text-white mt-1 group-hover:text-emerald-400">
              {col.label} ←
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}