// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export const CustomLogin: React.FC = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       // إرسال طلب تسجيل الدخول إلى API الخاص بـ Payload
//       const res = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.errors?.[0]?.message || 'فشل تسجيل الدخول، تحقق من البيانات')
//       }

//       // التوجيه إلى الصفحة الرئيسية للوحة الإدارة عند النجاح
//       router.push('/admin')
//       router.refresh()
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 dir-rtl">
//       <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-4 font-bold text-2xl">
//             🌱
//           </div>
//           <h1 className="text-2xl font-extrabold text-slate-900">بوابة الإدارة</h1>
//           <p className="text-slate-500 text-xs mt-1">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-xs font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
//               placeholder="admin@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-slate-700 mb-2">كلمة المرور</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
//           >
//             {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
// 'use client'

import React from 'react'
import { CustomLoginClient } from './CustomLoginClient'

// مكون سيرفر خالص بدون 'use client' وبدون استقبال أي Props من Payload
export const CustomLogin: React.FC = () => {
  return <CustomLoginClient />
}
