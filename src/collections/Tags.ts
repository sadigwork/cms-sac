import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags', // ← يجب أن يكون الـ slug مطابِقاً تماماً لـ 'tags'
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'اسم الوسم',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
