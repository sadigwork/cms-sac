import React from 'react'
import { Sprout, Target, ShieldCheck, Users, BookOpen, Award } from 'lucide-react'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const goals = [
    {
      icon: ShieldCheck,
      title: isAr ? 'تنظيم الممارسة المهنية' : 'Professional Regulation',
      desc: isAr
        ? 'منح التراخيص وضبط أخلاقيات المهنة وتوثيق الشهادات الأكاديمية والمهنية.'
        : 'Granting licenses, setting ethical standards, and verifying credentials.',
    },
    {
      icon: BookOpen,
      title: isAr ? 'التدريب والتطوير' : 'Training & Development',
      desc: isAr
        ? 'رفع كفاءة الكوادر الزراعية من خلال برامج التدريب المستمر والورش الفنية.'
        : 'Enhancing professional skills through continuous training programs.',
    },
    {
      icon: Users,
      title: isAr ? 'حماية حقوق المهنيين' : 'Protecting Professionals',
      desc: isAr
        ? 'تمثيل المهندسين الزراعيين ورعاية مصالحهم وتطوير البيئة المهنية.'
        : 'Representing agricultural engineers and advocating for professional standards.',
    },
    {
      icon: Award,
      title: isAr ? 'الاعتماد وجودة الخدمات' : 'Quality & Accreditation',
      desc: isAr
        ? 'تطبيق أعلى معايير الجودة في الممارسات الزراعية والأنشطة المرتبطة بها.'
        : 'Applying top quality standards in agricultural practices and related fields.',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* الهيدر الرئيسي */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Sprout className="w-4 h-4" />
            <span>{isAr ? 'عن المجلس الزراعي السوداني' : 'About the Council'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {isAr
              ? 'الريادة في تنظيم وتطوير المهنة الزراعية بالسودان'
              : 'Leading and Regulating Agricultural Profession in Sudan'}
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {isAr
              ? 'المجلس الزراعي السوداني هو الهيئة الرسمية المعنية بتنظيم وتأطير الممارسة المهنية للعلوم والهندسة الزراعية، لضمان أعلى معايير الجودة في الكوادر والأنشطة الزراعية بالبلاد.'
              : 'The official body dedicated to regulating agricultural engineering and professional standards to drive sustainable growth in Sudan.'}
          </p>
        </div>

        {/* قسم الرؤية والرسالة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {isAr
                ? 'الوصول إلى قطاع زراعي مستدام ومبتكر يقوده مهنيون مؤهلون وفق أعلى المعايير الدولية، لتأمين الغذاء ودعم الاقتصاد الوطني.'
                : 'To foster a sustainable and innovative agricultural sector led by highly qualified professionals.'}
            </p>
          </div>

          <div className="bg-emerald-900 text-white p-8 rounded-3xl border border-emerald-800 shadow-md relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-800/80 text-emerald-300 rounded-2xl flex items-center justify-center mb-6">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-3">{isAr ? 'رسالتنا' : 'Our Mission'}</h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              {isAr
                ? 'تنظيم الممارسة المهنية، وحماية حقوق المنتسبين، وتقديم خدمات رقمية متميزة تسهم في النهضة الزراعية الشاملة في السودان.'
                : 'Regulating professional practice, protecting members rights, and providing advanced e-services.'}
            </p>
          </div>
        </div>

        {/* شبكة الأهداف */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            {isAr ? 'الأهداف الاستراتيجية للمجلس' : 'Strategic Objectives'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-colors"
              >
                <goal.icon className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-base font-bold text-slate-900 mb-2">{goal.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
