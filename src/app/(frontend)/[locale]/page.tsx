// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import type { Post, Category, Service, Ticker as TickerType } from '@/payload-types'
// import { headers as getHeaders } from 'next/headers.js'
// import { fileURLToPath } from 'url'
// import { ServicesSection } from '@/components/ServicesSection'
// import { HeroSlider, NewsItem } from '@/components/HeroSlider'

// import './styles.css'

// // export default function LandingPage() {
// //   return (
// //     <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">

// //       {/* 1. Header Section */}
// //       <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
// //         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
// //               ز
// //             </div>
// //             <div>
// //               <span className="block font-bold text-lg tracking-tight text-slate-900 dark:text-white">
// //                 المجلس الزراعي السوداني
// //               </span>
// //               <span className="block text-xs text-slate-500 dark:text-slate-400">
// //                 البوابة الإعلامية والخدمية الرسمية
// //               </span>
// //             </div>
// //           </div>

// //           <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
// //             <a href="#hero" className="text-emerald-700 dark:text-emerald-400 font-bold">الرئيسية</a>
// //             <a href="#news" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">الأخبار والفعاليات</a>
// //             <a href="#specialized" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">أخبار القطاعات</a>
// //             <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">الخدمات الإلكترونية</a>
// //           </nav>

// //           <div className="flex items-center gap-3">
// //             <button className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
// //               English
// //             </button>
// //             <a href="/admin" className="px-4 py-2 text-sm font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-all shadow-sm">
// //               لوحة التحكم
// //             </a>
// //           </div>
// //         </div>
// //       </header>

// //       {/* 2. Breaking News Ticker (الأخبار العاجلة) */}
// //       <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 py-2.5">
// //         <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
// //           <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md shrink-0 animate-pulse">
// //             عاجل
// //           </span>
// //           <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
// //             فتح باب التقديم لامتحانات السجل المهني للدورة الجديدة اعتباراً من الأسبوع القادم...
// //           </div>
// //         </div>
// //       </section>

// //       {/* 3. Hero Slider & Side Highlights (سلايدر الأخبار الرئيسي) */}
// //       <section id="hero" className="max-w-7xl mx-auto px-6 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// //           {/* Main Slider (2 Columns) */}
// //           <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
// //             <div className="relative h-96 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-8 flex flex-col justify-end">
// //               <span className="absolute top-6 right-6 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
// //                 خبر رئيسي
// //               </span>
// //               <div className="space-y-3 z-10">
// //                 <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
// //                   المجلس الزراعي يعتمد الضوابط الجديدة لممارسة مهنة الهندسة الزراعية والإنتاج الحيواني
// //                 </h2>
// //                 <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed">
// //                   في إطار تطوير الممارسة المهنية وحماية القطاع الإنتاجي، أقر المجلس حزمة من القرارات التنظيمية الجديدة المعززة للعمل الميداني والاعتماد الأكاديمي.
// //                 </p>
// //                 <div className="text-xs text-slate-400 font-medium pt-1">
// //                   23 يوليو 2026 • بواسطة الأمانة العامة
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Slider Controls */}
// //             <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
// //               <div className="flex gap-2">
// //                 <span className="w-6 h-2 bg-emerald-600 rounded-full"></span>
// //                 <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
// //                 <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:bg-white dark:hover:bg-slate-700 transition-all">
// //                   →
// //                 </button>
// //                 <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:bg-white dark:hover:bg-slate-700 transition-all">
// //                   ←
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Side Highlights (1 Column) */}
// //           <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
// //             <div>
// //               <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 text-slate-900 dark:text-white">
// //                 أهم المستجدات
// //               </h3>

