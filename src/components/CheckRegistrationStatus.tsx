'use client'

import React, { useState } from 'react'

interface ApplicationStatusResult {
  fullName: string
  status: 'pending' | 'provisionally_approved' | 'approved' | 'rejected' | 'action_required'
  registrationNumber?: string
  rejectionReason?: string
  createdAt: string
}

export const CheckRegistrationStatus: React.FC = () => {
  const [nationalId, setNationalId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ApplicationStatusResult | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!nationalId.trim()) {
      setError('يرجى كتابة الرقم القومي')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationalId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'فشل الاستعلام عن الطلب')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // خريطة حالات الطلب والنصوص المقابلة بألوان مناسبة
  const statusMap = {
    pending: { label: 'قيد المراجعة والتدقيق', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    provisionally_approved: {
      label: 'مقبول مبدئياً',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    approved: {
      label: 'مكتمل ومكتسب القيد المهني',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    rejected: { label: 'تم رفض الطلب', bg: 'bg-red-50 text-red-700 border-red-200' },
    action_required: {
      label: 'يتطلب تعديل / استكمال بيانات',
      bg: 'bg-orange-50 text-orange-700 border-orange-200',
    },
  }

  return (
    <div
      dir="rtl"
      className="max-w-xl mx-auto my-8 p-8 bg-white border border-slate-200 rounded-3xl shadow-xl font-sans"
    >
      <h2 className="text-xl font-black text-slate-900 mb-2 text-center">
        الاستعلام عن حالة القيد المهني
      </h2>
      <p className="text-xs text-slate-500 mb-6 text-center">
        أدخل الرقم القومي / الوطني الخاص بك لمعرفة آخر ما آلت إليه حالة طلب التسجيل.
      </p>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="أدخل الرقم القومي هنا..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-xs font-bold text-slate-500">اسم المتقدم:</span>
            <span className="text-xs font-black text-slate-900">{result.fullName}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-xs font-bold text-slate-500">حالة الطلب:</span>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                statusMap[result.status]?.bg || 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {statusMap[result.status]?.label || result.status}
            </span>
          </div>

          {result.registrationNumber && (
            <div className="p-4 bg-emerald-100/50 border border-emerald-300 rounded-xl text-center">
              <span className="block text-[11px] text-emerald-800 font-bold mb-1">
                رقم القيد المهني الصادر:
              </span>
              <span className="text-lg font-black tracking-wider text-emerald-900">
                {result.registrationNumber}
              </span>
            </div>
          )}

          {result.rejectionReason && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <span className="block text-xs font-bold text-red-700 mb-1">
                توجيهات اللجنة / أسباب التعديل والرفض:
              </span>
              <p className="text-xs text-red-600 leading-relaxed">{result.rejectionReason}</p>
            </div>
          )}

          <div className="text-[10px] text-slate-400 text-left pt-1">
            تاريخ تقديم الطلب: {new Date(result.createdAt).toLocaleDateString('ar-SD')}
          </div>
        </div>
      )}
    </div>
  )
}
