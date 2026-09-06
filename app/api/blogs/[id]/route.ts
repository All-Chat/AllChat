/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT: Update a blog
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB()
    const body = await request.json()
    
    const { id } = await params

    // --- CLEAN SLUG LOGIC ---
    const rawSlug = body.slug || body.title;
    const baseSlug = rawSlug
      .toLowerCase()
      .replace(/[@#\%]/g, '-')       // Replace @, #, % with hyphens
      .replace(/[^a-z0-9\s-]/g, '')  // Remove any other special characters
      .trim()
      .replace(/[\s]+/g, '-')        // Replace spaces with hyphens
      .replace(/-+/g, '-');          // Replace multiple hyphens with a single one

    // ✅ Explicitly map fields including the new SEO fields
    const updateData = {
      title: body.title,
      slug: baseSlug,
      writer: body.writer,
      readingTime: body.readingTime,
      content: body.content,
      bannerImage: body.bannerImage,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      canonicalUrl: body.canonicalUrl,
      schemaMarkup: body.schemaMarkup,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnDocument: 'after', runValidators: true }
    )

    if (!updatedBlog) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedBlog })
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists.' },
        { status: 400 }
      )
    }
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

// DELETE: Remove a blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB()
    
    const { id } = await params

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
