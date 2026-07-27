/** @type {import('tailwindcss').Config} */
export default {
  // تفعيل الوضع الداكن عبر الكلاسات
  darkMode: 'class',
  content: [
    './src/collections/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // <-- يغطي (frontend) و (payload)
  ],
  theme: {
    extend: {
      colors: {
        // يمكنك إضافة ألوان المجلس هنا لتسهيل الاستخدام
        emerald: {
          950: '#064e3b',
        },
      },
    },
  },
  plugins: [],
}
