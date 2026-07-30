import { Payload } from 'payload'

interface EmailParams {
  payload: Payload
  to: string
  fullName: string
  status: string
  registrationNumber?: string
  rejectionReason?: string
}

export async function sendRegistrationStatusEmail({
  payload,
  to,
  fullName,
  status,
  registrationNumber,
  rejectionReason,
}: EmailParams) {
  let subject = ''
  let contentHtml = ''

  if (status === 'approved') {
    subject = 'تهانينا! تم اعتماد قيدك المهني - المجلس الزراعي السوداني'
    contentHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #059669;">عزيزي/ت المتقدم: ${fullName}</h2>
        <p>يسرنا إفادتك بأنه قد تم مراجعة طلبك واكتساب القيد المهني بنجاح لدى <strong>المجلس الزراعي السوداني</strong>.</p>
        <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #065f46;">رقم القيد المهني الصادر:</p>
          <h3 style="margin: 5px 0 0 0; color: #047857; font-size: 20px;">${registrationNumber || 'قيد الإصدار'}</h3>
        </div>
        <p>يمكنك الآن زيارة المقر الرئيسي أو استخدام البوابة الإلكترونية لاستخراج شهادة القيد والبطاقة المهنية.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">الأمانة العامة - المجلس الزراعي السوداني</p>
      </div>
    `
  } else if (status === 'rejected') {
    subject = 'تحديث بشأن طلب القيد المهني - المجلس الزراعي السوداني'
    contentHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #dc2626;">عزيزي/ت المتقدم: ${fullName}</h2>
        <p>نحيطكم علماً بأنه بعد مراجعة المستندات المقدمة لطلب التسجيل، تقرر <strong>عدم قبول الطلب</strong> في الوقت الحالي.</p>
        ${
          rejectionReason
            ? `
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">أسباب عدم القبول / الملاحظات:</p>
            <p style="margin: 5px 0 0 0; color: #b91c1c; font-size: 13px;">${rejectionReason}</p>
          </div>
        `
            : ''
        }
        <p>يمكنكم إعادة التقديم مرة أخرى بعد استيفاء الشروط والملاحظات الموضحة أعلاه.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">لجنة التدقيق والقيد المهني - المجلس الزراعي السوداني</p>
      </div>
    `
  } else if (status === 'action_required') {
    subject = 'مطلوب استكمال بيانات - المجلس الزراعي السوداني'
    contentHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2>عزيزي/ت المتقدم: ${fullName}</h2>
        <p>يتطلب طلب القيد الخاص بك استكمال أو تعديل بعض المستندات والبيانات للتمكن من إنهاء الإجراءات.</p>
        <div style="background-color: #fffbeeb; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #92400e; font-weight: bold;">التعديلات المطلوبة:</p>
          <p style="margin: 5px 0 0 0; color: #b45309; font-size: 13px;">${rejectionReason || 'يرجى مراجعة الدعم الفني'}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">المجلس الزراعي السوداني</p>
      </div>
    `
  }

  if (subject && contentHtml) {
    try {
      await payload.sendEmail({
        to,
        subject,
        html: contentHtml,
      })
    } catch (err) {
      payload.logger.error(`فشل إرسال الإشعار البريدي للعنوان ${to}:`, err)
    }
  }
}
