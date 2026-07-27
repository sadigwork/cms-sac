// 'use client'

// import React, { useState } from 'react'
// import type { Service } from '@/payload-types'

// interface ServicesSectionProps {
//   services: Service[]
//   locale: string
// }

// export function ServicesSection({ services, locale }: ServicesSectionProps) {
//   const isAr = locale === 'ar'
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResult, setSearchResult] = useState<null | 'not_found'>(null)

//   const t = {
//     sectionTitle: isAr
//       ? 'الخدمات الإلكترونية والدليل المهني'
//       : 'E-Services & Professional Directory',
//     sectionDesc: isAr
//       ? 'بوابة الخدمات المباشرة للمهندسين والمهنيين الزراعيين والجهات المؤسسية'
//       : 'Direct service portal for agricultural engineers, professionals, and institutions',
//     verifyTitle: isAr ? 'التحقق من السجل المهني' : 'Verify Professional Registration',
//     verifyPlaceholder: isAr
//       ? 'أدخل رقم القيد أو الاسم الكامل...'
//       : 'Enter Registration No. or Full Name...',
//     verifyBtn: isAr ? 'تحقق الآن' : 'Verify Now',
//     activeStatus: isAr ? 'متاحة' : 'Active',
//     comingSoon: isAr ? 'قريباً' : 'Coming Soon',
//     applyNow: isAr ? 'بدء الخدمة' : 'Start Service',
//     reqTitle: isAr ? 'المتطلبات:' : 'Requirements:',
//     noResult: isAr
//       ? 'لم يتم العثور على سجل مطبق لرقم القيد المدخل.'
//       : 'No active record found for the provided query.',
//   }

//   const handleVerify = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!searchQuery.trim()) return
//     // لمحاكاة الاستعلام السريع بالواجهة
//     setSearchResult('not_found')
//   }

//   return (
//     <section id="services" className="max-w-7xl mx-auto px-6 py-12 space-y-10">
//       {/* Title */}
//       <div className="text-center max-w-2xl mx-auto space-y-2">
//         <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
//           {t.sectionTitle}
//         </h2>
//         <p className="text-sm text-slate-600 dark:text-slate-400">{t.sectionDesc}</p>
//       </div>

//       {/* Verification Widget Bar */}
//       <div className="bg-emerald-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
//         <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
//           <h3 className="text-lg md:text-xl font-bold">{t.verifyTitle}</h3>
//           <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value)
//                 setSearchResult(null)
//               }}
//               placeholder={t.verifyPlaceholder}
//               className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
//             />
//             <button
//               type="submit"
//               className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm shrink-0"
//             >
//               {t.verifyBtn}
//             </button>
//           </form>

//           {searchResult === 'not_found' && (
//             <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-xs text-red-200 animate-fade-in">
//               {t.noResult}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {services.length > 0 ? (
//           services.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-emerald-600 dark:hover:border-emerald-500 transition-all"
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
//                     ⚡
//                   </div>
//                   <span
//                     className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
//                       service.status === 'active'
//                         ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
//                         : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
//                     }`}
//                   >
//                     {service.status === 'active' ? t.activeStatus : t.comingSoon}
//                   </span>
//                 </div>

//                 <div>
//                   <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
//                     {service.title}
//                   </h4>
//                   <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
//                     {service.shortDescription}
//                   </p>
//                 </div>

//                 {service.requirements && service.requirements.length > 0 && (
//                   <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
//                     <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
//                       {t.reqTitle}
//                     </span>
//                     <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
//                       {service.requirements.slice(0, 3).map((req, idx) => (
//                         <li key={idx} className="truncate">
//                           {req.item}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="pt-6 mt-4">
//                 {service.externalLink && service.status === 'active' ? (
//                   <a
//                     href={service.externalLink}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="block w-full text-center py-2.5 bg-slate-900 hover:bg-emerald-700 dark:bg-slate-700 dark:hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors"
//                   >
//                     {t.applyNow}
//                   </a>
//                 ) : (
//                   <button
//                     disabled
//                     className="w-full text-center py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold rounded-xl cursor-not-allowed"
//                   >
//                     {t.comingSoon}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-8 text-slate-400 text-sm">
//             {isAr ? 'لا توجد خدمات مضافة حالياً.' : 'No services available currently.'}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// src/components/frontend/ServicesSection.tsx
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sprout, ShieldCheck, FileText, Award, Calendar } from 'lucide-react'

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const isRtl = locale === 'ar'

  // أمثلة لأيقونات وحقول الخدمات
  const services = [
    {
      id: '1',
      title: isRtl ? 'اعتماد المهندسين الزراعيين' : 'Agronomist Accreditation',
      description: isRtl
        ? 'تسجيل واعتماد التراخيص المهنية للكوادر والمهندسين الزراعيين.'
        : 'Official licensing and accreditation for agricultural engineers.',
      icon: ShieldCheck,
      href: `/${locale}/services/accreditation`,
    },
    {
      id: '2',
      title: isRtl ? 'إصدار شهادات جودة الإنتاج' : 'Production Quality Certification',
      description: isRtl
        ? 'فحص وتوثيق جودة المحاصيل والمنتجات الزراعية للتصدير والسوق المحلي.'
        : 'Inspection and certification for agricultural yields and export quality.',
      icon: Award,
      href: `/${locale}/services/quality-cert`,
    },
    {
      id: '3',
      title: isRtl ? 'استشارات وتحليل التربة' : 'Soil Analysis & Consultation',
      description: isRtl
        ? 'تقديم خدمات الفحص المخبري للتربة والمياه لرفع كفاءة الإنتاج.'
        : 'Laboratory testing and technical advice for soil and water efficiency.',
      icon: Sprout,
      href: `/${locale}/services/soil-analysis`,
    },
    {
      id: '4',
      title: isRtl ? 'تراخيص المؤسسات الزراعية' : 'Enterprise Licensing',
      description: isRtl
        ? 'تسهيل وإصدار تراخيص المشاتل والمزارع التجارية والشركات.'
        : 'Facilitating commercial farm and agricultural enterprise permits.',
      icon: FileText,
      href: `/${locale}/services/licensing`,
    },
  ]

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي للقسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
              <Sprout className="w-3.5 h-3.5" />
              {isRtl ? 'الخدمات الإلكترونية' : 'Digital Services'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {isRtl ? 'خدمات المجلس الزراعي' : 'Council Services'}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {isRtl
                ? 'نوفر مجموعة من الخدمات التنظيمية والاستشارية لدعم المزارعين والمهندسين القطاعيين.'
                : 'Providing regulatory and consultancy services to support farmers and agricultural specialists.'}
            </p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group self-start md:self-auto"
          >
            <span>{isRtl ? 'عرض جميع الخدمات' : 'View All Services'}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* شبكة الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>{isRtl ? 'التقديم على الخدمة' : 'Apply Now'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 me-1 ms-auto transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 ms-1 me-auto transition-transform group-hover:translate-x-1" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
