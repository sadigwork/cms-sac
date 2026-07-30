// import React from 'react'

// export const Logo: React.FC = () => {
//   return (
//     <div className="flex items-center gap-2 py-2">
//       <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
//       <span className="font-bold text-slate-800 text-lg">بوابة المجلس الزراعي</span>
//     </div>
//   )
// }
'use client'

import React from 'react'

export const PlantIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 4.4-3.6 8-8 8z" />
    <path d="M12 20v-8" />
    <path d="M7 13a4 4 0 0 1 4-4" />
  </svg>
)

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-1 font-sans">
      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md">
        <PlantIcon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-sm text-slate-900 leading-tight">المجلس الزراعي</span>
        <span className="text-[10px] text-emerald-700 font-semibold">بوابة الإدارة</span>
      </div>
    </div>
  )
}
