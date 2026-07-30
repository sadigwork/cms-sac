import React from 'react'
import { MultiStepRegistrationForm } from '@/components/MultiStepRegistrationForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h1 className="text-3xl font-black text-slate-900">بوابة القيد والتسجيل المهني</h1>
        <p className="text-slate-500 text-xs mt-2">
          المجلس الزراعي السوداني - تقديم طلبات القيد للشرائح الزراعية والمهنية
        </p>
      </div>

      <MultiStepRegistrationForm />
    </main>
  )
}
