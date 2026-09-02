import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/models/Blog'

// Notice we added Promise<> around the params type
interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT: Update a blog
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Await the params before accessing .id
    const { id } = await params

    // Use returnDocument: 'after' instead of new: true to fix mongoose warnings
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      body,
      { returnDocument: 'after' }
    )

    if (!updatedBlog) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedBlog })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

// DELETE: Remove a blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB()
    
    // Await the params before accessing .id
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
