import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
    try {
      const posts = await prisma.blogPost.findMany();
      return NextResponse.json(posts);
    } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
          return NextResponse.json(
            { error: error.message },
            { status: 500 }
          );
        } else {
          console.error("Unknown error:", error);
          return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
          );
        }
  }
  }