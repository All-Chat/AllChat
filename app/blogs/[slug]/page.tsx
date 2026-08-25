import type { Metadata } from 'next'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogContent from '@/components/BlogContent' // Import the new component

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate SEO Meta Tags
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  await connectDB()
  const blog = await Blog.findOne({ slug }).lean()

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The blog you are looking for does not exist.',
    }
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.content.substring(0, 150),
  }
}

// Render the Blog Page
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  await connectDB()

  const blog = await Blog.findOne({ slug }).lean()

  if (!blog) {
    notFound()
  }

  const serializedBlog = {
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
  }

  return (
    <div className="min-h-screen bg-[#eef2f5] pt-24 pb-20 font-sans flex justify-center">
      {/* Increased wrapper width to 5xl */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-10">

        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-[#075E54] hover:text-[#128C7E] font-semibold mb-8 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all blogs
        </Link>

        {/* Hero Header Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-[16/9]">
          <img
            src={serializedBlog.bannerImage}
            alt={serializedBlog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#25D366] text-[#075E54] text-xs font-bold px-3 py-1 rounded-full">
                {serializedBlog.readingTime}
              </span>
              <span className="text-sm text-gray-200 font-medium">
                {serializedBlog.createdAt}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              {serializedBlog.title}
            </h1>
            <p className="mt-3 text-lg text-gray-200 flex items-center gap-2 drop-shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Written by {serializedBlog.writer}
            </p>
          </div>
        </div>

        {/* Blog Content Canvas - Using the new Client Component */}
        <BlogContent content={serializedBlog.content} />

      </div>
    </div>
  )
}