// //               <div className="space-y-4">
// //                 {[
// //                   { tag: "قرارات", title: "اعتماد تعديلات لائحة تنظيم المكاتب الاستشارية الزراعية", time: "منذ ساعتين" },
// //                   { tag: "تدريب", title: "إطلاق البرنامج التدريبي التخصصي في تقنيات الري الحديث", time: "منذ يومين" },
// //                   { tag: "اتفاقيات", title: "توقيع مذكرة تفاهم لتطوير قدرات المهندسين الزراعيين الشباب", time: "منذ 3 أيام" }
// //                 ].map((item, idx) => (
// //                   <article key={idx} className="pb-3 border-b border-slate-100 dark:border-slate-700/60 last:border-0 last:pb-0">
// //                     <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-1">
// //                       {item.tag}
// //                     </span>
// //                     <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug hover:text-emerald-600 transition-colors cursor-pointer">
// //                       {item.title}
// //                     </h4>
// //                     <time className="text-xs text-slate-400 mt-1 block">{item.time}</time>
// //                   </article>
// //                 ))}
// //               </div>
// //             </div>

// //             <a href="#all-news" className="block text-center text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-4">
// //               عرض كل المستجدات ←
// //             </a>
// //           </div>

// //         </div>
// //       </section>

// //       {/* 4. Specialized News Grid (أخبار القطاعات المتخصصة) */}
// //       <section id="specialized" className="max-w-7xl mx-auto px-6 py-8">
// //         <div className="flex items-center justify-between mb-6">
// //           <div>
// //             <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">أخبار القطاعات المتخصصة</h3>
// //             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تغطيات حصرية للإنتاج النباتي، الحيواني، الهندسة، والموارد</p>
// //           </div>
// //           <a href="#all" className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
// //             عرض الأرشيف كامل ←
// //           </a>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {[
// //             {
// //               category: "الإنتاج النباتي والوقاية",
// //               title: "توصيات اللجنة الفنية لمكافحة الآفات الموسمية في المشاريع المروية",
// //               desc: "تنبيهات إرشادية حول استخدام المبيدات المعتمدة وإجراءات السلامة المهنية للحفاظ على المحاصيل.",
// //               date: "20 يوليو 2026"
// //             },
// //             {
// //               category: "الهندسة والتقانات الزراعية",
// //               title: "تطبيق نظم المعلومات الجغرافية (GIS) في مسح الأراضي المطرية",
// //               desc: "ورشة عمل متخصصة للتعريف بالأدوات الرقمية الحديثة لرفع كفاءة التخطيط الزراعي واستغلال المساحات.",
// //               date: "18 يوليو 2026"
// //             },
// //             {
// //               category: "الموارد الطبيعية والبيئة",
// //               title: "تقرير تقييم الموسم المطري وأثره على التربة والمراعي الطبيعية",
// //               desc: "دراسة ميدانية حول خطة الحفاظ على الغطاء النباتي وإدارة الموارد المائية في الأقاليم الرئيسية.",
// //               date: "15 يوليو 2026"
// //             }
// //           ].map((card, idx) => (
// //             <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:border-emerald-500/50 transition-all">
// //               <div>
// //                 <span className="text-xs font-bold text-amber-600 dark:text-amber-500 block mb-2">
// //                   {card.category}
// //                 </span>
// //                 <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
// //                   {card.title}
// //                 </h4>
// //                 <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
// //                   {card.desc}
// //                 </p>
// //               </div>
// //               <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700/60">
// //                 <span>{card.date}</span>
// //                 <a href="#" className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline">اقرأ المزيد</a>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //     </div>
// //   )
// // }

// // export default async function LandingPage({
// //   params,
// // }: {
// //   params: Promise<{ locale: string }>
// // }) {
// //   const { locale } = await params
// //   const isAr = locale === 'ar'

