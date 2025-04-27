import { NextResponse } from "next/server";
 import Post from "@/models/post";
 import { connectDB } from "@/dbConfig/db";

 export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      
      await connectDB();
      
      const post = await Post.findById(id);
      
      if (!post) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, data: post }, { status: 200 });
    } catch (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch post' },
        { status: 500 }
      );
    }
  }
