'use client'

import React, { useState } from 'react'

interface AdditionalDoc {
  title: string
  file: File | null
}

export const MultiStepRegistrationForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // 1. البيانات الشخصية
  const [personalData, setPersonalData] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    gender: 'male',
    dateOfBirth: '',
    state: '',
  })

  // 2. المؤهل الأكاديمي
  const [academicData, setAcademicData] = useState({
    degree: 'bsc',
    specialization: '',
    university: '',
    graduationYear: new Date().getFullYear(),
  })

  // 3. المستندات والمرفقات
  const [files, setFiles] = useState<{
    personalPhoto: File | null
    degreeCertificate: File | null
    nationalIdCard: File | null
  }>({
    personalPhoto: null,
    degreeCertificate: null,
    nationalIdCard: null,
  })

  const [additionalDocs, setAdditionalDocs] = useState<AdditionalDoc[]>([])

  // التعديل على الحقول النصية
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value })
  }

  const handleAcademicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAcademicData({ ...academicData, [e.target.name]: e.target.value })
  }

  // التعامل مع الملفات الرئيسية
  const handleFileChange = (key: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }))
  }

  // إضافة/تعديل مستند إضافي
  const addAdditionalDoc = () => {
    setAdditionalDocs([...additionalDocs, { title: '', file: null }])
  }

  const updateAdditionalDoc = (index: number, field: 'title' | 'file', value: any) => {
    const updated = [...additionalDocs]
    updated[index][field] = value
    setAdditionalDocs(updated)
  }

  const removeAdditionalDoc = (index: number) => {
    setAdditionalDocs(additionalDocs.filter((_, i) => i !== index))
  }

  // دالة رفع ملف فردي إلى Payload Media API
  const uploadMediaFile = async (file: File, altText: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', altText)

    const res = await fetch('/api/media', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error(`فشل رفع الملف: ${file.name}`)
    const data = await res.json()
    return data.doc.id
  }

  // الانتقال للخطوة التالية مع تحقق بسيط
  const nextStep = () => {
    setError('')
    if (step === 1) {
      if (
        !personalData.fullName ||
        !personalData.nationalId ||
        !personalData.email ||
        !personalData.phone ||
        !personalData.dateOfBirth ||
        !personalData.state
      ) {
        setError('يرجى ملء جميع البيانات الشخصية المطلوبة قبل المتابعة')
        return
      }
    } else if (step === 2) {
      if (
        !academicData.specialization ||
        !academicData.university ||
        !academicData.graduationYear
      ) {
        setError('يرجى ملء جميع بيانات المؤهل الأكاديمي المطلوبة')
        return
      }
    }
    setStep((prev) => (prev + 1) as 2 | 3)
  }

  const prevStep = () => {
    setError('')
    setStep((prev) => (prev - 1) as 1 | 2)
  }

  // إرسال النموذج الكلي
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!files.personalPhoto || !files.degreeCertificate || !files.nationalIdCard) {
      setError('يرجى إرفاق المستندات الأساسية الثلاثة المطلوبة (الصورة الشخصية، الشهادة، والهوية)')
      return
    }

    setLoading(true)

    try {
      // 1. رفع الملفات الأساسية
      const personalPhotoId = await uploadMediaFile(
        files.personalPhoto,
        `صورة شخصية - ${personalData.fullName}`,
      )
      const degreeCertificateId = await uploadMediaFile(
        files.degreeCertificate,
        `شهادة - ${personalData.fullName}`,
      )
      const nationalIdCardId = await uploadMediaFile(
        files.nationalIdCard,
        `إثبات شخصية - ${personalData.fullName}`,
      )

      // 2. رفع المستندات الإضافية إن وجدت
      const uploadedAdditionalDocs = []
      for (const doc of additionalDocs) {
        if (doc.file && doc.title) {
          const fileId = await uploadMediaFile(doc.file, `${doc.title} - ${personalData.fullName}`)
          uploadedAdditionalDocs.push({
            title: doc.title,
            file: fileId,
          })
        }
      }

      // 3. إنشاء طلب التسجيل في مجموعة Registrations
      const regRes = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...personalData,
          ...academicData,
          graduationYear: Number(academicData.graduationYear),
          personalPhoto: personalPhotoId,
          degreeCertificate: degreeCertificateId,
          nationalIdCard: nationalIdCardId,
          additionalDocuments: uploadedAdditionalDocs,
          status: 'pending',
        }),
      })

      const regData = await regRes.json()

      if (!regRes.ok) {
        throw new Error(
          regData.errors?.[0]?.message || 'حدث خطأ أثناء حفظ الطلب، يرجى التأكد من البيانات',
        )
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تقديم الطلب')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div
        dir="rtl"
        className="max-w-2xl mx-auto my-12 p-10 bg-emerald-50 border border-emerald-200 rounded-3xl text-center font-sans"
      >
        <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold shadow-lg shadow-emerald-600/30">
          ✓
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">تم تسليم طلب القيد بنجاح!</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          تم استقبال طلبك بنجاح وحفظه تحت مراجعة الأمانة العامة للمجلس الزراعي. سيتم إخطارك بنتيجة
          التدقيق عبر البريد الإلكتروني المدخل:{' '}
          <span className="font-bold text-slate-800">{personalData.email}</span>.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
        >
          تقديم طلب جديد
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white border border-slate-200/80 rounded-3xl shadow-xl font-sans">
      {/* شريط خطوات التقديم Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-0" />

          {[
            { num: 1, label: 'البيانات الشخصية' },
            { num: 2, label: 'المؤهل الأكاديمي' },
            { num: 3, label: 'المرفقات والمستندات' },
          ].map((item) => (
            <div key={item.num} className="relative z-10 flex flex-col items-center bg-white px-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step >= item.num
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {item.num}
              </div>
              <span
                className={`text-[11px] font-bold mt-2 ${step >= item.num ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: البيانات الشخصية والاتصال */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3">
              1. البيانات الشخصية ومعلومات الاتصال
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الاسم الرباعي *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={personalData.fullName}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                  placeholder="محمد أحمد علي عبد الله"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الرقم الوطني / القومي *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  required
                  value={personalData.nationalId}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                  placeholder="123-456-789"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={personalData.email}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs dir-ltr text-right transition-all"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={personalData.phone}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs dir-ltr text-right transition-all"
                  placeholder="+249..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">النوع *</label>
                <select
                  name="gender"
                  value={personalData.gender}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs bg-white transition-all"
                >
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  تاريخ الميلاد *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={personalData.dateOfBirth}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الولاية / المحافظة *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={personalData.state}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                  placeholder="الخرطوم / الجزيرة..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                التالي: المؤهل الأكاديمي ←
              </button>
            </div>
          </div>
        )}

        {/* Step 2: المؤهل الأكاديمي */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3">
              2. بيانات المؤهل الأكاديمي والتخصص
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الدرجة العلمية *
                </label>
                <select
                  name="degree"
                  value={academicData.degree}
                  onChange={handleAcademicChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs bg-white transition-all"
                >
                  <option value="bsc">بكالوريوس</option>
                  <option value="higher_diploma">دبلوم العالي</option>
                  <option value="msc">ماجستير</option>
                  <option value="phd">دكتوراه</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  التخصص الدقيق *
                </label>
                <input
                  type="text"
                  name="specialization"
                  required
                  value={academicData.specialization}
                  onChange={handleAcademicChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                  placeholder="مثال: وقاية مزروعات / إرشاد زراعي"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الجامعة / الكلية *
                </label>
                <input
                  type="text"
                  name="university"
                  required
                  value={academicData.university}
                  onChange={handleAcademicChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                  placeholder="جامعة الخرطوم - كلية الزراعة"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">سنة التخرج *</label>
                <input
                  type="number"
                  name="graduationYear"
                  required
                  min="1970"
                  max={new Date().getFullYear()}
                  value={academicData.graduationYear}
                  onChange={handleAcademicChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                → السابق
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                التالي: المرفقات والمستندات ←
              </button>
            </div>
          </div>
        )}

        {/* Step 3: المستندات والمرفقات */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3">
              3. رفع المرفقات والمستندات الرسمية
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الصورة الشخصية *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange('personalPhoto', e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-xl cursor-pointer file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شهادة البكالوريوس/المؤهل *
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={(e) =>
                    handleFileChange('degreeCertificate', e.target.files?.[0] || null)
                  }
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-xl cursor-pointer file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  إثبات الشخصية (الهوية/الجواز) *
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={(e) => handleFileChange('nationalIdCard', e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-xl cursor-pointer file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
            </div>

            {/* قسم المستندات الإضافية (Array) */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-800">
                  مستندات إضافية (اختياري - شهادات خبرة / مؤهلات أخرى)
                </span>
                <button
                  type="button"
                  onClick={addAdditionalDoc}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold hover:bg-emerald-100 transition-all"
                >
                  + إضافة مستند
                </button>
              </div>

              {additionalDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center gap-3 p-3 mb-3 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <input
                    type="text"
                    placeholder="عنوان المستند (مثال: شهادة خبرة)"
                    value={doc.title}
                    onChange={(e) => updateAdditionalDoc(idx, 'title', e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => updateAdditionalDoc(idx, 'file', e.target.files?.[0] || null)}
                    className="w-full md:w-2/3 text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-white file:text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalDoc(idx)}
                    className="text-red-500 text-xs font-bold px-2 py-1 hover:text-red-700"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={loading}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all disabled:opacity-50"
              >
                → السابق
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
              >
                {loading ? 'جاري رفع المستندات وحفظ الطلب...' : 'تأكيد وإرسال طلب القيد'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
