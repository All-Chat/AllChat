/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
'use client'

import { type ReactNode, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RichTextEditor from '@/components/RichTextEditor'
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  PlusCircle,
  Pencil,
  Trash2,
  Clock,
  User,
  Type,
  Image as ImageIcon,
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  LayoutTemplate,
  ListChecks,
  Workflow,
} from 'lucide-react'

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

// --- Reusable Animation Components ---
type FadeInProps = {
  children: ReactNode
  delay?: number
  className?: string
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const AnimatedText: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => (
  <span className="block overflow-hidden pb-2">
    <motion.span
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  </span>
)

// Floating Background Icons
const FloatingBackground = () => {
  const icons = [
    { Icon: FileText, top: '15%', left: '10%', size: 40, duration: 7, delay: 0, color: '#22c55e' }, // green-500
    { Icon: Pencil, top: '25%', left: '85%', size: 30, duration: 9, delay: 1, color: '#16a34a' }, // green-600
    { Icon: ImageIcon, top: '65%', left: '15%', size: 35, duration: 8, delay: 0.5, color: '#22c55e' },
    { Icon: LayoutTemplate, top: '75%', left: '80%', size: 30, duration: 10, delay: 1.5, color: '#16a34a' },
    { Icon: ListChecks, top: '45%', left: '90%', size: 35, duration: 8.5, delay: 0.2, color: '#22c55e' },
    { Icon: Type, top: '55%', left: '5%', size: 35, duration: 9.5, delay: 1.2, color: '#16a34a' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const { Icon, top, left, size, duration, delay, color } = item
        return (
          <motion.div
            key={`bg-float-${index}`}
            className="absolute"
            style={{ top, left, filter: 'blur(1px)' }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
              opacity: [0.08, 0.2, 0.08], // Subtle opacity
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon size={size} style={{ color }} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function CreateBlogPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Blog form state
  const [blogId, setBlogId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [readingTime, setReadingTime] = useState('')
  const [content, setContent] = useState('')
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')

  const [loading, setLoading] = useState(false)
  const [allBlogs, setAllBlogs] = useState<BlogData[]>([])
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isAuthenticated) fetchBlogs()
  }, [isAuthenticated])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (data.success) setAllBlogs(data.data)
    } catch (error) {
      toast.error('Failed to load blogs')
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    if (title.trim().length < 3) {
      setSlugStatus('idle')
      return
    }
    setSlugStatus('checking')
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/blogs/check-slug?slug=${encodeURIComponent(
            title.toLowerCase().replace(/\s+/g, '-')
          )}&excludeId=${blogId || ''}`
        )
        const data = await res.json()
        if (data.success) setSlugStatus(data.available ? 'available' : 'taken')
      } catch (error) {
        console.error('Error checking slug')
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [title, blogId, isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    
    // Check current minute, previous minute, and next minute to handle typing lag
    const minuteNum = now.getMinutes()
    const validPasswords = [
      `${hours}${String(minuteNum).padStart(2, '0')}`,
      `${hours}${String(minuteNum > 0 ? minuteNum - 1 : 59).padStart(2, '0')}`,
      `${hours}${String(minuteNum < 59 ? minuteNum + 1 : 0).padStart(2, '0')}`,
    ]

    if (validPasswords.includes(loginPassword)) {
      setIsAuthenticated(true)
      setLoginError('')
      setLoginPassword('')
      toast.success('Access Granted!')
    } else {
      setLoginError('Invalid password.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    resetForm()
  }

  const handleSelectBlog = (blog: BlogData) => {
    setBlogId(blog._id)
    setTitle(blog.title)
    setWriter(blog.writer)
    setReadingTime(blog.readingTime)
    setContent(blog.content)
    setBannerImage(blog.bannerImage)
    setMetaTitle(blog.metaTitle || '')
    setMetaDescription(blog.metaDescription || '')
    setSlugStatus('available')
    toast.info('Blog loaded for editing')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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

    const payload = {
      title,
      writer,
      readingTime,
      content,
      bannerImage,
      metaTitle,
      metaDescription,
    }
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

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Blog deleted successfully!')
        if (blogId === id) resetForm()
        fetchBlogs()
      } else {
        toast.error('Failed to delete blog.')
      }
    } catch (error) {
      toast.error('Network error occurred.')
    } finally {
      setLoading(false)
      setConfirmDeleteId(null)
    }
  }

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Input Base Classes for consistency - Using normal green focus
  const inputBaseClass =
    'w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 shadow-sm'

  // ============== LOGIN SCREEN ==============
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans pt-32 pb-16 overflow-hidden">
        <FloatingBackground />
        
        <div className="absolute top-20 right-[5%] opacity-[0.06] pointer-events-none">
          <Lock size={240} className="text-green-600" />
        </div>

        <FadeIn className="relative w-full max-w-md z-10">
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                Admin Access
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    autoFocus
                    className={`${inputBaseClass} pl-12 pr-12 tracking-widest`}
                    placeholder="••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 flex items-center gap-2 overflow-hidden"
                  >
                    <XCircle className="h-5 w-5 shrink-0" />
                    {loginError}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="group w-full bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-[0_10px_30px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(34,197,94,0.5)] hover:-translate-y-1 flex items-center justify-center"
              >
                Unlock Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </form>
          </div>
        </FadeIn>

        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </div>
    )
  }

  // ============== MAIN DASHBOARD ==============
  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-sans pt-32 pb-16 overflow-hidden">
      <FloatingBackground />
      
      {/* FULL PAGE EDITOR POPUP */}
      <RichTextEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={content}
        setContent={setContent}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        
        {/* Header & Logout */}
        <FadeIn className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              <AnimatedText>Blog Management</AnimatedText>
            </h1>
            <p className="text-gray-500">Create, edit, and manage your blog content.</p>
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-white bg-white hover:bg-gray-900 px-5 py-3 rounded-xl transition-all shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </FadeIn>

        {/* Form Section */}
        <FadeIn className="mb-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
            
            <div className="bg-gradient-to-r from-gray-50 to-green-50 p-6 md:p-8 flex items-center gap-4 border-b border-black/5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-black/5">
                <FileText className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  {blogId ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  {blogId ? 'Update or Delete Mode' : 'Fill in the details below'}
                </p>
              </div>
              {blogId && (
                <button
                  onClick={resetForm}
                  className="ml-auto group flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-900 hover:text-white px-4 py-2 rounded-xl transition-all shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Blog
                </button>
              )}
            </div>

            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Grid for Title & Writer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Type className="w-3.5 h-3.5" /> Blog Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className={`${inputBaseClass} ${
                        slugStatus === 'taken' ? 'border-red-400 bg-red-50' : ''
                      }`}
                      placeholder="Enter amazing title..."
                    />
                    <AnimatePresence>
                      {title.trim().length >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 text-xs font-medium flex items-center gap-1.5"
                        >
                          {slugStatus === 'checking' && (
                            <span className="text-gray-500 flex items-center gap-1.5">
                              <Loader2 className="animate-spin h-3.5 w-3.5" /> Checking...
                            </span>
                          )}
                          {slugStatus === 'available' && (
                            <span className="text-green-600 flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4" /> Title is available!
                            </span>
                          )}
                          {slugStatus === 'taken' && (
                            <span className="text-red-600 flex items-center gap-1.5">
                              <XCircle className="h-4 w-4" /> Title is already taken.
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Writer */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Writer Name
                    </label>
                    <input
                      type="text"
                      value={writer}
                      onChange={(e) => setWriter(e.target.value)}
                      required
                      className={inputBaseClass}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Reading Time */}
                <div className="max-w-md">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Reading Time
                  </label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    required
                    className={inputBaseClass}
                    placeholder="e.g., 5 mins"
                  />
                </div>

                {/* SEO Meta Data */}
                <div className="p-6 border border-dashed border-green-200 rounded-2xl bg-green-50/40 space-y-6">
                  <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider flex items-center gap-2">
                    <Search className="h-4 w-4" /> SEO Meta Data
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className={`${inputBaseClass} bg-white`}
                      placeholder="Google search results title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      className={`${inputBaseClass} bg-white resize-none`}
                      placeholder="Short summary for search engines"
                    />
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" /> Banner Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-green-500 transition-colors bg-gray-50/50">
                    <div className="space-y-3 text-center w-full">
                      {bannerImage ? (
                        <div className="relative inline-block">
                          <img src={bannerImage} alt="Banner Preview" className="max-h-48 rounded-xl shadow-md" />
                          <button
                            type="button"
                            onClick={() => {
                              setBannerImage(null)
                              const fileInput = document.getElementById('file-input') as HTMLInputElement
                              if (fileInput) fileInput.value = ''
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5">
                            <ImageIcon className="h-8 w-8 text-green-500/50" />
                          </div>
                          <div className="flex text-sm text-gray-600 justify-center items-center">
                            <label
                              htmlFor="file-input"
                              className="relative cursor-pointer bg-gray-900 rounded-xl font-medium text-white hover:bg-gray-700 focus-within:outline-none px-4 py-2 shadow-sm transition-all hover:-translate-y-0.5"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-input"
                                name="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-2">or drag and drop</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Editor Button */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5" /> Content
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(true)}
                    className="w-full bg-gray-50 border-2 border-dashed border-gray-200 hover:border-green-500 hover:bg-green-50/50 rounded-2xl p-8 text-gray-700 font-medium transition flex flex-col items-center gap-2 group"
                  >
                    <Pencil className="h-8 w-8 text-gray-400 group-hover:text-green-500 transition" />
                    {content ? 'Edit Content' : 'Click to Write Content'}
                  </button>
                  {content && (
                    <p className="mt-2 text-xs text-green-600 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Content is ready. Click above to edit.
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading || slugStatus === 'taken'}
                    className={`group flex-1 flex justify-center items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-[0_10px_30px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(34,197,94,0.5)] hover:-translate-y-1 ${
                      loading || slugStatus === 'taken' ? 'opacity-70 cursor-not-allowed hover:translate-y-0' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {blogId ? 'Update Blog' : 'Publish Blog'}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </button>

                  {blogId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="sm:flex-none flex justify-center items-center gap-2 bg-gray-100 text-gray-700 border border-gray-200 font-semibold py-4 px-8 rounded-xl transition-all hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </FadeIn>

        {/* All Blogs Section */}
        <FadeIn>
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-black/5">
                  <ListChecks className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">All Blogs</h2>
                  <p className="text-sm text-gray-500">
                    {allBlogs.length} {allBlogs.length === 1 ? 'blog' : 'blogs'} total
                  </p>
                </div>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              {loading && allBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Loader2 className="animate-spin h-10 w-10 mb-3 text-green-500" />
                  <p>Loading blogs...</p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <FileText className="h-16 w-16 mb-4 text-gray-300" />
                  <p className="font-medium text-gray-500">{searchQuery ? 'No blogs match your search' : 'No blogs yet'}</p>
                  <p className="text-sm">{searchQuery ? 'Try a different keyword' : 'Create your first blog above!'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredBlogs.map((blog, i) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`bg-white p-5 rounded-2xl border transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.2)] ${
                        blogId === blog._id
                          ? 'border-green-500 shadow-[0_15px_40px_-15px_rgba(34,197,94,0.3)]'
                          : 'border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      <div className="relative h-40 mb-4 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={blog.bannerImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {blogId === blog._id && (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Pencil className="w-3 h-3" /> EDITING
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg line-clamp-2 leading-snug">{blog.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-green-600" />
                              {blog.writer}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-green-600" />
                              {blog.readingTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleSelectBlog(blog)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-900 text-gray-700 hover:text-white text-sm font-semibold py-2.5 px-3 rounded-lg transition-all border border-gray-100 hover:border-gray-900"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(blog._id)}
                            className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 hover:border-red-500 text-sm font-semibold py-2.5 px-3 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border border-black/5"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Are you sure you want to delete this blog? The blog will be permanently removed from your database. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDeleteId)}
                    disabled={loading}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_10px_30px_-5px_rgba(239,68,68,0.4)]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      'Yes, Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  )
}
