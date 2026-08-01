// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next'

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // استثناء مسارات الأدمن و API والملفات الثابتة من معالجة التدويل
//   if (
//     pathname.startsWith('/admin') ||
//     pathname.startsWith('/api') ||
//     pathname.startsWith('/_next') ||
//     pathname.includes('.')
//   ) {
//     return NextResponse.next()
//   }

//   // منطق التدويل الخاص بك (مثال للتوجيه إذا لم يحوي المسار لغة)
//   const pathnameHasLocale = ['ar', 'en'].some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
//   )

//   if (!pathnameHasLocale) {
//     const locale = 'ar' // اللغة الافتراضية
//     return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   // مطابقة كافة المسارات واستثناء مسارات Payload والملفات
//   matcher: ['/((?!api|_next/static|_next/image|admin|favicon.ico).*)'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. إعادة التوجيه من / إلى /ar
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url))
  }

  // 2. التحقق من وجود اللغة في باقي مسارات الواجهة
  const pathnameHasLocale = ['ar', 'en'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    return NextResponse.redirect(new URL(`/ar${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // استثناء مسارات الأدمن والـ API والملفات الثابتة بشكل كامل
  matcher: ['/((?!admin|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
