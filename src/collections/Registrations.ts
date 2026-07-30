import { CollectionConfig } from 'payload'
import { sendRegistrationStatusEmail } from '../utilities/sendRegistrationEmail'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'nationalId', 'degree', 'status', 'createdAt'],
    group: 'إدارة التسجيل المهني',
  },
  labels: {
    singular: { ar: 'طلب تسجيل', en: 'Registration Request' },
    plural: { ar: 'طلبات التسجيل', en: 'Registration Requests' },
  },
  access: {
    // يمكن للجميع التقديم (إنشاء طلب)
    create: () => true,
    // المسؤولين والمحققين فقط يمكنهم العرض والتعديل والحذف
    read: ({ req: { user } }) => Boolean(user && ['admin', 'registrar'].includes(user.role)),
    update: ({ req: { user } }) => Boolean(user && ['admin', 'registrar'].includes(user.role)),
    delete: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
  },
  // ----------------------------------------------------
  // إضافة الخطافات (Hooks)
  // ----------------------------------------------------
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        // نتحقق أولاً أن العملية هي تحديث (Update) وليست إنشاء جديد (Create)
        if (operation === 'update') {
          const currentStatus = doc.status
          const previousStatus = previousDoc?.status

          // التأكد من أن حالة الطلب قد تغيرت فعلياً عن الحالة السابقة
          if (currentStatus && currentStatus !== previousStatus) {
            // نتحقق من أن الحالة الجديدة هي إحدى الحالات المستهدفة
            if (['approved', 'rejected', 'action_required'].includes(currentStatus)) {
              await sendRegistrationStatusEmail({
                payload: req.payload,
                to: doc.email,
                fullName: doc.fullName,
                status: currentStatus,
                registrationNumber: doc.registrationNumber,
                rejectionReason: doc.rejectionReason,
              })
            }
          }
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ----------------------------------------------------
        // Tab 1: البيانات الشخصية والاتصال
        // ----------------------------------------------------
        {
          label: { ar: 'البيانات الشخصية', en: 'Personal Info' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'fullName',
                  type: 'text',
                  required: true,
                  label: { ar: 'الاسم الرباعي', en: 'Full Name' },
                },
                {
                  name: 'nationalId',
                  type: 'text',
                  required: true,
                  unique: true,
                  label: { ar: 'الرقم الوطني / الرقم القومي', en: 'National ID' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: { ar: 'البريد الإلكتروني', en: 'Email Address' },
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  label: { ar: 'رقم الهاتف', en: 'Phone Number' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'gender',
                  type: 'select',
                  options: [
                    { label: { ar: 'ذكر', en: 'Male' }, value: 'male' },
                    { label: { ar: 'أنثى', en: 'Female' }, value: 'female' },
                  ],
                  required: true,
                  label: { ar: 'النوع', en: 'Gender' },
                },
                {
                  name: 'dateOfBirth',
                  type: 'date',
                  required: true,
                  label: { ar: 'تاريخ الميلاد', en: 'Date of Birth' },
                },
                {
                  name: 'state',
                  type: 'text',
                  required: true,
                  label: { ar: 'الولاية / المحافظة', en: 'State/Governorate' },
                },
              ],
            },
          ],
        },

        // ----------------------------------------------------
        // Tab 2: المؤهلات الأكاديمية والتخصص
        // ----------------------------------------------------
        {
          label: { ar: 'المؤهل الأكاديمي', en: 'Academic Qualification' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'degree',
                  type: 'select',
                  required: true,
                  options: [
                    { label: { ar: 'بكالوريوس', en: 'BSc' }, value: 'bsc' },
                    {
                      label: { ar: 'دبلوم العالي', en: 'Higher Diploma' },
                      value: 'higher_diploma',
                    },
                    { label: { ar: 'ماجستير', en: 'MSc' }, value: 'msc' },
                    { label: { ar: 'دكتوراه', en: 'PhD' }, value: 'phd' },
                  ],
                  label: { ar: 'الدرجة العلمية', en: 'Academic Degree' },
                },
                {
                  name: 'specialization',
                  type: 'text',
                  required: true,
                  label: { ar: 'التخصص الدقيق', en: 'Specialization' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'university',
                  type: 'text',
                  required: true,
                  label: { ar: 'الجامعة / الكلية', en: 'University/College' },
                },
                {
                  name: 'graduationYear',
                  type: 'number',
                  required: true,
                  label: { ar: 'سنة التخرج', en: 'Graduation Year' },
                },
              ],
            },
          ],
        },

        // ----------------------------------------------------
        // Tab 3: المرفقات والمستندات الرسمية
        // ----------------------------------------------------
        {
          label: { ar: 'المستندات والمرفقات', en: 'Attachments' },
          fields: [
            {
              name: 'personalPhoto',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: { ar: 'الصورة الشخصية', en: 'Personal Photo' },
            },
            {
              name: 'degreeCertificate',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: { ar: 'شهادة البكالوريوس/المؤهل', en: 'Degree Certificate' },
            },
            {
              name: 'nationalIdCard',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: { ar: 'إثبات الشخصية (الهوية/الجواز)', en: 'National ID/Passport' },
            },
            {
              name: 'additionalDocuments',
              type: 'array',
              label: {
                ar: 'مستندات إضافية (شهادات خبرة / مؤهلات أخرى)',
                en: 'Additional Documents',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { ar: 'عنوان المستند', en: 'Document Title' },
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: { ar: 'الملف', en: 'File' },
                },
              ],
            },
          ],
        },

        // ----------------------------------------------------
        // Tab 4: حالة الطلب والتدقيق (إداري)
        // ----------------------------------------------------
        {
          label: { ar: 'حالة الطلب والتدقيق', en: 'Application Status' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'pending',
                  required: true,
                  options: [
                    { label: { ar: 'قيد المراجعة', en: 'Pending Review' }, value: 'pending' },
                    {
                      label: { ar: 'مقبول مبدئياً', en: 'Provisionally Approved' },
                      value: 'provisionally_approved',
                    },
                    {
                      label: { ar: 'مكتمل ومكتسب القيد', en: 'Approved & Registered' },
                      value: 'approved',
                    },
                    { label: { ar: 'مرفوض', en: 'Rejected' }, value: 'rejected' },
                    {
                      label: { ar: 'يتطلب تعديل/استكمال', en: 'Requires Action' },
                      value: 'action_required',
                    },
                  ],
                  label: { ar: 'حالة الطلب', en: 'Status' },
                },
                {
                  name: 'registrationNumber',
                  type: 'text',
                  admin: {
                    description: {
                      ar: 'يتم إصدار هذا الرقم عند اعتماد القيد النهائي',
                      en: 'Issued upon final approval',
                    },
                  },
                  label: { ar: 'رقم القيد المهني', en: 'Registration Number' },
                },
              ],
            },
            {
              name: 'rejectionReason',
              type: 'textarea',
              admin: {
                condition: (data) => ['rejected', 'action_required'].includes(data?.status),
              },
              label: { ar: 'أسباب الرفض / ملاحظات التعديل', en: 'Rejection/Notes Reason' },
            },
            {
              name: 'adminNotes',
              type: 'textarea',
              label: { ar: 'ملاحظات داخلية للمسؤولين', en: 'Internal Admin Notes' },
            },
          ],
        },
      ],
    },
  ],
}