// //   // نصوص ترجمة الواجهة الثابتة (UI Dictionary)
// //   const t = {
// //     title: isAr ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council',
// //     subtitle: isAr ? 'البوابة الإعلامية والخدمية الرسمية' : 'Official Media & Service Portal',
// //     home: isAr ? 'الرئيسية' : 'Home',
// //     news: isAr ? 'الأخبار والفعاليات' : 'News & Events',
// //     sectors: isAr ? 'أخبار القطاعات' : 'Sectors News',
// //     services: isAr ? 'الخدمات الإلكترونية' : 'E-Services',
// //     admin: isAr ? 'لوحة التحكم' : 'Admin Panel',
// //     urgent: isAr ? 'عاجل' : 'Urgent',
// //     heroBadge: isAr ? 'خبر رئيسي' : 'Featured News',
// //     heroTitle: isAr
// //       ? 'المجلس الزراعي يعتمد الضوابط الجديدة لممارسة مهنة الهندسة الزراعية والإنتاج الحيواني'
// //       : 'Agricultural Council Approves New Directives for Agricultural Engineering & Animal Production',
// //     heroDesc: isAr
// //       ? 'في إطار تطوير الممارسة المهنية وحماية القطاع الإنتاجي، أقر المجلس حزمة من القرارات التنظيمية الجديدة المعززة للعمل الميداني والاعتماد الأكاديمي.'
// //       : 'To enhance professional practice and safeguard production, the council approved new regulations strengthening field execution and academic accreditation.',
// //     switchLang: isAr ? 'English' : 'العربية',
// //     targetLocale: isAr ? 'en' : 'ar',
// //   }

// //   return (
// //     <div className="min-h-screen">

// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
// //         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
// //               {isAr ? 'ز' : 'SAC'}
// //             </div>
// //             <div>
// //               <span className="block font-bold text-lg tracking-tight text-slate-900 dark:text-white">
// //                 {t.title}
// //               </span>
// //               <span className="block text-xs text-slate-500 dark:text-slate-400">
// //                 {t.subtitle}
// //               </span>
// //             </div>
// //           </div>

// //           <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
// //             <a href="#hero" className="text-emerald-700 dark:text-emerald-400 font-bold">{t.home}</a>
// //             <a href="#news" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">{t.news}</a>
// //             <a href="#specialized" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">{t.sectors}</a>
// //             <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">{t.services}</a>
// //           </nav>

// //           <div className="flex items-center gap-3">
// //             {/* زر تحويل اللغة الديناميكي */}
// //             <Link
// //               href={`/${t.targetLocale}`}
// //               className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
// //             >
// //               {t.switchLang}
// //             </Link>

// //             <a href="/admin" className="px-4 py-2 text-sm font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-all shadow-sm">
// //               {t.admin}
// //             </a>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Breaking News Ticker */}
// //       <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 py-2.5">
// //         <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
// //           <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md shrink-0 animate-pulse">
// //             {t.urgent}
// //           </span>
// //           <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
// //             {isAr
// //               ? 'فتح باب التقديم لامتحانات السجل المهني للدورة الجديدة اعتباراً من الأسبوع القادم...'
// //               : 'Registration for professional registration exams for the new session opens next week...'}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Hero Section */}
// //       <section id="hero" className="max-w-7xl mx-auto px-6 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
// //             <div className="relative h-96 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-8 flex flex-col justify-end">
// //               <span className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm`}>
// //                 {t.heroBadge}
// //               </span>
// //               <div className="space-y-3 z-10">
// //                 <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
// //                   {t.heroTitle}
// //                 </h2>
// //                 <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed">
// //                   {t.heroDesc}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Controls */}
// //             <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
// //               <div className="flex gap-2">
// //                 <span className="w-6 h-2 bg-emerald-600 rounded-full"></span>
// //                 <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
// //               </div>
// //               <div className="flex gap-2 dir-ltr">
// //                 <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:bg-white dark:hover:bg-slate-700">
// //                   ←
// //                 </button>
// //                 <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm hover:bg-white dark:hover:bg-slate-700">
// //                   →
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //     </div>
// //   )
// // }

