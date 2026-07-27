import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'newsType', 'category', 'publishedAt', '_status'],
  },
  labels: {
    singular: 'خبر',
    plural: 'الأخبار والفعاليات',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان الخبر',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'المسار (Slug)',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'newsType',
      type: 'select',
      label: 'نوع الخبر / موقعه في الواجهة',
      defaultValue: 'standard',
      options: [
        { label: 'خبر رئيسي (السلايدر العلوي)', value: 'hero' },
        { label: 'خبر عاجل (شريط الأخبار)', value: 'ticker' },
        { label: 'من أهم المستجدات (الجانبي)', value: 'highlight' },
        { label: 'خبر تخصصي قياسي', value: 'standard' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'القطاع / التصنيف المتخصص',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'الصورة البارزة',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'ملخص الخبر (يظهر في البطاقات والسلايدر)',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'تفاصيل الخبر الكاملة',
      localized: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true, // يسمح باختيار عدة وسوم للمقال
      label: 'الوسوم والكلمات المفتاحية',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'تاريخ النشر',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
  ],
}
