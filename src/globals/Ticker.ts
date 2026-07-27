import type { GlobalConfig } from 'payload'

export const Ticker: GlobalConfig = {
  slug: 'ticker',
  label: 'شريط الأخبار العاجلة',
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'تفعيل شريط الأخبار العاجلة',
      defaultValue: true,
    },
    {
      name: 'text',
      type: 'text',
      label: 'نص الخبر العاجل',
      required: true,
      localized: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'رابط التفاصيل (اختياري)',
    },
  ],
}
