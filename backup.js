// backup.js
import sqlite3 from 'sqlite3'
import fs from 'fs'
import path from 'path'

// حدد مسار ملف قاعدة البيانات المحلي لديك
const dbPath = path.join(process.cwd(), 'payload.db')
const outputPath = path.join(process.cwd(), 'registrations_backup.json')

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err.message)
    return
  }
  console.log('✅ تم الاتصال بقاعدة البيانات بنجاح.')
})

// استخراج جميع البيانات من جدول registrations
db.all('SELECT * FROM registrations', [], (err, rows) => {
  if (err) {
    console.error('❌ خطأ أثناء قراءة الجدول:', err.message)
    return
  }

  // حفظ البيانات في ملف JSON
  fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2), 'utf-8')
  console.log(`🎉 تم حفظ ${rows.length} سجل بنجاح في الملف: registrations_backup.json`)
})

db.close()
