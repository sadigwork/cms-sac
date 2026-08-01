// /* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
// /* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
// import React from 'react'
// import '@payloadcms/next/css'
// import './admin/custom.css'
// import config from '@payload-config'
// import type { ServerFunctionClient } from 'payload'
// import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

// import { importMap } from './admin/importMap.js'

// type Args = {
//   children: React.ReactNode
// }

// const serverFunction: ServerFunctionClient = async function (args) {
//   'use server'
//   return handleServerFunctions({
//     ...args,
//     config,
//     importMap,
//   })
// }

// const Layout = ({ children }: Args) => (
//   <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
//     {children}
//   </RootLayout>
// )

// export default Layout

/* src/app/(payload)/layout.tsx */
import React from 'react'
import '@payloadcms/next/css' // 1. تنسيقات Payload الأساسية
import './admin/custom.css'   // 2. التنسيقات المخصصة للمجلس (تغطي الأساسية)

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  )
}