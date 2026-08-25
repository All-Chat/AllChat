/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const excludeId = searchParams.get('excludeId') // Used when editing so it doesn't find itself

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 })
    }

    // Build query to exclude the current blog being edited
    const query: any = { slug }
    if (excludeId) {
      query._id = { $ne: excludeId }
    }

    const existingBlog = await Blog.findOne(query).lean()

    if (existingBlog) {
      return NextResponse.json({ success: true, available: false })
    } else {
      return NextResponse.json({ success: true, available: true })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
