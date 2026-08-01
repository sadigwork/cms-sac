import { resendAdapter } from '@payloadcms/email-resend'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections & Globals Imports
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'
import { Services } from './collections/Services'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Registrations } from './collections/Registrations'
import { Ticker } from './globals/Ticker'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const shouldEnableEmail = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

// إعداد محول البريد بشرط وجود البيئة، وإلا عدم تفعيله
// const getEmailAdapter = () => {
//   try {
//     if (process.env.SMTP_HOST && process.env.SMTP_USER) {
//       return nodemailerAdapter({
//         defaultFromAddress: process.env.SMTP_FROM || 'sadigatwork@outlook.com',

//         defaultFromName: 'المجلس الزراعي السوداني',
//         transportOptions: {
//           host: process.env.SMTP_HOST,
//           port: Number(process.env.SMTP_PORT) || 587,
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//           },
//           // حماية التوصيل عبر ضبط مهلة أقصاها 3 ثوانٍ
//           connectionTimeout: 3000,
//         },
//       })
//     }
//   } catch (err) {
//     console.warn('⚠️ فشل تهيئة Nodemailer Adapter:', err)
//   }
//   return undefined
// }
export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(dirname, './app/(payload)/admin/custom.css'), // ربط التنسيقات
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- المجلس الزراعي',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#PlantIcon',
        Icon: '/components/admin/Icon#Icon', // تصحيح المسار ليكون معرّفاً في Logo.tsx
      },
      beforeDashboard: [
        '/components/admin/CustomDashboard#CustomDashboard',
      ],
      views: {
        login: {
          Component: '/components/admin/CustomLogin#CustomLogin',
          path: '/login',
        },
        // dashboard: {
        //   Component: '/components/admin/CustomDashboard#CustomDashboard',
        // },
      },
    },
  },
  collections: [Users, Media, Posts, Categories, Services, Tags, Registrations],
  globals: [Ticker],
  localization: {
    locales: [
      {
        code: 'ar',
        label: 'العربية',
        rtl: true,
      },
      {
        code: 'en',
        label: 'English',
        rtl: false,
      },
    ],
    defaultLocale: 'ar',
    fallback: true,
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    defaultFromName: 'المجلس الزراعي السوداني',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // nodemailerAdapter({
  //   defaultFromAddress: 'info@agricouncil.gov.sd',
  //   defaultFromName: 'المجلس الزراعي السوداني',
  //   transportOptions: {
  //     host: process.env.SMTP_HOST || 'smtp.office365.com',
  //     port: Number(process.env.SMTP_PORT) || 587,
  //     secure: false,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS, // تأكد من استخدام App Password وليس كلمة المرور العادية
  //     },
  //     // إضافة الخيارات التالية لمنع التعليق والانتظار طويل الأمد
  //     connectionTimeout: 3000, // 3 ثواني كحد أقصى للاتصال
  //     greetingTimeout: 3000,
  //     socketTimeout: 5000,
  //   },
  // }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
