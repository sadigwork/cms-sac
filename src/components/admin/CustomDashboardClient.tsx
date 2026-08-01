'use client'

import React from 'react'
import Link from 'next/link'

export const CustomDashboardClient: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans dir-rtl" dir="rtl">
      {/* الترويسة */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة الإدارة 👋</h1>
        <p className="text-slate-400">
          إدارة الخدمات، الأخبار، والمستفيدين من المجلس الزراعي السوداني.
        </p>
      </div>

      {/* بطاقات معلومات وسوابط سريعة للمجموعات
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/admin/collections/registrations"
          className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all group"
        >
          <span className="text-slate-400 text-sm group-hover:text-emerald-400">طلبات التسجيل</span>
          <p className="text-2xl font-bold text-white mt-2">إدارة الطلبات ←</p>
        </Link>

        <Link 
          href="/admin/collections/posts"
          className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all group"
        >
          <span className="text-slate-400 text-sm group-hover:text-emerald-400">الأخبار والمقالات</span>
          <p className="text-2xl font-bold text-white mt-2">إدارة المحتوى ←</p>
        </Link>

        <Link 
          href="/admin/collections/users"
          className="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all group"
        >
          <span className="text-slate-400 text-sm group-hover:text-emerald-400">المستخدمين والأدوار</span>
          <p className="text-2xl font-bold text-white mt-2">إدارة الحسابات ←</p>
        </Link>
      </div> */}
    </div>
  )
}