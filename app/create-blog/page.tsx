/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
'use client'

import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RichTextEditor from '@/components/RichTextEditor'

interface BlogData {
  _id: string
  title: string
  writer: string
  readingTime: string
  content: string
  bannerImage: string
  metaTitle?: string
  metaDescription?: string
}

export default function CreateBlogPage() {
  const [blogId, setBlogId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [readingTime, setReadingTime] = useState('')
  const [content, setContent] = useState('')
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [allBlogs, setAllBlogs] = useState<BlogData[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (data.success) setAllBlogs(data.data)
    } catch (error) {
      toast.error('Failed to load blogs for search')
    }
  }

  useEffect(() => {
    if (title.trim().length < 3) {
      setSlugStatus('idle')
      return
    }
    setSlugStatus('checking')
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blogs/check-slug?slug=${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}&excludeId=${blogId || ''}`)
        const data = await res.json()
        if (data.success) setSlugStatus(data.available ? 'available' : 'taken')
      } catch (error) {
        console.error('Error checking slug')
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [title, blogId])

  const filteredBlogs = allBlogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectBlog = (blog: BlogData) => {
    setBlogId(blog._id)
    setTitle(blog.title)
    setWriter(blog.writer)
    setReadingTime(blog.readingTime)
    setContent(blog.content)
    setBannerImage(blog.bannerImage)
    setMetaTitle(blog.metaTitle || '')
    setMetaDescription(blog.metaDescription || '')
    setSearchQuery('')
    setShowDropdown(false)
    setSlugStatus('available')
    toast.info('Blog loaded for editing')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setBannerImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setBlogId(null)
    setTitle('')
    setWriter('')
    setReadingTime('')
    setContent('')
    setBannerImage(null)
    setMetaTitle('')
    setMetaDescription('')
    setSlugStatus('idle')
    const fileInput = document.getElementById('file-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (slugStatus === 'taken') {
      toast.error('This blog title is already taken.')
      return
    }
    setLoading(true)
    if (!bannerImage) {
      toast.error('Please select a banner image.')
      setLoading(false)
      return
    }

    const payload = { title, writer, readingTime, content, bannerImage, metaTitle, metaDescription }
    const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs'
    const method = blogId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(blogId ? 'Blog updated successfully!' : 'Blog published successfully!')
        resetForm()
        fetchBlogs()
      } else {
        toast.error(data.error || 'Something went wrong.')
      }
    } catch (error) {
      toast.error('Network error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!blogId) return
    setLoading(true)
    try {
      const response = await fetch(`/api/blogs/${blogId}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Blog deleted successfully!')
        resetForm()
        fetchBlogs()
      } else {
        toast.error('Failed to delete blog.')
      }
    } catch (error) {
      toast.error('Network error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mt-20 bg-[#eef2f5] pt-40 pb-16 flex justify-center p-4 sm:p-6 font-sans">
      
      {/* FULL PAGE EDITOR POPUP */}
      <RichTextEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={content}
        setContent={setContent}
      />

      <div className="w-full max-w-3xl space-y-6">
        
        {/* Search Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 relative z-20">
          <div className="flex items-center gap-3 px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#075E54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search blog by title to edit or delete..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base py-2"
            />
            {blogId && (
              <button onClick={resetForm} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-1 rounded-full transition">
                Cancel Edit
              </button>
            )}
          </div>
          {showDropdown && searchQuery && (
            <div className="absolute mt-2 w-full left-0 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-50">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <div key={blog._id} onClick={() => handleSelectBlog(blog)} className="p-4 hover:bg-[#f0f2f5] cursor-pointer border-b border-gray-50 flex items-center gap-3">
                    <img src={blog.bannerImage} alt="thumb" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{blog.title}</p>
                      <p className="text-xs text-gray-500">by {blog.writer} · {blog.readingTime}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 text-sm">No blogs found</div>
              )}
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
          <div className="bg-[#075E54] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#075E54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">{blogId ? 'Edit Blog' : 'Create Blog'}</h1>
              <p className="text-[#a8d5c2] text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-[#25D366] rounded-full"></span>
                {blogId ? 'Update or Delete Mode' : 'Connected to Database'}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Blog Title</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className={`w-full bg-[#f0f2f5] border-2 rounded-lg pl-10 pr-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none transition ${
                        slugStatus === 'taken' ? 'border-red-400 focus:border-red-500' : 
                        slugStatus === 'available' ? 'border-[#25D366] focus:border-[#25D366]' : 
                        'border-transparent focus:border-[#25D366]'
                      } focus:bg-white`}
                      placeholder="Enter amazing title..."
                    />
                  </div>
                  {title.trim().length >= 3 && (
                    <div className="mt-2 text-xs font-medium flex items-center gap-1.5">
                      {slugStatus === 'checking' && <span className="text-gray-500 flex items-center gap-1"><svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Checking...</span>}
                      {slugStatus === 'available' && <span className="text-[#075E54] flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Title is available!</span>}
                      {slugStatus === 'taken' && <span className="text-red-600 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>Title is already taken.</span>}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Writer Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={writer}
                      onChange={(e) => setWriter(e.target.value)}
                      required
                      className="w-full bg-[#f0f2f5] border-2 border-transparent rounded-lg pl-10 pr-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:bg-white transition"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Reading Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    required
                    className="w-full bg-[#f0f2f5] border-2 border-transparent rounded-lg pl-10 pr-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:bg-white transition"
                    placeholder="e.g., 5 mins"
                  />
                </div>
              </div>

              <div className="p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50/50 space-y-5">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#075E54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  SEO Meta Data
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full bg-[#f0f2f5] border-2 border-transparent rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:bg-white transition"
                    placeholder="Google search results title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-[#f0f2f5] border-2 border-transparent rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:bg-white transition resize-none"
                    placeholder="Short summary for search engines"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Banner Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-[#25D366] transition-colors bg-[#f0f2f5]">
                  <div className="space-y-3 text-center w-full">
                    {bannerImage ? (
                      <div className="relative">
                        <img src={bannerImage} alt="Banner Preview" className="mx-auto max-h-48 rounded-lg shadow-md" />
                        <button 
                          type="button" 
                          onClick={() => { setBannerImage(null); const fileInput = document.getElementById('file-input') as HTMLInputElement; if (fileInput) fileInput.value = '' }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-input" className="relative cursor-pointer bg-white rounded-md font-medium text-[#075E54] hover:text-[#128C7E] focus-within:outline-none px-2 py-1 border border-gray-300">
                            <span>Upload a file</span>
                            <input id="file-input" name="file-input" type="file" accept="image/*" onChange={handleImageChange} required className="sr-only" />
                          </label>
                          <p className="pl-1 py-1">or drag and drop</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTENT EDITOR BUTTON */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</label>
                <button 
                  type="button"
                  onClick={() => setIsEditorOpen(true)}
                  className="w-full bg-[#f0f2f5] border-2 border-dashed border-gray-300 hover:border-[#25D366] rounded-lg p-8 text-gray-500 font-medium transition flex flex-col items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {content ? 'Edit Content' : 'Click to Write Content'}
                </button>
                {content && (
                  <p className="mt-2 text-xs text-[#075E54] flex items-center gap-1 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Content is ready. Click above to edit.
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading || slugStatus === 'taken'}
                  className={`w-full flex justify-center items-center gap-2 bg-[#25D366] text-white font-bold py-4 px-4 rounded-lg transition-all shadow-md text-lg ${
                    loading || slugStatus === 'taken' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1eb456] hover:shadow-lg active:scale-[0.98]'
                  }`}
                >
                  {loading ? 'Saving...' : (blogId ? 'Update Blog' : 'Publish Blog')}
                </button>

                {blogId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-red-50 text-red-600 border-2 border-red-200 font-bold py-4 px-4 rounded-lg transition-all hover:bg-red-100 hover:border-red-300 text-lg"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  )
}