// // مثال لبيانات الأخبار التوضيحية أو القادمة من payload.find
// const featuredNews: NewsItem[] = [
//   {
//     id: '1',
//     title: 'تدشين المبادرة الوطنية الموحدة للتحول الرقمي وتحديث الخدمات الزراعية',
//     summary:
//       'أعلنت وزارة الزراعة والمؤسسات التابعة لها رسمياً عن إطلاق المنصة الإلكترونية الشاملة لرقمنة الخدمات المهنية والاستشارية.',
//     imageUrl: '/images/news-1.jpg',
//     slug: 'digital-transformation-initiation',
//     category: 'أخبار المجلس',
//   },
//   {
//     id: '2',
//     title: 'انطلاق فعاليات القمة العالمية للتكنولوجيا بمشاركة قيادات تقنية',
//     summary:
//       'انطلقت صباح اليوم أعمال القمة السنوية للتكنولوجيا الحديثة، حيث يستعرض المشاركون مدى تأثير حلول الذكاء الاصطناعي.',
//     imageUrl: '/images/news-2.jpg',
//     slug: 'global-tech-summit',
//     category: 'مؤتمرات',
//   },
// ]

// export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
//   const { locale } = await params
//   const isAr = locale === 'ar'

//   // 1. تهيئة Payload Local API
//   const payload = await getPayload({ config: configPromise })

//   // 2. جلب الأخبار حسب موقعها/نوعها باللغة الحالية (ar / en)
//   const [heroPosts, tickerData, highlightPosts, standardPosts, servicesData] = await Promise.all([
//     // الأخبار الرئيسية للسلايدر العلوي
//     payload.find({
//       collection: 'posts',
//       where: { newsType: { equals: 'hero' } },
//       limit: 3,
//       locale: locale as 'ar' | 'en',
//       sort: '-publishedAt',
//     }),
//     // شريط الأخبار العاجلة (Global)
//     payload.findGlobal({
//       slug: 'ticker',
//       locale: locale as 'ar' | 'en',
//     }) as Promise<TickerType>,
//     // أهم المستجدات (الجانبية)
//     payload.find({
//       collection: 'posts',
//       where: { newsType: { equals: 'highlight' } },
//       limit: 4,
//       locale: locale as 'ar' | 'en',
//       sort: '-publishedAt',
//     }),
//     // الأخبار التخصصية والقياسية
//     payload.find({
//       collection: 'posts',
//       where: { newsType: { equals: 'standard' } },
//       limit: 6,
//       locale: locale as 'ar' | 'en',
//       sort: '-publishedAt',
//     }),
//     // الخدمات الإلكترونية
//     payload.find({
//       collection: 'services',
//       locale: locale as 'ar' | 'en',
//       limit: 6,
//     }),
//   ])

//   // اختيار الخبر الأول للسلايدر الرئيسي
//   const mainHero = heroPosts.docs[0] as Post | undefined

//   // نصوص ترجمة عناصر الواجهة الثابتة (UI Labels)
//   const t = {
//     title: isAr ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council',
//     subtitle: isAr ? 'البوابة الإعلامية والخدمية الرسمية' : 'Official Media & Service Portal',
//     home: isAr ? 'الرئيسية' : 'Home',
//     news: isAr ? 'الأخبار والفعاليات' : 'News & Events',
//     sectors: isAr ? 'أخبار القطاعات' : 'Sectors News',
//     services: isAr ? 'الخدمات الإلكترونية' : 'E-Services',
//     admin: isAr ? 'لوحة التحكم' : 'Admin Panel',
//     urgent: isAr ? 'عاجل' : 'Urgent',
//     heroBadge: isAr ? 'خبر رئيسي' : 'Featured News',
//     highlightsTitle: isAr ? 'أهم المستجدات' : 'Top Updates',
//     standardNewsTitle: isAr ? 'أخبار القطاعات والتخصصات' : 'Sectoral News',
//     readMore: isAr ? 'اقرأ المزيد' : 'Read More',
//     noNews: isAr ? 'لا توجد أخبار متاحة حالياً.' : 'No news available at the moment.',
//     switchLang: isAr ? 'English' : 'العربية',
//     targetLocale: isAr ? 'en' : 'ar',
//   }

