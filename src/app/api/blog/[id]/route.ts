import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(request: NextRequest) {
  try {
    // Извлекаем параметр 'id' из URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
        return NextResponse.json(
            { error: "Invalid Post ID format" },
            { status: 400 }
        );
    }
    
    // 💡 ИЗМЕНЕНИЕ: Используем 'select' или 'include' для гарантии получения всех полей
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      // ✅ Явно указываем, какие поля нам нужны (включая imageUrl)
      select: {
          id: true,
          title: true,
          content: true,
          imageUrl: true, // <-- ЭТО КРИТИЧНОЕ ПОЛЕ
          authorId: true, // ID автора (для внутренних нужд)
          createdAt: true, 
          // Если на странице поста нужно имя автора:
          author: {
              select: {
                  name: true,
              }
          }
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: `Post with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}