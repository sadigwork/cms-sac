// // 'use client'

// import React from 'react'

// export const CustomDashboard: React.FC = () => {
//   return (
//     <div dir="rtl" className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
//       {/* الهيدر الترحيبي */}
//       <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
//         <div className="relative z-10 max-w-2xl space-y-2">
//           <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
//             لوحة الإدارة الرئيسية
//           </span>
//           <h1 className="text-3xl font-black">مرحباً بك في نظام إدارة المجلس</h1>
//           <p className="text-slate-300 text-xs leading-relaxed">
//             من هنا يمكنك إدارة الطلبات والتسجيلات، متابعة الأخبار والمحتوى، والتحكم في صلاحيات
//             المستخدمين والخدمات بكل سهولة.
//           </p>
//         </div>
//       </div>

//       {/* بطاقات الإحصائيات السريعة */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
//           <div className="text-xs font-bold text-slate-500 mb-1">طلبات التسجيل المهني</div>
//           <div className="text-2xl font-black text-slate-900">طلبات جديدة</div>
//           <p className="text-[11px] text-emerald-600 font-medium mt-2">إدارة القيد المباشر</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
//           <div className="text-xs font-bold text-slate-500 mb-1">المحتوى والمقالات</div>
//           <div className="text-2xl font-black text-slate-900">الأخبار والفعاليات</div>
//           <p className="text-[11px] text-emerald-600 font-medium mt-2">نشر وتحديث الأخبار</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
//           <div className="text-xs font-bold text-slate-500 mb-1">الخدمات الإلكترونية</div>
//           <div className="text-2xl font-black text-slate-900">الخدمات والدليل</div>
//           <p className="text-[11px] text-emerald-600 font-medium mt-2">تحديث بيانات الخدمات</p>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { CustomDashboardClient } from './CustomDashboardClient'

// مكون سيرفر خالص بدون 'use client'
export const CustomDashboard: React.FC = () => {
  return <CustomDashboardClient />
}