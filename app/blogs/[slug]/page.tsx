/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import type { Metadata } from 'next'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogContent from '@/components/BlogContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

/* -------------------------------------------------------------------------- */
/*  SEO Meta Tags (unchanged — your canonical + meta logic preserved)         */
/* -------------------------------------------------------------------------- */

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
    title: (blog as any).metaTitle || (blog as any).title,
    description:
      (blog as any).metaDescription ||
      (blog as any).content?.substring(0, 150) ||
      '',
    alternates: {
      canonical: (blog as any).canonicalUrl || `/blog/${(blog as any).slug}`,
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Small helpers (zero extra dependencies)                                   */
/* -------------------------------------------------------------------------- */

function ArrowLeftIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  )
}

function AuthorAvatar({
  name,
  className = 'h-11 w-11 text-sm',
}: {
  name?: string
  className?: string
}) {
  const initial = (name || 'A').trim().charAt(0).toUpperCase()
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#075E54] to-[#25D366] font-bold text-white ${className}`}
    >
      {initial}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Blog Detail Page                                                          */
/*  • Banner: inset card — margin on all sides, rounded corners, and a top    */
/*    gap (pt-28/pt-32) so it clears your fixed navbar. Natural ratio —       */
/*    full image, never cropped.                                              */
/*  • Article text: left-aligned reading column (max-w-3xl) on the left.      */
/*  • Right rail: "More blogs" — a straight vertical line of compact cards    */
/*    fetched from MongoDB (latest 5, excluding the current post); sticky on   */
/*    desktop, stacks below the article on mobile.                             */
/* -------------------------------------------------------------------------- */

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  await connectDB()

  const blog = (await Blog.findOne({ slug }).lean()) as any

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

  /* "More blogs" rail — latest posts excluding the current one */
  const moreDocs = (await Blog.find({ slug: { $ne: slug } })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean()) as any[]

  const moreBlogs = moreDocs.map((d) => ({
    title: d.title as string,
    writer: d.writer as string | undefined,
    bannerImage: d.bannerImage as string,
    readingTime: d.readingTime as string | undefined,
    href: `/blogs/${d.slug}`,
  }))

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eef2f5] pb-20 font-sans sm:pb-24">
      <style>{`
        @keyframes bl-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bl-fade-up { opacity: 0; animation: bl-fade-up .8s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>

      {/* JSON-LD schema markup for Google (unchanged) */}
      {blog.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schemaMarkup }}
        />
      )}

      {/* ambient background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px]">
        <div className="absolute -left-40 top-32 h-[420px] w-[420px] rounded-full bg-[#25D366]/10 blur-3xl" />
        <div className="absolute -top-10 right-[-140px] h-[360px] w-[360px] rounded-full bg-[#075E54]/10 blur-3xl" />
      </div>

      {/* pt-28 / pt-32 = comfortable margin below your fixed navbar */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        {/* ---------------- back pill — in the gap below the navbar ---------------- */}
        <div className="bl-fade-up" style={{ animationDelay: '0ms' }}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#075E54] shadow-[0_12px_30px_-12px_rgba(7,94,84,0.45)] ring-1 ring-black/5 transition-all duration-300 hover:gap-3.5 hover:text-[#128C7E] hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to all blogs
          </Link>
        </div>

        {/* ------- inset banner: margin on all sides + fully rounded corners ------- */}
        <figure
          className="bl-fade-up relative mt-4 overflow-hidden rounded-[1.75rem] bg-[#d8e6e3] shadow-[0_30px_80px_-30px_rgba(7,94,84,0.45)] ring-1 ring-black/5 sm:mt-5 sm:rounded-[2.25rem]"
          style={{ animationDelay: '120ms' }}
        >
          <img
            src={serializedBlog.bannerImage}
            alt={serializedBlog.title}
            className="block h-auto w-full"
          />
        </figure>

        {/* ------ article column + "more blogs" rail on the right ------ */}
        <div className="mt-9 flex flex-col gap-10 sm:mt-11 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* article — same reading width, left-aligned to the page */}
          <div className="min-w-0 flex-1 lg:max-w-3xl">
            <header className="bl-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                {serializedBlog.readingTime && (
                  <span className="inline-flex items-center rounded-full bg-[#25D366]/15 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#075E54] ring-1 ring-[#25D366]/30">
                    {serializedBlog.readingTime}
                  </span>
                )}
                {serializedBlog.createdAt && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    {serializedBlog.createdAt}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.12] tracking-tight text-[#07271f] sm:text-4xl md:text-[2.9rem]">
                {serializedBlog.title}
              </h1>

              <div className="mt-7 flex items-center gap-3.5 border-y border-[#075E54]/10 py-5">
                <AuthorAvatar
                  name={serializedBlog.writer}
                  className="h-11 w-11 text-sm shadow-md ring-2 ring-white"
                />
                <p className="text-sm font-medium text-gray-500 sm:text-[15px]">
                  Written by{' '}
                  <span className="font-bold text-[#075E54]">{serializedBlog.writer}</span>
                </p>
              </div>
            </header>

            {/* article body */}
            <div
              className="bl-fade-up mt-9 text-[15px] leading-[1.9] text-gray-700 sm:mt-11 sm:text-base"
              style={{ animationDelay: '280ms' }}
            >
              <BlogContent content={serializedBlog.content} />
            </div>
          </div>

          {/* ---- more-blogs rail: a straight vertical line of compact cards ---- */}
          {moreBlogs.length > 0 && (
            <aside
              aria-label="More blogs"
              className="bl-fade-up w-full shrink-0 lg:sticky lg:top-28 lg:w-[300px] xl:w-[336px]"
              style={{ animationDelay: '360ms' }}
            >
              <h2 className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-[#075E54]">
                <span className="h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.9)]" />
                More blogs
              </h2>

              <div className="mt-5 space-y-3.5">
                {moreBlogs.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3.5 rounded-2xl bg-white p-3 shadow-[0_12px_30px_-20px_rgba(7,94,84,0.4)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_rgba(7,94,84,0.5)] hover:ring-[#25D366]/50"
                  >
                    <span className="relative h-16 w-[4.25rem] shrink-0 overflow-hidden rounded-xl bg-[#d8e6e3] sm:h-[4.5rem] sm:w-20">
                      <img
                        src={item.bannerImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-[13px] font-bold leading-snug text-[#07271f] transition-colors duration-300 group-hover:text-[#075E54] sm:text-[13.5px]">
                        {item.title}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        {item.readingTime && (
                          <span className="text-[#128C7E]">{item.readingTime}</span>
                        )}
                        {item.writer && <span>by {item.writer}</span>}
                      </span>
                    </span>

                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#075E54]/5 text-[#075E54] transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/blogs"
                className="group mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#075E54] transition-colors duration-300 hover:text-[#128C7E]"
              >
                View all blogs
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