//   return (
//     <div className="min-h-screen">
//       {/* 1. Header & Navigation */}
//       <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
//         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
//               {isAr ? 'ز' : 'SAC'}
//             </div>
//             <div>
//               <span className="block font-bold text-lg tracking-tight text-slate-900 dark:text-white">
//                 {t.title}
//               </span>
//               <span className="block text-xs text-slate-500 dark:text-slate-400">{t.subtitle}</span>
//             </div>
//           </div>

//           <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
//             <a href="#hero" className="text-emerald-700 dark:text-emerald-400 font-bold">
//               {t.home}
//             </a>
//             <a
//               href="#news"
//               className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
//             >
//               {t.news}
//             </a>
//             <a
//               href="#specialized"
//               className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
//             >
//               {t.sectors}
//             </a>
//             <a
//               href="#services"
//               className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
//             >
//               {t.services}
//             </a>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Link
//               href={`/${t.targetLocale}`}
//               className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
//             >
//               {t.switchLang}
//             </Link>
//             <a
//               href="/admin"
//               className="px-4 py-2 text-sm font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-all shadow-sm"
//             >
//               {t.admin}
//             </a>
//           </div>
//         </div>
//       </header>
//       {/* 2. Breaking News Ticker (Dynamic) */}
//       {tickerData?.isActive && tickerData?.text && (
//         <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 py-2.5">
//           <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
//             <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md shrink-0 animate-pulse">
//               {t.urgent}
//             </span>
//             <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
//               {tickerData.link ? (
//                 <a href={tickerData.link} className="hover:underline">
//                   {tickerData.text}
//                 </a>
//               ) : (
//                 tickerData.text
//               )}
//             </div>
//           </div>
//         </section>
//       )}
//       {/* 3. Hero & Highlights Section (Dynamic) */}
//       <section id="hero" className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Slider / Featured Post */}
//           <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between min-h-[400px]">
//             {mainHero ? (
//               <div className="relative h-full flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent">
//                 {mainHero.featuredImage && typeof mainHero.featuredImage === 'object' && (
//                   <Image
//                     src={mainHero.featuredImage.url || ''}
//                     alt={mainHero.featuredImage.alt || mainHero.title}
//                     fill
//                     className="object-cover -z-10"
//                     priority
//                   />
//                 )}
//                 <span
//                   className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm`}
//                 >
//                   {t.heroBadge}
//                 </span>
//                 <div className="space-y-3 z-10">
//                   <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
//                     {mainHero.title}
//                   </h2>
//                   {mainHero.excerpt && (
//                     <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed">
//                       {mainHero.excerpt}
//                     </p>
//                   )}
//                   <div className="pt-2">
//                     <Link
//                       href={`/${locale}/posts/${mainHero.slug}`}
//                       className="inline-flex items-center text-xs font-bold text-emerald-400 hover:text-emerald-300 gap-1"
//                     >
//                       {t.readMore} {isAr ? '←' : '→'}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-8 text-center text-slate-500">{t.noNews}</div>
//             )}
//           </div>

