/*import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "../../../../../prisma/prisma-client";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // ✅ Ensure upload dir exists
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: process.env.NEXT_PUBLIC_ADMIN },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        isPublished: false,
        authorId: adminUser.id,
        imageUrl,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
*/
/*
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "../../../../../prisma/prisma-client";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // ❌ Удаляем попытку создать локальную папку:
    // await fs.mkdir(uploadDir, { recursive: true });

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (file) {
      // 1. Преобразуем File в Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // 2. Преобразуем Buffer в строку base64 для загрузки через API Cloudinary
      const base64Image = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64Image}`;
      
      // 3. Загружаем файл в Cloudinary
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
          folder: 'blog-images', // Папка для организации в Cloudinary
          public_id: `${Date.now()}-${file.name.split('.')[0]}` // Уникальный ID
      });

      // 4. Получаем публичный URL
      imageUrl = uploadResult.secure_url;
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: process.env.NEXT_PUBLIC_ADMIN },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        isPublished: false,
        authorId: adminUser.id,
        imageUrl, // Сохраняем публичный URL Cloudinary
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
    // Для отладки может быть полезно вывести ошибку в ответе:
    // return NextResponse.json({ error: "Internal server error", details: (error as Error).message }, { status: 500 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}*/
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "../../../../../prisma/prisma-client";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // 1. Проверка аутентификации
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    // 2. Проверка прав администратора
    const isAdmin = session.user.email === process.env.NEXT_PUBLIC_ADMIN;
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // 3. Получение пользователя-администратора (для authorId)
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email }, 
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Authenticated user not found in DB" }, { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (file) {
      console.log("☁️ START: Starting image upload to Cloudinary...");
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const base64Image = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64Image}`;
      
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
          folder: 'blog-images', 
          public_id: `${Date.now()}-${file.name.split('.')[0]}` 
      });

      imageUrl = uploadResult.secure_url;
      console.log("✅ DONE: Image uploaded successfully. URL:", imageUrl);
    }

    console.log("📝 START: Creating new blog post in database...");
    
    // 4. Создание поста
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        isPublished: false,
        authorId: adminUser.id,
        imageUrl, 
      },
    });

    console.log("🎉 DONE: Post created successfully.");
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("❌ ERROR: Failed to create blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}