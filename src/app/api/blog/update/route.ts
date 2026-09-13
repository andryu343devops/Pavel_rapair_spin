import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key";

export async function PATCH(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization header is missing" },
                { status: 401 }
            );
        }

        // Extract the token from the authorization header
        const token = authHeader.replace("Bearer ", "").trim();

        // Decode the token
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        } catch {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        // Check if the user is an admin (id = 1)
        if (decoded.id !== 1) {
            return NextResponse.json(
                { error: "Access denied. Only the admin can update blog posts." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, title, content, isPublished } = body;

        if (!id || (!title && !content && isPublished === undefined)) {
            return NextResponse.json(
                { error: "Missing required fields: id, or fields to update" },
                { status: 400 }
            );
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: { title, content, isPublished },
        });

        return NextResponse.json(updatedPost);
    } catch (error: unknown) {
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
