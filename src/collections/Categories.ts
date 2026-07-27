import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'قطاع / تصنيف',
    plural: 'القطاعات والتصنيفات',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'اسم القطاع / التصنيف',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'المسار الفرعي (Slug)',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'وصف مختصر للقطاع',
      localized: true,
    },
  ],
}