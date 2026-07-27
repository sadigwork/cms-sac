import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
  },
  access: {
    read: () => true, // إتاحة القراءة للجمهور
  },
  fields: [
    {
      name: 'title',
      label: {
        ar: 'اسم الخدمة',
        en: 'Service Title',
      },
      type: 'text',
      required: true,
      localized: true, // دعم الترجمة
    },
    {
      name: 'category',
      label: {
        ar: 'تصنيف الخدمة',
        en: 'Service Category',
      },
      type: 'select',
      required: true,
      options: [
        {
          label: { ar: 'التسجيل والاعتماد', en: 'Registration & Accreditation' },
          value: 'registration',
        },
        {
          label: { ar: 'الشهادات والإفادات', en: 'Certificates & Statements' },
          value: 'certificates',
        },
        { label: { ar: 'التراخيص والممارسة', en: 'Licensing & Practice' }, value: 'licensing' },
      ],
    },
    {
      name: 'shortDescription',
      label: {
        ar: 'وصف قصير',
        en: 'Short Description',
      },
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'requirements',
      label: {
        ar: 'المتطلبات الأساسية',
        en: 'Key Requirements',
      },
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: { ar: 'المطلب', en: 'Requirement' },
        },
      ],
    },
    {
      name: 'externalLink',
      label: {
        ar: 'رابط التقديم المباشر (إن وجد)',
        en: 'External Application Link',
      },
      type: 'text',
    },
    {
      name: 'iconName',
      label: {
        ar: 'رمز الأيقونة (Icon Slug)',
        en: 'Icon Identifier',
      },
      type: 'select',
      defaultValue: 'badge',
      options: [
        { label: 'بطاقة/اعتماد (Badge/ID)', value: 'badge' },
        { label: 'وثيقة/شهادة (Document)', value: 'document' },
        { label: 'تجديد/تحديث (Refresh)', value: 'refresh' },
        { label: 'استعلام/بحث (Search)', value: 'search' },
      ],
    },
    {
      name: 'status',
      label: {
        ar: 'حالة الخدمة',
        en: 'Service Status',
      },
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: { ar: 'متاحة الآن', en: 'Active' }, value: 'active' },
        { label: { ar: 'قريباً', en: 'Coming Soon' }, value: 'coming_soon' },
        { label: { ar: 'متوقفة مؤقتاً', en: 'Maintenance' }, value: 'maintenance' },
      ],
    },
  ],
}
