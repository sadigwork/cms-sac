import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    // useAsTitle: 'email',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'createdAt'],
  },
  auth: true,
  access: {
    // فقط المدير يملك صلاحية إنشاء مستخدمين جدد
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    // المستخدم يستطيع قراءة بياناته بنفسه، أو المدير يقرأ الجميع
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // المدير فقط يملك تعديل الأدوار وباقي المستخدمين تعديل حساباتهم
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // الحذف للمدير فقط
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'الاسم الكامل',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'مدير نظام (Admin)', value: 'admin' },
        { label: 'محرر محتوى (Editor)', value: 'editor' },
        { label: 'مسؤول التسجيل (Registrar)', value: 'registrar' },
      ],
      saveToJWT: true, // لضم الأدوار داخل جلسة التوثيق مباشرة
      access: {
        // منع التعديل على الأدوار إلا بواسطة المدير فقط
        update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
      },
    },
  ],
}
