import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const formData = await request.formData()

    // 1. استخراج الملفات
    const personalPhoto = formData.get('personalPhoto') as File | null
    const degreeCertificate = formData.get('degreeCertificate') as File | null
    const nationalIdCard = formData.get('nationalIdCard') as File | null

    if (!personalPhoto || !degreeCertificate || !nationalIdCard) {
      return NextResponse.json(
        { error: 'جميع المستندات الأساسية مطلوبة (الصورة، الشهادة، إثبات الهوية)' },
        { status: 400 },
      )
    }

    // دالة رفع المستندات إلى Media
    const uploadMedia = async (file: File) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      return await payload.create({
        collection: 'media',
        data: { alt: file.name },
        file: {
          data: buffer,
          name: file.name,
          mimetype: file.type,
          size: file.size,
        },
      })
    }

    const photoDoc = await uploadMedia(personalPhoto)
    const certDoc = await uploadMedia(degreeCertificate)
    const idDoc = await uploadMedia(nationalIdCard)

    // 2. تجميع البيانات النصية
    const userEmail = formData.get('email') as string
    const userName = formData.get('fullName') as string

    const newRegistration = await payload.create({
      collection: 'registrations',
      data: {
        fullName: userName,
        nationalId: formData.get('nationalId') as string,
        email: userEmail,
        phone: formData.get('phone') as string,
        gender: formData.get('gender') as 'male' | 'female',
        dateOfBirth: formData.get('dateOfBirth') as string,
        state: formData.get('state') as string,
        degree: formData.get('degree') as 'bsc' | 'higher_diploma' | 'msc' | 'phd',
        specialization: formData.get('specialization') as string,
        university: formData.get('university') as string,
        graduationYear: Number(formData.get('graduationYear')),
        personalPhoto: photoDoc.id,
        degreeCertificate: certDoc.id,
        nationalIdCard: idDoc.id,
        status: 'pending',
      },
    })

    // 3. إرسال بريد تأكيد للمستخدم باستخدام Payload Email الآمن
    try {
      await payload.sendEmail({
        to: userEmail,
        subject: 'تأكيد استلام طلب التسجيل المهني - المجلس الزراعي السوداني',
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>مرحباً ${userName}،</h2>
            <p>تم استلام طلب التسجيل المهني الخاص بك بنجاح.</p>
            <p>طلبك حالياً <strong>قيد المراجعة والتدقيق</strong> من قبل لجنة التسجيل.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">المجلس الزراعي السوداني - البوابة الإلكترونية</p>
          </div>
        `,
      })
    } catch (emailErr) {
      // إحاطة الإرسال بحماية حتى لا يتعطل التسجيل لو كانت هناك مشكلة في مفتاح API الخاص بـ Resend
      console.warn('⚠️ فشل إرسال بريد التأكيد (تم تجاهل الخطأ):', emailErr)
    }

    return NextResponse.json({
      success: true,
      message: 'تم إرسال طلب التسجيل بنجاح!',
      id: newRegistration.id,
    })
  } catch (error: any) {
    console.error('Registration API Error:', error)

    if (error.message?.includes('nationalId') || error.code === 11000) {
      return NextResponse.json({ error: 'الرقم الوطني مُسجل مسبقاً في النظام' }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً' },
      { status: 500 },
    )
  }
}
