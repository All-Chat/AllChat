/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type BlogCardData = {
  _id: string
  slug: string
  title: string
  writer: string
  bannerImage: string
  readingTime: string
  createdAt?: string | Date | null
}

/* -------------------------------------------------------------------------- */
/*  Tiny inline icon (zero extra dependencies)                                */
/* -------------------------------------------------------------------------- */

function PenIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page (server component — fetches from MongoDB)                            */
/*  • No text on cards — pure image cards                                     */
/*  • Card size = image natural size (w-full h-auto) → full image always      */
/*    visible, never cropped                                                  */
/* -------------------------------------------------------------------------- */

export default async function BlogsPage() {
  await connectDB()
  const docs = await Blog.find({}).sort({ createdAt: -1 }).lean()

  const blogs: BlogCardData[] = (docs as any[]).map((d) => ({
    _id: String(d._id),
    slug: String(d.slug ?? ''),
    title: String(d.title ?? ''),
    writer: String(d.writer ?? ''),
    bannerImage: String(d.bannerImage ?? ''),
    readingTime: String(d.readingTime ?? ''),
    createdAt: d.createdAt ?? null,
  }))

  const feature = blogs[0]
  const rest = blogs.slice(1)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eef2f5] pb-20 pt-32 font-sans">
      <style>{`
        @keyframes bl-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bl-fade-up { opacity: 0; animation: bl-fade-up .8s cubic-bezier(.22,1,.36,1) forwards; }
        .bl-shine:hover::after { transform: translateX(130%); }
      `}</style>

      {/* ambient background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px]">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#25D366]/10 blur-3xl" />
        <div className="absolute -top-24 right-[-160px] h-[460px] w-[460px] rounded-full bg-[#075E54]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        {/* ------------------------------ header ------------------------------ */}
        <header className="mb-14 text-center sm:mb-20">
          <div className="bl-fade-up">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#075E54] shadow-sm ring-1 ring-[#075E54]/10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
              Latest Posts
            </span>
          </div>
          <h1
            className="bl-fade-up text-5xl font-black tracking-tighter text-[#07271f] sm:text-6xl md:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            The{' '}
            <span className="bg-gradient-to-r from-[#075E54] via-[#0a8a76] to-[#25D366] bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p
            className="bl-fade-up mx-auto mt-4 max-w-xl text-base font-light text-gray-500 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            Thoughts, stories, and ideas from our writers — fresh off the desk.
          </p>
          <div
            className="bl-fade-up mt-8 flex items-center justify-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#075E54]/30" />
            <span className="rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#075E54] ring-1 ring-[#075E54]/10">
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#075E54]/30" />
          </div>
        </header>

        {blogs.length === 0 ? (
          /* ----------------------------- empty state ----------------------------- */
          <div className="bl-fade-up mx-auto max-w-lg rounded-[2rem] border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 grid h-20 w-20 rotate-3 place-items-center rounded-3xl bg-gradient-to-br from-[#075E54] to-[#25D366] text-white shadow-xl shadow-[#075E54]/25">
              <PenIcon className="h-8 w-8" />
            </div>
            <h2 className="mb-2.5 text-2xl font-extrabold tracking-tight text-[#0b2f28]">
              No stories yet
            </h2>
            <p className="mx-auto max-w-sm text-sm font-light leading-relaxed text-gray-400">
              Fresh articles are on the way. Check back soon — great stories take a little time
              to write.
            </p>
          </div>
        ) : (
          <>
            {/* -------------------- featured post (pure image) -------------------- */}
            {feature && (
              <Link
                href={`/blogs/${feature.slug}`}
                aria-label={feature.title}
                className="bl-fade-up bl-shine group relative block min-h-[240px] overflow-hidden rounded-[2rem] bg-[#d8e6e3] shadow-[0_30px_80px_-24px_rgba(7,94,84,0.4)] ring-1 ring-black/5"
                style={{ animationDelay: '320ms' }}
              >
                <img
                  src={feature.bannerImage}
                  alt={feature.title}
                  className="block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </Link>
            )}

            {/* ------------------- masonry gallery (pure images) ------------------- */}
            {rest.length > 0 && (
              <section className="mt-14 sm:mt-20">
                <div className="bl-fade-up mb-9 flex items-center gap-5">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#07271f] sm:text-3xl">
                    More Stories
                  </h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#075E54]/25 via-[#075E54]/10 to-transparent" />
                  <span className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    {rest.length} {rest.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>

                <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                  {rest.map((blog, i) => (
                    <Link
                      key={blog._id}
                      href={`/blogs/${blog.slug}`}
                      aria-label={blog.title}
                      className="bl-fade-up bl-shine group relative mb-6 block min-h-[180px] break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#d8e6e3] shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(7,94,84,0.35)] hover:ring-[#075E54]/20"
                      style={{ animationDelay: `${i * 90}ms` }}
                    >
                      {/* w-full h-auto = image at its own ratio, fully visible */}
                      <img
                        src={blog.bannerImage}
                        alt={blog.title}
                        loading="lazy"
                        className="block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
