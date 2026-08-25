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
      className="relative bg-white w-full max-w-5xl mx-auto shadow-2xl p-4 sm:p-16 rounded-3xl border border-gray-100 overflow-hidden focus:outline-none text-gray-700
                 [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_a]:cursor-pointer
                 [&_img]:rounded-xl [&_img]:shadow-lg"
      style={{ lineHeight: '1.8', fontSize: '18px' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
