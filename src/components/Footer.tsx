'use client'

import React from 'react'
import Link from 'next/link'
import { Sprout, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

// --- مكونات SVG مخصصة لأيقونات منصات التواصل الاجتماعي ---

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

// --- المكون الرئيسي ---

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const isAr = locale === 'ar'

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* العمود الأول: الهوية والتعريف */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-2xl text-white shadow-md shadow-emerald-900">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-white leading-tight">
                  {isAr ? 'المجلس الزراعي السوداني' : 'Sudanese Agricultural Council'}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {isAr ? 'البوابة الرسمية' : 'Official Portal'}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed pt-2">
              {isAr
                ? 'الهيئة الرسمية المنظمة للممارسة المهنية الزراعية وتنفيذ الخدمات الإلكترونية للتسجيل والسجلات للمهندسين الزراعيين بالسودان.'
                : 'The official governing body regulating agricultural practice and providing electronic registration services in Sudan.'}
            </p>

            {/* روابط التواصل الاجتماعي باستخدام المكونات المخصصة */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/posts`}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'مركز الأخبار والمقالات' : 'News Center'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/tags`}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'دليل الوسوم' : 'Tags Directory'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'عن المجلس واللوائح' : 'About & Regulations'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: الخدمات المهنية */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">
              {isAr ? 'الخدمات الإلكترونية' : 'E-Services'}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer">
                <span>{isAr ? 'التسجيل المهني الجديد' : 'New Professional Registration'}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </li>
              <li className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer">
                <span>{isAr ? 'تجديد السجل المهني' : 'Renew Professional License'}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </li>
              <li className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer">
                <span>{isAr ? 'التحقق من صحة السجل' : 'Verify Registration Status'}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </li>
            </ul>
          </div>

          {/* العمود الرابع: معلومات التواصل */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">
              {isAr ? 'معلومات الاتصال' : 'Contact Us'}
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{isAr ? 'الخرطوم، جمهورية السودان' : 'Khartoum, Republic of Sudan'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span dir="ltr">+249 123 456 789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>info@agricouncil.gov.sd</span>
              </li>
            </ul>
          </div>
        </div>

        {/* أسفل الفوتر الحقوق والشروط */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            {isAr
              ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة - المجلس الزراعي السوداني`
              : `© ${new Date().getFullYear()} All rights reserved - Sudanese Agricultural Council`}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-slate-400 transition-colors">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-slate-400 transition-colors">
              {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
