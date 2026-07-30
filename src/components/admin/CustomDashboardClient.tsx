'use client'

import React from 'react'

export const CustomDashboardClient: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans" dir="rtl">
      {/* الترويسة */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة الإدارة 👋</h1>
        <p className="text-slate-400">
          إدارة الخدمات، الأخبار، والمستفيدين من المجلس الزراعي السوداني.
        </p>
      </div>

      {/* بطاقات معلومات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-slate-400 text-sm">الطلبات الجديدة</span>
          <p className="text-3xl font-bold text-white mt-2">--</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-slate-400 text-sm">المُسجلين</span>
          <p className="text-3xl font-bold text-white mt-2">--</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-slate-400 text-sm">الأخبار والمقالات</span>
          <p className="text-3xl font-bold text-white mt-2">--</p>
        </div>
      </div>
    </div>
  )
}
