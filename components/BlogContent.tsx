'use client'

import { useEffect, useRef } from 'react'

export default function BlogContent({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Find all links inside the blog content
      const links = containerRef.current.querySelectorAll('a')
      links.forEach(link => {
        link.setAttribute('target', '_blank') // Open in new tab
        link.setAttribute('rel', 'noopener noreferrer') // Security best practice
      })
    }
  }, [content])

  return (
    <div 
      ref={containerRef}
      // ✅ ENHANCED STYLING: Properly structures H1-H5 tags, paragraphs, and custom HTML/CSS blocks
      className="relative bg-white w-full max-w-5xl mx-auto shadow-2xl p-4 sm:p-16 rounded-3xl border border-gray-100 overflow-hidden focus:outline-none text-gray-700
                 [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_a]:cursor-pointer
                 [&_img]:rounded-xl [&_img]:shadow-lg
                 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-6 [&_h1]:leading-tight
                 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:leading-snug
                 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3
                 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-5 [&_h4]:mb-2
                 [&_h5]:text-lg [&_h5]:font-medium [&_h5]:text-gray-600 [&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:uppercase [&_h5]:tracking-wide
                 [&_p]:mb-6 [&_p]:leading-relaxed
                 [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-6 [&_ul_li]:mb-2
                 [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-6 [&_ol_li]:mb-2
                 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-600"
      style={{ lineHeight: '1.8', fontSize: '18px' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
