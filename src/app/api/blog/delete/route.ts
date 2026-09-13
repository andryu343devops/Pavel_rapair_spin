import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "../../../../../prisma/prisma-client";

export async function DELETE(request: NextRequest) {
  try {
    // ✅ Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Admin check
    const isAdmin = session.user.email === process.env.NEXT_PUBLIC_ADMIN;
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied. Only admins can delete blog posts." },
        { status: 403 }
      );
    }

    // ✅ Read request body
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
    }

    // ✅ Delete blog post
    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
