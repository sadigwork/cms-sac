'use client'

import React, { useState, use } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default function ContactPage({ params }: ContactPageProps) {
  // استخدام use() المباشر لفك الـ Promise الخاصة بـ params في Client Component
  const resolvedParams = use(params)
  const isAr = resolvedParams.locale === 'ar'

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            {isAr ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-slate-600 text-sm">
            {isAr
              ? 'يسعدنا استقبال استفساراتكم وملاحظاتكم المتعلقة بالتسجيل والخدمات المهنية'
              : 'We are here to answer your inquiries regarding registration and professional services'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* معلومات التواصل */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {isAr ? 'العنوان الرئيسي' : 'Main Office'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isAr ? 'الخرطوم، جمهورية السودان' : 'Khartoum, Republic of Sudan'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {isAr ? 'الهاتف' : 'Phone'}
                </h3>
                <p className="text-xs text-slate-500 text-right" dir="ltr">
                  +249 123 456 789
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </h3>
                <p className="text-xs text-slate-500">info@agricouncil.gov.sd</p>
              </div>
            </div>
          </div>

          {/* نموذج الرسالة */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">
                  {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  {isAr
                    ? 'نشكرك على التواصل معنا، سيقوم الفريق المختص بالرد عليك في أقرب وقت.'
                    : 'Thank you for reaching out. Our team will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isAr ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isAr ? 'موضوع الرسالة' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isAr ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
