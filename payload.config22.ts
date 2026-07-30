import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    css: path.resolve(dirname, './css/custom-admin.css'),
    // تخصيص العنوان والـ Favicon
    meta: {
      titleSuffix: '- لوحة إدارة المجلس',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/assets/logo.png',
        },
      ],
    },
    // تخصيص المكونات البصرية
    components: {
      // شعار الصفحة الرئيسية للوحة الإدارة
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      views: {
        // استبدال صفحة تسجيل الدخول القياسية
        Login: {
          Component: '/components/admin/CustomLogin#CustomLogin',
        },
      }
    },
    // التحكم في خيارات المظهر
    theme: 'light', // 'dark' | 'light' | 'auto'
  },
  // باقي إعدادات Payload...
})
