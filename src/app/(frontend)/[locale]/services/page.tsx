import React from 'react'
import Link from 'next/link'
import { FileCheck, RefreshCw, SearchCheck, GraduationCap, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const services = [
    {
      icon: FileCheck,
      title: isAr ? 'طلب تسجيل مهني جديد' : 'New Professional Registration',
      desc: isAr ? 'التسجيل الأولي للمهندسين الزراعيين والخريجين الجدد للحصول على ترخيص الممارسة.' : 'First-time registration for agricultural engineers to get practice license.',
      status: isAr ? 'متاح الآن' : 'Available',
      href: `/${locale}/services/register`,
      active: true,
    },
    {
      icon: RefreshCw,
      title: isAr ? 'تجديد السجل المهني' : 'Renew Professional License',
      desc: isAr ? 'تجديد الاشتراك السنوي والبطاقة المهنية للمهندسين الممارسين.' : 'Annual renewal of professional registration card.',
      status: isAr ? 'متاح الآن' : 'Available',
      href: `/${locale}/services/renew`,
      active: true,
    },
    {
      icon: SearchCheck,
      title: isAr ? 'التحقق من صحة السجل' : 'Verify Registration Status',
      desc: isAr ? 'خدمة إلكترونية فورية للتحقق من قيد المهندس أو المؤسسة الزراعية.' : 'Instant online verification for professional registration validity.',
      href: `/${locale}/services/verify`,
      status: isAr ? 'متاح الآن' : 'Available',
      active: true,
    },
    {
      icon: GraduationCap,
      title: isAr ? 'اعتماد الدورات والتدريب' : 'Training Accreditation',
      desc: isAr ? 'تقديم طلبات الاعتماد المهني للورش والدورات التدريبية الزراعية.' : 'Apply for professional accreditation of agricultural courses.',
      status: isAr ? 'قريباً' : 'Coming Soon',
      href: '#',
      active: false,
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            {isAr ? 'الخدمات الإلكترونية' : 'E-Services Portal'}
          </h1>
          <p className="text-slate-600 text-sm">
            {isAr
              ? 'دليل الخدمات التنظيمية والمهنية المقدمة للمهندسين والمؤسسات الزراعية'
              : 'Digital administrative services for agricultural professionals and entities'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 border ${
                service.active ? 'border-slate-200/80 hover:border-emerald-300' : 'border-slate-200 opacity-80'
              } shadow-sm transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      service.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h2>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">{service.desc}</p>
              </div>

              <div>
                {service.active ? (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>{isAr ? 'بدء الخدمة' : 'Start Service'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {isAr ? 'الخدمة قيد التطوير' : 'Service under development'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}