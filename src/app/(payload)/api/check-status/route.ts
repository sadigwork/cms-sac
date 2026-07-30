import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  try {
    const { nationalId } = await request.json()

    if (!nationalId) {
      return NextResponse.json({ error: 'يرجى إدخال الرقم القومي/الوطني' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // البحث عن الطلب برقم الهوية
    const result = await payload.find({
      collection: 'registrations',
      where: {
        nationalId: {
          equals: nationalId.trim(),
        },
      },
      limit: 1,
      // عدم حصر الوصول بشرط الجلسة في الاستعلام البرمجي
      overrideAccess: true,
    })

    if (!result.docs || result.docs.length === 0) {
      return NextResponse.json(
        { error: 'لم يتم العثور على طلب تسجيل مرتبط بهذا الرقم القومي' },
        { status: 404 },
      )
    }

    const application = result.docs[0]

    // إرجاع البيانات العامة والمفيدة للمستعلم فقط
    return NextResponse.json({
      fullName: application.fullName,
      status: application.status,
      registrationNumber: application.registrationNumber || null,
      rejectionReason: application.rejectionReason || null,
      createdAt: application.createdAt,
    })
  } catch (err: any) {
    return NextResponse.json({ error: 'حدث خطأ في النظام أثناء معالجة الطلب' }, { status: 500 })
  }
}
