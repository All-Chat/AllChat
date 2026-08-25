/* eslint-disable @next/next/no-img-element */
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogsPage() {
  await connectDB()
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean()
  
  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''
  }))

  return (
    <div className="min-h-screen bg-[#eef2f5] pt-32 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Premium Page Header */}
        <div className="mb-16 text-center">
          <span className="inline-block bg-[#075E54]/10 text-[#075E54] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Latest Posts
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#075E54] tracking-tighter">
            The Blog
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Thoughts, stories, and ideas from our writers.
          </p>
        </div>

        {serializedBlogs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-300 text-lg font-light">No blogs published yet.</p>
          </div>
        ) : (
          <>
            {/* --- UNIQUE MAGAZINE LAYOUT TOP SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              
              {/* 1st Blog: Massive Feature (Takes 2 columns) */}
              {serializedBlogs[0] && (
                <Link 
                  href={`/blogs/${serializedBlogs[0].slug}`} 
                  className="lg:col-span-2 group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[16/10] lg:aspect-auto lg:min-h-[550px] block"
                >
                  <img 
                    src={serializedBlogs[0].bannerImage} 
                    alt={serializedBlogs[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#25D366] text-[#075E54] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {serializedBlogs[0].readingTime}
                      </span>
                      <span className="text-[11px] text-gray-200 font-bold uppercase tracking-widest">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-md">
                      {serializedBlogs[0].title}
                    </h2>
                    <p className="mt-4 text-sm text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      by {serializedBlogs[0].writer}
                    </p>
                  </div>
                </Link>
              )}

              {/* 2nd & 3rd Blogs: Stacked on the right (Takes 1 column) */}
              <div className="flex flex-col gap-8">
                {serializedBlogs.slice(1, 3).map((blog) => (
                  <Link 
                    key={blog._id}
                    href={`/blogs/${blog.slug}`} 
                    className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[16/10] lg:aspect-auto lg:flex-1 block"
                  >
                    <img 
                      src={blog.bannerImage} 
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#25D366] text-[#075E54] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                          {blog.readingTime}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight drop-shadow-md">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-300 font-medium">by {blog.writer}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- STANDARD 3-COLUMN GRID FOR THE REST --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serializedBlogs.slice(3).map((blog) => (
                <Link 
                  href={`/blogs/${blog.slug}`} 
                  key={blog._id}
                  className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 aspect-[4/3] block"
                >
                  <img 
                    src={blog.bannerImage} 
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#25D366] text-[#075E54] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {blog.readingTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight drop-shadow-md">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300 font-medium">by {blog.writer}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
