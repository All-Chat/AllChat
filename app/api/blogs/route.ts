/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

// GET: Fetch all blogs
export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean()
    const serializedBlogs = blogs.map(blog => ({ ...blog, _id: blog._id.toString() }))
    return NextResponse.json({ success: true, data: serializedBlogs })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST: Create a new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    // --- CLEAN SLUG LOGIC (No random string) ---
    const baseSlug = body.title
      .toLowerCase()
      .replace(/[@#\%]/g, '-')       // Replace @, #, % with hyphens
      .replace(/[^a-z0-9\s-]/g, '')  // Remove any other special characters
      .trim()
      .replace(/[\s]+/g, '-')        // Replace spaces with hyphens
      .replace(/-+/g, '-');          // Replace multiple hyphens with a single one

    const newBlog = await Blog.create({
      ...body,
      slug: baseSlug,
    });

    return NextResponse.json({ success: true, data: newBlog }, { status: 201 })
  } catch (error: any) {
    // Handle duplicate slug errors gracefully
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        { success: false, error: 'A blog with this exact title already exists. Please change the title.' },
        { status: 400 }
      )
    }
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
// Add this at the very bottom of your app/api/blogs/route.ts file
export const routeSegmentConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allows up to 10MB payloads
    },
  },
};
