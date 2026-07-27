import React from 'react'

interface RichTextProps {
  content: any
  className?: string
}

// دالة إصلاح رابط الصورة لضمان وجود Domain / Server URL
function fixRichTextImageUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('/')) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return `${serverUrl}${url}`
  }
  return url
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  // دالة بسيطة لترجمة عقد Lexical إلى عناصر HTML
  const renderNode = (node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed text-slate-700">
            {node.children?.map((child: any, cIdx: number) => renderChild(child, cIdx))}
          </p>
        )

      case 'heading':
        const Tag = node.tag || 'h2'
        const headingClasses: Record<string, string> = {
          h1: 'text-3xl font-extrabold my-6 text-slate-900',
          h2: 'text-2xl font-bold my-5 text-slate-900',
          h3: 'text-xl font-bold my-4 text-slate-900',
        }
        return (
          <Tag
            key={index}
            className={headingClasses[node.tag] || 'text-lg font-bold my-3 text-slate-900'}
          >
            {node.children?.map((child: any, cIdx: number) => renderChild(child, cIdx))}
          </Tag>
        )

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag
            key={index}
            className={`my-4 ps-6 space-y-2 text-slate-700 ${
              node.listType === 'number' ? 'list-decimal' : 'list-disc'
            }`}
          >
            {node.children?.map((child: any, cIdx: number) => (
              <li key={cIdx}>{child.children?.map((c: any, i: number) => renderChild(c, i))}</li>
            ))}
          </ListTag>
        )

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-s-4 border-emerald-600 ps-4 py-3 my-6 italic bg-slate-50 rounded-e-lg text-slate-800 font-medium"
          >
            {node.children?.map((child: any, cIdx: number) => renderChild(child, cIdx))}
          </blockquote>
        )

      // 1. معالجة الصور المرفوعة عبر عقـدة Upload في Lexical
      case 'upload': {
        const value = node.value
        if (!value) return null

        const imageUrl = fixRichTextImageUrl(value.url)
        const altText = value.alt || value.filename || 'صورة داخل الخبر'

        if (!imageUrl) return null

        return (
          <figure key={index} className="my-8 my-auto">
            <div className="relative overflow-hidden rounded-xl border border-slate-200/80 shadow-sm bg-slate-100">
              <img
                src={imageUrl}
                alt={altText}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      }

      // 2. معالجة عقد Blocks إذا كانت الصورة ملفوفة داخل Block Node
      case 'block': {
        if (node.fields?.blockType === 'mediaBlock' && node.fields?.media) {
          const media = node.fields.media
          const imageUrl = fixRichTextImageUrl(typeof media === 'object' ? media.url : '')
          if (!imageUrl) return null

          return (
            <figure key={index} className="my-8">
              <img
                src={imageUrl}
                alt={media.alt || 'صورة توضيحية'}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-slate-200 shadow-sm"
              />
            </figure>
          )
        }
        return null
      }

      default:
        return null
    }
  }

  const renderChild = (child: any, index: number) => {
    if (child.type === 'text') {
      let textNode = <span key={index}>{child.text}</span>
      if (child.format & 1)
        textNode = (
          <strong key={index} className="font-bold text-slate-900">
            {child.text}
          </strong>
        ) // Bold
      if (child.format & 2)
        textNode = (
          <em key={index} className="italic">
            {child.text}
          </em>
        ) // Italic
      if (child.format & 8)
        textNode = (
          <u key={index} className="underline">
            {child.text}
          </u>
        ) // Underline
      return textNode
    }

    // إذا كانت الصورة مدرجة كـ Inline Link أو Child Node
    if (child.type === 'upload') {
      return renderNode(child, index)
    }

    return null
  }

  return (
    <div className={`prose max-w-none ${className}`}>
      {content.root.children.map((node: any, idx: number) => renderNode(node, idx))}
    </div>
  )
}