//           {/* Highlights Sidebar */}
//           <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
//             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">
//               {t.highlightsTitle}
//             </h3>
//             <div className="space-y-4">
//               {highlightPosts.docs.length > 0 ? (
//                 highlightPosts.docs.map((post) => {
//                   const item = post as Post
//                   const category =
//                     item.category && typeof item.category === 'object'
//                       ? (item.category as Category)
//                       : null
//                   return (
//                     <article key={item.id} className="group cursor-pointer">
//                       {category && (
//                         <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
//                           {category.title}
//                         </span>
//                       )}
//                       <Link href={`/${locale}/posts/${item.slug}`}>
//                         <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
//                           {item.title}
//                         </h4>
//                       </Link>
//                       <time className="text-[11px] text-slate-400 block mt-1">
//                         {item.publishedAt
//                           ? new Date(item.publishedAt).toLocaleDateString(
//                               locale === 'ar' ? 'ar-SD' : 'en-US',
//                             )
//                           : ''}
//                       </time>
//                     </article>
//                   )
//                 })
//               ) : (
//                 <p className="text-xs text-slate-400">{t.noNews}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* 4. Specialized Sector News Grid (Dynamic) */}
//       <section id="specialized" className="max-w-7xl mx-auto px-6 py-8">
//         <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">
//           {t.standardNewsTitle}
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {standardPosts.docs.length > 0 ? (
//             standardPosts.docs.map((post) => {
//               const item = post as Post
//               const category =
//                 item.category && typeof item.category === 'object'
//                   ? (item.category as Category)
//                   : null
//               const image =
//                 item.featuredImage && typeof item.featuredImage === 'object'
//                   ? item.featuredImage
//                   : null

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
//                 >
//                   {image?.url && (
//                     <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
//                       <Image
//                         src={image.url}
//                         alt={image.alt || item.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   )}
//                   <div className="p-5 flex-1 flex flex-col justify-between">
//                     <div>
//                       {category && (
//                         <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-2">
//                           {category.title}
//                         </span>
//                       )}
//                       <Link href={`/${locale}/posts/${item.slug}`}>
//                         <h4 className="font-bold text-base text-slate-900 dark:text-white hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
//                           {item.title}
//                         </h4>
//                       </Link>
//                       {item.excerpt && (
//                         <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
//                           {item.excerpt}
//                         </p>
//                       )}
//                     </div>
//                     <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
//                       <time>
//                         {item.publishedAt
//                           ? new Date(item.publishedAt).toLocaleDateString(
//                               locale === 'ar' ? 'ar-SD' : 'en-US',
//                             )
//                           : ''}
//                       </time>
//                       <Link
//                         href={`/${locale}/posts/${item.slug}`}
//                         className="font-semibold text-emerald-600 hover:underline"
//                       >
//                         {t.readMore}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })
//           ) : (
//             <p className="col-span-full text-slate-400 text-sm">{t.noNews}</p>
//           )}
//         </div>
//       </section>
//       {/* 5. E-Services & Directory Section */}
//       <ServicesSection services={servicesData.docs as Service[]} locale={locale} />
//     </div>
//   )
// }

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post, Category, Service } from '@/payload-types'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { HeroSlider, NewsItem } from '@/components/HeroSlider'
import { ServicesSection } from '@/components/ServicesSection'

// دالة مساعدة معالجة ومضمونة لاستخراج رابط الصورة من Payload Media
function getMediaUrl(imageField: any): string {
  if (!imageField) return ''

  let rawUrl = ''

  if (typeof imageField === 'object' && imageField !== null && imageField.url) {
    rawUrl = imageField.url
  } else if (typeof imageField === 'string') {
    rawUrl = imageField
  }

  if (!rawUrl) return ''

  // إذا كانت الصورة مساراً محلياً، أرجع المسار النسبي فقط (مثل /api/media/file/...)
  // هذا يمنع Next.js من التعامل مع localhost كـ Private IP محظور
  if (rawUrl.startsWith('http://localhost:3000') || rawUrl.startsWith('https://localhost:3000')) {
    return rawUrl.replace(/^https?:\/\/localhost:3000/, '')
  }

  // إذا كان الرابط الخارجي كاملاً (مثل Unsplash أو سيرفر آخر)
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  // للتأكد من وجود / في بداية المسار النسبي
  return rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = String(resolvedParams.locale)
  const isRtl = locale === 'ar'
  const payload = await getPayload({ config: configPromise })

  // 1. جلب الأخبار الرئيسية (Featured Posts) للسلايدر
  const featuredPostsRes = await payload.find({
    collection: 'posts',
    locale: locale as 'ar' | 'en',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 5,
    sort: '-createdAt',
    depth: 2,
  })

  // تحويل بيانات Posts إلى الهيكل الخاص بـ HeroSlider (NewsItem)
  const heroNews: NewsItem[] = featuredPostsRes.docs.map((post: Post) => {
    const rawImage = post.meta?.image || (post as any).featuredImage || (post as any).heroImage
    const extractedUrl = getMediaUrl(rawImage)

    const imageUrl =
      extractedUrl ||
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'

    const postSlug = post.slug || String(post.id)

    let categoryName = isRtl ? 'خبر رئيسي' : 'Featured'
    if (post.categories && post.categories.length > 0) {
      const firstCat = post.categories[0]
      if (typeof firstCat === 'object' && firstCat !== null) {
        categoryName = (firstCat as Category).title || categoryName
      }
    }

    return {
      id: String(post.id),
      title: post.title,
      summary: post.meta?.description || post.title,
      imageUrl,
      slug: postSlug,
      category: categoryName,
      date: post.createdAt,
    }
  })

  // 2. جلب الخدمات الإلكترونية
  const servicesRes = await payload.find({
    collection: 'services',
    locale: locale as 'ar' | 'en',
    limit: 6,
    sort: 'createdAt',
  })

  // 3. جلب أحدث الأخبار والأنشطة لشبكة الأخبار (Latest News)
  const latestPostsRes = await payload.find({
    collection: 'posts',
    locale: locale as 'ar' | 'en',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 6,
    sort: '-createdAt',
    depth: 2,
  })

  const latestPosts = latestPostsRes.docs.map((post: Post) => {
    const rawImage = post.meta?.image || (post as any).featuredImage || (post as any).heroImage
    const extractedUrl = getMediaUrl(rawImage)

    const imageUrl =
      extractedUrl ||
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'

    const postSlug = post.slug || String(post.id)

    let categoryName = isRtl ? 'عام' : 'General'
    if (post.categories && post.categories.length > 0) {
      const firstCat = post.categories[0]
      if (typeof firstCat === 'object' && firstCat !== null) {
        categoryName = (firstCat as Category).title || categoryName
      }
    }

    return {
      id: String(post.id),
      title: post.title,
      summary: post.meta?.description || post.title,
      imageUrl,
      slug: postSlug,
      category: categoryName,
      date: post.createdAt,
    }
  })

  return (
    <div className="space-y-16 pb-16 bg-slate-50/50">
      {/* 1. قسم الأخبار الرئيسية التفاعلي (Hero Slider) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {heroNews.length > 0 ? (
          <HeroSlider news={heroNews} locale={locale} />
        ) : (
          /* حالة احتياطية في حال عدم وجود أخبار */
          <div className="bg-emerald-900 text-white rounded-3xl p-12 text-center space-y-4 shadow-xl">
            <h1 className="text-3xl font-bold">
              {isRtl ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council'}
            </h1>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              {isRtl
                ? 'مرحباً بكم في البوابة الإلكترونية الرسمية للمجلس الزراعي السوداني.'
                : 'Welcome to the official portal of the Sudanese Agricultural Council.'}
            </p>
          </div>
        )}
      </section>

      {/* 2. قسم الخدمات الإلكترونية والدليل المهني */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesSection services={servicesRes.docs as Service[]} locale={locale} />
      </section>

      {/* 3. قسم أحدث الأخبار والأنشطة */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رأس القسم */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-md">
                {isRtl ? 'المركز الإعلامي' : 'Media Center'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
                {isRtl ? 'أحدث المستجدات والأخبار' : 'Latest News & Updates'}
              </h2>
            </div>

            <Link
              href={`/${locale}/posts`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group"
            >
              <span>{isRtl ? 'تصفح كافة الأخبار' : 'Browse All News'}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>

          {/* شبكة الأخبار (Grid) */}
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                >
                  {/* صورة الخبر */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  {/* محتوى الخبر */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <time>
                          {new Date(post.date).toLocaleDateString(isRtl ? 'ar-SD' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                        <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={`/${locale}/posts/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                      >
                        <span>{isRtl ? 'اقرأ التفاصيل' : 'Read Full Article'}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              {isRtl ? 'لا توجد أخبار متاحة حالياً.' : 'No news available at the moment.'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
